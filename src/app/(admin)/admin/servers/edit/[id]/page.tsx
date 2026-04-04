"use client";

import { use, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { serversApi } from "@/modules/servers/api";

export default function AdminEditServerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const serverId = Number(id);

  const { data: servers = [] } = useQuery({ queryKey: ["servers", "list"], queryFn: serversApi.list });
  const server = servers.find((s) => s.id === serverId);

  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const cpuRef = useRef<HTMLInputElement>(null);
  const memoryRef = useRef<HTMLInputElement>(null);
  const storageRef = useRef<HTMLInputElement>(null);
  const [suspended, setSuspended] = useState(server?.Suspended ?? false);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      await serversApi.adminEdit(serverId, {
        name: nameRef.current?.value || undefined,
        description: descRef.current?.value || undefined,
        Suspended: suspended,
        Cpu: cpuRef.current?.value ? Number(cpuRef.current.value) : undefined,
        Memory: memoryRef.current?.value ? Number(memoryRef.current.value) : undefined,
      });
      toast.success("Server updated");
    } catch {
      toast.error("Failed to update server");
    } finally {
      setSaving(false);
    }
  }

  const displayName = server?.name ?? "Server";

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/servers" className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <PageTitle title={`Edit Server — ${displayName}`} description="Modify server configuration" />
      </div>

      <div className="bg-neutral-50 dark:bg-neutral-800/20 rounded-xl p-5 border border-neutral-200 dark:border-white/5 max-w-2xl space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Name</Label>
            <Input ref={nameRef} defaultValue={server?.name ?? ""} />
          </div>
          <div className="space-y-1.5">
            <Label>Description</Label>
            <Input ref={descRef} defaultValue={server?.description ?? ""} />
          </div>
          <div className="space-y-1.5">
            <Label>CPU (Cores)</Label>
            <Input ref={cpuRef} type="number" defaultValue={server?.cpuUsage ?? 2} />
          </div>
          <div className="space-y-1.5">
            <Label>Memory (MB)</Label>
            <Input ref={memoryRef} type="number" defaultValue={server?.ramUsage ?? 1024} />
          </div>
          <div className="space-y-1.5 pt-1">
            <Label>Suspended</Label>
            <div className="flex items-center gap-2 pt-1">
              <Switch checked={suspended} onCheckedChange={setSuspended} />
            </div>
          </div>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : "Save Changes"}
        </Button>
      </div>
    </>
  );
}
