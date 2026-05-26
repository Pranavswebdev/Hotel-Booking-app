"use client";

import { useEffect, useState } from "react";
import { api } from "./api";
import type { Space } from "./data";

type SpacesState = {
  spaces: Space[];
  loading: boolean;
  error: string | null;
};

export function useSpaces(params: { q?: string; category?: string } = {}) {
  const { q, category } = params;
  const [state, setState] = useState<SpacesState>({
    spaces: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const data = await api.getSpaces({ q, category });
        if (active) setState({ spaces: data, loading: false, error: null });
      } catch (e) {
        if (active)
          setState({
            spaces: [],
            loading: false,
            error: e instanceof Error ? e.message : "Failed to load",
          });
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [q, category]);

  return state;
}

type SpaceState = {
  space: Space | null;
  loading: boolean;
  error: string | null;
};

export function useSpace(slug: string) {
  const [state, setState] = useState<SpaceState>({
    space: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const data = await api.getSpace(slug);
        if (active) setState({ space: data, loading: false, error: null });
      } catch (e) {
        if (active)
          setState({
            space: null,
            loading: false,
            error: e instanceof Error ? e.message : "Failed to load",
          });
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [slug]);

  return state;
}
