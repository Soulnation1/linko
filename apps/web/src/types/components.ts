import type { Business } from './business';

export interface BusinessHeaderProps {
  businessId?: string;
  business?: Partial<Business>;
  name?: string;
  logoUrl?: string | null;
  location?: string;
  accentColor?: string;
  badgeLabel?: string;
  className?: string;
}

export interface AvatarProps {
  src?: string | null;
  name?: string;
  alt?: string;
  accentColor?: string;
  size?: number;
  className?: string;
}

export interface LogoProps {
  variant?: 'full' | 'mark' | 'text';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
