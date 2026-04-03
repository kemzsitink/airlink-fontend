"use client";

import { useState, useEffect } from "react";
import { serversApi } from "./api";
import { MOCK_SERVERS, MOCK_BACKUPS, MOCK_STARTUP, MOCK_FILES } from "./types";
import type { Server, Backup, StartupVariable, FileEntry } from "./types";

export function useServers() {
  const [servers, setServers] = useState<Server[]>(MOCK_SERVERS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    serversApi
      .list()
      .then(setServers)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { servers, loading };
}

export function useServer(uuid: string) {
  const [server, setServer] = useState<Server | null>(
    MOCK_SERVERS.find((s) => s.UUID === uuid) ?? null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!uuid) return;
    setLoading(true);
    serversApi
      .get(uuid)
      .then(setServer)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [uuid]);

  return { server, loading };
}

export function useBackups(uuid: string) {
  const [backups, setBackups] = useState<Backup[]>(MOCK_BACKUPS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    serversApi
      .listBackups(uuid)
      .then(setBackups)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [uuid]);

  return { backups, loading };
}

export function useStartup(uuid: string) {
  const [startup, setStartup] = useState(MOCK_STARTUP);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    serversApi
      .getStartup(uuid)
      .then(setStartup)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [uuid]);

  return { startup, loading };
}

export function useFiles(uuid: string, path?: string) {
  const [files, setFiles] = useState<FileEntry[]>(MOCK_FILES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    serversApi
      .listFiles(uuid, path)
      .then(setFiles)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [uuid, path]);

  return { files, loading };
}
