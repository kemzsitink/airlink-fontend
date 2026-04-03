import { Globe, Trash2 } from "lucide-react";

const mockWorlds = [
  { name: "world", type: "Overworld", size: "234 MB" },
  { name: "world_nether", type: "Nether", size: "45 MB" },
  { name: "world_the_end", type: "The End", size: "12 MB" },
];

export default function ServerWorldsPage() {
  return (
    <div>
      <div className="mb-4">
        <p className="text-sm text-neutral-500">{mockWorlds.length} world{mockWorlds.length !== 1 ? "s" : ""} found</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockWorlds.map((world) => (
          <div key={world.name} className="bg-white dark:bg-neutral-800/20 rounded-xl border border-neutral-200 dark:border-white/5 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-blue-400 shrink-0" />
              <div>
                <p className="text-sm font-medium text-neutral-800 dark:text-white">{world.name}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{world.type} · {world.size}</p>
              </div>
            </div>
            <button className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
