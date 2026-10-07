import type { Business, MenuItem } from '@/types';

export const MOCK_BUSINESS: Business = {
  id: 'linko-store',
  name: 'fresh Gourmet & Coffee',
  motto: 'Artisanal breads, craft coffee & fresh daily treats',
  location: 'Lekki Phase 1, Lagos',
  logoUrl: null,
  coverUrl: null,
  accentColor: '#4F46E5',
  whatsappNumber: '2348143800220',
};

export const MOCK_BUSINESSES: Record<string, Business> = {
  default: MOCK_BUSINESS,
  'linko-store': MOCK_BUSINESS,
  'menuza-cafe': {
    id: 'menuza-cafe',
    name: 'Soultech Global Ventures',
    motto: 'Tech made easy....',
    location: 'Victoria Island, Lagos',
    logoUrl: null,
    coverUrl: null,
    accentColor: '#4F46E5',
    whatsappNumber: '2348143800220',
  },
};

export const MOCK_RETIRED_BUSINESS_LINKS: Record<
  string,
  { businessName: string }
> = {
  '/order-now': {
    businessName: MOCK_BUSINESS.name,
  },
  '/linko-gourmet-old': {
    businessName: MOCK_BUSINESS.name,
  },
  '/soultech-global-old': {
    businessName: MOCK_BUSINESSES['menuza-cafe'].name,
  },
};

export const MOCK_MENU_ITEMS: MenuItem[] = [
  {
    id: 'item-1',
    category: 'Coffee & Drinks',
    name: 'Cappuccino',
    price: 2500,
    imageUrl: null,
    available: true,
  },
  {
    id: 'item-2',
    category: 'Coffee & Drinks',
    name: 'Cold Brew',
    price: 2800,
    imageUrl: null,
    available: true,
  },
  {
    id: 'item-3',
    category: 'Pastries & Bakery',
    name: 'Almond Croissant',
    price: 1800,
    imageUrl: null,
    available: true,
  },
  {
    id: 'item-4',
    category: 'Pastries & Bakery',
    name: 'Cinnamon Roll',
    price: 1500,
    imageUrl: null,
    available: false,
  },
  {
    id: 'item-5',
    category: 'Breakfast & Brunch',
    name: 'Avocado Toast',
    price: 3500,
    imageUrl: null,
    available: true,
  },
];
