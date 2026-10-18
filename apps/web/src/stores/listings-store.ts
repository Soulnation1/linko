'use client';

import { create } from 'zustand';
import type { Listing } from '@linko/domain';
import {
  createListing,
  deleteListing,
  listListings,
  setListingAvailability,
  updateListing,
  type ListingPatch,
  type NewListingInput,
} from '@/lib/data';
import { failure, success, type ActionResult } from './action-result';

type ListingsStatus = 'idle' | 'loading' | 'ready' | 'error';

type ListingsState = {
  businessId: string | null;
  listings: Listing[];
  status: ListingsStatus;
  error: string | null;
  load: (businessId: string) => Promise<ActionResult>;
  add: (input: NewListingInput) => Promise<ActionResult>;
  update: (id: string, patch: ListingPatch) => Promise<ActionResult>;
  toggleAvailability: (id: string) => Promise<ActionResult>;
  remove: (id: string) => Promise<ActionResult>;
  reset: () => void;
};

const initial = {
  businessId: null as string | null,
  listings: [] as Listing[],
  status: 'idle' as ListingsStatus,
  error: null as string | null,
};

export const useListingsStore = create<ListingsState>((set, get) => ({
  ...initial,

  load: async (businessId) => {
    set({ businessId, status: 'loading', error: null });
    try {
      const listings = await listListings(businessId);
      set({ listings, status: 'ready' });
      return success;
    } catch (error) {
      const result = failure(error);
      set({ status: 'error', error: result.ok ? null : result.error });
      return result;
    }
  },

  add: async (input) => {
    const { businessId } = get();
    if (!businessId) return failure(new Error('Load a business before adding listings.'));

    try {
      const listing = await createListing(businessId, input);
      set((state) => ({ listings: [...state.listings, listing] }));
      return success;
    } catch (error) {
      return failure(error);
    }
  },

  update: async (id, patch) => {
    try {
      const updated = await updateListing(id, patch);
      set((state) => ({
        listings: state.listings.map((listing) => (listing.id === id ? updated : listing)),
      }));
      return success;
    } catch (error) {
      return failure(error);
    }
  },

  // Optimistic: flips immediately and rolls back if the request fails.
  toggleAvailability: async (id) => {
    const previous = get().listings;
    const target = previous.find((listing) => listing.id === id);
    if (!target) return failure(new Error('Listing not found.'));

    set({
      listings: previous.map((listing) =>
        listing.id === id ? { ...listing, available: !listing.available } : listing,
      ),
    });

    try {
      await setListingAvailability(id, !target.available);
      return success;
    } catch (error) {
      set({ listings: previous });
      return failure(error);
    }
  },

  remove: async (id) => {
    try {
      await deleteListing(id);
      set((state) => ({ listings: state.listings.filter((listing) => listing.id !== id) }));
      return success;
    } catch (error) {
      return failure(error);
    }
  },

  reset: () => set(initial),
}));
