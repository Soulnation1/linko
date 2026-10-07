'use client';

import Link from 'next/link';
import { AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { CustomerFrame, EmptyCart, formatPrice } from '@/components/storefront/customer-frame';
import { useCart } from '@/components/storefront/cart-provider';

export default function CartPreviewPage() {
  const { items, itemCount, subtotal, hydrated, customerNote, setCustomerNote } =
    useCart();

  return (
    <CustomerFrame
      title="Review your order"
      description={
        <div
          role="note"
          className="flex items-start gap-2.5 rounded-xl border border-[var(--accent-warning)] bg-[var(--bg-surface)] p-3.5 text-theme-primary shadow-elevation-1"
        >
          <AlertCircle
            className="mt-0.5 size-4 shrink-0 text-[var(--accent-warning)]"
            aria-hidden="true"
          />
          <span>
            Make sure everything looks right. You can add delivery details with
            the additional note or on WhatsApp.
          </span>
        </div>
      }
      step={2}
    >
      {!hydrated ? (
        <div
          role="status"
          className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 text-sm text-theme-secondary"
        >
          Restoring your cart…
        </div>
      ) : itemCount === 0 ? (
        <EmptyCart />
      ) : (
        <div className="space-y-4">
          <section className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-elevation-1">
            <div className="border-b border-[var(--border-subtle)] px-4 py-3">
              <h2 className="text-[13px] font-bold text-theme-primary">
                Order summary
              </h2>
              <p className="mt-0.5 text-[11px] text-theme-secondary">
                {itemCount} item{itemCount === 1 ? '' : 's'}
              </p>
            </div>
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
              <span className="text-[13px] font-semibold text-theme-primary">
                Subtotal
              </span>
              <span className="font-mono text-[14px] font-bold text-theme-primary">
                {formatPrice(subtotal)}
              </span>
            </div>
          </section>

          <label
            htmlFor="customer-note"
            className="block rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 shadow-elevation-1"
          >
            <span className="block text-[13px] font-semibold text-theme-primary">
              Note for the business
              <span className="ml-1 font-normal text-theme-secondary">
                (optional)
              </span>
            </span>
            <span className="mt-1 block text-[11px] text-theme-secondary">
              Add preferences or a short message to include with your WhatsApp order.
            </span>
            <textarea
              id="customer-note"
              value={customerNote}
              onChange={(event) => setCustomerNote(event.target.value)}
              maxLength={300}
              rows={3}
              placeholder="For example: i want it deleivered tonight."
              className="mt-3 block w-full resize-y rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-base)] px-3 py-2.5 text-[13px] text-theme-primary placeholder:text-theme-secondary focus-visible:outline-none"
            />
            <span className="mt-1 block text-right text-[10px] text-theme-secondary">
              {customerNote.length}/300
            </span>
          </label>

         

          <div className="grid grid-cols-[auto_1fr] gap-3">
            <Link
              href="/cart-list"
              className="flex min-h-12 items-center justify-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 text-[13px] font-semibold text-theme-primary transition-colors hover:bg-[var(--bg-element)]"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Edit cart
            </Link>
            <Link
              href="/complete-order"
              className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#4F46E5] px-4 text-[13px] font-semibold text-white shadow-elevation-2 transition-colors hover:bg-[#4338CA]"
            >
              Continue <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </CustomerFrame>
  );
}
