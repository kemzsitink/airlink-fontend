"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { PageTitle } from "@/components/layout/PageTitle";
import { useAnalytics } from "@/modules/analytics/hooks";
import { cn } from "@/lib/utils";

type Tab = "servers" | "nodes" | "activity";

export default function AdminAnalyticsPage() {
  const { data, loading, refresh } = useAnalytics();
  const [tab, setTab] = useState<Tab>("servers");

  const tabs: { id: Tab; label: string }[] = [
    { id: "servers", label: "Servers" },
    { id: "nodes", label: "Nodes" },
    { id: "activity", label: "Activity" },
  ];

  const onlineNodes = data.nodes.filter((n) => n.online).length;

  return (
    <>
      <PageTitle
        title="Analytics"
        description="Live data from the database and connected daemons."
        actions={
          <button onClick={refresh}
            className="flex items-center gap-1.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/20 border border-neutral-200 dark:border-white/5 hover:bg-neutral-100 dark:hover:bg-white/5 text-neutral-700 dark:text-neutral-300 px-3 py-2 text-sm font-medium transition">
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
            Refresh
          </button>
        }
      />

      <div className="flex gap-0.5 border-b border-neutral-200 dark:border-neutral-700/40 mb-6">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={cn("px-4 py-2.5 text-sm font-medium transition -mb-px border-b-2",
              tab === t.id ? "border-neutral-800 dark:border-white text-neutral-800 dark:text-white" : "border-transparent text-neutral-500 dark:text-neutral-400")}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "servers" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total servers", value: data.servers.total, sub: `${data.servers.suspended} suspended` },
              { label: "Allocated RAM", value: `${(data.servers.totalRamMb / 1024).toFixed(1)} GB`, sub: "across all servers" },
              { label: "Allocated CPU", value: `${data.servers.totalCpuPct}%`, sub: "total allocation" },
              { label: "Allocated disk", value: `${data.servers.totalStorageGb} GB`, sub: "total allocation" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-neutral-50 dark:bg-neutral-800/20 border border-neutral-200 dark:border-white/5 px-4 py-4">
                <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">{s.label}</p>
                <p className="text-2xl font-semibold text-neutral-800 dark:text-white">{s.value}</p>
                <p className="text-xs text-neutral-500 mt-1">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "nodes" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: "Nodes", value: data.nodes.length, color: "" },
              { label: "Online", value: onlineNodes, color: "text-emerald-600 dark:text-emerald-400" },
              { label: "Offline", value: data.nodes.length - onlineNodes, color: "text-red-500 dark:text-red-400" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-neutral-50 dark:bg-neutral-800/20 border border-neutral-200 dark:border-white/5 px-4 py-4">
                <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">{s.label}</p>
                <p className={cn("text-2xl font-semibold", s.color || "text-neutral-800 dark:text-white")}>{s.value}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {data.nodes.map((node) => (
              <div key={node.name} className="rounded-xl bg-neutral-50 dark:bg-neutral-800/20 border border-neutral-200 dark:border-white/5 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className={cn("w-2 h-2 rounded-full shrink-0", node.online ? "bg-emerald-500" : "bg-red-500")} />
                    <div>
                      <p className="text-sm font-medium text-neutral-800 dark:text-white">{node.name}</p>
                      <p className="text-xs text-neutral-400 font-mono">{node.address}:{node.port}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-neutral-500">
                    {node.versionRelease && <span className="font-mono bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/5 px-2 py-0.5 rounded-md">{node.versionRelease}</span>}
                    <span>{node.serverCount} servers</span>
                    <span className={cn("px-2 py-0.5 rounded-md text-xs font-medium border",
                      node.online ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20"
                        : "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20")}>
                      {node.online ? "Online" : "Offline"}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "RAM limit", value: node.ram >= 1024 ? `${(node.ram / 1024).toFixed(1)} GB` : `${node.ram} MB` },
                    { label: "CPU limit", value: `${node.cpu}%` },
                    { label: "Disk limit", value: `${node.disk} GB` },
                  ].map((r) => (
                    <div key={r.label}>
                      <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-2">{r.label}</p>
                      <p className="text-sm font-medium text-neutral-800 dark:text-white">{r.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "activity" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Users", value: data.activity.totalUsers, sub: `${data.activity.adminCount} admins` },
              { label: "Images installed", value: data.activity.totalImages, sub: "in library" },
              { label: "Logins (30d)", value: Object.values(data.activity.loginsByDay).reduce((a, b) => a + b, 0), sub: "panel sessions" },
              { label: "Avg/day", value: Math.round(Object.values(data.activity.loginsByDay).reduce((a, b) => a + b, 0) / 30), sub: "logins per day" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-neutral-50 dark:bg-neutral-800/20 border border-neutral-200 dark:border-white/5 px-4 py-4">
                <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">{s.label}</p>
                <p className="text-2xl font-semibold text-neutral-800 dark:text-white">{s.value}</p>
                <p className="text-xs text-neutral-500 mt-1">{s.sub}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-neutral-50 dark:bg-neutral-800/20 border border-neutral-200 dark:border-white/5 overflow-hidden">
            <div className="px-5 py-3.5 border-b border-neutral-200 dark:border-white/5">
              <p className="text-sm font-medium text-neutral-800 dark:text-white">Recent logins</p>
            </div>
            <table className="min-w-full text-sm divide-y divide-neutral-100 dark:divide-white/5">
              <thead className="bg-neutral-100/60 dark:bg-white/[0.02]">
                <tr>
                  {["User ID", "IP Address", "Time"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-medium text-neutral-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-white/5">
                {data.activity.recentLogins.map((l, i) => (
                  <tr key={i} className="hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition">
                    <td className="px-5 py-3 text-xs font-mono text-neutral-500">#{l.userId}</td>
                    <td className="px-5 py-3 text-xs font-mono text-neutral-600 dark:text-neutral-400">{l.ipAddress || "Unknown"}</td>
                    <td className="px-5 py-3 text-xs text-neutral-500">{new Date(l.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
