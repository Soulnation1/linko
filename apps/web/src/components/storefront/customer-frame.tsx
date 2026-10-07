import Link from 'next/link';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import type { ReactNode } from 'react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { BusinessHeader } from '@/components/ui/business-header';
import { MOCK_BUSINESS } from '@/lib/mock-data';

export function CustomerFrame({
  children,
  title,
  description,
  step,
}: {
  children: ReactNode;
  title: string;
  description: ReactNode;
  step: 1 | 2 | 3;
}) {
  const steps = ['Cart', 'Review', 'Send order'];
  const progressLabel =
    step === 1
      ? 'Complete order in 3 steps'
      : step === 2
        ? 'Complete order in 2 more steps'
        : 'Last step';

  return (
    <main className="min-h-screen bg-[var(--bg-base)] pb-12 font-sans text-theme-primary">
      <header className="sticky top-0 z-30 border-b border-[var(--border-subtle)] bg-[var(--bg-header)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-end px-4">
          <div className="flex items-center justify-between  w-full gap-3">
            <Link
              href={step === 1 ? '/cart' : step === 2 ? '/cart-list' : '/cart-preview'}
              className="hidden items-center gap-1.5 text-xs font-medium text-theme-secondary transition-colors hover:text-theme-primary sm:flex"
            >
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              Back
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 pt-7">
        <BusinessHeader
          business={MOCK_BUSINESS}
          badgeLabel={progressLabel}
          className="mb-5"
        />

        <nav aria-label="Order progress" className="mb-8">
          <ol className="flex items-center">
            {steps.map((label, index) => {
              const number = index + 1;
              const active = number === step;
              const complete = number < step;
              return (
                <li
                  key={label}
                  className="flex min-w-0 flex-1 items-center last:flex-none"
                  aria-current={active ? 'step' : undefined}
                >
                  <div className="flex shrink-0 items-center gap-2">
                    <span
                      className={`flex size-7 items-center justify-center rounded-full text-[11px] font-bold ${
                        active
                          ? 'bg-[#4F46E5] text-white'
                          : complete
                            ? 'badge-success'
                            : 'border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-theme-secondary'
                      }`}
                    >
                      {complete ? '✓' : number}
                    </span>
                    <span
                      className={`hidden text-xs font-semibold sm:block ${
                        active ? 'text-theme-primary' : 'text-theme-secondary'
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className={`mx-3 h-px min-w-3 flex-1 ${
                        complete ? 'bg-[#4F46E5]' : 'bg-[var(--border-subtle)]'
                      }`}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="mb-6 flex items-start gap-3">
        
          <div className="min-w-0">
            <h1 className="text-[24px] leading-tight font-extrabold tracking-tight text-theme-primary">
              {title}
            </h1>
            <div className="mt-1 text-[13px] leading-relaxed text-theme-secondary">
              {description}
            </div>
          </div>
        </div>

        {children}
      </div>
    </main>
  );
}

export function formatPrice(amount: number) {
  return `₦${amount.toLocaleString('en-NG')}`;
}

export function EmptyCart() {
  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-6 py-12 text-center shadow-elevation-1">
      <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[var(--bg-element)] text-theme-secondary">
        <ShoppingBag className="size-6" aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-base font-bold text-theme-primary">
        Your cart is waiting
      </h2>
      <p className="mx-auto mt-1.5 max-w-xs text-[13px] leading-relaxed text-theme-secondary">
        Browse the storefront and add something you would like to order.
      </p>
      <Link
        href="/cart"
        className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#4F46E5] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#4338CA]"
      >
        Browse the storefront
      </Link>
    </div>
  );
}
