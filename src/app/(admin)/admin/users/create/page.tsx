"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, X } from "lucide-react";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";
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
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-400 mb-2">Email:</label>
            <input type="email" placeholder="example@domain.com" className="rounded-xl text-neutral-800 dark:text-white text-sm w-full px-4 py-2 bg-neutral-400/10 dark:bg-neutral-600/20 border border-neutral-800/10 dark:border-white/5 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-white/20" />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-400 mb-2">Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username"
              className="rounded-xl text-neutral-800 dark:text-white text-sm w-full px-4 py-2 bg-neutral-400/10 dark:bg-neutral-600/20 border border-neutral-800/10 dark:border-white/5 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-white/20" />
            {username && (
              <div className="mt-2 space-y-1">
                <Crit ok={uLen} label="3–20 characters" />
                <Crit ok={uChars} label="Letters and numbers only" />
              </div>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-400 mb-2">Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
              className="rounded-xl text-neutral-800 dark:text-white text-sm w-full px-4 py-2 bg-neutral-400/10 dark:bg-neutral-600/20 border border-neutral-800/10 dark:border-white/5 focus:outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-white/20" />
            {password && (
              <div className="mt-2 space-y-1">
                <Crit ok={pLen} label="At least 8 characters" />
                <Crit ok={pLetter} label="At least one letter" />
                <Crit ok={pNum} label="At least one number" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-400 mb-2">Admin:</label>
            <div className="flex items-center gap-3 mt-1">
              <button onClick={() => setIsAdmin(!isAdmin)}
                className={cn("relative inline-flex h-6 w-11 items-center rounded-full transition-colors", isAdmin ? "bg-blue-600" : "bg-neutral-300 dark:bg-neutral-600")}>
                <span className={cn("inline-block h-5 w-5 transform rounded-full bg-white border transition-transform", isAdmin ? "translate-x-5" : "translate-x-0.5")} />
              </button>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">Admin access</span>
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
