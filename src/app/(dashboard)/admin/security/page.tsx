"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AdminSecurityPage() {
  const [rateLimitEnabled, setRateLimitEnabled] = useState(true);
  const [rpm, setRpm] = useState("100");
  const [bannedIps, setBannedIps] = useState<string[]>(["192.168.1.50"]);
  const [newIp, setNewIp] = useState("");

  function banIp() {
    if (!newIp.trim() || bannedIps.includes(newIp.trim())) return;
    setBannedIps((prev) => [...prev, newIp.trim()]);
    setNewIp("");
  }

  function unbanIp(ip: string) {
    setBannedIps((prev) => prev.filter((i) => i !== ip));
  }

  return (
    <>
      <PageTitle title="Security" description="Manage panel security settings, rate limiting, and IP access controls." />

      <div className="space-y-6 max-w-3xl">
        {/* Rate Limiting */}
        <div className="bg-neutral-50 dark:bg-white/[0.03] rounded-xl border border-neutral-200 dark:border-white/5 overflow-hidden">
          <div className="px-5 py-4 border-b border-neutral-200 dark:border-white/5">
            <h2 className="text-sm font-medium text-neutral-800 dark:text-white">Rate Limiting</h2>
            <p className="mt-0.5 text-xs text-neutral-500">Limit how many requests a single IP can make per minute.</p>
          </div>
          <div className="px-5 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Enable rate limiting</p>
                <p className="text-xs text-neutral-500 mt-0.5">Block IPs that exceed the request threshold.</p>
              </div>
              <button onClick={() => setRateLimitEnabled(!rateLimitEnabled)}
                className={cn("relative inline-flex h-5 w-10 items-center rounded-full transition-colors", rateLimitEnabled ? "bg-neutral-900 dark:bg-white" : "bg-neutral-300 dark:bg-neutral-600")}>
                <span className={cn("inline-block h-4 w-4 transform rounded-full bg-white dark:bg-neutral-900 border transition-transform", rateLimitEnabled ? "translate-x-5" : "translate-x-0.5")} />
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Requests per minute</label>
              <input type="number" value={rpm} onChange={(e) => setRpm(e.target.value)} min="1" max="10000"
                className="w-40 rounded-xl border border-neutral-200 dark:border-white/5 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-600 transition" />
            </div>
            <Button size="sm">Save</Button>
          </div>
        </div>

        {/* IP Bans */}
        <div className="bg-neutral-50 dark:bg-white/[0.03] rounded-xl border border-neutral-200 dark:border-white/5 overflow-hidden">
          <div className="px-5 py-4 border-b border-neutral-200 dark:border-white/5">
            <h2 className="text-sm font-medium text-neutral-800 dark:text-white">Banned IPs</h2>
            <p className="mt-0.5 text-xs text-neutral-500">IPs on this list are blocked from accessing the panel entirely.</p>
          </div>
          <div className="px-5 py-5 space-y-4">
            <div className="flex gap-2">
              <input type="text" value={newIp} onChange={(e) => setNewIp(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && banIp()}
                placeholder="e.g. 192.168.1.100"
                className="flex-1 rounded-xl border border-neutral-200 dark:border-white/5 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-neutral-800 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-600 transition" />
              <Button size="sm" onClick={banIp}>Ban IP</Button>
            </div>

            {bannedIps.length === 0 ? (
              <p className="text-xs text-neutral-400">No IPs are currently banned.</p>
            ) : (
              <ul className="space-y-1.5">
                {bannedIps.map((ip) => (
                  <li key={ip} className="flex items-center justify-between px-3 py-2 rounded-lg bg-white dark:bg-neutral-800/60 border border-neutral-200 dark:border-white/5 text-sm">
                    <span className="font-mono text-neutral-700 dark:text-neutral-300 text-xs">{ip}</span>
                    <button onClick={() => unbanIp(ip)} className="text-xs text-red-500 hover:text-red-400 transition flex items-center gap-1">
                      <X className="w-3 h-3" />Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
