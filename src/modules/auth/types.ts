export interface User {
  id: number;
  username: string;
  email: string;
  description?: string;
  avatar?: string;
  isAdmin: boolean;
  serverLimit: number;
  maxMemory: number;
  maxCpu: number;
  maxStorage: number;
  lang?: string;
}

// SessionUser — subset returned by /auth/me
export type SessionUser = Pick<User, 'id' | 'username' | 'email' | 'isAdmin' | 'description'>

export interface LoginPayload {
  identifier: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginHistory {
  timestamp: string;
  ipAddress: string;
  userAgent: string;
}

// ── Mock data ────────────────────────────────────────────────────────────────

export const MOCK_USER: User = {
  id: 1,
  username: "admin",
  email: "admin@example.com",
  description: "Administrator",
  isAdmin: true,
  serverLimit: 10,
  maxMemory: 8192,
  maxCpu: 400,
  maxStorage: 100,
  lang: "en",
};

export const MOCK_LOGIN_HISTORY: LoginHistory[] = [
  { timestamp: "2025-04-01T10:00:00Z", ipAddress: "127.0.0.1", userAgent: "Mozilla/5.0 Chrome/120" },
  { timestamp: "2025-03-30T08:30:00Z", ipAddress: "192.168.1.5", userAgent: "Mozilla/5.0 Firefox/119" },
];
