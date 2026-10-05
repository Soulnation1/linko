'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react';
import type { ReactNode } from 'react';
import { MOCK_MENU_ITEMS } from '@/lib/mock-data';
import type { MenuItem } from '@/types';

interface CartContextValue {
  quantities: Record<string, number>;
  items: Array<{ item: MenuItem; quantity: number }>;
  itemCount: number;
  subtotal: number;
  hydrated: boolean;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  customerNote: string;
  setCustomerNote: (note: string) => void;
}

const STORAGE_KEY = 'linko-customer-cart';
const CartContext = createContext<CartContextValue | null>(null);

const subscribeToHydration = () => () => {};
const getHydratedSnapshot = () => true;
const getServerHydrationSnapshot = () => false;

function readStoredCart(): Record<string, number> {
  const savedCart = window.localStorage.getItem(STORAGE_KEY);
  if (!savedCart) return {};

  const parsed: unknown = JSON.parse(savedCart);
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('Saved cart data must be an object.');
  }

  const quantities: Record<string, number> = {};
  for (const [itemId, quantity] of Object.entries(parsed)) {
    if (
      MOCK_MENU_ITEMS.some((item) => item.id === itemId && item.available) &&
      typeof quantity === 'number' &&
      Number.isInteger(quantity) &&
      quantity > 0
    ) {
      quantities[itemId] = quantity;
    }
  }
  return quantities;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      return readStoredCart();
    } catch (error) {
      console.error('Unable to restore the saved Linko cart.', error);
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch (cleanupError) {
        console.error(
          'Unable to remove the invalid saved Linko cart.',
          cleanupError
        );
      }
      return {};
    }
  });
  const [customerNote, setCustomerNote] = useState('');
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    getHydratedSnapshot,
    getServerHydrationSnapshot
  );

  useEffect(() => {
    if (!hydrated) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(quantities));
    } catch (error) {
      console.error('Unable to save the Linko cart.', error);
    }
  }, [hydrated, quantities]);

  const updateQuantity = useCallback((itemId: string, delta: number) => {
    const item = MOCK_MENU_ITEMS.find(
      (candidate) => candidate.id === itemId && candidate.available
    );
    if (!item || !Number.isInteger(delta)) return;

    setQuantities((current) => {
      const quantity = Math.max(0, (current[itemId] ?? 0) + delta);
      if (quantity === 0) {
        const next = { ...current };
        delete next[itemId];
        return next;
      }
      return { ...current, [itemId]: quantity };
    });
  }, []);

  const clearCart = useCallback(() => {
    setQuantities({});
    setCustomerNote('');
  }, []);

  const items = useMemo(
    () =>
      MOCK_MENU_ITEMS.flatMap((item) => {
        const quantity = quantities[item.id] ?? 0;
        return quantity > 0 ? [{ item, quantity }] : [];
      }),
    [quantities]
  );
  const itemCount = items.reduce((total, entry) => total + entry.quantity, 0);
  const subtotal = items.reduce(
    (total, entry) => total + entry.item.price * entry.quantity,
    0
  );

  const value = useMemo(
    () => ({
      quantities,
      items,
      itemCount,
      subtotal,
      hydrated,
      updateQuantity,
      clearCart,
      customerNote,
      setCustomerNote,
    }),
    [
      quantities,
      items,
      itemCount,
      subtotal,
      hydrated,
      updateQuantity,
      clearCart,
      customerNote,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside the customer cart provider.');
  }
  return context;
}
