"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const mockNode = { id: 1, name: "Node-1", address: "127.0.0.1", port: 3001, ram: 16, disk: 500, cpu: "8 cores" };

export default function AdminEditNodePage({ params }: { params: { id: string } }) {
  const fields = [
    { id: "name", label: "Name", value: mockNode.name, type: "text" },
    { id: "address", label: "IP Address", value: mockNode.address, type: "text" },
    { id: "port", label: "Daemon Port", value: String(mockNode.port), type: "number" },
    { id: "ram", label: "RAM (GB)", value: String(mockNode.ram), type: "number" },
    { id: "disk", label: "Disk (GB)", value: String(mockNode.disk), type: "number" },
    { id: "cpu", label: "CPU", value: mockNode.cpu, type: "text" },
  ];

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/nodes" className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <PageTitle title={`Edit Node — ${mockNode.name}`} description="Update node configuration" />
      </div>

      <div className="bg-neutral-50 dark:bg-neutral-800/20 rounded-xl p-5 border border-neutral-200 dark:border-white/5 max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          {fields.map((f) => (
            <div key={f.id} className="space-y-1.5">
              <Label htmlFor={f.id}>{f.label}</Label>
              <Input id={f.id} type={f.type} defaultValue={f.value} />
            </div>
          ))}
          <div className="col-span-2 flex gap-2">
            <Button>Save Changes</Button>
            <Link href={`/admin/nodes/${params.id}/stats`}>
              <Button variant="outline">View Stats</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
