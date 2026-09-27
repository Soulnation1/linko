# Buynow — Customer UI Build Spec

For: coding agent in IDE · Scope: customer-facing flow only (storefront → cart → WhatsApp handoff) · Backend: not yet — use local component state / mock data

---

## 1. Stack

- Next.js (App Router), TypeScript
- React (function components + hooks, no class components)
- Tailwind CSS — extend the theme (see §3) rather than using arbitrary one-off values inline where a token exists
- No component library (no shadcn/MUI) — build primitives from scratch per this spec
- No backend/API calls yet. All data (business profile, menu items) comes from a local mock data file. Cart state lives in a React Context or a single page-level state — whichever the codebase already favors — so it persists across the storefront → cart → confirm screens without a backend.
- Mobile-first. Build for a ~390px viewport first, then adapt up to tablet/desktop per §7. Do not just scale the mobile layout up.

## 2. Design philosophy (read before styling anything)

The brand is intentionally **vertical-neutral** — this platform serves any small business (food, beauty, services), not just restaurants. Never hardcode food-specific icons, copy, or motifs into shared components. Menu-item terminology in code should stay generic (`Listing`, `MenuItem` — not `Dish`).

Two rules that shape every screen:

1. **The business is the star.** The business's own name/logo/cover leads every screen. The platform wordmark ("Buynow") stays small and secondary.
2. **One accent, spent deliberately.** The accent color (business-configurable) appears only on primary actions and small structural marks — never as a background wash or repeated decoration.

## 3. Design tokens

Add these to `tailwind.config.ts`:

```ts
colors: {
  ivory: '#F7F3ED',
  charcoal: '#211D1A',
  clay: '#C46A3F',      // default accent — businesses can override at runtime via CSS variable, see below
  olive: '#5C6B4F',     // success / "live" / available
  gold: '#E8A93B',      // pending / trial state
  sky: '#4C7A8C',       // info / focus ring
  line: 'rgba(33,29,26,0.12)',
  muted: '#8A8177',
},
fontFamily: {
  serif: ['Fraunces', 'serif'],       // identity moments: business name, headings
  sans: ['"Public Sans"', 'sans-serif'], // everything functional/UI
  mono: ['"JetBrains Mono"', 'monospace'], // data: prices, links, code-like strings
},
```

Load Fraunces, Public Sans, and JetBrains Mono via `next/font/google`.

**Accent color is runtime-dynamic per business** (set by the business in their settings, not a build-time Tailwind color). Implement it as a CSS custom property set at the storefront's root element:

```tsx
<div style={{ '--accent': business.accentColor } as React.CSSProperties}>
```

Then reference `var(--accent)` in Tailwind via arbitrary values: `bg-[var(--accent)]`, `text-[var(--accent)]`. Do not bake a specific hex into any shared component — always resolve through this variable so a business's color choice actually changes the UI.

**Type scale:** 34 / 24 / 18 / 14.5 / 12.5 / 11px. Use `text-[14.5px]` etc. (arbitrary values) rather than trying to force Tailwind's default scale to match — precision here matters more than convention.

**Structural marks (dividers) carry meaning — don't use one style everywhere:**

- Solid border (`border-line`) = boundary between unrelated sections
- Dotted border = boundary between items within one list (e.g. menu items, cart lines)
- Dashed border = draft/unpublished or editable boundary

**Avoid the generic AI-SaaS look:** no uniform rounded-card-with-soft-shadow treatment on everything, no tracked-out uppercase eyebrow labels above every heading, no `→` appended to every link, no single accent used as a decorative wash.

## 4. Data model

```ts
interface Business {
  id: string;
  name: string;
  motto: string;
  location: string;
  logoUrl: string | null; // null = render initials avatar
  coverUrl: string | null; // null = render accent gradient
  accentColor: string; // hex, e.g. "#C46A3F"
  whatsappNumber: string; // for wa.me link generation
}

interface MenuItem {
  id: string;
  category: string;
  name: string;
  price: number; // in kobo or naira — pick one and be consistent; examples below assume naira as an integer
  imageUrl: string | null; // null = render placeholder tile
  available: boolean;
}

interface CartLine {
  itemId: string;
  quantity: number;
}
```

Mock at least 5 items across 3 categories, with one `available: false` item, matching the reference build (Cappuccino, Cold Brew / Almond Croissant, Cinnamon Roll (sold out) / Avocado Toast).

## 5. Screens & required behavior

### 5.1 Storefront (`/[businessSlug]`)

**Layout, top to bottom:**

