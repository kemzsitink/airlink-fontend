"use client";

import { use, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useServer } from "@/modules/servers/hooks";
import { serversApi } from "@/modules/servers/api";

export default function ServerSettingsPage({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = use(params);
  const { data: server } = useServer(uuid);
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  async function handleSave() {
    if (!server) return;
    try {
      await serversApi.adminEdit(server.id, {
        name: nameRef.current?.value ?? server.name,
        description: descRef.current?.value ?? server.description,
      });
      toast.success("Settings saved");
    } catch {
      toast.error("Failed to save settings");
    }
  }

  async function handleDelete() {
    if (!server) return;
    if (!confirm("Are you sure you want to delete this server? This cannot be undone.")) return;
    try {
      await serversApi.delete(server.id);
      toast.success("Server deleted");
      router.push("/");
    } catch {
      toast.error("Failed to delete server");
    }
  }

  return (
    <div className="space-y-5">
      <div className="bg-white dark:bg-white/5 rounded-xl border border-neutral-200 dark:border-white/5">
        <h2 className="text-[13px] font-medium text-neutral-800 dark:text-white px-5 py-3.5 bg-neutral-50 dark:bg-white/5 rounded-t-xl border-b border-neutral-200 dark:border-white/5">General</h2>
        <div className="px-5 py-5 space-y-4">
          <div className="space-y-1.5 max-w-sm">
            <Label>Server Name</Label>
            <Input ref={nameRef} defaultValue={server?.name ?? "Minecraft SMP"} />
          </div>
          <div className="space-y-1.5 max-w-sm">
            <Label>Description</Label>
            <Textarea ref={descRef} rows={2} defaultValue={server?.description ?? "Main survival server"} className="resize-none" />
          </div>
        </div>
        <div className="px-5 pb-5 border-t border-neutral-200 dark:border-white/5 pt-4 flex justify-end">
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>

      <div className="bg-white dark:bg-white/5 rounded-xl border border-neutral-200 dark:border-white/5">
        <h2 className="text-[13px] font-medium text-neutral-800 dark:text-white px-5 py-3.5 bg-neutral-50 dark:bg-white/5 rounded-t-xl border-b border-neutral-200 dark:border-white/5">Danger Zone</h2>
        <div className="px-5 py-5">
          <p className="text-sm font-medium text-neutral-700 dark:text-white mb-1">Delete Server</p>
          <p className="text-xs text-neutral-500 mb-3">Permanently delete this server and all its data. This cannot be undone.</p>
          <Button variant="destructive" size="sm" onClick={handleDelete}>Delete Server</Button>
        </div>
      </div>
    </div>
  );
}
