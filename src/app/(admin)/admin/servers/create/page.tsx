"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { PageTitle } from "@/components/layout/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUsers } from "@/modules/users/hooks";
import { useNodes } from "@/modules/nodes/hooks";
import { useImages } from "@/modules/images/hooks";
import { serversApi } from "@/modules/servers/api";

export default function AdminCreateServerPage() {
  const router = useRouter();
  const { data: users = [] } = useUsers();
  const { data: nodes = [] } = useNodes();
  const { data: images = [] } = useImages();

  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const cpuRef = useRef<HTMLInputElement>(null);
  const memoryRef = useRef<HTMLInputElement>(null);
  const storageRef = useRef<HTMLInputElement>(null);

  const [ownerId, setOwnerId] = useState("");
  const [nodeId, setNodeId] = useState("");
  const [imageId, setImageId] = useState("");
  const [dockerImage, setDockerImage] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedImage = images.find((i) => String(i.id) === imageId);
  const dockerVariants = selectedImage ? selectedImage.dockerImages.map((d) => Object.keys(d)[0]) : [];

  async function handleCreate() {
    const name = nameRef.current?.value?.trim();
    if (!name || !nodeId || !imageId || !dockerImage) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      const server = await serversApi.adminCreate({
        name,
        description: descRef.current?.value || undefined,
        nodeId: Number(nodeId),
        imageId: Number(imageId),
        dockerImage,
        Memory: Number(memoryRef.current?.value ?? 1024),
        Cpu: Number(cpuRef.current?.value ?? 2),
        Storage: Number(storageRef.current?.value ?? 20),
        ownerId: ownerId ? Number(ownerId) : undefined,
      });
      toast.success("Server created");
      router.push("/admin/servers");
    } catch {
      toast.error("Failed to create server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/servers" className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <PageTitle title="Create Server" description="Create a new server on this panel" />
      </div>

      <div className="bg-neutral-50 dark:bg-neutral-800/20 rounded-xl p-5 border border-neutral-200 dark:border-white/5 max-w-3xl space-y-6">
        <div>
          <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-4">General</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Name</Label>
              <Input ref={nameRef} placeholder="My server" />
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Input ref={descRef} placeholder="Server description" />
            </div>
            <div className="space-y-1.5">
              <Label>Owner</Label>
              <Select value={ownerId} onValueChange={setOwnerId}>
                <SelectTrigger><SelectValue placeholder="Select owner" /></SelectTrigger>
                <SelectContent>
                  {users.map((u) => <SelectItem key={u.id} value={String(u.id)}>{u.username}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Node</Label>
              <Select value={nodeId} onValueChange={setNodeId}>
                <SelectTrigger><SelectValue placeholder="Select node" /></SelectTrigger>
                <SelectContent>
                  {nodes.map((n) => <SelectItem key={n.id} value={String(n.id)}>{n.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-4">Resources</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { id: "cpu", label: "CPU (Cores)", ref: cpuRef, default: "2" },
              { id: "memory", label: "Memory (MB)", ref: memoryRef, default: "1024" },
              { id: "storage", label: "Storage (GB)", ref: storageRef, default: "20" },
            ].map((f) => (
              <div key={f.id} className="space-y-1.5">
                <Label htmlFor={f.id}>{f.label}</Label>
                <Input id={f.id} ref={f.ref} type="number" defaultValue={f.default} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-4">Startup</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Image</Label>
              <Select value={imageId} onValueChange={(v) => { setImageId(v); setDockerImage(""); }}>
                <SelectTrigger><SelectValue placeholder="Select image" /></SelectTrigger>
                <SelectContent>
                  {images.map((i) => <SelectItem key={i.id} value={String(i.id)}>{i.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Docker Image</Label>
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

        <Button onClick={handleCreate} disabled={loading}>
          {loading ? "Creating…" : "Create Server"}
        </Button>
      </div>
    </>
  );
}
