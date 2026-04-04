"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNodes } from "@/modules/nodes/hooks";
import { useImages } from "@/modules/images/hooks";
import { serversApi } from "@/modules/servers/api";

const resourceLimits = { maxMemory: 4096, maxCpu: 400, maxStorage: 50 };

export default function CreateServerPage() {
  const router = useRouter();
  const { data: nodes = [] } = useNodes();
  const { data: images = [] } = useImages();

  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);

  const [nodeId, setNodeId] = useState("");
  const [imageId, setImageId] = useState("");
  const [dockerImage, setDockerImage] = useState("");
  const [memory, setMemory] = useState(512);
  const [cpu, setCpu] = useState(100);
  const [storage, setStorage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedImage = images.find((i) => String(i.id) === imageId);
  const dockerVariants = selectedImage
    ? selectedImage.dockerImages.map((d) => Object.keys(d)[0])
    : [];

  function step(setter: (v: number) => void, current: number, delta: number, min: number, max: number) {
    setter(Math.max(min, Math.min(max, current + delta)));
  }

  async function handleCreate() {
    const name = nameRef.current?.value?.trim();
    if (!name) { setError("Server name is required"); return; }
    if (!nodeId) { setError("Please select a node"); return; }
    if (!imageId) { setError("Please select an image"); return; }
    if (!dockerImage) { setError("Please select a Docker variant"); return; }

    setError("");
    setLoading(true);
    try {
      const server = await serversApi.create({
        name,
        description: descRef.current?.value || undefined,
        nodeId: Number(nodeId),
        imageId: Number(imageId),
        dockerImage,
        Memory: memory,
        Cpu: cpu,
        Storage: storage,
      });
      toast.success("Server created");
      router.push(`/server/${server.UUID}`);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to create server";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
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
              <div className="space-y-1.5">
                <Label>Name</Label>
                <Input ref={nameRef} placeholder="My server" maxLength={64} />
              </div>
              <div className="space-y-1.5">
                <Label>Description <span className="text-neutral-400 font-normal">(optional)</span></Label>
                <Input ref={descRef} placeholder="What is this for?" maxLength={128} />
              </div>
            </div>
          </div>

          {/* Node & Image */}
          <div className="bg-neutral-50 dark:bg-neutral-800/20 rounded-xl border border-neutral-200 dark:border-white/5">
            <div className="px-5 py-3.5 border-b border-neutral-200 dark:border-white/5">
              <p className="text-sm font-medium text-neutral-800 dark:text-white">Node & image</p>
            </div>
            <div className="p-5 space-y-4">
              <div className="space-y-1.5">
                <Label>Node</Label>
                <Select value={nodeId} onValueChange={setNodeId}>
                  <SelectTrigger><SelectValue placeholder="Select a node" /></SelectTrigger>
                  <SelectContent>
                    {nodes.map((n) => (
                      <SelectItem key={n.id} value={String(n.id)}>{n.name} — {n.address}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Image</Label>
                  <Select value={imageId} onValueChange={(v) => { setImageId(v); setDockerImage(""); }}>
                    <SelectTrigger><SelectValue placeholder="Select an image" /></SelectTrigger>
                    <SelectContent>
                      {images.map((i) => (
                        <SelectItem key={i.id} value={String(i.id)}>{i.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Docker variant</Label>
                  <Select value={dockerImage} onValueChange={setDockerImage} disabled={!imageId}>
                    <SelectTrigger><SelectValue placeholder={imageId ? "Select variant" : "Select image first"} /></SelectTrigger>
                    <SelectContent>
                      {dockerVariants.map((d) => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
              { label: "RAM (MB)", value: memory, setter: setMemory, stepVal: 128, min: 128, max: resourceLimits.maxMemory, hint: `Max ${resourceLimits.maxMemory} MB` },
              { label: "CPU (%)", value: cpu, setter: setCpu, stepVal: 50, min: 50, max: resourceLimits.maxCpu, hint: "50% = half a core" },
              { label: "Storage (GB)", value: storage, setter: setStorage, stepVal: 1, min: 1, max: resourceLimits.maxStorage, hint: `Max ${resourceLimits.maxStorage} GB` },
            ].map((r) => (
              <div key={r.label} className="space-y-1.5">
                <Label>{r.label}</Label>
                <div className="flex items-center border border-input rounded-lg overflow-hidden bg-background">
                  <button type="button" onClick={() => step(r.setter, r.value, -r.stepVal, r.min, r.max)}
                    className="px-3 py-2 text-muted-foreground hover:bg-muted transition text-base leading-none">−</button>
                  <input type="number" value={r.value} onChange={(e) => r.setter(Number(e.target.value))}
                    className="flex-1 text-center bg-transparent text-sm font-medium text-foreground outline-none py-2" />
                  <button type="button" onClick={() => step(r.setter, r.value, r.stepVal, r.min, r.max)}
                    className="px-3 py-2 text-muted-foreground hover:bg-muted transition text-base leading-none">+</button>
                </div>
                <p className="text-[11px] text-neutral-400">{r.hint}</p>
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
          <Button size="lg" onClick={handleCreate} disabled={loading}>
            {loading ? "Creating…" : "Create server"}
          </Button>
        </div>
      </div>
    </div>
  );
}
