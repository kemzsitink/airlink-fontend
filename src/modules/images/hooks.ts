"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { imagesApi } from "./api";
import type { Image } from "./types";

export const imageKeys = {
  all: ["images"] as const,
  list: () => [...imageKeys.all, "list"] as const,
  detail: (id: number) => [...imageKeys.all, id] as const,
};

export function useImages() {
  return useQuery({ queryKey: imageKeys.list(), queryFn: imagesApi.list });
}

export function useImage(id: number) {
  return useQuery({
    queryKey: imageKeys.detail(id),
    queryFn: () => imagesApi.get(id),
    enabled: !!id,
  });
}

export function useDeleteImage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => imagesApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: imageKeys.list() }),
  });
}

export function useUpdateImage(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Image>) => imagesApi.update(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: imageKeys.list() });
      qc.invalidateQueries({ queryKey: imageKeys.detail(id) });
    },
  });
}
