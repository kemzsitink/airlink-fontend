"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const fields = [
  { id: "name", label: "Name", placeholder: "My node", type: "text" },
  { id: "ram", label: "RAM (GB)", placeholder: "For information purposes", type: "number" },
  { id: "disk", label: "Disk (GB)", placeholder: "For information purposes", type: "number" },
  { id: "cpu", label: "CPU", placeholder: "For information purposes", type: "text" },
  { id: "address", label: "IP Address", placeholder: "localhost", type: "text" },
  { id: "port", label: "Daemon Port", placeholder: "3002", type: "number" },
];

export default function AdminCreateNodePage() {
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
              <Input id={f.id} type={f.type} placeholder={f.placeholder} />
            </div>
          ))}
          <div className="col-span-2">
            <Button>Create Node</Button>
          </div>
        </div>
      </div>
    </>
  );
}
