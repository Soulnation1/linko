import { cn } from "@/lib/utils";

export type StatusBadgeStatus =
  | "live"
  | "sold-out"
  | "new"
  | "sent-to-whatsapp"
  | "completed";

const STATUS_CONFIG: Record<
  StatusBadgeStatus,
  { label: string; className: string }
> = {
  live: { label: "Live", className: "bg-green-50 text-green-700" },
  "sold-out": { label: "Sold out", className: "bg-amber-50 text-amber-800" },
  new: { label: "New", className: "bg-indigo-50 text-indigo-700" },
  "sent-to-whatsapp": {
    label: "Sent to WhatsApp",
    className: "bg-sky-50 text-sky-800",
  },
  completed: { label: "Completed", className: "bg-slate-100 text-slate-700" },
};

export function StatusBadge({
  status,
  className,
}: {
  status: StatusBadgeStatus;
  className?: string;
}) {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={cn(
        "inline-flex min-h-6 items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}
