import type { Listing, ProductListing, ServiceListing } from '@linko/domain';
import { MOCK_BUSINESSES, MOCK_MENU_ITEMS } from '@/lib/mock-data';
import { mockHash } from './hash';
import type { MockDb } from './storage';

export const DEMO_ACCOUNT = {
  email: 'demo@linko.app',
  password: 'Demo1234!',
} as const;

const DEMO_SALT = 'linko-demo-salt';
const DEMO_USER_ID = 'user_demo';
const SEED_DATE = '2026-01-01T09:00:00.000Z';

function seedProducts(): ProductListing[] {
  return MOCK_MENU_ITEMS.map((item) => ({
    id: item.id,
    businessId: 'linko-store',
    kind: 'product' as const,
    name: item.name,
    description: '',
    category: item.category,
    imageUrl: item.imageUrl ?? null,
    available: item.available,
    options: [{ id: `${item.id}-regular`, label: 'Regular', price: item.price }],
    trackStock: false,
    stockQty: null,
    leadTime: null,
  }));
}

function seedServices(): ServiceListing[] {
  const base = {
    businessId: 'menuza-cafe',
    kind: 'service' as const,
    imageUrl: null,
    available: true,
    deliveryMode: 'at_business' as const,
  };

  return [
    {
      ...base,
      id: 'service-1',
      name: 'Laptop Diagnostics',
      description: 'Full hardware and software health check.',
      category: 'Repairs',
      pricingType: 'fixed',
      options: [
        { id: 'service-1-std', label: 'Standard check', price: 5000, durationMinutes: 60 },
      ],
    },
    {
      ...base,
      id: 'service-2',
      name: 'Screen Replacement',
      description: 'Genuine and compatible screens for most phone models.',
      category: 'Repairs',
      pricingType: 'starting_from',
      options: [
        { id: 'service-2-basic', label: 'Basic screen', price: 15000, durationMinutes: 90 },
        { id: 'service-2-oled', label: 'OLED screen', price: 35000, durationMinutes: 90 },
      ],
    },
    {
      ...base,
      id: 'service-3',
      name: 'Office Network Setup',
      description: 'Wi-Fi, cabling and router configuration.',
      category: 'Consulting',
      pricingType: 'on_request',
      deliveryMode: 'at_customer',
      options: [{ id: 'service-3-quote', label: 'Site visit', price: null, durationMinutes: null }],
    },
  ];
}

export function createSeedDb(version: number): MockDb {
  const listings: Listing[] = [...seedProducts(), ...seedServices()];

  return {
    version,
    users: [
      {
        id: DEMO_USER_ID,
        name: 'Demo Owner',
        email: DEMO_ACCOUNT.email,
        businessId: 'linko-store',
        createdAt: SEED_DATE,
        salt: DEMO_SALT,
        passwordHash: mockHash(DEMO_ACCOUNT.password, DEMO_SALT),
      },
    ],
    session: null,
    businesses: [
      { ...MOCK_BUSINESSES['linko-store'] },
      { ...MOCK_BUSINESSES['menuza-cafe'] },
    ],
    listings,
    resetTokens: [],
  };
}
