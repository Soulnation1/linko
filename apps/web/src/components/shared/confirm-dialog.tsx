"use client";

import { useDialogIds, AccessibleDialog } from "./dialog";

export type ConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
};

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isDestructive = true,
}: ConfirmDialogProps) {
  const { titleId, descriptionId } = useDialogIds();

  return (
    <AccessibleDialog
      open={open}
      onClose={onClose}
      labelledBy={titleId}
      describedBy={message ? descriptionId : undefined}
      className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl"
    >
      <h2 id={titleId} className="text-lg font-bold text-slate-900">
        {title}
      </h2>
      {message && (
        <p id={descriptionId} className="mt-2 text-sm leading-6 text-slate-600">
          {message}
        </p>
      )}
      <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="min-h-11 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className={`min-h-11 rounded-lg px-4 text-sm font-semibold text-white ${
            isDestructive
              ? "bg-red-600 hover:bg-red-700"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {confirmLabel}
        </button>
      </div>
    </AccessibleDialog>
  );
}
