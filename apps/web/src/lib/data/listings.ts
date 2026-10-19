import type { Listing, ProductListing, ServiceListing } from '@linko/domain';
import { DataError } from './businesses';
import { createId, simulateLatency } from './latency';
import { readDb, updateDb } from './storage';

type DistributiveOmit<T, K extends keyof T> = T extends unknown ? Omit<T, K> : never;

export type NewListingInput = DistributiveOmit<Listing, 'id' | 'businessId'>;
export type ListingPatch =
  | Partial<Omit<ProductListing, 'id' | 'businessId' | 'kind'>>
  | Partial<Omit<ServiceListing, 'id' | 'businessId' | 'kind'>>;

export async function listListings(businessId: string): Promise<Listing[]> {
  await simulateLatency();
  return readDb()
    .listings.filter((listing) => listing.businessId === businessId)
    .map((listing) => ({ ...listing }));
}

export async function getListing(id: string): Promise<Listing | null> {
  await simulateLatency();
  const listing = readDb().listings.find((candidate) => candidate.id === id);
  return listing ? { ...listing } : null;
}

export async function createListing(
  businessId: string,
  input: NewListingInput,
): Promise<Listing> {
  await simulateLatency();

  return updateDb((db) => {
    if (!db.businesses.some((business) => business.id === businessId)) {
      throw new DataError('NOT_FOUND', 'Business not found.');
    }

    const listing = { ...input, id: createId('lst'), businessId } as Listing;
    db.listings.push(listing);
    return { ...listing };
  });
}

export async function updateListing(id: string, patch: ListingPatch): Promise<Listing> {
  await simulateLatency();

  return updateDb((db) => {
    const index = db.listings.findIndex((candidate) => candidate.id === id);
    if (index === -1) throw new DataError('NOT_FOUND', 'Listing not found.');

    const updated = { ...db.listings[index], ...patch } as Listing;
    db.listings[index] = updated;
    return { ...updated };
  });
}

export async function setListingAvailability(
  id: string,
  available: boolean,
): Promise<Listing> {
  return updateListing(id, { available });
}

export async function deleteListing(id: string): Promise<void> {
  await simulateLatency();

  updateDb((db) => {
    const index = db.listings.findIndex((candidate) => candidate.id === id);
    if (index === -1) throw new DataError('NOT_FOUND', 'Listing not found.');
    db.listings.splice(index, 1);
  });
}
