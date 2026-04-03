import { apiRequest } from "../api-client";
import type { Node, CreateNodePayload } from "./types";

export const nodesApi = {
  list: () => apiRequest<Node[]>("/admin/api/nodes"),
  get: (id: number) => apiRequest<Node>(`/admin/node/${id}`),
  create: (payload: CreateNodePayload) =>
    apiRequest<void>("/admin/nodes/create", { method: "POST", body: payload }),
  update: (id: number, payload: Partial<CreateNodePayload>) =>
    apiRequest<void>(`/admin/node/${id}`, { method: "POST", body: payload }),
  delete: (id: number, deleteInstances = false) =>
    apiRequest<void>(`/admin/node/${id}${deleteInstances ? "?deleteInstance=true" : ""}`, { method: "DELETE" }),
  configure: (id: number) =>
    apiRequest<string>(`/admin/node/${id}/configure`),
  stats: (id: number) =>
    apiRequest<Node>(`/admin/node/${id}/stats`),
};
