import Link from "next/link";
import type { ReactNode } from "react";
import { LinkoLogo } from "@/components/ui/logo";

export function AuthLayout({
  children,
  heading,
  subtext,
  footer,
}: {
  children: ReactNode;
  heading: string;
  subtext?: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[var(--bg-base)] px-4 py-10">
      <div className="w-full max-w-md">
        <Link
          href="/"
          aria-label="Linko home"
          className="mx-auto mb-6 flex w-fit rounded-lg focus-visible:outline-indigo-600"
        >
          <LinkoLogo size="md" />
        </Link>
        <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-sm sm:p-8">
          <header className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-theme-primary">
              {heading}
            </h1>
            {subtext && (
              <div className="mt-2 text-sm leading-6 text-theme-secondary">
                {subtext}
              </div>
            )}
          </header>
          {children}
          {footer && (
            <footer className="mt-6 border-t border-[var(--border-subtle)] pt-5 text-center text-sm text-theme-secondary">
              {footer}
            </footer>
          )}
        </section>
      </div>
    </main>
  );
}
