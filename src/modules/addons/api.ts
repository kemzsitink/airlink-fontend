import { apiRequest } from "../api-client";
import type { Addon } from "./types";
import type { ApiResponse } from "../types";

export const addonsApi = {
  list: () => apiRequest<Addon[]>("/admin/api/addons"),
  toggle: (slug: string, enabled: boolean) =>
    apiRequest<ApiResponse>(`/admin/addons/toggle/${slug}`, { method: "POST", body: { enabled: String(enabled) } }),
  uninstall: (slug: string) =>
    apiRequest<ApiResponse>("/admin/addons/store/uninstall", { method: "POST", body: { slug } }),
  reload: () =>
    apiRequest<ApiResponse>("/admin/addons/reload", { method: "POST" }),
};
