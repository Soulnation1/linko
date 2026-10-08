# Linko Business Interface Milestones

This file is the single source of truth for business-side implementation progress.

Use it as a checkpoint tracker:

- mark a milestone as `[x]` when complete
- mark a milestone as `[ ]` when not started or still pending
- mark a milestone as `[!]` when blocked and include the exact blocker
- write a short stop note on every unfinished milestone so the next session knows exactly where work stopped

## How to use this file

1. Open this file before starting work.
2. Read the current status of the milestone list.
3. Continue from the first unchecked milestone.
4. When you stop, add a short note under that milestone such as:
   - `Stop note: paused after shared config was finished; waiting on app shell nav implementation.`
5. When a milestone is complete, update the checklist and keep the stop note removed or replaced with the completion note.

## Rules

- Do not skip ahead without completing the required prerequisite milestone.
- Do not mark a checklist item complete unless the milestone has been validated in code or UI.
- If work is paused mid-milestone, leave a clear comment stating what is finished and what remains.
- Only move to the next milestone after the previous milestone is complete or intentionally deferred with a written blocker.
- Keep milestone notes short, factual, and easy to follow for the next session.
- After every milestone, run the smallest necessary validation checks for the changed area before moving on.
- Required validation examples: targeted TypeScript check, lint on touched files or app, or a production build when the milestone changes route structure, shared types, or app-level config.
- Do not leave a milestone unchecked if it has not passed the required validation for that phase.
- If a milestone introduces a route, shared type, or config change, a production build must be run before signing off that phase.

## Status legend

- `[x]` = Complete
- `[ ]` = Not started / pending
- `[!]` = Blocked / needs attention

## Milestone checklist

### Phase 1 — Shared model + config

- [x] Create shared business and listing types
- [x] Add industry and offering enums
- [x] Add getTerms(business) helper
- [x] Add formatNaira and formatOptionPrice helpers
- [x] Add INDUSTRY_PRESETS and LISTING_KIND_CONFIG
- [x] Seed at least two mock businesses
- [x] Validate that customer and business code can import the same shared data
- Completion note: phase 1 is complete and ready for phase 2.
- Commit message: `feat(business): phase 1 - shared business model and config`

### Phase 2 — Reusable UI primitives

- [x] Create SuccessModal + Zustand host
- [x] Create ConfirmDialog
- [x] Create ImageUpload
- [x] Create OptionsEditor
- [x] Create SearchInput
- [x] Create StatusBadge
- [x] Create EmptyState
- [x] Create OfflineBanner
- [x] Create AuthLayout
- [x] Validate client/server boundary correctness
- Completion note: shared primitives are implemented, integrated into the root layout, and validated with lint, typecheck, and production build.
- Commit message: `feat(business): phase 2 - reusable ui primitives and shared components`

### Phase 3 — App shell and navigation

- [ ] Create lib/nav.ts with single source of truth
- [ ] Create desktop sidebar layout
- [ ] Create topbar with link, notifications, avatar menu
- [ ] Create mobile drawer with overlay and focus management
- [ ] Add responsive breakpoints and drawer behavior
- [ ] Add body scroll lock and accessibility attributes
- [ ] Add PWA-safe spacing and sticky mobile actions
- [ ] Validate route navigation and active states
- Stop note: continue from here once the shell works on mobile and desktop.

### Phase 4 — Mock auth + mock data layer

- [ ] Create mock auth flow functions
- [ ] Create lib/data functions for mock business/listing data
- [ ] Add Zustand stores for business and listings
- [ ] Persist demo data with localStorage
- [ ] Add artificial delay for realistic loading states
- [ ] Add TODO(auth) guard in dashboard layout
- Stop note: continue from here after demo data and mock auth are functional.

### Phase 5 — Authentication flow

- [ ] Login page
- [ ] Sign up page
- [ ] Forgot password page
- [ ] Reset password page with ?token handling
- [ ] SuccessModal milestone states for auth events
- [ ] Auth screens outside dashboard shell
- Stop note: continue from here once app entry flow is working.

### Phase 6 — Onboarding wizard

