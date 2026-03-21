# Monte da Estrada — Mobile Responsiveness Audit Report
**Date:** 2026-03-18
**Agents:** 6 (Layout & Breakpoints, Component Responsiveness, Typography & Spacing, Interaction & UX, Performance & Loading, Edge Cases & Device Quirks)
**Scope:** Full codebase — `apps/monte-da-estrada` + `packages/touril-ecosystem-ui-components`

---

## AUDIT SUMMARY

| Severity | Count |
|----------|-------|
| Critical | 10 |
| Medium | 17 |
| Minor | 12 |
| **Total** | **39** |

---

## SECTION 1: CRITICAL ISSUES

### C1. SuiteCarousel — Touch Cannot Pause Auto-Play
- **File:** `packages/touril-ecosystem-ui-components/src/components/SuiteCarousel/SuiteCarousel.jsx:37-41`
- **Issue:** `onMouseEnter`/`onMouseLeave` pause the 5s auto-play Ken Burns animation. On touch devices, users cannot stop the animation.
- **UX Impact:** Continuous motion on a luxury property site; accessibility violation.
- **Fix:**
```jsx
// Add pointer down/up toggle; pause on coarse pointer
onPointerDown={() => setIsPaused(true)}
onPointerUp={() => setIsPaused(false)}
// Or use: @media (hover: none) and (pointer: coarse) to disable auto-play
```

---

### C2. Hover-Only Content Overlays (Multiple Components)
- **Files:**
  - `apps/monte-da-estrada/src/components/ImageGallery/ImageGallery.module.scss:54-60`
  - `apps/monte-da-estrada/src/components/Slideshow/Slideshow.module.scss:37-39`
  - `packages/touril-ecosystem-ui-components/src/components/ActivityHighlights/ActivityHighlights.module.scss:136`
- **Issue:** `.overlay`, `.imageOverlay`, `.distance` appear only on `:hover`. No touch equivalent.
- **UX Impact:** Mobile users see no indication images are tappable; distance data hidden on touch.
- **Fix:**
```scss
.imageWrapper:active .overlay { opacity: 1; }
.imageContainer:active .imageOverlay { opacity: 1; }
@media (hover: none) and (pointer: coarse) { .distance { opacity: 1; } }
```

---

### C3. Hero Images Missing LCP Optimization
- **Files:** `ImmersiveHero.jsx:35`, `PageHero.jsx:38`
- **Issue:** No `fetchpriority="high"`, `loading="eager"`, or `decoding="async"`. Browser defaults to lazy-load for above-the-fold LCP images.
- **UX Impact:** 2-4s LCP delay on mobile; blank/gradient before photography appears.
- **Fix:**
```jsx
<img src={imageSrc} alt={imageAlt} className={styles.image}
  fetchpriority="high"
  loading="eager"
  decoding="async"
/>
```

---

### C4. SuiteCarousel — Triple Animation Jank
- **Files:** `SuiteCarousel.jsx:42-60`, `SuiteCarousel.module.scss`
- **Issue:** Ken Burns (1.02x/5s Framer Motion) + 5s auto-play interval + 800ms cross-fade all run simultaneously. Two full-bleed images animating at once on mobile GPU.
- **UX Impact:** Frame drops on mid-range Android; battery drain; jarring transitions.
- **Fix:**
```jsx
// Pause Ken Burns on mobile
const isMobile = useMediaQuery('(max-width: 768px)');
// Disable Ken Burns: remove animate={{ scale: 1.02 }} on mobile
// Or: transition={{ duration: 8 }} to reduce GPU pressure
// Pause auto-play on touch: useMediaQuery('(pointer: coarse)')
```

---

### C5. Legacy Header — No Mobile Navigation
- **File:** `packages/touril-ecosystem-ui-components/src/components/Header/Header.module.scss`
- **Issue:** Entire file has no hamburger menu or mobile menu toggle. Nav links shrink to 11px but never collapse.
- **UX Impact:** Broken navigation on mobile — completely unusable.
- **Fix:** Add hamburger toggle + `.mobileMenu` panel (reference `HeaderModern` pattern in same package).

---

### C6. SuiteAlentejanaSection — Hardcoded px Typography
- **File:** `packages/touril-ecosystem-ui-components/src/components/SuiteAlentejanaSection/SuiteAlentejanaSection.module.scss:35-50`
- **Issue:** `heading: 48px→40px→32px` hardcoded steps (not fluid). `font-weight: 700` instead of brand light (300). No `clamp()`.
- **UX Impact:** Jarring 3-step resize; heading weight conflicts with editorial brand standard.
- **Fix:**
```scss
.heading {
  font-size: clamp(2rem, 4vw, 3rem);  // ~32px→48px fluid
  font-weight: $font-weight-light;      // 300 — brand editorial standard
}
.tagline {
  font-size: clamp(1rem, 1.5vw, 1.25rem);
}
```

