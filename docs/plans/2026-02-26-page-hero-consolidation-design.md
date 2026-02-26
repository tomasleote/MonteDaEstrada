# Design: PageHero Consolidation
**Date:** 2026-02-26
**Status:** Approved

## Problem

Four internal pages (Descobrir, Galeria, Quartos, Contacto) each implement their hero section differently:

| Page | Component | Height | Layout | Overlay |
|---|---|---|---|---|
| Descobrir | `DiscoveryHero` (shared lib) | 65vh / 420–700px | Centered | deep-brown 20%→55% |
| Galeria | Local `Hero` (`@/components/Hero`) | 60vh prop | Centered | Black 40% (off-brand) |
| Quartos | Inline SCSS block | 55vh / 380–560px | Bottom-left | cream 8%→deep-brown 55% |
| Contacto | Inline SCSS block (duplicate) | 55vh / 380–560px | Bottom-left | cream 8%→deep-brown 55% |

## Decision

Rename `DiscoveryHero` → `PageHero` in the shared library. Migrate all four internal pages to use `PageHero`. Delete the local `Hero` component. Homepage (`ImmersiveHero`) is not touched.

**Canonical layout:** Centered text (eyebrow · headline · subtitle stack).

## Component Spec

**Location:** `packages/touril-ecosystem-ui-components/src/components/PageHero/`

**Props:**
```
imageSrc            string   required
imageAlt            string   required
headline            string   required
eyebrow             string   optional
subtitle            string   optional
photographerCredit  string   optional
className           string   optional
```

**Visual spec (unchanged from DiscoveryHero):**
- Height: `65vh`, min `420px`, max `700px`
- Mobile: `55vh`, min `360px`
- Overlay: `rgba(deep-brown, 0.20) → rgba(deep-brown, 0.55)`
- Framer Motion: staggered entrance (eyebrow 0.1s → headline 0.25s → subtitle 0.45s)

## Changes

### Shared Library
1. Rename folder `DiscoveryHero/` → `PageHero/`
2. Rename files: `DiscoveryHero.jsx` → `PageHero.jsx`, `DiscoveryHero.module.scss` → `PageHero.module.scss`
3. Update internal function name and JSDoc
4. Root `index.js`: export `PageHero`; keep `DiscoveryHero` as alias re-export

### Page Migrations
- **DescobrirPage:** `DiscoveryHero` → `PageHero` (import + JSX tag)
- **GaleriaPage:** Remove local `Hero` import; add `PageHero` with correct props from `galeriaData`
- **QuartosPage:** Remove inline hero section + SCSS; add `<PageHero>`
- **ContactoPage:** Remove inline hero section + SCSS; add `<PageHero>`

### Cleanup
- Delete `apps/monte-da-estrada/src/components/Hero/` (entire folder)

## Out of Scope
- `HomePage.jsx` — not touched
- `ImmersiveHero` — not touched
- All non-hero SCSS in Quartos/Contacto page files — not touched
