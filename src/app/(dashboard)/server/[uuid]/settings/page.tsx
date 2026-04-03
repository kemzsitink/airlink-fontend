"use client";

import { Button } from "@/components/ui/button";

export default function ServerSettingsPage() {
  return (
    <div className="space-y-5">
      <div className="bg-white dark:bg-white/5 rounded-xl border border-neutral-200 dark:border-white/5">
        <h2 className="text-[13px] font-medium text-neutral-800 dark:text-white px-5 py-3.5 bg-neutral-50 dark:bg-white/5 rounded-t-xl border-b border-neutral-200 dark:border-white/5">General</h2>
        <div className="px-5 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-white mb-2">Server Name</label>
            <input type="text" defaultValue="Minecraft SMP" className="rounded-xl border border-neutral-200 dark:border-neutral-600/30 focus:border-neutral-400 focus:outline-none text-sm w-full max-w-sm bg-neutral-100 dark:bg-neutral-700/20 px-4 py-2 text-neutral-800 dark:text-white transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-white mb-2">Description</label>
            <textarea rows={2} defaultValue="Main survival server" className="rounded-xl border border-neutral-200 dark:border-neutral-600/30 focus:border-neutral-400 focus:outline-none text-sm w-full max-w-sm bg-neutral-100 dark:bg-neutral-700/20 px-4 py-2 text-neutral-800 dark:text-white transition-colors resize-none" />
          </div>
        </div>
        <div className="px-5 pb-5 border-t border-neutral-200 dark:border-white/5 pt-4 flex justify-end">
          <Button>Save</Button>
        </div>
      </div>

      <div className="bg-white dark:bg-white/5 rounded-xl border border-neutral-200 dark:border-white/5">
        <h2 className="text-[13px] font-medium text-neutral-800 dark:text-white px-5 py-3.5 bg-neutral-50 dark:bg-white/5 rounded-t-xl border-b border-neutral-200 dark:border-white/5">Danger Zone</h2>
        <div className="px-5 py-5">
          <p className="text-sm font-medium text-neutral-700 dark:text-white mb-1">Delete Server</p>
          <p className="text-xs text-neutral-500 mb-3">Permanently delete this server and all its data. This cannot be undone.</p>
          <Button variant="destructive" size="sm">Delete Server</Button>
        </div>
      </div>
    </div>
  );
}
