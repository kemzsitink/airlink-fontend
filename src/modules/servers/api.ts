import { apiRequest } from '../api-client'
import type { Server, CreateServerPayload, Backup, StartupVariable, FileEntry } from './types'

export const serversApi = {
  list: () => apiRequest<Server[]>('/servers'),
  get: (uuid: string) => apiRequest<Server>(`/servers/${uuid}`),

  create: (payload: CreateServerPayload) =>
    apiRequest<Server>('/servers', { method: 'POST', body: payload }),

  delete: (id: number) =>
    apiRequest<void>(`/servers/${id}`, { method: 'DELETE' }),

  // Power
  start: (uuid: string) =>
    apiRequest<void>(`/servers/${uuid}/power/start`, { method: 'POST' }),
  stop: (uuid: string) =>
    apiRequest<void>(`/servers/${uuid}/power/stop`, { method: 'POST' }),
  restart: (uuid: string) =>
    apiRequest<void>(`/servers/${uuid}/power/restart`, { method: 'POST' }),

  // Status
  getStatus: (uuid: string) =>
    apiRequest<{ running: boolean; uptime?: number; startedAt?: string; daemonOffline: boolean }>(
      `/servers/${uuid}/status`
    ),

  // Backups
  listBackups: (uuid: string) => apiRequest<Backup[]>(`/servers/${uuid}/backups`),
  createBackup: (uuid: string) => apiRequest<Backup>(`/servers/${uuid}/backups`, { method: 'POST' }),
  deleteBackup: (uuid: string, backupId: number) =>
    apiRequest<void>(`/servers/${uuid}/backups/${backupId}`, { method: 'DELETE' }),

  // Startup
  getStartup: (uuid: string) =>
    apiRequest<{ command: string; variables: StartupVariable[] }>(`/servers/${uuid}/startup`),
  saveVariables: (uuid: string, variables: Record<string, string>) =>
    apiRequest<void>(`/servers/${uuid}/startup`, { method: 'PATCH', body: variables }),

  // Files
  listFiles: (uuid: string, path?: string) =>
    apiRequest<FileEntry[]>(`/servers/${uuid}/files${path ? `?path=${encodeURIComponent(path)}` : ''}`),
  getFile: (uuid: string, path: string) =>
    apiRequest<{ content: string }>(`/servers/${uuid}/files/content?path=${encodeURIComponent(path)}`),
  saveFile: (uuid: string, path: string, content: string) =>
    apiRequest<void>(`/servers/${uuid}/files/content`, { method: 'PUT', body: { path, content } }),
  deleteFile: (uuid: string, path: string) =>
    apiRequest<void>(`/servers/${uuid}/files`, { method: 'DELETE', body: { path } }),

  // Admin
  adminList: () => apiRequest<Server[]>('/servers'),
  adminCreate: (payload: CreateServerPayload) =>
    apiRequest<Server>('/servers', { method: 'POST', body: payload }),
  adminEdit: (id: number, payload: Partial<Server>) =>
    apiRequest<void>(`/servers/${id}`, { method: 'PATCH', body: payload }),
  adminDelete: (id: number) =>
    apiRequest<void>(`/servers/${id}`, { method: 'DELETE' }),

  // Players / Worlds
  getPlayers: (uuid: string) =>
    apiRequest<{ online: boolean; players: { name: string; uuid: string; online: boolean; playtime?: string }[]; onlinePlayers: number; maxPlayers: number }>(
      `/servers/${uuid}/players`
    ),
  getWorlds: (uuid: string) =>
    apiRequest<{ worlds: { name: string; type?: string; size?: string }[] }>(
      `/servers/${uuid}/worlds`
    ),

  // SFTP
  getSftpCredentials: (uuid: string) =>
    apiRequest<{ username: string; password: string; host: string; port: number; expiresAt?: string }>(
      `/servers/${uuid}/sftp/credentials`
    ),
  generateSftpCredentials: (uuid: string) =>
    apiRequest<{ username: string; password: string; host: string; port: number; expiresAt?: string }>(
      `/servers/${uuid}/sftp/credentials`, { method: 'POST' }
    ),
  revokeSftpCredentials: (uuid: string) =>
    apiRequest<void>(`/servers/${uuid}/sftp/credentials`, { method: 'DELETE' }),
}
