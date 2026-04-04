import { apiRequest } from '../api-client'
import type { Image } from './types'

export const imagesApi = {
  list: () => apiRequest<Image[]>('/images'),
  get: (id: number) => apiRequest<Image>(`/images/${id}`),
  create: (payload: Partial<Image>) =>
    apiRequest<Image>('/images', { method: 'POST', body: payload }),
  update: (id: number, payload: Partial<Image>) =>
    apiRequest<Image>(`/images/${id}`, { method: 'PATCH', body: payload }),
  delete: (id: number) =>
    apiRequest<void>(`/images/${id}`, { method: 'DELETE' }),
  upload: (json: unknown) =>
    apiRequest<Image>('/images/import', { method: 'POST', body: json }),
  exportImage: (id: number) =>
    apiRequest<Image>(`/images/${id}`),
  storeInstall: (slug: string) =>
    apiRequest<void>('/images/import', { method: 'POST', body: { slug } }),
  storeUninstall: (id: number) =>
    apiRequest<void>(`/images/${id}`, { method: 'DELETE' }),
}
