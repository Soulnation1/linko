"use client";

import { LogOut } from "lucide-react";
import { useSignOut } from "@/hooks/use-sign-out";

export function LogoutButton() {
  const signOut = useSignOut();

  return (
    <button
      type="button"
      onClick={signOut}
      className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    >
      <LogOut className="size-4" aria-hidden="true" />
      Log out
    </button>
  );
}
