import { Search, X } from "lucide-react";
import { useId } from "react";
import { Input } from "@/components/ui";

export type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
};

export function SearchInput({
  value,
  onChange,
  placeholder = "Search",
  label = "Search",
  className = "",
}: SearchInputProps) {
  const inputId = useId();
  return (
    <div className={`relative ${className}`}>
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <Search
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400"
        aria-hidden="true"
      />
      <Input
        id={inputId}
        type="search"
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
        placeholder={placeholder}
        className="pr-10 pl-10"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute top-1/2 right-1 flex size-9 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
