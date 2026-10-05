import { MapPin, QrCode } from 'lucide-react';
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
  badgeLabel = 'Business storefront',
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
    '#4F46E5';

  return (
    <section
      aria-label={`${name} business badge`}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 shadow-elevation-2',
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -right-8 size-32 rounded-full opacity-[0.08] blur-2xl"
        style={{ backgroundColor: accentColor }}
      />
      <div className="relative flex items-center gap-3.5">
        <div className="relative shrink-0 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-element)] p-1.5 shadow-elevation-1">
          <Avatar
            src={logoUrl}
            name={name}
            accentColor={accentColor}
            size={52}
            className="rounded-xl"
          />
          <span
            className="absolute -right-1.5 -bottom-1.5 flex size-6 items-center justify-center rounded-lg border-2 border-[var(--bg-surface)] text-white shadow-sm"
            style={{ backgroundColor: accentColor }}
            aria-hidden="true"
          >
            <QrCode className="size-3.5" strokeWidth={2.2} />
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex items-center gap-1.5">
            
            <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-theme-secondary uppercase">
              {badgeLabel}
            </span>
          </div>
          <p className="truncate font-sans text-[17px] leading-snug font-bold text-theme-primary">
            {name}
          </p>
          <div className="mt-1.5 inline-flex max-w-full items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-base)] px-2.5 py-1 text-[11.5px] leading-none text-theme-secondary">
            <MapPin className="size-3 shrink-0" aria-hidden="true" />
            <span className="truncate">{location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BusinessHeader;
