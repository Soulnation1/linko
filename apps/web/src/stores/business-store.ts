'use client';

import { create } from 'zustand';
import type { Business } from '@linko/domain';
import {
  createBusinessForUser,
  getBusinessForUser,
  updateBusiness,
  type BusinessPatch,
  type NewBusinessInput,
} from '@/lib/data';
import { failure, success, type ActionResult } from './action-result';

type BusinessStatus = 'idle' | 'loading' | 'ready' | 'error';

type BusinessState = {
  business: Business | null;
  status: BusinessStatus;
  error: string | null;
  load: (userId: string) => Promise<ActionResult>;
  create: (userId: string, input: NewBusinessInput) => Promise<ActionResult>;
  update: (patch: BusinessPatch) => Promise<ActionResult>;
  reset: () => void;
};

const initial = { business: null, status: 'idle' as BusinessStatus, error: null };

export const useBusinessStore = create<BusinessState>((set, get) => ({
  ...initial,

  load: async (userId) => {
    set({ status: 'loading', error: null });
    try {
      const business = await getBusinessForUser(userId);
      set({ business, status: 'ready' });
      return success;
    } catch (error) {
      const result = failure(error);
      set({ status: 'error', error: result.ok ? null : result.error });
      return result;
    }
  },

  create: async (userId, input) => {
    try {
      const business = await createBusinessForUser(userId, input);
      set({ business, status: 'ready', error: null });
      return success;
    } catch (error) {
      return failure(error);
    }
  },

  update: async (patch) => {
    const current = get().business;
    if (!current) return failure(new Error('No business to update.'));

    try {
      const business = await updateBusiness(current.id, patch);
      set({ business });
      return success;
    } catch (error) {
      return failure(error);
    }
  },

  reset: () => set(initial),
}));
