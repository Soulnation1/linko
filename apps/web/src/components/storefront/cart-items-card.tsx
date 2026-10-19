import { Trash2 } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui';
import { formatItemCount, formatPrice } from '@/lib/format';
import type { MenuItem } from '@/types';
import { ItemThumb } from './item-thumb';
import { CartQuantityControl } from './quantity-controls';

type CartEntry = { item: MenuItem; quantity: number };

function CartLineItem({
  item,
  quantity,
  onQuantityChange,
}: CartEntry & { onQuantityChange: (delta: number) => void }) {
  return (
    <li className="flex items-center gap-3.5 px-4 py-4">
      <ItemThumb />
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-[13px] font-semibold text-theme-primary">
          {item.name}
        </h3>
        <p className="mt-1 font-mono text-[12px] font-semibold text-theme-secondary">
          {formatPrice(item.price)}{' '}
          <span className="font-sans font-normal">each</span>
        </p>
      </div>
      <CartQuantityControl
        itemName={item.name}
        quantity={quantity}
        onChange={onQuantityChange}
      />
      <span className="hidden w-24 text-right font-mono text-[12px] font-bold text-theme-primary sm:block">
        {formatPrice(item.price * quantity)}
      </span>
    </li>
  );
}

export function CartItemsCard({
  items,
  itemCount,
  onQuantityChange,
  onClear,
}: {
  items: CartEntry[];
  itemCount: number;
  onQuantityChange: (itemId: string, delta: number) => void;
  onClear: () => void;
}) {
  return (
    <Card aria-label="Items in your cart" className="overflow-hidden">
      <CardHeader
        title="Items selected"
        action={
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[var(--bg-element)] px-2.5 py-1 text-[11px] font-semibold text-theme-secondary">
              {formatItemCount(itemCount)}
            </span>
            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-theme-secondary transition-colors hover:text-theme-primary"
              aria-label="Clear all items from your cart"
            >
              <Trash2 className="size-3.5" aria-hidden="true" />
              Clear
            </button>
          </div>
        }
      />
      <ul className="divide-y divide-[var(--border-subtle)]">
        {items.map(({ item, quantity }) => (
          <CartLineItem
            key={item.id}
            item={item}
            quantity={quantity}
            onQuantityChange={(delta) => onQuantityChange(item.id, delta)}
          />
        ))}
      </ul>
    </Card>
  );
}
