"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";

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
            <div key={f.id}>
              <label htmlFor={f.id} className="block text-sm font-medium text-neutral-700 dark:text-neutral-400 mb-2">{f.label}:</label>
              <input id={f.id} type={f.type} placeholder={f.placeholder}
                className="rounded-xl text-neutral-800 dark:text-white text-sm w-full px-4 py-2 bg-neutral-400/10 dark:bg-neutral-600/20 placeholder:text-neutral-500/50 dark:placeholder:text-white/20 border border-neutral-800/10 dark:border-white/5 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-white/20" />
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
