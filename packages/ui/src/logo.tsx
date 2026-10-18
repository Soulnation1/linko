import React, { useId } from 'react';
import { cn } from './cn';

export interface LogoProps {
  variant?: 'full' | 'mark' | 'text';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const L_PATH = 'M13 10 V33 H31';

/**
 * The Linko mark: an "L" whose foot is threaded through a ring (the "o").
 * Ids are scoped per instance so several marks can share a page.
 */
export function LinkoMark({
  className,
  decorative = false,
}: {
  className?: string;
  decorative?: boolean;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const tile = `${uid}-tile`;
  const gloss = `${uid}-gloss`;
  const ring = `${uid}-ring`;
  const leftHalf = `${uid}-left`;
  const ringMask = `${uid}-ringmask`;

  return (
    <svg
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      {...(decorative
        ? { 'aria-hidden': true }
        : { role: 'img', 'aria-label': 'Linko' })}
      className={cn('shrink-0', className)}
    >
      <defs>
        <linearGradient
          id={tile}
          x1="4"
          y1="2"
          x2="44"
          y2="46"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#6D6BFF" />
          <stop offset="1" stopColor="#3730A3" />
        </linearGradient>
        <linearGradient
          id={gloss}
          x1="0"
          y1="0"
          x2="0"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fff" stopOpacity=".22" />
          <stop offset=".55" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id={ring}
          x1="22"
          y1="26"
          x2="38"
          y2="42"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FDBA74" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
        <clipPath id={leftHalf}>
          <rect x="0" y="0" width="29" height="48" />
        </clipPath>
        <mask
          id={ringMask}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="48"
          height="48"
        >
          <rect width="48" height="48" fill="#fff" />
          <g clipPath={`url(#${leftHalf})`}>
            <path
              d={L_PATH}
              fill="none"
              stroke="#000"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </mask>
      </defs>
      <rect width="48" height="48" rx="12" fill={`url(#${tile})`} />
      <rect width="48" height="48" rx="12" fill={`url(#${gloss})`} />
      <path
        d={L_PATH}
        fill="none"
        stroke="#fff"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        mask={`url(#${ringMask})`}
        cx="29"
        cy="33"
        r="7.2"
        fill="none"
        stroke={`url(#${ring})`}
        strokeWidth="4.4"
      />
    </svg>
  );
}

export function LinkoLogo({
  variant = 'full',
  size = 'md',
  className,
}: LogoProps) {
  const sizeClasses = {
    sm: { mark: 'size-7', text: 'text-lg' },
    md: { mark: 'size-9', text: 'text-xl' },
    lg: { mark: 'size-12', text: 'text-2xl' },
  }[size];

  return (
    <div className={cn('inline-flex items-center gap-2 select-none', className)}>
      {variant !== 'text' && (
        <LinkoMark
          decorative={variant === 'full'}
          className={cn(
            'rounded-[25%] shadow-sm shadow-indigo-500/25',
            sizeClasses.mark
          )}
        />
      )}

      {variant !== 'mark' && (
        <span
          className={cn(
            'font-sans font-extrabold tracking-tight text-theme-primary transition-colors',
            sizeClasses.text
          )}
        >
          Link
          <span className="bg-gradient-to-br from-[#FDBA74] to-[#F59E0B] bg-clip-text text-transparent">
            o
          </span>
        </span>
      )}
    </div>
  );
}

export default LinkoLogo;
