import { AlertCircle } from 'lucide-react';

export function ReviewNotice() {
  return (
    <div
      role="note"
      className="flex items-start gap-2.5 rounded-xl border border-[var(--accent-warning)] bg-[var(--bg-surface)] p-3.5 text-theme-primary shadow-elevation-1"
    >
      <AlertCircle
        className="mt-0.5 size-4 shrink-0 text-[var(--accent-warning)]"
        aria-hidden="true"
      />
      <span>
        Make sure everything looks right. You can edit your cart or add a note for the business before continuing.
      </span>
    </div>
  );
}
