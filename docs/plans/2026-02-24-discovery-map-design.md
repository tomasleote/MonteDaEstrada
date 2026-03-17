# Discovery Map — Design Document

**Date:** 2026-02-24
**Status:** Approved for Implementation
**Scope:** Shared library `DiscoveryMap` component + integration into `DescobrirPage`

---

## 1. Vision

An interactive "Insider's Guide" map for the Descobrir page that visualises three curated layers:
- **Our Collection** — Monte da Estrada, Papa-Léguas, Herdade do Touril
- **Owner's Spots** — Bar da Praia Almograve, Tasca do Celso, Manjedoura
- **Curated** — Beaches (Zambujeira, Carvalhal, etc.) and key regional attractions

The map is editorial, not utilitarian. It must feel like a hand-drawn insider's guide — not a Google Maps embed.

---

## 2. Architecture

### 2.1 Component Location

| Item | Location | Rationale |
|------|----------|-----------|
| `DiscoveryMap` component | `packages/touril-ecosystem-ui-components/src/components/DiscoveryMap/` | Shared lib, portable to Papa-Léguas |
| `map-locations.js` data | `apps/monte-da-estrada/src/data/map-locations.js` | Property-specific data stays in the app |
| `map.jsx` (mapcn) | `apps/monte-da-estrada/src/components/ui/map.jsx` | Already installed, left untouched |

### 2.2 MapLibre Strategy

