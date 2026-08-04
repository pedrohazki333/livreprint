"use client";

import { useSyncExternalStore } from "react";
import { useCarrinhoStore } from "./store";

if (typeof window !== "undefined") {
  useCarrinhoStore.persist.rehydrate();
}

/** Reidrata o carrinho do sessionStorage no cliente (persist com skipHydration). */
export function useHydrateCarrinho() {
  return useSyncExternalStore(
    (callback) => useCarrinhoStore.persist.onFinishHydration(callback),
    () => useCarrinhoStore.persist.hasHydrated(),
    () => false,
  );
}
