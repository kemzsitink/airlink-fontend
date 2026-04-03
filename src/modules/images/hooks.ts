"use client";

import { useState, useEffect } from "react";
import { imagesApi } from "./api";
import { MOCK_IMAGES } from "./types";
import type { Image } from "./types";

export function useImages() {
  const [images, setImages] = useState<Image[]>(MOCK_IMAGES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    imagesApi
      .list()
      .then(setImages)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { images, loading };
}

export function useImage(id: number) {
  const [image, setImage] = useState<Image | null>(
    MOCK_IMAGES.find((i) => i.id === id) ?? null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    imagesApi
      .get(id)
      .then(setImage)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  return { image, loading };
}
