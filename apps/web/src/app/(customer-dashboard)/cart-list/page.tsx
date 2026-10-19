'use client';

import { ArrowRight } from 'lucide-react';
import {
  CartItemsCard,
  CartSkeleton,
  CustomerFrame,
  EmptyCart,
  StepActions,
  SubtotalCard,
  useCart,
} from '@/components/storefront';

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
        <CartSkeleton />
      ) : itemCount === 0 ? (
        <EmptyCart />
      ) : (
        <div className="space-y-4">
          <CartItemsCard
            items={items}
            itemCount={itemCount}
            onQuantityChange={updateQuantity}
            onClear={clearCart}
          />
          <SubtotalCard subtotal={subtotal} />
          <StepActions
            secondary={{ href: '/cart', label: 'Add items' }}
            primary={{
              href: '/cart-preview',
              label: (
                <>
                  Review order <ArrowRight className="size-4" aria-hidden="true" />
                </>
              ),
            }}
          />
        </div>
      )}
    </CustomerFrame>
  );
}
