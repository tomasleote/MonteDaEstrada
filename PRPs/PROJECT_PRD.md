# Product Requirements Document
## Boutique Collection — Digital Ecosystem

**Version:** 1.0
**Date:** 2026-02-22
**Status:** Draft — Pending Stakeholder Decisions (see §6, §7)
**Author:** Engineering & Strategy Team
**Source Brand Brief:** `docs/plans/2026-02-22-boutique-collection-brand-identity-brief.md`

---

## ⚠️ Open Decisions Required Before Finalization

This PRD is **feature-complete** but contains **two open technical decisions** that must be resolved before implementation begins:

| # | Decision | Section | Impact |
|---|----------|---------|--------|
| **D-1** | Styling system: **Tailwind CSS vs SCSS Modules** | §6 | Affects all component work |
| **D-2** | Headless CMS: **Contentful vs Sanity vs Decap** | §7 | Affects infrastructure, content ops |

Options for both decisions are presented inline. No engineering work should begin on affected systems until these are resolved.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Project Context & Current State](#2-project-context--current-state)
3. [House of Brands Strategy](#3-house-of-brands-strategy)
4. [User Personas](#4-user-personas)
5. [Technical Architecture](#5-technical-architecture)
6. [Open Decision D-1: Styling System](#6-open-decision-d-1-styling-system)
7. [Open Decision D-2: Headless CMS](#7-open-decision-d-2-headless-cms)
8. [Feature Requirements](#8-feature-requirements)
9. [Design System Specification](#9-design-system-specification)
10. [Booking Integration](#10-booking-integration)
11. [Content Migration Plan](#11-content-migration-plan)
12. [Phased Roadmap](#12-phased-roadmap)
13. [Non-Functional Requirements](#13-non-functional-requirements)
14. [Risk Register](#14-risk-register)
15. [Acceptance Criteria](#15-acceptance-criteria)

---

## 1. Executive Summary

The Boutique Collection is a **digital ecosystem** for two boutique guesthouses in the Alentejo region of Portugal — **Monte da Estrada** (6 rooms) and **Monte do Papa-Léguas** (8 rooms) — unified under a single editorial brand identity.

This PRD defines the technical requirements to:

1. **Rebuild** `monte-da-estrada` from the current Vite + React prototype into a production-grade site aligned with the new brand identity.
2. **Build** `papa-leguas` from scratch (migrating content from an existing Wix site).
3. **Establish** a shared component library (`touril-ecosystem-ui-components`) as the design system foundation for both properties.
4. **Integrate** both properties with **SimpleBooking** for reservations.
5. **Deploy** a unified CMS that allows non-technical staff to manage both properties from a single interface.

**The new brand is a deliberate pivot.** The current codebase uses a Touril-inherited aesthetic (black `#0A0203` / gold `#FBAB18`). The new Boutique Collection identity is editorial, architectural, and photography-forward: cream backgrounds, deep brown typography, and clay (`#B8925F`) as a restrained accent.

---

## 2. Project Context & Current State

### 2.1 Monorepo Structure (Existing)

```
touril-ecosystem/               ← Yarn/npm workspaces root
├── apps/
│   ├── monte-da-estrada/       ← Vite + React, ~90% complete, SCSS Modules
│   └── papa-leguas/            ← Empty scaffold (package.json only)
├── packages/
│   └── touril-ecosystem-ui-components/  ← Shared React library
│       ├── Header, HeaderModern, Footer
│       ├── RoomCard, RoomCardGallery, RoomExpandedCard
│       └── _variables.scss (OLD Touril palette — to be replaced)
└── docs/, PRPs/, AI-Coding-Workflows-Foundation/
```

### 2.2 What Exists and is Reusable

| Asset | Status | Action Required |
|-------|--------|-----------------|
| Monorepo workspace setup | ✅ Functional | Keep. Add new apps/packages as needed |
| `monte-da-estrada` page routes | ✅ Complete | Keep routes; restyle all components |
| `touril-ecosystem-ui-components` (structure) | ✅ Functional | Restyle to new brand; replace `_variables.scss` |
| `_variables.scss` (current black/gold) | ⚠️ Outdated | Full replacement with Boutique Collection tokens |
| Room card components | ✅ Functional | Restyle (0px radius, new palette) |
| Header / Footer | ✅ Functional | Restyle to deep brown `#3D3B38` background |
| Decap CMS (admin panel) | ✅ Implemented | Decision D-2: keep or replace |
| Image assets | ✅ Present | Audit for quality; request new photos if needed |
| `papa-leguas` app | ❌ Empty | Full build required |
| SimpleBooking integration | ❌ Missing | Full implementation required |
| Collection Switcher | ❌ Missing | Full implementation required |
| Framer Motion | ❌ Missing | Add to both apps |

### 2.3 What Must Be Deprecated

- Old color palette (black `#0A0203` / gold `#FBAB18`) — replace entirely with Boutique Collection tokens
- Old typography (`Open Sans`) — replace with `Basis Grotesque` + `Inter` + `GT Sectra`
- Any `border-radius` > 0px on UI chrome elements (per brand brief: 0px everywhere)

---

## 3. House of Brands Strategy

### 3.1 Strategic Architecture

The Boutique Collection operates as a **"House of Brands"** — a single parent identity with two distinct properties that share structural DNA but express individual character.

```
┌─────────────────────────────────────────────────────────────┐
│                   THE BOUTIQUE COLLECTION                   │
│              (Parent brand — no public URL)                 │
│        Typography · Colors · Voice · Motion Language        │
└──────────────────────┬──────────────────────────────────────┘
                       │
           ┌───────────┴────────────┐
           │                        │
┌──────────▼──────────┐  ┌──────────▼──────────┐
│   Monte da Estrada  │  │  Monte do Papa-Léguas│
│  montedaestrada.com │  │  montedopapaleguas.pt│
│                     │  │                      │
│  Secondary: Charcoal│  │  Secondary: Cool Taupe│
│  #4A4845            │  │  #A89F98             │
│  Photo: landscape,  │  │  Photo: architecture,│
│  outdoor, light     │  │  interior, coastal   │
└─────────────────────┘  └──────────────────────┘
```

### 3.2 Shared DNA (Identical Across Both Properties)

| Layer | Specification |
|-------|---------------|
| **Header** | Deep Brown `#3D3B38` bg, Cream `#F5F3F0` text, Clay `#B8925F` accents |
| **Footer** | Deep Brown `#3D3B38` bg, Cream `#F5F3F0` text, Clay `#B8925F` accents |
| **Typography stack** | Basis Grotesque (display) + Inter (body) + GT Sectra (editorial) |
| **Primary accent** | Clay `#B8925F` for all CTAs and active states |
| **Layout rules** | 0px border-radius, no shadows, generous whitespace (≥64px vertical sections) |
| **Motion** | Framer Motion, 300ms ease-in-out standard, `prefers-reduced-motion` respected |
| **Voice** | Sophisticated, curatorial, direct — never marketing jargon |
| **Collection Switcher** | Global UI element allowing navigation between properties |

### 3.3 Property Differentiation

| Element | Monte da Estrada | Monte do Papa-Léguas |
|---------|------------------|----------------------|
| Secondary color | Charcoal `#4A4845` | Cool Taupe `#A89F98` |
| Tertiary color | Light Taupe `#E8E5E0` | Pale Gray `#E0DEDA` |
| Hero imagery | Landscape, outdoors, natural light | Architecture, interiors, coastal |
| Copy emphasis | Regional connection, outdoor living | Architectural heritage, design detail |
| CSS variable override | `--color-property-secondary: #4A4845` | `--color-property-secondary: #A89F98` |

Implementation: each app imports the shared design system and overrides a single CSS custom property (`--color-property-secondary`) to express its distinct identity.

---

## 4. User Personas

### 4.1 Primary Persona — The Design-Conscious Traveler

**"The Quiet Maximalist"**

| Attribute | Detail |
|-----------|--------|
| **Age** | 28–48 |
| **Occupation** | Creative professional, architect, UX designer, consultant |
| **Income** | Upper-middle class (€60k–€150k household) |
| **Travel frequency** | 4–8 trips/year; 2–3 extended stays |
| **Discovery channels** | Instagram, Dezeen, Wallpaper*, word of mouth, direct search |
| **Booking behavior** | Researches deeply; reads every detail; books 4–8 weeks in advance |
| **Primary need** | A space that feels intentional — where the design tells a story |
| **Secondary need** | High-quality photography to validate the decision before booking |
| **Frustration triggers** | Stock photography, generic copy, slow sites, booking friction |
| **Decision criteria** | Photography quality → Design coherence → Authentic copy → Price transparency |

**Behavioral pattern on website:**
1. Enters via hero image (often from social referral)
2. Scans H1/H2 copy for voice and authenticity (3–5 seconds)
3. Deep-dives into room photography gallery
4. Checks location/surroundings
5. Looks for pricing transparency before booking

### 4.2 Secondary Persona — The Active Adventurer

**"The Wild Luxury Hiker"**

| Attribute | Detail |
|-----------|--------|
| **Age** | 32–55 |
| **Occupation** | Professional; values physical activity as identity |
| **Activities** | Hiking, trail running, cycling, birdwatching, beach |
| **Travel style** | Comfortable base from which to explore; not interested in resort-style amenity lists |
| **Key questions** | "What can I do within 30 minutes?" / "Are the trails accessible?" |
| **Copy tone needed** | Specific and practical — distances, difficulty, gear notes |
| **Booking behavior** | Books around activity seasons; May–Oct for outdoor, Nov–Mar for stillness |

**Website needs:** Dedicated Activities page with region map; clear proximity to Rota Vicentina, Zambujeira do Mar, Serra de Grândola.

### 4.3 Tertiary Persona — The Remote Worker in Retreat

**"The Intentional Slowdown"**

| Attribute | Detail |
|-----------|--------|
| **Age** | 25–40 |
| **Occupation** | Remote worker; digital nomad |
| **Stay duration** | 5–14 days (not weekend breaks) |
| **Primary need** | Reliable WiFi, quiet workspace, meaningful environment |
| **Discovery** | Work-from-anywhere blogs, Nomad List, LinkedIn |
| **Deal-breakers** | No WiFi speed info, no clear workspace photos |

**Website needs:** Explicit mention of connectivity; workspace photography; flexible check-in/out framing.

---

## 5. Technical Architecture

### 5.1 Recommended Stack

```
┌───────────────────────────────────────────────────┐
│                   Frontend Layer                   │
│                                                    │
│  Framework:    Next.js 14+ (App Router)            │
│  Language:     JavaScript (ES2023+) / JSX          │
│  Styling:      See Decision D-1 (§6)               │
│  Animation:    Framer Motion 11+                   │
│  State:        React Context + SWR (for CMS data)  │
│  Forms:        React Hook Form + Zod validation    │
│  Images:       next/image (WebP, lazy load, blur)  │
│  Maps:         Mapbox GL JS or Leaflet             │
└───────────────────────────────────────────────────┘
         │                          │
         ▼                          ▼
┌─────────────────┐      ┌──────────────────────┐
│   Headless CMS  │      │   SimpleBooking API  │
│  See D-2 (§7)  │      │   (iframe + webhook) │
└─────────────────┘      └──────────────────────┘
         │
         ▼
┌───────────────────────────────────────────────────┐
│              Deployment & Infrastructure           │
│  Hosting:     Vercel (recommended) or Netlify     │
│  CDN:         Vercel Edge / Netlify Edge           │
│  Analytics:   Vercel Analytics or Plausible        │
│  DNS:         Per-property domains (existing)      │
│  SSL:         Automatic via platform               │
└───────────────────────────────────────────────────┘
```

### 5.2 Why Next.js Over Current Vite Setup

| Criterion | Vite + React (current) | Next.js 14 (proposed) |
|-----------|------------------------|------------------------|
| SEO / SSG | Manual meta tags only | Built-in SSG, ISR, metadata API |
| Image optimization | Manual (`vite-imagetools`) | `next/image` with automatic WebP |
| Routing | React Router | File-system routing (App Router) |
| Performance | Good | Excellent (RSC, streaming, edge) |
| CMS integration | Manual fetch | Built-in data fetching patterns |
| Learning curve | None (current) | Low–Medium (App Router paradigm) |
| Migration cost | — | Medium (2–3 sprints) |

**Recommendation:** Migrate to Next.js. The SEO benefit alone justifies the migration cost for a hospitality website where organic search is the primary acquisition channel.

### 5.3 Monorepo Structure (Target State)

```
touril-ecosystem/
├── apps/
│   ├── monte-da-estrada/           ← Next.js 14 app
│   │   ├── app/                    ← App Router
│   │   │   ├── layout.jsx          ← Root layout (Header + Footer)
│   │   │   ├── page.jsx            ← Home
│   │   │   ├── quartos/page.jsx    ← Rooms
│   │   │   ├── atividades/page.jsx ← Activities
│   │   │   ├── galeria/page.jsx    ← Gallery
│   │   │   ├── localizacao/page.jsx
│   │   │   └── contacto/page.jsx
│   │   ├── components/             ← Page-specific components
│   │   ├── public/                 ← Static assets
│   │   └── next.config.js
│   │
│   └── papa-leguas/                ← Next.js 14 app (parallel structure)
│       ├── app/
│       │   ├── layout.jsx
│       │   ├── page.jsx
│       │   ├── quartos/page.jsx
│       │   ├── atividades/page.jsx ← Different content from Monte da Estrada
│       │   ├── galeria/page.jsx
│       │   ├── localizacao/page.jsx
│       │   └── contacto/page.jsx
│       └── next.config.js
│
├── packages/
│   └── touril-ecosystem-ui-components/  ← Shared design system
│       ├── src/
│       │   ├── components/
│       │   │   ├── Header/           ← Updated: deep brown, cream, clay
│       │   │   ├── Footer/           ← Updated: deep brown, cream, clay
│       │   │   ├── CollectionSwitcher/  ← NEW: cross-property navigation
│       │   │   ├── RoomCard/         ← Updated: 0px radius, new palette
│       │   │   ├── RoomCardGallery/  ← Updated
│       │   │   ├── RoomExpandedCard/ ← Updated
│       │   │   ├── Button/           ← NEW: clay primary, 0px radius
│       │   │   ├── HeroSection/      ← NEW: full-width photography hero
│       │   │   └── BookingWidget/    ← NEW: SimpleBooking wrapper
│       │   └── styles/
│       │       ├── _variables.scss   ← REPLACE with Boutique tokens
│       │       ├── _mixins.scss      ← Update mixins
│       │       └── global.scss
│       └── package.json
│
└── docs/
    ├── plans/
    ├── design-system.md            ← Update to reflect new brand
    └── PROJECT_PRD.md              ← This document
```

### 5.4 Environment Variables Strategy

Each app has its own `.env.local`:

```bash
# monte-da-estrada/.env.local
NEXT_PUBLIC_PROPERTY_ID=monte-da-estrada
NEXT_PUBLIC_PROPERTY_NAME="Monte da Estrada"
NEXT_PUBLIC_PROPERTY_COLOR_SECONDARY=#4A4845
NEXT_PUBLIC_SIMPLEBOOKING_PROPERTY_ID=<id>
NEXT_PUBLIC_CMS_SPACE_ID=<id>
```

```bash
# papa-leguas/.env.local
NEXT_PUBLIC_PROPERTY_ID=papa-leguas
NEXT_PUBLIC_PROPERTY_NAME="Monte do Papa-Léguas"
NEXT_PUBLIC_PROPERTY_COLOR_SECONDARY=#A89F98
NEXT_PUBLIC_SIMPLEBOOKING_PROPERTY_ID=<id>
NEXT_PUBLIC_CMS_SPACE_ID=<id>
```

This allows the shared `touril-ecosystem-ui-components` to express property-specific color variations from a single environment variable.

---

## 6. Open Decision D-1: Styling System

> **DECISION REQUIRED before implementation begins.**
> Both options below are technically viable. This section presents the trade-offs.

### Context

There is a direct conflict in the existing project documentation:

- **`CLAUDE.md` (project rules):** "NEVER use Tailwind CSS — This project uses SCSS exclusively."
- **Brand Identity Brief §11:** "Implement as SCSS modules (not Tailwind)"
- **This PRD request:** Specified "Tailwind CSS (Pixel-perfect implementation)"

This is a deliberate architectural choice that carries long-term implications. Please choose one:

---

### Option A: Tailwind CSS v4 ✨ (Aligned with PRD request)

**Approach:** Replace SCSS Modules entirely. Use Tailwind utility classes for all styling. Configure the Boutique Collection design tokens in `tailwind.config.js`.

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        cream: '#F5F3F0',
        'off-white': '#FAFAF8',
        'warm-gray': '#DDD9D5',
        'deep-brown': '#3D3B38',
        clay: '#B8925F',
        charcoal: '#4A4845',
        'cool-taupe': '#A89F98',
      },
      fontFamily: {
        display: ['"Basis Grotesque"', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        editorial: ['"GT Sectra"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        headline: '1px',
        subheading: '0.75px',
        body: '0.5px',
      },
      borderRadius: {
        none: '0px',  // Brand standard — enforce 0px everywhere
      },
    },
  },
}
```

**Pros:**
- Faster development iteration (no context-switching to `.module.scss` files)
- Better developer experience with IDE autocomplete
- Tailwind v4 is JIT-only; ships zero unused CSS
- Easier to enforce design tokens via `theme.extend` (central source of truth)
- Better ecosystem support for Next.js (official integration)

**Cons:**
- Requires rewriting **all existing** SCSS Modules in `touril-ecosystem-ui-components` and `monte-da-estrada`
- Requires updating `CLAUDE.md` to reflect the new approach
- Learning curve for utility-class pattern if team is SCSS-oriented
- Some complex animations/interactions easier in SCSS

**Migration cost estimate:** 3–5 sprints (significant rewrite)

---

### Option B: SCSS Modules (Aligned with existing codebase)

**Approach:** Keep the existing SCSS Modules pattern. Update `_variables.scss` to the Boutique Collection tokens. All new components use `.module.scss`.

```scss
// packages/touril-ecosystem-ui-components/src/styles/_variables.scss (updated)
$color-cream: #F5F3F0;
$color-off-white: #FAFAF8;
$color-warm-gray: #DDD9D5;
$color-deep-brown: #3D3B38;
$color-clay: #B8925F;
$color-charcoal: #4A4845;      // Monte da Estrada secondary
$color-cool-taupe: #A89F98;    // Papa-Léguas secondary
```

**Pros:**
- Builds on existing `_variables.scss` infrastructure (lower migration cost)
- Consistent with existing team knowledge and `CLAUDE.md` rules
- SCSS offers more power for complex selectors and `@each` loops
- Scoped styles prevent global leakage (strong encapsulation)
- Easier to maintain the `prefers-reduced-motion` media query pattern

**Cons:**
- More boilerplate per component (must create/import `.module.scss` file)
- Design tokens change in one place but must be re-imported in every file
- Slower iteration speed vs. Tailwind for simple styling tasks

**Migration cost estimate:** 1–2 sprints (update tokens + restyle components; no paradigm shift)

---

**→ Please select Option A or Option B before proceeding to implementation.**

---

## 7. Open Decision D-2: Headless CMS

> **DECISION REQUIRED before implementation begins.**
> Three options are presented below. Deployment infrastructure is not finalized until this decision is made.

### Option A: Contentful

**Type:** SaaS, managed
**Cost:** Free tier (up to 2 spaces, 25k API calls/month) → €489/mo Professional
**Best for:** Teams that want zero infrastructure maintenance; best-in-class editorial UI

**Architecture for this project:**
- One Contentful space with two **environments** (one per property)
- Content types: `Property`, `Room`, `Activity`, `Region`, `MediaAsset`, `SiteSettings`
- Both Next.js apps fetch from the same space, filtered by `property_id`

**Pros:**
- Best-in-class content editor UX (non-technical staff can use immediately)
- Rich text editor with image embedding
- Image transformation API (no need for `next/image` transformation pipeline)
- Webhooks for cache invalidation on Next.js ISR

**Cons:**
- SaaS cost scales with usage (may exceed free tier with high traffic)
- Less flexible data modeling vs. Sanity
- Vendor lock-in (proprietary query language)

**Integration example (Next.js App Router):**
```js
// app/quartos/page.jsx
import { createClient } from 'contentful'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

export async function generateStaticParams() {
  const rooms = await client.getEntries({
    content_type: 'room',
    'fields.property': process.env.NEXT_PUBLIC_PROPERTY_ID,
  })
  return rooms.items.map(room => ({ slug: room.fields.slug }))
}
```

---

### Option B: Sanity

**Type:** SaaS, managed (with open-source studio)
**Cost:** Free tier (up to 3 users, unlimited projects) → €15/seat/mo Growth
**Best for:** Developers who want full data model control; teams comfortable with a learning curve

**Architecture for this project:**
- Single Sanity project with two datasets (one per property), or one dataset with a `property` reference field
- GROQ queries filter content by property at fetch time
- Sanity Studio hosted at `/studio` inside each Next.js app (or a shared admin URL)

**Pros:**
- Most flexible content model (schema-as-code)
- Real-time collaborative editing
- Portable text (structured content that works everywhere)
- Image hotspot/crop tools built-in
- GROQ is more powerful than GraphQL for content queries

**Cons:**
- Steeper learning curve for non-technical editors (Studio is code-configured)
- Requires upfront schema design effort
- GROQ syntax unfamiliar to most developers

**Integration example (Next.js App Router):**
```js
// sanity/client.js
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_PROPERTY_ID, // 'monte-da-estrada' or 'papa-leguas'
  apiVersion: '2026-02-22',
  useCdn: true,
})
```

---

### Option C: Decap CMS (Keep & Extend)

**Type:** Open-source, Git-based (already implemented)
**Cost:** Free
**Best for:** Keeping infrastructure costs at zero; reusing existing admin panel

**Architecture for this project:**
- Existing Decap CMS admin panel extended with new content types
- Content stored in Git repo as Markdown/JSON (current pattern)
- Both properties managed via their own `/admin` route with their own `config.yml`

**Pros:**
- Already implemented (`apps/monte-da-estrada/public/admin/`)
- Zero cost
- Content versioned in Git (full history)
- Netlify Identity for auth (already configured)
- No vendor lock-in — content is just files

**Cons:**
- Not designed for multi-property management from a single UI
- No rich real-time preview (requires build to see changes)
- Less capable editorial UI vs. Contentful/Sanity
- Markdown limitations for complex structured content (room features, pricing)
- Each property must be managed separately (no unified dashboard)

**Note:** If you want the lowest friction path and are comfortable with two separate admin panels, this is viable and saves the most time. If you want a unified content dashboard across both properties, choose Contentful or Sanity.

---

**→ Please select Option A (Contentful), Option B (Sanity), or Option C (Decap CMS) before proceeding.**

---

## 8. Feature Requirements

### 8.1 Global Features (Both Properties)

#### F-01: Collection Switcher

**Priority:** P0 (must-have)
**Description:** A persistent UI element that allows visitors to navigate between Monte da Estrada and Monte do Papa-Léguas, reinforcing the "House of Brands" mental model.

**Behavior:**
- Displayed in the Header on both sites (desktop: text link in nav; mobile: inside hamburger menu)
- Shows both property names; highlights the current property
- On click: navigates to the equivalent page on the other property's domain
  - Example: `montedaestrada.com/quartos` → `montedopapaleguas.pt/quartos`
- Includes a visual separator to distinguish it from primary navigation

**UI Specification:**
```
Desktop Header (right of nav):
  [ Monte da Estrada · Monte do Papa-Léguas ]
  Separator: 1px vertical line in Warm Gray #DDD9D5
  Active property: Clay #B8925F underline
  Inactive property: Cream #F5F3F0 text, hover → Clay
  Font: Inter, 12px, Medium (500), 0.75px letter-spacing

Mobile (inside hamburger menu, bottom section):
  "Also in our collection:"
  → Monte do Papa-Léguas (link)
```

**Technical implementation:**
```jsx
// packages/touril-ecosystem-ui-components/src/components/CollectionSwitcher/CollectionSwitcher.jsx
const PROPERTIES = [
  { id: 'monte-da-estrada', name: 'Monte da Estrada', url: 'https://montedaestrada.com' },
  { id: 'papa-leguas', name: 'Monte do Papa-Léguas', url: 'https://montedopapaleguas.pt' },
]

// Each app passes its NEXT_PUBLIC_PROPERTY_ID; switcher highlights current and links to other
```

---

#### F-02: Responsive Navigation (Header)

**Priority:** P0
**Specification:**
- Background: Deep Brown `#3D3B38`, full viewport width
- Height: 72px desktop / 64px mobile
- Logo: Left-aligned, 40px height, links to `/`
- Nav links (desktop): Inter 14px, Medium, Cream `#F5F3F0`, 0.75px letter-spacing
  - Hover: Clay `#B8925F`
  - Active page: Clay `#B8925F` with 2px bottom border
- Mobile: Hamburger icon (clay colored), slide-out drawer (full height, deep brown bg)
- Sticky on scroll (position: fixed; z-index: 1000)
- Framer Motion: slide-down entrance on page load (y: -20 → 0, opacity: 0 → 1, 400ms)

**Navigation Items:**
- Monte da Estrada: Casa · Quartos · Atividades · Redondezas · Galeria · Contacto
- Papa-Léguas: Casa · Quartos · Atividades · Localização · Galeria · Contacto

---

#### F-03: Footer

**Priority:** P0
**Specification:**
- Background: Deep Brown `#3D3B38`, full viewport width
- Structure: 3-column desktop (Property info | Nav links | Contact + Social) → stacks on mobile
- Text: Cream `#F5F3F0`, Inter 14px
- Link hover: Clay `#B8925F`
- Section divider: 1px solid Warm Gray `#DDD9D5` above footer
- Includes: Collection Switcher link ("Also part of the Boutique Collection")
- Copyright: Inter 12px, muted (reduced opacity cream)
- 48px top/bottom padding

---

#### F-04: SEO & Metadata

**Priority:** P0
**Implementation via Next.js Metadata API:**

```js
// app/layout.jsx
export const metadata = {
  title: { template: '%s | Monte da Estrada', default: 'Monte da Estrada — Alentejo' },
  description: '...',
  openGraph: { images: [{ url: '/og-image.jpg', width: 1200, height: 630 }] },
  alternates: { languages: { 'pt-PT': '/', 'en': '/en', 'es': '/es' } },
}
```

- Each page defines its own `metadata` export
- OG images generated per page (Next.js `ImageResponse`)
- Sitemap: auto-generated via `next-sitemap`
- Schema.org structured data: `LodgingBusiness` JSON-LD on home and room pages

---

#### F-05: Multilingual Support (pt-PT / en / es)

**Priority:** P1 (must-have for launch)
**Implementation:** `next-intl` library
**Approach:**
- Route-based locale prefixing: `/en/quartos`, `/es/habitaciones`
- Portuguese (`pt-PT`) as default locale (no prefix)
- Translation files: `messages/pt.json`, `messages/en.json`, `messages/es.json`
- CMS content: each content item has locale variants

---

#### F-06: Performance & Image Optimization

**Priority:** P0
**Requirements:**
- All images served as WebP with AVIF fallback via `next/image`
- Hero images: `priority` prop (no lazy load for above-fold)
- Gallery images: lazy loaded with blur placeholder
- Lighthouse Performance score: ≥90 (target: 95+)
- Core Web Vitals: LCP ≤ 2.5s, FID ≤ 100ms, CLS ≤ 0.1
- Font loading: `font-display: swap` + preload for `Basis Grotesque` and `Inter`

---

### 8.2 Monte da Estrada — Specific Features

#### F-07: Hero Section

- Full-viewport-height image (first image from gallery `home-hero-monte-exterior.jpg`)
- Overlay: optional 10–15% Clay tint (`rgba(184, 146, 95, 0.12)`)
- H1: Basis Grotesque 56px, Deep Brown, 1px letter-spacing
- Subline: Inter 18px, Deep Brown
- CTA button: Clay bg, Deep Brown text, "Descobrir" / "Discover" / "Descubrir"
- Framer Motion: fade-up on load (opacity 0→1, y: 30→0, 600ms, ease-out)

#### F-08: Rooms Page (Quartos)

- Grid layout: 2-column desktop, 1-column mobile
- Each room: `RoomCard` component (image, name, capacity, key features)
- Click/tap opens `RoomExpandedCard` (modal or dedicated route)
- Expanded card: full gallery, description, amenities list, direct booking CTA

#### F-09: Activities Page (Atividades)

- Activities list with distance from property (e.g., "Rota Vicentina — 8km")
- Activity categories: Hiking · Beach · Cycling · Cultural · Gastronomy
- Map integration (Mapbox GL or Leaflet) showing property + nearby points of interest

#### F-10: Gallery Page (Galeria)

- Masonry grid layout (3-column desktop, 2-column tablet, 1-column mobile)
- Full-screen lightbox on click (Framer Motion scale animation)
- Images sourced from CMS (managed, not hardcoded)

#### F-11: Location Page (Localização)

- Embedded Mapbox/Leaflet map with property pin
- Driving directions from major cities (Lisboa, Porto, Sevilha)
- Public transport notes
- "Getting here" structured content from CMS

#### F-12: Contact Page (Contacto)

- Contact form: Name, Email, Phone, Check-in date, Check-out date, Message
- Validation: React Hook Form + Zod
- Submit handler: email via Resend or Nodemailer (Next.js API Route)
- Confirmation: inline success state (no page reload)
- Alternative: WhatsApp link (property number)

---

### 8.3 Monte do Papa-Léguas — Specific Features

Papa-Léguas shares the same page structure as Monte da Estrada with these differences:

| Feature | Monte da Estrada | Papa-Léguas |
|---------|------------------|-------------|
| Activities | Trail hiking, outdoor focus | Beach activities, coastal emphasis |
| Location emphasis | Interior Alentejo | Coastal Alentejo / Zambujeira do Mar |
| Secondary color accent | Charcoal `#4A4845` | Cool Taupe `#A89F98` |
| Photography hero | Landscape / property exterior | Architecture / pool / coast |

All content for Papa-Léguas comes from the CMS (migrated from Wix — see §11).

---

## 9. Design System Specification

### 9.1 Color Tokens (Boutique Collection)

> These replace the current `_variables.scss` values entirely.

```scss
// PRIMARY NEUTRAL FOUNDATION
$color-cream: #F5F3F0;           // Primary page background
$color-off-white: #FAFAF8;       // Cards, secondary sections
$color-warm-gray: #DDD9D5;       // Borders, dividers
$color-deep-brown: #3D3B38;      // Text, headers, UI

// PRIMARY ACCENT
$color-clay: #B8925F;            // CTAs, highlights, active states

// PROPERTY-SPECIFIC SECONDARIES
$color-charcoal: #4A4845;        // Monte da Estrada secondary
$color-cool-taupe: #A89F98;      // Papa-Léguas secondary
$color-light-taupe: #E8E5E0;     // Monte da Estrada tertiary
$color-pale-gray: #E0DEDA;       // Papa-Léguas tertiary

// SEMANTIC
$color-success: #B8925F;         // Matches brand accent
$color-error: #C1440E;           // Warm red-brown
$color-warning: #E8A35D;         // Light clay
$color-info: #3D7BA8;            // Accessible blue
$color-disabled: #CACAC7;        // Desaturated gray

// HEADER / FOOTER (same on both properties)
$color-header-bg: #3D3B38;       // = $color-deep-brown
$color-footer-bg: #3D3B38;       // = $color-deep-brown
$color-header-text: #F5F3F0;     // = $color-cream
$color-header-accent: #B8925F;   // = $color-clay
```

### 9.2 Typography Tokens

```scss
// FONT FAMILIES
$font-display: 'Basis Grotesque', sans-serif;
$font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
$font-editorial: 'GT Sectra', Georgia, serif;

// FONT SIZES (per brand brief)
$font-size-h1: 3.5rem;    // 56px
$font-size-h2: 2.75rem;   // 44px
$font-size-h3: 2rem;      // 32px
$font-size-h4: 1.5rem;    // 24px
$font-size-body-lg: 1.125rem; // 18px
$font-size-body: 1rem;    // 16px
$font-size-body-sm: 0.875rem; // 14px
$font-size-label: 0.875rem;   // 14px
$font-size-caption: 0.75rem;  // 12px

// LETTER SPACING (critical for editorial quality)
$letter-spacing-headline: 1px;      // H1, H2
$letter-spacing-subheading: 0.75px; // H3, H4, labels
$letter-spacing-body: 0.5px;        // Body text, captions

// LINE HEIGHTS
$line-height-display: 1.2;   // H1
$line-height-heading: 1.3;   // H2
$line-height-subheading: 1.4; // H3, H4
$line-height-body: 1.6;      // Body text (generous for readability)

// FONT WEIGHTS
$font-weight-regular: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
```

### 9.3 Spacing Tokens (8px Base Unit)

```scss
$space-xs: 4px;
$space-s: 8px;
$space-m: 16px;
$space-l: 24px;
$space-xl: 32px;
$space-xxl: 48px;
$space-xxxl: 64px;
$space-section: 80px;   // Minimum vertical section padding
```

### 9.4 Visual Rules (Hard Constraints)

| Rule | Value | Rationale |
|------|-------|-----------|
| Border radius | **0px everywhere** | Architectural, geometric precision |
| Shadows | **None** (or `0 1px 3px rgba(61,59,56,0.06)` maximum) | Flat, modern; elevation via whitespace |
| Section min-spacing | **64px** top/bottom | Generous whitespace = sophistication |
| Color overlays on images | **None**, or Clay at ≤15% opacity on heroes only | Let photography breathe |
| Border style | `1px solid #DDD9D5` (when needed) | Subtle structure |
| Accent color frequency | **CTAs and active states only** | Clay is rare and therefore impactful |

### 9.5 Motion System (Framer Motion)

```js
// packages/touril-ecosystem-ui-components/src/constants/motion.js

export const transitions = {
  fast: { duration: 0.15, ease: 'easeOut' },          // Hover, focus
  standard: { duration: 0.3, ease: 'easeInOut' },     // Button change, fade
  smooth: { duration: 0.4, ease: 'easeInOut' },       // Navigation, menu
  loading: { duration: 0.5, ease: 'easeInOut' },      // Image load, submit
}

export const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: transitions.smooth },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: transitions.standard },
  },
  slideDown: {  // Header entrance
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: transitions.smooth },
  },
  scaleIn: {  // Lightbox open
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1, transition: transitions.standard },
  },
}

// Staggered children (for room card grids)
export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
```

**`prefers-reduced-motion` enforcement:**
```js
// All Framer Motion components use this hook
import { useReducedMotion } from 'framer-motion'

const reducedMotion = useReducedMotion()
const animationProps = reducedMotion ? {} : { initial: 'hidden', animate: 'visible', variants }
```

### 9.6 Font Loading (Next.js)

> `Basis Grotesque` and `GT Sectra` are commercial fonts. Hosting must be verified.

```js
// app/layout.jsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

// Basis Grotesque and GT Sectra: host locally via next/font/local
// (Requires license — confirm with font vendor before deployment)
```

---

## 10. Booking Integration

### 10.1 SimpleBooking Overview

Both properties use **SimpleBooking** (simplebooking.it) as their reservation management system. The integration strategy is an **iframe embed** for the booking widget, supplemented by direct-link CTAs.

### 10.2 Integration Pattern

**Option A — Iframe Widget (Recommended)**

SimpleBooking provides a JavaScript snippet / iframe widget that can be embedded on any page. This is the safest integration path as it requires no API credentials and is maintained by SimpleBooking.

```jsx
// packages/touril-ecosystem-ui-components/src/components/BookingWidget/BookingWidget.jsx
'use client'

import { useEffect } from 'react'

export const BookingWidget = ({ propertyId, className }) => {
  useEffect(() => {
    // Load SimpleBooking script
    const script = document.createElement('script')
    script.src = 'https://www.simplebooking.it/ibe/widget.js'
    script.setAttribute('data-property', propertyId)
    script.async = true
    document.body.appendChild(script)
    return () => document.body.removeChild(script)
  }, [propertyId])

  return <div id="simplebooking-widget" className={className} />
}
```

**Styling requirement:** The SimpleBooking widget renders inside an iframe. The outer container must match our brand (Clay CTA button, 0px radius input fields if customizable). Contact SimpleBooking support to confirm white-label CSS override options.

**Option B — Deep Link CTAs**

For pages where a full widget is inappropriate (e.g., hero sections), use direct booking links:

```
https://www.simplebooking.it/ibe/?hid=<property_id>&lang=pt
```

This opens the SimpleBooking IBE in a new tab or modal.

### 10.3 Booking CTA Requirements

- Primary CTA text: "Reservar" (pt) / "Book" (en) / "Reservar" (es)
- Minimum 1 CTA per page (header or hero)
- Room-specific booking: deep link with room pre-selected (`&room=<room_id>`)
- Sticky booking bar on Rooms page (desktop only): appears after scrolling past hero

### 10.4 Booking Flow Diagram

```
User Enters Site
      │
      ▼
Views Rooms ──→ Clicks "Reservar" on RoomCard
      │
      ▼
SimpleBooking Widget / Modal Opens
      │
      ▼
User Selects Dates → Confirms → Payment (handled by SimpleBooking)
      │
      ▼
Confirmation email sent by SimpleBooking
(No server-side code required on our end)
```

### 10.5 Action Required

- [ ] Obtain SimpleBooking property IDs for both Monte da Estrada and Monte do Papa-Léguas
- [ ] Confirm which widget integration method SimpleBooking supports (iframe / JS / API)
- [ ] Confirm CSS customization options for the widget
- [ ] Test booking flow end-to-end in staging before launch

---

## 11. Content Migration Plan

### 11.1 Monte da Estrada

**Source:** Existing `apps/monte-da-estrada/src/data/*.json` files + image assets
**Effort:** Low

| Content Type | Current Location | Target (CMS) | Action |
|--------------|------------------|--------------|--------|
| Rooms | `src/data/quartos.json` | CMS `Room` entries | Import via CMS UI or migration script |
| Activities | `src/data/` implied | CMS `Activity` entries | Create new CMS entries |
| Gallery | `src/assets/images/galeria/` | CMS Media | Upload and tag in CMS |
| Site settings | `src/data/site-settings.json` | CMS `SiteSettings` | Import |
| Location | `src/data/localizacao.json` | CMS `Location` | Import |

**Image audit required:** Review all images in `src/assets/images/` for quality alignment with the new editorial brand. Flag any images that do not meet the "warm natural light, intentional composition" standard for replacement.

### 11.2 Monte do Papa-Léguas (Wix Migration)

**Source:** Live Wix site at `montedopapaleguas.pt`
**Effort:** Medium

**Step 1 — Content Extraction**
- Export all text content from Wix pages (manual copy or Wix data export if available)
- Download all photography assets from Wix media manager
- Document all room names, descriptions, amenities, pricing

**Step 2 — Content Audit**
- Review all extracted copy against the Brand Voice guidelines (§5 of Brand Brief)
- Rewrite any copy that uses marketing jargon ("incredible views!", "luxury experience!")
- Ensure all text aligns with Boutique Collection voice: direct, curatorial, authentic

**Step 3 — Image Audit**
- Assess each image for quality: resolution (≥1920px wide), composition, lighting
- Flag images with cool color casts, heavy filters, or low quality for reshoot
- Target: minimum 15 high-quality images per property (hero + rooms + exterior + surroundings)

**Step 4 — CMS Upload**
- Populate CMS with audited content for Papa-Léguas
- Create content type parity with Monte da Estrada (same schema, different content)

**Step 5 — Wix Decommission**
- Redirect `montedopapaleguas.pt` DNS to new Vercel/Netlify deployment
- Set up 301 redirects for any indexed URLs
- Cancel Wix subscription after successful go-live (confirm DNS propagation first)

**Content Gap Analysis (known from Wix site):**

| Content Needed | Status | Action |
|----------------|--------|--------|
| Room descriptions (pt) | Exists on Wix | Extract + rewrite to brand voice |
| Room descriptions (en, es) | Unknown | Create or translate |
| Activity descriptions | Partial on Wix | Extract + expand |
| High-quality hero photography | Unknown quality | Audit on extraction |
| Location / Getting Here | Exists on Wix | Extract + update |
| Contact info | Exists on Wix | Transfer directly |

---

## 12. Phased Roadmap

### Phase 0: Foundation (Week 1–2)
> **Goal:** Establish the design system foundation and resolve open decisions.

**Prerequisites:**
- [ ] Resolve Decision D-1 (Tailwind vs SCSS)
- [ ] Resolve Decision D-2 (CMS selection)
- [ ] Obtain SimpleBooking property IDs

**Deliverables:**
- [ ] `_variables.scss` replaced with Boutique Collection tokens (or Tailwind config created)
- [ ] Font files sourced: Basis Grotesque license confirmed + locally hosted; Inter via Google Fonts
- [ ] Updated Header component (deep brown bg, cream text, clay accents)
- [ ] Updated Footer component (matching Header)
- [ ] `CollectionSwitcher` component built and integrated into Header
- [ ] `Button` component: Primary (Clay bg) + Secondary (outline) variants, 0px radius
- [ ] Motion constants file (`/src/constants/motion.js`) with all timing/variant definitions
- [ ] Framer Motion added to `touril-ecosystem-ui-components` dependencies
- [ ] CMS project created and schema defined

**Team:** 1 frontend engineer + design review

---

### Phase 1: Monte da Estrada Rebuild (Week 3–5)
> **Goal:** Restyle and complete the Monte da Estrada app to full brand compliance.

**Deliverables:**
- [ ] All pages restyled to Boutique Collection brand (cream bg, deep brown text, clay CTAs)
- [ ] Hero section with Framer Motion entrance animation
- [ ] Rooms page: `RoomCard` grid with staggered fade-up animation
- [ ] Room expanded view: lightbox or dedicated route with full gallery
- [ ] Gallery page: masonry grid with Framer Motion lightbox
- [ ] Activities page with map integration
- [ ] Contact page with form validation and email submission
- [ ] All pages SEO-optimized (Next.js metadata API)
- [ ] Content migrated to CMS; pages fetching from CMS (not static JSON)
- [ ] SimpleBooking widget integrated
- [ ] Multilingual: pt-PT (default) + en + es
- [ ] Lighthouse score: ≥90 on all pages
- [ ] `prefers-reduced-motion` tested

**Team:** 1–2 frontend engineers

---

### Phase 2: Monte do Papa-Léguas Build (Week 6–8)
> **Goal:** Build the Papa-Léguas app from scratch, parallel structure to Monte da Estrada.

**Deliverables:**
- [ ] Content extracted from Wix + audited + uploaded to CMS
- [ ] Papa-Léguas Next.js app scaffolded (clone Monte da Estrada app structure)
- [ ] Property-specific branding applied (Cool Taupe secondary color override)
- [ ] All pages built with Papa-Léguas content
- [ ] SimpleBooking widget integrated (Papa-Léguas property ID)
- [ ] Same multilingual support: pt-PT + en + es
- [ ] Lighthouse score: ≥90 on all pages
- [ ] 301 redirect plan prepared for Wix → new site

**Team:** 1–2 frontend engineers

---

### Phase 3: Quality Assurance (Week 9)
> **Goal:** Cross-browser testing, accessibility audit, performance optimization.

**Deliverables:**
- [ ] Cross-browser: Chrome, Firefox, Safari, Edge, Mobile Safari
- [ ] Device testing: iPhone 13 (375px), iPad (768px), MacBook (1440px), 4K (2560px)
- [ ] WCAG 2.1 AA audit:
  - Color contrast: minimum 4.5:1 (normal text), 3:1 (large text)
  - Keyboard navigation: all interactive elements accessible
  - Screen reader: semantic HTML, proper ARIA labels
  - All images: descriptive alt text
- [ ] Performance: Core Web Vitals all green (LCP ≤2.5s, CLS ≤0.1)
- [ ] End-to-end booking flow tested with SimpleBooking
- [ ] Form submission tested (Contact page)
- [ ] Collection Switcher tested across both domains
- [ ] `prefers-reduced-motion` verified on both apps

**Team:** QA engineer (or senior dev)

---

### Phase 4: Staging & Stakeholder Review (Week 10)
> **Goal:** Deploy to staging URLs for client review before DNS cutover.

**Deliverables:**
- [ ] Monte da Estrada deployed to staging URL (e.g., `staging.montedaestrada.com`)
- [ ] Papa-Léguas deployed to staging URL
- [ ] Stakeholder walkthrough and feedback session
- [ ] CMS walkthrough for non-technical content managers
- [ ] Address feedback (target: ≤5 change requests)
- [ ] Final photography review: confirm all images meet brand standard

---

### Phase 5: Launch & DNS Handover (Week 11–12)
> **Goal:** Go-live for both properties.

**Deliverables (Monte da Estrada — first):**
- [ ] Production deployment to Vercel/Netlify
- [ ] DNS cutover: `montedaestrada.com` → new deployment
- [ ] Verify DNS propagation (check from multiple geolocations)
- [ ] Smoke test: all pages, booking widget, contact form, multilingual
- [ ] Analytics configured (Vercel Analytics or Plausible)
- [ ] Google Search Console: submit sitemap

**Deliverables (Papa-Léguas — 1 week later):**
- [ ] Production deployment to Vercel/Netlify
- [ ] DNS cutover: `montedopapaleguas.pt` → new deployment
- [ ] 301 redirects from Wix URLs active
- [ ] Smoke test (same as above)
- [ ] Wix subscription cancellation (after 7-day DNS stability window)
- [ ] Google Search Console: submit sitemap for new domain configuration

---

## 13. Non-Functional Requirements

### Performance

| Metric | Target | Measurement Tool |
|--------|--------|------------------|
| Lighthouse Performance | ≥90 | Chrome DevTools |
| Largest Contentful Paint | ≤2.5s | Web Vitals |
| Cumulative Layout Shift | ≤0.1 | Web Vitals |
| First Input Delay | ≤100ms | Web Vitals |
| Page load (3G simulated) | ≤4s | Lighthouse |
| Bundle size (JS, gzipped) | ≤200kB per page | Next.js Bundle Analyzer |

### Accessibility

- WCAG 2.1 AA compliance (minimum)
- WCAG 2.1 AAA for text contrast (target: 7:1)
- All interactive elements keyboard accessible with visible focus indicator (2px Clay outline)
- `prefers-reduced-motion` respected throughout
- Semantic HTML: `<header>`, `<main>`, `<footer>`, `<nav>`, `<article>`, `<section>`

### Browser Support

- Chrome 120+ · Firefox 120+ · Safari 17+ · Edge 120+
- Mobile: iOS Safari 17+ · Chrome Mobile 120+
- No IE11 support required

### Security

- CSP headers configured (via Next.js middleware)
- No inline scripts (except necessary third-party embeds)
- Form submissions: CSRF protection via Next.js API routes
- No sensitive data in client-side environment variables (`NEXT_PUBLIC_*` are public)
- SimpleBooking handles all payment data (PCI compliance not required on our side)

---

## 14. Risk Register

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| `Basis Grotesque` / `GT Sectra` license not available | Medium | High | Identify fallback fonts now (e.g., `DM Sans` + `Lora`); verify license before Phase 0 ends |
| SimpleBooking widget not customizable to 0px radius | Medium | Low | Use direct-link CTAs as fallback; frame widget in styled container |
| Papa-Léguas Wix photography is low quality | High | Medium | Budget for photography session before Phase 2; accept temporary placeholder |
| Content migration from Wix is slower than expected | Medium | Medium | Begin Wix content extraction in parallel with Phase 1 |
| DNS propagation delays at launch | Low | High | Plan 24–72h buffer between DNS cutover and formal launch announcement |
| CMS selection delay blocks Phase 0 | Low | High | Decision D-2 must be resolved in Week 1; set hard deadline |
| Multilingual translation quality | Medium | Medium | Use professional translation (not AI) for final copy; budget accordingly |

---

## 15. Acceptance Criteria

The project is considered **complete and ready for launch** when ALL of the following are verified:

### Design & Brand

- [ ] All text uses approved typefaces: Basis Grotesque (display), Inter (body), GT Sectra (editorial moments only)
- [ ] All colors match the Boutique Collection palette — no legacy Touril black/gold values remain
- [ ] Letter-spacing applied: 1px on H1/H2, 0.75px on H3/H4/labels, 0.5px on body
- [ ] Border-radius: 0px on all UI chrome elements (buttons, cards, inputs, containers)
- [ ] Shadows: none (flat aesthetic)
- [ ] Whitespace: minimum 64px vertical padding on all sections
- [ ] Header and Footer identical in design across both properties
- [ ] Clay accent used only for: CTAs, active nav states, form focus borders

### Functionality

- [ ] Collection Switcher visible and functional on both properties
- [ ] SimpleBooking widget or deep-link CTA present on every page
- [ ] Booking flow tested end-to-end on both properties
- [ ] Contact form submits and delivers email correctly
- [ ] All multilingual pages (pt, en, es) load and display correctly
- [ ] Navigation accessible via keyboard on all pages

### Performance & Quality

- [ ] Lighthouse Performance ≥90 on all pages (both properties)
- [ ] WCAG 2.1 AA: all color contrasts verified (4.5:1 minimum)
- [ ] All images have descriptive alt text
- [ ] `prefers-reduced-motion` tested: all animations disabled
- [ ] Cross-browser test complete: Chrome, Firefox, Safari, Edge
- [ ] Mobile test complete: 375px, 768px breakpoints verified

### Content

- [ ] All Monte da Estrada content migrated to CMS and displaying correctly
- [ ] All Papa-Léguas content migrated from Wix, audited, and live
- [ ] All copy reviewed against Brand Voice guidelines (no marketing jargon)
- [ ] Photography: minimum 15 high-quality images per property in CMS

### Infrastructure

- [ ] DNS configured correctly for both domains
- [ ] SSL certificates active on both domains
- [ ] Sitemap submitted to Google Search Console
- [ ] Analytics tracking active (page views, booking CTA clicks minimum)
- [ ] Wix subscription cancelled after Papa-Léguas DNS stability confirmed

---

## Appendix A: Component Inventory

| Component | Package | Status | Priority |
|-----------|---------|--------|----------|
| `Header` | `ui-components` | Needs restyle | P0 |
| `Footer` | `ui-components` | Needs restyle | P0 |
| `CollectionSwitcher` | `ui-components` | New | P0 |
| `Button` | `ui-components` | New | P0 |
| `HeroSection` | `ui-components` | New | P0 |
| `RoomCard` | `ui-components` | Needs restyle | P1 |
| `RoomCardGallery` | `ui-components` | Needs restyle | P1 |
| `RoomExpandedCard` | `ui-components` | Needs restyle | P1 |
| `BookingWidget` | `ui-components` | New | P0 |
| `ImageLightbox` | `ui-components` | New | P1 |
| `ActivityCard` | `ui-components` | New | P2 |
| `ContactForm` | per-app | Needs restyle | P1 |
| `Map` | per-app | Needs restyle | P2 |
| `SEO` | per-app | Replace with metadata API | P0 |

---

## Appendix B: Font Sourcing Checklist

| Font | Source | License Required | Action |
|------|--------|-----------------|--------|
| Basis Grotesque | [Colophon Foundry](https://www.colophon-foundry.org/) | Yes — commercial web license | Purchase before Phase 0 ends |
| Inter | Google Fonts / Fontsource | Open source (SIL OFL) | `next/font/google` — no action needed |
| GT Sectra | [Grilli Type](https://www.grillitype.com/) | Yes — commercial web license | Purchase OR identify fallback if budget prohibitive |

**Fallback strategy** (if commercial fonts cannot be licensed):
- Basis Grotesque → `DM Sans` (Google Fonts, similar geometric character)
- GT Sectra → `Lora` (Google Fonts, contemporary serif)

---

## Appendix C: SimpleBooking Resources

- SimpleBooking website: https://www.simplebooking.it/
- Widget documentation: [Request from SimpleBooking support]
- Property IDs: **To be provided by client**

---

*Document prepared by Engineering Strategy Team, 2026-02-22*
*Based on Brand Identity Brief v1.0 (2026-02-22)*
*Next revision: After decisions D-1 and D-2 are resolved*
