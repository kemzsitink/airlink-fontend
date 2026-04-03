"use client";

import { useState, useEffect } from "react";
import { settingsApi } from "./api";
import { MOCK_SETTINGS, MOCK_BANNED_IPS } from "./types";
import type { PanelSettings } from "./types";

export function useSettings() {
  const [settings, setSettings] = useState<PanelSettings>(MOCK_SETTINGS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    settingsApi
      .get()
      .then(setSettings)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { settings, setSettings, loading };
}

export function useBannedIps() {
  const [bannedIps, setBannedIps] = useState<string[]>(MOCK_BANNED_IPS);

  function ban(ip: string) {
    if (!ip.trim() || bannedIps.includes(ip.trim())) return;
    setBannedIps((prev) => [...prev, ip.trim()]);
    settingsApi.banIp(ip.trim()).catch(() => {});
  }

  function unban(ip: string) {
    setBannedIps((prev) => prev.filter((i) => i !== ip));
    settingsApi.unbanIp(ip).catch(() => {});
  }

  return { bannedIps, ban, unban };
}