The `DiscoveryMap` component in the shared library imports `maplibre-gl` **directly** — the same approach mapcn uses internally. This avoids any cross-package path alias issues (`@/components/ui/map` can't be resolved from the shared lib). Since the app already has `maplibre-gl` installed (via the monorepo workspace), the import resolves at build time.

The component uses the same React portal pattern for markers and popups that mapcn implements.

**Peer dependency to add to shared package:** `maplibre-gl` (already in app's node_modules).

### 2.3 Tailwind in Shared Lib

The `DiscoveryMap` component has permission to use Tailwind classes. Since it's consumed directly via workspace (no build step in the shared lib), the app's Vite + Tailwind pipeline processes it.

**Required change:** `apps/monte-da-estrada/tailwind.config.js` content array must include:
```js
"../../packages/touril-ecosystem-ui-components/src/**/*.{js,ts,jsx,tsx}"
```

This ensures Tailwind scans the shared lib and doesn't purge the DiscoveryMap's utility classes in production.

### 2.4 MapLibre CSS

`maplibre-gl/dist/maplibre-gl.css` is already imported by `src/components/ui/map.jsx`. The shared `DiscoveryMap` does NOT re-import it (avoid duplicate CSS). The app's `index.css` already resets the default MapLibre popup chrome:
```css
.maplibregl-popup-content { @apply bg-transparent! shadow-none! p-0! rounded-none!; }
.maplibregl-popup-tip { @apply hidden!; }
```

---

## 3. Data Schema

### 3.1 Location Object

```js
// apps/monte-da-estrada/src/data/map-locations.js
export const mapLocations = [
  {
    id: String,              // unique slug, e.g. 'monte-da-estrada'
    category: String,        // 'collection' | 'owner' | 'curated'
    type: String,            // display label, e.g. 'Alojamento', 'Restaurante', 'Praia'
    name: String,            // display name
    description: String,     // 1-2 sentence description
    coordinates: [Number, Number],  // [longitude, latitude]
    distance: String | null, // e.g. '8 km' | null (null = home base)
    imageSrc: String,        // image path
    imageAlt: String,        // alt text
    url: String | null,      // optional: external booking/info URL
    mapUrl: String | null,   // optional: Google Maps URL
  }
];
```

### 3.2 Initial Pins (Monte da Estrada)

**Collection (3 pins):**
- Monte da Estrada — `[-8.6124, 37.7302]`
- Monte do Papa-Léguas — approximate coordinates
- Herdade do Touril — approximate coordinates

**Owner's Spots (3 pins):**
- Bar da Praia Almograve — `[-8.6536, 37.6344]`
- Tasca do Celso — São Teotónio
- Manjedoura — to be confirmed

**Curated (8 pins):**
- Zambujeira do Mar — `[-8.7882, 37.5251]`
- Carvalhal — `[-8.7537, 37.6095]`
- Alteirinhos — approx
- Almograve — `[-8.6536, 37.6344]`
- Odeceixe — `[-8.7703, 37.4344]`
- Praia do Tonel (Sagres) — far south, optional
- São Teotónio (village) — `[-8.6832, 37.7074]`
- Vila Nova de Milfontes — `[-8.7878, 37.7256]`

---

## 4. Component Anatomy

### 4.1 File Structure

```
packages/touril-ecosystem-ui-components/src/components/DiscoveryMap/
├── DiscoveryMap.jsx          # Main component (≤ 200 lines)
├── DiscoveryMap.module.scss  # Section wrapper styles (SCSS — eyebrow, heading, filter)
└── index.js                  # Export barrel
```

### 4.2 Component API

```jsx
<DiscoveryMap
  locations={mapLocations}   // array of location objects (required)
  center={[-8.65, 37.65]}    // [lng, lat] initial map center (optional, defaults to region centroid)
  zoom={9}                    // initial zoom level (optional, default 9)
  height="520px"              // map canvas height (optional, default '520px')
/>
```

### 4.3 Internal State

```js
const [activeCategory, setActiveCategory] = useState('all');
// Filters displayed markers: 'all' | 'collection' | 'owner' | 'curated'
```

---

## 5. Visual Design

### 5.1 Section Layout

```
┌─────────────────────────────────────────────────────┐
│  [eyebrow] O Guia do Território          (cream bg) │
│  [h2]      Tudo o que fica perto.                   │
│                                                     │
│  [filter pills]  Todos · Coleção · Os Nossos ·      │
│                  Descobrir                          │
│                                                     │
│  ┌───────────────────────────────────────────────┐  │
│  │  CARTO light basemap (no API key)             │  │
│  │                                               │  │
│  │   ● (clay)        — Collection pins          │  │
│  │   ● (deep brown)  — Owner's spots            │  │
│  │   ○ (warm gray)   — Curated spots            │  │
│  │                                               │  │
│  │                              [+]  zoom        │  │
│  │                              [-]  controls    │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

**Section background:** Cream `#F5F3F0` (same as page).
**Map height:** 520px desktop, 380px mobile.
**Filter pills:** Reuse pattern from `DistanceFilterBar` but styled inline. Pill labels in Portuguese.

### 5.2 Marker Design

Three custom markers, each a `<div>` rendered via `createPortal` into a MapLibre Marker element:

| Category | Outer ring | Inner dot | Size |
|----------|-----------|-----------|------|
| `collection` | Clay `#B8925F` | Clay `#B8925F` | 14px outer, 8px inner |
| `owner` | Deep brown `#3D3B38` | Deep brown `#3D3B38` | 12px outer, 6px inner |
| `curated` | Warm gray `#DDD9D5` border | Deep brown `#3D3B38` fill | 10px outer, 5px inner |

All markers: circular, `border-radius: 50%`, `border: 2px solid white` (white halo for contrast over map). Hover: `transform: scale(1.2)`, `transition: 150ms`.

Active (popup open): scale 1.4, white border thickens to 3px.

### 5.3 Rich Popup Design

Popup opened by clicking a marker (`MarkerPopup` or equivalent portal pattern). No MapLibre popup arrow (already hidden via `index.css`). Width: 260px.

```
┌────────────────────────────────────────────┐
│ [image — 260×130px, object-fit cover]      │  ← no radius
├────────────────────────────────────────────┤
│                                            │
│  PRAIA            8 km ───────────────     │  ← type (clay, 11px caps) + distance badge
│  Zambujeira do Mar                         │  ← name (deep brown, 16px, font-display)
│  Praia selvagem encaixada em falésias...   │  ← description (deep brown, 13px, 2 lines)
│                                            │
│  → Ver no Mapa                             │  ← CTA link (clay, 12px)
│                                            │
└────────────────────────────────────────────┘
```

**Popup styles:**
- Background: Cream `#F5F3F0`
- Border: `1px solid #DDD9D5` (warm gray)
- Border-radius: `0px` (brand rule)
- No shadow (brand rule — flat aesthetic)
- Type label: Clay `#B8925F`, `font-size: 11px`, `letter-spacing: 1px`, `text-transform: uppercase`
- Name: Deep Brown `#3D3B38`, `font-family: $font-display`, `font-size: 16px`, `letter-spacing: 0.75px`
- Description: Deep Brown `#3D3B38`, `font-family: $font-body`, `font-size: 13px`, `line-height: 1.5`, max 2 lines (`overflow: hidden`, `-webkit-line-clamp: 2`)
- Distance badge: Warm Gray bg `#DDD9D5`, Deep Brown text, `font-size: 11px`
- CTA: Clay `#B8925F`, underline on hover

### 5.4 Filter Pills

```
[Todos]  [A Nossa Coleção]  [Os Nossos Sítios]  [Descobrir]
```

- Active: Clay bg `#B8925F`, Deep Brown text, no border-radius
- Inactive: Cream bg, Warm Gray border, Deep Brown text
- Hover: opacity 0.85, transition 150ms

---

## 6. Page Integration

### 6.1 Insertion Point

`DescobrirPage.jsx` — inserted as **S3.5** between `EditorialSplitSection` ("O Território") and the `<section id="experiencias">`:

```jsx
{/* S3 — O Território ─────────────────────── */}
<EditorialSplitSection ... />

{/* S3.5 — Discovery Map ───────────────────── */}
<section id="mapa" className={styles.mapSection}>
  <div className={styles.container}>
    <DiscoveryMap locations={mapLocations} />
  </div>
</section>

{/* S4 — Experiências ──────────────────────── */}
<section id="experiencias" ...>
```

### 6.2 NAV_ITEMS Update

Add "Mapa" as the second nav item (between "Experiências" and current order):

```js
const NAV_ITEMS = [
  { id: 'experiencias', label: 'Experiências' },
  { id: 'mapa',         label: 'Mapa' },          // ← new
  { id: 'praias',       label: 'Praias' },
  { id: 'redondezas',   label: 'Redondezas' },
];
```

### 6.3 New Imports in DescobrirPage

```js
import { DiscoveryMap } from '@touril-ecosystem/ui-components';
import mapLocations from '@/data/map-locations';
```

---

## 7. Implementation Phases

### Phase 1 — Tailwind Config + Peer Dep
1. Update `apps/monte-da-estrada/tailwind.config.js` → add shared lib to content paths
2. Note `maplibre-gl` as needed peer dep in shared `package.json` comments

### Phase 2 — Data File
3. Create `apps/monte-da-estrada/src/data/map-locations.js` with all pins + coordinates

### Phase 3 — DiscoveryMap Component (Shared Lib)
4. Create `DiscoveryMap/DiscoveryMap.jsx` — map canvas, markers, popups, filter pills, state
5. Create `DiscoveryMap/DiscoveryMap.module.scss` — section wrapper, filter pills, popup
6. Create `DiscoveryMap/index.js` — export barrel

### Phase 4 — Shared Lib Export
7. Export `DiscoveryMap` from `packages/touril-ecosystem-ui-components/src/index.js`

### Phase 5 — Page Integration
8. Update `DescobrirPage.jsx` — import data + component, insert S3.5 map section, add NAV_ITEMS entry
9. Update `DescobrirPage.module.scss` — `.mapSection` styles

---

## 8. Key Constraints

- **0px border-radius** everywhere (markers are circular — `border-radius: 50%` is the only exception, it is structural not decorative)
- **No shadows** on popup (brand rule — flat aesthetic)
- **No API key** required (CARTO free tiles used by default from mapcn)
- **Maplibre-gl CSS** already imported in app — shared component must NOT re-import it
- **Tailwind content paths** must be updated before shared lib Tailwind classes purge correctly
- **SCSS** used for section wrapper; Tailwind allowed inside the map canvas and popup (mirroring mapcn's approach)
