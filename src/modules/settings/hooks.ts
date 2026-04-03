"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { settingsApi } from "./api";
import { MOCK_SETTINGS, MOCK_BANNED_IPS } from "./types";
import type { PanelSettings } from "./types";

export const settingsKeys = {
  settings: ["settings"] as const,
  bannedIps: ["settings", "banned-ips"] as const,
};

export function useSettings() {
  return useQuery({
    queryKey: settingsKeys.settings,
    queryFn: settingsApi.get,
    placeholderData: MOCK_SETTINGS,
  });
}

export function useSaveRateLimit() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { rateLimitEnabled: boolean; rateLimitRpm: number }) =>
      settingsApi.saveRateLimit(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: settingsKeys.settings }),
  });
}

export function useSaveServerPolicy() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<PanelSettings>) => settingsApi.saveServerPolicy(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: settingsKeys.settings }),
  });
}

export function useBannedIps() {
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: settingsKeys.bannedIps,
    queryFn: settingsApi.getBannedIps,
    placeholderData: MOCK_BANNED_IPS,
  });

  const ban = useMutation({
    mutationFn: (ip: string) => settingsApi.banIp(ip),
    onSuccess: () => qc.invalidateQueries({ queryKey: settingsKeys.bannedIps }),
  });

  const unban = useMutation({
    mutationFn: (ip: string) => settingsApi.unbanIp(ip),
    onSuccess: () => qc.invalidateQueries({ queryKey: settingsKeys.bannedIps }),
  });

  return {
    bannedIps: query.data ?? MOCK_BANNED_IPS,
    ban: (ip: string) => ban.mutate(ip),
    unban: (ip: string) => unban.mutate(ip),
  };
}
