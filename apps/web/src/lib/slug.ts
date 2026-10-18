export const RESERVED_SLUGS = [
  'login',
  'signup',
  'forgot-password',
  'reset-password',
  'onboarding',
  'dashboard',
  'settings',
  'cart',
  'cart-list',
  'cart-preview',
  'complete-order',
  'api',
  'manifest',
  'admin',
] as const;

export const SLUG_MIN = 3;
export const SLUG_MAX = 40;

export function slugify(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, SLUG_MAX)
    .replace(/-+$/g, '');
}

export type SlugIssue = 'too_short' | 'too_long' | 'invalid_format' | 'reserved';

export function getSlugIssue(slug: string): SlugIssue | null {
  if (slug.length < SLUG_MIN) return 'too_short';
  if (slug.length > SLUG_MAX) return 'too_long';
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return 'invalid_format';
  if ((RESERVED_SLUGS as readonly string[]).includes(slug)) return 'reserved';
  return null;
}