---

### C7. `100vh` Viewport Issues on iOS/Android
- **Files:**
  - `ImmersiveHero.module.scss:11` — `height: 100vh`
  - `NavBar.module.scss:151` — `height: calc(100vh - 60px)`
  - `BookingTab.jsx:19` — `window.innerHeight` as scroll target
  - `ImmersiveHero.jsx:29` — `window.innerHeight` for scroll position
- **Issue:** `100vh` on iOS/Android = full viewport including toolbar. When toolbar collapses, visible area grows but `100vh` stays fixed, causing overflow or cut-off. `window.innerHeight` captured at mount is stale.
- **UX Impact:** Hero content buried under/above toolbar; scroll mis-targets by 50-80px.
- **Fix:**
```scss
// CSS
height: 100dvh;  // Dynamic viewport — tracks toolbar
max-height: 100dvh;
```
```js
// JS — use clientHeight (updates on resize)
window.scrollTo({ top: document.documentElement.clientHeight, behavior: 'smooth' });
```

---

### C8. Safe Area Insets Missing on Fixed Elements
- **Files:**
  - `HeaderModern.module.scss:398-411` — `.mobileMenu` no bottom safe area
  - `NavBar.module.scss:146-176` — `.menu` no bottom safe area, overlay too
  - `CategoryNav.module.scss:12-21` — `.nav` no top safe area
  - `ImmersiveHero.module.scss:77-79` — scroll indicator not safe-area-aware
- **Issue:** Fixed/sticky elements don't account for notched devices (iPhone 14 Pro Dynamic Island, home indicator).
- **UX Impact:** Content hidden behind notch or home indicator on iPhone.
- **Fix:**
```scss
.mobileMenu {
  padding-bottom: max($spacing-l, env(safe-area-inset-bottom));
}
.nav {
  padding-top: env(safe-area-inset-top);
}
.scrollIndicator {
  bottom: calc(40px + env(safe-area-inset-bottom));
}
```

---

### C9. luxury-card / touril-card Mixins — Hover-Only
- **Files:** `packages/touril-ecosystem-ui-components/src/styles/_mixins.scss:22-24, 529-531`
- **Issue:** `&:hover { box-shadow: $shadow-hover; transform: translateY(-2px); }` — no `:focus-within` or `:active`.
- **UX Impact:** Any card using these mixins has no touch press feedback.
- **Fix:**
```scss
@mixin luxury-card {
  &:hover, &:focus-within, &:active {
    transform: translateY(-2px);
  }
}
```

---

### C10. GaleriaPage Missing overflow-x Containment
- **File:** `apps/monte-da-estrada/src/pages/GaleriaPage/GaleriaPage.module.scss:4-6`
- **Issue:** `.sectionAlt` uses `calc((100vw - 1200px) / 2)` full-bleed centering. No `overflow-x: hidden` on parent.
- **UX Impact:** Potential horizontal scroll from edge-bleed sections on small viewports.
- **Fix:**
```scss
.galeriaPage {
  width: 100%;
  overflow-x: hidden;  // Add this
}
```

---

## SECTION 2: MEDIUM ISSUES

### M1. Below-Fold Images Missing Lazy Loading
- **Files:** `FullBleedImage.jsx:36`, `GalleryPreview.jsx:56`, `EditorialSplitSection.jsx:53`, `SuiteCarousel.jsx:51`, `RoomGrid.jsx:56`, `BeachCard.jsx:51`, `ExperienceCard.jsx:48`, `AttractionPinCard.jsx:60`, `DiscoveryMap.jsx:72`
- **Issue:** No `loading="lazy"` on any below-fold images. All download simultaneously.
- **UX Impact:** Bandwidth contention with LCP hero; page load stutter.
- **Fix:** Add `loading="lazy" decoding="async"` to all `<img>` tags in non-hero components.

---

### M2. SuiteCarousel Tablet Breakpoint Gap
- **File:** `SuiteCarousel.module.scss:14`
- **Issue:** Height rule starts at `$breakpoint-mobile + 1px` (481px), not `$breakpoint-tablet` (768px). Viewports 481-767px get desktop height (450px).
- **Fix:**
```scss
@media (min-width: $breakpoint-tablet) { height: 450px; }
@media (min-width: $breakpoint-mobile + 1px) and (max-width: $breakpoint-tablet - 1px) { height: 380px; }
```

