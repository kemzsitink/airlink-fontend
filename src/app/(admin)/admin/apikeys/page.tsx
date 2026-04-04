"use client";

import { useState } from "react";
import { Plus, Copy, Pencil, Trash2, BookOpen } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useApiKeys, useCreateApiKey, useDeleteApiKey } from "@/modules/apikeys/hooks";
import { cn } from "@/lib/utils";

const PERMISSIONS = ["servers:read", "servers:write", "users:read", "users:write", "nodes:read", "nodes:write"];

export default function AdminApiKeysPage() {
  const { data: keys = [] } = useApiKeys();
  const createApiKey = useCreateApiKey();
  const deleteApiKey = useDeleteApiKey();
  const [copied, setCopied] = useState<number | null>(null);

  // Create dialog state
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPerms, setSelectedPerms] = useState<string[]>([]);

  // Raw key reveal dialog
  const [rawKey, setRawKey] = useState<string | null>(null);

  function copyKey(id: number, key: string) {
    navigator.clipboard.writeText(key);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  function togglePerm(p: string) {
    setSelectedPerms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  }

  function handleCreate() {
    if (!name.trim()) { toast.error("Name is required"); return; }
    createApiKey.mutate(
      { name: name.trim(), description: description || undefined, permissions: selectedPerms },
      {
        onSuccess: (data) => {
          setOpen(false);
          setName(""); setDescription(""); setSelectedPerms([]);
          setRawKey(data.rawKey);
          toast.success("API key created");
        },
        onError: () => toast.error("Failed to create API key"),
      }
    );
  }

  function handleDelete(id: number) {
    deleteApiKey.mutate(id, {
      onSuccess: () => toast.success("API key deleted"),
      onError: () => toast.error("Failed to delete API key"),
    });
  }

  return (
    <>
      <PageTitle
        title="API Keys"
        description="Create and manage API keys with specific permissions"
        actions={
          <div className="flex gap-2">
            <Button size="sm" onClick={() => setOpen(true)}><Plus className="w-4 h-4" />Create API Key</Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/apikeys/docs"><BookOpen className="w-4 h-4" />API Docs</Link>
            </Button>
          </div>
        }
      />

      {/* Create dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create API Key</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="My API key" />
            </div>
            <div className="space-y-1.5">
              <Label>Description <span className="text-neutral-400 font-normal text-xs">(optional)</span></Label>
              <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What is this key for?" />
            </div>
            <div className="space-y-1.5">
              <Label>Permissions</Label>
              <div className="grid grid-cols-2 gap-2">
                {PERMISSIONS.map((p) => (
                  <label key={p} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedPerms.includes(p)}
                      onChange={() => togglePerm(p)}
                      className="rounded"
                    />
                    <span className="font-mono text-xs">{p}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={createApiKey.isPending}>
              {createApiKey.isPending ? "Creating…" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Raw key reveal dialog */}
      <Dialog open={!!rawKey} onOpenChange={() => setRawKey(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your API Key</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-neutral-500 mb-3">Copy this key now — it won&apos;t be shown again.</p>
          <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg px-3 py-2">
            <code className="flex-1 text-xs font-mono break-all text-neutral-800 dark:text-neutral-200">{rawKey}</code>
            <button onClick={() => { navigator.clipboard.writeText(rawKey ?? ""); toast.success("Copied"); }}>
              <Copy className="w-4 h-4 text-neutral-400 hover:text-neutral-600" />
            </button>
          </div>
          <DialogFooter className="mt-4">
            <Button onClick={() => setRawKey(null)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="rounded-xl bg-neutral-700/10 dark:bg-neutral-900 p-6">
        <h2 className="text-base font-semibold text-neutral-800 dark:text-white mb-1">API Keys</h2>
        <p className="text-sm text-neutral-500 mb-6">A list of all API keys in your panel.</p>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
            <thead>
              <tr>
                {["Name", "Key", "Created By", "Status", "Created", ""].map((h) => (
                  <th key={h} className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-neutral-800 dark:text-white">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {keys.length === 0 ? (
                <tr><td colSpan={6} className="py-4 text-center text-sm text-neutral-500">No API keys found</td></tr>
              ) : keys.map((key) => (
                <tr key={key.id} className="hover:bg-neutral-50 dark:hover:bg-white/[0.03] transition-colors">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-neutral-800 dark:text-white">
                    {key.name}
                    {key.description && <p className="text-xs text-neutral-500">{key.description}</p>}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-neutral-500">
                    <div className="flex items-center gap-2">
                      <span className="font-mono">{key.key.substring(0, 8)}...</span>
                      <button onClick={() => copyKey(key.id, key.key)} className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition">
                        <Copy className="w-4 h-4" />
                      </button>
                      {copied === key.id && <span className="text-xs text-emerald-500">Copied!</span>}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-neutral-500">{key.user.username}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span className={cn("inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
                      key.active ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 ring-green-600/20" : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 ring-red-600/20")}>
                      {key.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-neutral-500">{new Date(key.createdAt).toLocaleDateString()}</td>
                  <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm">
                    <div className="flex gap-2 justify-end">
                      <button className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition"><Pencil className="w-5 h-5" /></button>
                      <button
                        onClick={() => handleDelete(key.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
