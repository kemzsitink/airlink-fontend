"use client";

import { use, useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStartup, useSaveVariables } from "@/modules/servers/hooks";
import type { StartupVariable } from "@/modules/servers/types";

export default function ServerStartupPage({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = use(params);
  const { data: startup = { command: "", variables: [] } } = useStartup(uuid);
  const saveVariables = useSaveVariables(uuid);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  function handleSave() {
    const variables: Record<string, string> = {};
    for (const v of startup.variables) {
      if (v.editable) {
        variables[v.env] = inputRefs.current[v.env]?.value ?? v.value;
      }
    }
    saveVariables.mutate(variables, {
      onSuccess: () => toast.success("Variables saved"),
      onError: () => toast.error("Failed to save variables"),
    });
  }

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
          {startup.variables.map((v: StartupVariable) => (
            <div key={v.env} className="space-y-1.5">
              <Label>
                {v.name}
                <span className="ml-2 text-neutral-400 font-normal text-xs">{v.description}</span>
              </Label>
              <Input
                defaultValue={v.value}
                disabled={!v.editable}
                ref={(el) => { inputRefs.current[v.env] = el; }}
              />
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={handleSave} disabled={saveVariables.isPending}>
            {saveVariables.isPending ? "Saving…" : "Save Variables"}
          </Button>
        </div>
      </div>
    </div>
  );
}
