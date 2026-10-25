"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth-store";

export function useSignOut() {
  const router = useRouter();
  const signOut = useAuthStore((state) => state.signOut);

  return async () => {
    try {
      await signOut();
      router.replace("/login");
    } catch {
      toast.error("Could not log you out. Please try again.");
    }
  };
}
