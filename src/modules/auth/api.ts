import { apiRequest } from '../api-client'
import type { User, LoginPayload, RegisterPayload, LoginHistory } from './types'

export const authApi = {
  login: (payload: LoginPayload) =>
    apiRequest<{ user: User }>('/auth/login', { method: 'POST', body: payload }),

  register: (payload: RegisterPayload) =>
    apiRequest<{ user: User }>('/auth/register', { method: 'POST', body: payload }),

  logout: () =>
    apiRequest<void>('/auth/logout', { method: 'POST' }),

  me: () =>
    apiRequest<User>('/auth/me'),

  loginHistory: () =>
    apiRequest<LoginHistory[]>('/users/me/login-history'),

  updateUsername: (newUsername: string) =>
    apiRequest<void>('/users/me/account', { method: 'PATCH', body: { username: newUsername } }),

  updateEmail: (email: string) =>
    apiRequest<void>('/users/me/account', { method: 'PATCH', body: { email } }),

  updatePassword: (currentPassword: string, newPassword: string) =>
    apiRequest<void>('/users/me/account', { method: 'PATCH', body: { currentPassword, newPassword } }),

  updateDescription: (description: string) =>
    apiRequest<void>('/users/me/account', { method: 'PATCH', body: { description } }),

  checkUsername: (username: string) =>
    apiRequest<{ available: boolean }>(`/users/me/check-username?username=${encodeURIComponent(username)}`),

  validatePassword: (password: string) =>
    apiRequest<{ valid: boolean }>('/users/me/validate-password', { method: 'POST', body: { password } }),

  uploadAvatar: (formData: FormData) =>
    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'}/users/me/avatar`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    }).then((r) => r.json()),

  removeAvatar: () =>
    apiRequest<void>('/users/me/avatar', { method: 'DELETE' }),
}
