# SaveUs Product Specification & Architecture Guide

SaveUs is a multi-tenant digital business platform that helps businesses eliminate repetitive questions by giving each business a shareable digital page and QR code.

---

## Core Positioning & Value Proposition

- **Primary Tagline**: SaveUs — Less asking. More doing.
- **Supporting Message**: Everything your customers need, one link away.
- **Problem Statement**: Reduces repetitive back-and-forth ("How much is this?", "Do you have this available?", "How can I order?").
- **Solution**: SaveUs gives each business its own permanent shareable page (`saveus.app/chuks-kitchen`) and QR code.

---

## Target Industries (Vertical Neutral)

SaveUs is designed for all local businesses, services, and retail:
- Restaurants, Food Vendors, & Bakeries
- Fashion Stores & Tailors
- Phone & Electronics Retailers
- Beauty Salons & Barbers
- Photographers & Creative Services
- Mechanics & Repair Shops
- Freelancers & Service Providers

---

## Product Ecosystem & Architecture

### 1. Customer Experience (Public Storefront)
- Public business page accessed via QR code or link (`saveus.app/<slug>`).
- Frictionless: No account creation required.
- Browse offerings, see real-time prices & availability.
- Select items/services and generate pre-filled WhatsApp order messages.

### 2. Business Owner Dashboard (Workspace & PWA)
- Private business dashboard ("Welcome back, [Business Name] 👋").
- Manage product/service catalog, prices, and availability flags.
- View public link, copy/share URL, and download QR codes.
- Optional PWA installation for quick access on mobile devices.

### 3. SaveUs Admin Dashboard
- Platform administrative management for users, businesses, subscriptions, usage, and system settings.

---

## How SaveUs Works

1. **Create your business page**: Add offerings, prices, photos, and availability.
2. **Share your link**: Get a permanent link (`saveus.app/business-name`) and printable QR code.
3. **Customers connect**: Customers scan or click, browse live availability, and place orders directly.
