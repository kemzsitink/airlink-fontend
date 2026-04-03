"use client";

import { useState, useEffect } from "react";
import { usersApi } from "./api";
import { MOCK_USERS } from "./types";
import type { AdminUser } from "./types";

export function useUsers() {
  const [users, setUsers] = useState<AdminUser[]>(MOCK_USERS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    usersApi
      .list()
      .then(setUsers)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { users, loading };
}

export function useUser(id: number) {
  const [user, setUser] = useState<AdminUser | null>(
    MOCK_USERS.find((u) => u.id === id) ?? null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    usersApi
      .get(id)
      .then(setUser)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  return { user, loading };
}
