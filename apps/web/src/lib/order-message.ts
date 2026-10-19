import { formatPrice } from '@/lib/format';
import type { MenuItem } from '@/types';

type OrderLine = { item: MenuItem; quantity: number };

export function buildOrderMessage({
  items,
  subtotal,
  note,
}: {
  items: OrderLine[];
  subtotal: number;
  note: string;
}) {
  return [
    'Hello,\nI would like to place an order:',
    '',
    ...items.map(
      ({ item, quantity }) =>
        `- ${quantity} × ${item.name} (${formatPrice(item.price * quantity)})`
    ),
    '',
    `Subtotal: ${formatPrice(subtotal)}`,
    note.trim() ? `\nNote: ${note.trim()}` : '',
  ]
    .filter(Boolean)
    .join('\n');
}

export function getWhatsAppUrl(whatsappNumber: string | null | undefined, message: string) {
  const phone = whatsappNumber?.replace(/\D/g, '');
  if (!phone) return null;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
