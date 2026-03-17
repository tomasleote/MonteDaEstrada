# Gallery System Redesign — Design Document
**Date:** 2026-02-23
**Status:** Approved

---

## Problem

The current `GaleriaPage` renders a uniform 3-column grid with all images forced into a 4:3 aspect ratio. This:
- Destroys the natural character of images (landscapes feel cropped, portraits feel truncated)
- Has no editorial organization — all 20+ images in a single undifferentiated grid
- Uses CSS-only animations in the Lightbox (no Framer Motion, inconsistent with page-level motion patterns)
- Does not surface the property's two narratives: *the estate* vs *the surrounding territory*

---

## Design

### Page Architecture

```
GaleriaPage
 ├── SEO
 ├── Hero (existing — id="galeria-hero")
 ├── CategoryNav ["O Monte", "A Região"]
 │    └── Reuses existing shared component (CategoryNav)
 │    └── targetId="galeria-hero" — appears once hero exits viewport
 ├── Section id="o-monte"
 │    ├── SectionHeader — eyebrow + title + body
 │    └── MasonryGrid — exterior/* + home/* + galeria/*
 ├── Section id="a-regiao"
 │    ├── SectionHeader — eyebrow + title + body
 │    └── MasonryGrid — descobrir/* + redondezas/*
 └── Lightbox (Framer Motion upgrade)
```

---

### Layout Engine — CSS `column-count` Masonry

**Rationale:** No JS measuring, no forced aspect ratios, no layout shift. Images maintain their natural proportions and column-count masonry packs them densely — exactly the asymmetric rhythm from the benchmark.

```scss
.masonryGrid {
  column-count: 3;       // desktop
  column-gap: $spacing-s; // 8px
}

// Tablet
@media (max-width: 1023px) { column-count: 2; }

// Mobile
@media (max-width: 767px)  { column-count: 1; }

.masonryItem {
  break-inside: avoid;
  margin-bottom: $spacing-s;
  overflow: hidden;
  cursor: pointer;
}

.masonryItem img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 350ms ease;
}

.masonryItem:hover img {
  transform: scale(1.025);
}
```

**Border radius:** 0px everywhere (brand rule enforced).
**Box shadows:** None (brand rule).

---

### Image Sections

**O Monte — O Espaço** (~23 images):
- Source: `galeriaImages.gallery` (DSC photos from galeria/)
- Source: `homeImages.gallery` (12 property views)
- Source: `exteriorImages.amenities` (9 amenity shots)

**A Região — O Território** (~18 images):
- Source: `descobrirImages.experiences` (6 activity shots)
- Source: `descobrirImages.beaches` (6 beach shots)
- Source: `descobrirAttractions.attractions` (6 town/village photos from redondezas/)

All images are already indexed with `src`, `alt`, `title` in their respective `index.js` manifests — no new data files needed.

---

### Lightbox — Framer Motion Upgrade

**Changes to `Lightbox.jsx`:**
1. Wrap the modal with `AnimatePresence` at the call site in `GaleriaPage`
2. Replace CSS `@keyframes fadeIn` on `.lightbox` with `motion.div` animate props
3. Replace CSS `@keyframes zoomIn` on `.image` with `AnimatePresence mode="wait"` + `motion.img`
4. Image transition: `opacity: 0→1` + `scale: 0.97→1`, duration 350ms, `ease: [0.32, 0, 0.67, 0]`
5. Modal enter: `opacity: 0→1`, duration 300ms
6. Modal exit: `opacity: 1→0`, duration 200ms
7. All keyboard navigation, close, and prev/next logic unchanged
8. The lightbox receives an `images` array that is section-scoped — clicking an image in "O Monte" shows only O Monte images in the lightbox, not the full combined set

**New Lightbox prop:** `section` (string, optional) — not used for display, helps with future analytics.

---

### CategoryNav Integration

```jsx
const NAV_ITEMS = [
  { id: 'o-monte', label: 'O Monte' },
  { id: 'a-regiao', label: 'A Região' },
];

<CategoryNav
  items={NAV_ITEMS}
  targetId="galeria-hero"
  headerHeight={72}
/>
```

The hero section gets `id="galeria-hero"` so the nav appears once user scrolls past it.

---

### Editorial Headers

Each section opens with a minimal header:

```
[eyebrow — "GALERIA · O MONTE"]
[title — "O Espaço"]
[body — short prose about the estate / the territory]
```

Typography: eyebrow uses `$color-cool-taupe` + `$letter-spacing-headline` (1px).
Title uses `$font-display` + `$font-size-h2`.

---

## Implementation Plan

### Files to Create
- `apps/monte-da-estrada/src/pages/GaleriaPage/GaleriaPage.jsx` — rebuilt (no new file)
- `apps/monte-da-estrada/src/pages/GaleriaPage/GaleriaPage.module.scss` — rebuilt

### Files to Modify
- `apps/monte-da-estrada/src/components/Lightbox/Lightbox.jsx` — Framer Motion upgrade
- `apps/monte-da-estrada/src/components/Lightbox/Lightbox.module.scss` — remove @keyframes replaced by motion

### No New Files Required
- All image assets already exist with indexed manifests
- `CategoryNav` already exported from shared package
- `motion` already installed

---

## Constraints

- 0px border-radius everywhere — enforced in SCSS
- No box-shadows — enforced by brand variables
- Font: `$font-display` for section titles with `$letter-spacing-headline` (1px)
- Transitions: 300–400ms range
- Lazy loading: `loading="lazy"` on all `<img>` tags
- Accessibility: cursor pointer, focus ring on items, aria-label on lightbox
