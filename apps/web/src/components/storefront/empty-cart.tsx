import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { buttonStyles, Card } from '@/components/ui';

export function EmptyCart() {
  return (
    <Card className="px-6 py-12 text-center">
      <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[var(--bg-element)] text-theme-secondary">
        <ShoppingBag className="size-6" aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-base font-bold text-theme-primary">
        Your cart is waiting
      </h2>
      <p className="mx-auto mt-1.5 max-w-xs text-[13px] leading-relaxed text-theme-secondary">
        Browse the storefront and add something you would like to order.
      </p>
      <Link
        href="/cart"
        className={buttonStyles({ className: 'mt-5 px-5' })}
      >
        Browse the storefront
      </Link>
    </Card>
  );
}
