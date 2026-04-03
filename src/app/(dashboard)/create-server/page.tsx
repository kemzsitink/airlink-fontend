"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const mockNodes = [{ id: 1, name: "Node-1", address: "127.0.0.1" }];
const mockImages = [{ id: 1, name: "Minecraft Java", dockerImages: ["ghcr.io/airlinklabs/java:21", "ghcr.io/airlinklabs/java:17"] }];
const resourceLimits = { maxMemory: 4096, maxCpu: 400, maxStorage: 50 };

export default function CreateServerPage() {
  const [memory, setMemory] = useState(512);
  const [cpu, setCpu] = useState(100);
  const [storage, setStorage] = useState(5);
  const [error, setError] = useState("");

  function step(setter: (v: number) => void, current: number, delta: number, min: number, max: number) {
    setter(Math.max(min, Math.min(max, current + delta)));
  }

  return (
    <div className="px-8 lg:px-12 pt-6 pb-12 max-w-5xl">
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-base font-semibold text-neutral-900 dark:text-white">Create a server</h1>
          <p className="text-sm text-neutral-500 mt-0.5">0 of 3 servers used</p>
        </div>
        <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300 transition">Cancel</Link>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Details */}
          <div className="bg-neutral-50 dark:bg-neutral-800/20 rounded-xl border border-neutral-200 dark:border-white/5">
            <div className="px-5 py-3.5 border-b border-neutral-200 dark:border-white/5">
              <p className="text-sm font-medium text-neutral-800 dark:text-white">Details</p>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1.5">Name</label>
                <input type="text" placeholder="My server" maxLength={64}
                  className="w-full px-3.5 py-2.5 rounded-[10px] border border-neutral-200 dark:border-white/8 bg-neutral-50 dark:bg-white/8 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 outline-none focus:border-neutral-400 dark:focus:border-white/20 transition" />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1.5">Description <span className="text-neutral-400 font-normal">(optional)</span></label>
                <input type="text" placeholder="What is this for?" maxLength={128}
                  className="w-full px-3.5 py-2.5 rounded-[10px] border border-neutral-200 dark:border-white/8 bg-neutral-50 dark:bg-white/8 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 outline-none focus:border-neutral-400 dark:focus:border-white/20 transition" />
              </div>
            </div>
          </div>

          {/* Node & Image */}
          <div className="bg-neutral-50 dark:bg-neutral-800/20 rounded-xl border border-neutral-200 dark:border-white/5">
            <div className="px-5 py-3.5 border-b border-neutral-200 dark:border-white/5">
              <p className="text-sm font-medium text-neutral-800 dark:text-white">Node & image</p>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1.5">Node</label>
                <select className="w-full px-3.5 py-2.5 rounded-[10px] border border-neutral-200 dark:border-white/8 bg-neutral-50 dark:bg-white/8 text-sm text-neutral-900 dark:text-neutral-100 outline-none focus:border-neutral-400 dark:focus:border-white/20 transition">
                  <option value="">Select a node</option>
                  {mockNodes.map((n) => <option key={n.id} value={n.id}>{n.name} — {n.address}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1.5">Image</label>
                  <select className="w-full px-3.5 py-2.5 rounded-[10px] border border-neutral-200 dark:border-white/8 bg-neutral-50 dark:bg-white/8 text-sm text-neutral-900 dark:text-neutral-100 outline-none focus:border-neutral-400 dark:focus:border-white/20 transition">
                    <option value="">Select an image</option>
                    {mockImages.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1.5">Docker variant</label>
                  <select className="w-full px-3.5 py-2.5 rounded-[10px] border border-neutral-200 dark:border-white/8 bg-neutral-50 dark:bg-white/8 text-sm text-neutral-900 dark:text-neutral-100 outline-none focus:border-neutral-400 dark:focus:border-white/20 transition">
                    <option value="">Select image first</option>
                    {mockImages[0].dockerImages.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="bg-neutral-50 dark:bg-neutral-800/20 rounded-xl border border-neutral-200 dark:border-white/5 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-neutral-200 dark:border-white/5">
            <p className="text-sm font-medium text-neutral-800 dark:text-white">Resources</p>
          </div>
          <div className="p-5 grid grid-cols-3 gap-4">
            {[
              { label: "RAM (MB)", value: memory, setter: setMemory, step: 128, min: 128, max: resourceLimits.maxMemory, hint: `Max ${resourceLimits.maxMemory} MB` },
              { label: "CPU (%)", value: cpu, setter: setCpu, step: 50, min: 50, max: resourceLimits.maxCpu, hint: "50% = half a core" },
              { label: "Storage (GB)", value: storage, setter: setStorage, step: 1, min: 1, max: resourceLimits.maxStorage, hint: `Max ${resourceLimits.maxStorage} GB` },
            ].map((r) => (
              <div key={r.label}>
                <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1.5">{r.label}</label>
                <div className="flex items-center border border-neutral-200 dark:border-white/8 rounded-[10px] overflow-hidden bg-neutral-50 dark:bg-white/6">
                  <button type="button" onClick={() => step(r.setter, r.value, -r.step, r.min, r.max)}
                    className="px-3 py-2.5 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-white/7 transition text-base leading-none">−</button>
                  <input type="number" value={r.value} onChange={(e) => r.setter(Number(e.target.value))}
                    className="flex-1 text-center bg-transparent text-sm font-medium text-neutral-800 dark:text-white outline-none py-2.5" />
                  <button type="button" onClick={() => step(r.setter, r.value, r.step, r.min, r.max)}
                    className="px-3 py-2.5 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-white/7 transition text-base leading-none">+</button>
                </div>
                <p className="text-[11px] text-neutral-400 mt-1.5">{r.hint}</p>
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 px-4 py-3">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <div className="flex justify-end pt-1">
          <Button size="lg">Create server</Button>
        </div>
      </div>
    </div>
  );
}
