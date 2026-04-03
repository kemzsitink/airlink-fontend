"use client";

import { useState, useEffect } from "react";
import { authApi } from "./api";
import { MOCK_USER } from "./types";
import type { User } from "./types";

export function useCurrentUser() {
  const [user, setUser] = useState<User>(MOCK_USER);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    authApi
      .me()
      .then(setUser)
      .catch(() => {}) // fallback to mock
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}
