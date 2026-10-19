import type { ReactNode } from 'react';
import { BusinessHeader } from '@/components/ui/business-header';
import { MOCK_BUSINESS } from '@/lib/mock-data';
import { CustomerTopBar } from './customer-top-bar';
import { StepProgress, type CheckoutStep } from './step-progress';

const PROGRESS_LABEL: Record<CheckoutStep, string> = {
  1: 'Complete order in 3 steps',
  2: 'Complete order in 2 more steps',
  3: 'Last step',
};

export function CustomerFrame({
  children,
  title,
  description,
  step,
}: {
  children: ReactNode;
  title: string;
  description: ReactNode;
  step: CheckoutStep;
}) {
  return (
    <main className="min-h-screen bg-[var(--bg-base)] pb-12 font-sans text-theme-primary">
      <CustomerTopBar step={step} />

      <div className="mx-auto max-w-2xl px-4 pt-7">
        <BusinessHeader
          business={MOCK_BUSINESS}
          badgeLabel={PROGRESS_LABEL[step]}
          className="mb-5"
        />
        <StepProgress step={step} />

        <div className="mb-6 min-w-0">
          <h1 className="text-[24px] leading-tight font-extrabold tracking-tight text-theme-primary">
            {title}
          </h1>
          <div className="mt-1 text-[13px] leading-relaxed text-theme-secondary">
            {description}
          </div>
        </div>

        {children}
      </div>
    </main>
  );
}
