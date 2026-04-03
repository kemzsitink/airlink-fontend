const mockPlayers = [
  { name: "Steve", uuid: "abc-123", online: true, playtime: "12h 30m" },
  { name: "Alex", uuid: "def-456", online: false, playtime: "5h 10m" },
];

export default function ServerPlayersPage() {
  return (
    <div>
      <div className="mb-4">
        <p className="text-sm text-neutral-500">{mockPlayers.filter((p) => p.online).length} online · {mockPlayers.length} total</p>
      </div>

      {mockPlayers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-sm text-neutral-500">No player data available.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-700/40">
          <table className="min-w-full divide-y divide-neutral-200 dark:divide-white/5">
            <thead className="bg-neutral-50 dark:bg-neutral-800/50">
              <tr>
                {["Player", "Status", "Playtime"].map((h) => (
                  <th key={h} className="py-3 px-4 text-left text-xs font-medium text-neutral-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-white/5 bg-white dark:bg-neutral-800/20">
              {mockPlayers.map((p) => (
                <tr key={p.uuid} className="hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 text-sm font-medium text-neutral-800 dark:text-white">{p.name}</td>
                  <td className="py-3 px-4 text-sm">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${p.online ? "text-emerald-600 dark:text-emerald-400" : "text-neutral-400"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${p.online ? "bg-emerald-500" : "bg-neutral-400"}`} />
                      {p.online ? "Online" : "Offline"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-neutral-600 dark:text-neutral-400">{p.playtime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
