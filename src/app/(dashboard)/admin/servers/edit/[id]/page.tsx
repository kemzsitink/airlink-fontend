"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";

const mockServer = { id: 1, name: "Minecraft SMP", description: "Main survival server", cpu: 2, memory: 4096, storage: 20, suspended: false };

export default function AdminEditServerPage({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/servers" className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <PageTitle title={`Edit Server — ${mockServer.name}`} description="Modify server configuration" />
      </div>

      <div className="bg-neutral-50 dark:bg-neutral-800/20 rounded-xl p-5 border border-neutral-200 dark:border-white/5 max-w-2xl space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-400 mb-2">Name:</label>
            <input type="text" defaultValue={mockServer.name} className="rounded-xl text-neutral-800 dark:text-white text-sm w-full px-4 py-2 bg-neutral-400/10 dark:bg-neutral-600/20 border border-neutral-800/10 dark:border-white/5 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-white/20" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-400 mb-2">Description:</label>
            <input type="text" defaultValue={mockServer.description} className="rounded-xl text-neutral-800 dark:text-white text-sm w-full px-4 py-2 bg-neutral-400/10 dark:bg-neutral-600/20 border border-neutral-800/10 dark:border-white/5 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-white/20" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-400 mb-2">CPU (Cores):</label>
            <input type="number" defaultValue={mockServer.cpu} className="rounded-xl text-neutral-800 dark:text-white text-sm w-full px-4 py-2 bg-neutral-400/10 dark:bg-neutral-600/20 border border-neutral-800/10 dark:border-white/5 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-white/20" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-400 mb-2">Memory (MB):</label>
            <input type="number" defaultValue={mockServer.memory} className="rounded-xl text-neutral-800 dark:text-white text-sm w-full px-4 py-2 bg-neutral-400/10 dark:bg-neutral-600/20 border border-neutral-800/10 dark:border-white/5 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-white/20" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-400 mb-2">Storage (GB):</label>
            <input type="number" defaultValue={mockServer.storage} className="rounded-xl text-neutral-800 dark:text-white text-sm w-full px-4 py-2 bg-neutral-400/10 dark:bg-neutral-600/20 border border-neutral-800/10 dark:border-white/5 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-white/20" />
          </div>
          <div className="flex items-center gap-3 pt-6">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400">Suspended:</label>
            <input type="checkbox" defaultChecked={mockServer.suspended} className="h-4 w-4 rounded border-neutral-300" />
          </div>
        </div>
        <Button>Save Changes</Button>
      </div>
    </>
  );
}
