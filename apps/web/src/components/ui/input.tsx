import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const FIELD_STYLES =
  "w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 text-sm text-theme-primary placeholder:text-theme-secondary focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 disabled:cursor-not-allowed disabled:opacity-60 aria-[invalid=true]:border-[var(--accent-error)]";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(FIELD_STYLES, "min-h-11", className)} {...props} />;
}
