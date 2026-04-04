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


