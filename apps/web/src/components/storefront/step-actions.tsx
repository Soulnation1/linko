import Link from 'next/link';
import type { ReactNode } from 'react';
import { buttonStyles } from '@/components/ui';

type StepAction = { href: string; label: ReactNode };

// Back/secondary link on the left, primary continue link filling the rest of the row.
export function StepActions({
  secondary,
  primary,
}: {
  secondary: StepAction;
  primary: StepAction;
}) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-3">
      <Link
        href={secondary.href}
        className={buttonStyles({ variant: 'secondary', size: 'lg', className: 'gap-1.5' })}
      >
        {secondary.label}
      </Link>
      <Link href={primary.href} className={buttonStyles({ size: 'lg' })}>
        {primary.label}
      </Link>
    </div>
  );
}
