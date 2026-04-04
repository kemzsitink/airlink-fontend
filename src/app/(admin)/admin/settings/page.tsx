"use client";

import { useState, useEffect } from "react";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSettings } from "@/modules/settings/hooks";
import type { PanelSettings } from "@/modules/settings/types";
import { cn } from "@/lib/utils";

type Tab = "appearance" | "servers" | "security";

export default function AdminSettingsPage() {
  const { data } = useSettings();
  const [form, setForm] = useState<PanelSettings>({} as PanelSettings);
  const [tab, setTab] = useState<Tab>("appearance");

  useEffect(() => { if (data) setForm(data); }, [data]);

  const set = (patch: Partial<PanelSettings>) => setForm((s) => ({ ...s, ...patch }));

  const tabs: { id: Tab; label: string }[] = [
    { id: "appearance", label: "Appearance" },
    { id: "servers", label: "Servers" },
    { id: "security", label: "Security" },
  ];

  return (
    <>
      <PageTitle title="Settings" description="Manage your panel configuration." />

      <div className="flex gap-0.5 mb-6 border-b border-neutral-200 dark:border-neutral-700/40">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={cn("px-4 py-2.5 text-sm font-medium transition -mb-px border-b-2",
              tab === t.id ? "border-neutral-800 dark:border-white text-neutral-800 dark:text-white" : "border-transparent text-neutral-500 dark:text-neutral-400")}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "appearance" && (
        <div className="space-y-5">
          <div className="bg-white dark:bg-white/5 rounded-xl border border-neutral-200 dark:border-white/5">
            <h2 className="text-[13px] font-medium text-neutral-800 dark:text-white px-5 py-3.5 bg-neutral-50 dark:bg-white/5 rounded-t-xl border-b border-neutral-200 dark:border-white/5">Branding</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 px-5 py-5">
              <div className="space-y-1.5">
                <Label>Site title</Label>
                <Input value={form.title} onChange={(e) => set({ title: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Logo</Label>
                <input type="file" accept="image/*" className="rounded-xl border border-neutral-200 dark:border-neutral-600/30 text-sm w-full bg-neutral-100 dark:bg-neutral-700/20 px-4 py-2 text-neutral-800 dark:text-white file:mr-3 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs file:bg-neutral-200 dark:file:bg-neutral-600 file:text-neutral-700 dark:file:text-neutral-300" />
              </div>
              <div className="space-y-1.5">
                <Label>Favicon</Label>
                <input type="file" accept=".ico,.png,.jpg" className="rounded-xl border border-neutral-200 dark:border-neutral-600/30 text-sm w-full bg-neutral-100 dark:bg-neutral-700/20 px-4 py-2 text-neutral-800 dark:text-white file:mr-3 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs file:bg-neutral-200 dark:file:bg-neutral-600 file:text-neutral-700 dark:file:text-neutral-300" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-white/5 rounded-xl border border-neutral-200 dark:border-white/5">
            <h2 className="text-[13px] font-medium text-neutral-800 dark:text-white px-5 py-3.5 bg-neutral-50 dark:bg-white/5 rounded-t-xl border-b border-neutral-200 dark:border-white/5">Registration</h2>
            <div className="px-5 py-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-700 dark:text-white">Allow public registration</p>
                <p className="text-xs text-neutral-500 mt-0.5">When off, only admins can create new accounts.</p>
              </div>
              <Switch checked={form.allowRegistration} onCheckedChange={(v) => set({ allowRegistration: v })} />
            </div>
          </div>

          <div className="flex justify-end"><Button>Save appearance</Button></div>
        </div>
      )}

      {tab === "servers" && (
        <div className="space-y-5">
          <div className="bg-white dark:bg-white/5 rounded-xl border border-neutral-200 dark:border-white/5">
            <h2 className="text-[13px] font-medium text-neutral-800 dark:text-white px-5 py-3.5 bg-neutral-50 dark:bg-white/5 rounded-t-xl border-b border-neutral-200 dark:border-white/5">User permissions</h2>
            <div className="px-5 py-5 space-y-5">
              {([
                { key: "allowUserCreateServer", label: "Allow users to create servers", desc: "Users can create their own servers up to their limit." },
                { key: "allowUserDeleteServer", label: "Allow users to delete servers", desc: "Users can delete servers they own." },
              ] as { key: keyof PanelSettings; label: string; desc: string }[]).map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-700 dark:text-white">{item.label}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{item.desc}</p>
                  </div>
                  <Switch checked={!!form[item.key]} onCheckedChange={(v) => set({ [item.key]: v })} />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-white/5 rounded-xl border border-neutral-200 dark:border-white/5">
            <h2 className="text-[13px] font-medium text-neutral-800 dark:text-white px-5 py-3.5 bg-neutral-50 dark:bg-white/5 rounded-t-xl border-b border-neutral-200 dark:border-white/5">Default limits</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-5 py-5">
              {([
                { key: "defaultServerLimit", label: "Server limit", unit: "" },
                { key: "defaultMaxMemory", label: "Max memory", unit: "MB" },
                { key: "defaultMaxCpu", label: "Max CPU", unit: "%" },
                { key: "defaultMaxStorage", label: "Max storage", unit: "GB" },
              ] as { key: keyof PanelSettings; label: string; unit: string }[]).map((f) => (
                <div key={f.key} className="space-y-1.5">
                  <Label>
                    {f.label} {f.unit && <span className="text-neutral-400 font-normal">({f.unit})</span>}
                  </Label>
                  <Input type="number" value={form[f.key] as number}
                    onChange={(e) => set({ [f.key]: Number(e.target.value) })} />
                </div>
              ))}
            </div>
            <div className="px-5 pb-5 border-t border-neutral-200 dark:border-white/5 pt-4 flex justify-end">
              <Button>Save</Button>
            </div>
          </div>
        </div>
      )}

      {tab === "security" && (
        <div className="space-y-5">
          <div className="bg-white dark:bg-white/5 rounded-xl border border-neutral-200 dark:border-white/5">
            <h2 className="text-[13px] font-medium text-neutral-800 dark:text-white px-5 py-3.5 bg-neutral-50 dark:bg-white/5 rounded-t-xl border-b border-neutral-200 dark:border-white/5">VirusTotal</h2>
            <div className="px-5 py-5">
              <div className="space-y-1.5">
                <Label>API key</Label>
                <Input type="password" defaultValue={form.virusTotalApiKey ?? ""} placeholder="Paste your key" className="max-w-sm font-mono" />
                <p className="text-xs text-neutral-500">Get a free key at <a href="https://www.virustotal.com" target="_blank" className="underline">virustotal.com</a>.</p>
              </div>
            </div>
            <div className="px-5 pb-5 border-t border-neutral-200 dark:border-white/5 pt-4 flex justify-end">
              <Button>Save</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
