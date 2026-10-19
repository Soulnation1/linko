"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createPortal } from "react-dom";
import { useId, useRef, type ReactNode } from "react";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { useModalBehavior } from "@/hooks/use-modal-behavior";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  describedBy?: string;
  children: ReactNode;
  className?: string;
};

export function AccessibleDialog({
  open,
  onClose,
  labelledBy,
  describedBy,
  children,
  className = "",
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const mounted = useIsMounted();

  useModalBehavior({
    active: open && mounted,
    containerRef: dialogRef,
    onClose,
  });

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/55 p-4"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            aria-describedby={describedBy}
            tabIndex={-1}
            className={className}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              reduceMotion
                ? undefined
                : { opacity: 0, scale: 0.98, y: 4 }
            }
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export function useDialogIds() {
  const id = useId();
  return {
    titleId: `${id}-title`,
    descriptionId: `${id}-description`,
  };
}
