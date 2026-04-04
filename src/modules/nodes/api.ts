import { apiRequest } from '../api-client'
import type { Node, CreateNodePayload } from './types'

export const nodesApi = {
  list: () => apiRequest<Node[]>('/nodes'),
  get: (id: number) => apiRequest<Node>(`/nodes/${id}`),
  create: (payload: CreateNodePayload) =>
    apiRequest<Node>('/nodes', { method: 'POST', body: payload }),
  update: (id: number, payload: Partial<CreateNodePayload>) =>
    apiRequest<Node>(`/nodes/${id}`, { method: 'PATCH', body: payload }),
  delete: (id: number, deleteInstances = false) =>
    apiRequest<void>(`/nodes/${id}${deleteInstances ? '?deleteInstances=true' : ''}`, { method: 'DELETE' }),
  configure: (id: number) =>
    apiRequest<{ command: string }>(`/nodes/${id}/configure`),
  stats: (id: number) =>
    apiRequest<unknown>(`/nodes/${id}/stats`),
}
