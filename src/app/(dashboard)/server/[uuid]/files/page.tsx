"use client";

import { useState, use, useRef } from "react";
import { Folder, FileText, FileCog, Image, Plus, Upload, Trash2, Pencil, Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useFiles } from "@/modules/servers/hooks";
import { serversApi } from "@/modules/servers/api";
import { useQueryClient } from "@tanstack/react-query";
import { serverKeys } from "@/modules/servers/hooks";
import type { FileEntry } from "@/modules/servers/types";

function formatSize(bytes: number) {
  if (bytes === 0) return "—";
  const units = ["Bytes", "KB", "MB", "GB"];
  let size = bytes, i = 0;
  while (size >= 1024 && i < units.length - 1) { size /= 1024; i++; }
  return `${size.toFixed(2)} ${units[i]}`;
}

function FileIcon({ type, category }: { type: string; category?: string }) {
  if (type === "directory") return <Folder className="w-5 h-5 text-amber-500" />;
  if (category === "Configuration Files") return <FileCog className="w-5 h-5 text-blue-400" />;
  if (category === "Images") return <Image className="w-5 h-5 text-purple-400" />;
  return <FileText className="w-5 h-5 text-neutral-400" />;
}

export default function ServerFilesPage({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = use(params);
  const { data: files = [] } = useFiles(uuid);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const uploadRef = useRef<HTMLInputElement>(null);
  const qc = useQueryClient();

  function toggle(name: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  }

  async function handleDeleteSingle(name: string) {
    try {
      await serversApi.deleteFile(uuid, name);
      qc.invalidateQueries({ queryKey: serverKeys.files(uuid) });
      toast.success(`Deleted ${name}`);
    } catch {
      toast.error(`Failed to delete ${name}`);
    }
  }

  async function handleBulkDelete() {
    if (selected.size === 0) return;
    setDeleting(true);
    try {
      await Promise.all([...selected].map((name) => serversApi.deleteFile(uuid, name)));
      qc.invalidateQueries({ queryKey: serverKeys.files(uuid) });
      setSelected(new Set());
      toast.success(`Deleted ${selected.size} file(s)`);
    } catch {
      toast.error("Failed to delete some files");
    } finally {
      setDeleting(false);
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
      const form = new FormData();
      form.append("file", file);
      form.append("path", "/");
      const res = await fetch(`${apiUrl}/servers/${uuid}/files/upload`, {
        method: "POST",
        credentials: "include",
        body: form,
      });
      if (!res.ok) throw new Error();
      qc.invalidateQueries({ queryKey: serverKeys.files(uuid) });
      toast.success(`Uploaded ${file.name}`);
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
      if (uploadRef.current) uploadRef.current.value = "";
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1 text-xs text-neutral-400 font-mono">
          <span>/home/container/</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Plus className="w-4 h-4" />New File</Button>
          <input ref={uploadRef} type="file" className="hidden" onChange={handleUpload} />
          <Button variant="outline" size="sm" onClick={() => uploadRef.current?.click()} disabled={uploading}>
            <Upload className="w-4 h-4" />{uploading ? "Uploading…" : "Upload"}
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-700/40">
        <table className="min-w-full bg-white dark:bg-neutral-900/60">
          <thead className="border-b border-neutral-200 dark:border-neutral-700/40">
            <tr>
              <th className="px-4 py-2.5 text-left w-10"><Checkbox /></th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-neutral-500">Name</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-neutral-500 w-24">Size</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-neutral-500 w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file: FileEntry) => (
              <tr key={file.name} className="hover:bg-neutral-50 dark:hover:bg-white/[0.02] border-b border-neutral-100 dark:border-neutral-700/30 last:border-0 transition-colors">
                <td className="px-4 py-3 w-10">
                  <Checkbox checked={selected.has(file.name)} onCheckedChange={() => toggle(file.name)} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5 text-sm font-medium text-neutral-800 dark:text-neutral-200 cursor-pointer hover:text-neutral-600 dark:hover:text-white transition-colors">
                    <FileIcon type={file.type} category={file.category} />
                    <span>{file.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-neutral-400 dark:text-neutral-500 whitespace-nowrap">{formatSize(file.size)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                    {file.type !== "directory" && (
                      <button
                        onClick={() => {
                          const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
                          window.open(`${apiUrl}/servers/${uuid}/files/download?path=${encodeURIComponent(file.name)}`, "_blank");
                        }}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteSingle(file.name)}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-900 shadow-xl border border-neutral-200 dark:border-neutral-700/60 z-40">
          <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">{selected.size} selected</span>
          <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-700" />
          <Button variant="destructive" size="sm" onClick={handleBulkDelete} disabled={deleting}>
            {deleting ? "Deleting…" : "Delete"}
          </Button>
        </div>
      )}
    </div>
  );
}
