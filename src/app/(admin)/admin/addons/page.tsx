"use client";

import { useState } from "react";
import Link from "next/link";
import { RefreshCw, Trash2, Store } from "lucide-react";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddons, useToggleAddon, useUninstallAddon } from "@/modules/addons/hooks";
import { cn } from "@/lib/utils";

export default function AdminAddonsPage() {
  const { data: addons = [], refetch } = useAddons();
  const toggleMutation = useToggleAddon();
  const uninstallMutation = useUninstallAddon();
  const [filter, setFilter] = useState("");
  const filtered = addons.filter((a: { name: string; description?: string; author?: string }) =>
    `${a.name} ${a.description ?? ""} ${a.author ?? ""}`.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <PageTitle
        title="Addons"
        description="Manage installed addons and browse the store"
        actions={<Button variant="outline" size="sm"><RefreshCw className="w-4 h-4" />Reload</Button>}
      />

      <div className="flex border-b border-neutral-200 dark:border-neutral-800 mb-5">
        <span className="px-1 py-2.5 mr-5 text-sm font-medium text-neutral-800 dark:text-white border-b-2 border-neutral-800 dark:border-white -mb-px">
          Installed <span className="ml-1 text-xs text-neutral-400">{addons.length}</span>
        </span>
        <Link href="/admin/addons/store" className="px-1 py-2.5 text-sm font-medium text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 border-b-2 border-transparent -mb-px transition">Store</Link>
      </div>

      {addons.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-sm text-neutral-500">No addons installed.</p>
          <Button asChild variant="outline" size="sm" className="mt-4">
            <Link href="/admin/addons/store"><Store className="w-4 h-4" />Browse Store</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <Input placeholder="Filter addons…" value={filter} onChange={(e) => setFilter(e.target.value)} className="w-56" />
          </div>
          <div className="overflow-x-auto shadow-sm rounded-xl border border-neutral-200 dark:border-neutral-800/40">
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-white/10">
              <thead className="bg-neutral-50 dark:bg-neutral-800/50">
                <tr>
                  {["Name", "Version", "Status", "Actions"].map((h) => (
                    <th key={h} className="py-3.5 pl-6 pr-3 text-left text-sm font-medium text-neutral-800 dark:text-white">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-white/5 bg-white dark:bg-neutral-800/20">
                {filtered.map((addon) => (
                  <tr key={addon.slug} className="hover:bg-neutral-50 dark:hover:bg-white/[0.05] transition-colors">
                    <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm">
                      <p className="font-medium text-neutral-800 dark:text-white">{addon.name}</p>
                      {addon.description && <p className="text-xs text-neutral-500 mt-0.5 max-w-xs truncate">{addon.description}</p>}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                      v{addon.version}{addon.author && ` · ${addon.author}`}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span className={cn("inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
                        addon.enabled ? "bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 ring-emerald-600/20" : "bg-neutral-100 dark:bg-white/5 text-neutral-500 ring-neutral-300 dark:ring-white/10")}>
                        {addon.enabled ? "Enabled" : "Disabled"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => toggleMutation.mutate({ slug: addon.slug, enabled: !addon.enabled })}>
                          {addon.enabled ? "Disable" : "Enable"}
                        </Button>
                        <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => uninstallMutation.mutate(addon.slug)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
