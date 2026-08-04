"use client";

import { useSyncExternalStore } from "react";
import { useMontagemDtfStore } from "./store";

if (typeof window !== "undefined") {
  useMontagemDtfStore.persist.rehydrate();
}

/** Reidrata a montagem de DTF do sessionStorage no cliente (persist com skipHydration). */
export function useHydrateMontagemDtf() {
  return useSyncExternalStore(
    (callback) => useMontagemDtfStore.persist.onFinishHydration(callback),
    () => useMontagemDtfStore.persist.hasHydrated(),
    () => false,
  );
}
