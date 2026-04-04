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


