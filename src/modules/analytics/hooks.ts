"use client";

import { useQuery } from "@tanstack/react-query";
import { analyticsApi } from "./api";
import { MOCK_ANALYTICS, MOCK_PLAYER_STATS } from "./types";

export const analyticsKeys = {
  summary: ["analytics", "summary"] as const,
  playerStats: ["analytics", "player-stats"] as const,
};

export function useAnalytics() {
  return useQuery({
    queryKey: analyticsKeys.summary,
    queryFn: analyticsApi.summary,
    placeholderData: MOCK_ANALYTICS,
    refetchInterval: 30_000,
  });
}

export function usePlayerStats() {
  return useQuery({
    queryKey: analyticsKeys.playerStats,
    queryFn: analyticsApi.playerStats,
    placeholderData: MOCK_PLAYER_STATS,
    refetchInterval: 5 * 60_000,
  });
}
