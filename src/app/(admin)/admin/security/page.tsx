"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSettings, useBannedIps } from "@/modules/settings/hooks";
import { MOCK_SETTINGS } from "@/modules/settings/types";

export default function AdminSecurityPage() {
  const { data } = useSettings();
  const { bannedIps, ban, unban } = useBannedIps();
  const [rateLimitEnabled, setRateLimitEnabled] = useState(MOCK_SETTINGS.rateLimitEnabled);
  const [rpm, setRpm] = useState(MOCK_SETTINGS.rateLimitRpm);
  const [newIp, setNewIp] = useState("");

  useEffect(() => {
    if (data) {
      setRateLimitEnabled(data.rateLimitEnabled);
      setRpm(data.rateLimitRpm);
    }
  }, [data]);

  return (
    <>
      <PageTitle title="Security" description="Manage panel security settings, rate limiting, and IP access controls." />

      <div className="space-y-6 max-w-3xl">
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
                <Switch checked={rateLimitEnabled} onCheckedChange={setRateLimitEnabled} />
              </div>
              <div className="space-y-1.5">
                <Label>Requests per minute</Label>
                <Input type="number" value={rpm} onChange={(e) => setRpm(Number(e.target.value))} className="w-40" />
              </div>
              <Button size="sm">Save</Button>
            </div>
        </div>

        <div className="bg-neutral-50 dark:bg-white/[0.03] rounded-xl border border-neutral-200 dark:border-white/5 overflow-hidden">
          <div className="px-5 py-4 border-b border-neutral-200 dark:border-white/5">
            <h2 className="text-sm font-medium text-neutral-800 dark:text-white">Banned IPs</h2>
            <p className="mt-0.5 text-xs text-neutral-500">IPs on this list are blocked from accessing the panel entirely.</p>
          </div>
            <div className="px-5 py-5 space-y-4">
              <div className="flex gap-2">
                <Input value={newIp} onChange={(e) => setNewIp(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { ban(newIp); setNewIp(""); } }}
                  placeholder="e.g. 192.168.1.100" />
                <Button size="sm" onClick={() => { ban(newIp); setNewIp(""); }}>Ban IP</Button>
              </div>
            {bannedIps.length === 0 ? (
              <p className="text-xs text-neutral-400">No IPs are currently banned.</p>
            ) : (
              <ul className="space-y-1.5">
                {bannedIps.map((ip) => (
                  <li key={ip} className="flex items-center justify-between px-3 py-2 rounded-lg bg-white dark:bg-neutral-800/60 border border-neutral-200 dark:border-white/5 text-sm">
                    <span className="font-mono text-neutral-700 dark:text-neutral-300 text-xs">{ip}</span>
                    <button onClick={() => unban(ip)} className="text-xs text-red-500 hover:text-red-400 transition flex items-center gap-1">
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
