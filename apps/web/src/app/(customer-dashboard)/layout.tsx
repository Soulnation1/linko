import type { ReactNode } from 'react';
import { CartProvider } from '@/components/storefront/cart-provider';

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
