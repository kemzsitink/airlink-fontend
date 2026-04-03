"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, X } from "lucide-react";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function Crit({ ok, label }: { ok: boolean | null; label: string }) {
  return (
    <p className={cn("text-xs flex items-center gap-1", ok === null ? "text-neutral-400" : ok ? "text-green-500" : "text-red-500")}>
      {ok === null ? "—" : ok ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
      {label}
    </p>
  );
}

export default function AdminCreateUserPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const uLen = username.length >= 3 && username.length <= 20;
  const uChars = /^[a-zA-Z0-9]*$/.test(username);
  const pLen = password.length >= 8;
  const pLetter = /[A-Za-z]/.test(password);
  const pNum = /\d/.test(password);

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/users" className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <PageTitle title="Create User" description="Add a new user to this panel" />
      </div>

      <div className="bg-neutral-50 dark:bg-neutral-800/20 rounded-xl p-5 border border-neutral-200 dark:border-white/5 max-w-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input type="email" placeholder="example@domain.com" />
          </div>

          <div className="space-y-1.5">
            <Label>Username</Label>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
            {username && (
              <div className="space-y-1">
                <Crit ok={uLen} label="3–20 characters" />
                <Crit ok={uChars} label="Letters and numbers only" />
              </div>
            )}
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <Label>Password</Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            {password && (
              <div className="space-y-1">
                <Crit ok={pLen} label="At least 8 characters" />
                <Crit ok={pLetter} label="At least one letter" />
                <Crit ok={pNum} label="At least one number" />
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <Label>Admin access</Label>
            <div className="flex items-center gap-2 pt-1">
              <Switch checked={isAdmin} onCheckedChange={setIsAdmin} />
              <span className="text-sm text-neutral-500 dark:text-neutral-400">{isAdmin ? "Enabled" : "Disabled"}</span>
            </div>
          </div>

          <div className="sm:col-span-2 flex justify-end">
            <Button>Create User</Button>
          </div>
        </div>
      </div>
    </>
  );
}
