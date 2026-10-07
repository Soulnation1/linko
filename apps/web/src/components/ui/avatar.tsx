import React from 'react';
import Image from 'next/image';
import { cn, getInitials } from '@/lib/utils';
import type { AvatarProps } from '@/types';

export function Avatar({
  src,
  name = '',
  alt,
  accentColor = '#C46A3F',
  size = 46,
  className,
}: AvatarProps) {
  const initials = getInitials(name);
  const imageAlt = alt || name || 'Avatar';

  return (
    <div
      className={cn(
        'relative flex-shrink-0 overflow-hidden rounded-full',
        className
      )}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {src ? (
        <Image
          src={src}
          alt={imageAlt}
          width={size}
          height={size}
          unoptimized
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center text-[15px] font-bold text-white"
          style={{ backgroundColor: accentColor }}
        >
          {initials}
        </div>
      )}
    </div>
  );
}

export default Avatar;
