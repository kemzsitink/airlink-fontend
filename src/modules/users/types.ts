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


