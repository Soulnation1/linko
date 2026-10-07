import Link from 'next/link';
import { Home } from 'lucide-react';
import { LinkoLogo } from '@/components/ui/logo';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { NotFoundContent } from '@/components/storefront/not-found-content';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)] px-4 py-6 font-sans text-theme-primary">
      <header className="mx-auto flex max-w-2xl items-center justify-between">
        <Link href="/" aria-label="Go to Linko home">
          <LinkoLogo size="sm" />
        </Link>
        <ThemeToggle />
      </header>
      <section className="mx-auto flex min-h-[75vh] max-w-lg flex-col justify-center">
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 text-center shadow-elevation-1 sm:p-9">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#4F46E5]/10 font-mono text-lg font-bold text-theme-accent">
            404
          </span>
          <NotFoundContent />
          <Link
            href="/"
            className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#4F46E5] px-5 text-[13px] font-semibold text-white shadow-elevation-2 transition-colors hover:bg-[#4338CA]"
          >
            <Home className="size-4" aria-hidden="true" />
            Back to Linko home
          </Link>
        </div>
      </section>
    </main>
  );
}
