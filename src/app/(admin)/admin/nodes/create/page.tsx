"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateNode } from "@/modules/nodes/hooks";

const fields = [
  { id: "name", label: "Name", placeholder: "My node", type: "text" },
  { id: "ram", label: "RAM (GB)", placeholder: "For information purposes", type: "number" },
  { id: "disk", label: "Disk (GB)", placeholder: "For information purposes", type: "number" },
  { id: "cpu", label: "CPU", placeholder: "For information purposes", type: "text" },
  { id: "address", label: "IP Address", placeholder: "localhost", type: "text" },
  { id: "port", label: "Daemon Port", placeholder: "3002", type: "number" },
];

export default function AdminCreateNodePage() {
  const router = useRouter();
  const createNode = useCreateNode();
  const refs = useRef<Record<string, HTMLInputElement | null>>({});

  function handleCreate() {
    const name = refs.current["name"]?.value?.trim();
    const address = refs.current["address"]?.value?.trim();
    const port = Number(refs.current["port"]?.value ?? 3002);
    if (!name || !address) {
      toast.error("Name and IP address are required");
      return;
    }
    createNode.mutate(
      {
        name,
        address,
        port,
        ram: refs.current["ram"]?.value ? Number(refs.current["ram"].value) : undefined,
        cpu: refs.current["cpu"]?.value || undefined,
        disk: refs.current["disk"]?.value ? Number(refs.current["disk"].value) : undefined,
      },
      {
        onSuccess: () => {
          toast.success("Node created");
          router.push("/admin/nodes");
        },
        onError: () => toast.error("Failed to create node"),
      }
    );
  }

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/nodes" className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <PageTitle title="Create Node" description="Add a new daemon node to this panel" />
      </div>

      <div className="bg-neutral-50 dark:bg-neutral-800/20 rounded-xl p-5 border border-neutral-200 dark:border-white/5 max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          {fields.map((f) => (
            <div key={f.id} className="space-y-1.5">
              <Label htmlFor={f.id}>{f.label}</Label>
              <Input
                id={f.id}
                type={f.type}
                placeholder={f.placeholder}
                ref={(el) => { refs.current[f.id] = el; }}
              />
            </div>
          ))}
          <div className="col-span-2">
            <Button onClick={handleCreate} disabled={createNode.isPending}>
              {createNode.isPending ? "Creating…" : "Create Node"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