---

### M3. SectionEyebrow letter-spacing: 3px
- **File:** `packages/touril-ecosystem-ui-components/src/components/SectionEyebrow/SectionEyebrow.module.scss:13`
- **Issue:** `3px` exceeds brand spec: headline 1px, subheading 0.75px, body 0.5px.
- **Fix:** Reduce to `$letter-spacing-headline` (1px) or document as intentional editorial override.

---

### M4. Section Padding 80px on Mobile
- **Files:** `BookingSection.module.scss:17`, `RoomGrid.module.scss:15`, `GalleryPreview.module.scss:13`, `DescobrirPage.module.scss:68,92,114,152`, `ContactoPage.module.scss:61,158,176`
- **Issue:** Desktop `80px` vertical padding not reduced on mobile. Brand minimum is 48px.
- **Fix:**
```scss
@include mobile { padding: 48px $spacing-m; }  // or 56px
```

---

### M5. RoomCard min-height: 520px Never Reduces
- **File:** `packages/touril-ecosystem-ui-components/src/components/RoomCard/RoomCard.module.scss:13`
- **Issue:** No mobile override. Cards are 520px tall on 320px screens.
- **Fix:**
```scss
@include mobile { .roomCard { min-height: 320px; } }
```

---

### M6. RoomExpandedCard max-height Uses Static 100vh
- **File:** `packages/touril-ecosystem-ui-components/src/components/RoomExpandedCard/RoomExpandedCard.module.scss:15`
- **Fix:** `max-height: calc(100dvh - 100px)`

---

### M7. Google Fonts — FOIT Risk
- **File:** `index.html:12-14`
- **Issue:** No `display=swap`; no `rel=preload`. FOIT on slow mobile.
- **Fix:**
```html
<link href="...&display=swap" rel="stylesheet">
<link rel="preload" as="font" href="/fonts/dm-sans-var.woff2" crossorigin>
```

---

### M8. Netlify Identity Script Render-Blocking
- **File:** `index.html:18`
- **Issue:** Admin-only script in `<head>` blocks FCP.
- **Fix:** Add `defer` or gate on `window.location.pathname.startsWith('/admin')`.

---

### M9. No Responsive Images (srcset)
- **Files:** All hero/section image components
- **Issue:** Full desktop resolution served to mobile (3MB JPEG to 390px screen).
- **Fix:** Generate 800/1200/1920px variants; add `srcset`. Use Vite `?w=` query or image plugin.

---

### M10. Vite Config — No Image Optimization
- **File:** `apps/monte-da-estrada/vite.config.js`
- **Issue:** No plugin for WebP/AVIF conversion or compression.
- **Fix:** Install and configure `vite-plugin-image`.

---

### M11. SuiteCarousel Dots 10x10px
- **File:** `SuiteCarousel.module.scss:43-46`
- **Issue:** Below 44x44px WCAG minimum.
- **Fix:**
```scss
.dot {
  width: 10px;
  height: 10px;
  &::after {
    content: '';
    position: absolute;
    inset: -17px;  // 44px hit area via pseudo
  }
}
```

---

### M12. WhatsApp Button 40x40px at Tablet
- **File:** `packages/touril-ecosystem-ui-components/src/components/Header/Header.module.scss:368-371`
- **Fix:** Increase to 44x44px at tablet.

---

### M13. Footer No Tablet Breakpoint
- **File:** `packages/touril-ecosystem-ui-components/src/components/Footer/Footer.module.scss:52-117`
- **Issue:** Widths jump at 1024px only. No intermediate adaptation at 768px.
- **Fix:** Add `@media (max-width: $breakpoint-tablet)` for intermediate layout.

---

### M14. RoomExpandedCard Touch Targets Borderline
- **File:** `packages/touril-ecosystem-ui-components/src/components/RoomExpandedCard/RoomExpandedCard.module.scss`
- **Issue:** `.closeButton` 40x40px; `.arrow` no mobile sizing.
- **Fix:** Add `@include mobile { .closeButton { width: 44px; height: 44px; } }`

---

### M15. EditorialSplitSection Asymmetric Mobile Padding
- **File:** `packages/touril-ecosystem-ui-components/src/components/EditorialSplitSection/EditorialSplitSection.module.scss:120-122`
- **Issue:** `padding: 32px $spacing-m` — asymmetric vs desktop 80px symmetric.
- **Fix:** `padding: 40px $spacing-m`

