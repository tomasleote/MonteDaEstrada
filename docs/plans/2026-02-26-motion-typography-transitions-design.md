# Motion Audit & Universal Typography Transitions — Design

**Date**: 2026-02-26
**Status**: Approved
**Scope**: Motion system enhancement + premium text reveals across all pages

---

## Problem

The existing motion system has solid tokens and wrapper components, but typography animations feel "tech startup" rather than "editorial boutique". Benchmark Portuguese luxury hotel sites (Casa de São Lourenço, Memmo Alfama) use slower, masked line reveals with organic easing and section-level choreography that our site lacks.

### Specific Gaps

1. **No line-reveal effect** — `AnimatedText` does word-by-word but not the premium "clip-mask line reveal" pattern
2. **Durations too fast for editorial content** — 500ms `medium` is snappy but not luxurious
3. **Section headings on DescobrirPage are NOT animated** — 2 static `h2` elements
4. **No section-level stagger orchestration** — eyebrow → heading → body → CTA should enter as a choreographed sequence
5. **Image parallax limited to one component** — only `FullBleedQuote` uses scroll-linked parallax

---

## Design

### 1. New Motion Tokens

Added alongside existing tokens (no changes to current values):

```js
// Duration — editorial tier for premium text reveals
duration.editorial = 0.9    // 900ms

// Easing — organic exponential-out curve (luxury hotel signature)
ease.organic = [0.22, 1, 0.36, 1]

// Distance — deeper headline lift
distance.headline = 32      // 32px (vs current 24px default)
```

**Where added**: Both `packages/.../constants/motion.js` AND `apps/.../motion/motion.config.js`

### 2. New Component: `RevealText`

Location: `apps/monte-da-estrada/src/motion/components/RevealText/RevealText.jsx`

**Two effects:**

#### `lineReveal` (for headings)
- Text slides up from behind a masked edge using `clipPath: inset(100% 0 0 0)` → `inset(0 0 0 0)`
- Combined with subtle Y-axis shift (distance.headline = 32px)
- Duration: `duration.editorial` (900ms)
- Easing: `ease.organic`
- GPU-composited (clip-path), zero layout shift

#### `fadeUp` (default, for body text)
- Enhanced version of existing fadeUp
- Duration: `duration.editorial` (900ms)
- Easing: `ease.organic`
- Y distance: `distance.default` (24px)

**Props:**
- `as` — HTML element (h1-h6, p, span). Default: `p`
- `effect` — `'lineReveal'` | `'fadeUp'`. Default: `'fadeUp'`
- `delay` — seconds before animation. Default: `0`
- `threshold` — viewport amount. Default: `viewport.default.amount`
- `triggerOnce` — boolean. Default: `true`
- `className` — pass-through

**Accessibility:**
- Respects `useReducedMotion()` — renders static
- Text always in DOM (no content flash)

### 3. New Component: `RevealSection`

Location: `apps/monte-da-estrada/src/motion/components/RevealSection/RevealSection.jsx`

A stagger orchestration wrapper for section-level choreography.

```jsx
<RevealSection>
  <SectionEyebrow label="Experiências" />
  <RevealText as="h2" effect="lineReveal">Heading</RevealText>
  <RevealText as="p">Body text</RevealText>
</RevealSection>
```

**Behavior:**
- Parent `motion.div` with `whileInView` triggers once at 15% visibility
- Uses `staggerChildren: 0.12` with `delayChildren: 0.05`
- Children animate in DOM order (eyebrow → heading → body → CTA)
- Children must be motion-aware (RevealText, motion.div, etc.) or wrapped

**Props:**
- `as` — container element. Default: `div`
- `staggerDelay` — override stagger timing. Default: `0.12`
- `threshold` — viewport amount. Default: `viewport.default.amount`
- `className` — pass-through

### 4. New Component: `ParallaxImage`

Location: `apps/monte-da-estrada/src/motion/components/ParallaxImage/ParallaxImage.jsx`

Extracted from `FullBleedQuote`'s parallax pattern into a reusable component.

**Behavior:**
- Uses `useScroll({ target, offset })` + `useTransform(scrollYProgress, [0,1], ['-5%', '5%'])`
- Image moves at 0.9x scroll speed (subtle, not jarring)
- Wrapped in `overflow: hidden` container
- Image scaled to 110% to prevent edge gaps during parallax

