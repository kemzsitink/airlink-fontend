"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";
import { useImage } from "@/modules/images/hooks";

export default function AdminEditImagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { image } = useImage(Number(id));

  if (!image) return <p className="text-sm text-neutral-500">Loading...</p>;

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/images" className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <PageTitle title={`Edit Image — ${image.name}`} description="Configure Docker images and variables" />
      </div>

      <div className="space-y-5 max-w-3xl">
        <div className="bg-white dark:bg-white/5 rounded-xl border border-neutral-200 dark:border-white/5">
          <h2 className="text-[13px] font-medium text-neutral-800 dark:text-white px-5 py-3.5 bg-neutral-50 dark:bg-white/5 rounded-t-xl border-b border-neutral-200 dark:border-white/5">General</h2>
          <div className="grid grid-cols-2 gap-4 px-5 py-5">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-white mb-2">Name</label>
              <input type="text" defaultValue={image.name} className="rounded-xl border border-neutral-200 dark:border-neutral-600/30 focus:border-neutral-400 focus:outline-none text-sm w-full bg-neutral-100 dark:bg-neutral-700/20 px-4 py-2 text-neutral-800 dark:text-white transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-white mb-2">Author</label>
              <input type="text" defaultValue={image.author ?? ""} className="rounded-xl border border-neutral-200 dark:border-neutral-600/30 focus:border-neutral-400 focus:outline-none text-sm w-full bg-neutral-100 dark:bg-neutral-700/20 px-4 py-2 text-neutral-800 dark:text-white transition-colors" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-neutral-700 dark:text-white mb-2">Startup Command</label>
              <input type="text" defaultValue={image.startup} className="rounded-xl border border-neutral-200 dark:border-neutral-600/30 focus:border-neutral-400 focus:outline-none text-sm w-full bg-neutral-100 dark:bg-neutral-700/20 px-4 py-2 text-neutral-800 dark:text-white font-mono transition-colors" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-neutral-700 dark:text-white mb-2">Description</label>
              <textarea rows={2} defaultValue={image.description ?? ""} className="rounded-xl border border-neutral-200 dark:border-neutral-600/30 focus:border-neutral-400 focus:outline-none text-sm w-full bg-neutral-100 dark:bg-neutral-700/20 px-4 py-2 text-neutral-800 dark:text-white transition-colors resize-none" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-white/5 rounded-xl border border-neutral-200 dark:border-white/5">
          <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-50 dark:bg-white/5 rounded-t-xl border-b border-neutral-200 dark:border-white/5">
            <h2 className="text-[13px] font-medium text-neutral-800 dark:text-white">Docker Images</h2>
            <Button size="sm" variant="outline"><Plus className="w-3 h-3" />Add</Button>
          </div>
          <div className="px-5 py-5 space-y-2">
            {image.dockerImages.map((img, i) => (
              <div key={i} className="flex items-center gap-2">
                <input type="text" defaultValue={Object.keys(img)[0]} className="flex-1 rounded-xl border border-neutral-200 dark:border-neutral-600/30 focus:border-neutral-400 focus:outline-none text-sm bg-neutral-100 dark:bg-neutral-700/20 px-4 py-2 text-neutral-800 dark:text-white font-mono transition-colors" />
                <Button variant="destructive" size="icon" className="h-8 w-8 shrink-0"><Trash2 className="w-4 h-4" /></Button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-white/5 rounded-xl border border-neutral-200 dark:border-white/5">
          <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-50 dark:bg-white/5 rounded-t-xl border-b border-neutral-200 dark:border-white/5">
            <h2 className="text-[13px] font-medium text-neutral-800 dark:text-white">Variables</h2>
            <Button size="sm" variant="outline"><Plus className="w-3 h-3" />Add Variable</Button>
          </div>
          <div className="px-5 py-5 space-y-4">
            {image.variables.map((v, i) => (
              <div key={i} className="grid grid-cols-3 gap-3 items-end">
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1">Name</label>
                  <input type="text" defaultValue={v.name} className="rounded-xl border border-neutral-200 dark:border-neutral-600/30 focus:border-neutral-400 focus:outline-none text-sm w-full bg-neutral-100 dark:bg-neutral-700/20 px-3 py-2 text-neutral-800 dark:text-white transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1">Env Variable</label>
                  <input type="text" defaultValue={v.env} className="rounded-xl border border-neutral-200 dark:border-neutral-600/30 focus:border-neutral-400 focus:outline-none text-sm w-full bg-neutral-100 dark:bg-neutral-700/20 px-3 py-2 text-neutral-800 dark:text-white font-mono transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1">Default Value</label>
                  <div className="flex gap-2">
                    <input type="text" defaultValue={v.value} className="flex-1 rounded-xl border border-neutral-200 dark:border-neutral-600/30 focus:border-neutral-400 focus:outline-none text-sm bg-neutral-100 dark:bg-neutral-700/20 px-3 py-2 text-neutral-800 dark:text-white transition-colors" />
                    <Button variant="destructive" size="icon" className="h-9 w-9 shrink-0"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end"><Button>Save Image</Button></div>
      </div>
    </>
  );
}
