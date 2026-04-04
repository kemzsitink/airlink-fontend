import { apiRequest } from '../api-client'
import type { ApiKey, CreateApiKeyPayload } from './types'

export const apiKeysApi = {
  list: () => apiRequest<ApiKey[]>('/apikeys'),
  create: (payload: CreateApiKeyPayload) =>
    apiRequest<{ apiKey: ApiKey; rawKey: string }>('/apikeys', { method: 'POST', body: payload }),
  edit: (id: number, payload: Partial<CreateApiKeyPayload>) =>
    apiRequest<ApiKey>(`/apikeys/${id}`, { method: 'PATCH', body: payload }),
  toggle: (id: number) =>
    apiRequest<ApiKey>(`/apikeys/${id}/toggle`, { method: 'POST' }),
  delete: (id: number) =>
    apiRequest<void>(`/apikeys/${id}`, { method: 'DELETE' }),
}
