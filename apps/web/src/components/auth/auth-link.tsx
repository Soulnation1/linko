import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function AuthLink({ className, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "font-semibold text-theme-accent underline-offset-2 hover:underline",
        className,
      )}
      {...props}
    />
  );
}
