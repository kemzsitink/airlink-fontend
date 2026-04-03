"use client";

import { use } from "react";
import { Button } from "@/components/ui/button";
import { useStartup } from "@/modules/servers/hooks";

export default function ServerStartupPage({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = use(params);
  const { startup } = useStartup(uuid);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-neutral-800/20 rounded-xl border border-neutral-200 dark:border-white/5 p-5">
        <h2 className="text-sm font-medium text-neutral-800 dark:text-white mb-3">Startup Command</h2>
        <code className="block w-full bg-neutral-100 dark:bg-neutral-900 rounded-lg px-4 py-3 text-xs font-mono text-neutral-700 dark:text-neutral-300 break-all">
          {startup.command}
        </code>
      </div>

      <div className="bg-white dark:bg-neutral-800/20 rounded-xl border border-neutral-200 dark:border-white/5 p-5">
        <h2 className="text-sm font-medium text-neutral-800 dark:text-white mb-4">Variables</h2>
        <div className="space-y-4">
          {startup.variables.map((v) => (
            <div key={v.env}>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                {v.name}
                <span className="ml-2 text-neutral-400 font-normal">{v.description}</span>
              </label>
              <input type="text" defaultValue={v.value} disabled={!v.editable}
                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-600/30 focus:border-neutral-400 focus:outline-none text-sm bg-neutral-100 dark:bg-neutral-700/20 px-4 py-2 text-neutral-800 dark:text-white disabled:opacity-50 transition-colors" />
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end"><Button>Save Variables</Button></div>
      </div>
    </div>
  );
}
