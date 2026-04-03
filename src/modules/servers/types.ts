export interface Server {
  id: number;
  UUID: string;
  name: string;
  description?: string;
  status: "running" | "stopped" | "starting" | "stopping";
  Suspended: boolean;
  ramUsage: number;
  cpuUsage: number;
  ramUsed?: string;
  Ports: string;
  owner: { id: number; username: string; avatar?: string };
  node: { id: number; name: string; address: string };
  image: { id: number; name: string };
}

export interface CreateServerPayload {
  name: string;
  description?: string;
  nodeId: number;
  imageId: number;
  dockerImage: string;
  Memory: number;
  Cpu: number;
  Storage: number;
  ownerId?: number;
}

export interface ServerStats {
  ip: string;
  status: string;
  ram: string;
  cpu: string;
  disk: string;
}

export interface Backup {
  id: number;
  name: string;
  size: string;
  createdAt: string;
  completed: boolean;
}

export interface StartupVariable {
  name: string;
  env: string;
  description: string;
  value: string;
  editable: boolean;
}

export interface FileEntry {
  name: string;
  type: "file" | "directory";
  category?: string;
  size: number;
}

// ── Mock data ────────────────────────────────────────────────────────────────

export const MOCK_SERVERS: Server[] = [
  {
    id: 1,
    UUID: "abc-123",
    name: "Minecraft SMP",
    description: "Main survival server",
    status: "running",
    Suspended: false,
    ramUsage: 72,
    cpuUsage: 34,
    ramUsed: "2.8GB",
    Ports: '[{"primary":true,"Port":"0.0.0.0:25565"}]',
    owner: { id: 1, username: "admin" },
    node: { id: 1, name: "Node-1", address: "127.0.0.1" },
    image: { id: 1, name: "Minecraft Java" },
  },
  {
    id: 2,
    UUID: "def-456",
    name: "Velocity Proxy",
    description: "BungeeCord proxy",
    status: "stopped",
    Suspended: false,
    ramUsage: 0,
    cpuUsage: 0,
    ramUsed: "0MB",
    Ports: '[{"primary":true,"Port":"0.0.0.0:25577"}]',
    owner: { id: 1, username: "admin" },
    node: { id: 1, name: "Node-1", address: "127.0.0.1" },
    image: { id: 2, name: "Velocity Proxy" },
  },
];

export const MOCK_BACKUPS: Backup[] = [
  { id: 1, name: "backup-2025-04-01", size: "234 MB", createdAt: "2025-04-01T10:00:00Z", completed: true },
  { id: 2, name: "backup-2025-03-28", size: "228 MB", createdAt: "2025-03-28T08:00:00Z", completed: true },
];

export const MOCK_STARTUP = {
  command: "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar server.jar nogui",
  variables: [
    { name: "SERVER_MEMORY", env: "SERVER_MEMORY", description: "Max memory in MB", value: "4096", editable: true },
    { name: "SERVER_JARFILE", env: "SERVER_JARFILE", description: "Server jar filename", value: "server.jar", editable: true },
  ] as StartupVariable[],
};

export const MOCK_FILES: FileEntry[] = [
  { name: "plugins", type: "directory", size: 0 },
  { name: "world", type: "directory", size: 0 },
  { name: "server.jar", type: "file", category: "No Category", size: 45678901 },
  { name: "server.properties", type: "file", category: "Configuration Files", size: 1234 },
  { name: "eula.txt", type: "file", category: "Documents", size: 256 },
  { name: "banner.png", type: "file", category: "Images", size: 98765 },
];
