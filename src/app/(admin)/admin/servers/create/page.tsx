"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockUsers = [{ id: 1, username: "admin" }, { id: 2, username: "player1" }];
const mockNodes = [{ id: 1, name: "Node-1" }, { id: 2, name: "Node-2" }];
const mockImages = [{ id: 1, name: "Minecraft Java" }, { id: 2, name: "Velocity Proxy" }];

export default function AdminCreateServerPage() {
  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/servers" className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <PageTitle title="Create Server" description="Create a new server on this panel" />
      </div>

      <div className="bg-neutral-50 dark:bg-neutral-800/20 rounded-xl p-5 border border-neutral-200 dark:border-white/5 max-w-3xl space-y-6">
        <div>
          <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-4">General</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Name</Label>
              <Input placeholder="My server" />
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Input placeholder="Server description" />
            </div>
            <div className="space-y-1.5">
              <Label>Owner</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select owner" /></SelectTrigger>
                <SelectContent>
                  {mockUsers.map((u) => <SelectItem key={u.id} value={String(u.id)}>{u.username}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Node</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select node" /></SelectTrigger>
                <SelectContent>
                  {mockNodes.map((n) => <SelectItem key={n.id} value={String(n.id)}>{n.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-4">Resources</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { id: "cpu", label: "CPU (Cores)", default: "2" },
              { id: "memory", label: "Memory (MB)", default: "1024" },
              { id: "storage", label: "Storage (GB)", default: "20" },
            ].map((f) => (
              <div key={f.id} className="space-y-1.5">
                <Label htmlFor={f.id}>{f.label}</Label>
                <Input id={f.id} type="number" defaultValue={f.default} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-4">Startup</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Image</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select image" /></SelectTrigger>
                <SelectContent>
                  {mockImages.map((i) => <SelectItem key={i.id} value={String(i.id)}>{i.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Docker Image</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select variant" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ghcr.io/airlinklabs/java:21">ghcr.io/airlinklabs/java:21</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button>Create Server</Button>
      </div>
    </>
  );
}
