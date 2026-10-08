"use client";

import { Plus, Trash2 } from "lucide-react";

export type EditableOption = {
  id: string;
  label: string;
  price?: number | null;
  durationMinutes?: number | null;
};

export type OptionsEditorProps = {
  value: EditableOption[];
  onChange: (options: EditableOption[]) => void;
  showPrice?: boolean;
  showDuration?: boolean;
  priceOptional?: boolean;
  label?: string;
};

function createOption(): EditableOption {
  return {
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
    label: "",
    price: null,
    durationMinutes: null,
  };
}

export function OptionsEditor({
  value,
  onChange,
  showPrice = true,
  showDuration = false,
  priceOptional = false,
  label = "Options",
}: OptionsEditorProps) {
  const update = (index: number, patch: Partial<EditableOption>) => {
    onChange(value.map((option, row) => (row === index ? { ...option, ...patch } : option)));
  };

  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold text-slate-900">{label}</legend>
      {value.map((option, index) => (
        <div
          key={option.id}
          className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-3 sm:flex-row sm:items-center"
        >
          <label className="sr-only" htmlFor={`${option.id}-label`}>
            Option {index + 1} name
          </label>
          <input
            id={`${option.id}-label`}
            value={option.label}
            onChange={(event) => update(index, { label: event.currentTarget.value })}
            placeholder="Option name"
            className="min-h-11 min-w-0 flex-1 rounded-md border border-slate-200 px-3 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          {showPrice && (
            <>
              <label className="sr-only" htmlFor={`${option.id}-price`}>
                Option {index + 1} price
              </label>
              <input
                id={`${option.id}-price`}
                type="number"
                min="0"
                step="1"
                value={option.price ?? ""}
                onChange={(event) =>
                  update(index, {
                    price:
                      event.currentTarget.value === ""
                        ? null
                        : Number(event.currentTarget.value),
                  })
                }
                placeholder={priceOptional ? "Price (optional)" : "Price"}
                className="min-h-11 min-w-0 rounded-md border border-slate-200 px-3 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:w-40"
              />
            </>
          )}
          {showDuration && (
            <>
              <label className="sr-only" htmlFor={`${option.id}-duration`}>
                Option {index + 1} duration in minutes
              </label>
              <input
                id={`${option.id}-duration`}
                type="number"
                min="0"
                step="1"
                value={option.durationMinutes ?? ""}
                onChange={(event) =>
                  update(index, {
                    durationMinutes:
                      event.currentTarget.value === ""
                        ? null
                        : Number(event.currentTarget.value),
                  })
                }
                placeholder="Duration (min)"
                className="min-h-11 min-w-0 rounded-md border border-slate-200 px-3 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:w-40"
              />
            </>
          )}
          <button
            type="button"
            onClick={() => onChange(value.filter((_, row) => row !== index))}
            aria-label={`Remove option ${index + 1}`}
            className="flex min-h-11 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium text-red-700 hover:bg-red-50"
          >
            <Trash2 className="size-4" aria-hidden="true" />
            <span className="sm:sr-only">Remove</span>
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...value, createOption()])}
        className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-50"
      >
        <Plus className="size-4" aria-hidden="true" />
        Add option
      </button>
    </fieldset>
  );
}
