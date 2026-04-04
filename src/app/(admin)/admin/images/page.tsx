"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Upload, Store } from "lucide-react";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { useImages } from "@/modules/images/hooks";
import { imagesApi } from "@/modules/images/api";
import { useQueryClient } from "@tanstack/react-query";
import { imageKeys } from "@/modules/images/hooks";
import { toast } from "sonner";

export default function AdminImagesPage() {
  const router = useRouter();
  const qc = useQueryClient();
  const { data: images = [] } = useImages();
  const [filter, setFilter] = useState("");
  const filtered = images.filter((i) => i.name?.toLowerCase().includes(filter.toLowerCase()));

  // New Image dialog
  const [newOpen, setNewOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newStartup, setNewStartup] = useState("");
  const [creating, setCreating] = useState(false);

  // Upload JSON dialog
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function handleCreate() {
    if (!newName.trim()) return;
    setCreating(true);
    try {
      const image = await imagesApi.create({ name: newName, startup: newStartup });
      await qc.invalidateQueries({ queryKey: imageKeys.list() });
      setNewOpen(false);
      setNewName("");
      setNewStartup("");
      router.push(`/admin/images/edit/${image.id}`);
    } catch {
      toast.error("Failed to create image");
    } finally {
      setCreating(false);
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const text = await file.text();
      const json = JSON.parse(text);
      await imagesApi.upload(json);
      await qc.invalidateQueries({ queryKey: imageKeys.list() });
      setUploadOpen(false);
      toast.success("Image imported successfully");
    } catch {
      toast.error("Invalid JSON file");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <>
      <PageTitle
        title="Images"
        description="Manage server images installed on this panel"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setUploadOpen(true)}>
              <Upload className="w-4 h-4" />Upload JSON
            </Button>
            <Button variant="outline" size="sm" onClick={() => setNewOpen(true)}>
              <Plus className="w-4 h-4" />New Image
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/images/store"><Store className="w-4 h-4" />Browse Store</Link>
            </Button>
          </div>
        }
      />

      {/* New Image Dialog */}
      <Dialog open={newOpen} onOpenChange={setNewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Name <span className="text-red-500">*</span></Label>
              <Input
                placeholder="e.g. Minecraft Java"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Startup Command</Label>
              <Input
                placeholder="java -Xms128M -jar server.jar"
                value={newStartup}
                onChange={(e) => setNewStartup(e.target.value)}
                className="font-mono text-xs"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={creating || !newName.trim()}>
              {creating ? "Creating..." : "Create & Edit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload JSON Dialog */}
      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Image JSON</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <p className="text-sm text-neutral-500">Select a JSON file exported from AirLink or compatible format.</p>
            <input
              type="file"
              accept=".json"
              disabled={uploading}
              onChange={handleUpload}
              className="w-full text-sm text-neutral-700 dark:text-neutral-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-neutral-200 dark:file:bg-neutral-700 file:text-neutral-700 dark:file:text-neutral-300 cursor-pointer"
            />
            {uploading && <p className="text-xs text-neutral-400">Uploading...</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex border-b border-neutral-200 dark:border-neutral-800 mb-5">
        <span className="px-1 py-2.5 mr-5 text-sm font-medium text-neutral-800 dark:text-white border-b-2 border-neutral-800 dark:border-white -mb-px">
          Installed <span className="ml-1 text-xs text-neutral-400">{images.length}</span>
        </span>
        <Link href="/admin/images/store" className="px-1 py-2.5 text-sm font-medium text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 border-b-2 border-transparent -mb-px transition">Store</Link>
      </div>

      <div className="mb-4">
        <Input placeholder="Filter images…" value={filter} onChange={(e) => setFilter(e.target.value)} className="w-56" />
      </div>

      <div className="overflow-x-auto shadow-sm rounded-xl border border-neutral-200 dark:border-neutral-800/40">
        <table className="min-w-full divide-y divide-neutral-200 dark:divide-white/10">
          <thead className="bg-neutral-50 dark:bg-neutral-800/50">
            <tr>
              {["Name", "Author", "Created", "Actions"].map((h) => (
                <th key={h} className="py-3.5 pl-6 pr-3 text-left text-sm font-medium text-neutral-800 dark:text-white">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-white/5 bg-white dark:bg-neutral-800/20">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-12 text-center text-sm text-neutral-400">
                  No images installed yet.{" "}
                  <button onClick={() => setNewOpen(true)} className="text-blue-500 hover:underline">Create one</button>
                </td>
              </tr>
            ) : filtered.map((image) => (
              <tr key={image.id} className="hover:bg-neutral-50 dark:hover:bg-white/[0.05] transition-colors cursor-pointer"
                onClick={() => router.push(`/admin/images/edit/${image.id}`)}>
                <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-neutral-800 dark:text-white">{image.name}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-neutral-600 dark:text-neutral-400">{image.author || "—"}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                  {image.createdAt ? new Date(image.createdAt).toLocaleDateString() : "—"}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm" onClick={(e) => e.stopPropagation()}>
                  <div className="flex gap-2">
                    <Link href={`/admin/images/edit/${image.id}`}>
                      <Button variant="outline" size="sm"><Pencil className="w-3 h-3" />Edit</Button>
                    </Link>
                    <Button variant="destructive" size="icon" className="h-8 w-8"
                      onClick={async () => {
                        await imagesApi.delete(image.id);
                        qc.invalidateQueries({ queryKey: imageKeys.list() });
                      }}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
