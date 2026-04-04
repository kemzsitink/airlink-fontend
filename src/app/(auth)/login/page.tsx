"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { authApi } from "@/modules/auth/api";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    try {
      await authApi.login({
        identifier: form.get("identifier") as string,
        password: form.get("password") as string,
        rememberMe: form.get("remember-me") === "on",
      });
      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-full max-w-[420px] flex-shrink-0 flex flex-col justify-center px-10 py-12 bg-white/8 dark:bg-[#141414]/8 backdrop-blur-2xl border-r border-black/8 dark:border-white/8 relative z-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">Sign in</h1>
          <p className="text-sm text-neutral-500 mt-1">to AirLink</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 px-4 py-3">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="identifier">Username or email</Label>
            <Input id="identifier" name="identifier" type="text" autoComplete="username" required placeholder="you@example.com" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input id="password" name="password" type={showPassword ? "text" : "password"}
                autoComplete="current-password" required placeholder="••••••••" className="pr-10" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition"
                aria-label="Toggle password visibility">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="remember" name="remember-me" />
            <Label htmlFor="remember" className="text-sm text-neutral-500 dark:text-neutral-400 cursor-pointer font-normal">
              Remember me
            </Label>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? <span className="w-4 h-4 border-2 border-white/25 border-t-white rounded-full animate-spin" /> : "Sign in"}
          </Button>
        </form>

        <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-neutral-800 dark:text-neutral-200 hover:underline">Create one</Link>
        </p>
      </div>

      <div className="flex-1 bg-cover bg-center hidden md:block"
        style={{ backgroundImage: "url('https://i.imgur.com/j9BodUY.jpeg')" }} />
    </div>
  );
}
