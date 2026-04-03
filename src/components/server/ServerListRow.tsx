"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface Server {
  UUID: string;
  name: string;
  description?: string;
  status: string;
  ramUsage?: number;
  cpuUsage?: number;
  owner?: { username: string };
}

export function ServerListRow({ server }: { server: Server }) {
  const router = useRouter();
  const isRunning = server.status === "running";
  return (
    <tr
      onClick={() => router.push(`/server/${server.UUID}`)}
      className="hover:bg-neutral-50 dark:hover:bg-white/5 cursor-pointer transition-colors"
    >
      <td className="py-3.5 pl-6 pr-3">
        <p className="text-sm font-medium text-neutral-900 dark:text-white">
          {server.name}
        </p>
        {server.description && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate max-w-xs">
            {server.description}
          </p>
        )}
      </td>
      <td className="px-3 py-3.5">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-md border",
            isRunning
              ? "bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30"
              : "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/20"
          )}
        >
          <span className="relative flex h-1.5 w-1.5">
            {isRunning && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            )}
            <span
              className={cn(
                "relative inline-flex rounded-full h-1.5 w-1.5",
                isRunning ? "bg-emerald-500" : "bg-rose-500"
              )}
            />
          </span>
          {isRunning ? "Running" : "Stopped"}
        </span>
      </td>
      <td className="px-3 py-3.5 text-sm text-neutral-600 dark:text-neutral-300">
        {server.owner?.username ?? "Unknown"}
      </td>
      <td className="px-3 py-3.5 text-sm text-neutral-600 dark:text-neutral-300">
        {server.ramUsage ?? 0}%
      </td>
      <td className="px-3 py-3.5 text-sm text-neutral-600 dark:text-neutral-300">
        {server.cpuUsage ?? 0}%
      </td>
    </tr>
  );
}
