'use client';

import { ThemeToggle } from '@linko/ui';
import { BusinessHeader } from '@/components/ui/business-header';
import { MenuList, StickyCartBar, useCart } from '@/components/storefront';
import { MOCK_BUSINESS, MOCK_MENU_ITEMS } from '@/lib/mock-data';

export default function OrderNowPage() {
  const { quantities, itemCount, subtotal, updateQuantity, hydrated } = useCart();

  return (
    <main className="min-h-screen bg-[var(--bg-base)] pb-28 font-sans text-theme-primary transition-colors duration-250">
      <div className="relative h-32 w-full bg-gradient-to-r from-[#4F46E5] to-[#0F172A]">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-3 right-3 z-20">
          <ThemeToggle />
        </div>
      </div>

      <div className="relative z-10 mx-auto -mt-8 max-w-md space-y-6 px-4">
        <div className="space-y-3">
          <BusinessHeader business={MOCK_BUSINESS} />
          {MOCK_BUSINESS.motto && (
            <p className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-3 text-xs leading-relaxed text-theme-secondary">
              &quot;{MOCK_BUSINESS.motto}&quot;
            </p>
          )}
        </div>

        <MenuList
          items={MOCK_MENU_ITEMS}
          quantities={hydrated ? quantities : {}}
          onQuantityChange={updateQuantity}
        />
      </div>

      {hydrated && itemCount > 0 && (
        <StickyCartBar itemCount={itemCount} subtotal={subtotal} />
      )}
    </main>
  );
}
