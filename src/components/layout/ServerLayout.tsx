"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Terminal, FolderOpen, HardDrive, Settings, Play, Users, Globe } from "lucide-react";

interface ServerLayoutProps {
  children: React.ReactNode;
  serverUUID: string;
  serverName: string;
  serverDescription?: string;
  status?: "running" | "stopped" | "starting";
}

const tabs = [
  { label: "Console", icon: <Terminal className="w-4 h-4" />, path: "" },
  { label: "Files", icon: <FolderOpen className="w-4 h-4" />, path: "/files" },
  { label: "Backups", icon: <HardDrive className="w-4 h-4" />, path: "/backups" },
  { label: "Startup", icon: <Play className="w-4 h-4" />, path: "/startup" },
  { label: "Players", icon: <Users className="w-4 h-4" />, path: "/players" },
  { label: "Worlds", icon: <Globe className="w-4 h-4" />, path: "/worlds" },
  { label: "Settings", icon: <Settings className="w-4 h-4" />, path: "/settings" },
];

export function ServerLayout({ children, serverUUID, serverName, serverDescription, status = "stopped" }: ServerLayoutProps) {
  const pathname = usePathname();
  const base = `/server/${serverUUID}`;

  return (
    <div>
      {/* Server header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-base font-medium text-neutral-800 dark:text-white">{serverName}</h1>
            <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-md border",
              status === "running" ? "bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30"
              : status === "starting" ? "bg-amber-50 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/30"
              : "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/20")}>
              <span className={cn("relative flex h-1.5 w-1.5")}>
                {status === "running" && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />}
                <span className={cn("relative inline-flex rounded-full h-1.5 w-1.5", status === "running" ? "bg-emerald-500" : status === "starting" ? "bg-amber-500" : "bg-rose-500")} />
              </span>
              {status === "running" ? "Running" : status === "starting" ? "Starting" : "Stopped"}
            </span>
          </div>
          {serverDescription && <p className="text-sm text-neutral-500 mt-0.5">{serverDescription}</p>}
        </div>

        {/* Power buttons */}
        <div className="flex gap-2 shrink-0">
          <button className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 text-sm font-medium shadow-sm transition">Start</button>
          <button className="rounded-xl bg-neutral-800 dark:bg-neutral-600 hover:bg-neutral-700 text-white px-3 py-2 text-sm font-medium shadow-sm transition">Restart</button>
          <button className="rounded-xl bg-red-600 hover:bg-red-500 text-white px-3 py-2 text-sm font-medium shadow-sm transition">Stop</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0.5 border-b border-neutral-200 dark:border-neutral-700/40 mb-6 overflow-x-auto">
        {tabs.map((t) => {
          const href = `${base}${t.path}`;
          const isActive = t.path === "" ? pathname === base : pathname.startsWith(href);
          return (
            <Link key={t.label} href={href}
              className={cn("flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium transition -mb-px border-b-2 whitespace-nowrap",
                isActive ? "border-neutral-800 dark:border-white text-neutral-800 dark:text-white" : "border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300")}>
              {t.icon}
              {t.label}
            </Link>
          );
        })}
      </div>

      {children}
    </div>
  );
}
