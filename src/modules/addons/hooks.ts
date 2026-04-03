"use client";

import { useState, useEffect } from "react";
import { addonsApi } from "./api";
import { MOCK_ADDONS } from "./types";
import type { Addon } from "./types";

export function useAddons() {
  const [addons, setAddons] = useState<Addon[]>(MOCK_ADDONS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    addonsApi
      .list()
      .then(setAddons)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function toggle(slug: string) {
    setAddons((prev) =>
      prev.map((a) => (a.slug === slug ? { ...a, enabled: !a.enabled } : a))
    );
    const addon = addons.find((a) => a.slug === slug);
    if (addon) addonsApi.toggle(slug, !addon.enabled).catch(() => {});
  }

  function uninstall(slug: string) {
    setAddons((prev) => prev.filter((a) => a.slug !== slug));
    addonsApi.uninstall(slug).catch(() => {});
  }

  return { addons, loading, toggle, uninstall };
}
