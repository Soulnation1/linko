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
    <main className="min-h-screen bg-[#141211] text-[#F5EFEA] font-sans pb-28">
      {/* Cover Banner */}
      <div className="h-32 w-full bg-gradient-to-r from-[#8C5A4C] to-[#221E1C] relative">
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="mx-auto max-w-md px-4 space-y-6 -mt-8 relative z-10">
        {/* Shared Business Identity Header */}
        <div className="bg-[#221E1C] border border-white/10 rounded-2xl p-4 shadow-xl">
          <BusinessHeader business={MOCK_BUSINESS} />
          {MOCK_BUSINESS.motto && (
            <p className="text-xs text-[#A39890] italic mt-2 border-t border-white/5 pt-2">
              "{MOCK_BUSINESS.motto}"
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
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#D98A5B]">
                  {category}
                </h2>

                <div className="space-y-3">
                  {items.map((item) => {
                    const quantity = cart[item.id] || 0;
                    const isAvailable = item.available;

                    return (
                      <div
                        key={item.id}
                        className={`bg-[#221E1C] border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4 transition-all ${
                          !isAvailable ? 'opacity-60' : 'hover:border-white/20'
                        }`}
                      >
                        {/* Thumbnail / Info */}
                        <div className="flex items-center gap-3.5 min-w-0 flex-1">
                          <div className="w-12 h-12 rounded-xl bg-[#1A1716] border border-white/5 flex items-center justify-center text-xl flex-shrink-0">
                            ☕
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-medium text-sm text-[#F5EFEA] truncate">
                              {item.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span
                                className={`font-mono text-xs font-bold ${
                                  !isAvailable
                                    ? 'line-through text-[#A39890]'
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
                          <div className="flex items-center gap-2 bg-[#1A1716] border border-white/10 rounded-xl p-1">
                            {quantity > 0 && (
                              <>
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="font-mono text-xs font-bold w-5 text-center text-[#F5EFEA]">
                                  {quantity}
                                </span>
                              </>
                            )}
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-7 h-7 rounded-lg bg-[#8C5A4C] hover:bg-[#9E6756] text-white flex items-center justify-center transition-colors shadow-sm"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
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
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md bg-[#8C5A4C] hover:bg-[#9E6756] text-white rounded-2xl p-4 flex items-center justify-between shadow-2xl z-50 transition-all cursor-pointer">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <span className="font-medium text-sm">
              {totalItems} item{totalItems > 1 ? 's' : ''} · ₦
              {totalPrice.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1 font-bold text-sm">
            <span>View order</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      )}
    </main>
  );
}
