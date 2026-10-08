# Linko — Business Side Build (v2)
For: coding agent in IDE · The customer pages are already built. This prompt covers the business side AND a defined set of changes to the existing customer pages (section 9) so both sides agree on business types. Backend and real auth are NOT part of this pass, so mock everything.

This version replaces the earlier business prompt. Two things changed: (1) the app shell is now a conventional web-app layout (sidebar + topbar + scrollable content, hamburger drawer on mobile) instead of a floating bottom nav, and (2) listings and forms now adapt to what a business offers (products, services, or both).

Scope: 16 business pages across 17 routes (the listing form is one page on two routes), a not-found route, one shared reusable success modal, and the customer-side changes in section 9.

**Suggested build order:** (1) shared types, config, `getTerms`, `formatNaira` and the cart changes from section 9A, (2) the customer-side changes in 9B to 9D, (3) the app shell, (4) auth and onboarding, (5) the remaining dashboard pages.

---

## 0. Design system

Signal Blue tokens, same as the customer side (see `linko-styleguide-spec.md`): `indigo #4F46E5`, `ink #0F172A`, `muted #64748B`, `surface #F7F8FA`, `border #EAECF0`, green/amber/red for status only. Inter only, no serif. Page background is `surface`; white is for cards, inputs, sidebar and topbar. One primary indigo action per screen. Define colors as CSS variables so a light/dark theme switcher can be added later without touching components.

The business name is the star of the workspace: it leads the sidebar, the drawer and the mobile topbar. "Linko" stays secondary.

## 1. App shell and responsive layout

The business side is a normal web app that is also an installable PWA. Many business owners will use it on a phone, so the same app must be fully usable on small screens. Do not build separate mobile and desktop apps; build one responsive shell.

**Large screens (`lg`, 1024px and up)**
- Fixed left **sidebar** (about 256px): business logo + name at the top, then the nav items, then Log out at the bottom
- **Topbar** across the top of the content column: current section title on the left; on the right the live link pill (slug, Copy, Preview), a notifications bell (stub) and an account menu (avatar with Profile, Help, Log out)
- The **scrollable content area sits in the middle**: sidebar and topbar stay fixed and only the main region scrolls. Implement it as a `h-dvh` flex layout, `overflow-hidden` on the shell, `overflow-y-auto` on `<main>`, and render the route's `children` (the layout's outlet) inside a centered `max-w-5xl` container with padding
- Never let the `<body>` scroll; the main region owns scrolling

**Below `lg` (phones and portrait tablets)**
- The sidebar is hidden. The topbar becomes compact: a **3-bar hamburger icon** (`lucide-react` `Menu`) on the left, the business name beside it, and the avatar on the right
- Tapping the hamburger opens a **slide-in drawer** from the left (width `min(85vw, 320px)`) over a dimmed overlay. It contains the logo + business name with a close (X) button, the same nav items as the sidebar, and Log out
- The drawer closes on: nav item tap (route change), overlay tap, close button, Escape
- Drawer accessibility: `role="dialog"`, `aria-modal="true"`, hamburger has `aria-expanded` and `aria-controls`, focus is trapped inside while open and returned to the hamburger on close, body scroll locked while open. Animate with `framer-motion` (slide), and skip the animation under `prefers-reduced-motion`

**Single source of truth for navigation.** Define the nav items once in `lib/nav.ts` (href, label, icon, active-match rule) and render both the sidebar and the drawer from it. Nav labels come from the terminology helper in section 2.4 (for example "Menu", "Products", "Services" or "Catalog"). Items: Dashboard, Catalog, Orders, Share & QR, Settings. Active item style: light indigo background with indigo text and semibold weight, not a solid fill.

**Other shell rules**
- Auth pages and onboarding render outside the shell (no sidebar or topbar), using `AuthLayout`
- Touch targets at least 44px on every interactive control
- PWA safe areas: topbar `padding-top: env(safe-area-inset-top)`, drawer and any sticky bottom bar `padding-bottom: env(safe-area-inset-bottom)`
- On phones, the form save action is a sticky bar at the bottom of the main scroll area (inset, rounded, shadow). On `lg` it sits inline at the end of the form
- `OfflineBanner` renders directly under the topbar when the connection drops ("You're offline. Some changes may not be saved until you're back online.")
- Tables and wide content scroll inside their own container, never the page sideways

