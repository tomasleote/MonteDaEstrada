# Gallery Dynamic System — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace GaleriaPage's uniform 4:3 grid with a natural-proportion CSS column masonry, split into two editorial sections (O Monte / A Região), with a sticky CategoryNav and a Framer Motion-powered lightbox.

**Architecture:** Column-count CSS masonry (3→2→1 columns) lets images breathe at natural proportions. CategoryNav (existing shared component) sticky-scrolls between two named sections. Lightbox is upgraded in-place to use Framer Motion AnimatePresence.

**Tech Stack:** React 19, Vitest, motion/react (Framer Motion v12), SCSS Modules, CategoryNav (shared package)

---

## Pre-flight Check

Before starting, verify these files exist:
- `apps/monte-da-estrada/src/pages/GaleriaPage/GaleriaPage.jsx` ✓
- `apps/monte-da-estrada/src/components/Lightbox/Lightbox.jsx` ✓
- `packages/touril-ecosystem-ui-components/src/components/CategoryNav/CategoryNav.jsx` ✓
- `apps/monte-da-estrada/src/assets/images/exterior/index.js` ✓
- `apps/monte-da-estrada/src/assets/images/home/index.js` ✓
- `apps/monte-da-estrada/src/assets/images/descobrir/index.js` ✓
- `apps/monte-da-estrada/src/assets/images/redondezas/index.js` ✓

---

## Task 1: Upgrade Lightbox to Framer Motion

**Files:**
- Modify: `apps/monte-da-estrada/src/components/Lightbox/Lightbox.jsx`
- Modify: `apps/monte-da-estrada/src/components/Lightbox/Lightbox.module.scss`

**Context:** The current Lightbox uses CSS `@keyframes fadeIn` and `@keyframes zoomIn`. We replace these with Framer Motion `motion.div` and `AnimatePresence`. All keyboard/close logic stays unchanged. The Lightbox now accepts an `imageKey` prop so `AnimatePresence` knows when the image changed.

### Step 1: Read the existing files

Read both files before editing — the Write tool requires it.

```
Read: apps/monte-da-estrada/src/components/Lightbox/Lightbox.jsx
Read: apps/monte-da-estrada/src/components/Lightbox/Lightbox.module.scss
```

### Step 2: Replace Lightbox.jsx with Framer Motion version

Replace the full file content:

```jsx
import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'motion/react';
import styles from './Lightbox.module.scss';

/**
 * Lightbox modal component for full-screen image viewing
 * Supports keyboard navigation (Escape, Arrow keys) and touch gestures
 * Uses Framer Motion for smooth enter/exit and image transitions
 *
 * @param {Array} images - Array of image objects with src, alt, title properties
 * @param {number} initialIndex - Initial image index to display
 * @param {function} onClose - Callback when lightbox is closed
 * @param {boolean} isOpen - Whether lightbox is open
 */
const Lightbox = ({ images, initialIndex = 0, onClose, isOpen }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;
      switch (e.key) {
        case 'Escape': onClose(); break;
        case 'ArrowLeft': handlePrevious(); break;
        case 'ArrowRight': handleNext(); break;
        default: break;
      }
    },
    [isOpen, onClose, handlePrevious, handleNext]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.lightbox}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.6, 1] }}
        >
          <div className={styles.overlay} aria-hidden="true" />

          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close lightbox"
            type="button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className={styles.content}>
            {images.length > 1 && (
              <button className={`${styles.navButton} ${styles.prevButton}`}
                onClick={handlePrevious} aria-label="Previous image" type="button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}

            <div className={styles.imageWrapper}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={currentIndex}
                  src={currentImage.src}
                  alt={currentImage.alt || currentImage.title || 'Gallery image'}
                  className={styles.image}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: [0.32, 0, 0.67, 0] }}
                />
              </AnimatePresence>
            </div>

            {images.length > 1 && (
              <button className={`${styles.navButton} ${styles.nextButton}`}
                onClick={handleNext} aria-label="Next image" type="button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}
          </div>

          <div className={styles.info}>
            {currentImage.title && (
              <h2 className={styles.title}>{currentImage.title}</h2>
            )}
            {images.length > 1 && (
              <p className={styles.counter}>{currentIndex + 1} / {images.length}</p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Lightbox.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
      title: PropTypes.string,
    })
  ).isRequired,
  initialIndex: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Lightbox;
```

