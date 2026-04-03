"use client";

import { useState } from "react";
import { Plus, Copy, Pencil, Trash2, BookOpen } from "lucide-react";
import Link from "next/link";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";
import { useApiKeys } from "@/modules/apikeys/hooks";
import { cn } from "@/lib/utils";

export default function AdminApiKeysPage() {
  const { data: keys = [] } = useApiKeys();
  const [copied, setCopied] = useState<number | null>(null);

  function copyKey(id: number, key: string) {
    navigator.clipboard.writeText(key);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <>
      <PageTitle
        title="API Keys"
        description="Create and manage API keys with specific permissions"
        actions={
          <div className="flex gap-2">
            <Button size="sm"><Plus className="w-4 h-4" />Create API Key</Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/apikeys/docs"><BookOpen className="w-4 h-4" />API Docs</Link>
            </Button>
          </div>
        }
      />

      <div className="rounded-xl bg-neutral-700/10 dark:bg-neutral-900 p-6">
        <h2 className="text-base font-semibold text-neutral-800 dark:text-white mb-1">API Keys</h2>
        <p className="text-sm text-neutral-500 mb-6">A list of all API keys in your panel.</p>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
            <thead>
              <tr>
                {["Name", "Key", "Created By", "Status", "Created", ""].map((h) => (
                  <th key={h} className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-neutral-800 dark:text-white">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {keys.length === 0 ? (
                <tr><td colSpan={6} className="py-4 text-center text-sm text-neutral-500">No API keys found</td></tr>
              ) : keys.map((key) => (
                <tr key={key.id} className="hover:bg-neutral-50 dark:hover:bg-white/[0.03] transition-colors">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-neutral-800 dark:text-white">
                    {key.name}
                    {key.description && <p className="text-xs text-neutral-500">{key.description}</p>}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-neutral-500">
                    <div className="flex items-center gap-2">
                      <span className="font-mono">{key.key.substring(0, 8)}...</span>
                      <button onClick={() => copyKey(key.id, key.key)} className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition">
                        <Copy className="w-4 h-4" />
                      </button>
                      {copied === key.id && <span className="text-xs text-emerald-500">Copied!</span>}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-neutral-500">{key.user.username}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span className={cn("inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
                      key.active ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 ring-green-600/20" : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 ring-red-600/20")}>
                      {key.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-neutral-500">{new Date(key.createdAt).toLocaleDateString()}</td>
                  <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm">
                    <div className="flex gap-2 justify-end">
                      <button className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition"><Pencil className="w-5 h-5" /></button>
                      <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
