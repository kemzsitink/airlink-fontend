"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ServerSettingsPage() {
  return (
    <div className="space-y-5">
      <div className="bg-white dark:bg-white/5 rounded-xl border border-neutral-200 dark:border-white/5">
        <h2 className="text-[13px] font-medium text-neutral-800 dark:text-white px-5 py-3.5 bg-neutral-50 dark:bg-white/5 rounded-t-xl border-b border-neutral-200 dark:border-white/5">General</h2>
        <div className="px-5 py-5 space-y-4">
          <div className="space-y-1.5 max-w-sm">
            <Label>Server Name</Label>
            <Input defaultValue="Minecraft SMP" />
          </div>
          <div className="space-y-1.5 max-w-sm">
            <Label>Description</Label>
            <Textarea rows={2} defaultValue="Main survival server" className="resize-none" />
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
