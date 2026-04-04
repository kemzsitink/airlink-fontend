"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useImage, useUpdateImage } from "@/modules/images/hooks";
import type { ImageVariable } from "@/modules/images/types";

export default function AdminEditImagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const imageId = Number(id);
  const { data: image } = useImage(imageId);
  const updateImage = useUpdateImage(imageId);

  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [startup, setStartup] = useState("");
  const [description, setDescription] = useState("");
  const [dockerImages, setDockerImages] = useState<string[]>([]);
  const [variables, setVariables] = useState<ImageVariable[]>([]);

  useEffect(() => {
    if (image) {
      setName(image.name);
      setAuthor(image.author ?? "");
      setStartup(image.startup);
      setDescription(image.description ?? "");
      setDockerImages(image.dockerImages.map((d) => Object.keys(d)[0]));
      setVariables(image.variables);
    }
  }, [image]);

  function handleSave() {
    updateImage.mutate(
      {
        name,
        author: author || undefined,
        startup,
        description: description || undefined,
        dockerImages: dockerImages.map((d) => ({ [d]: d })),
        variables,
      },
      {
        onSuccess: () => toast.success("Image saved"),
        onError: () => toast.error("Failed to save image"),
      }
    );
  }

  function addDockerImage() {
    setDockerImages((prev) => [...prev, ""]);
  }

  function updateDockerImage(index: number, value: string) {
    setDockerImages((prev) => prev.map((d, i) => (i === index ? value : d)));
  }

  function removeDockerImage(index: number) {
    setDockerImages((prev) => prev.filter((_, i) => i !== index));
  }

  function addVariable() {
    setVariables((prev) => [...prev, { name: "", env: "", value: "", description: "", editable: true }]);
  }

  function updateVariable(index: number, patch: Partial<ImageVariable>) {
    setVariables((prev) => prev.map((v, i) => (i === index ? { ...v, ...patch } : v)));
  }

  function removeVariable(index: number) {
    setVariables((prev) => prev.filter((_, i) => i !== index));
  }

  if (!image) return <p className="text-sm text-neutral-500">Loading...</p>;

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/images" className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <PageTitle title={`Edit Image — ${image.name}`} description="Configure Docker images and variables" />
      </div>

      <div className="space-y-5 max-w-3xl">
        <div className="bg-white dark:bg-white/5 rounded-xl border border-neutral-200 dark:border-white/5">
          <h2 className="text-[13px] font-medium text-neutral-800 dark:text-white px-5 py-3.5 bg-neutral-50 dark:bg-white/5 rounded-t-xl border-b border-neutral-200 dark:border-white/5">General</h2>
          <div className="grid grid-cols-2 gap-4 px-5 py-5">
            <div className="space-y-1.5">
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Author</Label>
              <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label>Startup Command</Label>
              <Input value={startup} onChange={(e) => setStartup(e.target.value)} className="font-mono" />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label>Description</Label>
              <Textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} className="resize-none" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-white/5 rounded-xl border border-neutral-200 dark:border-white/5">
          <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-50 dark:bg-white/5 rounded-t-xl border-b border-neutral-200 dark:border-white/5">
            <h2 className="text-[13px] font-medium text-neutral-800 dark:text-white">Docker Images</h2>
            <Button size="sm" variant="outline" onClick={addDockerImage}><Plus className="w-3 h-3" />Add</Button>
          </div>
          <div className="px-5 py-5 space-y-2">
            {dockerImages.map((img, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input
                  value={img}
                  onChange={(e) => updateDockerImage(i, e.target.value)}
                  className="font-mono"
                  placeholder="ghcr.io/example/image:tag"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  onClick={() => removeDockerImage(i)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            {dockerImages.length === 0 && (
              <p className="text-xs text-neutral-400">No Docker images. Click Add to add one.</p>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-white/5 rounded-xl border border-neutral-200 dark:border-white/5">
          <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-50 dark:bg-white/5 rounded-t-xl border-b border-neutral-200 dark:border-white/5">
            <h2 className="text-[13px] font-medium text-neutral-800 dark:text-white">Variables</h2>
            <Button size="sm" variant="outline" onClick={addVariable}><Plus className="w-3 h-3" />Add Variable</Button>
          </div>
          <div className="px-5 py-5 space-y-4">
            {variables.map((v, i) => (
              <div key={i} className="grid grid-cols-3 gap-3 items-end">
                <div className="space-y-1.5">
                  <Label>Name</Label>
                  <Input value={v.name} onChange={(e) => updateVariable(i, { name: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Env Variable</Label>
                  <Input value={v.env} onChange={(e) => updateVariable(i, { env: e.target.value })} className="font-mono" />
                </div>
                <div className="space-y-1.5">
                  <Label>Default Value</Label>
                  <div className="flex gap-2">
                    <Input value={v.value} onChange={(e) => updateVariable(i, { value: e.target.value })} className="flex-1" />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-9 w-9 shrink-0"
                      onClick={() => removeVariable(i)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {variables.length === 0 && (
              <p className="text-xs text-neutral-400">No variables. Click Add Variable to add one.</p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={updateImage.isPending}>
            {updateImage.isPending ? "Saving…" : "Save Image"}
          </Button>
        </div>
      </div>
    </>
  );
}
