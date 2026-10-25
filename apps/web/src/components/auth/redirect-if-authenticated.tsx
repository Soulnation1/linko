"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";

export const DASHBOARD_PATH = "/dashboard";

// Sends signed-in users away from the login, sign-up and reset screens.
export function RedirectIfAuthenticated() {
  const router = useRouter();
  const status = useAuthStore((state) => state.status);
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (status === "authenticated") router.replace(DASHBOARD_PATH);
  }, [status, router]);

  return null;
}
