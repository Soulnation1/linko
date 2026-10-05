# Linko — Style Guide v2 (Signal Blue)
For: coding agent in IDE · Replaces the earlier warm/artisanal design tokens entirely

---

## 1. What this replaces

The project was previously set up with a warm palette (ivory/charcoal/clay) and a serif+sans font pairing (Fraunces + Public Sans). The client did not like that direction. **Replace it fully** with the tokens below — don't layer the new system on top of the old one.

Specifically remove/replace:
- Drop the Fraunces font entirely (no serif anywhere in the product now)
- Drop the ivory/charcoal/clay/olive/gold/sky color tokens
- Drop the dotted/dashed divider convention (solid vs. dotted vs. dashed borders meaning different things) — this system uses plain borders + shadow-based elevation instead, see §4

## 2. Color tokens

Replace the color section of `tailwind.config.ts`:

```ts
colors: {
  indigo: '#4F46E5',
  'indigo-dark': '#4338CA',
  ink: '#0F172A',
  muted: '#64748B',
  surface: '#F7F8FA',
  border: '#EAECF0',
  green: '#16A34A',
  amber: '#D97706',
  red: '#DC2626',
},
```

**Usage rules:**
- `indigo` is the single primary action color — one primary button per screen, nothing else uses it decoratively
- `ink` (#0F172A) is the default text color; `muted` (#64748B) for secondary text
- `surface` (#F7F8FA) is the default page background; `white` is reserved for cards/surfaces sitting on top of it
- `green` / `amber` / `red` are reserved strictly for status meaning (live / pending / error) — never used elsewhere in the UI just because they look nice

## 3. Typography

Single typeface now — no serif pairing:

```ts
fontFamily: {
  sans: ['var(--font-inter)', 'sans-serif'],
  mono: ['var(--font-jetbrains-mono)', 'monospace'],
}
```

Load Inter (weights 400/500/600/700/800) and JetBrains Mono via `next/font/google` in the root layout. Remove any Fraunces font loading.

**Type scale:** 32 / 20 / 14.5 / 11.5 / 13px as arbitrary Tailwind values — `text-[32px] font-extrabold` for display, `text-[20px] font-bold` for headings, `text-[14.5px]` for body, `text-[11.5px] font-semibold` for labels, `font-mono text-[13px]` for data-like strings (links, prices in dense tables).

Hierarchy comes from **weight and size**, not from switching fonts — that's the core difference from the old system.

## 4. Elevation (replaces the old divider-meaning system)

Three levels, used consistently instead of ad-hoc shadows:

```css
/* Level 1 — default card/list row */
border: 1px solid #EAECF0;

/* Level 2 — raised card, dropdown */
box-shadow: 0 1px 3px rgba(15,23,42,0.08), 0 1px 2px rgba(15,23,42,0.04);

/* Level 3 — modal, popover */
box-shadow: 0 10px 24px rgba(15,23,42,0.12);
```

As Tailwind utilities, define these as a `shadow` scale extension (`shadow-elevation-1/2/3`) rather than reaching for arbitrary box-shadow values inline each time.

Border radius: `rounded-lg` (10px) for buttons/inputs, `rounded-xl` (12px) for cards — consistent across the app, not varied per component.

## 5. Components

**Buttons** (`rounded-lg`, `font-semibold`, `text-[13.5px]`):
- Primary: `bg-indigo text-white`
- Secondary: `bg-indigo-50 text-indigo` (a very light indigo tint — add `indigo-50: '#EEF2FF'` to the color tokens if not already covered by a default Tailwind indigo scale)
- Ghost: `bg-transparent border border-border text-ink`

**Status badges** (`rounded-full`, `text-[11px] font-bold`, small dot + label):
- Live: `bg-green-100 text-green-700` (`#DCFCE7` / `#15803D`)
- Pending: `bg-amber-100 text-amber-700` (`#FEF3C7` / `#B45309`)
- Error/sold out: `bg-red-100 text-red-700` (`#FEE2E2` / `#B91C1C`)

**Form fields:** white background, `border border-border rounded-lg`, focus state `outline: 2px solid indigo` with 1px offset — not a default browser outline, and not a border-color-only focus state (needs to be visibly distinct for accessibility).

**Cards:** white background, elevation level 1 by default (border only), `rounded-xl`, `p-4`.

## 6. Principles (apply when extending the system to new screens)

1. **Clarity over character** — every choice should make the product read as trustworthy to a stranger within 2 seconds. This replaces the previous system's "warmth over time" goal.
2. **One primary, spent deliberately** — indigo appears on exactly one primary action per screen.
3. **Status colors mean one thing each** — green/amber/red are reserved for live/pending/error states only.
4. **Still vertical-neutral** — carried over from the previous system: no food-specific icons, copy, or motifs in shared components. Keep generic terms (`Listing`, not `Dish`).

## 7. What's unchanged from the earlier setup spec

The project architecture, folder structure, state management approach (Context for cart), and PWA configuration (manifest, service worker, icon requirements) from the original setup spec are unaffected by this — this document only replaces the design-token section of that earlier handoff.