- Cover: full-width banner, `bg-gradient-to-br from-[var(--accent)] to-charcoal` when no `coverUrl`, else the image (`object-cover`), height ~120px on mobile
- Logo: circular, 52px, positioned overlapping the bottom of the cover (roughly half in/half out), white 3px border. Shows the uploaded logo image if present, else a two-letter initials monogram on an accent-colored background
- Business identity block below the cover: name in `font-serif font-bold text-[19px]`, motto in `text-[12px] text-muted italic` beneath it
- Category label (`text-[11px] font-bold text-[var(--accent)] tracking-wide`) above each group of items
- Item rows: a square image thumbnail (rounded, ~46px) + name + price, with a quantity stepper (− / count / +) on the right for available items
- **Sold-out items:** show a struck-through price and a small "Sold out" label in the accent color; do not render the quantity stepper; item must not be addable to cart
- Item images: use a real `<img>`/`next/image` when `imageUrl` is set; otherwise render a placeholder tile — a CSS gradient div is acceptable, but build it as a real component (`<ItemThumbnail>`) so swapping in real photos later is a one-line change, not a rewrite
- **Sticky order bar:** appears only when cart quantity > 0, fixed to the bottom of the viewport, accent-colored background, shows `"{count} item(s) · ₦{total}"` on the left and `"View order →"` on the right, tapping it navigates to the cart screen

### 5.2 Cart / order review (`/[businessSlug]/cart`)

- Back control to return to storefront
- One line per cart item: name + `"₦{price} × {qty}"` beneath it, total for that line right-aligned
- Total row below the list, visually separated with a solid top border, serif font, larger size
- Primary CTA: **"Continue on WhatsApp"** — full-width button, accent background
- Empty state if cart is empty: don't render a broken total — show a simple "Your cart is empty" message with a link back to the storefront

### 5.3 WhatsApp handoff (`/[businessSlug]/confirm`)

- Confirmation header: small olive-tinted circular checkmark icon, "Your order is ready" (serif heading), one line of supporting copy naming the business
- **Message preview:** label it clearly (e.g. "MESSAGE PREVIEW"), then render the _exact_ text that will be sent, inside a chat-bubble-styled block (rounded, one squared corner to read as a message bubble, pale green background is fine as a nod to WhatsApp but don't hardcode WhatsApp's actual brand green — use a muted equivalent). Message format, exactly:

  ```
  Hello {business.name} 👋
  I'd like to place an order:

  • {qty} × {item.name} — ₦{lineTotal}
  • {qty} × {item.name} — ₦{lineTotal}

  Total: ₦{cartTotal}
  ```

- Primary CTA: **"Open WhatsApp"** — this must be a real link, not a placeholder:
  `https://wa.me/{business.whatsappNumber}?text={encodeURIComponent(message)}`
  Open it in a new tab (`target="_blank" rel="noopener"`).
- Supporting microcopy under the button: "Opens WhatsApp with this message pre-filled."

## 6. Interaction / state rules

- Quantity steppers: `+` increments; `−` decrements to a floor of 0, and at 0 the item is removed from cart state entirely (don't keep a zero-quantity line around)
- Cart state must survive navigation between storefront → cart → confirm (Context, Zustand — whichever the project already uses — not per-page local state that resets)
- Recomputing totals: always derive `cartTotal` and the WhatsApp message from current cart + item data — never store a stale total in state
- All of this needs to work with **zero backend calls** for now — everything above is pure client-side state built from the mock `Business` and `MenuItem[]` data

## 7. Responsive behavior

- Mobile (default): single column, full-width, sticky bottom bar/CTA as described above
- Tablet/desktop: the customer flow can stay centered in a constrained max-width column (this is a "hold up your phone" experience even on a bigger screen — don't turn it into a multi-column dashboard layout). A `max-w-md mx-auto` type constraint on the whole customer flow is appropriate.

## 8. Accessibility & quality bar

- Every interactive element (stepper buttons, CTAs, back control) reachable and operable by keyboard, with a visible focus ring (use the `sky` token for focus rings, not a default browser blue)
- Real `<button>` elements for actions, not `<div onClick>`
- `alt` text on all item/business images (business name, item name)
- Respect `prefers-reduced-motion` for any transitions
- Color contrast: verify text over the cover/gradient area holds up against the darkest accent colors a business might pick, not just the default clay

## 9. What's explicitly out of scope for this pass

- Business-side dashboard/settings UI (separate spec, separate build)
- Authentication/login
- Any real backend, database, or persistence — mock data only
- Payment processing
- Real WhatsApp Business API integration (this is just the `wa.me` deep-link handoff, not automation)

## 10. Suggested file structure

```
app/
  [businessSlug]/
    page.tsx          -- storefront
    cart/page.tsx
    confirm/page.tsx
components/
  storefront/
    CoverHeader.tsx
    ItemRow.tsx
    ItemThumbnail.tsx
    CategoryLabel.tsx
    StickyOrderBar.tsx
  cart/
    CartLine.tsx
    TotalRow.tsx
  confirm/
    MessagePreview.tsx
lib/
  cart-context.tsx     -- or store, depending on chosen state approach
  whatsapp.ts           -- builds the wa.me URL + message string
  mock-data.ts          -- Business + MenuItem[] fixtures
types/
  index.ts              -- Business, MenuItem, CartLine
```
