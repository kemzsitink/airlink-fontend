"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, Search } from "lucide-react";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";
import { MOCK_STORE_IMAGES } from "@/modules/images/types";

export default function AdminImageStorePage() {
  const [filter, setFilter] = useState("");
  const filtered = MOCK_STORE_IMAGES.filter((i) =>
    `${i.name} ${i.description} ${i.tags.join(" ")}`.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <PageTitle title="Image Store" description="Browse and install server images" />

      <div className="flex border-b border-neutral-200 dark:border-neutral-800 mb-5">
        <Link href="/admin/images" className="px-1 py-2.5 mr-5 text-sm font-medium text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 border-b-2 border-transparent -mb-px transition">Installed</Link>
        <span className="px-1 py-2.5 text-sm font-medium text-neutral-800 dark:text-white border-b-2 border-neutral-800 dark:border-white -mb-px">Store</span>
      </div>

      <div className="relative mb-5 max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <input type="text" placeholder="Search images…" value={filter} onChange={(e) => setFilter(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm text-neutral-800 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((img) => (
          <div key={img.slug} className="bg-white dark:bg-neutral-800/20 rounded-xl border border-neutral-200 dark:border-white/5 p-5 flex flex-col gap-3">
            <div>
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-neutral-800 dark:text-white">{img.name}</p>
                {img.installed && (
                  <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-1.5 py-0.5 rounded-md shrink-0">Installed</span>
                )}
              </div>
              <p className="text-xs text-neutral-500 mt-1">{img.description}</p>
              <p className="text-xs text-neutral-400 mt-0.5">by {img.author}</p>
            </div>
            <div className="flex flex-wrap gap-1">
              {img.tags.map((t) => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-700/40 text-neutral-500 dark:text-neutral-400">{t}</span>
              ))}
            </div>
            <Button variant={img.installed ? "outline" : "default"} size="sm" className="mt-auto">
              <Download className="w-4 h-4" />
              {img.installed ? "Reinstall" : "Install"}
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
