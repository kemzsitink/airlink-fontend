"use client";

import { useQuery } from "@tanstack/react-query";
import { analyticsApi } from "./api";

export const analyticsKeys = {
  summary: ["analytics", "summary"] as const,
  playerStats: ["analytics", "player-stats"] as const,
};

export function useAnalytics() {
  return useQuery({
    queryKey: analyticsKeys.summary,
    queryFn: analyticsApi.summary,
    refetchInterval: 30_000,
  });
}

export function usePlayerStats() {
  return useQuery({
    queryKey: analyticsKeys.playerStats,
    queryFn: analyticsApi.playerStats,
    refetchInterval: 5 * 60_000,
  });
}
