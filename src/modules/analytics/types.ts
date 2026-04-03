export interface AnalyticsSummary {
  servers: {
    total: number;
    suspended: number;
    totalRamMb: number;
    totalCpuPct: number;
    totalStorageGb: number;
    topImages: { name: string; count: number }[];
    topServers: { name: string; owner: string; image: string; memory: number; cpu: number; storage: number; suspended: boolean }[];
  };
  nodes: {
    name: string;
    address: string;
    port: number;
    online: boolean;
    versionRelease?: string | null;
    serverCount: number;
    ram: number;
    cpu: number;
    disk: number;
  }[];
  activity: {
    totalUsers: number;
    adminCount: number;
    totalImages: number;
    loginsByDay: Record<string, number>;
    recentLogins: { userId: number; ipAddress: string; timestamp: string }[];
  };
}

export interface PlayerStats {
  totalPlayers: number;
  totalMaxPlayers: number;
  onlineServers: number;
  servers: {
    serverName: string;
    serverId: string;
    online: boolean;
    playerCount: number;
    maxPlayers: number;
    version?: string;
  }[];
  historicalData: { timestamp: string; totalPlayers: number }[];
}

// ── Mock data ────────────────────────────────────────────────────────────────

export const MOCK_ANALYTICS: AnalyticsSummary = {
  servers: {
    total: 8,
    suspended: 1,
    totalRamMb: 8192,
    totalCpuPct: 400,
    totalStorageGb: 80,
    topImages: [{ name: "Minecraft Java", count: 5 }, { name: "Velocity Proxy", count: 3 }],
    topServers: [
      { name: "Minecraft SMP", owner: "admin", image: "Minecraft Java", memory: 4096, cpu: 200, storage: 20, suspended: false },
    ],
  },
  nodes: [
    { name: "Node-1", address: "127.0.0.1", port: 3001, online: true, versionRelease: "v1.0.0", serverCount: 6, ram: 16384, cpu: 800, disk: 500 },
    { name: "Node-2", address: "192.168.1.10", port: 3001, online: false, versionRelease: null, serverCount: 2, ram: 8192, cpu: 400, disk: 200 },
  ],
  activity: {
    totalUsers: 12,
    adminCount: 2,
    totalImages: 5,
    loginsByDay: { "2025-03-01": 3, "2025-03-02": 5, "2025-03-03": 2 },
    recentLogins: [
      { userId: 1, ipAddress: "127.0.0.1", timestamp: "2025-04-01T10:00:00Z" },
    ],
  },
};

export const MOCK_PLAYER_STATS: PlayerStats = {
  totalPlayers: 24,
  totalMaxPlayers: 200,
  onlineServers: 3,
  servers: [
    { serverName: "Minecraft SMP", serverId: "abc-123", online: true, playerCount: 18, maxPlayers: 100, version: "1.21.1" },
    { serverName: "Velocity Proxy", serverId: "def-456", online: true, playerCount: 6, maxPlayers: 50, version: "3.3.0" },
    { serverName: "Creative World", serverId: "ghi-789", online: false, playerCount: 0, maxPlayers: 50, version: "1.21.1" },
  ],
  historicalData: [],
};