**PWA note for the business app (recommended).** Installed business users should open straight into the workspace. Add a second manifest, `app/manifest-business.webmanifest/route.ts`, with `name: "Linko Business"`, `start_url: "/dashboard"`, `display: "standalone"`, same icons and colors. Reference it through `metadata.manifest` in the `(auth)` and `dashboard` layouts. Customer routes keep the default manifest.

## 2. Business types: handling products, services, or both

Linko serves any business, so the forms and wording must adapt to what a business offers. Solve this with **configuration, not separate code paths**. Components never check for specific industries; they read from config and from the business's offering type.

### 2.1 Data model

```ts
type OfferingType = 'products' | 'services' | 'both';
type Industry =
  | 'food_drink' | 'beauty_wellness' | 'fashion_retail'
  | 'home_services' | 'events_catering' | 'education_coaching' | 'other';

interface Business {
  id: string; slug: string; name: string; slogan: string; location: string;
  whatsappNumber: string; logoUrl: string | null; coverUrl: string | null;
  accentColor: string;
  offeringType: OfferingType;
  industry: Industry;
}

type ListingKind = 'product' | 'service';

interface ListingBase {
  id: string; businessId: string; kind: ListingKind;
  name: string; description: string; category: string;
  imageUrl: string | null; available: boolean;
}

interface ProductListing extends ListingBase {
  kind: 'product';
  options: { id: string; label: string; price: number }[];   // sizes / variants
  trackStock: boolean; stockQty: number | null;
  leadTime: string | null;                                    // e.g. "Order 2 days ahead"
}

interface ServiceListing extends ListingBase {
  kind: 'service';
  pricingType: 'fixed' | 'starting_from' | 'on_request';
  options: { id: string; label: string; price: number | null; durationMinutes: number | null }[]; // packages / tiers
  deliveryMode: 'at_business' | 'at_customer' | 'online' | 'flexible';
}

type Listing = ProductListing | ServiceListing;
```

Put these in `types/` and share them with the customer side. When `pricingType` is `on_request`, option prices are `null`.

### 2.2 Choosing the type (onboarding and settings)

- Onboarding asks **"What do you offer?"** first, with three large selectable cards: Products, Services, Both. Then an optional industry chip list (with "Other"). Picking an industry pre-selects a sensible offering type and loads its presets, but the business can override both.
- Settings > Business profile lets them change offering type and industry later. Changing it never deletes or hides existing listings; it only controls which kinds of listing can be created from then on. Show a short helper note saying so.

### 2.3 Config-driven forms

Create `lib/business-config.ts` containing:
- `INDUSTRY_PRESETS`: per industry, a label, a suggested offering type, suggested listing categories (shown as quick-pick chips in the category field, still free-text), and its terminology (see 2.4)
- `LISTING_KIND_CONFIG`: per kind, the field sections to render and their labels

`ListingForm` renders from this config. Shared fields for every listing: name, description, category, image (`ImageUpload`), availability. Then kind-specific fields:

- **Product**: options as "Sizes / variants" (label + price per row, at least one), optional "Track stock" toggle that reveals a quantity input, optional lead time
- **Service**: pricing type (Fixed price, Starting from, Price on request); options as "Packages" (label + price + duration in minutes per row, price hidden when pricing is on request); delivery mode (At our location, We come to you, Online, Flexible)

Rules:
- Business offers only products or only services: the kind is fixed and no selector is shown
- Business offers both: when creating, show a "Product / Service" segmented control at the top of the form; when editing, the kind is locked
- Build the zod schema as a **discriminated union on `kind`** so validation matches the visible fields. Use `useFieldArray` for options, with add and remove controls
- Use one reusable `OptionsEditor` component, parameterized by which columns to show (price only for products; price + duration for services)

### 2.4 Terminology helper

Create `getTerms(business)` returning wording for the business, so labels are data and not hardcoded: catalog nav label ("Menu" for food and drink, "Products" for products-only, "Services" for services-only, "Catalog" for both), singular noun, add-button text ("Add menu item", "Add product", "Add service", "Add listing"), empty-state copy, and the orders page title ("Orders", "Bookings", or "Orders & bookings"). Use it for the nav, page headings, buttons and empty states. Keep shared component and type names generic (`Listing`, never `Dish`).

### 2.5 Impact on the customer side

