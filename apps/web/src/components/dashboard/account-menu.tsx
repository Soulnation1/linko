"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useId, useRef, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { useEscapeKey } from "@/hooks/use-escape-key";
import { useSignOut } from "@/hooks/use-sign-out";
import type { Business } from "@/types";

const MENU_ITEM_CLASS =
  "flex min-h-11 w-full items-center rounded-lg px-3 text-left text-sm text-slate-700 hover:bg-slate-50";

export function AccountMenu({
  business,
  compact = false,
}: {
  business: Business;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const signOut = useSignOut();

  const close = () => setOpen(false);
  useEscapeKey(open, () => {
    close();
    buttonRef.current?.focus();
  });

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Account menu"
        aria-expanded={open}
        aria-controls={menuId}
        className={`flex min-h-11 items-center gap-2 rounded-lg p-1.5 hover:bg-slate-100 ${
          compact ? "size-11 justify-center" : ""
        }`}
      >
        <Avatar
          name={business.name}
          src={business.logoUrl}
          accentColor={business.accentColor ?? "#4F46E5"}
          size={32}
          className="rounded-full"
        />
        {!compact && (
          <>
            <span className="max-w-32 truncate text-sm font-medium text-slate-700">
              {business.name}
            </span>
            <ChevronDown className="size-4 text-slate-500" aria-hidden="true" />
          </>
        )}
      </button>
      {open && (
        <>
          <button
            type="button"
            tabIndex={-1}
            aria-label="Close account menu"
            className="fixed inset-0 z-30 cursor-default"
            onClick={close}
          />
          <div
            id={menuId}
            aria-label="Account options"
            className="absolute top-full right-0 z-40 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg"
          >
            <Link href="/dashboard/settings/profile" onClick={close} className={MENU_ITEM_CLASS}>
              Profile
            </Link>
            <Link href="/dashboard/settings/help" onClick={close} className={MENU_ITEM_CLASS}>
              Help
            </Link>
            <button
              type="button"
              onClick={() => {
                close();
                void signOut();
              }}
              className={MENU_ITEM_CLASS}
            >
              Log out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
