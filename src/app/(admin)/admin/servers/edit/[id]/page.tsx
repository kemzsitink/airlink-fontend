"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const mockServer = { id: 1, name: "Minecraft SMP", description: "Main survival server", cpu: 2, memory: 4096, storage: 20, suspended: false };

export default function AdminEditServerPage({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/servers" className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <PageTitle title={`Edit Server — ${mockServer.name}`} description="Modify server configuration" />
      </div>

      <div className="bg-neutral-50 dark:bg-neutral-800/20 rounded-xl p-5 border border-neutral-200 dark:border-white/5 max-w-2xl space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Name</Label>
            <Input defaultValue={mockServer.name} />
          </div>
          <div className="space-y-1.5">
            <Label>Description</Label>
            <Input defaultValue={mockServer.description} />
          </div>
          <div className="space-y-1.5">
            <Label>CPU (Cores)</Label>
            <Input type="number" defaultValue={mockServer.cpu} />
          </div>
          <div className="space-y-1.5">
            <Label>Memory (MB)</Label>
            <Input type="number" defaultValue={mockServer.memory} />
          </div>
          <div className="space-y-1.5">
            <Label>Storage (GB)</Label>
            <Input type="number" defaultValue={mockServer.storage} />
          </div>
          <div className="space-y-1.5 pt-1">
            <Label>Suspended</Label>
            <div className="flex items-center gap-2 pt-1">
              <Switch defaultChecked={mockServer.suspended} />
            </div>
          </div>
        </div>
        <Button>Save Changes</Button>
      </div>
    </>
  );
}