The customer pages already exist. The changes they need because of this decision are listed in full in **section 9**. Do the shared foundation in 9A before building the business listing form, since both sides use the same types and helpers.

## 3. Routes

```
app/
  (auth)/
    login/page.tsx
    signup/page.tsx
    forgot-password/page.tsx
    reset-password/page.tsx          -- reads ?token= from the URL
    onboarding/page.tsx              -- shown once, right after signup
  dashboard/
    layout.tsx                       -- DashboardShell wraps everything below
    page.tsx                         -- home
    listings/page.tsx
    listings/new/page.tsx            -- shares ListingForm with edit
    listings/[id]/edit/page.tsx
    orders/page.tsx
    share/page.tsx
    settings/page.tsx                -- hub
    settings/profile/page.tsx
    settings/branding/page.tsx
    settings/notifications/page.tsx
    settings/payout/page.tsx
    settings/help/page.tsx
    not-found.tsx
```

Route paths stay generic (`/listings`, `/orders`) even though the visible labels come from `getTerms`.

## 4. Shared components (build these first)

### 4.1 `SuccessModal` (reusable, used app-wide)

One component, one API, used for every milestone confirmation so success feedback looks identical everywhere.

```ts
interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  primaryAction: { label: string; onClick?: () => void; href?: string };
  secondaryAction?: { label: string; onClick?: () => void; href?: string };
  autoCloseMs?: number;            // optional, off by default
}
```

Also expose an imperative hook, `useSuccessModal().show({ ...props })`, backed by a small Zustand store and a single `<SuccessModalHost />` mounted once in the root layout, so any page can trigger it without owning modal state.

Visual: centered card on a dimmed overlay, `rounded-xl`, elevation level 3. A circular green-tinted check icon (`lucide-react` `Check`), bold title, optional muted message, a full-width indigo primary button, and an optional ghost secondary below it.

Behavior and accessibility: render in a portal; `role="dialog"`, `aria-modal="true"`, `aria-labelledby` on the title; trap focus; Escape and overlay click close it; return focus to the trigger; lock body scroll; fade plus slight scale with `framer-motion`, skipped under `prefers-reduced-motion`.

Use it for: sign-up complete, reset email sent, password updated, onboarding complete ("Your page is live"), listing saved, profile saved, branding saved. Use `sonner` toasts for lightweight feedback instead (link copied, availability toggled, listing deleted). The modal is for milestones; toasts are for small acknowledgements.

### 4.2 Other shared components

- `AuthLayout`: shared by login, signup, forgot-password, reset-password (Linko badge mark, centered card on `surface`, slots for heading, subtext and footer link)
- `DashboardShell`, `Sidebar`, `Topbar`, `MobileDrawer` (section 1)
- `ConfirmDialog`: for destructive actions such as delete. Separate from `SuccessModal`, same accessibility rules
- `ImageUpload`: file picker with preview for logo, cover and listing images. Local read for the mock, validates type and size (images only, 5 MB max), shows an error message on failure
- `OptionsEditor`, `SearchInput`, `StatusBadge` (Live, Sold out, New, Sent to WhatsApp, Completed), `EmptyState`, `OfflineBanner`

## 5. Page specs

All forms use `react-hook-form` with `zod` via `@hookform/resolvers`. Errors show beneath each field, submit is disabled while submitting (no double submit), password fields have a show/hide toggle.

### 5.1 Auth pages

- **Login**: email, password, "Forgot password?" link, link to sign up. Success goes to `/dashboard`, or to `/onboarding` if onboarding is incomplete.
- **Sign up**: business name, owner name, email, password (min 8). On success open `SuccessModal` ("Account created"), primary action goes to `/onboarding`.
- **Forgot password**: email only. Always show the same confirmation whether or not the email exists: `SuccessModal` "Check your email" with a message like "If an account exists for that address, we've sent a reset link." Never reveal whether the account exists.
- **Reset password**: new password plus confirm password (must match), token from `?token=`. Three states: valid token (form), missing or invalid or expired token (error state with a link back to forgot-password), success (`SuccessModal` "Password updated", primary action goes to `/login`).

### 5.2 Onboarding (`/onboarding`)

A short multi-step wizard with a progress indicator, back and next, and per-step validation. Shown once after sign-up.
1. **What do you offer?** Products / Services / Both, then optional industry
2. **Business details**: business name (prefilled), public URL slug (generated from the name, editable, lowercase letters, numbers and hyphens only, mock availability check, plain warning that the link is permanent), location, WhatsApp number (required, ordering depends on it), short slogan
3. **Look and feel**: logo and cover photo (both optional), accent color swatches, with a live preview of the customer storefront header

