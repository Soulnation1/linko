'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, MessageCircle } from 'lucide-react';
import { CustomerFrame, EmptyCart, formatPrice } from '@/components/storefront/customer-frame';
import { useCart } from '@/components/storefront/cart-provider';
import { MOCK_BUSINESS } from '@/lib/mock-data';

function getWhatsAppUrl(message: string) {
  const phone = MOCK_BUSINESS.whatsappNumber?.replace(/\D/g, '');
  if (!phone) return null;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export default function CompleteOrderPage() {
  const { items, itemCount, subtotal, hydrated, customerNote } = useCart();
  const orderMessage = [
    `Hello,
     I would like to place an order:`,
    '',
    ...items.map(
      ({ item, quantity }) =>
        `- ${quantity} × ${item.name} (${formatPrice(item.price * quantity)})`
    ),
    '',
    `Subtotal: ${formatPrice(subtotal)}`,
    customerNote.trim() ? `\nNote: ${customerNote.trim()}` : '',
  ]
    .filter(Boolean)
    .join('\n');
  const whatsAppUrl = getWhatsAppUrl(orderMessage);

  return (
    <CustomerFrame
      title="Your order is ready"
      description="Send your order to the business securely through WhatsApp."
      step={3}
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
          <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 shadow-elevation-1">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-[#15803D]">
                <Check className="size-5" strokeWidth={2.5} aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-[14px] font-bold text-theme-primary">
                  Ready to send
                </h2>
                <p className="mt-1 text-[12px] leading-relaxed text-theme-secondary">
                  WhatsApp will open with your order details pre-filled. Check
                  the message, then tap send to contact {MOCK_BUSINESS.name}.
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-base)] p-3.5">
              <p className="mb-2 font-mono text-[10px] font-semibold tracking-wider text-theme-secondary uppercase">
                Message preview
              </p>
              <p className="whitespace-pre-wrap text-[12px] leading-relaxed text-theme-primary">
                {orderMessage}
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 shadow-elevation-1">
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-theme-secondary">
                {itemCount} item{itemCount === 1 ? '' : 's'}
              </span>
              <span className="font-mono font-bold text-theme-primary">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="mt-2 text-[11px] text-theme-secondary">
              Final availability, delivery, and payment details are confirmed
              with the business.
            </p>
          </section>

          {whatsAppUrl ? (
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#4F46E5] px-4 text-[13px] font-bold text-white shadow-elevation-2 transition-colors hover:bg-[#4338CA] focus-visible:outline-none"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Continue on WhatsApp
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          ) : (
            <p
              role="alert"
              className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 text-[13px] text-theme-primary"
            >
              This business has not added a WhatsApp number yet. Please contact
              the business directly to place your order.
            </p>
          )}

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
