import { apiRequest } from "../api-client";
import type { Server, CreateServerPayload, Backup, StartupVariable, FileEntry } from "./types";
import type { ApiResponse } from "../types";

export const serversApi = {
  // User
  list: () => apiRequest<Server[]>("/api/servers"),
  get: (uuid: string) => apiRequest<Server>(`/api/servers/${uuid}`),
  create: (payload: CreateServerPayload) =>
    apiRequest<ApiResponse<{ serverUUID: string }>>("/create-server", { method: "POST", body: payload }),
  delete: (uuid: string) =>
    apiRequest<void>(`/api/servers/${uuid}`, { method: "DELETE" }),

  // Power
  start: (uuid: string) =>
    apiRequest<void>(`/server/${uuid}/power/start`, { method: "POST" }),
  stop: (uuid: string) =>
    apiRequest<void>(`/server/${uuid}/power/stop`, { method: "POST" }),
  restart: (uuid: string) =>
    apiRequest<void>(`/server/${uuid}/power/restart`, { method: "POST" }),

  // Backups
  listBackups: (uuid: string) => apiRequest<Backup[]>(`/api/servers/${uuid}/backups`),
  createBackup: (uuid: string) => apiRequest<Backup>(`/api/servers/${uuid}/backups`, { method: "POST" }),
  deleteBackup: (uuid: string, backupId: number) =>
    apiRequest<void>(`/api/servers/${uuid}/backups/${backupId}`, { method: "DELETE" }),

  // Startup
  getStartup: (uuid: string) =>
    apiRequest<{ command: string; variables: StartupVariable[] }>(`/api/servers/${uuid}/startup`),
  saveVariables: (uuid: string, variables: Record<string, string>) =>
    apiRequest<void>(`/api/servers/${uuid}/startup`, { method: "PATCH", body: variables }),

  // Files
  listFiles: (uuid: string, path?: string) =>
    apiRequest<FileEntry[]>(`/api/servers/${uuid}/files${path ? `?path=${encodeURIComponent(path)}` : ""}`),
  getFile: (uuid: string, path: string) =>
    apiRequest<{ content: string }>(`/api/servers/${uuid}/files/content?path=${encodeURIComponent(path)}`),
  saveFile: (uuid: string, path: string, content: string) =>
    apiRequest<void>(`/api/servers/${uuid}/files/content`, { method: "PUT", body: { path, content } }),
  deleteFile: (uuid: string, path: string) =>
    apiRequest<void>(`/api/servers/${uuid}/files`, { method: "DELETE", body: { path } }),

  // Admin
  adminList: () => apiRequest<Server[]>("/admin/api/servers"),
  adminCreate: (payload: CreateServerPayload) =>
    apiRequest<ApiResponse>("/admin/servers/create", { method: "POST", body: payload }),
  adminEdit: (id: number, payload: Partial<Server>) =>
    apiRequest<void>(`/admin/servers/edit/${id}`, { method: "POST", body: payload }),
  adminDelete: (id: number) =>
    apiRequest<void>(`/admin/server/delete/${id}`),
};
