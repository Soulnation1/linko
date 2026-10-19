import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type IconButtonProps = Omit<ComponentProps<"button">, "aria-label"> & {
  label: string;
};

export function IconButton({
  label,
  className,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cn(
        "flex size-11 shrink-0 items-center justify-center rounded-lg text-theme-secondary transition-colors hover:bg-[var(--bg-element)] hover:text-theme-primary",
        className,
      )}
      {...props}
    />
  );
}
