"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex min-h-screen">
      <div className="w-full max-w-[420px] flex-shrink-0 flex flex-col justify-center px-10 py-12 bg-white/8 dark:bg-[#141414]/8 backdrop-blur-2xl border-r border-black/8 dark:border-white/8 relative z-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            Create account
          </h1>
          <p className="text-sm text-neutral-500 mt-1">Join AirLink</p>
        </div>

        <form
          method="POST"
          action="/api/auth/register"
          onSubmit={() => setLoading(true)}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="username"
              className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1.5"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              placeholder="yourname"
              className="w-full px-3.5 py-2.5 rounded-[10px] border border-neutral-200 dark:border-white/8 bg-neutral-50 dark:bg-white/8 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 outline-none focus:border-neutral-400 dark:focus:border-white/20 transition"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className="w-full px-3.5 py-2.5 rounded-[10px] border border-neutral-200 dark:border-white/8 bg-neutral-50 dark:bg-white/8 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 outline-none focus:border-neutral-400 dark:focus:border-white/20 transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 pr-10 rounded-[10px] border border-neutral-200 dark:border-white/8 bg-neutral-50 dark:bg-white/8 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 outline-none focus:border-neutral-400 dark:focus:border-white/20 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-[10px] bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium hover:bg-neutral-700 dark:hover:bg-neutral-200 disabled:opacity-60 transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/25 dark:border-neutral-900/25 border-t-white dark:border-t-neutral-900 rounded-full animate-spin" />
            ) : (
              "Create account"
            )}
          </button>
        </form>

        <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-neutral-800 dark:text-neutral-200 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>

      <div
        className="flex-1 bg-cover bg-center hidden md:block"
        style={{
          backgroundImage: "url('https://i.imgur.com/j9BodUY.jpeg')",
        }}
      />
    </div>
  );
}
