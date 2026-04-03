"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex min-h-screen">
      <div className="w-full max-w-[420px] flex-shrink-0 flex flex-col justify-center px-10 py-12 bg-white/8 dark:bg-[#141414]/8 backdrop-blur-2xl border-r border-black/8 dark:border-white/8 relative z-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">Create account</h1>
          <p className="text-sm text-neutral-500 mt-1">Join AirLink</p>
        </div>

        <form method="POST" action="/api/auth/register" onSubmit={() => setLoading(true)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" type="text" autoComplete="username" required placeholder="yourname" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input id="password" name="password" type={showPassword ? "text" : "password"}
                autoComplete="new-password" required placeholder="••••••••" className="pr-10" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition"
                aria-label="Toggle password visibility">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? <span className="w-4 h-4 border-2 border-white/25 border-t-white rounded-full animate-spin" /> : "Create account"}
          </Button>
        </form>

        <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-neutral-800 dark:text-neutral-200 hover:underline">Sign in</Link>
        </p>
      </div>

      <div className="flex-1 bg-cover bg-center hidden md:block"
        style={{ backgroundImage: "url('https://i.imgur.com/j9BodUY.jpeg')" }} />
    </div>
  );
}
