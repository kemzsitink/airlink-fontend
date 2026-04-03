import { apiRequest } from "../api-client";
import type { Image } from "./types";

export const imagesApi = {
  list: () => apiRequest<Image[]>("/admin/api/images"),
  get: (id: number) => apiRequest<Image>(`/admin/images/edit/${id}`),
  create: (payload: Partial<Image>) =>
    apiRequest<Image>("/admin/images/create", { method: "POST", body: payload }),
  update: (id: number, payload: Partial<Image>) =>
    apiRequest<void>(`/admin/images/edit/${id}`, { method: "POST", body: payload }),
  delete: (id: number) =>
    apiRequest<void>(`/admin/images/delete/${id}`, { method: "DELETE" }),
  upload: (json: string) =>
    apiRequest<void>("/admin/images/upload", { method: "POST", body: JSON.parse(json) }),
  exportImage: (id: number) =>
    apiRequest<Image>(`/admin/images/export/${id}`),
  storeInstall: (slug: string) =>
    apiRequest<void>("/admin/images/store/install", { method: "POST", body: { slug } }),
  storeUninstall: (slug: string) =>
    apiRequest<void>("/admin/images/store/uninstall", { method: "POST", body: { slug } }),
};
