import type { Business, MenuItem } from '@/types';

export const MOCK_BUSINESS: Business = {
  id: 'saveus-store',
  name: 'SaveUS Gourmet & Coffee',
  motto: 'Artisanal breads, craft coffee & fresh daily treats',
  location: 'Lekki Phase 1, Lagos',
  logoUrl: null,
  coverUrl: null,
  accentColor: '#8C5A4C',
  whatsappNumber: '2348000000000',
};

export const MOCK_BUSINESSES: Record<string, Business> = {
  default: MOCK_BUSINESS,
  'saveus-store': MOCK_BUSINESS,
  'menuza-cafe': {
    id: 'menuza-cafe',
    name: 'Soultech Global Ventures',
    motto: 'Tech made easy....',
    location: 'Victoria Island, Lagos',
    logoUrl: null,
    coverUrl: null,
    accentColor: '#8C5A4C',
    whatsappNumber: '2348011112222',
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
