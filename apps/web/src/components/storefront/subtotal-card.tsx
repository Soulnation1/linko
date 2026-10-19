import { Card } from '@/components/ui';
import { formatPrice } from '@/lib/format';

export function SubtotalCard({ subtotal }: { subtotal: number }) {
  return (
    <Card aria-label="Order subtotal" className="p-4">
      <div className="flex items-center justify-between text-[13px]">
        <span className="text-theme-secondary">Subtotal</span>
        <span className="font-mono font-bold text-theme-primary">
          {formatPrice(subtotal)}
        </span>
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-theme-secondary">
        Any delivery or additional charges will be confirmed by the business.
      </p>
    </Card>
  );
}
