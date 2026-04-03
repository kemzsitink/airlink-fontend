import { apiRequest } from "../api-client";
import type { AnalyticsSummary, PlayerStats } from "./types";

export const analyticsApi = {
  summary: () => apiRequest<AnalyticsSummary>("/api/admin/analytics/summary"),
  playerStats: () => apiRequest<PlayerStats>("/api/admin/playerstats"),
  collectPlayerStats: () =>
    apiRequest<{ success: boolean }>("/api/admin/playerstats/collect", { method: "POST" }),
};
