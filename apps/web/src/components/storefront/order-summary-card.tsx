import { Card, CardHeader } from '@/components/ui';
import { formatItemCount, formatPrice } from '@/lib/format';
import type { MenuItem } from '@/types';

export function OrderSummaryCard({
  items,
  itemCount,
  subtotal,
}: {
  items: Array<{ item: MenuItem; quantity: number }>;
  itemCount: number;
  subtotal: number;
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader title="Order summary" description={formatItemCount(itemCount)} />
      <ul className="divide-y divide-[var(--border-subtle)] px-4">
        {items.map(({ item, quantity }) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-3 py-3.5"
          >
            <div className="min-w-0">
              <p className="truncate text-[13px] font-medium text-theme-primary">
                {item.name}
              </p>
              <p className="mt-0.5 text-[11px] text-theme-secondary">
                Quantity {quantity} · {formatPrice(item.price)} each
              </p>
            </div>
            <span className="shrink-0 font-mono text-[12px] font-bold text-theme-primary">
              {formatPrice(item.price * quantity)}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between border-t border-[var(--border-subtle)] bg-[var(--bg-base)] px-4 py-3.5">
        <span className="text-[13px] font-semibold text-theme-primary">Subtotal</span>
        <span className="font-mono text-[14px] font-bold text-theme-primary">
          {formatPrice(subtotal)}
        </span>
      </div>
    </Card>
  );
}
