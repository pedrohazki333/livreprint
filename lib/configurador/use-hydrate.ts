"use client";

import { useSyncExternalStore } from "react";
import { useConfiguradorStore } from "./store";

if (typeof window !== "undefined") {
  useConfiguradorStore.persist.rehydrate();
}

/** Reidrata o store do sessionStorage no cliente (persist com skipHydration). */
export function useHydrateConfigurador() {
  return useSyncExternalStore(
    (callback) => useConfiguradorStore.persist.onFinishHydration(callback),
    () => useConfiguradorStore.persist.hasHydrated(),
    () => false,
  );
}
