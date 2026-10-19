"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// False during SSR and hydration, true on the client afterwards.
export function useIsMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
