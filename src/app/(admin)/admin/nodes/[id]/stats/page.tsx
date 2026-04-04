"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { nodesApi } from "@/modules/nodes/api";
import { useNode } from "@/modules/nodes/hooks";
import { cn } from "@/lib/utils";

export default function AdminNodeStatsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const nodeId = Number(id);
  const { data: node } = useNode(nodeId);

  const { data: stats, isFetching, refetch } = useQuery({
    queryKey: ["nodes", nodeId, "stats"],
    queryFn: () => nodesApi.stats(nodeId),
    refetchInterval: 10000,
    enabled: !!nodeId,
  });

  const s = stats as any;

  if (!node) return <p className="text-sm text-neutral-500 p-4">Loading...</p>;

  const statCards = [
    { label: "Status", value: node.status, color: node.status === "Online" ? "text-emerald-600 dark:text-emerald-400" : "text-red-500" },
    { label: "Version", value: node.versionRelease ?? "—", color: "" },
    { label: "Servers", value: String(node.instances.length), color: "" },
    { label: "RAM Limit", value: node.ram >= 1024 ? `${(node.ram / 1024).toFixed(1)} GB` : `${node.ram} MB`, color: "" },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/nodes" className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-base font-medium text-neutral-800 dark:text-white">{node.name} — Stats</h1>
            <p className="text-sm text-neutral-500 mt-0.5">{node.address}:{node.port}</p>
          </div>
        </div>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition"
        >
          <RefreshCw className={cn("w-4 h-4", isFetching && "animate-spin")} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((sc) => (
          <div key={sc.label} className="rounded-xl bg-neutral-50 dark:bg-neutral-800/20 border border-neutral-200 dark:border-white/5 px-4 py-4">
            <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">{sc.label}</p>
            <p className={`text-2xl font-semibold ${sc.color || "text-neutral-800 dark:text-white"}`}>{sc.value}</p>
          </div>
        ))}
      </div>

      {node.status === "Offline" ? (
        <div className="rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 px-4 py-4">
          <p className="text-sm text-red-600 dark:text-red-400">Node is offline — live stats unavailable.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[
            { label: "CPU Limit", value: `${node.cpu}%`, live: s?.cpu != null ? `${s.cpu}% used` : null },
            { label: "Disk Limit", value: `${node.disk} GB`, live: s?.disk != null ? `${s.disk} GB used` : null },
            { label: "RAM Limit", value: node.ram >= 1024 ? `${(node.ram / 1024).toFixed(1)} GB` : `${node.ram} MB`, live: s?.ram != null ? `${s.ram} MB used` : null },
          ].map((r) => (
            <div key={r.label} className="rounded-xl bg-neutral-50 dark:bg-neutral-800/20 border border-neutral-200 dark:border-white/5 p-5">
              <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-2">{r.label}</p>
              <p className="text-sm font-medium text-neutral-800 dark:text-white">{r.value}</p>
              {r.live && <p className="text-xs text-neutral-400 mt-1">{r.live}</p>}
              <div className="mt-3 w-full bg-neutral-200 dark:bg-neutral-700/40 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full w-1/3" />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
