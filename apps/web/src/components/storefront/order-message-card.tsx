import { Check } from 'lucide-react';
import { Card } from '@/components/ui';

export function OrderMessageCard({
  businessName,
  message,
}: {
  businessName: string;
  message: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-[#15803D]">
          <Check className="size-5" strokeWidth={2.5} aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-[14px] font-bold text-theme-primary">Ready to send</h2>
          <p className="mt-1 text-[12px] leading-relaxed text-theme-secondary">
            WhatsApp will open with your order details pre-filled. Check the
            message, then tap send to contact {businessName}.
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-base)] p-3.5">
        <p className="mb-2 font-mono text-[10px] font-semibold tracking-wider text-theme-secondary uppercase">
          Message preview
        </p>
        <p className="whitespace-pre-wrap text-[12px] leading-relaxed text-theme-primary">
          {message}
        </p>
      </div>
    </Card>
  );
}
