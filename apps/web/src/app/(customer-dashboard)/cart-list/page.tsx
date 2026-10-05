'use client';

import Link from 'next/link';
import { ArrowRight, Minus, Plus, Trash2 } from 'lucide-react';
import { CustomerFrame, EmptyCart, formatPrice } from '@/components/storefront/customer-frame';
import { useCart } from '@/components/storefront/cart-provider';

export default function CartPage() {
  const { items, itemCount, subtotal, updateQuantity, clearCart, hydrated } =
    useCart();

  return (
    <CustomerFrame
      title="Your cart"
      description="Check your items and adjust quantities before reviewing."
      step={1}
    >
      {!hydrated ? (
        <div role="status" aria-busy="true" className="space-y-4">
          <span className="sr-only">Loading your cart</span>
          <section
            aria-hidden="true"
            className="animate-pulse overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-elevation-1"
          >
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-4 py-3">
              <div className="h-4 w-28 rounded bg-[var(--bg-element)]" />
              <div className="h-5 w-16 rounded-full bg-[var(--bg-element)]" />
            </div>
            {[0, 1].map((row) => (
              <div
                key={row}
                className="flex items-center gap-3.5 border-b border-[var(--border-subtle)] px-4 py-4 last:border-b-0"
              >
                <div className="size-12 shrink-0 rounded-xl bg-[var(--bg-element)]" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 w-2/3 rounded bg-[var(--bg-element)]" />
                  <div className="h-3 w-1/3 rounded bg-[var(--bg-element)]" />
                </div>
                <div className="h-10 w-24 rounded-lg bg-[var(--bg-element)]" />
              </div>
            ))}
          </section>
          <div
            aria-hidden="true"
            className="animate-pulse space-y-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 shadow-elevation-1"
          >
            <div className="flex justify-between">
              <div className="h-3.5 w-16 rounded bg-[var(--bg-element)]" />
              <div className="h-3.5 w-20 rounded bg-[var(--bg-element)]" />
            </div>
            <div className="h-3 w-3/4 rounded bg-[var(--bg-element)]" />
          </div>
          <div aria-hidden="true" className="grid animate-pulse grid-cols-[auto_1fr] gap-3">
            <div className="h-12 w-28 rounded-lg bg-[var(--bg-element)]" />
            <div className="h-12 rounded-lg bg-[var(--bg-element)]" />
          </div>
        </div>
      ) : itemCount === 0 ? (
        <EmptyCart />
      ) : (
        <div className="space-y-4">
          <section
            aria-label="Items in your cart"
            className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-elevation-1"
          >
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-4 py-3">
              <h2 className="text-[13px] font-bold text-theme-primary">
                Items selected
              </h2>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-[var(--bg-element)] px-2.5 py-1 text-[11px] font-semibold text-theme-secondary">
                  {itemCount} item{itemCount === 1 ? '' : 's'}
                </span>
                <button
                  type="button"
                  onClick={clearCart}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-theme-secondary transition-colors hover:text-theme-primary"
                  aria-label="Clear all items from your cart"
                >
                  <Trash2 className="size-3.5" aria-hidden="true" />
                  Clear
                </button>
              </div>
            </div>

            <ul className="divide-y divide-[var(--border-subtle)]">
              {items.map(({ item, quantity }) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3.5 px-4 py-4"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-element)] text-xl">
                    ☕
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-[13px] font-semibold text-theme-primary">
                      {item.name}
                    </h3>
                    <p className="mt-1 font-mono text-[12px] font-semibold text-theme-secondary">
                      {formatPrice(item.price)}{' '}
                      <span className="font-sans font-normal">each</span>
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-base)] p-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      aria-label={`Remove one ${item.name}`}
                      className="flex size-8 items-center justify-center rounded-md text-theme-primary transition-colors hover:bg-[var(--bg-element)] focus-visible:outline-none"
                    >
                      <Minus className="size-3.5" aria-hidden="true" />
                    </button>
                    <span
                      aria-label={`${quantity} ${item.name}`}
                      className="w-6 text-center font-mono text-[12px] font-bold text-theme-primary"
                    >
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      aria-label={`Add one ${item.name}`}
                      className="flex size-8 items-center justify-center rounded-md text-theme-primary transition-colors hover:bg-[var(--bg-element)] focus-visible:outline-none"
                    >
                      <Plus className="size-3.5" aria-hidden="true" />
                    </button>
                  </div>
                  <span className="hidden w-24 text-right font-mono text-[12px] font-bold text-theme-primary sm:block">
                    {formatPrice(item.price * quantity)}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-label="Order subtotal"
            className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 shadow-elevation-1"
          >
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-theme-secondary">Subtotal</span>
              <span className="font-mono font-bold text-theme-primary">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-theme-secondary">
              Any delivery or additional charges will be confirmed by the business.
            </p>
          </section>

          <div className="grid grid-cols-[auto_1fr] gap-3">
            <Link
              href="/cart"
              className="flex min-h-12 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 text-[13px] font-semibold text-theme-primary transition-colors hover:bg-[var(--bg-element)]"
            >
              Add items
            </Link>
            <Link
              href="/cart-preview"
              className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#4F46E5] px-4 text-[13px] font-semibold text-white shadow-elevation-2 transition-colors hover:bg-[#4338CA]"
            >
              Review order <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </CustomerFrame>
  );
}
