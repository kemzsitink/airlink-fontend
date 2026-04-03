"use client";

import Link from "next/link";
import { Upload, Coins } from "lucide-react";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/modules/auth/hooks";
import { MOCK_USER, MOCK_LOGIN_HISTORY } from "@/modules/auth/types";

const languages = ["en", "fr", "de", "es", "pt", "it", "ru", "zh", "ja", "ta"];
const langLabels: Record<string, string> = { en: "English", fr: "Français", de: "Deutsch", es: "Español", pt: "Português", it: "Italiano", ru: "Русский", zh: "中文", ja: "日本語", ta: "தமிழ்" };

export default function AccountPage() {
  const { data: user = MOCK_USER } = useCurrentUser();
  const avatarUrl = user.avatar || `https://api.dicebear.com/9.x/thumbs/svg?seed=${user.username}`;

  return (
    <>
      <div className="flex items-center gap-4 mb-5">
        <div className="relative shrink-0">
          <img src={avatarUrl} alt="Avatar" className="h-12 w-12 rounded-xl border border-neutral-200 dark:border-white/10 object-cover" />
          <label htmlFor="avatar-input" className="absolute -bottom-1.5 -right-1.5 w-6 h-6 flex items-center justify-center rounded-full bg-neutral-800 dark:bg-white border-2 border-white dark:border-neutral-900 cursor-pointer hover:bg-neutral-700 dark:hover:bg-neutral-200 transition">
            <Upload className="w-3 h-3 text-white dark:text-neutral-900" />
          </label>
          <input id="avatar-input" type="file" accept="image/*" className="hidden" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-base font-medium text-neutral-800 dark:text-white">Account</h1>
          <p className="text-sm text-neutral-500 mt-0.5">Manage your profile and preferences.</p>
        </div>
        <Link href="/credits" className="flex items-center gap-1.5 rounded-xl border border-neutral-200 dark:border-white/5 bg-white dark:bg-white/5 hover:bg-neutral-50 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-400 px-3 py-1.5 text-xs font-medium transition shrink-0">
          <Coins className="w-3.5 h-3.5" />Credits
        </Link>
      </div>

      <div className="space-y-4">
        <div className="bg-neutral-50 dark:bg-white/5 rounded-2xl border border-neutral-200 dark:border-white/5 p-5">
          <div className="grid grid-cols-2 gap-x-5 gap-y-4">
            <div>
              <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">Username</label>
              <div className="flex gap-1.5">
                <input type="text" defaultValue={user.username} className="rounded-lg border border-neutral-200 dark:border-neutral-600/30 focus:border-neutral-400 focus:outline-none text-xs w-full bg-white dark:bg-neutral-700/20 px-3 py-1.5 text-neutral-800 dark:text-white placeholder-neutral-400 transition-colors" />
                <Button size="sm" className="shrink-0 text-xs h-7">Save</Button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">Email</label>
              <div className="flex gap-1.5">
                <input type="email" defaultValue={user.email} className="rounded-lg border border-neutral-200 dark:border-neutral-600/30 focus:border-neutral-400 focus:outline-none text-xs w-full bg-white dark:bg-neutral-700/20 px-3 py-1.5 text-neutral-800 dark:text-white placeholder-neutral-400 transition-colors" />
                <Button size="sm" className="shrink-0 text-xs h-7">Save</Button>
              </div>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">Change password</label>
              <div className="grid grid-cols-2 gap-1.5">
                <input type="password" placeholder="Current password" className="rounded-lg border border-neutral-200 dark:border-neutral-600/30 focus:border-neutral-400 focus:outline-none text-xs w-full bg-white dark:bg-neutral-700/20 px-3 py-1.5 text-neutral-800 dark:text-white placeholder-neutral-400 transition-colors" />
                <input type="password" placeholder="New password" className="rounded-lg border border-neutral-200 dark:border-neutral-600/30 focus:border-neutral-400 focus:outline-none text-xs w-full bg-white dark:bg-neutral-700/20 px-3 py-1.5 text-neutral-800 dark:text-white placeholder-neutral-400 transition-colors" />
              </div>
              <Button size="sm" className="mt-2 text-xs h-7">Update password</Button>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">Description</label>
              <textarea rows={2} defaultValue={user.description ?? ""} className="rounded-lg border border-neutral-200 dark:border-neutral-600/30 focus:border-neutral-400 focus:outline-none text-xs w-full bg-white dark:bg-neutral-700/20 px-3 py-1.5 text-neutral-800 dark:text-white placeholder-neutral-400 transition-colors resize-none" />
              <Button size="sm" className="mt-1.5 text-xs h-7">Save</Button>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">Language</label>
              <select defaultValue={user.lang ?? "en"} className="rounded-lg border border-neutral-200 dark:border-neutral-600/30 focus:border-neutral-400 focus:outline-none text-xs w-full bg-white dark:bg-neutral-700/20 px-3 py-1.5 text-neutral-800 dark:text-white transition-colors mb-1.5">
                {languages.map((l) => <option key={l} value={l}>{langLabels[l]}</option>)}
              </select>
              <Button size="sm" className="text-xs h-7">Save</Button>
            </div>
          </div>
        </div>

        <div className="bg-neutral-50 dark:bg-white/5 rounded-2xl p-5 border border-neutral-200 dark:border-white/5">
          <p className="text-sm font-medium text-neutral-800 dark:text-white mb-4">Login history</p>
          <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-white/5">
            <table className="min-w-full text-sm divide-y divide-neutral-200 dark:divide-white/5">
              <thead className="bg-neutral-100 dark:bg-white/5">
                <tr>
                  {["Date & Time", "IP Address", "Browser / Device"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-white/5">
                {MOCK_LOGIN_HISTORY.map((login, i) => (
                  <tr key={i} className="hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300 whitespace-nowrap">{new Date(login.timestamp).toLocaleString()}</td>
                    <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400 whitespace-nowrap font-mono text-xs">{login.ipAddress}</td>
                    <td className="px-4 py-3 text-neutral-400 text-xs truncate max-w-[260px]">{login.userAgent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
