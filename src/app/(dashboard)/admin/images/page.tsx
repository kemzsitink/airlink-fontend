"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Upload, Store } from "lucide-react";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";
import { useImages } from "@/modules/images/hooks";

export default function AdminImagesPage() {
  const { images } = useImages();
  const [filter, setFilter] = useState("");
  const filtered = images.filter((i) => i.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <>
      <PageTitle
        title="Images"
        description="Manage server images installed on this panel"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Upload className="w-4 h-4" />Upload JSON</Button>
            <Button variant="outline" size="sm"><Plus className="w-4 h-4" />New Image</Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/images/store"><Store className="w-4 h-4" />Browse Store</Link>
            </Button>
          </div>
        }
      />

      <div className="flex border-b border-neutral-200 dark:border-neutral-800 mb-5">
        <span className="px-1 py-2.5 mr-5 text-sm font-medium text-neutral-800 dark:text-white border-b-2 border-neutral-800 dark:border-white -mb-px">
          Installed <span className="ml-1 text-xs text-neutral-400">{images.length}</span>
        </span>
        <Link href="/admin/images/store" className="px-1 py-2.5 text-sm font-medium text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 border-b-2 border-transparent -mb-px transition">Store</Link>
      </div>

      <div className="mb-4">
        <input type="text" placeholder="Filter images…" value={filter} onChange={(e) => setFilter(e.target.value)}
          className="w-56 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-800 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition" />
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
            {filtered.map((image) => (
              <tr key={image.id} className="hover:bg-neutral-50 dark:hover:bg-white/[0.05] transition-colors cursor-pointer"
                onClick={() => (window.location.href = `/admin/images/edit/${image.id}`)}>
                <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-neutral-800 dark:text-white">{image.name}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-neutral-600 dark:text-neutral-400">{image.author || "—"}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-neutral-600 dark:text-neutral-400">{new Date(image.createdAt).toLocaleDateString()}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm" onClick={(e) => e.stopPropagation()}>
                  <div className="flex gap-2">
                    <Link href={`/admin/images/edit/${image.id}`}><Button variant="outline" size="sm"><Pencil className="w-3 h-3" />Edit</Button></Link>
                    <Button variant="destructive" size="icon" className="h-8 w-8"><Trash2 className="w-4 h-4" /></Button>
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
