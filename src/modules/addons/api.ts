import { apiRequest } from '../api-client'
import type { Addon } from './types'
import type { ApiResponse } from '../types'

export const addonsApi = {
  list: () => apiRequest<Addon[]>('/addons'),
  toggle: (slug: string, enabled: boolean) =>
    apiRequest<ApiResponse>(`/addons/${slug}/toggle`, { method: 'POST', body: { enabled: String(enabled) } }),
  uninstall: (slug: string) =>
    apiRequest<ApiResponse>(`/addons/${slug}`, { method: 'DELETE' }),
  reload: () =>
    apiRequest<ApiResponse>('/addons/reload', { method: 'POST' }),
}
