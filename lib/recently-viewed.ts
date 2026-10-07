"use client";

import { useMemo, useSyncExternalStore } from "react";

const KEY = "raat-recently-viewed";
const EVENT = "raat-recently-viewed-change";
const MAX = 8;

function read(): string {
  try {
    return window.localStorage.getItem(KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

/** Remember a product id as most-recently viewed (newest first, de-duplicated). */
export function recordView(productId: string) {
  try {
    const ids = (JSON.parse(read()) as string[]).filter((id) => id !== productId);
    window.localStorage.setItem(KEY, JSON.stringify([productId, ...ids].slice(0, MAX)));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    // storage unavailable (private mode, blocked) -- the section just stays empty
  }
}

export function useRecentlyViewedIds(): string[] {
  const raw = useSyncExternalStore(subscribe, read, () => "[]");
  return useMemo(() => {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [raw]);
}
