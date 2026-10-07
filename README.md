# Linko Monorepo

Linko is organized as a pnpm workspace coordinated by Turborepo. The current runnable app is the Next.js web/PWA project; mobile and backend apps can be added independently under `apps/`.

## Requirements

- Node.js 20.9 or newer
- pnpm 11.20.0 (the repository's pinned package manager)

## Getting Started

Install workspace dependencies and start the web app from the repository root:

```bash
pnpm install
pnpm dev
```

The app is available at http://localhost:3000. Root commands target `@linko/web` by default:

```bash
pnpm build
pnpm lint
pnpm typecheck
pnpm start
```

## Workspace Layout

- `apps/web`: Next.js App Router app and installable PWA.
- `packages/domain`: platform-independent business, listing, and cart types.
- `apps/mobile` and `apps/api`: planned locations for the native client and backend.

Keep platform-specific UI in each app. Share domain rules and contracts through workspace packages; web components that depend on DOM/Tailwind are not automatically native-compatible.
