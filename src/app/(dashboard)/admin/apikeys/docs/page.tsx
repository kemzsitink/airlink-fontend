import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageTitle } from "@/components/layout/PageTitle";

const endpoints = [
  { method: "GET", path: "/api/v1/servers", description: "List all servers", auth: true },
  { method: "POST", path: "/api/v1/servers", description: "Create a server", auth: true },
  { method: "GET", path: "/api/v1/servers/:uuid", description: "Get server details", auth: true },
  { method: "DELETE", path: "/api/v1/servers/:uuid", description: "Delete a server", auth: true },
  { method: "GET", path: "/api/v1/users", description: "List all users", auth: true },
  { method: "GET", path: "/api/v1/nodes", description: "List all nodes", auth: true },
  { method: "GET", path: "/api/v1/ping", description: "Health check", auth: false },
];

const methodColors: Record<string, string> = {
  GET: "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20",
  POST: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20",
  DELETE: "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20",
  PATCH: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20",
};

export default function ApiDocsPage() {
  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/apikeys" className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <PageTitle title="API Documentation" description="Reference for the AirLink REST API" />
      </div>

      <div className="space-y-4 max-w-3xl">
        <div className="bg-neutral-50 dark:bg-neutral-800/20 rounded-xl border border-neutral-200 dark:border-white/5 p-5">
          <h2 className="text-sm font-medium text-neutral-800 dark:text-white mb-2">Authentication</h2>
          <p className="text-xs text-neutral-500 mb-3">Include your API key in the request header:</p>
          <code className="block bg-neutral-100 dark:bg-neutral-900 rounded-lg px-4 py-3 text-xs font-mono text-neutral-700 dark:text-neutral-300">
            Authorization: Bearer YOUR_API_KEY
          </code>
        </div>

        <div className="bg-neutral-50 dark:bg-neutral-800/20 rounded-xl border border-neutral-200 dark:border-white/5 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-neutral-200 dark:border-white/5">
            <h2 className="text-sm font-medium text-neutral-800 dark:text-white">Endpoints</h2>
          </div>
          <div className="divide-y divide-neutral-100 dark:divide-white/5">
            {endpoints.map((ep) => (
              <div key={`${ep.method}-${ep.path}`} className="flex items-center gap-4 px-5 py-3">
                <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-mono font-medium border shrink-0 ${methodColors[ep.method] ?? ""}`}>
                  {ep.method}
                </span>
                <code className="text-xs font-mono text-neutral-700 dark:text-neutral-300 flex-1">{ep.path}</code>
                <span className="text-xs text-neutral-500 hidden sm:block">{ep.description}</span>
                {!ep.auth && <span className="text-[10px] text-neutral-400 shrink-0">public</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
