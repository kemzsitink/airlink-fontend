"use client";

import Link from "next/link";
import { Plus, ExternalLink, Pencil, Trash2 } from "lucide-react";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";
import { useServers } from "@/modules/servers/hooks";
import { cn } from "@/lib/utils";

export default function AdminServersPage() {
  const { servers } = useServers();

  return (
    <>
      <PageTitle
        title="Servers"
        description="Manage all servers on this panel"
        actions={
          <Button asChild size="sm" variant="outline">
            <Link href="/admin/servers/create">
              <Plus className="w-4 h-4" />Create Server
            </Link>
          </Button>
        }
      />

      <div className="overflow-x-auto shadow-sm rounded-xl border border-neutral-200 dark:border-neutral-800/40">
        <table className="min-w-full divide-y divide-neutral-200 dark:divide-white/10">
          <thead className="bg-neutral-50 dark:bg-neutral-800/50">
            <tr>
              {["Name", "Owner", "Node", "Connection", "Status", ""].map((h) => (
                <th key={h} className="py-3.5 px-4 text-left text-sm font-medium text-neutral-800 dark:text-white">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-white/5 bg-white dark:bg-neutral-800/20">
            {servers.map((server) => {
              const port = JSON.parse(server.Ports).find((p: { primary: boolean }) => p.primary)?.Port.split(":")[1];
              return (
                <tr key={server.id} className="hover:bg-neutral-50 dark:hover:bg-white/[0.03] transition-colors">
                  <td className="py-4 px-4 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="relative flex h-2 w-2 shrink-0">
                        {!server.Suspended && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />}
                        <span className={cn("relative inline-flex rounded-full h-2 w-2", server.Suspended ? "bg-neutral-400" : "bg-emerald-500")} />
                      </span>
                      <div>
                        <div className="font-medium text-neutral-800 dark:text-white">{server.name}</div>
                        <div className="text-xs text-neutral-400 font-mono mt-0.5">{server.UUID}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm">
                    <Link href={`/admin/users/view/${server.owner.id}`} className="flex items-center gap-2 group" onClick={(e) => e.stopPropagation()}>
                      <img className="h-6 w-6 rounded-md" src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${server.owner.username}`} alt="" />
                      <span className="font-medium text-neutral-800 dark:text-blue-400 group-hover:underline">{server.owner.username}</span>
                    </Link>
                  </td>
                  <td className="py-4 px-4 text-sm">
                    <Link href={`/admin/nodes/${server.node.id}/stats`} className="font-medium text-neutral-800 dark:text-blue-400 hover:underline">{server.node.name}</Link>
                  </td>
                  <td className="py-4 px-4 text-sm text-neutral-600 dark:text-neutral-400">{server.node.address}:{port}</td>
                  <td className="py-4 px-4 text-sm">
                    <span className={cn("inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
                      server.Suspended ? "bg-amber-600/10 text-amber-600 dark:text-amber-400 ring-amber-600/20" : "bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 ring-emerald-600/20")}>
                      {server.Suspended ? "Suspended" : "Enabled"}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm">
                    <div className="flex items-center gap-1.5">
                      <Link href={`/server/${server.UUID}`} className="rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/30 p-1.5 text-neutral-500 hover:text-neutral-800 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <Link href={`/admin/servers/edit/${server.id}`} className="rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/30 p-1.5 text-neutral-500 hover:text-neutral-800 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button className="rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/30 p-1.5 text-neutral-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:border-red-200 dark:hover:border-red-500/30 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