### Step 3: Update Lightbox.module.scss — remove replaced keyframes

Remove the `@keyframes fadeIn` and `@keyframes zoomIn` blocks (they are now handled by Framer Motion). Remove the `animation:` property from `.lightbox` and `.image` class. Keep `@keyframes spin` (still used by `.spinner`).

Final `.lightbox` class (no `animation` property):
```scss
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

Final `.image` class (no `animation` property):
```scss
.image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;

  @include responsive($breakpoint-mobile) {
    max-height: 70vh;
  }
}
```

Remove the `@keyframes fadeIn` block entirely. Remove the `@keyframes zoomIn` block entirely.

### Step 4: Write a Lightbox render test

Create `apps/monte-da-estrada/src/__tests__/Lightbox.test.jsx`:

```jsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Lightbox from '../components/Lightbox/Lightbox';

const mockImages = [
  { src: '/img1.jpg', alt: 'Image 1', title: 'First' },
  { src: '/img2.jpg', alt: 'Image 2', title: 'Second' },
];

describe('Lightbox', () => {
  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <Lightbox images={mockImages} isOpen={false} onClose={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders current image when isOpen is true', () => {
    render(
      <Lightbox images={mockImages} isOpen={true} initialIndex={0} onClose={() => {}} />
    );
    expect(screen.getByAltText('Image 1')).toBeTruthy();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    render(
      <Lightbox images={mockImages} isOpen={true} onClose={onClose} />
    );
    const closeBtn = screen.getByRole('button', { name: /close lightbox/i });
    await userEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('shows image counter for multiple images', () => {
    render(
      <Lightbox images={mockImages} isOpen={true} initialIndex={0} onClose={() => {}} />
    );
    expect(screen.getByText('1 / 2')).toBeTruthy();
  });
});
```

### Step 5: Run tests

```bash
cd apps/monte-da-estrada && npx vitest run src/__tests__/Lightbox.test.jsx
```

Expected: All 4 tests PASS.

### Step 6: Commit

```bash
git add apps/monte-da-estrada/src/components/Lightbox/Lightbox.jsx
git add apps/monte-da-estrada/src/components/Lightbox/Lightbox.module.scss
git add apps/monte-da-estrada/src/__tests__/Lightbox.test.jsx
git commit -m "feat: upgrade Lightbox to Framer Motion with AnimatePresence transitions"
```

---

## Task 2: Rebuild GaleriaPage.jsx

**Files:**
- Modify: `apps/monte-da-estrada/src/pages/GaleriaPage/GaleriaPage.jsx`

**Context:** The page gains a `CategoryNav` with two items, plus two editorially-headed masonry sections. Lightbox is section-scoped (clicking O Monte images shows only O Monte images in lightbox, not mixed). The Hero wrapper gets `id="galeria-hero"` so CategoryNav knows when to appear.

### Step 1: Read the existing file

```
Read: apps/monte-da-estrada/src/pages/GaleriaPage/GaleriaPage.jsx
```

### Step 2: Replace GaleriaPage.jsx

```jsx
import React, { useState, useMemo } from 'react';
import SEO from '@/components/SEO';
import Hero from '@/components/Hero';
import Lightbox from '@/components/Lightbox';
import { CategoryNav } from '@touril-ecosystem/ui-components';
import { ScrollReveal } from '@/motion';
import styles from './GaleriaPage.module.scss';
import galeriaData from '@/data/galeria.json';
import { seoConfig } from '@/utils/seo-config';
import { galeriaImages } from '@/assets/images/galeria';
import { homeImages } from '@/assets/images/home';
import { exteriorImages } from '@/assets/images/exterior';
import { descobrirImages } from '@/assets/images/descobrir';
import { descobrirAttractions } from '@/assets/images/redondezas';

// ── CategoryNav items ──────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'o-monte', label: 'O Monte' },
  { id: 'a-regiao', label: 'A Região' },
];

