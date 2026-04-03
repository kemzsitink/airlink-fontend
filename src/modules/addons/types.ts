export interface Addon {
  slug: string;
  name: string;
  description?: string;
  version: string;
  author?: string;
  enabled: boolean;
}

// ── Mock data ────────────────────────────────────────────────────────────────

export const MOCK_ADDONS: Addon[] = [
  { slug: "player-stats", name: "Player Stats", description: "Track player statistics across servers", version: "1.2.0", author: "AirlinkLabs", enabled: true },
  { slug: "auto-backup", name: "Auto Backup", description: "Automated server backups", version: "0.9.1", author: "community", enabled: false },
];
