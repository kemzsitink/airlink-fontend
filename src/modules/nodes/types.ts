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


