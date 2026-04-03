"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";

const mockUser = { id: 1, username: "admin", email: "admin@example.com", isAdmin: true, serverLimit: 10, maxMemory: 8192, maxCpu: 400, maxStorage: 100 };

export default function AdminEditUserPage({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/users" className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <PageTitle title={`Edit User — ${mockUser.username}`} description="Modify user account settings" />
      </div>

      <div className="bg-neutral-50 dark:bg-neutral-800/20 rounded-xl p-5 border border-neutral-200 dark:border-white/5 max-w-xl space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-400 mb-2">Username:</label>
            <input type="text" defaultValue={mockUser.username} className="rounded-xl text-neutral-800 dark:text-white text-sm w-full px-4 py-2 bg-neutral-400/10 dark:bg-neutral-600/20 border border-neutral-800/10 dark:border-white/5 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-white/20" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-400 mb-2">Email:</label>
            <input type="email" defaultValue={mockUser.email} className="rounded-xl text-neutral-800 dark:text-white text-sm w-full px-4 py-2 bg-neutral-400/10 dark:bg-neutral-600/20 border border-neutral-800/10 dark:border-white/5 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-white/20" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-400 mb-2">New Password:</label>
            <input type="password" placeholder="Leave blank to keep current" className="rounded-xl text-neutral-800 dark:text-white text-sm w-full px-4 py-2 bg-neutral-400/10 dark:bg-neutral-600/20 border border-neutral-800/10 dark:border-white/5 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-white/20" />
          </div>
          <div className="flex items-center gap-3 pt-6">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-400">Admin:</label>
            <input type="checkbox" defaultChecked={mockUser.isAdmin} className="h-4 w-4 rounded border-neutral-300" />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">Resource Limits</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Server Limit", value: mockUser.serverLimit },
              { label: "Max Memory (MB)", value: mockUser.maxMemory },
              { label: "Max CPU (%)", value: mockUser.maxCpu },
              { label: "Max Storage (GB)", value: mockUser.maxStorage },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-400 mb-2">{f.label}:</label>
                <input type="number" defaultValue={f.value} className="rounded-xl text-neutral-800 dark:text-white text-sm w-full px-4 py-2 bg-neutral-400/10 dark:bg-neutral-600/20 border border-neutral-800/10 dark:border-white/5 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-white/20" />
              </div>
            ))}
          </div>
        </div>

        <Button>Save Changes</Button>
      </div>
    </>
  );
}
