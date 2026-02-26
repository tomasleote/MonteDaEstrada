# PageHero Consolidation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rename `DiscoveryHero` → `PageHero` in the shared library and migrate all four internal page heroes (Descobrir, Galeria, Quartos, Contacto) to use it, deleting the old local `Hero` component.

**Architecture:** `PageHero` lives in `packages/touril-ecosystem-ui-components/src/components/PageHero/`. It is identical to the current `DiscoveryHero` — only the file names, folder name, function name, and JSDoc change. A `DiscoveryHero` alias re-export is kept in the shared library root `index.js` for safety. Each internal page removes its local/inline hero and imports `PageHero` from `@touril-ecosystem/ui-components`. No commit at the end — user does that manually.

**Tech Stack:** React 18, Framer Motion (`motion/react`), SCSS Modules, shared library at `packages/touril-ecosystem-ui-components` (aliased as `@touril-ecosystem/ui-components`), Vite.

---

## Key Paths (memorise these)

```
SHARED LIB:
  packages/touril-ecosystem-ui-components/src/components/DiscoveryHero/   ← folder to rename
  packages/touril-ecosystem-ui-components/src/index.js                    ← root exports

APP PAGES:
  apps/monte-da-estrada/src/pages/DescobrirPage/DescobrirPage.jsx
  apps/monte-da-estrada/src/pages/GaleriaPage/GaleriaPage.jsx
  apps/monte-da-estrada/src/pages/QuartosPage/QuartosPage.jsx
  apps/monte-da-estrada/src/pages/QuartosPage/QuartosPage.module.scss
  apps/monte-da-estrada/src/pages/ContactoPage/ContactoPage.jsx
  apps/monte-da-estrada/src/pages/ContactoPage/ContactoPage.module.scss

LOCAL HERO TO DELETE:
  apps/monte-da-estrada/src/components/Hero/Hero.jsx
  apps/monte-da-estrada/src/components/Hero/Hero.module.scss
  apps/monte-da-estrada/src/components/Hero/index.js
```

**Do NOT touch:**
- `apps/monte-da-estrada/src/pages/HomePage/` (any file)
- `packages/touril-ecosystem-ui-components/src/components/ImmersiveHero/` (any file)

---

## Task 1: Create `PageHero` in the shared library

**Files:**
- Create: `packages/touril-ecosystem-ui-components/src/components/PageHero/PageHero.jsx`
- Create: `packages/touril-ecosystem-ui-components/src/components/PageHero/PageHero.module.scss`
- Create: `packages/touril-ecosystem-ui-components/src/components/PageHero/index.js`

**Step 1: Create `PageHero.jsx`**

This is `DiscoveryHero.jsx` with names updated. Copy the logic exactly — do not change any animation values, heights, or overlay colours.

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'motion/react';
import { duration, ease } from '../../constants/motion';
import styles from './PageHero.module.scss';

/**
 * PageHero — canonical 65vh editorial hero for all internal pages.
 * Centered three-part text stack: eyebrow + headline (weight 300) + subtitle.
 * Lighter overlay (20% → 55%) lets photography read clearly.
 * No scroll indicator — shorter height reveals the next section naturally.
 *
 * Used by: DescobrirPage, GaleriaPage, QuartosPage, ContactoPage.
 * NOT used by: HomePage (uses ImmersiveHero instead).
 *
 * @param {Object} props
 * @param {string} props.imageSrc - Hero image URL
 * @param {string} props.imageAlt - Alt text for accessibility
 * @param {string} [props.eyebrow] - Optional eyebrow label above the headline
 * @param {string} props.headline - Main hero headline (displayed at font-weight 300)
 * @param {string} [props.subtitle] - Optional subtitle below headline
 * @param {string} [props.photographerCredit] - Optional photo credit (bottom-right)
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */
function PageHero({
  imageSrc,
  imageAlt,
  eyebrow,
  headline,
  subtitle,
  photographerCredit,
  className = '',
}) {
  return (
    <div className={`${styles.hero} ${className}`}>
      {/* Background Image */}
      <img src={imageSrc} alt={imageAlt} className={styles.image} />

      {/* Lighter overlay — photography must read clearly */}
      <div className={styles.overlay} />

      {/* Three-part text stack */}
      <div className={styles.content}>
        {eyebrow && (
          <motion.span
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.medium, ease: ease.entrance, delay: 0.1 }}
          >
            {eyebrow}
          </motion.span>
        )}

        <motion.h1
          className={styles.headline}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.long, ease: ease.elegant, delay: 0.25 }}
        >
          {headline}
        </motion.h1>

        {subtitle && (
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.medium, ease: ease.entrance, delay: 0.45 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Photographer Credit */}
      {photographerCredit && <p className={styles.credit}>{photographerCredit}</p>}
    </div>
  );
}

