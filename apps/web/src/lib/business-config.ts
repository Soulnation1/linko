import type { Business, Industry, ListingKind, OfferingType } from '@linko/domain';

export type BusinessTerms = {
  catalogNavLabel: string;
  singularNoun: string;
  addButtonLabel: string;
  emptyStateTitle: string;
  emptyStateDescription: string;
  ordersTitle: string;
};

export type IndustryPreset = {
  label: string;
  suggestedOfferingType: OfferingType;
  suggestedCategories: string[];
  terminology: BusinessTerms;
};

export const INDUSTRY_PRESETS: Record<Industry, IndustryPreset> = {
  food_drink: {
    label: 'Food & drink',
    suggestedOfferingType: 'products',
    suggestedCategories: ['Coffee & Drinks', 'Pastries', 'Breakfast', 'Lunch'],
    terminology: {
      catalogNavLabel: 'Menu',
      singularNoun: 'menu item',
      addButtonLabel: 'Add menu item',
      emptyStateTitle: 'No menu items yet',
      emptyStateDescription: 'Add your best sellers and daily specials.',
      ordersTitle: 'Orders',
    },
  },
  beauty_wellness: {
    label: 'Beauty & wellness',
    suggestedOfferingType: 'services',
    suggestedCategories: ['Hair', 'Skin', 'Massage', 'Wellness'],
    terminology: {
      catalogNavLabel: 'Services',
      singularNoun: 'service',
      addButtonLabel: 'Add service',
      emptyStateTitle: 'No services yet',
      emptyStateDescription: 'List services, packages and session durations.',
      ordersTitle: 'Bookings',
    },
  },
  fashion_retail: {
    label: 'Fashion & retail',
    suggestedOfferingType: 'products',
    suggestedCategories: ['Accessories', 'Apparel', 'Footwear', 'New Arrivals'],
    terminology: {
      catalogNavLabel: 'Products',
      singularNoun: 'product',
      addButtonLabel: 'Add product',
      emptyStateTitle: 'No products yet',
      emptyStateDescription: 'Showcase your newest drops and best sellers.',
      ordersTitle: 'Orders',
    },
  },
  home_services: {
    label: 'Home services',
    suggestedOfferingType: 'services',
    suggestedCategories: ['Cleaning', 'Repairs', 'Maintenance', 'Consulting'],
    terminology: {
      catalogNavLabel: 'Services',
      singularNoun: 'service',
      addButtonLabel: 'Add service',
      emptyStateTitle: 'No services yet',
      emptyStateDescription: 'Add the services clients can book or request.',
      ordersTitle: 'Bookings',
    },
  },
  events_catering: {
    label: 'Events & catering',
    suggestedOfferingType: 'both',
    suggestedCategories: ['Packages', 'Add-ons', 'Events', 'Catering'],
    terminology: {
      catalogNavLabel: 'Catalog',
      singularNoun: 'listing',
      addButtonLabel: 'Add listing',
      emptyStateTitle: 'No listings yet',
      emptyStateDescription: 'Add catalog items or services to start taking orders.',
      ordersTitle: 'Orders & bookings',
    },
  },
  education_coaching: {
    label: 'Education & coaching',
    suggestedOfferingType: 'services',
    suggestedCategories: ['Courses', 'Coaching', 'Workshops', 'Consultations'],
    terminology: {
      catalogNavLabel: 'Services',
      singularNoun: 'service',
      addButtonLabel: 'Add service',
      emptyStateTitle: 'No services yet',
      emptyStateDescription: 'Add classes, sessions and coaching packages.',
      ordersTitle: 'Bookings',
    },
  },
  other: {
    label: 'Other',
    suggestedOfferingType: 'both',
    suggestedCategories: ['Featured', 'Popular', 'New', 'Custom'],
    terminology: {
      catalogNavLabel: 'Catalog',
      singularNoun: 'listing',
      addButtonLabel: 'Add listing',
      emptyStateTitle: 'No listings yet',
      emptyStateDescription: 'Create your first catalog item or offer.',
      ordersTitle: 'Orders & bookings',
    },
  },
};

export const LISTING_KIND_CONFIG: Record<
  ListingKind,
  {
    label: string;
    pluralLabel: string;
    fields: string[];
  }
> = {
  product: {
    label: 'Product',
    pluralLabel: 'Products',
    fields: ['name', 'description', 'category', 'image', 'availability', 'options', 'stock'],
  },
  service: {
    label: 'Service',
    pluralLabel: 'Services',
    fields: ['name', 'description', 'category', 'image', 'availability', 'pricing', 'options', 'delivery'],
  },
};

export function getTerms(business?: Partial<Business> | null): BusinessTerms {
  const offeringType = business?.offeringType ?? 'both';
  const industry = business?.industry ?? 'other';
  const preset = INDUSTRY_PRESETS[industry];

  if (offeringType === 'products') {
    return {
      catalogNavLabel: 'Products',
      singularNoun: 'product',
      addButtonLabel: 'Add product',
      emptyStateTitle: 'No products yet',
      emptyStateDescription: 'Add your first product to start selling.',
      ordersTitle: 'Orders',
    };
  }

  if (offeringType === 'services') {
    return {
      catalogNavLabel: 'Services',
      singularNoun: 'service',
      addButtonLabel: 'Add service',
      emptyStateTitle: 'No services yet',
      emptyStateDescription: 'Add your first service to start taking bookings.',
      ordersTitle: 'Bookings',
    };
  }

  return preset.terminology;
}

export function formatNaira(value: number): string {
  const safeValue = Number.isFinite(value) ? Math.round(value) : 0;

  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(safeValue);
}

export function formatOptionPrice(
  value: number | null | undefined,
  pricingType?: 'fixed' | 'starting_from' | 'on_request',
): string {
  if (pricingType === 'on_request' || value == null) {
    return 'Price on request';
  }

  return formatNaira(value);
}
