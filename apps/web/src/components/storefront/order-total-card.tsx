import { Card } from '@/components/ui';
import { formatItemCount, formatPrice } from '@/lib/format';

export function OrderTotalCard({
  itemCount,
  subtotal,
}: {
  itemCount: number;
  subtotal: number;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between text-[12px]">
        <span className="text-theme-secondary">{formatItemCount(itemCount)}</span>
        <span className="font-mono font-bold text-theme-primary">
          {formatPrice(subtotal)}
        </span>
      </div>
      <p className="mt-2 text-[11px] text-theme-secondary">
        Final availability, delivery, and payment details are confirmed with the
        business.
      </p>
    </Card>
  );
}
