"use client";

import { useRef, useState, type ReactNode } from "react";
import { useEffect } from "react";
import { OfflineBanner } from "@/components/shared";
import { MobileDrawer } from "./mobile-drawer";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export function DashboardShell({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const closeDrawerOnDesktop = () => {
      if (desktopQuery.matches) setDrawerOpen(false);
    };

    desktopQuery.addEventListener("change", closeDrawerOnDesktop);
    return () => {
      desktopQuery.removeEventListener("change", closeDrawerOnDesktop);
    };
  }, []);

  return (
    <div className="flex h-dvh overflow-hidden bg-[#F7F8FA]">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar
          onMenuClick={() => setDrawerOpen(true)}
          menuButtonRef={menuButtonRef}
          drawerOpen={drawerOpen}
        />
        <OfflineBanner />
        <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="mx-auto w-full max-w-5xl px-4 py-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:px-6 sm:py-8 lg:px-8">
            {children}
          </div>
        </main>
      </div>
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        triggerRef={menuButtonRef}
      />
    </div>
  );
}