PageHero.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  eyebrow: PropTypes.string,
  headline: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  photographerCredit: PropTypes.string,
  className: PropTypes.string,
};

export default PageHero;
```

**Step 2: Create `PageHero.module.scss`**

This is `DiscoveryHero.module.scss` with the CSS class references unchanged (class names like `.hero`, `.image`, `.overlay` etc. are the same — they are scoped by CSS Modules so the rename is safe).

```scss
@use '../../styles/variables' as *;
@use '../../styles/mixins' as *;

// ==================================
// PAGE HERO — 65vh canonical editorial hero
// Used by all internal pages (Descobrir, Galeria, Quartos, Contacto).
// Shorter than ImmersiveHero (100vh → 65vh), more purposeful.
// Lighter overlay (20%–55%) lets photography breathe.
// Three-part text stack: eyebrow · headline · subtitle.
// No scroll indicator — shorter height reveals next section naturally.
// ==================================

.hero {
  position: relative;
  width: 100%;
  height: 65vh;
  min-height: 420px;
  max-height: 700px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

// ==================================
// BACKGROUND IMAGE
// ==================================

.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
}

// ==================================
// LIGHTER GRADIENT OVERLAY
// ImmersiveHero uses 25% → 60%; PageHero uses 20% → 55%
// Photography must read clearly.
// ==================================

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(61, 59, 56, 0.2) 0%,
    rgba(61, 59, 56, 0.55) 100%
  );
  z-index: 1;
  pointer-events: none;
}

// ==================================
// CONTENT — three-part text stack
// ==================================

.content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: $spacing-xxl $spacing-l;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-m;
}

// Eyebrow — whispered classification, not shouted
.eyebrow {
  display: block;
  font-family: $font-body;
  font-size: 0.6875rem; // 11px
  font-weight: $font-weight-medium;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba($color-cream, 0.85);
  margin: 0;
}

// Headline — font-weight 300, consistent with editorial section headings
.headline {
  font-family: $font-display;
  font-size: clamp(2.25rem, 4.5vw, 3.75rem);
  font-weight: $font-weight-light; // 300 — editorial lightness
  letter-spacing: $letter-spacing-headline;
  color: $color-cream;
  line-height: $line-height-tight;
  margin: 0;
}

// Subtitle — supporting text, softer opacity
.subtitle {
  font-family: $font-body;
  font-size: clamp(0.9rem, 1.5vw, 1.0625rem);
  font-weight: $font-weight-regular;
  letter-spacing: $letter-spacing-body;
  color: rgba($color-cream, 0.9);
  line-height: $line-height-relaxed;
  margin: 0;
  max-width: 520px;
}

// ==================================
// PHOTOGRAPHER CREDIT
// ==================================

.credit {
  position: absolute;
  bottom: 16px;
  right: 16px;
  z-index: 2;
  font-family: $font-body;
  font-size: 0.65rem;
  color: rgba($color-cream, 0.6);
  margin: 0;
}

// ==================================
// RESPONSIVE
// ==================================

@include mobile {
  .hero {
    height: 55vh;
    min-height: 360px;
  }

  .content {
    padding: $spacing-l $spacing-m;
    gap: $spacing-s;
  }

  .credit {
    bottom: 12px;
    right: 12px;
    font-size: 0.6rem;
  }
}

// ==================================
// REDUCED MOTION
// Framer Motion respects prefers-reduced-motion automatically.
// This ensures CSS fallback transitions are also suppressed.
// ==================================

