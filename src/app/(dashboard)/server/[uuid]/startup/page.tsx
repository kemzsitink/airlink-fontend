"use client";

import { Button } from "@/components/ui/button";

const mockStartup = {
  command: "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar server.jar nogui",
  variables: [
    { name: "SERVER_MEMORY", description: "Max memory in MB", value: "4096", editable: true },
    { name: "SERVER_JARFILE", description: "Server jar filename", value: "server.jar", editable: true },
  ],
};

export default function ServerStartupPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-neutral-800/20 rounded-xl border border-neutral-200 dark:border-white/5 p-5">
        <h2 className="text-sm font-medium text-neutral-800 dark:text-white mb-3">Startup Command</h2>
        <code className="block w-full bg-neutral-100 dark:bg-neutral-900 rounded-lg px-4 py-3 text-xs font-mono text-neutral-700 dark:text-neutral-300 break-all">
          {mockStartup.command}
        </code>
      </div>

      <div className="bg-white dark:bg-neutral-800/20 rounded-xl border border-neutral-200 dark:border-white/5 p-5">
        <h2 className="text-sm font-medium text-neutral-800 dark:text-white mb-4">Variables</h2>
        <div className="space-y-4">
          {mockStartup.variables.map((v) => (
            <div key={v.name}>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                {v.name}
                <span className="ml-2 text-neutral-400 font-normal">{v.description}</span>
              </label>
              <input
                type="text"
                defaultValue={v.value}
                disabled={!v.editable}
                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-600/30 focus:border-neutral-400 focus:outline-none text-sm bg-neutral-100 dark:bg-neutral-700/20 px-4 py-2 text-neutral-800 dark:text-white disabled:opacity-50 transition-colors"
              />
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Button>Save Variables</Button>
        </div>
      </div>
    </div>
  );
}
