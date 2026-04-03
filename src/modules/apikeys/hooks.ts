"use client";

import { useState, useEffect } from "react";
import { apiKeysApi } from "./api";
import { MOCK_API_KEYS } from "./types";
import type { ApiKey } from "./types";

export function useApiKeys() {
  const [keys, setKeys] = useState<ApiKey[]>(MOCK_API_KEYS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiKeysApi
      .list()
      .then(setKeys)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { keys, loading, setKeys };
}
