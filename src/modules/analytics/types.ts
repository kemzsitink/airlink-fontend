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


