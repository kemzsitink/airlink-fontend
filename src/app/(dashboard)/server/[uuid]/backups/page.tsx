"use client";

import { Plus, Download, Trash2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockBackups = [
  { id: 1, name: "backup-2025-04-01", size: "234 MB", createdAt: "2025-04-01T10:00:00Z", completed: true },
  { id: 2, name: "backup-2025-03-28", size: "228 MB", createdAt: "2025-03-28T08:00:00Z", completed: true },
];

export default function ServerBackupsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-sm font-medium text-neutral-800 dark:text-white">Backups</h2>
          <p className="text-xs text-neutral-500 mt-0.5">{mockBackups.length} backup{mockBackups.length !== 1 ? "s" : ""} stored</p>
        </div>
        <Button size="sm"><Plus className="w-4 h-4" />Create Backup</Button>
      </div>

      {mockBackups.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-sm text-neutral-500">No backups yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {mockBackups.map((backup) => (
            <div key={backup.id} className="flex items-center justify-between bg-white dark:bg-neutral-800/20 rounded-xl border border-neutral-200 dark:border-white/5 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-neutral-800 dark:text-white">{backup.name}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{backup.size} · {new Date(backup.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors">
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
