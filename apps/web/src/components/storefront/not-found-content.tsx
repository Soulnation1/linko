'use client';

import { usePathname } from 'next/navigation';
import { MOCK_RETIRED_BUSINESS_LINKS } from '@/lib/mock-data';

export function NotFoundContent() {
  const pathname = usePathname();
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  const retiredLink = MOCK_RETIRED_BUSINESS_LINKS[normalizedPath];

  if (retiredLink) {
    return (
      <>
        <p className="mt-5 font-mono text-[10px] font-semibold tracking-[0.16em] text-theme-secondary uppercase">
          Expired business link
        </p>
        <h1 className="mt-2 text-[24px] font-extrabold tracking-tight text-theme-primary">
          This link no longer exists
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-theme-secondary">
          The link you opened was previously used by {retiredLink.businessName},
          but it has expired and is no longer connected to their current page.
          Please contact the business and ask for its new Linko link or QR code.
        </p>
      </>
    );
  }

  return (
    <>
      <p className="mt-5 font-mono text-[10px] font-semibold tracking-[0.16em] text-theme-secondary uppercase">
        Page not found
      </p>
      <h1 className="mt-2 text-[24px] font-extrabold tracking-tight text-theme-primary">
        This page doesn&apos;t exist
      </h1>
      <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-theme-secondary">
        Check the web address for mistakes, or return to Linko and find the
        page you were looking for.
      </p>
    </>
  );
}
