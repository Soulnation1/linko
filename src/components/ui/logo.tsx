import React from 'react';
import { cn } from '@/lib/utils';
import type { LogoProps } from '@/types';

export function SaveUsLogo({
  variant = 'full',
  size = 'md',
  className,
}: LogoProps) {
  const sizeClasses = {
    sm: { box: 'w-7 h-7 rounded-lg', text: 'text-lg', icon: 'w-4 h-4' },
    md: { box: 'w-9 h-9 rounded-xl', text: 'text-xl', icon: 'w-5 h-5' },
    lg: { box: 'w-12 h-12 rounded-2xl', text: 'text-2xl', icon: 'w-7 h-7' },
  }[size];

  return (
    <div className={cn('inline-flex items-center gap-2.5 select-none', className)}>
      {variant !== 'text' && (
        <div
          className={cn(
            'relative flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105',
            'bg-gradient-to-tr from-[#7D4F42] via-[#8C5A4C] to-[#D98A5B]',
            'border border-white/20 shadow-[#8C5A4C]/30',
            sizeClasses.box
          )}
        >
          {/* Custom Interlocking S + Link SVG Icon */}
          <svg
            className={sizeClasses.icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 17h2a2.5 2.5 0 0 0 0-5h-2a2.5 2.5 0 0 1 0-5h2a2.5 2.5 0 0 1 2.5 2.5" />
            <path d="M12 4.5v1.5" />
            <path d="M12 18v1.5" />
          </svg>
        </div>
      )}

      {variant !== 'mark' && (
        <span
          className={cn(
            'font-serif font-bold tracking-tight text-[#F5EFEA]',
            sizeClasses.text
          )}
        >
          Save<span className="text-[#D98A5B]">Us</span>
          <span className="text-[#8C5A4C] inline-block animate-pulse">.</span>
        </span>
      )}
    </div>
  );
}

export default SaveUsLogo;
