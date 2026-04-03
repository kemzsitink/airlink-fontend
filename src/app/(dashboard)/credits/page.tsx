import Link from "next/link";
import { MessageSquare, Globe, BookOpen, FileText, Code2 } from "lucide-react";

const leads = [
  { login: "thavanish", role: "Current maintainer" },
  { login: "privt00", role: "Project lead" },
  { login: "achul123", role: "Core developer" },
];

const links = [
  { label: "GitHub", desc: "Source code", href: "https://github.com/airlinklabs/panel", icon: <Code2 className="w-4 h-4" /> },
  { label: "Discord", desc: "Community", href: "https://discord.gg/ujXyxwwMHc", icon: <MessageSquare className="w-4 h-4" /> },
  { label: "Website", desc: "airlinklabs.github.io", href: "https://airlinklabs.github.io/home/", icon: <Globe className="w-4 h-4" /> },
  { label: "Docs", desc: "Documentation", href: "https://airlinklabs.github.io/home/docs/quickstart/", icon: <BookOpen className="w-4 h-4" /> },
];

export default function CreditsPage() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-center gap-3 mb-1">
        <h1 className="text-base font-medium text-neutral-800 dark:text-white">Credits</h1>
        <span className="text-xs font-mono text-neutral-400 bg-white/80 dark:bg-white/5 border border-neutral-200 dark:border-white/5 px-2 py-0.5 rounded-full">v1.0.0</span>
      </div>
      <p className="text-sm text-neutral-500 -mt-6">The people who build and maintain Airlink.</p>

      {/* Project leads */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4">Project leads</h2>
        <div className="grid grid-cols-3 gap-4">
          {leads.map((lead) => (
            <div key={lead.login} className="flex items-center gap-4 rounded-xl bg-white/80 dark:bg-white/5 border border-neutral-200 dark:border-white/5 shadow-sm px-5 py-4">
              <img src={`https://github.com/${lead.login}.png?size=80`} alt={lead.login}
                className="h-12 w-12 rounded-xl border border-neutral-200 dark:border-white/10 object-cover shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-neutral-800 dark:text-white truncate">{lead.login}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{lead.role}</p>
                <a href={`https://github.com/${lead.login}`} target="_blank" rel="noopener"
                  className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition mt-1.5">
                  <Code2 className="w-3 h-3" />GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Links */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4">Links</h2>
        <div className="grid grid-cols-4 gap-3">
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener"
              className="flex items-center gap-3 rounded-xl bg-white/80 dark:bg-white/5 border border-neutral-200 dark:border-white/5 shadow-sm px-4 py-3.5 hover:border-neutral-300 dark:hover:border-white/10 transition">
              <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-100 dark:bg-white/5 shrink-0 text-neutral-600 dark:text-neutral-300">
                {l.icon}
              </span>
              <div>
                <p className="text-sm font-medium text-neutral-800 dark:text-white">{l.label}</p>
                <p className="text-xs text-neutral-500">{l.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* License */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4">License</h2>
        <div className="rounded-xl bg-white/80 dark:bg-white/5 border border-neutral-200 dark:border-white/5 shadow-sm px-5 py-4 flex items-start gap-4">
          <span className="shrink-0 mt-0.5 w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-neutral-300">
            <FileText className="w-4 h-4" />
          </span>
          <div>
            <p className="text-sm font-medium text-neutral-800 dark:text-white mb-1">MIT License</p>
            <p className="text-xs text-neutral-500 leading-relaxed">Airlink is free and open source software. Use, modify, and distribute it provided the copyright notice is included in all copies.</p>
            <a href="https://github.com/airlinklabs/panel/blob/main/LICENSE" target="_blank" rel="noopener"
              className="inline-block mt-2 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 underline transition">
              View full license
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
