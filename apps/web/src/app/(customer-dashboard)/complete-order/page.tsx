'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import {
  CartRestoring,
  CustomerFrame,
  EmptyCart,
  OrderMessageCard,
  OrderTotalCard,
  WhatsAppAction,
  useCart,
} from '@/components/storefront';
import { MOCK_BUSINESS } from '@/lib/mock-data';
import { buildOrderMessage, getWhatsAppUrl } from '@/lib/order-message';

export default function CompleteOrderPage() {
  const { items, itemCount, subtotal, hydrated, customerNote } = useCart();
  const orderMessage = buildOrderMessage({ items, subtotal, note: customerNote });
  const whatsAppUrl = getWhatsAppUrl(MOCK_BUSINESS.whatsappNumber, orderMessage);

  return (
    <CustomerFrame
      title="Your order is ready"
      description="Send your order to the business securely through WhatsApp."
      step={3}
    >
      {!hydrated ? (
        <CartRestoring />
      ) : itemCount === 0 ? (
        <EmptyCart />
      ) : (
        <div className="space-y-4">
          <OrderMessageCard businessName={MOCK_BUSINESS.name} message={orderMessage} />
          <OrderTotalCard itemCount={itemCount} subtotal={subtotal} />
          <WhatsAppAction url={whatsAppUrl} />
          <Link
            href="/cart-preview"
            className="flex min-h-11 items-center justify-center gap-1.5 text-[12px] font-semibold text-theme-secondary transition-colors hover:text-theme-primary"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Back to order review
          </Link>
        </div>
      )}
    </CustomerFrame>
  );
}
