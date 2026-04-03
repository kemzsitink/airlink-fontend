"use client";

import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const mockNodes = [
  { id: 1, name: "Node-1", address: "127.0.0.1", port: 3001, status: "Online", versionRelease: "v1.0.0", instances: [1, 2] },
  { id: 2, name: "Node-2", address: "192.168.1.10", port: 3001, status: "Offline", versionRelease: null, instances: [] },
];

export default function AdminNodesPage() {
  const online = mockNodes.filter((n) => n.status === "Online").length;
  const totalInstances = mockNodes.reduce((t, n) => t + n.instances.length, 0);

  return (
    <>
      <PageTitle
        title="Nodes"
        description="Manage daemon nodes connected to this panel"
        actions={
          <Button asChild size="sm" variant="outline">
            <Link href="/admin/nodes/create">
              <Plus className="w-4 h-4" />
              Create Node
            </Link>
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-neutral-50 dark:bg-neutral-800/20 rounded-xl p-5 border border-neutral-200 dark:border-white/5">
          <h2 className="text-lg font-medium text-neutral-800 dark:text-white mb-2">Total Nodes</h2>
          <p className="text-4xl font-normal text-neutral-800 dark:text-white">{mockNodes.length}</p>
          <p className="text-sm text-neutral-400 mt-2">{online} online</p>
        </div>
        <div className="bg-neutral-50 dark:bg-neutral-800/20 rounded-xl p-5 border border-neutral-200 dark:border-white/5">
          <h2 className="text-lg font-medium text-neutral-800 dark:text-white mb-2">Server Count</h2>
          <p className="text-4xl font-normal text-neutral-800 dark:text-white">{totalInstances}</p>
          <p className="text-sm text-neutral-400 mt-2">
            {totalInstances > 0 ? `Avg ${(totalInstances / mockNodes.length).toFixed(2)} per node` : "No instances"}
          </p>
        </div>
      </div>

      {mockNodes.some((n) => n.status === "Offline") && (
        <div className="mb-6 rounded-xl bg-red-600/20 dark:bg-red-800/10 px-4 py-4 border border-neutral-800/20">
          <p className="text-sm font-medium text-red-500 dark:text-red-400">Connection Error</p>
          <p className="text-sm text-red-500/70 dark:text-red-400/50">One or more nodes are offline.</p>
        </div>
      )}

      <div className="overflow-x-auto shadow-sm rounded-xl border border-neutral-200 dark:border-neutral-800/40">
        <table className="min-w-full divide-y divide-neutral-200 dark:divide-white/10">
          <thead className="bg-neutral-50 dark:bg-neutral-800/50">
            <tr>
              {["Name", "Connection", "Servers", "Actions"].map((h) => (
                <th key={h} className="py-3.5 pl-4 pr-3 text-left text-sm font-medium text-neutral-800 dark:text-white">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-white/5 bg-white dark:bg-neutral-800/20">
            {mockNodes.map((node) => (
              <tr key={node.id} className="hover:bg-neutral-50 dark:hover:bg-white/[0.05] transition-colors cursor-pointer"
                onClick={() => (window.location.href = `/admin/nodes/${node.id}/stats`)}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                  <div className="flex items-center gap-3">
                    <span className={cn("flex h-2 w-2 rounded-full shrink-0", node.status === "Online" ? "bg-emerald-500" : "bg-red-500")} />
                    <span className="font-medium text-neutral-800 dark:text-white">{node.name}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                  {node.address}:{node.port}
                  {node.versionRelease && (
                    <span className="ml-2 inline-flex items-center rounded-md bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 ring-emerald-600/20 px-2 py-0.5 text-xs font-medium ring-1 ring-inset">
                      {node.versionRelease}
                    </span>
                  )}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-neutral-600 dark:text-neutral-400">{node.instances.length}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm" onClick={(e) => e.stopPropagation()}>
                  <div className="flex gap-2">
                    <Link href={`/admin/nodes/${node.id}`}>
                      <Button variant="outline" size="sm">Edit</Button>
                    </Link>
                    <Button variant="destructive" size="icon" className="h-8 w-8">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
