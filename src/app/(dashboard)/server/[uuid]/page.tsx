"use client";

import { useState, useRef, useEffect, use } from "react";
import { Copy, Check } from "lucide-react";

const mockStats = { ip: "127.0.0.1:25565", status: "Running", ram: "72% (2.8GB / 4GB)", cpu: "34%", disk: "12.4 GB" };

export default function ServerConsolePage({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = use(params);
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<string[]>([
    "[Server] Starting Minecraft server...",
    "[Server] Done (2.3s)! For help, type \"help\"",
    "[Server] Player admin joined the game",
  ]);
  const [copied, setCopied] = useState(false);
  const termRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [logs]);

  function sendCommand() {
    if (!input.trim()) return;
    setLogs((prev) => [...prev, `> ${input}`]);
    setInput("");
  }

  function copyIP() {
    navigator.clipboard.writeText(mockStats.ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col lg:flex-row gap-5">
      {/* Console */}
      <div className="w-full lg:w-2/3 flex flex-col">
        <div className="flex flex-col rounded-xl overflow-hidden border border-neutral-800 shadow-lg flex-1">
          <div className="flex items-center gap-2 px-3 py-2 bg-[#1c1c1c] border-b border-neutral-800 shrink-0">
            <span className="text-[11px] font-medium text-neutral-600 select-none tracking-wide">console</span>
          </div>
          <div ref={termRef} className="bg-[#141414] flex-1 p-3 overflow-y-auto h-[420px] font-mono text-xs text-neutral-300 space-y-0.5">
            {logs.map((line, i) => (
              <div key={i} className="leading-5">{line}</div>
            ))}
          </div>
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendCommand()}
          placeholder="Type a command..."
          className="w-full px-4 py-3 bg-neutral-200 dark:bg-neutral-600/20 text-neutral-800 dark:text-white rounded-b-xl text-sm border-t border-neutral-600/20 focus:outline-none placeholder:text-neutral-500"
        />
      </div>

      {/* Stats */}
      <div className="w-full lg:w-1/3 space-y-4">
        {[
          {
            label: "IP Address",
            content: (
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium font-mono text-neutral-800 dark:text-white break-all">{mockStats.ip}</p>
                <button onClick={copyIP} className="shrink-0 rounded-lg p-1.5 bg-neutral-100 dark:bg-neutral-700/50 hover:bg-neutral-200 dark:hover:bg-neutral-600/50 transition-colors">
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 text-neutral-500" />}
                </button>
              </div>
            ),
          },
          { label: "Status", content: <p className="text-lg font-medium text-neutral-800 dark:text-white">{mockStats.status}</p> },
          { label: "RAM Usage", content: <p className="text-lg font-medium text-neutral-800 dark:text-white">{mockStats.ram}</p> },
          { label: "CPU Usage", content: <p className="text-lg font-medium text-neutral-800 dark:text-white">{mockStats.cpu}</p> },
          { label: "Disk Usage", content: <p className="text-lg font-medium text-neutral-800 dark:text-white">{mockStats.disk}</p> },
        ].map((card) => (
          <div key={card.label} className="bg-white dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/30 rounded-xl px-4 py-4 shadow-sm">
            <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">{card.label}:</h2>
            {card.content}
          </div>
        ))}
      </div>
    </div>
  );
}
