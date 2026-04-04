export interface ApiKey {
  id: number;
  name: string;
  description?: string;
  key: string;
  active: boolean;
  permissions: number;
  createdAt: string;
  user: { username: string };
}

export interface CreateApiKeyPayload {
  name: string;
  description?: string;
  permissions: string[];
}


