import type { ReactNode } from "react";
import { ThemeToggle } from "@linko/ui";
import { AuthBrandPanel } from "./auth-brand-panel";

export function AuthLayout({
  children,
  heading,
  subtext,
  footer,
  panelTitle = "Your business, online and ready to sell.",
  panelSubtext = "Publish your products or services, share one link, and take orders in one simple place.",
}: {
  children: ReactNode;
  heading: string;
  subtext?: ReactNode;
  footer?: ReactNode;
  panelTitle?: string;
  panelSubtext?: string;
}) {
  return (
    <main className="min-h-dvh bg-[var(--bg-base)] md:grid md:grid-cols-2 md:gap-6 md:p-6">
      <AuthBrandPanel panelTitle={panelTitle} panelSubtext={panelSubtext} />
      <div className="flex flex-col justify-center px-5 py-10 sm:px-8 lg:px-10 xl:px-12">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-6 flex justify-end">
            <ThemeToggle />
          </div>
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
        </div>
      </div>
    </main>
  );
}
