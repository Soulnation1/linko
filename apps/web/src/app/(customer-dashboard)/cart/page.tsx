'use client';

import React from 'react';
import Link from 'next/link';
import { Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { BusinessHeader } from '@/components/ui/business-header';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useCart } from '@/components/storefront/cart-provider';
import { MOCK_BUSINESS, MOCK_MENU_ITEMS } from '@/lib/mock-data';

export default function OrderNowPage() {
  const { quantities, itemCount, subtotal, updateQuantity, hydrated } = useCart();

  // Group items by category
  const categories = Array.from(
    new Set(MOCK_MENU_ITEMS.map((item) => item.category))
  );

  return (
    <main className="min-h-screen bg-[var(--bg-base)] pb-28 font-sans text-theme-primary transition-colors duration-250">
      {/* Cover Banner */}
      <div className="relative h-32 w-full bg-gradient-to-r from-[#4F46E5] to-[#0F172A]">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-3 right-3 z-20">
          <ThemeToggle />
        </div>
      </div>

      <div className="relative z-10 mx-auto -mt-8 max-w-md space-y-6 px-4">
        {/* Shared Business Identity Header */}
        <div className="space-y-3">
          <BusinessHeader business={MOCK_BUSINESS} />
          {MOCK_BUSINESS.motto && (
            <p className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-3 text-xs leading-relaxed text-theme-secondary">
              &quot;{MOCK_BUSINESS.motto}&quot;
            </p>
          )}
        </div>

        {/* Menu Items grouped by Category */}
        <div className="space-y-8 pt-2">
          {categories.map((category) => {
            const items = MOCK_MENU_ITEMS.filter(
              (item) => item.category === category
            );
            return (
              <section key={category} className="space-y-3">
                <h2 className="text-xs font-bold tracking-wider text-theme-accent uppercase">
                  {category}
                </h2>

                <div className="space-y-3">
                  {items.map((item) => {
                    const quantity = hydrated ? quantities[item.id] || 0 : 0;
                    const isAvailable = item.available;

                    return (
                      <div
                        key={item.id}
                        className={`flex items-center justify-between gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 transition-all ${
                          !isAvailable ? '' : 'hover:border-[var(--accent-indigo)]'
                        }`}
                      >
                        {/* Thumbnail / Info */}
                        <div className="flex min-w-0 flex-1 items-center gap-3.5">
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-element)] text-xl">
                            ☕
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="truncate text-sm font-medium text-theme-primary">
                              {item.name}
                            </h3>
                            <div className="mt-0.5 flex items-center gap-2">
                              <span
                                className={`font-mono text-xs font-bold ${
                                  !isAvailable
                                    ? 'text-theme-secondary line-through'
                                    : 'text-theme-primary'
                                }`}
                              >
                                ₦{item.price.toLocaleString()}
                              </span>
                              {!isAvailable && (
                                <span className="badge-error inline-flex rounded-full px-2 py-0.5 text-[10.5px] font-bold">
                                  <span aria-hidden="true" className="mr-1 inline-block size-1.5 rounded-full bg-theme-error" />
                                  Sold out
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Quantity Stepper or Sold Out */}
                        {isAvailable ? (
                          <div className="flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-element)] p-1">
                            {quantity > 0 && (
                              <>
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
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
                              onClick={() => updateQuantity(item.id, 1)}
                              className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#4F46E5] text-white shadow-sm transition-colors hover:bg-[#4338CA]"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* Sticky Bottom Order Bar */}
      {hydrated && itemCount > 0 && (
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
                <span className="block text-[13px] font-semibold">
                  Review your order
                </span>
                <span className="block text-[11px] text-white/80">
                  {itemCount} item{itemCount === 1 ? '' : 's'} · ₦
                  {subtotal.toLocaleString()}
                </span>
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-1.5 text-[13px] font-semibold">
              View cart <ArrowRight className="size-4" aria-hidden="true" />
      
            </span>
          </Link>
        </div>
      )}
    </main>
  );
}
