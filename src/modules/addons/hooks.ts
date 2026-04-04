"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addonsApi } from "./api";

export const addonKeys = {
  all: ["addons"] as const,
  list: () => [...addonKeys.all, "list"] as const,
};

export function useAddons() {
  return useQuery({ queryKey: addonKeys.list(), queryFn: addonsApi.list });
}

export function useToggleAddon() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ slug, enabled }: { slug: string; enabled: boolean }) =>
      addonsApi.toggle(slug, enabled),
    onSuccess: () => qc.invalidateQueries({ queryKey: addonKeys.list() }),
  });
}

export function useUninstallAddon() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (slug: string) => addonsApi.uninstall(slug),
    onSuccess: () => qc.invalidateQueries({ queryKey: addonKeys.list() }),
  });
}
