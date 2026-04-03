export interface PanelSettings {
  title: string;
  logo?: string;
  favicon?: string;
  allowRegistration: boolean;
  allowUserCreateServer: boolean;
  allowUserDeleteServer: boolean;
  uploadLimit: number;
  defaultServerLimit: number;
  defaultMaxMemory: number;
  defaultMaxCpu: number;
  defaultMaxStorage: number;
  loginWallpaper?: string;
  registerWallpaper?: string;
  lightTheme?: string;
  darkTheme?: string;
  rateLimitEnabled: boolean;
  rateLimitRpm: number;
  loginMaxAttempts: number;
  virusTotalApiKey?: string;
  behindReverseProxy?: boolean;
}

export interface BannedIp {
  ip: string;
}

// ── Mock data ────────────────────────────────────────────────────────────────

export const MOCK_SETTINGS: PanelSettings = {
  title: "AirLink",
  allowRegistration: true,
  allowUserCreateServer: true,
  allowUserDeleteServer: false,
  uploadLimit: 100,
  defaultServerLimit: 3,
  defaultMaxMemory: 1024,
  defaultMaxCpu: 100,
  defaultMaxStorage: 10,
  rateLimitEnabled: true,
  rateLimitRpm: 100,
  loginMaxAttempts: 5,
};

export const MOCK_BANNED_IPS: string[] = ["192.168.1.50"];