@media (prefers-reduced-motion: reduce) {
  .eyebrow,
  .headline,
  .subtitle {
    transition: none;
  }
}
```

**Step 3: Create `index.js`**

```js
export { default } from './PageHero';
```

---

## Task 2: Update the shared library root `index.js`

**File:** `packages/touril-ecosystem-ui-components/src/index.js`

**Step 1: Add `PageHero` export and keep `DiscoveryHero` as an alias**

Find the line:
```js
export { default as DiscoveryHero } from './components/DiscoveryHero';
```

Replace it with:
```js
export { default as PageHero } from './components/PageHero';
// Backwards-compatible alias — remove once all consumers use PageHero
export { default as DiscoveryHero } from './components/PageHero';
```

No other changes to this file.

---

## Task 3: Migrate DescobrirPage

**File:** `apps/monte-da-estrada/src/pages/DescobrirPage/DescobrirPage.jsx`

**Step 1: Update the import**

Find:
```js
import {
  DiscoveryHero,
```

Replace with:
```js
import {
  PageHero,
```

**Step 2: Update the JSX tag**

Find:
```jsx
        <DiscoveryHero
          imageSrc={descobrirImages.hero.src}
          imageAlt={descobrirImages.hero.alt}
          eyebrow={descobrirImages.hero.title}
          headline="O território é a experiência."
          subtitle="110 km de Atlântico. A Rota Vicentina à porta. O Alentejo profundo aqui mesmo."
        />
```

Replace with:
```jsx
        <PageHero
          imageSrc={descobrirImages.hero.src}
          imageAlt={descobrirImages.hero.alt}
          eyebrow={descobrirImages.hero.title}
          headline="O território é a experiência."
          subtitle="110 km de Atlântico. A Rota Vicentina à porta. O Alentejo profundo aqui mesmo."
        />
```

No other changes to this file.

---

## Task 4: Migrate GaleriaPage

**File:** `apps/monte-da-estrada/src/pages/GaleriaPage/GaleriaPage.jsx`

**Step 1: Update the import block**

Find:
```js
import Hero from '@/components/Hero';
import { CategoryNav } from '@touril-ecosystem/ui-components';
```

Replace with:
```js
import { CategoryNav, PageHero } from '@touril-ecosystem/ui-components';
```

**Step 2: Replace the Hero JSX with PageHero**

Find:
```jsx
      {/* Hero — id used by CategoryNav to know when to appear */}
      <div id="galeria-hero">
        <Hero
          backgroundImage={galeriaData.hero.image}
          title={galeriaData.hero.title}
          subtitle={galeriaData.hero.subtitle}
          height="60vh"
        />
      </div>
```

Replace with:
```jsx
      {/* Hero — id used by CategoryNav to know when to appear */}
      <div id="galeria-hero">
        <PageHero
          imageSrc={galeriaData.hero.image}
          imageAlt={galeriaData.hero.alt}
          headline={galeriaData.hero.title}
          subtitle={galeriaData.hero.subtitle}
        />
      </div>
```

No other changes to this file.

---

## Task 5: Migrate QuartosPage — JSX

**File:** `apps/monte-da-estrada/src/pages/QuartosPage/QuartosPage.jsx`

**Step 1: Add `PageHero` to the shared-lib import**

Find:
```js
import {
  RoomCardGallery,
  SectionEyebrow,
  variants,
  viewport,
} from '@touril-ecosystem/ui-components';
```

Replace with:
```js
import {
  PageHero,
  RoomCardGallery,
  SectionEyebrow,
  variants,
  viewport,
} from '@touril-ecosystem/ui-components';
```

**Step 2: Replace the inline hero `<section>` with `<PageHero>`**

Find the entire block:
```jsx
      {/* ─────────────────────────────────────────── */}
      {/* S1 — Page Hero (55vh, editorial pattern)   */}
      {/* ─────────────────────────────────────────── */}
      <section className={styles.hero}>
        <ResponsiveImage
          src={quartosImages.hero.src}
          alt={quartosImages.hero.alt}
          className={styles.heroImage}
          loading="eager"
          lazy={false}
        />
        <div className={styles.heroOverlay}>
          <div className={styles.container}>
            <motion.div
              className={styles.heroContent}
              variants={variants.fadeUp}
              initial="hidden"
              animate="visible"
            >
              <h1 className={styles.heroTitle}>
                Os Nossos Quartos
              </h1>
              <p className={styles.heroSubtitle}>
                Cada quarto é único. A luz entra diferente em cada um.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
```

Replace with:
```jsx
      {/* ─────────────────────────────────────────── */}
      {/* S1 — Page Hero                             */}
      {/* ─────────────────────────────────────────── */}
      <PageHero
        imageSrc={quartosImages.hero.src}
        imageAlt={quartosImages.hero.alt}
        eyebrow="Quartos"
        headline="Os Nossos Quartos"
        subtitle="Cada quarto é único. A luz entra diferente em cada um."
      />
```

**Step 3: Remove unused imports**

`ResponsiveImage` and `motion` are no longer needed by the hero block. Check if they are used anywhere else in the file before removing them.

- `ResponsiveImage` — only used in the hero block, so remove: `import ResponsiveImage from '@/components/ResponsiveImage';`
- `motion` — used in the rooms section and booking section, so **keep** it.
- `variants` — used in rooms/booking sections, so **keep** it.

---

## Task 6: Migrate QuartosPage — SCSS

**File:** `apps/monte-da-estrada/src/pages/QuartosPage/QuartosPage.module.scss`

**Step 1: Delete the entire hero SCSS block**

Remove everything from `// S1 — HERO` through the end of `.heroSubtitle`. That is the following block in full:

```scss
// ==================================
// S1 — HERO (55vh, editorial, cream-tinted overlay)
// ==================================

.hero {
  position: relative;
  width: 100%;
  height: 55vh;
  min-height: 380px;
  max-height: 560px;
  overflow: hidden;

  @include tablet {
    height: 50vh;
    min-height: 320px;
  }

  @include mobile {
    height: 45vh;
    min-height: 280px;
  }
}

.heroImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

// Gradient: nearly transparent at top, deep brown at bottom (brand: no color overlay)
.heroOverlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba($color-cream, 0.08) 0%,
    rgba($color-deep-brown, 0.55) 100%
  );
  display: flex;
  align-items: flex-end;
}

.heroContent {
  padding-bottom: $spacing-xxxl;

  @include mobile {
    padding-bottom: $spacing-xxl;
  }
}

.heroTitle {
  font-family: $font-display;
  font-size: clamp($font-size-h3, 5vw, $font-size-h1);
  font-weight: $font-weight-light; // 300 — editorial restraint
  line-height: $line-height-tight;
  letter-spacing: $letter-spacing-headline; // 1px
  color: $color-cream;
  margin: 0 0 $spacing-m 0;

  @include mobile {
    font-size: $font-size-h3;
  }
}

.heroSubtitle {
  font-family: $font-body;
  font-size: $font-size-body-large; // 18px
  font-weight: $font-weight-regular;
  line-height: $line-height-relaxed;
  letter-spacing: $letter-spacing-body;
  color: rgba($color-cream, 0.90);
  max-width: 480px;
  margin: 0;

  @include mobile {
    font-size: $font-size-body;
  }
}
```

Also update the `@media (prefers-reduced-motion: reduce)` block at the bottom — remove `.heroContent` from the selector list:

Find:
```scss
@media (prefers-reduced-motion: reduce) {
  .heroContent,
  .roomCardGallery,
  .bookingSection {
    transition: none;
  }
}
```

Replace with:
```scss
@media (prefers-reduced-motion: reduce) {
  .roomCardGallery,
  .bookingSection {
    transition: none;
  }
}
```

---

## Task 7: Migrate ContactoPage — JSX

**File:** `apps/monte-da-estrada/src/pages/ContactoPage/ContactoPage.jsx`

**Step 1: Add `PageHero` to the shared-lib import**

Find:
```js
import {
  SectionEyebrow,
  EditorialPullQuote,
  viewport,
  variants,
  stagger,
} from '@touril-ecosystem/ui-components';
```

Replace with:
```js
import {
  PageHero,
  SectionEyebrow,
  EditorialPullQuote,
  viewport,
  variants,
  stagger,
} from '@touril-ecosystem/ui-components';
```

**Step 2: Replace the inline hero `<div>` with `<PageHero>`**

Find the entire block:
```jsx
      {/* S1 — Page Hero ─────────────────────────────────────── */}
      {/* 55vh editorial header. Cream-tinted overlay (brand: 10-15% max). */}
      {/* Copy: direct, warm, confident — not generic "Contact Us". */}
      <div className={styles.hero}>
        <ResponsiveImage
          src={homeImages.gallery[1].src}
          alt={homeImages.gallery[1].alt}
          className={styles.heroImage}
          loading="eager"
          lazy={false}
        />
        <div className={styles.heroOverlay}>
          <div className={styles.container}>
            <motion.div
              className={styles.heroContent}
              variants={variants.fadeUp}
              initial="hidden"
              animate="visible"
            >
              <h1 className={styles.heroTitle}>
                Planeie a sua visita.
              </h1>
              <p className={styles.heroSubtitle}>
                Estamos cá para ajudar — de segunda a domingo.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
```

Replace with:
```jsx
      {/* S1 — Page Hero ─────────────────────────────────────── */}
      <PageHero
        imageSrc={homeImages.gallery[1].src}
        imageAlt={homeImages.gallery[1].alt}
        eyebrow="Contacto"
        headline="Planeie a sua visita."
        subtitle="Estamos cá para ajudar — de segunda a domingo."
      />
```

**Step 3: Remove unused imports**

- `ResponsiveImage` — only used in the hero block → remove: `import ResponsiveImage from '@/components/ResponsiveImage';`
- `motion` — still used in sections below → **keep** it.

---

## Task 8: Migrate ContactoPage — SCSS

**File:** `apps/monte-da-estrada/src/pages/ContactoPage/ContactoPage.module.scss`

**Step 1: Delete the entire hero SCSS block**

Remove everything from `// S1 — HERO` through end of `.heroSubtitle`. That is:

```scss
// ==================================
// S1 — HERO (55vh, editorial, cream-tinted overlay)
// ==================================

.hero {
  position: relative;
  width: 100%;
  height: 55vh;
  min-height: 380px;
  max-height: 560px;
  overflow: hidden;

  @include tablet {
    height: 50vh;
    min-height: 320px;
  }

  @include mobile {
    height: 45vh;
    min-height: 280px;
  }
}

.heroImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

// Gradient: nearly transparent at top, deep brown at bottom (brand: no color overlay)
.heroOverlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba($color-cream, 0.08) 0%,
    rgba($color-deep-brown, 0.55) 100%
  );
  display: flex;
  align-items: flex-end;
}

.heroContent {
  padding-bottom: $spacing-xxxl;

  @include mobile {
    padding-bottom: $spacing-xxl;
  }
}

.heroTitle {
  font-family: $font-display;
  font-size: clamp($font-size-h3, 5vw, $font-size-h1);
  font-weight: $font-weight-light; // 300 — editorial restraint
  line-height: $line-height-tight;
  letter-spacing: $letter-spacing-headline; // 1px
  color: $color-cream;
  margin: 0 0 $spacing-m 0;

  @include mobile {
    font-size: $font-size-h3;
  }
}

.heroSubtitle {
  font-family: $font-body;
  font-size: $font-size-body-large; // 18px
  font-weight: $font-weight-regular;
  line-height: $line-height-relaxed;
  letter-spacing: $letter-spacing-body;
  color: rgba($color-cream, 0.90);
  max-width: 480px;
  margin: 0;

  @include mobile {
    font-size: $font-size-body;
  }
}
```

Also update the `@media (prefers-reduced-motion: reduce)` block — remove `.heroContent`:

Find:
```scss
@media (prefers-reduced-motion: reduce) {
  .heroContent,
  .contactGrid,
  .mapWrapper,
  .directionsGrid {
    transition: none;
  }
}
```

Replace with:
```scss
@media (prefers-reduced-motion: reduce) {
  .contactGrid,
  .mapWrapper,
  .directionsGrid {
    transition: none;
  }
}
```

---

## Task 9: Delete the local `Hero` component

**Files to delete:**
- `apps/monte-da-estrada/src/components/Hero/Hero.jsx`
- `apps/monte-da-estrada/src/components/Hero/Hero.module.scss`
- `apps/monte-da-estrada/src/components/Hero/index.js`

**Step 1: Verify no other files import it**

Run this search before deleting. Expected result: zero matches (GaleriaPage was already migrated in Task 4).

Search for: `from '@/components/Hero'` across `apps/monte-da-estrada/src/`

**Step 2: Delete the three files**

Use the Bash tool:
```bash
rm "apps/monte-da-estrada/src/components/Hero/Hero.jsx"
rm "apps/monte-da-estrada/src/components/Hero/Hero.module.scss"
rm "apps/monte-da-estrada/src/components/Hero/index.js"
rmdir "apps/monte-da-estrada/src/components/Hero"
```

---

## Task 10: Visual verification

**Step 1: Start the dev server**

```bash
cd apps/monte-da-estrada && npm run dev
```

**Step 2: Check each page**

Open each page in the browser and confirm:
- `/descobrir` — centered hero, eyebrow + headline + subtitle, 65vh
- `/galeria` — centered hero, "Galeria" headline, `Conheça o Monte da Estrada` subtitle, 65vh
- `/quartos` — centered hero, "Os Nossos Quartos" headline, 65vh
- `/contacto` — centered hero, "Planeie a sua visita." headline, 65vh
- `/` — homepage hero completely unchanged (ImmersiveHero, 100vh, scroll indicator)

**Step 3: Check for console errors**

No import errors, no missing module errors. If you see `Cannot find module '@/components/Hero'`, the GaleriaPage migration in Task 4 was missed.

---

## Done

No commit. The user will commit manually.
