'use client';

import React, { useState } from 'react';
import { Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { BusinessHeader } from '@/components/ui/business-header';
import { MOCK_BUSINESS, MOCK_MENU_ITEMS } from '@/lib/mock-data';

export default function OrderNowPage() {
  const [cart, setCart] = useState<Record<string, number>>({});

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      const current = prev[itemId] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: next };
    });
  };

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = MOCK_MENU_ITEMS.find((m) => m.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  // Group items by category
  const categories = Array.from(
    new Set(MOCK_MENU_ITEMS.map((item) => item.category))
  );

  return (
    <main className="min-h-screen bg-[#141211] pb-28 font-sans text-[#F5EFEA]">
      {/* Cover Banner */}
      <div className="relative h-32 w-full bg-gradient-to-r from-[#8C5A4C] to-[#221E1C]">
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10 mx-auto -mt-8 max-w-md space-y-6 px-4">
        {/* Shared Business Identity Header */}
        <div className="rounded-2xl border border-white/10 bg-[#221E1C] p-4 shadow-xl">
          <BusinessHeader business={MOCK_BUSINESS} />
          {MOCK_BUSINESS.motto && (
            <p className="mt-2 border-t border-white/5 pt-2 text-xs text-[#A39890] italic">
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
                <h2 className="text-xs font-bold tracking-wider text-[#D98A5B] uppercase">
                  {category}
                </h2>

                <div className="space-y-3">
                  {items.map((item) => {
                    const quantity = cart[item.id] || 0;
                    const isAvailable = item.available;

                    return (
                      <div
                        key={item.id}
                        className={`flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#221E1C] p-4 transition-all ${
                          !isAvailable ? 'opacity-60' : 'hover:border-white/20'
                        }`}
                      >
                        {/* Thumbnail / Info */}
                        <div className="flex min-w-0 flex-1 items-center gap-3.5">
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-white/5 bg-[#1A1716] text-xl">
                            ☕
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="truncate text-sm font-medium text-[#F5EFEA]">
                              {item.name}
                            </h3>
                            <div className="mt-0.5 flex items-center gap-2">
                              <span
                                className={`font-mono text-xs font-bold ${
                                  !isAvailable
                                    ? 'text-[#A39890] line-through'
                                    : 'text-[#F5EFEA]'
                                }`}
                              >
                                ₦{item.price.toLocaleString()}
                              </span>
                              {!isAvailable && (
                                <span className="text-[10.5px] font-semibold text-[#D98A5B]">
                                  Sold out
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Quantity Stepper or Sold Out */}
                        {isAvailable ? (
                          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#1A1716] p-1">
                            {quantity > 0 && (
                              <>
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-white transition-colors hover:bg-white/10"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </button>
                                <span className="w-5 text-center font-mono text-xs font-bold text-[#F5EFEA]">
                                  {quantity}
                                </span>
                              </>
                            )}
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#8C5A4C] text-white shadow-sm transition-colors hover:bg-[#9E6756]"
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
      {totalItems > 0 && (
        <div className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 cursor-pointer items-center justify-between rounded-2xl bg-[#8C5A4C] p-4 text-white shadow-2xl transition-all hover:bg-[#9E6756]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <span className="text-sm font-medium">
              {totalItems} item{totalItems > 1 ? 's' : ''} · ₦
              {totalPrice.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm font-bold">
            <span>View order</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      )}
    </main>
  );
}
