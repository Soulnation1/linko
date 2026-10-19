'use client';

import { useState } from 'react';
import { Input } from '@/components/ui';
import type { MenuItem } from '@/types';
import { MenuItemRow } from './menu-item-row';

export function MenuList({
  items,
  quantities,
  onQuantityChange,
}: {
  items: MenuItem[];
  quantities: Record<string, number>;
  onQuantityChange: (itemId: string, delta: number) => void;
}) {
  const [query, setQuery] = useState('');
  const term = query.trim().toLowerCase();
  const visibleItems = term
    ? items.filter((item) => item.name.toLowerCase().includes(term))
    : items;
  const categories = Array.from(new Set(visibleItems.map((item) => item.category)));

  return (
    <>
      <Input
        type="search"
        aria-label="Search menu items"
        placeholder="Search menu items..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="py-3"
      />

      <div className="space-y-8 pt-2">
        {categories.length === 0 && (
          <p className="text-sm text-theme-secondary">No items match your search.</p>
        )}
        {categories.map((category) => (
          <section key={category} className="space-y-3">
            <h2 className="text-xs font-bold tracking-wider text-theme-accent uppercase">
              {category}
            </h2>
            <div className="space-y-3">
              {visibleItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <MenuItemRow
                    key={item.id}
                    item={item}
                    quantity={quantities[item.id] || 0}
                    onQuantityChange={(delta) => onQuantityChange(item.id, delta)}
                  />
                ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
