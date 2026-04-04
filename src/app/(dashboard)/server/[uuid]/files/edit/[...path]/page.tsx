"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { serversApi } from "@/modules/servers/api";
import { toast } from "sonner";

export default function FileEditorPage({ params }: { params: Promise<{ uuid: string; path: string[] }> }) {
  const { uuid, path } = use(params);
  const filePath = path.join("/");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    serversApi.getFile(uuid, filePath)
      .then((data) => setContent(data.content))
      .catch(() => toast.error("Failed to load file"))
      .finally(() => setLoading(false));
  }, [uuid, filePath]);

  async function save() {
    setSaving(true);
    try {
      await serversApi.saveFile(uuid, filePath, content);
      toast.success("File saved");
    } catch {
      toast.error("Failed to save file");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Link href={`/server/${uuid}/files`} className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <p className="text-sm font-medium text-neutral-800 dark:text-white">{filePath}</p>
            <p className="text-xs text-neutral-500 font-mono mt-0.5">/home/container/{filePath}</p>
          </div>
        </div>
        <Button size="sm" onClick={save} disabled={saving || loading}>
          <Save className="w-4 h-4" />
          {saving ? "Saving…" : "Save"}
        </Button>
      </div>

      <div className="flex-1 rounded-xl overflow-hidden border border-neutral-800">
        <div className="flex items-center gap-2 px-3 py-2 bg-[#1c1c1c] border-b border-neutral-800">
          <span className="text-[11px] font-medium text-neutral-600 select-none tracking-wide">{filePath}</span>
        </div>
        {loading ? (
          <div className="w-full bg-[#141414] flex items-center justify-center" style={{ minHeight: "500px" }}>
            <p className="text-neutral-500 text-sm">Loading...</p>
          </div>
        ) : (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-[#141414] text-neutral-300 font-mono text-xs p-4 resize-none focus:outline-none"
            style={{ minHeight: "500px" }}
            spellCheck={false}
          />
        )}
      </div>
    </div>
  );
}
