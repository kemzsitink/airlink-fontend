import { apiRequest } from "../api-client";
import type { AdminUser, CreateUserPayload, UpdateUserPayload } from "./types";

export const usersApi = {
  list: () => apiRequest<AdminUser[]>("/admin/api/users"),
  get: (id: number) => apiRequest<AdminUser>(`/admin/users/view/${id}`),
  create: (payload: CreateUserPayload) =>
    apiRequest<void>("/admin/users/create-user", { method: "POST", body: payload }),
  update: (id: number, payload: UpdateUserPayload) =>
    apiRequest<void>(`/admin/users/edit/${id}`, { method: "POST", body: payload }),
  delete: (id: number) =>
    apiRequest<void>(`/admin/users/delete/${id}`, { method: "DELETE" }),
};
