"use client";

import { Bell, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import type { RefObject } from "react";
import { toast } from "sonner";
import { IconButton } from "@/components/ui";
import { getTerms } from "@/lib/business-config";
import { MOCK_BUSINESS } from "@/lib/mock-data";
import { getDashboardSectionTitle } from "@/lib/nav";
import { AccountMenu } from "./account-menu";
import { PublicLinkPill } from "./public-link-pill";

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
  const title = getDashboardSectionTitle(pathname, getTerms(business));

  return (
    <header className="z-20 shrink-0 border-b border-slate-200 bg-white pt-[env(safe-area-inset-top)]">
      <div className="flex min-h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <IconButton
          ref={menuButtonRef}
          label="Open navigation menu"
          onClick={onMenuClick}
          aria-expanded={drawerOpen}
          aria-controls="business-mobile-drawer"
          className="lg:hidden"
        >
          <Menu className="size-5" aria-hidden="true" />
        </IconButton>

        <h1 className="hidden min-w-0 flex-1 truncate text-base font-semibold text-slate-900 lg:block">
          {title}
        </h1>
        <p className="min-w-0 flex-1 truncate text-sm font-bold text-slate-900 lg:hidden">
          {business.name}
        </p>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <PublicLinkPill slug={business.slug} />
          <IconButton
            label="Notifications"
            onClick={() =>
              toast.info("Notifications will be available in a future update.")
            }
          >
            <Bell className="size-5" aria-hidden="true" />
          </IconButton>
          <AccountMenu business={business} />
        </div>

        <div className="ml-auto lg:hidden">
          <AccountMenu business={business} compact />
        </div>
      </div>
    </header>
  );
}