- [ ] Step 1: What do you offer?
- [ ] Step 2: Business details
- [ ] Step 3: Look and feel / storefront preview
- [ ] Add slug generation and validation
- [ ] Add live preview for accent color and branding
- [ ] Add final success modal “Your page is live”
- Stop note: continue from here after initial business setup is complete.

### Phase 7 — Dashboard home

- [ ] Welcome section and business name hero
- [ ] Live link pill with copy/preview actions
- [ ] Quick actions support
- [ ] Stat cards
- [ ] Recent activity list
- [ ] Install app prompt card conditionally
- Stop note: continue from here when the dashboard overview is working.

### Phase 8 — Listings management

- [ ] Listings index page with category and count summary
- [ ] Search and filter logic
- [ ] Grouping by category
- [ ] Row actions: edit, delete, availability toggle
- [ ] Add listing page
- [ ] Edit listing page
- [ ] ListingForm built from configuration
- [ ] Product-specific and service-specific fields
- [ ] Zod validation and RHF behavior
- [ ] SuccessModal on save
- [ ] ConfirmDialog on delete
- Stop note: continue from here once listing CRUD is stable.

### Phase 9 — Orders and share flow

- [ ] Orders page and status filters
- [ ] Mark completed flow
- [ ] Share & QR page
- [ ] Generate QR code using qrcode package
- [ ] Copy/share actions and fallback behavior
- [ ] UI wording from getTerms
- Stop note: continue from here after order and share functionality works.

### Phase 10 — Settings

- [ ] Settings hub
- [ ] Business profile
- [ ] Branding and appearance
- [ ] Notifications stub
- [ ] Payout stub
- [ ] Help stub
- [ ] Save actions with SuccessModal
- Stop note: continue from here when configuration screens are in place.

### Phase 11 — Customer-side compatibility pass

- [ ] Shared types migrated to Listing union
- [ ] Cart lines keyed by listing + option
- [ ] Cart state scoped by business slug
- [ ] Shared getTerms, formatNaira, and formatOptionPrice in lib
- [ ] Update cart-preview experience
- [ ] Update cart page totals and messaging
- [ ] Update complete-order message builder and tests
- [ ] Validate multi-business, product-only, and service-only flows
- Stop note: continue from here after customer flow compatibility is verified.

### Phase 12 — Final QA and accessibility pass

- [ ] Keyboard and focus behavior across modals and drawers
- [ ] Reduced-motion handling
- [ ] Color + text status accessibility
- [ ] Mobile sticky action validation
- [ ] Offline behavior validation
- [ ] Final route and data validation
- Stop note: continue from here after final QA and polish are complete.

## Example of a paused milestone

`[ ] Phase 8 — Listings management`

Past work completed:

- shared business types are ready
- reusable modal and form components exist
- dashboard shell is complete

Current stop point:

- paused while building the listings page and form validation
- next action: complete `ListingForm` config-driven rendering and test product/service variants

Stop note:
`Paused here: shared model and shell are complete; currently working on listing form validation and product/service field switching.`

## Completion rule

A milestone is considered complete only when:

- the checklist item is checked off
- the feature works in context
- no obvious blocker remains in the milestone scope
- a stop note is not left behind for that milestone
- a concise commit message is recorded for tracking purposes

## Commit message template for completed phases

Use a short, consistent commit message when a phase is complete:

- `feat(business): phase 1 - shared business model and config`
- `feat(business): phase 2 - reusable ui primitives and shared components`
- `feat(business): phase 3 - app shell and responsive navigation`
- `feat(business): phase 4 - mock auth and local data layer`
- `feat(business): phase 5 - auth flow and onboarding foundation`
- `feat(business): phase 6 - onboarding wizard and business setup`
- `feat(business): phase 7 - dashboard home and overview`
- `feat(business): phase 8 - listings management`
- `feat(business): phase 9 - orders and qr share flow`
- `feat(business): phase 10 - settings and profile configuration`
- `feat(business): phase 11 - customer compatibility pass`
- `feat(business): phase 12 - final qa and accessibility polish`

When a milestone is completed, add the matching commit message below it in the checklist as a note.
