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

// ── Mock data ────────────────────────────────────────────────────────────────

export const MOCK_API_KEYS: ApiKey[] = [
  { id: 1, name: "Main API Key", description: "Used for automation", key: "al_abc123def456", active: true, permissions: 0, createdAt: "2025-01-01", user: { username: "admin" } },
  { id: 2, name: "Read-Only Key", description: "", key: "al_xyz789uvw012", active: false, permissions: 0, createdAt: "2025-02-15", user: { username: "admin" } },
];
