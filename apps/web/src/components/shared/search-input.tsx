import { Search, X } from "lucide-react";
import { useId } from "react";

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
      <input
        id={inputId}
        type="search"
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
        placeholder={placeholder}
        className="min-h-11 w-full rounded-lg border border-slate-200 bg-white pr-10 pl-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
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