On finish open `SuccessModal` "Your page is live" showing the public link, primary action "Go to dashboard".

### 5.3 Dashboard home (`/dashboard`)

- "Welcome back, {businessName}" with the business name prominent
- Live link pill with Copy (toast) and Preview (opens `/{slug}/cart-preview` in a new tab)
- Quick actions: Share & QR, Manage catalog, and an Add action that uses the `getTerms` wording
- Four stat cards: Views, Orders initiated, Listings, Categories (mock, derived from mock data where possible)
- Recent activity list (mock)
- Optional dismissible "Install your business app" card, shown only when the browser's `beforeinstallprompt` is available. Subtle, never a blocking popup

### 5.4 Listings (`/dashboard/listings`)

- Header with category and item counts and an Add button (wording from `getTerms`)
- **Search**: live, case-insensitive filter by name (searching "cappuccino" finds it). Keep input focus while typing. Show a no-results state naming the query. Counts reflect the full list, not the filtered one.
- When the business offers both, add a filter control (All / Products / Services)
- Grouped by category. Each row: thumbnail, name, price ("from ₦X" when there are several options, "Price on request" when applicable, duration for services), a status badge that doubles as the availability toggle (Live / Sold out), and edit and delete controls. Delete goes through `ConfirmDialog`, then a toast
- Empty state with a clear "add first listing" action
- Reordering is a later enhancement

### 5.5 Add / edit listing

One `ListingForm` on `/listings/new` and `/listings/[id]/edit` (prefilled), rendered from config as described in 2.3. On save open `SuccessModal` "Listing saved" with primary "Back to listings" and secondary "Add another".

### 5.6 Orders (`/dashboard/orders`)

A light list, not a POS. Filter by New / Sent to WhatsApp / Completed. Each row: short ID, time, item summary, total (shared formatter), status badge, and a "Mark completed" action. Page title from `getTerms` (Orders, Bookings, or Orders & bookings). Empty state per filter.

### 5.7 Share & QR (`/dashboard/share`)

Permanent public link with Copy. A large QR code generated with the `qrcode` package, encoding the full `/{slug}/cart-preview` URL. Actions: Download QR (PNG) and Share (Web Share API, falling back to copy). Show where to use it: tables, counter, flyers, packaging (wording adapted for services where it fits). Make clear the QR stays valid when prices or items change.

### 5.8 Settings

- **Hub** (`/dashboard/settings`): opens on a profile summary (logo, name, location, phone, email), not straight into branding. Then grouped rows: ACCOUNT (Business profile, Branding & appearance), PREFERENCES (Notifications, Payout details), SUPPORT (Help & support), then Log out.
- **Profile**: name, location, phone, email, offering type, industry. Save opens `SuccessModal`.
- **Branding**: slogan, logo, cover photo, accent color, with a live preview of the customer storefront header. Save opens `SuccessModal`. The accent color is stored on the business and applied on the customer side through the CSS variable approach used there.
- **Notifications**: a few local toggles. **Payout**: empty state, "Not connected". **Help**: contact options. These three are simple stubs.

### 5.9 `not-found.tsx` (dashboard)

Friendly message with a link back to `/dashboard`.

## 6. Data and mocking

- All data access behind `lib/data/` functions returning Promises, and all auth behind a `lib/auth/` mock (sign up, log in, request reset, reset password, current business), with a short artificial delay so loading and submitting states are real. Swapping in a real backend later should not touch component code.
- State: Zustand for the mock business profile and listings; persisting to `localStorage` is fine for the demo.
- Seed at least two mock businesses of different types (for example a café that sells products and a salon that sells services) so both form variants can be exercised.
- No real sessions or route protection yet. Leave a clearly marked `TODO(auth)` in `dashboard/layout.tsx` where the guard goes.
- One `formatNaira(n)` helper, shared with the customer side, for every price. Never hardcode the currency symbol anywhere else.

## 7. Rules carried over from the customer build

- The sold-out strikethrough is its own isolated class, never reused for totals or line prices
- Page background is `surface`, never pure white
- Floating treatment (inset, rounded, shadow) for sticky primary actions on mobile
- Images appear on both the customer and business interfaces (listing thumbnails, logo, cover)

