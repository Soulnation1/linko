'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  CartRestoring,
  CustomerFrame,
  CustomerNoteField,
  EmptyCart,
  OrderSummaryCard,
  ReviewNotice,
  StepActions,
  useCart,
} from '@/components/storefront';

export default function CartPreviewPage() {
  const { items, itemCount, subtotal, hydrated, customerNote, setCustomerNote } =
    useCart();

  return (
    <CustomerFrame
      title="Review your order"
      description={<ReviewNotice />}
      step={2}
    >
      {!hydrated ? (
        <CartRestoring />
      ) : itemCount === 0 ? (
        <EmptyCart />
      ) : (
        <div className="space-y-4">
          <OrderSummaryCard items={items} itemCount={itemCount} subtotal={subtotal} />
          <CustomerNoteField value={customerNote} onChange={setCustomerNote} />
          <StepActions
            secondary={{
              href: '/cart-list',
              label: (
                <>
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  Edit cart
                </>
              ),
            }}
            primary={{
              href: '/complete-order',
              label: (
                <>
                  Continue <ArrowRight className="size-4" aria-hidden="true" />
                </>
              ),
            }}
          />
        </div>
      )}
    </CustomerFrame>
  );
}
