import { apiRequest } from "../api-client";
import type { ApiKey, CreateApiKeyPayload } from "./types";

export const apiKeysApi = {
  list: () => apiRequest<ApiKey[]>("/admin/api/apikeys"),
  create: (payload: CreateApiKeyPayload) =>
    apiRequest<ApiKey>("/admin/apikeys/create", { method: "POST", body: payload }),
  edit: (id: number, payload: Partial<CreateApiKeyPayload>) =>
    apiRequest<void>(`/admin/apikeys/edit/${id}`, { method: "POST", body: payload }),
  toggle: (id: number) =>
    apiRequest<void>(`/admin/apikeys/toggle/${id}`, { method: "POST" }),
  delete: (id: number) =>
    apiRequest<void>(`/admin/apikeys/delete/${id}`, { method: "POST" }),
};
