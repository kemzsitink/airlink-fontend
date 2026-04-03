import { apiRequest } from "../api-client";
import type { PanelSettings } from "./types";

export const settingsApi = {
  get: () => apiRequest<PanelSettings>("/admin/api/settings"),
  saveAppearance: (formData: FormData) =>
    fetch("/admin/settings/appearance", { method: "POST", credentials: "include", body: formData }).then((r) => r.json()),
  saveServerPolicy: (payload: Partial<PanelSettings>) =>
    apiRequest<void>("/admin/settings/server-policy", { method: "POST", body: payload }),
  saveVtKey: (key: string) =>
    apiRequest<void>("/admin/settings/virustotal", { method: "POST", body: { key } }),
  saveRateLimit: (payload: { rateLimitEnabled: boolean; rateLimitRpm: number }) =>
    apiRequest<void>("/admin/security/rate-limit", { method: "POST", body: payload }),
  banIp: (ip: string) =>
    apiRequest<void>("/admin/security/ban-ip", { method: "POST", body: { ip } }),
  unbanIp: (ip: string) =>
    apiRequest<void>("/admin/security/unban-ip", { method: "POST", body: { ip } }),
  getBannedIps: () => apiRequest<string[]>("/admin/api/banned-ips"),
};
