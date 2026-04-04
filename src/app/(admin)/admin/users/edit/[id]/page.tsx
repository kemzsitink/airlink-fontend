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
import { useUser, useUpdateUser } from "@/modules/users/hooks";

export default function AdminEditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const userId = Number(id);
  const { data: user } = useUser(userId);
  const updateUser = useUpdateUser(userId);

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const serverLimitRef = useRef<HTMLInputElement>(null);
  const maxMemoryRef = useRef<HTMLInputElement>(null);
  const maxCpuRef = useRef<HTMLInputElement>(null);
  const maxStorageRef = useRef<HTMLInputElement>(null);
  const [isAdmin, setIsAdmin] = useState(user?.isAdmin ?? false);

  function handleSave() {
    const payload: Record<string, unknown> = {
      username: usernameRef.current?.value || undefined,
      email: emailRef.current?.value || undefined,
      isAdmin,
      serverLimit: serverLimitRef.current ? Number(serverLimitRef.current.value) : undefined,
      maxMemory: maxMemoryRef.current ? Number(maxMemoryRef.current.value) : undefined,
      maxCpu: maxCpuRef.current ? Number(maxCpuRef.current.value) : undefined,
      maxStorage: maxStorageRef.current ? Number(maxStorageRef.current.value) : undefined,
    };
    const pw = passwordRef.current?.value;
    if (pw) payload.password = pw;

    updateUser.mutate(payload as Parameters<typeof updateUser.mutate>[0], {
      onSuccess: () => toast.success("User updated"),
      onError: () => toast.error("Failed to update user"),
    });
  }

  if (!user) return <p className="text-sm text-neutral-500 p-4">Loading...</p>;

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/users" className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <PageTitle title={`Edit User — ${user.username}`} description="Modify user account settings" />
      </div>

      <div className="bg-neutral-50 dark:bg-neutral-800/20 rounded-xl p-5 border border-neutral-200 dark:border-white/5 max-w-xl space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Username</Label>
            <Input ref={usernameRef} defaultValue={user.username} />
          </div>
          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input ref={emailRef} type="email" defaultValue={user.email} />
          </div>
          <div className="space-y-1.5">
            <Label>New Password</Label>
            <Input ref={passwordRef} type="password" placeholder="Leave blank to keep current" />
          </div>
          <div className="space-y-1.5 pt-1">
            <Label>Admin access</Label>
            <div className="flex items-center gap-2 pt-1">
              <Switch checked={isAdmin} onCheckedChange={setIsAdmin} />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">Resource Limits</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Server Limit", ref: serverLimitRef, value: user.serverLimit },
              { label: "Max Memory (MB)", ref: maxMemoryRef, value: user.maxMemory },
              { label: "Max CPU (%)", ref: maxCpuRef, value: user.maxCpu },
              { label: "Max Storage (GB)", ref: maxStorageRef, value: user.maxStorage },
            ].map((f) => (
              <div key={f.label} className="space-y-1.5">
                <Label>{f.label}</Label>
                <Input ref={f.ref} type="number" defaultValue={f.value} />
              </div>
            ))}
          </div>
        </div>

        <Button onClick={handleSave} disabled={updateUser.isPending}>
          {updateUser.isPending ? "Saving…" : "Save Changes"}
        </Button>
      </div>
    </>
  );
}