---

### M16. Global -webkit-overflow-scrolling: touch on *
- **Files:** `global.scss:217` (app), `global.scss:154` (shared)
- **Issue:** Applied to all elements. Momentum scroll should be per-container only.
- **Fix:** Remove from `*`; apply only to genuinely scrollable containers.

---

### M17. background-attachment: fixed in responsive-hero Mixin
- **File:** `packages/touril-ecosystem-ui-components/src/styles/_mixins.scss:73-88`
- **Issue:** Only resets to `scroll` at tablet. Still `fixed` on mobile.
- **Fix:** Change base to `scroll`; use `fixed` only on desktop.

---

## SECTION 3: MINOR ISSUES

| # | Issue | File | Fix |
|---|-------|------|-----|
| m1 | AmenityGrid label `max-width: 120px` | `AmenityGrid.module.scss:49-54` | Increase to `140px` |
| m2 | ContactForm submit hover-only | `ContactForm.module.scss:110-113` | Add `:active` press |
| m3 | Footer social icon margins | `Footer.module.scss:197-203` | Use flex `gap` |
| m4 | Lightbox `:focus` not `:focus-visible` | `Lightbox.module.scss:110-118` | Change to `:focus-visible` |
| m5 | Slideshow fullscreen arrow no focus | `Slideshow.module.scss:265-267` | Add `:focus-visible` |
| m6 | Header nav scrollbar not hidden | `Header.module.scss:384-402` | `scrollbar-width: none` |
| m7 | ImmersiveHero scroll indicator not safe-area-aware | `ImmersiveHero.module.scss:77-79` | `bottom: calc(40px + env(safe-area-inset-bottom))` |
| m8 | FullBleedImage viewport.eager 5% | `FullBleedImage.jsx:34` | `amount: 0.3` |
| m9 | App vs shared `$line-height-base` mismatch (1.4 vs 1.5) | `_variables.scss` (both) | Unify at 1.5 |
| m10 | AmenityGrid no tablet gap intermediate | `AmenityGrid.module.scss:4-16` | Add tablet gap: 28px |
| m11 | BookingSection widgetContainer `min-height: 120px` | `BookingSection.module.scss` | `min-height: 0` |
| m12 | Map border-radius on mobile | `Map.module.scss` | `border-radius: 0` on mobile |

---

## PRP (Product Requirement Plan)

### Phase 1: Critical Foundation (Day 1)
**Goal:** Fix UX-breaking mobile issues

#### 1.1 Touch & Interaction Fixes
| File | Change |
|-------|--------|
| `SuiteCarousel.jsx` | Tap-to-toggle auto-play; pause on `pointer: coarse` |
| `SuiteCarousel.module.scss` | Dot hit area via `::after` pseudo (44px) |
| `ImageGallery.module.scss` | `.imageWrapper:active .overlay { opacity: 1 }` |
| `Slideshow.module.scss` | `.imageContainer:active .imageOverlay { opacity: 1 }` |
| `ActivityHighlights.module.scss` | `@media (hover: none) { .distance { opacity: 1 } }` |
| `_mixins.scss` (shared) | Add `&:focus-within, &:active` to `luxury-card` + `touril-card` |
| `ContactForm.module.scss` | Submit button `:active` press |

#### 1.2 Viewport & Safe Area Fixes
| File | Change |
|-------|--------|
| `ImmersiveHero.module.scss` | `height: 100dvh`; safe-area scroll indicator |
| `ImmersiveHero.jsx` | `innerHeight → clientHeight` |
| `NavBar.module.scss` | `padding-bottom: env(safe-area-inset-bottom)` |
| `NavBar.jsx` | `innerHeight → clientHeight` |
| `BookingTab.jsx` | `innerHeight → clientHeight` |
| `HeaderModern.module.scss` | `padding-bottom: env(safe-area-inset-bottom)` on `.mobileMenu` |
| `CategoryNav.module.scss` | `padding-top: env(safe-area-inset-top)` |
| `RoomExpandedCard.module.scss` | `100vh → 100dvh` |

#### 1.3 Navigation Fix
| File | Change |
|-------|--------|
| `Header.module.scss` | Add hamburger + mobile menu (reference `HeaderModern`) |

---

### Phase 2: Typography & Spacing (Day 2)
**Goal:** Brand consistency + fluid responsive type

