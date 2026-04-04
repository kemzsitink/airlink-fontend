import { apiRequest } from '../api-client'
import type { AdminUser, CreateUserPayload, UpdateUserPayload } from './types'

export const usersApi = {
  list: () => apiRequest<AdminUser[]>('/users'),
  get: (id: number) => apiRequest<AdminUser>(`/users/${id}`),
  create: (payload: CreateUserPayload) =>
    apiRequest<AdminUser>('/users', { method: 'POST', body: payload }),
  update: (id: number, payload: UpdateUserPayload) =>
    apiRequest<AdminUser>(`/users/${id}`, { method: 'PATCH', body: payload }),
  delete: (id: number) =>
    apiRequest<void>(`/users/${id}`, { method: 'DELETE' }),
}
