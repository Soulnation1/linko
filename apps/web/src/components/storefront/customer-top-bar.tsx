import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ThemeToggle } from '@linko/ui';
import type { CheckoutStep } from './step-progress';

const BACK_HREF: Record<CheckoutStep, string> = {
  1: '/cart',
  2: '/cart-list',
  3: '/cart-preview',
};

export function CustomerTopBar({ step }: { step: CheckoutStep }) {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border-subtle)] bg-[var(--bg-header)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-end px-4">
        <div className="flex w-full items-center justify-between gap-3">
          <Link
            href={BACK_HREF[step]}
            className="hidden items-center gap-1.5 text-xs font-medium text-theme-secondary transition-colors hover:text-theme-primary sm:flex"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Back
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
