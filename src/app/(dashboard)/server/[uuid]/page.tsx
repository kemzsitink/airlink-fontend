"use client";

import { useState, useRef, useEffect, use, useCallback } from "react";
import { Copy, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { XTerm, type XTermHandle } from "@/components/terminal/XTerm";

const mockStats = {
  ip: "127.0.0.1:25565",
  status: "Running",
  ram: "72% (2.8GB / 4GB)",
  cpu: "34%",
  disk: "12.4 GB",
};

export default function ServerConsolePage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = use(params);
  const termRef = useRef<XTermHandle>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  // Connect WebSocket
  useEffect(() => {
    const proto = window.location.protocol === "https:" ? "wss:" : "ws:";
    const ws = new WebSocket(`${proto}//${window.location.host}/console/${uuid}`);
    wsRef.current = ws;

    ws.onopen = () => {
      termRef.current?.writeln("\x1b[32m[Connected]\x1b[0m");
    };

    ws.onmessage = (e) => {
      const text = typeof e.data === "string" ? e.data : "";
      termRef.current?.write(text);
    };

    ws.onerror = () => {
      termRef.current?.writeln("\x1b[31m[Connection error]\x1b[0m");
    };

    ws.onclose = () => {
      termRef.current?.writeln("\x1b[33m[Disconnected]\x1b[0m");
    };

    return () => ws.close();
  }, [uuid]);

  const sendCommand = useCallback(() => {
    const cmd = input.trim();
    if (!cmd) return;
    termRef.current?.writeln(`\x1b[1m\x1b[33m~ \x1b[0m${cmd}`);
    wsRef.current?.send(JSON.stringify({ event: "CMD", command: cmd }));
    setCmdHistory((prev) => [...prev.slice(-49), cmd]);
    setHistoryIdx(-1);
    setInput("");
  }, [input]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") { sendCommand(); return; }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setCmdHistory((h) => {
        const idx = Math.min(historyIdx + 1, h.length - 1);
        setHistoryIdx(idx);
        setInput(h[h.length - 1 - idx] ?? "");
        return h;
      });
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(idx);
      setInput(idx === -1 ? "" : cmdHistory[cmdHistory.length - 1 - idx] ?? "");
    }
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
          <XTerm
            ref={termRef}
            className="h-[420px]"
          />
        </div>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a command..."
          className="rounded-none rounded-b-xl border-t-0 bg-neutral-900 border-neutral-800 text-neutral-200 placeholder:text-neutral-600 focus-visible:ring-0 focus-visible:border-neutral-700"
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      {/* Stats */}
      <div className="w-full lg:w-1/3 space-y-4">
        {[
          {
            label: "IP Address",
            content: (
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium font-mono text-neutral-800 dark:text-white break-all">
                  {mockStats.ip}
                </p>
                <button
                  onClick={copyIP}
                  className="shrink-0 rounded-lg p-1.5 bg-neutral-100 dark:bg-neutral-700/50 hover:bg-neutral-200 dark:hover:bg-neutral-600/50 transition-colors"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 text-neutral-500" />
                  )}
                </button>
              </div>
            ),
          },
          { label: "Status", content: <p className="text-lg font-medium text-neutral-800 dark:text-white">{mockStats.status}</p> },
          { label: "RAM Usage", content: <p className="text-lg font-medium text-neutral-800 dark:text-white">{mockStats.ram}</p> },
          { label: "CPU Usage", content: <p className="text-lg font-medium text-neutral-800 dark:text-white">{mockStats.cpu}</p> },
          { label: "Disk Usage", content: <p className="text-lg font-medium text-neutral-800 dark:text-white">{mockStats.disk}</p> },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-white dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/30 rounded-xl px-4 py-4 shadow-sm"
          >
            <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
              {card.label}:
            </h2>
            {card.content}
          </div>
        ))}
      </div>
    </div>
  );
}
