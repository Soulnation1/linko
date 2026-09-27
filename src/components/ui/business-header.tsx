import React from 'react';
import { MapPin } from 'lucide-react';
import { MOCK_BUSINESSES, MOCK_BUSINESS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';
import type { BusinessHeaderProps } from '@/types';

export function BusinessHeader({
  businessId,
  business: customBusiness,
  name: propName,
  logoUrl: propLogoUrl,
  location: propLocation,
  accentColor: propAccentColor,
  className,
}: BusinessHeaderProps) {
  const baseBusiness =
    (businessId && MOCK_BUSINESSES[businessId]) || MOCK_BUSINESS;

  const name = propName ?? customBusiness?.name ?? baseBusiness.name;
  const logoUrl =
    propLogoUrl !== undefined
      ? propLogoUrl
      : (customBusiness?.logoUrl ?? baseBusiness.logoUrl);
  const location =
    propLocation ?? customBusiness?.location ?? baseBusiness.location;
  const accentColor =
    propAccentColor ??
    customBusiness?.accentColor ??
    baseBusiness.accentColor ??
    '#C46A3F';

  return (
    <header className={cn('flex items-center gap-3 py-2', className)}>
      {/* Reusable Avatar Component (46px logo / initials avatar) */}
      <Avatar
        src={logoUrl}
        name={name}
        accentColor={accentColor}
        size={46}
      />

      {/* Business Name & Location */}
      <div className="flex min-w-0 flex-col justify-center">
        <h1 className="truncate font-serif font-bold text-[17px] text-charcoal leading-snug">
          {name}
        </h1>
        <div className="mt-0.5 flex items-center gap-1 text-[11.5px] text-muted leading-none">
          <MapPin
            className="h-3 w-3 flex-shrink-0 text-muted"
            aria-hidden="true"
          />
          <span className="truncate">{location}</span>
        </div>
      </div>
    </header>
  );
}

export default BusinessHeader;
