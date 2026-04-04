"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { serversApi } from "./api";

export const serverKeys = {
  all: ["servers"] as const,
  list: () => [...serverKeys.all, "list"] as const,
  detail: (uuid: string) => [...serverKeys.all, uuid] as const,
  backups: (uuid: string) => [...serverKeys.all, uuid, "backups"] as const,
  startup: (uuid: string) => [...serverKeys.all, uuid, "startup"] as const,
  files: (uuid: string, path?: string) => [...serverKeys.all, uuid, "files", path ?? "/"] as const,
};

export function useServers() {
  return useQuery({ queryKey: serverKeys.list(), queryFn: serversApi.list });
}

export function useServer(uuid: string) {
  return useQuery({
    queryKey: serverKeys.detail(uuid),
    queryFn: () => serversApi.get(uuid),
    enabled: !!uuid,
  });
}

export function useBackups(uuid: string) {
  return useQuery({
    queryKey: serverKeys.backups(uuid),
    queryFn: () => serversApi.listBackups(uuid),
    enabled: !!uuid,
  });
}

export function useStartup(uuid: string) {
  return useQuery({
    queryKey: serverKeys.startup(uuid),
    queryFn: () => serversApi.getStartup(uuid),
    enabled: !!uuid,
  });
}

export function useFiles(uuid: string, path?: string) {
  return useQuery({
    queryKey: serverKeys.files(uuid, path),
    queryFn: () => serversApi.listFiles(uuid, path),
    enabled: !!uuid,
  });
}

export function useCreateBackup(uuid: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => serversApi.createBackup(uuid),
    onSuccess: () => qc.invalidateQueries({ queryKey: serverKeys.backups(uuid) }),
  });
}

export function useDeleteBackup(uuid: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (backupId: number) => serversApi.deleteBackup(uuid, backupId),
    onSuccess: () => qc.invalidateQueries({ queryKey: serverKeys.backups(uuid) }),
  });
}

export function useSaveVariables(uuid: string) {
  return useMutation({
    mutationFn: (variables: Record<string, string>) => serversApi.saveVariables(uuid, variables),
  });
}
