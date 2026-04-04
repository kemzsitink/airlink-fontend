import { apiRequest } from '../api-client'
import type { PanelSettings } from './types'

export const settingsApi = {
  get: () => apiRequest<PanelSettings>('/settings'),
  saveAppearance: (payload: Partial<PanelSettings>) =>
    apiRequest<PanelSettings>('/settings', { method: 'PATCH', body: payload }),
  saveServerPolicy: (payload: Partial<PanelSettings>) =>
    apiRequest<PanelSettings>('/settings', { method: 'PATCH', body: payload }),
  saveVtKey: (key: string) =>
    apiRequest<PanelSettings>('/settings', { method: 'PATCH', body: { virusTotalApiKey: key } }),
  saveRateLimit: (payload: { rateLimitEnabled: boolean; rateLimitRpm: number }) =>
    apiRequest<PanelSettings>('/settings', { method: 'PATCH', body: payload }),
  banIp: (ip: string) =>
    apiRequest<void>('/settings/ban-ip', { method: 'POST', body: { ip } }),
  unbanIp: (ip: string) =>
    apiRequest<void>('/settings/unban-ip', { method: 'POST', body: { ip } }),
  getBannedIps: () => apiRequest<string[]>('/settings/banned-ips'),
}
