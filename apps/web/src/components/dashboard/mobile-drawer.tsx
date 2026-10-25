"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { useRef, type RefObject } from "react";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { useModalBehavior } from "@/hooks/use-modal-behavior";
import { MOCK_BUSINESS } from "@/lib/mock-data";
import { BusinessIdentity } from "./business-identity";
import { DashboardNav } from "./dashboard-nav";
import { LogoutButton } from "./logout-button";

export function MobileDrawer({
  open,
  onClose,
  triggerRef,
}: {
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}) {
  const drawerRef = useRef<HTMLElement>(null);
  const mounted = useIsMounted();
  const reduceMotion = useReducedMotion();

  useModalBehavior({
    active: open && mounted,
    containerRef: drawerRef,
    onClose,
    returnFocusRef: triggerRef,
  });

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.button
            type="button"
            aria-label="Close navigation menu"
            className="absolute inset-0 bg-slate-950/50"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            ref={drawerRef}
            id="business-mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Business navigation"
            tabIndex={-1}
            className="absolute inset-y-0 left-0 flex w-[min(85vw,320px)] flex-col bg-white pb-[env(safe-area-inset-bottom)] shadow-2xl"
            initial={reduceMotion ? false : { x: "-100%" }}
            animate={{ x: 0 }}
            exit={reduceMotion ? undefined : { x: "-100%" }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
          >
            <div className="flex min-h-20 items-center justify-between border-b border-slate-100 px-5">
              <BusinessIdentity business={MOCK_BUSINESS} />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className="flex size-11 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-5">
              <DashboardNav business={MOCK_BUSINESS} onNavigate={onClose} />
            </div>
            <div className="border-t border-slate-100 p-3">
              <LogoutButton />
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
