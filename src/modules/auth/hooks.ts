"use client";

import { useQuery } from "@tanstack/react-query";
import { authApi } from "./api";

export const authKeys = {
  me: ["auth", "me"] as const,
  loginHistory: ["auth", "login-history"] as const,
};

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.me,
    queryFn: authApi.me,
    retry: false,
  });
}

export function useLoginHistory() {
  return useQuery({
    queryKey: authKeys.loginHistory,
    queryFn: authApi.loginHistory,
  });
}
