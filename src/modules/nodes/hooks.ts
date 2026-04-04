"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { nodesApi } from "./api";
import type { CreateNodePayload } from "./types";

export const nodeKeys = {
  all: ["nodes"] as const,
  list: () => [...nodeKeys.all, "list"] as const,
  detail: (id: number) => [...nodeKeys.all, id] as const,
};

export function useNodes() {
  return useQuery({ queryKey: nodeKeys.list(), queryFn: nodesApi.list });
}

export function useNode(id: number) {
  return useQuery({
    queryKey: nodeKeys.detail(id),
    queryFn: () => nodesApi.get(id),
    enabled: !!id,
  });
}

export function useCreateNode() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateNodePayload) => nodesApi.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: nodeKeys.list() }),
  });
}

export function useDeleteNode() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, deleteInstances }: { id: number; deleteInstances?: boolean }) =>
      nodesApi.delete(id, deleteInstances),
    onSuccess: () => qc.invalidateQueries({ queryKey: nodeKeys.list() }),
  });
}

export function useUpdateNode(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<CreateNodePayload>) => nodesApi.update(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: nodeKeys.list() });
      qc.invalidateQueries({ queryKey: nodeKeys.detail(id) });
    },
  });
}
