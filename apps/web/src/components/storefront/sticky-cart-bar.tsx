import Link from 'next/link';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { formatItemCount, formatPrice } from '@/lib/format';

export function StickyCartBar({
  itemCount,
  subtotal,
}: {
  itemCount: number;
  subtotal: number;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border-subtle)] bg-[var(--bg-header)] px-4 pt-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] backdrop-blur-xl">
      <Link
        href="/cart-list"
        className="mx-auto flex w-full max-w-md items-center justify-between rounded-xl bg-[#4F46E5] px-4 py-3.5 text-white shadow-elevation-2 transition-colors hover:bg-[#4338CA]"
      >
        <span className="flex min-w-0 items-center gap-2.5">
          <span className="relative flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/15">
            <ShoppingBag className="size-4.5" aria-hidden="true" />
            <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-[#4338CA]">
              {itemCount}
            </span>
          </span>
          <span className="min-w-0">
            <span className="block text-[13px] font-semibold">Review your order</span>
            <span className="block text-[11px] text-white/80">
              {formatItemCount(itemCount)} · {formatPrice(subtotal)}
            </span>
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-1.5 text-[13px] font-semibold">
          View cart <ArrowRight className="size-4" aria-hidden="true" />
        </span>
      </Link>
    </div>
  );
}
