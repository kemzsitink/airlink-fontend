"use client";

import { useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockContent = `# Server Properties
server-port=25565
max-players=20
difficulty=normal
gamemode=survival
level-name=world
motd=A Minecraft Server
`;

export default function FileEditorPage({ params }: { params: Promise<{ uuid: string; path: string[] }> }) {
  const { uuid, path } = use(params);
  const [content, setContent] = useState(mockContent);
  const [saved, setSaved] = useState(false);
  const filePath = path.join("/");

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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
        <Button size="sm" onClick={save}>
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : "Save"}
        </Button>
      </div>

      <div className="flex-1 rounded-xl overflow-hidden border border-neutral-800">
        <div className="flex items-center gap-2 px-3 py-2 bg-[#1c1c1c] border-b border-neutral-800">
          <span className="text-[11px] font-medium text-neutral-600 select-none tracking-wide">{filePath}</span>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full bg-[#141414] text-neutral-300 font-mono text-xs p-4 resize-none focus:outline-none"
          style={{ minHeight: "500px" }}
          spellCheck={false}
        />
      </div>
    </div>
  );
}
