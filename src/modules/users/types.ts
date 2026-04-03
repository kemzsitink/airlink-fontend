export interface AdminUser {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
  description?: string;
  avatar?: string;
  online?: boolean;
  servers: { id: number; name: string; UUID: string }[];
  serverLimit: number;
  maxMemory: number;
  maxCpu: number;
  maxStorage: number;
}

export interface CreateUserPayload {
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export interface UpdateUserPayload {
  username?: string;
  email?: string;
  password?: string;
  isAdmin?: boolean;
  serverLimit?: number;
  maxMemory?: number;
  maxCpu?: number;
  maxStorage?: number;
}

// ── Mock data ────────────────────────────────────────────────────────────────

export const MOCK_USERS: AdminUser[] = [
  {
    id: 1,
    username: "admin",
    email: "admin@example.com",
    isAdmin: true,
    online: true,
    servers: [{ id: 1, name: "Minecraft SMP", UUID: "abc-123" }],
    serverLimit: 10,
    maxMemory: 8192,
    maxCpu: 400,
    maxStorage: 100,
  },
  {
    id: 2,
    username: "player1",
    email: "player1@example.com",
    isAdmin: false,
    online: false,
    servers: [{ id: 3, name: "Creative World", UUID: "ghi-789" }],
    serverLimit: 3,
    maxMemory: 2048,
    maxCpu: 200,
    maxStorage: 20,
  },
  {
    id: 3,
    username: "player2",
    email: "player2@example.com",
    isAdmin: false,
    online: false,
    servers: [],
    serverLimit: 3,
    maxMemory: 2048,
    maxCpu: 200,
    maxStorage: 20,
  },
];
