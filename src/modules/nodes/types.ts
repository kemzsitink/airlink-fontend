export interface Node {
  id: number;
  name: string;
  address: string;
  port: number;
  status: "Online" | "Offline" | "Unknown";
  versionRelease?: string | null;
  ram: number;
  cpu: number;
  disk: number;
  instances: { id: number }[];
  error?: string;
}

export interface CreateNodePayload {
  name: string;
  address: string;
  port: number;
  ram?: number;
  cpu?: string;
  disk?: number;
}

// ── Mock data ────────────────────────────────────────────────────────────────

export const MOCK_NODES: Node[] = [
  {
    id: 1,
    name: "Node-1",
    address: "127.0.0.1",
    port: 3001,
    status: "Online",
    versionRelease: "v1.0.0",
    ram: 16384,
    cpu: 800,
    disk: 500,
    instances: [{ id: 1 }, { id: 2 }],
  },
  {
    id: 2,
    name: "Node-2",
    address: "192.168.1.10",
    port: 3001,
    status: "Offline",
    versionRelease: null,
    ram: 8192,
    cpu: 400,
    disk: 200,
    instances: [],
  },
];