| File | Change |
|-------|--------|
| `SuiteAlentejanaSection.module.scss` | `clamp()` for all font sizes; `font-weight: 300`; mobile padding 48px |
| `SectionEyebrow.module.scss` | `letter-spacing: 3px → 1px` (or document override) |
| `BookingSection.module.scss` | Mobile padding → 48px |
| `RoomGrid.module.scss` | Mobile padding → 48px |
| `GalleryPreview.module.scss` | Mobile padding → 48px |
| `DescobrirPage.module.scss` | Mobile padding → 48px (all sections) |
| `ContactoPage.module.scss` | Mobile padding → 48px |
| `EditorialSplitSection.module.scss` | Symmetric mobile padding: `40px $spacing-m` |

---

### Phase 3: Performance (Day 3)
**Goal:** LCP, bandwidth, CLS improvements

| File | Change |
|-------|--------|
| `ImmersiveHero.jsx` | `fetchpriority="high" loading="eager" decoding="async"` |
| `PageHero.jsx` | `fetchpriority="high" loading="eager" decoding="async"` |
| `FullBleedImage.jsx` | `loading="lazy" decoding="async"` |
| `GalleryPreview.jsx` | `loading="lazy" decoding="async"` |
| `EditorialSplitSection.jsx` | `loading="lazy" decoding="async"` |
| `SuiteCarousel.jsx` | Pause Ken Burns on mobile; `duration: 8` |
| `SuiteCarousel.module.scss` | `will-change: transform` on `.carouselImage` |
| `index.html` | Google Fonts: `&display=swap` + `rel=preload` |
| `index.html` | Netlify script: add `defer` |
| `vite.config.js` | Add `vite-plugin-image` for WebP |
| `global.scss` (both) | Remove `-webkit-overflow-scrolling: touch` from `*` |

---

### Phase 4: Layout & Polish (Day 4)
**Goal:** Grid consistency, responsive images, edge cases

| File | Change |
|-------|--------|
| `GaleriaPage.module.scss` | `overflow-x: hidden` on `.galeriaPage` |
| `SuiteCarousel.module.scss` | Fix tablet `min-width → $breakpoint-tablet` |
| `Footer.module.scss` | Add tablet (768px) breakpoint |
| `RoomCard.module.scss` | Mobile `min-height: 320px` |
| `BookingSection.module.scss` | Widget container `min-height: 0` |
| `AmenityGrid.module.scss` | Tablet gap: 28px; label `max-width: 140px` |
| `FullBleedImage.jsx` | `viewport amount: 0.3` |
| `Header.module.scss` (nav bar) | `scrollbar-width: none` |
| `Lightbox.module.scss` | `:focus → :focus-visible` |
| `Slideshow.module.scss` | Fullscreen arrow `:focus-visible` |

---

### Responsive Image Implementation (Requires Asset Pipeline)
| File | Change |
|-------|--------|
| `vite.config.js` | Add image optimization plugin |
| `ImmersiveHero.jsx` | Add `srcset` with 800/1200/1920 variants |
| `PageHero.jsx` | Add `srcset` |
| `EditorialSplitSection.jsx` | Add `srcset` |
| `GalleryPreview.jsx` | Add `srcset` |
| `FullBleedImage.jsx` | Add `srcset` |
| Asset generation | Create 800/1200/1920px variants of all hero/section images |

---

## TESTING CHECKLIST

### Devices
- [ ] iPhone SE (320px)
- [ ] iPhone 14/15 (375px/390px)
- [ ] iPhone 14 Pro Max (414px)
- [ ] iPad (768px portrait, 1024px landscape)
- [ ] Android Pixel 6/7 (412px)

### Browsers
- [ ] iOS Safari (iPhone) — notch, toolbar, 100dvh, safe areas
- [ ] Android Chrome — dynamic toolbar, soft keyboard

### Validation
- [ ] No horizontal scroll anywhere (320px → 1920px)
- [ ] All touch targets ≥ 44×44px
- [ ] All hover states have `:active` or `:focus-visible` equivalents
- [ ] No CLS (Cumulative Layout Shift) on load
- [ ] LCP image loads within 2.5s on 4G
- [ ] Carousel Ken Burns smooth on mid-range Android
- [ ] Mobile menu works with home indicator (iPhone X+)
- [ ] Form inputs show 16px font (prevent iOS zoom)

---

## BREAKPOINT REFERENCE

| Name | Value | CSS Mixin |
|------|-------|-----------|
| Mobile | `480px` | `@include mobile` → `max-width: 479px` |
| Tablet | `768px` | `@include tablet` → `min: 768px, max: 1023px` |
| Desktop | `1024px` | `@include desktop` → `min-width: 1024px` |
