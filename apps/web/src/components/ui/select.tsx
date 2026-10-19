import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { FIELD_STYLES } from "./input";

export type SelectOption = { value: string; label: string; disabled?: boolean };

export type SelectProps = Omit<ComponentProps<"select">, "children"> & {
  options: SelectOption[];
  placeholder?: string;
};

export function Select({
  options,
  placeholder,
  className,
  ...props
}: SelectProps) {
  return (
    <select className={cn(FIELD_STYLES, "min-h-11", className)} {...props}>
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
