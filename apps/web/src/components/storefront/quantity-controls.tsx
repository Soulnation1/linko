import { Minus, Plus } from 'lucide-react';

// Compact stepper on the menu: the minus and count only appear once the item is in the cart.
export function MenuQuantityControl({
  quantity,
  onChange,
}: {
  quantity: number;
  onChange: (delta: number) => void;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-element)] p-1">
      {quantity > 0 && (
        <>
          <button
            type="button"
            onClick={() => onChange(-1)}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--bg-surface)] text-theme-primary transition-colors hover:bg-[var(--bg-card)]"
            aria-label="Decrease quantity"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-5 text-center font-mono text-xs font-bold text-theme-primary">
            {quantity}
          </span>
        </>
      )}
      <button
        type="button"
        onClick={() => onChange(1)}
        className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#4F46E5] text-white shadow-sm transition-colors hover:bg-[#4338CA]"
        aria-label="Increase quantity"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

// Full stepper used in the cart, labelled per item for screen readers.
export function CartQuantityControl({
  itemName,
  quantity,
  onChange,
}: {
  itemName: string;
  quantity: number;
  onChange: (delta: number) => void;
}) {
  const buttonClass =
    'flex size-8 items-center justify-center rounded-md text-theme-primary transition-colors hover:bg-[var(--bg-element)] focus-visible:outline-none';

  return (
    <div className="flex shrink-0 items-center gap-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-base)] p-1">
      <button
        type="button"
        onClick={() => onChange(-1)}
        aria-label={`Remove one ${itemName}`}
        className={buttonClass}
      >
        <Minus className="size-3.5" aria-hidden="true" />
      </button>
      <span
        aria-label={`${quantity} ${itemName}`}
        className="w-6 text-center font-mono text-[12px] font-bold text-theme-primary"
      >
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(1)}
        aria-label={`Add one ${itemName}`}
        className={buttonClass}
      >
        <Plus className="size-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}
