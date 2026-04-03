"use client";

import { use } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStartup } from "@/modules/servers/hooks";

export default function ServerStartupPage({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = use(params);
  const { data: startup = { command: "", variables: [] } } = useStartup(uuid);

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
            <div key={v.env} className="space-y-1.5">
              <Label>
                {v.name}
                <span className="ml-2 text-neutral-400 font-normal text-xs">{v.description}</span>
              </Label>
              <Input defaultValue={v.value} disabled={!v.editable} />
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end"><Button>Save Variables</Button></div>
      </div>
    </div>
  );
}
