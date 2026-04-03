"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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
          <div className="space-y-1.5">
            <Label>Username</Label>
            <Input defaultValue={mockUser.username} />
          </div>
          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input type="email" defaultValue={mockUser.email} />
          </div>
          <div className="space-y-1.5">
            <Label>New Password</Label>
            <Input type="password" placeholder="Leave blank to keep current" />
          </div>
          <div className="space-y-1.5 pt-1">
            <Label>Admin access</Label>
            <div className="flex items-center gap-2 pt-1">
              <Switch defaultChecked={mockUser.isAdmin} />
            </div>
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
              <div key={f.label} className="space-y-1.5">
                <Label>{f.label}</Label>
                <Input type="number" defaultValue={f.value} />
              </div>
            ))}
          </div>
        </div>

        <Button>Save Changes</Button>
      </div>
    </>
  );
}
