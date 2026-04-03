"use client";

import { use } from "react";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/modules/users/hooks";
import { cn } from "@/lib/utils";

export default function AdminViewUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user } = useUser(Number(id));

  if (!user) return <p className="text-sm text-neutral-500">Loading...</p>;

  const avatarUrl = `https://api.dicebear.com/9.x/thumbs/svg?seed=${user.username}`;

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/users" className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition">←</Link>
        <div className="flex-1">
          <h1 className="text-base font-medium text-neutral-800 dark:text-white">{user.username}</h1>
          <p className="text-sm text-neutral-500 mt-0.5">{user.email}</p>
        </div>
        <Link href={`/admin/users/edit/${id}`}>
          <Button size="sm" variant="outline"><Pencil className="w-4 h-4" />Edit</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-neutral-50 dark:bg-neutral-800/20 rounded-xl border border-neutral-200 dark:border-white/5 p-5">
          <div className="flex items-center gap-4 mb-4">
            <img src={avatarUrl} alt="" className="h-14 w-14 rounded-xl border border-neutral-200 dark:border-white/10" />
            <div>
              <p className="text-sm font-semibold text-neutral-800 dark:text-white">{user.username}</p>
              <span className={cn("inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset mt-1",
                user.isAdmin ? "bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 ring-emerald-600/20" : "bg-amber-600/10 text-amber-600 dark:text-amber-400 ring-amber-600/20")}>
                {user.isAdmin ? "Admin" : "User"}
              </span>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-neutral-500">Email</span><span className="text-neutral-800 dark:text-white">{user.email}</span></div>
            <div className="flex justify-between"><span className="text-neutral-500">Servers</span><span className="text-neutral-800 dark:text-white">{user.servers.length}</span></div>
            {user.description && <div className="flex justify-between"><span className="text-neutral-500">Description</span><span className="text-neutral-800 dark:text-white">{user.description}</span></div>}
          </div>
        </div>

        <div className="lg:col-span-2 bg-neutral-50 dark:bg-neutral-800/20 rounded-xl border border-neutral-200 dark:border-white/5 p-5">
          <h2 className="text-sm font-medium text-neutral-800 dark:text-white mb-4">Servers</h2>
          {user.servers.length === 0 ? (
            <p className="text-sm text-neutral-500">No servers assigned.</p>
          ) : (
            <div className="space-y-2">
              {user.servers.map((s) => (
                <div key={s.id} className="flex items-center justify-between bg-white dark:bg-neutral-800/40 rounded-lg border border-neutral-200 dark:border-white/5 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-neutral-800 dark:text-white">{s.name}</p>
                    <p className="text-xs font-mono text-neutral-400 mt-0.5">{s.UUID}</p>
                  </div>
                  <Link href={`/server/${s.UUID}`}><Button variant="outline" size="sm">Open</Button></Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
