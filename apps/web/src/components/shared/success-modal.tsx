"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useEffect } from "react";
import { AccessibleDialog, useDialogIds } from "./dialog";
import {
  useSuccessModalStore,
  type ModalAction,
} from "./success-modal-store";

function ModalActionButton({
  action,
  primary,
  onActivate,
}: {
  action: ModalAction;
  primary?: boolean;
  onActivate: () => void;
}) {
  const className = primary
    ? "flex min-h-11 w-full items-center justify-center rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus-visible:outline-indigo-600"
    : "flex min-h-11 w-full items-center justify-center rounded-lg px-4 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 focus-visible:outline-indigo-600";

  if (action.href) {
    return (
      <Link
        href={action.href}
        onClick={() => {
          onActivate();
          action.onClick?.();
        }}
        className={className}
      >
        {action.label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onActivate();
        action.onClick?.();
      }}
    >
      {action.label}
    </button>
  );
}

export function SuccessModalHost() {
  const options = useSuccessModalStore((state) => state.options);
  const close = useSuccessModalStore((state) => state.close);
  const { titleId, descriptionId } = useDialogIds();

  useEffect(() => {
    if (!options?.autoCloseMs) return;
    const timeout = window.setTimeout(close, options.autoCloseMs);
    return () => window.clearTimeout(timeout);
  }, [close, options]);

  return (
    <AccessibleDialog
      open={Boolean(options)}
      onClose={close}
      labelledBy={titleId}
      describedBy={options?.message ? descriptionId : undefined}
      className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl sm:p-8"
    >
      {options && (
        <div className="text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-green-50 text-green-700">
            <Check className="size-7" strokeWidth={2.5} aria-hidden="true" />
          </span>
          <h2
            id={titleId}
            className="mt-4 text-xl font-bold tracking-tight text-slate-900"
          >
            {options.title}
          </h2>
          {options.message && (
            <p
              id={descriptionId}
              className="mt-2 text-sm leading-6 text-slate-600"
            >
              {options.message}
            </p>
          )}
          <div className="mt-6 space-y-1">
            <ModalActionButton
              action={options.primaryAction}
              primary
              onActivate={close}
            />
            {options.secondaryAction && (
              <ModalActionButton
                action={options.secondaryAction}
                onActivate={close}
              />
            )}
          </div>
        </div>
      )}
    </AccessibleDialog>
  );
}
