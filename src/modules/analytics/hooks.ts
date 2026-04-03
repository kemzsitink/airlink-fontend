"use client";

import { useState, useEffect, useCallback } from "react";
import { analyticsApi } from "./api";
import { MOCK_ANALYTICS, MOCK_PLAYER_STATS } from "./types";
import type { AnalyticsSummary, PlayerStats } from "./types";

export function useAnalytics() {
  const [data, setData] = useState<AnalyticsSummary>(MOCK_ANALYTICS);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(() => {
    setLoading(true);
    analyticsApi
      .summary()
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return { data, loading, refresh };
}

export function usePlayerStats() {
  const [data, setData] = useState<PlayerStats>(MOCK_PLAYER_STATS);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(() => {
    setLoading(true);
    analyticsApi
      .playerStats()
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return { data, loading, refresh };
}
