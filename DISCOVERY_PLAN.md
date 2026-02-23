# DISCOVERY ECOSYSTEM — Strategic Implementation Plan

> **Project:** Monte da Estrada — Descobrir Page Redesign
> **Date:** 2026-02-23
> **Branch:** `version-2-TourilStyle`
> **Status:** PROPOSAL — Awaiting approval before implementation

---

## 1. BENCHMARK AUDIT — memmo Alfama /experiences

### What They Do Well
- **Single-page narrative**: No category pages — all experiences live on one scrollable editorial page
- **WhatsApp-first CTA**: Direct link to WhatsApp + PDF activity calendar for booking friction reduction
- **Locality framing**: "Where the heart of Alfama beats" — the neighbourhood IS the product, not the hotel
- **Community-driven experiences**: Embroidery with grandmothers, ceramics workshops — experiences feel authentic, not corporate

### What They Do Poorly (Our Opportunity)
- **Flat visual hierarchy**: All experiences are identical text blocks — no visual differentiation between a Fado Night and Morning Yoga
- **Zero imagery**: No photography on the experiences page — just text cards. For a visual medium (hospitality), this is a missed opportunity
- **No navigation**: 6+ experiences in a scrolling list with no way to jump or filter. On mobile, users must scroll through everything
- **No territory context**: Experiences exist in a vacuum — no map, no distances, no sense of place
- **Generic component system**: Cookie-cutter GuestCentric hotel platform — nothing bespoke

### Our Strategic Advantage
Monte da Estrada has what Memmo doesn't: **the territory itself is the experience**. They have a terrace bar in Lisbon. We have 18km of untamed Atlantic coastline, the Rota Vicentina at our door, and the last wild coast in Europe. Our Discovery page must make this landscape feel tangible — not listed, but *felt*.

---

## 2. ARCHITECTURAL VISION

### The Narrative Arc
The page unfolds like a travel editorial — not a menu. Three acts:

```
ACT I   — The Territory     (Who we are, where we are)
ACT II  — Curated Moments   (What we've arranged for you)
ACT III — The Coast          (What surrounds you)
```

### Page Section Sequence (9 sections)

| #  | Component              | Content                                          | Background       |
|----|------------------------|--------------------------------------------------|------------------|
| 1  | `DiscoveryHero`        | Territory photography + "Descobrir" eyebrow      | Photography      |
| 2  | `CategoryNav` (sticky) | Experiências · Praias · Redondezas               | Cream            |
| 3  | `EditorialSplitSection`| "O Território" — prose + landscape image         | Cream            |
| 4  | `ExperienceCard` grid  | 6 curated experiences (3-col portrait cards)     | Sand `#EDE8E2`   |
| 5  | `EditorialPullQuote`   | Territory editorial quote + clay left border     | Cream            |
| 6  | `FullBleedQuote`       | Coastal photography + overlaid text (50vh)       | Photography      |
| 7  | `BeachCard` grid       | 5 beaches (2-col cinematic 16:9)                 | Cream            |
| 8  | Dark section wrapper   | "As Redondezas" — filter + attraction cards      | Deep Brown       |
| 9  | `BookingSection`       | CTA with contact info (reused from HomePage)     | Deep Brown       |

---

## 3. COLOR STRATEGY

### One New Token: Sand
```scss
$color-sand: #EDE8E2;  // 3% warmer than cream — Discovery alternate sections only
```

The Homepage canvas is pure cream with off-white alternation. The Discovery page shifts one degree warmer because its content is about **soil, coastline, cork oak, salt wind**. Sand replaces off-white as the alternating section background.

