import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { FIELD_STYLES } from "./input";

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(FIELD_STYLES, "resize-y py-2.5", className)}
      {...props}
    />
  );
}
