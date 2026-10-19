'use client';

import { create } from 'zustand';
import type { UserAccount } from '@linko/domain';
import {
  getSession,
  requestPasswordReset,
  resetPassword,
  signIn,
  signOut,
  signUp,
  type ForgotPasswordInput,
  type ResetPasswordInput,
  type SignInInput,
  type SignUpInput,
} from '@/lib/auth';
import { failure, success, type ActionResult } from './action-result';
import { useBusinessStore } from './business-store';
import { useListingsStore } from './listings-store';

type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated';

type AuthState = {
  status: AuthStatus;
  user: UserAccount | null;
  hydrate: () => Promise<void>;
  signIn: (input: SignInInput) => Promise<ActionResult>;
  signUp: (input: SignUpInput) => Promise<ActionResult>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
  requestPasswordReset: (
    input: ForgotPasswordInput,
  ) => Promise<ActionResult & { resetToken?: string | null }>;
  resetPassword: (input: ResetPasswordInput) => Promise<ActionResult>;
};

let hydration: Promise<void> | null = null;

export const useAuthStore = create<AuthState>((set, get) => ({
  status: 'idle',
  user: null,

  // Safe to call from many components: the session is only read once.
  hydrate: () => {
    if (get().status !== 'idle') return Promise.resolve();
    hydration ??= (async () => {
      set({ status: 'loading' });
      const user = await getSession();
      set({ user, status: user ? 'authenticated' : 'unauthenticated' });
    })().finally(() => {
      hydration = null;
    });
    return hydration;
  },

  signIn: async (input) => {
    try {
      const user = await signIn(input);
      set({ user, status: 'authenticated' });
      return success;
    } catch (error) {
      return failure(error);
    }
  },

  signUp: async (input) => {
    try {
      const user = await signUp(input);
      set({ user, status: 'authenticated' });
      return success;
    } catch (error) {
      return failure(error);
    }
  },

  signOut: async () => {
    await signOut();
    useBusinessStore.getState().reset();
    useListingsStore.getState().reset();
    set({ user: null, status: 'unauthenticated' });
  },

  // Re-reads the account, e.g. after onboarding links a business to it.
  refresh: async () => {
    const user = await getSession();
    set({ user, status: user ? 'authenticated' : 'unauthenticated' });
  },

  requestPasswordReset: async (input) => {
    try {
      const { resetToken } = await requestPasswordReset(input);
      return { ...success, resetToken };
    } catch (error) {
      return failure(error);
    }
  },

  resetPassword: async (input) => {
    try {
      await resetPassword(input);
      return success;
    } catch (error) {
      return failure(error);
    }
  },
}));
