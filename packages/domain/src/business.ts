export type OfferingType = 'products' | 'services' | 'both';
export type Industry =
  | 'food_drink'
  | 'beauty_wellness'
  | 'fashion_retail'
  | 'home_services'
  | 'events_catering'
  | 'education_coaching'
  | 'other';

export type ListingKind = 'product' | 'service';

export interface Business {
  id: string;
  slug: string;
  name: string;
  slogan?: string;
  motto?: string;
  location: string;
  logoUrl?: string | null;
  coverUrl?: string | null;
  accentColor?: string;
  whatsappNumber?: string;
  offeringType?: OfferingType;
  industry?: Industry;
}

export interface MenuItem {
  id: string;
  category: string;
  name: string;
  price: number;
  imageUrl?: string | null;
  available: boolean;
}

export interface CartLine {
  itemId?: string;
  listingId?: string;
  optionId?: string;
  quantity: number;
}

export interface ListingBase {
  id: string;
  businessId: string;
  kind: ListingKind;
  name: string;
  description: string;
  category: string;
  imageUrl: string | null;
  available: boolean;
}

export interface ProductListing extends ListingBase {
  kind: 'product';
  options: { id: string; label: string; price: number }[];
  trackStock: boolean;
  stockQty: number | null;
  leadTime: string | null;
}

export interface ServiceListing extends ListingBase {
  kind: 'service';
  pricingType: 'fixed' | 'starting_from' | 'on_request';
  options: {
    id: string;
    label: string;
    price: number | null;
    durationMinutes: number | null;
  }[];
  deliveryMode: 'at_business' | 'at_customer' | 'online' | 'flexible';
}

export type Listing = ProductListing | ServiceListing;