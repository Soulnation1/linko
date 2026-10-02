# Linko Design System & Style Guide

This document serves as the authoritative visual design and branding reference for the Linko application. Subsequent agents and prompt workflows should consult this guide for color palettes, typography, spacing, and UI component standards.

---

## 1. Visual Theme & Design Philosophy

Linko uses a **Dark Espresso & Warm Mocha** luxury aesthetic. 
- **Warm Artisanal Atmosphere**: Rather than cold, flat black (`#000000`) or standard white, the app defaults to deep warm charcoal and dark espresso glass.
- **Controlled Accents**: The warm mocha/terracotta bronze color is reserved for primary call-to-actions, active indicators, and high-priority interactive elements.
- **Glassmorphic Surface Depth**: Floating cards use elevated warm dark tiles with translucent glass borders (`rgba(255, 255, 255, 0.08)`) and backdrop blur.

---

## 2. Color Palette & Token Definitions

### Base Canvas & Backgrounds
- **Primary Page Canvas (`espresso-base`)**: `#141211`
  - *Usage*: Default background color for all screens and pages.
- **Elevated Cards & Sheets (`espresso-surface`)**: `#221E1C` / `#25201E`
  - *Usage*: Cards, modal dialogs, bottom sheets, and product grid tiles.
- **Glass Container Border (`espresso-border`)**: `rgba(255, 255, 255, 0.08)`
  - *Usage*: Thin 1px outline for cards, floating navigation bars, and inputs.

### Brand Accents & Interactive Colors
- **Primary CTA & Action (`mocha-primary`)**: `#8C5A4C`
  - *Usage*: Main action buttons, circular arrow buttons, active navigation indicators, and primary badges.
- **Interactive Hover & Focus (`mocha-hover`)**: `#9E6756`
  - *Usage*: Hover and active pressed states for buttons and interactive controls.
- **Warm Highlight (`amber-accent`)**: `#D98A5B`
  - *Usage*: Promotional badges, special price callouts, and rating highlights.

### Typography & Text Colors
- **Primary Heading & Titles (`cream-text`)**: `#F5EFEA`
  - *Usage*: Product names, screen headers, primary button text, and prominent numbers.
- **Secondary Copy & Metadata (`taupe-muted`)**: `#A39890`
  - *Usage*: Item descriptions, category subtitles, location text, and helper labels.

---

## 3. Typography Rules

1. **Serif Font (Fraunces)**:
   - Used for business names, main hero titles, section headings, and emotional identity moments.
2. **Sans-Serif Font (Public Sans / Inter)**:
   - Used for functional UI controls, buttons, product titles, navigation tabs, and body copy.
3. **Monospace Font (JetBrains Mono)**:
   - Used exclusively for pricing numbers (`15 USD`, `₦5,000`), item quantities, and code/reference tokens.

---

## 4. Component Layout Conventions

### A. Business Identity Header
- Displayed at the top of customer-facing flows.
- Left-aligned 46px circular avatar (uploaded logo image or initials monogram on `#8C5A4C` background).
- Business name in serif bold text (`#F5EFEA`).
- Location below the name in muted taupe (`#A39890`) accompanied by a location-pin icon.

### B. Primary CTA Buttons
- Pill-shaped or rounded rectangle (`rounded-2xl` / `rounded-xl`).
- Solid warm mocha background (`#8C5A4C`) with crisp white text (`#F5EFEA`).
- Accompanied by a trailing arrow or relevant icon.

### C. Circular Action Buttons
- 36px to 40px circular buttons (`w-9 h-[#36px]` / `rounded-full`).
- Solid warm mocha background (`#8C5A4C`) with white centered icons (`ArrowRight`, `Plus`).

### D. Category Tab Navigation
- Horizontal scrollable row.
- Inactive tabs: Muted taupe text (`#A39890`).
- Active tab: Bold white text (`#F5EFEA`) with a centered 6px white dot indicator positioned immediately below the active text.

### E. Floating Navigation Bar
- Positioned floating near the bottom of the screen.
- Capsule shape with translucent dark glass (`#231E1C` at 85% opacity + backdrop blur).
- Prominent center action button raised slightly with a glowing shadow (`#8C5A4C`).
