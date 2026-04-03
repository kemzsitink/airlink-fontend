"use client";

import { useQuery } from "@tanstack/react-query";
import { authApi } from "./api";
import { MOCK_USER } from "./types";

export const authKeys = {
  me: ["auth", "me"] as const,
  loginHistory: ["auth", "login-history"] as const,
};

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.me,
    queryFn: authApi.me,
    placeholderData: MOCK_USER,
  });
}

export function useLoginHistory() {
  return useQuery({
    queryKey: authKeys.loginHistory,
    queryFn: authApi.loginHistory,
    placeholderData: [],
  });
}
