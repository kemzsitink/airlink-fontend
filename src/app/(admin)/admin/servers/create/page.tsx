"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";

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
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-400 mb-2">Name:</label>
              <input type="text" placeholder="My server" className="rounded-xl text-neutral-800 dark:text-white text-sm w-full px-4 py-2 bg-neutral-400/10 dark:bg-neutral-600/20 border border-neutral-800/10 dark:border-white/5 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-white/20" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-400 mb-2">Description:</label>
              <input type="text" placeholder="Server description" className="rounded-xl text-neutral-800 dark:text-white text-sm w-full px-4 py-2 bg-neutral-400/10 dark:bg-neutral-600/20 border border-neutral-800/10 dark:border-white/5 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-white/20" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-400 mb-2">Owner:</label>
              <select className="rounded-xl text-neutral-800 dark:text-white text-sm w-full px-4 py-2 bg-neutral-400/10 dark:bg-neutral-600/20 border border-neutral-800/10 dark:border-white/5 focus:outline-none">
                {mockUsers.map((u) => <option key={u.id} value={u.id}>{u.username}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-400 mb-2">Node:</label>
              <select className="rounded-xl text-neutral-800 dark:text-white text-sm w-full px-4 py-2 bg-neutral-400/10 dark:bg-neutral-600/20 border border-neutral-800/10 dark:border-white/5 focus:outline-none">
                {mockNodes.map((n) => <option key={n.id} value={n.id}>{n.name}</option>)}
              </select>
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
              <div key={f.id}>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-400 mb-2">{f.label}:</label>
                <input type="number" defaultValue={f.default} className="rounded-xl text-neutral-800 dark:text-white text-sm w-full px-4 py-2 bg-neutral-400/10 dark:bg-neutral-600/20 border border-neutral-800/10 dark:border-white/5 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-white/20" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-4">Startup</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-400 mb-2">Image:</label>
              <select className="rounded-xl text-neutral-800 dark:text-white text-sm w-full px-4 py-2 bg-neutral-400/10 dark:bg-neutral-600/20 border border-neutral-800/10 dark:border-white/5 focus:outline-none">
                {mockImages.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-400 mb-2">Docker Image:</label>
              <select className="rounded-xl text-neutral-800 dark:text-white text-sm w-full px-4 py-2 bg-neutral-400/10 dark:bg-neutral-600/20 border border-neutral-800/10 dark:border-white/5 focus:outline-none">
                <option>ghcr.io/airlinklabs/java:21</option>
              </select>
            </div>
          </div>
        </div>

        <Button type="submit">Create Server</Button>
      </div>
    </>
  );
}
