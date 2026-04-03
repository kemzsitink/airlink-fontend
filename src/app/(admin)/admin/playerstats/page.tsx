"use client";

import { RefreshCw, Users, Server, Activity, BarChart2 } from "lucide-react";
import { PageTitle } from "@/components/layout/PageTitle";
import { usePlayerStats } from "@/modules/analytics/hooks";
import { MOCK_PLAYER_STATS } from "@/modules/analytics/types";
import { cn } from "@/lib/utils";

export default function AdminPlayerStatsPage() {
  const { data = MOCK_PLAYER_STATS, isFetching, refetch } = usePlayerStats();
  const utilization = data.totalMaxPlayers > 0
    ? Math.round((data.totalPlayers / data.totalMaxPlayers) * 100)
    : 0;

  const statCards = [
    { label: "Total Players", value: data.totalPlayers, sub: "Players across all servers", icon: <Users className="w-5 h-5 text-neutral-400" /> },
    { label: "Max Capacity", value: data.totalMaxPlayers, sub: "Total player capacity", icon: <Server className="w-5 h-5 text-neutral-400" /> },
    { label: "Online Servers", value: data.onlineServers, sub: "Servers currently online", icon: <Activity className="w-5 h-5 text-neutral-400" /> },
    { label: "Utilization", value: `${utilization}%`, sub: "Player capacity utilization", icon: <BarChart2 className="w-5 h-5 text-neutral-400" /> },
  ];

  return (
    <>
      <PageTitle
        title="Player Statistics"
        description="View player statistics across all Minecraft servers"
        actions={
          <button onClick={() => refetch()}
            className="border border-neutral-200 dark:border-neutral-800/20 block rounded-xl bg-white dark:bg-white/5 hover:bg-neutral-50 dark:hover:bg-white/10 text-neutral-800 dark:text-white px-3 py-2 text-sm font-medium shadow-lg transition flex items-center gap-1.5">
            <RefreshCw className={cn("w-4 h-4", isFetching && "animate-spin")} />
            Refresh Data
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {statCards.map((s) => (
          <div key={s.label} className="rounded-xl bg-neutral-50 dark:bg-neutral-800/20 border border-neutral-200 dark:border-white/5 px-4 py-4">
            <div className="flex items-center justify-between">
              <p className="truncate text-sm font-medium text-neutral-500 dark:text-neutral-300">{s.label}</p>
              <div className="rounded-lg bg-neutral-100 dark:bg-neutral-700/30 p-2">{s.icon}</div>
            </div>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-neutral-800 dark:text-white">{s.value}</p>
            <p className="mt-1 text-sm text-neutral-400">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-neutral-800/20 border border-neutral-700/20 rounded-xl mb-8 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-neutral-800 dark:text-white">Player Count History</h2>
          <p className="text-xs text-neutral-400">Data collected every 5 minutes (last 48 hours)</p>
        </div>
        <div className="h-60 flex items-center justify-center text-neutral-500 text-sm border border-dashed border-neutral-600/30 rounded-xl">
          Chart — connect to real API for live data
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-800/20 border border-neutral-200 dark:border-neutral-700/20 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-neutral-800 dark:text-white mb-4">Server Player Counts</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700/20">
            <thead>
              <tr>
                {["Server", "Status", "Players", "Version"].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700/20 bg-white dark:bg-transparent">
              {data.servers.map((s) => (
                <tr key={s.serverId} className="hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-neutral-800 dark:text-white">{s.serverName}</p>
                    <p className="text-sm text-neutral-400">{s.serverId}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn("px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                      s.online ? "text-emerald-700 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/30"
                        : "text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800/30 border border-neutral-300 dark:border-neutral-700/30")}>
                      {s.online ? "Online" : "Offline"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 dark:text-white">{s.playerCount} / {s.maxPlayers}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-400">{s.version}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
