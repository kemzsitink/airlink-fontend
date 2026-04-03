"use client";

import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";
import { useUsers } from "@/modules/users/hooks";
import { cn } from "@/lib/utils";

export default function AdminUsersPage() {
  const { users } = useUsers();
  const admins = users.filter((u) => u.isAdmin).length;
  const online = users.filter((u) => u.online).length;

  return (
    <>
      <PageTitle
        title="Users"
        description="Manage all users on this panel"
        actions={
          <Button asChild size="sm">
            <Link href="/admin/users/create"><Plus className="w-4 h-4" />Create User</Link>
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-neutral-50 dark:bg-neutral-800/20 rounded-xl p-5 border border-neutral-200 dark:border-white/5">
          <h2 className="text-lg font-medium text-neutral-800 dark:text-white mb-2">Total Users</h2>
          <p className="text-4xl font-normal text-neutral-800 dark:text-white">{users.length}</p>
          <p className="text-sm text-neutral-400 mt-2">{online > 0 ? `${online} online` : "No users online"}</p>
        </div>
        <div className="bg-neutral-50 dark:bg-neutral-800/20 rounded-xl p-5 border border-neutral-200 dark:border-white/5">
          <h2 className="text-lg font-medium text-neutral-800 dark:text-white mb-2">Admins</h2>
          <p className="text-4xl font-normal text-neutral-800 dark:text-white">{admins}</p>
          <p className="text-sm text-neutral-400 mt-2">No admins online</p>
        </div>
      </div>

      <div className="overflow-x-auto shadow-sm rounded-xl border border-neutral-200 dark:border-neutral-800/40">
        <table className="min-w-full divide-y divide-neutral-200 dark:divide-white/10">
          <thead className="bg-neutral-50 dark:bg-neutral-800/50">
            <tr>
              {["Name", "Role", "Servers", "Actions"].map((h) => (
                <th key={h} className="py-3.5 pl-4 pr-3 text-left text-sm font-medium text-neutral-800 dark:text-white">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-white/5 bg-white dark:bg-neutral-800/20">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-neutral-50 dark:hover:bg-white/[0.05] transition-colors cursor-pointer"
                onClick={() => (window.location.href = `/admin/users/view/${user.id}`)}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <img className="h-8 w-8 rounded-lg object-cover" src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user.username}`} alt="" />
                      <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                        {user.online
                          ? <><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border-2 border-white dark:border-neutral-900" /></>
                          : <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neutral-400 border-2 border-white dark:border-neutral-900" />}
                      </span>
                    </div>
                    <div className="font-medium text-neutral-800 dark:text-white">{user.username}</div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <span className={cn("inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
                    user.isAdmin ? "bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 ring-emerald-600/20" : "bg-amber-600/10 text-amber-600 dark:text-amber-400 ring-amber-600/20")}>
                    {user.isAdmin ? "Admin" : "User"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-neutral-600 dark:text-neutral-400">{user.servers.length}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm" onClick={(e) => e.stopPropagation()}>
                  <div className="flex gap-2">
                    <Link href={`/admin/users/view/${user.id}`}><Button variant="outline" size="sm">View</Button></Link>
                    <Link href={`/admin/users/edit/${user.id}`}><Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white border-none"><Pencil className="w-3 h-3" />Edit</Button></Link>
                    <Button variant="destructive" size="icon" className="h-8 w-8"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
