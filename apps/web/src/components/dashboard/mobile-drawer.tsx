"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LogOut, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useRef, useSyncExternalStore, type RefObject } from "react";
import { toast } from "sonner";
import { MOCK_BUSINESS } from "@/lib/mock-data";
import { BusinessIdentity } from "./business-identity";
import { DashboardNav } from "./dashboard-nav";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';
const subscribeToMount = () => () => {};
const getMountedSnapshot = () => true;
const getServerMountedSnapshot = () => false;

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
  const onCloseRef = useRef(onClose);
  const mounted = useSyncExternalStore(
    subscribeToMount,
    getMountedSnapshot,
    getServerMountedSnapshot,
  );
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open || !mounted) return;
    const triggerElement = triggerRef.current;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFirst = () => {
      const first = drawerRef.current?.querySelector<HTMLElement>(
        FOCUSABLE_SELECTOR,
      );
      first?.focus();
    };
    const frame = window.requestAnimationFrame(focusFirst);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !drawerRef.current) return;

      const focusable = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => element.offsetParent !== null);
      if (focusable.length === 0) {
        event.preventDefault();
        drawerRef.current.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const onFocusIn = (event: FocusEvent) => {
      if (
        drawerRef.current &&
        event.target instanceof Node &&
        !drawerRef.current.contains(event.target)
      ) {
        focusFirst();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn);
      document.body.style.overflow = oldOverflow;
      if (triggerElement?.isConnected) triggerElement.focus();
    };
  }, [mounted, open, triggerRef]);

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
              <button
                type="button"
                onClick={() =>
                  toast.info("Sign out will be available when authentication is added.")
                }
                className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                <LogOut className="size-4" aria-hidden="true" />
                Log out
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
