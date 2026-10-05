import React from 'react';
import { Link2, QrCode } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LogoProps } from '@/types';

export function LinkoLogo({
  variant = 'full',
  size = 'md',
  className,
}: LogoProps) {
  const sizeClasses = {
    sm: { box: 'size-7 rounded-md', text: 'text-lg', icon: 'size-4' },
    md: { box: 'size-9 rounded-lg', text: 'text-xl', icon: 'size-5' },
    lg: { box: 'size-12 rounded-xl', text: 'text-2xl', icon: 'size-7' },
  }[size];

  return (
    <div className={cn('inline-flex items-center gap-2 select-none', className)}>
      {variant !== 'text' && (
        <div
          className={cn(
            'flex items-center justify-center bg-gradient-to-br from-[#4F46E5] to-[#4338CA] text-white shadow-sm shadow-indigo-500/20',
            sizeClasses.box
          )}
        >
          <span className="relative flex items-center justify-center">
            <QrCode
              className={sizeClasses.icon}
              strokeWidth={2.1}
              aria-hidden="true"
            />
            <span className="absolute flex size-3 items-center justify-center rounded-[3px] bg-[#B76140]">
              <Link2 className="size-2 text-[#FFF8F2]" strokeWidth={2.5} aria-hidden="true" />
            </span>
          </span>
        </div>
      )}

      {variant !== 'mark' && (
        <span
          className={cn(
            'font-sans font-bold text-theme-primary transition-colors',
            sizeClasses.text
          )}
        >
          Linko
        </span>
      )}
    </div>
  );
}

export default LinkoLogo;
