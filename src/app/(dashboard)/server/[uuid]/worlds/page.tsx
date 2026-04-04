"use client";

import { use } from "react";
import { Globe, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { serversApi } from "@/modules/servers/api";

interface World {
  name: string;
  type?: string;
  size?: string;
}

export default function ServerWorldsPage({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = use(params);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["servers", uuid, "worlds"],
    queryFn: () => serversApi.getWorlds(uuid),
  });

  const worlds: World[] = data?.worlds ?? [];

  async function handleDelete(name: string) {
    try {
      await serversApi.deleteFile(uuid, name);
      qc.invalidateQueries({ queryKey: ["servers", uuid, "worlds"] });
      toast.success(`Deleted ${name}`);
    } catch {
      toast.error(`Failed to delete ${name}`);
    }
  }

  if (isLoading) return <p className="text-sm text-neutral-500">Loading...</p>;

  return (
    <div>
      <div className="mb-4">
        <p className="text-sm text-neutral-500">{worlds.length} world{worlds.length !== 1 ? "s" : ""} found</p>
      </div>

      {worlds.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-sm text-neutral-500">No worlds found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {worlds.map((world) => (
            <div key={world.name} className="bg-white dark:bg-neutral-800/20 rounded-xl border border-neutral-200 dark:border-white/5 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-blue-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-neutral-800 dark:text-white">{world.name}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {[world.type, world.size].filter(Boolean).join(" · ") || "World"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(world.name)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
