"use client";

import { useSyncExternalStore } from "react";

const KEY = "fp:saved";
const listeners = new Set<() => void>();

function read(): string {
  try {
    return localStorage.getItem(KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

export function useSaved() {
  const raw = useSyncExternalStore(subscribe, read, () => "[]");
  let ids: string[] = [];
  try {
    ids = JSON.parse(raw);
  } catch {}

  const toggle = (id: string) => {
    const next = ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id];
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
    listeners.forEach((l) => l());
  };

  return { ids, has: (id: string) => ids.includes(id), toggle };
}
