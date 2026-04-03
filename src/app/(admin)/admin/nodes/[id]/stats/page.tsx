import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const mockNode = { id: 1, name: "Node-1", address: "127.0.0.1", port: 3001, status: "Online", versionRelease: "v1.0.0", ram: 16384, cpu: 800, disk: 500, serverCount: 6 };

export default function AdminNodeStatsPage({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/nodes" className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-base font-medium text-neutral-800 dark:text-white">{mockNode.name} — Stats</h1>
          <p className="text-sm text-neutral-500 mt-0.5">{mockNode.address}:{mockNode.port}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Status", value: mockNode.status, color: mockNode.status === "Online" ? "text-emerald-600 dark:text-emerald-400" : "text-red-500" },
          { label: "Version", value: mockNode.versionRelease, color: "" },
          { label: "Servers", value: String(mockNode.serverCount), color: "" },
          { label: "RAM Limit", value: `${(mockNode.ram / 1024).toFixed(1)} GB`, color: "" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl bg-neutral-50 dark:bg-neutral-800/20 border border-neutral-200 dark:border-white/5 px-4 py-4">
            <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">{s.label}</p>
            <p className={`text-2xl font-semibold ${s.color || "text-neutral-800 dark:text-white"}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {[
          { label: "CPU Limit", value: `${mockNode.cpu}%` },
          { label: "Disk Limit", value: `${mockNode.disk} GB` },
          { label: "RAM Limit", value: `${(mockNode.ram / 1024).toFixed(1)} GB` },
        ].map((r) => (
          <div key={r.label} className="rounded-xl bg-neutral-50 dark:bg-neutral-800/20 border border-neutral-200 dark:border-white/5 p-5">
            <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-2">{r.label}</p>
            <p className="text-sm font-medium text-neutral-800 dark:text-white">{r.value}</p>
            <div className="mt-3 w-full bg-neutral-200 dark:bg-neutral-700/40 rounded-full h-1.5">
              <div className="bg-blue-500 h-1.5 rounded-full w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
