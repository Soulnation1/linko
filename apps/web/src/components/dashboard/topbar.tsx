"use client";

import { Bell, ChevronDown, Copy, ExternalLink, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type RefObject } from "react";
import { toast } from "sonner";
import { Avatar } from "@/components/ui/avatar";
import { MOCK_BUSINESS } from "@/lib/mock-data";
import { getDashboardSectionTitle } from "@/lib/nav";
import { getTerms } from "@/lib/business-config";

export function Topbar({
  onMenuClick,
  menuButtonRef,
  drawerOpen,
}: {
  onMenuClick: () => void;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
  drawerOpen: boolean;
}) {
  const pathname = usePathname();
  const business = MOCK_BUSINESS;
  const terms = getTerms(business);
  const title = getDashboardSectionTitle(pathname, terms);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const publicUrl = () =>
    `${window.location.origin}/${business.slug}/cart-preview`;

  const copyPublicLink = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl());
      toast.success("Business link copied");
    } catch {
      toast.error("Could not copy the business link. Please copy it from the address bar.");
    }
  };

  const previewPublicPage = () => {
    window.open(publicUrl(), "_blank", "noopener,noreferrer");
  };

  return (
    <header className="z-20 shrink-0 border-b border-slate-200 bg-white pt-[env(safe-area-inset-top)]">
      <div className="flex min-h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          ref={menuButtonRef}
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          aria-expanded={drawerOpen}
          aria-controls="business-mobile-drawer"
          className="flex size-11 shrink-0 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 focus-visible:outline-indigo-600 lg:hidden"
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>

        <h1 className="hidden min-w-0 flex-1 truncate text-base font-semibold text-slate-900 lg:block">
          {title}
        </h1>
        <div className="min-w-0 flex-1 truncate lg:hidden">
          <p className="truncate text-sm font-bold text-slate-900">
            {business.name}
          </p>
        </div>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <div className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3">
            <span className="max-w-44 truncate text-xs font-medium text-slate-600">
              /{business.slug}
            </span>
            <button
              type="button"
              onClick={copyPublicLink}
              aria-label="Copy public business link"
              className="flex size-8 items-center justify-center rounded-md text-slate-600 hover:bg-white hover:text-indigo-700"
            >
              <Copy className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={previewPublicPage}
              aria-label="Preview public business page"
              className="flex size-8 items-center justify-center rounded-md text-slate-600 hover:bg-white hover:text-indigo-700"
            >
              <ExternalLink className="size-4" aria-hidden="true" />
            </button>
          </div>
          <button
            type="button"
            onClick={() =>
              toast.info("Notifications will be available in a future update.")
            }
            aria-label="Notifications"
            className="flex size-11 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
          >
            <Bell className="size-5" aria-hidden="true" />
          </button>
          <AccountMenu
            open={accountMenuOpen}
            onToggle={() => setAccountMenuOpen((open) => !open)}
            onClose={() => setAccountMenuOpen(false)}
          />
        </div>

        <div className="ml-auto lg:hidden">
          <AccountMenu
            open={accountMenuOpen}
            onToggle={() => setAccountMenuOpen((open) => !open)}
            onClose={() => setAccountMenuOpen(false)}
            compact
          />
        </div>
      </div>
    </header>
  );
}

function AccountMenu({
  open,
  onToggle,
  onClose,
  compact = false,
}: {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  compact?: boolean;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={onToggle}
        aria-label="Account menu"
        aria-expanded={open}
        aria-controls={menuId}
        className={`flex min-h-11 items-center gap-2 rounded-lg p-1.5 hover:bg-slate-100 ${
          compact ? "size-11 justify-center" : ""
        }`}
      >
        <Avatar
          name={MOCK_BUSINESS.name}
          src={MOCK_BUSINESS.logoUrl}
          accentColor={MOCK_BUSINESS.accentColor ?? "#4F46E5"}
          size={32}
          className="rounded-full"
        />
        {!compact && (
          <>
            <span className="max-w-32 truncate text-sm font-medium text-slate-700">
              {MOCK_BUSINESS.name}
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
            onClick={onClose}
          />
          <div
            id={menuId}
            aria-label="Account options"
            className="absolute top-full right-0 z-40 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg"
          >
            <Link
              href="/dashboard/settings/profile"
              onClick={onClose}
              className="flex min-h-11 items-center rounded-lg px-3 text-sm text-slate-700 hover:bg-slate-50"
            >
              Profile
            </Link>
            <Link
              href="/dashboard/settings/help"
              onClick={onClose}
              className="flex min-h-11 items-center rounded-lg px-3 text-sm text-slate-700 hover:bg-slate-50"
            >
              Help
            </Link>
            <button
              type="button"
              onClick={() => {
                onClose();
                toast.info("Sign out will be available when authentication is added.");
              }}
              className="flex min-h-11 w-full items-center rounded-lg px-3 text-left text-sm text-slate-700 hover:bg-slate-50"
            >
              Log out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
