"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Upload, Coins } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCurrentUser, useLoginHistory } from "@/modules/auth/hooks";
import { authApi } from "@/modules/auth/api";
import type { LoginHistory } from "@/modules/auth/types";

const languages = ["en", "fr", "de", "es", "pt", "it", "ru", "zh", "ja", "ta"];
const langLabels: Record<string, string> = { en: "English", fr: "Français", de: "Deutsch", es: "Español", pt: "Português", it: "Italiano", ru: "Русский", zh: "中文", ja: "日本語", ta: "தமிழ்" };

export default function AccountPage() {
  const { data: user } = useCurrentUser();
  const { data: loginHistory = [] } = useLoginHistory();

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const currentPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [lang, setLang] = useState(user?.lang ?? "en");

  if (!user) return <p className="text-sm text-neutral-500 p-4">Loading...</p>;
  const avatarUrl = user.avatar || `https://api.dicebear.com/9.x/thumbs/svg?seed=${user.username}`;

  async function handleSaveUsername() {
    const value = usernameRef.current?.value?.trim();
    if (!value) return;
    try {
      await authApi.updateUsername(value);
      toast.success("Username updated");
    } catch {
      toast.error("Failed to update username");
    }
  }

  async function handleSaveEmail() {
    const value = emailRef.current?.value?.trim();
    if (!value) return;
    try {
      await authApi.updateEmail(value);
      toast.success("Email updated");
    } catch {
      toast.error("Failed to update email");
    }
  }

  async function handleUpdatePassword() {
    const current = currentPasswordRef.current?.value;
    const next = newPasswordRef.current?.value;
    if (!current || !next) { toast.error("Fill in both password fields"); return; }
    try {
      await authApi.updatePassword(current, next);
      toast.success("Password updated");
      if (currentPasswordRef.current) currentPasswordRef.current.value = "";
      if (newPasswordRef.current) newPasswordRef.current.value = "";
    } catch {
      toast.error("Failed to update password");
    }
  }

  async function handleSaveDescription() {
    const value = descriptionRef.current?.value ?? "";
    try {
      await authApi.updateDescription(value);
      toast.success("Description updated");
    } catch {
      toast.error("Failed to update description");
    }
  }

  function handleSaveLanguage() {
    document.cookie = `lang=${lang}; path=/; max-age=31536000`;
    toast.success("Language saved");
  }

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
                <Input ref={usernameRef} defaultValue={user.username} className="h-7 text-xs" />
                <Button className="shrink-0 text-xs h-7" onClick={handleSaveUsername}>Save</Button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">Email</label>
              <div className="flex gap-1.5">
                <Input ref={emailRef} type="email" defaultValue={user.email} className="h-7 text-xs" />
                <Button className="shrink-0 text-xs h-7" onClick={handleSaveEmail}>Save</Button>
              </div>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">Change password</label>
              <div className="grid grid-cols-2 gap-1.5">
                <Input ref={currentPasswordRef} type="password" placeholder="Current password" className="h-7 text-xs" />
                <Input ref={newPasswordRef} type="password" placeholder="New password" className="h-7 text-xs" />
              </div>
              <Button className="mt-2 text-xs h-7" onClick={handleUpdatePassword}>Update password</Button>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">Description</label>
              <Textarea ref={descriptionRef} rows={2} defaultValue={user.description ?? ""} className="text-xs resize-none" />
              <Button className="mt-1.5 text-xs h-7" onClick={handleSaveDescription}>Save</Button>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">Language</label>
              <Select value={lang} onValueChange={setLang}>
                <SelectTrigger className="h-7 text-xs mb-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((l) => (
                    <SelectItem key={l} value={l}>{langLabels[l]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="text-xs h-7" onClick={handleSaveLanguage}>Save</Button>
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
                {(loginHistory as LoginHistory[]).map((login, i) => (
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
