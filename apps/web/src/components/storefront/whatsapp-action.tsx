import { ArrowRight, MessageCircle } from 'lucide-react';
import { buttonStyles } from '@/components/ui';

export function WhatsAppAction({ url }: { url: string | null }) {
  if (!url) {
    return (
      <p
        role="alert"
        className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 text-[13px] text-theme-primary"
      >
        This business has not added a WhatsApp number yet. Please contact the
        business directly to place your order.
      </p>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonStyles({ size: 'lg', className: 'w-full font-bold' })}
    >
      <MessageCircle className="size-4" aria-hidden="true" />
      Continue on WhatsApp
      <ArrowRight className="size-4" aria-hidden="true" />
    </a>
  );
}
