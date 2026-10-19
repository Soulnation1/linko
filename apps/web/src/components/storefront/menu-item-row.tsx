import { formatPrice } from '@/lib/format';
import type { MenuItem } from '@/types';
import { ItemThumb } from './item-thumb';
import { MenuQuantityControl } from './quantity-controls';

export function MenuItemRow({
  item,
  quantity,
  onQuantityChange,
}: {
  item: MenuItem;
  quantity: number;
  onQuantityChange: (delta: number) => void;
}) {
  const isAvailable = item.available;

  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-4xl p-4 shadow-sm transition-all ${
        isAvailable
          ? 'border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--accent-indigo)]'
          : 'transition-opacity duration-300 hover:opacity-30'
      }`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3.5">
        <ItemThumb />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-medium text-theme-primary">
            {item.name}
          </h3>
          <div className="mt-0.5 flex items-center gap-2">
            <span
              className={`font-mono text-xs font-bold ${
                isAvailable
                  ? 'text-theme-primary'
                  : 'text-theme-secondary line-through'
              }`}
            >
              {formatPrice(item.price)}
            </span>
            {!isAvailable && (
              <span className="badge-error inline-flex rounded-full px-2 py-0.5 text-[10.5px] font-bold">
                <span
                  aria-hidden="true"
                  className="mr-1 inline-block size-1.5 rounded-full bg-theme-error"
                />
                Sold out
              </span>
            )}
          </div>
        </div>
      </div>

      {isAvailable && (
        <MenuQuantityControl quantity={quantity} onChange={onQuantityChange} />
      )}
    </div>
  );
}