## 8. Accessibility

Real `<button>` and `<a>` elements, labels on every input, visible `indigo` focus rings, `alt` text on images, keyboard-operable modals, drawers and dialogs, `prefers-reduced-motion` respected, color never the only carrier of meaning (status badges also carry text).

## 9. Customer-side changes (existing pages: modify in place, do not rebuild)

The customer routes already exist: `/[businessSlug]/cart-preview`, `/cart`, `/complete-order` and `not-found`. Keep their layout, tokens, floating CTAs, the no-back-button rule on the entry page, the isolated sold-out strikethrough class and the single `formatNaira` helper exactly as they are. Apply only the changes below.

### 9A. Shared foundation (do first)

- **Shared types.** Replace the customer `MenuItem` type with the shared `Listing` union (`ProductListing | ServiceListing`) and `Business` from section 2.1. Update the customer mock data to use them. Give the existing mock business an `offeringType` and `industry`, and add a second mock business that sells services (for example a salon) so both variants can be opened at their own slugs.
- **Cart lines are keyed by listing and option.** Change the cart line shape to `{ listingId, optionId, quantity }`, so "Chicken, Large" and "Chicken, Small" are separate lines. Update `useCartStore` accordingly.
- **Cart is scoped per business.** Key cart state by business slug, or clear it when the slug changes, so items from one business never appear on another business's pages. This is a multi-tenant correctness fix.
- **Helpers in `lib/`:** `getTerms(business)` (shared with the business side), `formatNaira`, a `formatOptionPrice(...)` that returns "Price on request" when a service is priced that way, and cart selectors that exclude unpriced lines from the total and report how many unpriced lines there are.

### 9B. `cart-preview` (menu)

- **Options inline.** A listing with several options renders one row per option, each with its own control. A single-option listing renders one row.
- **Products** keep the quantity stepper.
- **Services** use a simple Add / Added toggle (quantity fixed at 1) instead of a stepper, and show duration next to the price, for example "45 min · ₦8,000".
- **Price on request:** show "Price on request" in muted text instead of a price. It can still be added, but it does not count toward the total.
- **Floating order bar:** the label comes from `getTerms` ("View order", "View booking" or "View request"). When the cart has unpriced lines, append a short note such as "+ price on request" after the total.
- Sold-out behavior and the header are unchanged.

### 9C. `cart`

- Page title from `getTerms` ("Your order", "Your booking" or "Your request").
- Each line shows its option label (for example "Chicken, Large"), and the duration for services.
- The quantity pill appears for product lines only. Service lines show no stepper, just the delete icon.
- Total row sums priced lines only. If any lines are unpriced, show a muted line under the total such as "1 item will be priced by the business".
- The CTA stays "Continue on WhatsApp".

### 9D. `complete-order`

Build the message in one function, `buildWhatsAppMessage(business, cart, listings)` in `lib/whatsapp.ts`, and write unit tests for each case below. Examples:

```
Products only
Hello {name} 👋
I'd like to place an order:

• 2 × Chicken, Large — ₦5,000
• 1 × Coke — ₦800

Total: ₦5,800
```

```
Services only
Hello {name} 👋
I'd like to book:

• Short hair, 45 min — ₦8,000

Total: ₦8,000
```

- **Mixed cart:** the intro line reads "I'd like to place an order / booking request:".
- **Unpriced lines:** show them as "• Wedding makeup — price on request", label the total "Total (priced items): ₦X", and add the line "Price to be confirmed for 1 item."
- **Everything unpriced:** omit the total and end with "Please send me a quote."
- The page heading and microcopy also come from `getTerms` ("Your order is ready" or "Your booking request is ready"). The `wa.me` link, new-tab behavior and message preview bubble stay as they are, and the preview must show exactly the string that is sent.

### 9E. Acceptance checks for the customer side

- A products-only business and a services-only business both work end to end, each at its own slug
- Adding items on one business, then opening another, shows an empty cart
- Two options of the same listing appear as two separate cart lines
- A price-on-request service can be added, is excluded from the total, and is flagged in the message
- Totals, labels and the WhatsApp message are always derived from live cart state, never stored

## 10. Out of scope

Real authentication and sessions, backend and database, payments, reordering listings, business opening hours and calendar booking, the app-admin console, real email sending for password reset.