// ── Section editorial copy ─────────────────────────────────────
const SECTION_COPY = {
  oMonte: {
    eyebrow: 'GALERIA · O MONTE',
    title: 'O Espaço',
    body: 'Um monte alentejano recuperado com critério — jardins, piscina, terraços e o silêncio do campo a enquadrar cada momento.',
  },
  aRegiao: {
    eyebrow: 'GALERIA · A REGIÃO',
    title: 'O Território',
    body: 'A Costa Vicentina e o Alentejo Litoral: praias selvagens, vilas branqueadas a cal e uma natureza que impõe respeito.',
  },
};

const GaleriaPage = () => {
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // ── O Monte — estate images ────────────────────────────────
  const oMonteImages = useMemo(() => [
    ...galeriaImages.gallery,
    ...homeImages.gallery,
    ...exteriorImages.amenities,
  ], []);

  // ── A Região — territory images ────────────────────────────
  const aRegiaoImages = useMemo(() => [
    ...descobrirImages.beaches,
    ...descobrirImages.experiences,
    ...descobrirAttractions.attractions,
  ], []);

  const openLightbox = (images, index) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  return (
    <div className={styles.galeriaPage}>
      <SEO
        title={seoConfig.galeria.title}
        description={seoConfig.galeria.description}
        keywords={seoConfig.galeria.keywords}
        image={seoConfig.galeria.image}
      />

      {/* Hero — id used by CategoryNav to know when to appear */}
      <div id="galeria-hero">
        <Hero
          backgroundImage={galeriaData.hero.image}
          title={galeriaData.hero.title}
          subtitle={galeriaData.hero.subtitle}
          height="60vh"
        />
      </div>

      {/* Sticky sub-navigation */}
      <CategoryNav items={NAV_ITEMS} targetId="galeria-hero" headerHeight={72} />

      {/* ── O Monte ─────────────────────────────────────────── */}
      <section id="o-monte" className={styles.section}>
        <ScrollReveal>
          <header className={styles.sectionHeader}>
            <span className={styles.eyebrow}>{SECTION_COPY.oMonte.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{SECTION_COPY.oMonte.title}</h2>
            <p className={styles.sectionBody}>{SECTION_COPY.oMonte.body}</p>
          </header>
        </ScrollReveal>

        <div className={styles.masonryGrid}>
          {oMonteImages.map((image, index) => (
            <div
              key={`o-monte-${index}`}
              className={styles.masonryItem}
              onClick={() => openLightbox(oMonteImages, index)}
              role="button"
              tabIndex={0}
              aria-label={`Ver imagem: ${image.title || image.alt}`}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(oMonteImages, index)}
            >
              <img
                src={image.src}
                alt={image.alt || image.title || 'Monte da Estrada'}
                loading="lazy"
                className={styles.masonryImage}
              />
              {image.title && (
                <div className={styles.imageOverlay}>
                  <span className={styles.imageTitle}>{image.title}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── A Região ─────────────────────────────────────────── */}
      <section id="a-regiao" className={`${styles.section} ${styles.sectionAlt}`}>
        <ScrollReveal>
          <header className={styles.sectionHeader}>
            <span className={styles.eyebrow}>{SECTION_COPY.aRegiao.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{SECTION_COPY.aRegiao.title}</h2>
            <p className={styles.sectionBody}>{SECTION_COPY.aRegiao.body}</p>
          </header>
        </ScrollReveal>

        <div className={styles.masonryGrid}>
          {aRegiaoImages.map((image, index) => (
            <div
              key={`a-regiao-${index}`}
              className={styles.masonryItem}
              onClick={() => openLightbox(aRegiaoImages, index)}
              role="button"
              tabIndex={0}
              aria-label={`Ver imagem: ${image.title || image.alt}`}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(aRegiaoImages, index)}
            >
              <img
                src={image.src}
                alt={image.alt || image.title || 'A Região'}
                loading="lazy"
                className={styles.masonryImage}
              />
              {image.title && (
                <div className={styles.imageOverlay}>
                  <span className={styles.imageTitle}>{image.title}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox — section-scoped images */}
      <Lightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
      />
    </div>
  );
};

export default GaleriaPage;
```

### Step 3: Commit

```bash
git add apps/monte-da-estrada/src/pages/GaleriaPage/GaleriaPage.jsx
git commit -m "refactor: rebuild GaleriaPage with two editorial sections and CategoryNav"
```

---

## Task 3: Rebuild GaleriaPage SCSS — Column Masonry

**Files:**
- Modify: `apps/monte-da-estrada/src/pages/GaleriaPage/GaleriaPage.module.scss`

**Context:** Replace the uniform grid with CSS `column-count` masonry. Natural image proportions are preserved. 0px border radius, no box-shadow (brand rules). Hover shows a deep-brown gradient overlay with the image title.

### Step 1: Read the existing file

```
Read: apps/monte-da-estrada/src/pages/GaleriaPage/GaleriaPage.module.scss
```

### Step 2: Replace with masonry SCSS

```scss
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.galeriaPage {
  width: 100%;
}

// ── Section wrapper ──────────────────────────────────────────
.section {
  padding: $spacing-xxxl $spacing-l ($spacing-xxxl * 2);
  max-width: $container-max-width;
  margin: 0 auto;

  @include responsive($breakpoint-tablet) {
    padding: $spacing-xxl $spacing-m $spacing-xxxl;
  }
}

.sectionAlt {
  background-color: $color-sand;
  // Reason: alternate bg creates editorial breathing room between the two narratives
  max-width: 100%;
  padding-left: max($spacing-l, calc((100vw - #{$container-max-width}) / 2));
  padding-right: max($spacing-l, calc((100vw - #{$container-max-width}) / 2));
}

// ── Editorial section header ────────────────────────────────
.sectionHeader {
  max-width: 640px;
  margin: 0 0 $spacing-xxxl;
}

.eyebrow {
  display: block;
  font-family: $font-display;
  font-size: $font-size-caption;
  font-weight: $font-weight-medium;
  letter-spacing: $letter-spacing-headline;
  color: $color-cool-taupe;
  text-transform: uppercase;
  margin-bottom: $spacing-s;
}

.sectionTitle {
  font-family: $font-display;
  font-size: $font-size-h2;
  font-weight: $font-weight-light;
  letter-spacing: $letter-spacing-headline;
  color: $color-deep-brown;
  margin: 0 0 $spacing-m;
  line-height: $line-height-tight;

  @include responsive($breakpoint-tablet) {
    font-size: $font-size-h3;
  }
}

.sectionBody {
  font-family: $font-body;
  font-size: $font-size-body;
  color: $color-charcoal;
  line-height: $line-height-relaxed;
  letter-spacing: $letter-spacing-body;
  max-width: 560px;
  margin: 0;
}

// ── Masonry grid ─────────────────────────────────────────────
.masonryGrid {
  column-count: 3;
  column-gap: $spacing-s;

  @include responsive($breakpoint-desktop) {
    column-count: 2;
  }

  @include responsive($breakpoint-tablet) {
    column-count: 2;
    column-gap: $spacing-xs;
  }

  @include responsive($breakpoint-mobile) {
    column-count: 1;
  }
}

// ── Individual item ──────────────────────────────────────────
.masonryItem {
  break-inside: avoid;
  margin-bottom: $spacing-s;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  display: block;

  // Reason: 0px radius enforced by brand — no softened corners
  border-radius: 0;

  &:hover .masonryImage {
    transform: scale(1.025);
  }

  &:hover .imageOverlay {
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid $color-clay;
    outline-offset: 2px;
  }

  @include responsive($breakpoint-mobile) {
    margin-bottom: $spacing-xs;
  }
}

.masonryImage {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 350ms $ease-out-back;
}

// ── Hover overlay with title ──────────────────────────────────
.imageOverlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: $spacing-xl $spacing-m $spacing-m;
  background: linear-gradient(
    to top,
    rgba($color-deep-brown, 0.88) 0%,
    rgba($color-deep-brown, 0.6) 50%,
    rgba($color-deep-brown, 0) 100%
  );
  opacity: 0;
  transition: opacity 300ms $ease-in-out;
}

.imageTitle {
  display: block;
  font-family: $font-display;
  font-size: $font-size-body-small;
  font-weight: $font-weight-medium;
  letter-spacing: $letter-spacing-subheading;
  color: $color-cream;
  text-transform: uppercase;
}
```

### Step 3: Run the dev server and visual check

```bash
cd apps/monte-da-estrada && npm run dev
```

Open `http://localhost:5173/galeria` and verify:
- Three masonry columns visible on desktop
- Images maintain natural proportions (no forced 4:3 crop)
- Hero exits → CategoryNav appears with "O Monte" and "A Região"
- Clicking either nav item smooth-scrolls to section
- Hover shows deep-brown gradient + title
- Clicking an image opens Lightbox with Framer Motion fade
- Arrow keys and Escape work in lightbox

### Step 4: Commit

```bash
git add apps/monte-da-estrada/src/pages/GaleriaPage/GaleriaPage.module.scss
git commit -m "style: rebuild GaleriaPage SCSS with column-count masonry and editorial headers"
```

---

## Task 4: Write GaleriaPage render tests

**Files:**
- Create: `apps/monte-da-estrada/src/__tests__/GaleriaPage.test.jsx`

**Context:** Basic rendering smoke test — confirms the two sections and CategoryNav are present.

### Step 1: Write the test file

```jsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import GaleriaPage from '../pages/GaleriaPage/GaleriaPage';

// Mock CategoryNav — it uses IntersectionObserver not available in jsdom
vi.mock('@touril-ecosystem/ui-components', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    CategoryNav: ({ items }) => (
      <nav data-testid="category-nav">
        {items.map((item) => (
          <a key={item.id} href={`#${item.id}`}>{item.label}</a>
        ))}
      </nav>
    ),
  };
});

const renderPage = () =>
  render(
    <HelmetProvider>
      <BrowserRouter>
        <GaleriaPage />
      </BrowserRouter>
    </HelmetProvider>
  );

describe('GaleriaPage', () => {
  it('renders both editorial sections', () => {
    renderPage();
    expect(screen.getByText('O Espaço')).toBeTruthy();
    expect(screen.getByText('O Território')).toBeTruthy();
  });

  it('renders the CategoryNav with correct labels', () => {
    renderPage();
    expect(screen.getByText('O Monte')).toBeTruthy();
    expect(screen.getByText('A Região')).toBeTruthy();
  });

  it('each section has a masonry grid with images', () => {
    renderPage();
    const images = document.querySelectorAll('img[loading="lazy"]');
    expect(images.length).toBeGreaterThan(5);
  });
});
```

### Step 2: Run tests

```bash
cd apps/monte-da-estrada && npx vitest run src/__tests__/GaleriaPage.test.jsx
```

Expected: All 3 tests PASS.

### Step 3: Final commit

```bash
git add apps/monte-da-estrada/src/__tests__/GaleriaPage.test.jsx
git commit -m "test: add GaleriaPage render tests for editorial sections and navigation"
```

---

## Post-Implementation QA Checklist

After all tasks are done, check these manually in the browser:

- [ ] Desktop (1440px): 3-column masonry, natural image proportions
- [ ] Tablet (768px): 2-column masonry
- [ ] Mobile (375px): 1-column
- [ ] CategoryNav hidden on initial load, appears after scrolling past hero
- [ ] "O Monte" nav item smooth-scrolls to estate section
- [ ] "A Região" nav item smooth-scrolls to territory section
- [ ] Active nav item underline tracks current section while scrolling
- [ ] Lightbox opens with fade-in (300ms) when image is clicked
- [ ] Image transitions inside lightbox (fade+scale, 350ms)
- [ ] Lightbox closes on Escape, backdrop click, and × button
- [ ] Arrow keys navigate between images in lightbox
- [ ] Lightbox images are section-scoped (O Monte images don't bleed into A Região set)
- [ ] 0px border radius everywhere (no rounded corners)
- [ ] No box shadows
- [ ] All images lazy-loaded (`loading="lazy"` attribute present)
- [ ] All tests pass: `npx vitest run`
