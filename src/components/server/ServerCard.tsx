import Link from "next/link";
import { cn } from "@/lib/utils";

interface Server {
  UUID: string;
  name: string;
  description?: string;
  status: "running" | "stopped" | string;
  ramUsage?: number;
  cpuUsage?: number;
  ramUsed?: string;
  owner?: { username: string; avatar?: string };
  node?: { name?: string; address?: string };
}

export function ServerCard({ server }: { server: Server }) {
  const isRunning = server.status === "running";
  const ownerAvatar = server.owner?.avatar
    ? server.owner.avatar
    : `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(server.owner?.username ?? "unknown")}`;

  return (
    <div className="relative group block bg-white dark:bg-neutral-800/20 rounded-xl border border-neutral-200 dark:border-white/5 shadow-sm p-4 hover:border-neutral-300 dark:hover:border-white/10 hover:shadow-md dark:hover:shadow-none transition-all duration-150">
      <Link href={`/server/${server.UUID}`} className="block">
        <div className="flex items-start justify-between mb-3">
          <div className="min-w-0 flex-1 mr-3">
            <h3 className="text-sm font-medium text-neutral-900 dark:text-white truncate">
              {server.name}
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5 truncate italic">
              {server.description ?? "No description"}
            </p>
          </div>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-md shrink-0 border",
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
        </div>

        <div className="flex gap-3 mb-3">
          {[
            { label: "RAM", value: `${server.ramUsage ?? 0}%` },
            { label: "CPU", value: `${server.cpuUsage ?? 0}%` },
            { label: "Used", value: server.ramUsed ?? "0MB" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex-1 bg-neutral-100 dark:bg-neutral-700/30 rounded-lg px-3 py-2"
            >
              <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mb-0.5">
                {label}
              </p>
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-white/5">
          <div className="flex items-center gap-1.5 min-w-0">
            <img
              className="h-4 w-4 rounded-full shrink-0"
              src={ownerAvatar}
              alt=""
            />
            <span className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
              {server.owner?.username ?? "Unknown"}
            </span>
          </div>
          {server.node && (
            <span className="text-xs text-neutral-400 dark:text-neutral-500 shrink-0 ml-2 truncate max-w-[6rem]">
              {server.node.name ?? server.node.address}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}
