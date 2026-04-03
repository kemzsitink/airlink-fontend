"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutGrid, List, FolderPlus, Plus } from "lucide-react";
import { PageTitle } from "@/components/layout/PageTitle";
import { ServerCard } from "@/components/server/ServerCard";
import { ServerListRow } from "@/components/server/ServerListRow";
import { Button } from "@/components/ui/button";
import { useServers } from "@/modules/servers/hooks";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const { servers } = useServers();
  const [view, setView] = useState<"grid" | "list">("grid");
  const canCreateServer = true;

  return (
    <>
      <PageTitle
        title="My Servers"
        description="Manage and monitor your game servers"
        actions={
          <>
            {canCreateServer && (
              <Button asChild size="sm">
                <Link href="/create-server">
                  <Plus className="w-4 h-4" />
                  New server
                </Link>
              </Button>
            )}
            <Button variant="outline" size="sm">
              <FolderPlus className="w-4 h-4" />
              New folder
            </Button>
            {servers.length > 0 && (
              <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800/60 p-1 rounded-xl border border-neutral-200 dark:border-white/5">
                {(["grid", "list"] as const).map((v) => (
                  <button key={v} onClick={() => setView(v)}
                    className={cn("px-3 py-1.5 text-sm font-medium rounded-lg flex items-center gap-1.5 transition-all",
                      view === v ? "bg-white dark:bg-white/8 text-neutral-900 dark:text-white shadow-sm" : "text-neutral-500 dark:text-neutral-400")}>
                    {v === "grid" ? <LayoutGrid className="w-4 h-4" /> : <List className="w-4 h-4" />}
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </>
        }
      />

      {servers.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-32 text-center">
          <h2 className="text-base font-medium text-neutral-800 dark:text-white">No servers yet</h2>
          <p className="text-sm text-neutral-500 mt-1">
            <Link href="/create-server" className="text-blue-500">Create your first server</Link>
          </p>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {servers.map((server) => <ServerCard key={server.UUID} server={server} />)}
        </div>
      ) : (
        <div className="rounded-xl border border-neutral-200 dark:border-white/5 overflow-hidden shadow-sm">
          <table className="min-w-full divide-y divide-neutral-200 dark:divide-white/5">
            <thead className="bg-neutral-50 dark:bg-neutral-800/20">
              <tr>
                {["Server", "Status", "Owner", "RAM", "CPU"].map((h) => (
                  <th key={h} className="py-3 pl-6 pr-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-white/5 bg-white dark:bg-transparent">
              {servers.map((server) => <ServerListRow key={server.UUID} server={server} />)}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
