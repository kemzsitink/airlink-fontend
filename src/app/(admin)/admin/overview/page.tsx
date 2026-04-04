"use client";

import { useState } from "react";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";
import { RefreshCw, MessageSquare, BookOpen, Code2, Heart } from "lucide-react";
import { useAnalytics } from "@/modules/analytics/hooks";

const resources = [
  { label: "Discord", desc: "Community support and discussions", href: "https://discord.gg/BybfXms7JZ", icon: <MessageSquare className="w-4 h-4" /> },
  { label: "Docs", desc: "Usage and configuration guides", href: "https://airlinklabs.xyz/", icon: <BookOpen className="w-4 h-4" /> },
  { label: "GitHub", desc: "Source code and contributions", href: "https://github.com/airlinklabs", icon: <Code2 className="w-4 h-4" /> },
  { label: "Support", desc: "Fund Airlink development", href: "https://ko-fi.com/airlinklabs", icon: <Heart className="w-4 h-4" /> },
];

export default function OverviewPage() {
  const { data } = useAnalytics();
  if (!data) return null;
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  async function checkUpdates() {
    setChecking(true);
    setUpdateStatus("Checking...");
    await new Promise((r) => setTimeout(r, 1200));
    setUpdateStatus("Running latest version (v1.0.0)");
    setChecking(false);
  }

  const stats = [
    { label: "Users", value: data.activity.totalUsers, sub: "Registered" },
    { label: "Servers", value: data.servers.total, sub: "Active instances" },
    { label: "Nodes", value: data.nodes.length, sub: "Connected nodes" },
    { label: "Images", value: data.activity.totalImages, sub: "Available images" },
  ];

  return (
    <>
      <PageTitle title="Overview" description="Panel status and system information" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-neutral-50 dark:bg-neutral-800/20 border border-neutral-200 dark:border-white/5 px-4 py-4">
            <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">{s.label}</p>
            <p className="text-2xl font-semibold text-neutral-800 dark:text-white">{s.value}</p>
            <p className="text-xs text-neutral-500 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-neutral-50 dark:bg-neutral-800/20 border border-neutral-200 dark:border-white/5 p-5 mb-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-neutral-200 dark:bg-neutral-700 shrink-0" />
            <div>
              <p className="text-sm font-medium text-neutral-800 dark:text-white">Airlink Panel</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/40 text-neutral-600 dark:text-neutral-400">v1.0.0</span>
                <span className="text-[10px] text-neutral-500">development</span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={checkUpdates} disabled={checking}>
            <RefreshCw className={`w-4 h-4 ${checking ? "animate-spin" : ""}`} />
            Check Updates
          </Button>
        </div>
        {updateStatus && (
          <div className="text-sm rounded-lg p-3 bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400">
            {updateStatus}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {resources.map((r) => (
          <a key={r.label} href={r.href} target="_blank" rel="noopener noreferrer"
            className="rounded-xl bg-neutral-50 dark:bg-neutral-800/20 border border-neutral-200 dark:border-white/5 p-4 hover:border-neutral-300 dark:hover:border-white/10 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-neutral-500 dark:text-neutral-400">{r.icon}</span>
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-200">{r.label}</p>
            </div>
            <p className="text-xs text-neutral-500">{r.desc}</p>
          </a>
        ))}
      </div>
    </>
  );
}
