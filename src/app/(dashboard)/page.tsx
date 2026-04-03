"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutGrid, List, FolderPlus, Plus } from "lucide-react";
import { PageTitle } from "@/components/layout/PageTitle";
import { ServerCard } from "@/components/server/ServerCard";
import { ServerListRow } from "@/components/server/ServerListRow";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock data — replace with real API calls
const mockServers = [
  {
    UUID: "abc-123",
    name: "Minecraft SMP",
    description: "Main survival server",
    status: "running",
    ramUsage: 72,
    cpuUsage: 34,
    ramUsed: "2.8GB",
    owner: { username: "admin" },
    node: { name: "Node-1" },
  },
  {
    UUID: "def-456",
    name: "Velocity Proxy",
    description: "BungeeCord proxy",
    status: "stopped",
    ramUsage: 0,
    cpuUsage: 0,
    ramUsed: "0MB",
    owner: { username: "admin" },
    node: { name: "Node-1" },
  },
];

export default function DashboardPage() {
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
            {mockServers.length > 0 && (
              <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800/60 p-1 rounded-xl border border-neutral-200 dark:border-white/5">
                <button
                  onClick={() => setView("grid")}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded-lg flex items-center gap-1.5 transition-all",
                    view === "grid"
                      ? "bg-white dark:bg-white/8 text-neutral-900 dark:text-white shadow-sm"
                      : "text-neutral-500 dark:text-neutral-400"
                  )}
                >
                  <LayoutGrid className="w-4 h-4" />
                  Grid
                </button>
                <button
                  onClick={() => setView("list")}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded-lg flex items-center gap-1.5 transition-all",
                    view === "list"
                      ? "bg-white dark:bg-white/8 text-neutral-900 dark:text-white shadow-sm"
                      : "text-neutral-500 dark:text-neutral-400"
                  )}
                >
                  <List className="w-4 h-4" />
                  List
                </button>
              </div>
            )}
          </>
        }
      />

      {mockServers.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-32 text-center">
          <div className="h-16 w-16 text-neutral-200 dark:text-neutral-700 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M11.622 1.602a.75.75 0 0 1 .756 0l2.25 1.313a.75.75 0 0 1-.756 1.295L12 3.118 10.128 4.21a.75.75 0 1 1-.756-1.295l2.25-1.313ZM5.898 5.81a.75.75 0 0 1-.27 1.025l-1.14.665 1.14.665a.75.75 0 1 1-.756 1.295L3.75 8.806v.944a.75.75 0 0 1-1.5 0V7.5a.75.75 0 0 1 .372-.648l2.25-1.312a.75.75 0 0 1 1.026.27Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-base font-medium text-neutral-800 dark:text-white">
            No servers yet
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            <Link href="/create-server" className="text-blue-500">
              Create your first server
            </Link>
          </p>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {mockServers.map((server) => (
            <ServerCard key={server.UUID} server={server} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-neutral-200 dark:border-white/5 overflow-hidden shadow-sm">
          <table className="min-w-full divide-y divide-neutral-200 dark:divide-white/5">
            <thead className="bg-neutral-50 dark:bg-neutral-800/20">
              <tr>
                {["Server", "Status", "Owner", "RAM", "CPU"].map((h) => (
                  <th
                    key={h}
                    className="py-3 pl-6 pr-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-white/5 bg-white dark:bg-transparent">
              {mockServers.map((server) => (
                <ServerListRow key={server.UUID} server={server} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