### Key Decisions
- **No category color-coding.** All experience categories use clay `#B8925F` for eyebrow labels. Color-coding would fragment the brand and make this look like a travel aggregator.
- **The Redondezas section inverts the page.** Deep brown background with charcoal `#4A4845` card backgrounds — strongest visual break on the page.
- **Hero overlay is lighter** (20% → 55% vs Homepage's 25% → 60%) — territory photography must read clearly.
- **Clay appears as structural element ONCE**: the pull quote's 3px left border. Everywhere else, clay is typographic or interactive.

---

## 4. COMPONENT LIBRARY — 8 New Shared Components

All components go in `packages/touril-ecosystem-ui-components/src/components/`.

### 4.1 `DiscoveryHero`
- **65vh** (not 100vh like ImmersiveHero) — shorter, more purposeful
- Three-part text stack: eyebrow + headline (font-weight 300) + subtitle
- **No scroll indicator** — the shorter height means the next section is already visible
- Lighter overlay for clearer photography

### 4.2 `ExperienceCard`
- **Portrait 3:4 aspect ratio** — magazine-style, not generic 16:9
- No card background, no box shadow — transparent with bottom border
- Category label at 11px (smaller than caption) with 2px letter-spacing
- Highlights rendered as inline tags with middot separator, not bullet lists
- Hover: image scales 1.03, border transitions to clay. No vertical lift.

### 4.3 `EditorialPullQuote`
- **Only component using `$font-editorial`** (GT Sectra / Lora) — italic serif
- 3px clay left border — the single structural use of clay on the page
- Generous 80px vertical padding — whitespace IS the design
- Viewport trigger at 40% visibility — forces deliberate pause

### 4.4 `CategoryNav`
- Sticky below header after hero exits viewport
- Anchor links with smooth scroll to sections
- Active underline uses Framer Motion `layoutId` for sliding animation
- Mobile: horizontal scroll with fade-edge masks, auto-centers active item

### 4.5 `BeachCard`
- **Cinematic 16:9** landscape orientation (beaches deserve width)
- Content overlaid via gradient scrim on image bottom
- Unique "golden hour" warm overlay on hover (`rgba(clay, 0.08)`)
- 2-column grid (not 3) — wider, more immersive

### 4.6 `AttractionPinCard`
- Horizontal layout (image left, text right) on dark background
- Charcoal `#4A4845` card bg — subtle lift from deep brown section
- Square image crop on desktop, 16:9 on mobile
- Hover: card lightens, image dims slightly — shifts weight to text

### 4.7 `FullBleedQuote`
- FullBleedImage variant with editorial quote overlay instead of caption
- 50vh (shorter than FullBleedImage's 70vh)
- Single parallax element on the page (0.85x scroll speed via Framer Motion)
- Disabled under `prefers-reduced-motion`

### 4.8 `DistanceFilterBar`
- Designed for dark backgrounds (cream text, `rgba(cream, 0.2)` borders)
- Active state: clay border + clay text (no fill — refinement, not toggle)
- "Filtrar por distância" label above buttons

### Reused Components (no changes needed)
- `EditorialSplitSection` — for "O Território" intro
- `BookingSection` — final CTA
- `SectionEyebrow` — section headers

---

## 5. TYPOGRAPHY HIERARCHY

### The Third Voice
The Homepage uses two fonts: display (Basis Grotesque/DM Sans) and body (Inter). The Discovery page introduces `$font-editorial` (GT Sectra/Lora) as a **contemplative third voice**, appearing in exactly two places: `EditorialPullQuote` and `FullBleedQuote`.

### Key Decisions
- **Category labels at 11px** (not 12px) — whispered classifications, not shouted categories
- **All section headings font-weight 300** (light) — consistent with HomePage editorial sections
- **No bold body text** anywhere — emphasis through spacing and color, not weight
- **Pull quote is the only italic** on the entire site — maximum typographic contrast

---

## 6. CONTENT MAPPING — New Activity Data

### Curated Experiences (replaces generic `atividades.json` activities)

| Category          | Title                              | Description                                                          |
|-------------------|------------------------------------|----------------------------------------------------------------------|
| Gastronomia       | Piqueniques para Caminhantes       | Light picnic baskets for trail walkers — fruit, cheese, bread        |
| Gastronomia       | Cesta de Piquenique                | Full romantic picnic — wine, charcuterie, blanket, curated spot      |
| Gastronomia       | Prova de Vinhos Regionais          | Atlantic & Alentejo wines — guided tasting at the property           |
| Natureza Ativa    | Caminhadas na Rota Vicentina       | Guided Fisherman's Trail — coastal cliffs, hidden beaches            |
| Natureza Ativa    | Trilhos em E-bike                  | Guided local exploration — cork oak trails, no traffic               |
| Paisagens         | Sunset Chaser                      | Jeep excursion + wine & appetizers at the best sunset viewpoint      |
| Bem-Estar         | Massagens                          | Relaxation massage at Touril + Pool Bar drink                        |

### Beaches (5 featured)

| Beach                | Distance  |
|----------------------|-----------|
| Zambujeira do Mar    | 10 km     |
| Carvalhal            | 15 km     |
| Odeceixe             | 35 km     |
| Alteirinhos          | 20 km     |
| Tonel                | 50 km     |

---

## 7. AMENITY MIGRATION TO HOMEPAGE

### Current State
The "Na Casa" (Monte Amenities) section lives at the bottom of DescobrirPage — Pool, Garden, BBQ, Bicycles, Wi-Fi, Parking, Shared Kitchen, Terrace.

### Proposed Migration
Move amenities to the **HomePage** as a new Section 5.5 — between the current "Full Bleed Photography Break" (S5) and "O Território" (S6).

**New component: `AmenityStrip`** (shared library)
- A horizontal scrollable strip of icon + label pairs
- Background: cream with warm-gray top/bottom borders
- Icons: minimal line-art SVGs (no emoji)
- Layout: centered flex row on desktop, horizontal scroll on mobile
- Typography: 11px uppercase labels, cool-taupe color
- No descriptions — just the icon and name. The amenities are a whisper, not a feature list.

This gives amenities a premium "at a glance" treatment without the heavy 4-column grid cards that currently exist.

---

## 8. MOTION & INTERACTION SUMMARY

### Design Principle: "Unfolding a Map"
Content does not pop or bounce. It was always there; the scroll reveals it.

| Element                  | Animation           | Duration | Easing          | Trigger        |
|--------------------------|---------------------|----------|-----------------|----------------|
| Hero content             | fadeIn               | 700ms    | ease.elegant    | Immediate      |
| CategoryNav              | slideDown            | 300ms    | ease.entrance   | Hero exits VP  |
| Territory text           | fadeUp               | 500ms    | ease.entrance   | 15% visible    |
| Experience cards         | stagger (60ms gap)   | 500ms/ea | ease.entrance   | 15% visible    |
| Pull Quote               | fadeIn               | 700ms    | ease.elegant    | 40% visible    |
| FullBleedQuote           | fadeIn               | 500ms    | ease.standard   | 5% visible     |
| Beach cards              | stagger (80ms gap)   | 500ms/ea | ease.entrance   | 15% visible    |
| Attraction cards         | stagger (40ms gap)   | 500ms/ea | ease.entrance   | 15% visible    |
| Filter transitions       | exit 200ms → enter   | stagger  | ease.entrance   | On filter click|

### Reduced Motion
All stagger delays → 0, durations halved, parallax disabled, hover transforms removed.

---

## 9. SCALABILITY — Papa-Léguas Ready

### Multi-Property Architecture
All 8 new components are in the **shared library** (`@touril-ecosystem/ui-components`), not the app. This means Papa-Léguas (the second hotel) can use:
- The same `DiscoveryHero`, `ExperienceCard`, `BeachCard`, etc.
- Different content/data passed as props
- Different hero imagery
- The CSS custom property `--color-property-secondary` (already in `_variables.scss:80`) allows per-property color overrides if Papa-Léguas needs different accent tones

### Data Structure
Activity data should move from the current `atividades.json` (flat list) to a structured format:
```json
{
  "experiences": [
    {
      "category": "gastronomia",
      "title": "Piqueniques para Caminhantes",
      "description": "...",
      "highlights": ["Fruta local", "Queijo de Ovelha", "Pão de São Teotónio"],
      "imageSrc": "..."
    }
  ],
  "beaches": [...],
  "attractions": [...]
}
```

---

## 10. IMPLEMENTATION PHASES

### Phase A — Foundation (Components 1-3 + Data)
**Scope:** DiscoveryHero, ExperienceCard, EditorialPullQuote + new data file + `$color-sand` token
**Files:** ~12 new files + 3 modified
**Deliverable:** The first three sections of the page render correctly

### Phase B — Navigation & Beaches (Components 4-5)
**Scope:** CategoryNav (sticky), BeachCard + beach data
**Files:** ~6 new files
**Deliverable:** Sticky nav works, beaches section renders with cinematic cards

### Phase C — Dark Territory (Components 6-8)
**Scope:** FullBleedQuote, AttractionPinCard, DistanceFilterBar + dark section wrapper
**Files:** ~9 new files
**Deliverable:** Redondezas section with dark theme, filter functionality, parallax quote

### Phase D — Assembly & Polish
**Scope:** Wire all sections into DescobrirPage.jsx, motion tuning, responsive QA
**Files:** 2 modified (DescobrirPage.jsx + .module.scss) + shared index.js exports
**Deliverable:** Complete page, all sections assembled, all animations working

### Phase E — Amenity Migration
**Scope:** Build AmenityStrip component, integrate into HomePage between S5 and S6
**Files:** ~3 new files + 1 modified (HomePage.jsx)
**Deliverable:** Amenities removed from Descobrir, integrated into Homepage

---

## 11. AGENT TEAM STRUCTURE (for implementation)

```
┌─────────────────────────────────────────────────────┐
│                  ORCHESTRATOR                        │
│  (coordinates phases, manages dependencies)          │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Phase A ─── heavy-lift-coder agent                  │
│              Build 3 components + data structure      │
│                                                      │
│  Phase B ─── react-specialist agent                  │
│              CategoryNav (IntersectionObserver,       │
│              layoutId, horizontal scroll)             │
│                                                      │
│  Phase C ─── heavy-lift-coder agent                  │
│              Build 3 dark-theme components            │
│                                                      │
│  Phase D ─── fullstack-developer agent               │
│              Page assembly, wiring, responsive QA     │
│                                                      │
│  Phase E ─── react-specialist agent                  │
│              AmenityStrip + HomePage integration      │
│                                                      │
│  Review ──── code-reviewer agent (after each phase)  │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## 12. FILES SUMMARY

### New Files (27 total)
```
packages/touril-ecosystem-ui-components/src/components/
  DiscoveryHero/          (3 files: .jsx, .module.scss, index.js)
  ExperienceCard/         (3 files)
  EditorialPullQuote/     (3 files)
  CategoryNav/            (3 files)
  BeachCard/              (3 files)
  AttractionPinCard/      (3 files)
  FullBleedQuote/         (3 files)
  DistanceFilterBar/      (3 files)
  AmenityStrip/           (3 files)

apps/monte-da-estrada/src/data/
  descobrir.json          (new structured data file)
```

### Modified Files (5 total)
```
packages/touril-ecosystem-ui-components/src/styles/_variables.scss  (add $color-sand)
packages/touril-ecosystem-ui-components/src/index.js               (export 9 new components)
apps/monte-da-estrada/src/styles/_variables.scss                   (add $color-sand + alias)
apps/monte-da-estrada/src/pages/DescobrirPage/DescobrirPage.jsx    (full rewrite)
apps/monte-da-estrada/src/pages/DescobrirPage/DescobrirPage.module.scss (simplified wrapper)
apps/monte-da-estrada/src/pages/HomePage/HomePage.jsx              (add AmenityStrip section)
```

---

## 13. SUCCESS CRITERIA

- [ ] Page feels like a high-end travel editorial, not a hotel feature list
- [ ] Navigation between activities is fluid — sticky nav with smooth scroll + animated underline
- [ ] Immersive photography treatment — portrait experience cards, cinematic beach cards, parallax quote
- [ ] Dark Redondezas section creates dramatic visual break with functional filtering
- [ ] All components in shared library — ready for Papa-Léguas
- [ ] Editorial serif (GT Sectra/Lora) appears in exactly 2 places — restrained, deliberate
- [ ] All animations respect `prefers-reduced-motion`
- [ ] Mobile-first responsive across all breakpoints
- [ ] Amenities live on the Homepage as a premium strip, not a feature grid
