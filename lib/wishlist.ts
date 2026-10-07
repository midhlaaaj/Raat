"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

const KEY = "raat-wishlist";
const EVENT = "raat-wishlist-change";

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

function parse(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Add or remove a product id from the wishlist (newest first). */
export function toggleWishlist(productId: string) {
  try {
    const ids = parse(read());
    const next = ids.includes(productId)
      ? ids.filter((id) => id !== productId)
      : [productId, ...ids];
    window.localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    // storage unavailable (private mode, blocked) -- the wishlist just stays empty
  }
}

export function useWishlist() {
  const raw = useSyncExternalStore(subscribe, read, () => "[]");
  const ids = useMemo(() => parse(raw), [raw]);
  const has = useCallback((id: string) => ids.includes(id), [ids]);
  return { ids, has, toggle: toggleWishlist, count: ids.length };
}
