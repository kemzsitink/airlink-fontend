"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiKeysApi } from "./api";
import { MOCK_API_KEYS } from "./types";
import type { CreateApiKeyPayload } from "./types";

export const apiKeyKeys = {
  all: ["apikeys"] as const,
  list: () => [...apiKeyKeys.all, "list"] as const,
};

export function useApiKeys() {
  return useQuery({
    queryKey: apiKeyKeys.list(),
    queryFn: apiKeysApi.list,
    placeholderData: MOCK_API_KEYS,
  });
}

export function useCreateApiKey() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateApiKeyPayload) => apiKeysApi.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: apiKeyKeys.list() }),
  });
}

export function useToggleApiKey() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => apiKeysApi.toggle(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: apiKeyKeys.list() }),
  });
}

export function useDeleteApiKey() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => apiKeysApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: apiKeyKeys.list() }),
  });
}
