# Linko — Project Setup, Architecture, Style Guide & PWA Spec

For: coding agent in IDE · Scope: bootstrap the project itself (not screen-by-screen UI — that's a separate handoff)

---

## 1. Project setup

```bash
npx create-next-app@latest Linko --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

Confirm these choices when scaffolding:

- App Router (not Pages Router)
- `src/` directory: yes
- Import alias: `@/*`
- Tailwind: yes, and immediately replace the generated `tailwind.config.ts` theme with §4 below — don't build anything on the default Tailwind palette/type scale first and swap later

Additional dependencies to install:

```bash
npm install next-pwa
npm install -D @types/node
```

`next-pwa` handles service-worker generation and manifest wiring so we're not hand-rolling Workbox config. If a more recent equivalent has since become the standard, that's fine — the requirement is "a maintained Next.js PWA plugin that generates the service worker at build time," not this specific package name.

TypeScript config: enable `strict: true` in `tsconfig.json`. No `any` in new code — if a type is genuinely unknown at this stage (e.g. future API responses), use `unknown` and narrow it, not `any`.

## 2. Stack architecture

- Next.js App Router, TypeScript, Tailwind CSS, React function components + hooks only
- No backend yet — every data-fetching boundary should go through a single `lib/data/` layer (e.g. `getBusiness(slug)`, `getMenuItems(businessId)`) that currently reads from local mock fixtures but returns Promises, so swapping in real API/database calls later doesn't touch component code
- State: React Context for cross-page state that must survive client-side navigation (e.g. cart contents). Don't reach for Redux/Zustand unless the mock-data layer's complexity later demands it
- No component library (shadcn/MUI/etc.) — build primitives from scratch per the style guide below, so the product doesn't inherit a default visual identity we then have to fight

**Top-level structure:**

```
src/
  app/
    layout.tsx              -- root layout: fonts, PWA meta tags, manifest link
    manifest.ts              -- Next.js native manifest route (see §5)
    [businessSlug]/
      page.tsx                -- storefront
      cart/page.tsx
      confirm/page.tsx
  components/
    ui/                       -- shared primitives: Button, Badge, Divider, QuantityStepper
    storefront/
    cart/
    confirm/
  lib/
    data/                     -- data-access layer (mock now, real later)
    whatsapp.ts
    cart-context.tsx
  types/
    index.ts
  styles/
    globals.css
public/
  icons/                      -- PWA icon set, see §5
```

Naming conventions: components in PascalCase files matching the component name; one component per file; colocate a component's trivial sub-parts in the same file rather than fragmenting into many tiny files.

## 3. Design philosophy

The brand is **vertical-neutral** — the platform serves any small business (food, beauty, services), not just restaurants. Keep shared code and copy generic (`Listing`/`MenuItem`, not `Dish`). Two rules that should shape every screen going forward:

1. **The business is the star.** A business's own name/logo/cover leads every screen it appears on; the platform wordmark stays small and secondary.
2. **One accent, spent deliberately.** The business's accent color appears only on primary actions and small structural marks — never as a decorative background wash.

Avoid the generic AI-SaaS look: no uniform rounded-card-with-soft-shadow treatment on everything, no tracked-out uppercase eyebrow labels above every heading, no `→` appended to every link/button, no single accent color used as a wash across a whole section.

## 4. Style guide / design tokens

`tailwind.config.ts` theme extension:

```ts
theme: {
  extend: {
    colors: {
      ivory: '#F7F3ED',
      charcoal: '#211D1A',
      clay: '#C46A3F',     // default accent; real accent is runtime-dynamic, see below
      olive: '#5C6B4F',    // success / "live" / available
      gold: '#E8A93B',     // pending / trial state
      sky: '#4C7A8C',      // info / focus ring
      line: 'rgba(33,29,26,0.12)',
      muted: '#8A8177',
    },
    fontFamily: {
      serif: ['var(--font-fraunces)', 'serif'],
      sans: ['var(--font-public-sans)', 'sans-serif'],
      mono: ['var(--font-jetbrains-mono)', 'monospace'],
    },
  },
}
```

Load fonts via `next/font/google` in `app/layout.tsx` (Fraunces, Public Sans, JetBrains Mono), exposing each as a CSS variable and wiring those variables into the `fontFamily` config above — don't load fonts via a `<link>` tag.

**Type roles:**

- `font-serif` — identity moments only: business name, section headings. Never body copy or UI chrome.
- `font-sans` — everything functional: body text, buttons, labels, forms.
- `font-mono` — data-like strings: prices in dense tables, links, IDs.

**Type scale** (use as Tailwind arbitrary values, e.g. `text-[14.5px]` — don't force this onto Tailwind's default scale): `34 / 24 / 18 / 14.5 / 12.5 / 11px`.

**Accent color is per-business and runtime-dynamic**, not a static Tailwind color. Set it as a CSS custom property at the root of any business-scoped subtree:

```tsx
<div style={{ '--accent': business.accentColor } as React.CSSProperties}>
```

Reference it via Tailwind arbitrary values (`bg-[var(--accent)]`, `text-[var(--accent)]`). No shared component should have a specific hex baked in.

**Structural marks (borders) carry meaning:**

- Solid = boundary between unrelated sections
- Dotted = boundary between items within one list
- Dashed = draft/unpublished/editable boundary

**Spacing/radius:** use Tailwind's default spacing scale as-is (no custom scale needed); default border radius `rounded-lg`/`rounded-xl` for cards, `rounded-full` for avatars/pills/steppers.

**Motion:** reserve animation for state changes (saved, added to cart, published) — not decorative hover/entrance effects on every element. Respect `prefers-reduced-motion` everywhere motion is used.

## 5. PWA configuration

**Goal:** the product should be installable, and the customer-facing menu should remain usable (showing the last-cached menu) when offline — see original brief §21. Full install-prompt UX and business-side offline handling come later; this section just needs the technical foundation in place.

**`next.config.js`** — wrap the Next config with `next-pwa`:

```js
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});
module.exports = withPWA({
  /* existing next config */
});
```

**Manifest** — use Next's native `app/manifest.ts` (App Router convention) rather than a static `public/manifest.json`:

```ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Linko",
    short_name: "Linko",
    description: "Simple for businesses. Easy for customers.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F3ED",
    theme_color: "#211D1A",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
