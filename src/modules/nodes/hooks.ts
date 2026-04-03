"use client";

import { useState, useEffect } from "react";
import { nodesApi } from "./api";
import { MOCK_NODES } from "./types";
import type { Node } from "./types";

export function useNodes() {
  const [nodes, setNodes] = useState<Node[]>(MOCK_NODES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    nodesApi
      .list()
      .then(setNodes)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { nodes, loading };
}

export function useNode(id: number) {
  const [node, setNode] = useState<Node | null>(
    MOCK_NODES.find((n) => n.id === id) ?? null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    nodesApi
      .get(id)
      .then(setNode)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  return { node, loading };
}
