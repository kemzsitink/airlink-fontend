"use client";

import { use, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNode, useUpdateNode } from "@/modules/nodes/hooks";

export default function AdminEditNodePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const nodeId = Number(id);
  const { data: node } = useNode(nodeId);
  const updateNode = useUpdateNode(nodeId);

  const refs = useRef<Record<string, HTMLInputElement | null>>({});

  function handleSave() {
    updateNode.mutate(
      {
        name: refs.current["name"]?.value || undefined,
        address: refs.current["address"]?.value || undefined,
        port: refs.current["port"]?.value ? Number(refs.current["port"].value) : undefined,
        ram: refs.current["ram"]?.value ? Number(refs.current["ram"].value) : undefined,
        cpu: refs.current["cpu"]?.value || undefined,
        disk: refs.current["disk"]?.value ? Number(refs.current["disk"].value) : undefined,
      },
      {
        onSuccess: () => toast.success("Node updated"),
        onError: () => toast.error("Failed to update node"),
      }
    );
  }

  if (!node) return <p className="text-sm text-neutral-500 p-4">Loading...</p>;

  const fields = [
    { id: "name", label: "Name", value: node.name, type: "text" },
    { id: "address", label: "IP Address", value: node.address, type: "text" },
    { id: "port", label: "Daemon Port", value: String(node.port), type: "number" },
    { id: "ram", label: "RAM (GB)", value: String(node.ram), type: "number" },
    { id: "disk", label: "Disk (GB)", value: String(node.disk), type: "number" },
    { id: "cpu", label: "CPU", value: String(node.cpu), type: "text" },
  ];

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/nodes" className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <PageTitle title={`Edit Node — ${node.name}`} description="Update node configuration" />
      </div>

      <div className="bg-neutral-50 dark:bg-neutral-800/20 rounded-xl p-5 border border-neutral-200 dark:border-white/5 max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          {fields.map((f) => (
            <div key={f.id} className="space-y-1.5">
              <Label htmlFor={f.id}>{f.label}</Label>
              <Input
                id={f.id}
                type={f.type}
                defaultValue={f.value}
                ref={(el) => { refs.current[f.id] = el; }}
              />
            </div>
          ))}
          <div className="col-span-2 flex gap-2">
            <Button onClick={handleSave} disabled={updateNode.isPending}>
              {updateNode.isPending ? "Saving…" : "Save Changes"}
            </Button>
            <Link href={`/admin/nodes/${id}/stats`}>
              <Button variant="outline">View Stats</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