```

Icon assets needed in `public/icons/`: `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` (maskable = safe-zone padding per the maskable-icon spec), plus a favicon. Placeholder icons are fine for now — flag them clearly as placeholders so they get swapped before launch.

**Root layout requirements** (`app/layout.tsx`):

- `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />`
- Respect safe-area insets on any fixed/sticky element (the storefront's sticky order bar, in particular): `padding-bottom: env(safe-area-inset-bottom, 0px)` on that element, not just on `body`.
- `theme-color` meta tag matching the manifest's `theme_color`.

**Installability:**

- No mandatory install gate anywhere — the customer flow must work perfectly in a plain mobile browser tab, full stop. Only surface an install affordance later, and even then only as a dismissible, low-priority card — not an interrupting modal. Don't build any install-prompt UI in this pass; just make sure the manifest/service-worker setup is correct so the browser's native install criteria are met.

**Offline behavior (foundation only for this pass):**

- `next-pwa`'s default Workbox runtime caching is enough to start: it will cache visited pages/assets so a previously-viewed storefront can render from cache when offline.
- Leave a `TODO` in the storefront page component marking where an offline/stale-data indicator (e.g. "Showing the latest menu available on this device — last updated {time}") should be wired in once there's a real data layer with timestamps to reference. Don't fake a "last updated" timestamp against mock data.

## 6. What's explicitly out of scope for this pass

- Any actual screen/component implementation (separate handoff)
- Business dashboard, authentication, backend/database, payments
- Install-prompt UI and the richer offline UX described in the original product brief — only the technical PWA foundation (manifest + service worker + safe-area handling) is in scope now
