import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-elevation-1",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  title,
  description,
  action,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 border-b border-[var(--border-subtle)] px-4 py-3",
        className,
      )}
    >
      <div className="min-w-0">
        <h2 className="text-[13px] font-bold text-theme-primary">{title}</h2>
        {description && (
          <p className="mt-0.5 text-[11px] text-theme-secondary">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