**Props:**
- `src`, `alt` — image source and alt text
- `speed` — parallax intensity (0 = none, 1 = max). Default: `0.1`
- `className` — pass-through
- `aspectRatio` — CSS aspect-ratio. Default: none

**Accessibility:**
- Respects `useReducedMotion()` — renders static image
- CSS `@media (prefers-reduced-motion: reduce)` fallback

### 5. New Variant: `lineReveal`

Added to `motion.variants.js`:

```js
export const lineReveal = {
  hidden: {
    clipPath: 'inset(100% 0 0 0)',
    opacity: 0,
    y: distance.headline,
  },
  visible: {
    clipPath: 'inset(0% 0 0 0)',
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.editorial,
      ease: ease.organic,
    },
  },
};
```

Also added to shared lib `variants` object for shared component usage.

### 6. New Variant: `sectionStagger`

Added to `motion.variants.js`:

```js
export const sectionStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};
```

---

## Universal Application Map

### DescobrirPage.jsx
- Line 93: `<h2>Aqui não há agenda...</h2>` → `<RevealText as="h2" effect="lineReveal">`
- Line 154: `<h2>110 km de costa...</h2>` → `<RevealText as="h2" effect="lineReveal">`
- Wrap Experiências section header area in `<RevealSection>`
- Wrap Praias section header area in `<RevealSection>`

### EditorialSplitSection.jsx (shared lib)
- Internal `<h2>` → `<motion.h2>` with `lineReveal` variant
- Internal `<p>` elements → `<motion.p>` with `fadeUp` variant + editorial timing
- Uses parent stagger to orchestrate eyebrow → heading → body → CTA

### QuartosPage.jsx
- Existing `motion.div` wrapping headings → upgrade inner `<h2>` to use `lineReveal` variant timing
- OR wrap headings in `RevealText effect="lineReveal"` and remove redundant parent motion.div

### GaleriaPage.jsx
- Existing `ScrollReveal` on section headers → replace with `RevealText effect="lineReveal"` for headings
- Body `<p>` keeps `ScrollReveal` or upgrades to `RevealText as="p"`

### ContactoPage.jsx
- Existing `motion.div` wrapping headings → upgrade to `RevealText effect="lineReveal"`
- Section structure wrapped in `RevealSection` for choreography

### HomePage.jsx
- Benefits automatically from EditorialSplitSection upgrade
- No direct changes needed

---

## Performance Guarantees

- **clip-path** is GPU-composited — no layout/paint thrashing
- **whileInView** with `once: true` — IntersectionObserver disconnects after trigger
- No `will-change` added unless actively animating
- **Zero CLS impact** — text is in DOM at full size, only visual reveal changes
- **No LCP impact** — clip-path doesn't affect content paint timing
- **useReducedMotion()** skips all animation for accessibility
- **Progressive enhancement** — if JS fails, text is visible (clip-path defaults to none)

---

## Files Modified/Created

### New Files (~4)
- `apps/.../motion/components/RevealText/RevealText.jsx`
- `apps/.../motion/components/RevealText/index.js`
- `apps/.../motion/components/RevealSection/RevealSection.jsx`
- `apps/.../motion/components/RevealSection/index.js`
- `apps/.../motion/components/ParallaxImage/ParallaxImage.jsx`
- `apps/.../motion/components/ParallaxImage/index.js`

### Modified Files (~12)
- `packages/.../constants/motion.js` — add editorial tokens + lineReveal variant
- `apps/.../motion/motion.config.js` — add editorial tokens
- `apps/.../motion/motion.variants.js` — add lineReveal, sectionStagger variants
- `apps/.../motion/index.js` — export new components
- `apps/.../pages/DescobrirPage/DescobrirPage.jsx` — wrap headings
- `apps/.../pages/QuartosPage/QuartosPage.jsx` — upgrade headings
- `apps/.../pages/GaleriaPage/GaleriaPage.jsx` — upgrade headings
- `apps/.../pages/ContactoPage/ContactoPage.jsx` — upgrade headings
- `packages/.../components/EditorialSplitSection/EditorialSplitSection.jsx` — internal motion upgrade
- `packages/.../index.js` — export new variants
