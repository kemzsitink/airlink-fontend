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


