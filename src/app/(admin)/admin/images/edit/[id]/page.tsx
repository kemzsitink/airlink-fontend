"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useImage } from "@/modules/images/hooks";

export default function AdminEditImagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: image } = useImage(Number(id));

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
              <Input defaultValue={image.name} />
            </div>
            <div className="space-y-1.5">
              <Label>Author</Label>
              <Input defaultValue={image.author ?? ""} />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label>Startup Command</Label>
              <Input defaultValue={image.startup} className="font-mono" />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label>Description</Label>
              <Textarea rows={2} defaultValue={image.description ?? ""} className="resize-none" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-white/5 rounded-xl border border-neutral-200 dark:border-white/5">
          <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-50 dark:bg-white/5 rounded-t-xl border-b border-neutral-200 dark:border-white/5">
            <h2 className="text-[13px] font-medium text-neutral-800 dark:text-white">Docker Images</h2>
            <Button size="sm" variant="outline"><Plus className="w-3 h-3" />Add</Button>
          </div>
          <div className="px-5 py-5 space-y-2">
            {image.dockerImages.map((img, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input defaultValue={Object.keys(img)[0]} className="font-mono" />
                <Button variant="destructive" size="icon" className="h-8 w-8 shrink-0"><Trash2 className="w-4 h-4" /></Button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-white/5 rounded-xl border border-neutral-200 dark:border-white/5">
          <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-50 dark:bg-white/5 rounded-t-xl border-b border-neutral-200 dark:border-white/5">
            <h2 className="text-[13px] font-medium text-neutral-800 dark:text-white">Variables</h2>
            <Button size="sm" variant="outline"><Plus className="w-3 h-3" />Add Variable</Button>
          </div>
          <div className="px-5 py-5 space-y-4">
            {image.variables.map((v, i) => (
              <div key={i} className="grid grid-cols-3 gap-3 items-end">
                <div className="space-y-1.5">
                  <Label>Name</Label>
                  <Input defaultValue={v.name} />
                </div>
                <div className="space-y-1.5">
                  <Label>Env Variable</Label>
                  <Input defaultValue={v.env} className="font-mono" />
                </div>
                <div className="space-y-1.5">
                  <Label>Default Value</Label>
                  <div className="flex gap-2">
                    <Input defaultValue={v.value} className="flex-1" />
                    <Button variant="destructive" size="icon" className="h-9 w-9 shrink-0"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end"><Button>Save Image</Button></div>
      </div>
    </>
  );
}
