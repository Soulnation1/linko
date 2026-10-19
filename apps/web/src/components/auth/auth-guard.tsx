'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';

export const LOGIN_PATH = '/login';

// TODO(auth): wrap the dashboard layout with this guard once the app shell
// is merged. A real backend should also enforce access server-side.
export function AuthGuard({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const router = useRouter();
  const status = useAuthStore((state) => state.status);
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (status === 'unauthenticated') router.replace(LOGIN_PATH);
  }, [status, router]);

  if (status !== 'authenticated') {
    return (
      fallback ?? (
        <div
          role="status"
          aria-live="polite"
          className="flex min-h-dvh items-center justify-center bg-[var(--bg-base)] text-theme-secondary"
        >
          <Loader2 className="size-6 animate-spin" aria-hidden="true" />
          <span className="sr-only">Checking your session…</span>
        </div>
      )
    );
  }

  return <>{children}</>;
}
