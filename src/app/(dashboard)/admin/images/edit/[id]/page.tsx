"use client";

import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";

const mockImage = {
  id: 1, name: "Minecraft Java", author: "AirlinkLabs", description: "Minecraft Java Edition server",
  startup: "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar server.jar nogui",
  dockerImages: ["ghcr.io/airlinklabs/java:21", "ghcr.io/airlinklabs/java:17"],
  variables: [
    { name: "SERVER_MEMORY", env: "SERVER_MEMORY", description: "Max memory in MB", value: "1024" },
    { name: "SERVER_JARFILE", env: "SERVER_JARFILE", description: "Server jar filename", value: "server.jar" },
  ],
};

export default async function AdminEditImagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/images" className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <PageTitle title={`Edit Image — ${mockImage.name}`} description="Configure Docker images and variables" />
      </div>

      <div className="space-y-5 max-w-3xl">
        {/* General */}
        <div className="bg-white dark:bg-white/5 rounded-xl border border-neutral-200 dark:border-white/5">
          <h2 className="text-[13px] font-medium text-neutral-800 dark:text-white px-5 py-3.5 bg-neutral-50 dark:bg-white/5 rounded-t-xl border-b border-neutral-200 dark:border-white/5">General</h2>
          <div className="grid grid-cols-2 gap-4 px-5 py-5">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-white mb-2">Name</label>
              <input type="text" defaultValue={mockImage.name} className="rounded-xl border border-neutral-200 dark:border-neutral-600/30 focus:border-neutral-400 focus:outline-none text-sm w-full bg-neutral-100 dark:bg-neutral-700/20 px-4 py-2 text-neutral-800 dark:text-white transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-white mb-2">Author</label>
              <input type="text" defaultValue={mockImage.author} className="rounded-xl border border-neutral-200 dark:border-neutral-600/30 focus:border-neutral-400 focus:outline-none text-sm w-full bg-neutral-100 dark:bg-neutral-700/20 px-4 py-2 text-neutral-800 dark:text-white transition-colors" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-neutral-700 dark:text-white mb-2">Startup Command</label>
              <input type="text" defaultValue={mockImage.startup} className="rounded-xl border border-neutral-200 dark:border-neutral-600/30 focus:border-neutral-400 focus:outline-none text-sm w-full bg-neutral-100 dark:bg-neutral-700/20 px-4 py-2 text-neutral-800 dark:text-white font-mono transition-colors" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-neutral-700 dark:text-white mb-2">Description</label>
              <textarea rows={2} defaultValue={mockImage.description} className="rounded-xl border border-neutral-200 dark:border-neutral-600/30 focus:border-neutral-400 focus:outline-none text-sm w-full bg-neutral-100 dark:bg-neutral-700/20 px-4 py-2 text-neutral-800 dark:text-white transition-colors resize-none" />
            </div>
          </div>
        </div>

        {/* Docker Images */}
        <div className="bg-white dark:bg-white/5 rounded-xl border border-neutral-200 dark:border-white/5">
          <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-50 dark:bg-white/5 rounded-t-xl border-b border-neutral-200 dark:border-white/5">
            <h2 className="text-[13px] font-medium text-neutral-800 dark:text-white">Docker Images</h2>
            <Button size="sm" variant="outline"><Plus className="w-3 h-3" />Add</Button>
          </div>
          <div className="px-5 py-5 space-y-2">
            {mockImage.dockerImages.map((img, i) => (
              <div key={i} className="flex items-center gap-2">
                <input type="text" defaultValue={img} className="flex-1 rounded-xl border border-neutral-200 dark:border-neutral-600/30 focus:border-neutral-400 focus:outline-none text-sm bg-neutral-100 dark:bg-neutral-700/20 px-4 py-2 text-neutral-800 dark:text-white font-mono transition-colors" />
                <Button variant="destructive" size="icon" className="h-8 w-8 shrink-0"><Trash2 className="w-4 h-4" /></Button>
              </div>
            ))}
          </div>
        </div>

        {/* Variables */}
        <div className="bg-white dark:bg-white/5 rounded-xl border border-neutral-200 dark:border-white/5">
          <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-50 dark:bg-white/5 rounded-t-xl border-b border-neutral-200 dark:border-white/5">
            <h2 className="text-[13px] font-medium text-neutral-800 dark:text-white">Variables</h2>
            <Button size="sm" variant="outline"><Plus className="w-3 h-3" />Add Variable</Button>
          </div>
          <div className="px-5 py-5 space-y-4">
            {mockImage.variables.map((v, i) => (
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

        <div className="flex justify-end">
          <Button>Save Image</Button>
        </div>
      </div>
    </>
  );
}
