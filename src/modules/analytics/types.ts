export interface AnalyticsSummary {
  servers: {
    total: number;
    suspended: number;
    installing: number;
    totalRamMb: number;
    totalCpuPct: number;
    totalStorageGb: number;
  };
  nodes: {
    id: number;
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
  totalServers: number;
  servers: {
    serverName: string;
    serverId: string;
    online: boolean;
    onlinePlayers: number;
    maxPlayers: number;
    version?: string;
  }[];
  historicalData: { timestamp: string; totalPlayers: number }[];
}


