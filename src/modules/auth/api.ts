import { apiRequest } from "../api-client";
import type { User, LoginPayload, RegisterPayload, LoginHistory } from "./types";

export const authApi = {
  login: (payload: LoginPayload) =>
    apiRequest<{ user: User }>("/api/auth/login", { method: "POST", body: payload }),

  register: (payload: RegisterPayload) =>
    apiRequest<{ user: User }>("/api/auth/register", { method: "POST", body: payload }),

  logout: () =>
    apiRequest<void>("/api/auth/logout", { method: "POST" }),

  me: () =>
    apiRequest<User>("/api/auth/me"),

  loginHistory: () =>
    apiRequest<LoginHistory[]>("/api/auth/login-history"),

  updateUsername: (newUsername: string) =>
    apiRequest<void>("/update-username", { method: "POST", body: { newUsername } }),

  updateEmail: (email: string) =>
    apiRequest<void>("/change-email", { method: "POST", body: { email } }),

  updatePassword: (currentPassword: string, newPassword: string) =>
    apiRequest<void>("/change-password", { method: "POST", body: { currentPassword, newPassword } }),

  updateDescription: (description: string) =>
    apiRequest<void>("/update-description", { method: "POST", body: { description } }),

  setLanguage: (language: string) =>
    apiRequest<void>("/set-language", { method: "POST", body: { language } }),

  checkUsername: (username: string) =>
    apiRequest<{ exists: boolean }>(`/check-username?username=${encodeURIComponent(username)}`),

  validatePassword: (currentPassword: string) =>
    apiRequest<{ valid: boolean }>("/validate-password", { method: "POST", body: { currentPassword } }),

  uploadAvatar: (formData: FormData) =>
    fetch("/upload-avatar", { method: "POST", credentials: "include", body: formData }).then((r) => r.json()),

  removeAvatar: () =>
    apiRequest<void>("/remove-avatar", { method: "POST" }),
};
