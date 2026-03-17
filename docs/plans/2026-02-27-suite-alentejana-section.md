# Suite Alentejana Section Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Replace the 6-room RoomGrid on the homepage with a single, premium "Suite Alentejana" editorial section featuring an auto-playing carousel with Ken Burns effects, bottom-reveal text animations, and hybrid amenity grid.

**Architecture:**
- New shared library component `SuiteAlentejanaSection` with two sub-components: `SuiteCarousel` (carousel logic + Ken Burns transitions) and `AmenityGrid` (icon+label amenity pairs)
- SCSS module with staggered bottom-reveal animations for all text elements
- Data file (`suiteAlentejana.json`) for carousel images, amenities, and copy
- Replace `RoomGrid` section in HomePage with new `SuiteAlentejanaSection`

**Tech Stack:** React (functional components), SCSS Modules, Framer Motion (motion constants), existing brand tokens (cream, deep brown, clay)

---

## Task 1: Create SuiteCarousel Sub-Component (Carousel Logic + Ken Burns)

**Files:**
- Create: `packages/touril-ecosystem-ui-components/src/components/SuiteCarousel/SuiteCarousel.jsx`
- Create: `packages/touril-ecosystem-ui-components/src/components/SuiteCarousel/SuiteCarousel.module.scss`
- Create: `packages/touril-ecosystem-ui-components/src/components/SuiteCarousel/index.js`

**Step 1: Create SuiteCarousel component file**

```jsx
// SuiteCarousel.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './SuiteCarousel.module.scss';

const SuiteCarousel = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-advance carousel every 5 seconds (unless hovering)
  useEffect(() => {
    if (isHovering || images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovering, images.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (!images || images.length === 0) {
    return <div className={styles.carouselEmpty}>No images available</div>;
  }

  return (
    <div
      className={styles.carouselContainer}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className={styles.carouselSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className={styles.carouselImage}
            initial={{ scale: 1 }}
            animate={{ scale: 1.02 }}
            transition={{ duration: 5, ease: 'easeInOut' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className={styles.dotsContainer}>
        {images.map((_, index) => (
          <motion.button
            key={index}
            className={`${styles.dot} ${
              index === currentIndex ? styles.active : ''
            }`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
            animate={{ opacity: index === currentIndex ? 1 : 0.5 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* Left/Right Arrow Controls */}
      <button
        className={styles.arrowButton}
        onClick={handlePrev}
        aria-label="Previous slide"
      >
        ←
      </button>
      <button
        className={styles.arrowButton}
        onClick={handleNext}
        aria-label="Next slide"
      >
        →
      </button>
    </div>
  );
};

export default SuiteCarousel;
```

**Step 2: Create SuiteCarousel SCSS with Ken Burns + animations**

```scss
// SuiteCarousel.module.scss
@use '../../styles/variables' as *;
@use '../../styles/mixins' as *;

.carouselContainer {
  position: relative;
  width: 100%;
  overflow: hidden;
  background-color: $color-cream;

  @media (max-width: $breakpoint-mobile) {
    height: 60vh;
  }

  @media (min-width: $breakpoint-mobile + 1px) {
    height: 450px;
  }
}

.carouselSlide {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.carouselImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.dotsContainer {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 10;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 0; // Your brand rule: 0px radius
  border: none;
  background-color: $color-deep-brown;
  opacity: 0.3;
  cursor: pointer;
  transition: all 0.3s ease;

  &.active {
    width: 28px;
    opacity: 1;
    box-shadow: 0 0 0 2px $color-clay;
  }

  &:hover {
    opacity: 0.6;
  }
}

.arrowButton {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  color: $color-deep-brown;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 12px 16px;
  opacity: 0.5;
  transition: opacity 0.3s ease;
  z-index: 15;

  &:first-of-type {
    left: 16px;
  }

  &:last-of-type {
    right: 16px;
  }

  &:hover {
    opacity: 1;
  }

  @media (max-width: $breakpoint-mobile) {
    font-size: 18px;
    padding: 8px 12px;
  }
}

.carouselEmpty {
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $color-cream;
  color: $color-deep-brown;
  font-size: 18px;
}
```

**Step 3: Create index.js barrel export**

```js
// index.js
export { default as SuiteCarousel } from './SuiteCarousel';
```

**Step 4: Verify file structure**

Run:
```bash
ls -la packages/touril-ecosystem-ui-components/src/components/SuiteCarousel/
```

Expected: Three files listed (SuiteCarousel.jsx, SuiteCarousel.module.scss, index.js)

**Step 5: Commit**

```bash
cd packages/touril-ecosystem-ui-components
git add src/components/SuiteCarousel/
git commit -m "feat: create SuiteCarousel component with Ken Burns effect"
```

---

## Task 2: Create AmenityGrid Sub-Component

**Files:**
- Create: `packages/touril-ecosystem-ui-components/src/components/AmenityGrid/AmenityGrid.jsx`
- Create: `packages/touril-ecosystem-ui-components/src/components/AmenityGrid/AmenityGrid.module.scss`
- Create: `packages/touril-ecosystem-ui-components/src/components/AmenityGrid/index.js`

**Step 1: Create AmenityGrid component**

```jsx
// AmenityGrid.jsx
import React from 'react';
import { motion } from 'framer-motion';
import styles from './AmenityGrid.module.scss';

const AmenityGrid = ({ atmospheric = [], premium = [] }) => {
  const allAmenities = [
    ...atmospheric.map((item) => ({ ...item, type: 'atmospheric' })),
    ...premium.map((item) => ({ ...item, type: 'premium' })),
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className={styles.amenityGrid}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {allAmenities.map((amenity, index) => (
        <motion.div
          key={index}
          className={`${styles.amenityItem} ${styles[amenity.type]}`}
          variants={itemVariants}
        >
          {amenity.icon && (
            <div className={styles.amenityIcon}>{amenity.icon}</div>
          )}
          <div className={styles.amenityLabel}>{amenity.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AmenityGrid;
```

**Step 2: Create AmenityGrid SCSS**

```scss
// AmenityGrid.module.scss
@use '../../styles/variables' as *;
@use '../../styles/mixins' as *;

.amenityGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 32px;
  width: 100%;
  margin: 48px 0;

  @media (max-width: $breakpoint-mobile) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    margin: 32px 0;
  }
}

.amenityItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;

  &.atmospheric {
    .amenityLabel {
      color: $color-clay;
      font-weight: 500;
    }
  }

  &.premium {
    .amenityLabel {
      color: $color-deep-brown;
      font-weight: 400;
    }
  }
}

.amenityIcon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.amenityLabel {
  font-size: 14px;
  line-height: 1.4;
  letter-spacing: 0.5px;
  max-width: 120px;
}
```

**Step 3: Create index.js barrel export**

```js
// index.js
export { default as AmenityGrid } from './AmenityGrid';
```

**Step 4: Verify file structure**

Run:
```bash
ls -la packages/touril-ecosystem-ui-components/src/components/AmenityGrid/
```

Expected: Three files listed

**Step 5: Commit**

```bash
cd packages/touril-ecosystem-ui-components
git add src/components/AmenityGrid/
git commit -m "feat: create AmenityGrid component with atmospheric + premium amenities"
```

---

## Task 3: Create SuiteAlentejanaSection Main Component

**Files:**
- Create: `packages/touril-ecosystem-ui-components/src/components/SuiteAlentejanaSection/SuiteAlentejanaSection.jsx`
- Create: `packages/touril-ecosystem-ui-components/src/components/SuiteAlentejanaSection/SuiteAlentejanaSection.module.scss`
- Create: `packages/touril-ecosystem-ui-components/src/components/SuiteAlentejanaSection/index.js`

**Step 1: Create SuiteAlentejanaSection component**

```jsx
// SuiteAlentejanaSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import SuiteCarousel from '../SuiteCarousel';
import AmenityGrid from '../AmenityGrid';
import styles from './SuiteAlentejanaSection.module.scss';

const SuiteAlentejanaSection = ({
  eyebrow = 'Quartos',
  heading = 'A Suite Alentejana',
  tagline = 'Um refúgio onde a luz do Alentejo entra pelas janelas.',
  description = [],
  carouselImages = [],
  amenities = { atmospheric: [], premium: [] },
  ctaLabel = 'Reservar A Suite Alentejana',
  ctaHref = '#',
}) => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section className={styles.suiteSection}>
      {/* Carousel */}
      <SuiteCarousel images={carouselImages} />

      {/* Content Container */}
      <motion.div
        className={styles.contentContainer}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {/* Eyebrow */}
        <motion.div className={styles.eyebrow} variants={textVariants}>
          {eyebrow}
        </motion.div>

        {/* Heading */}
        <motion.h1 className={styles.heading} variants={textVariants}>
          {heading}
        </motion.h1>

        {/* Tagline */}
        <motion.p className={styles.tagline} variants={textVariants}>
          {tagline}
        </motion.p>

        {/* Description Paragraphs */}
        <motion.div className={styles.description} variants={containerVariants}>
          {Array.isArray(description) ? (
            description.map((para, index) => (
              <motion.p key={index} variants={textVariants}>
                {para}
              </motion.p>
            ))
          ) : (
            <motion.p variants={textVariants}>{description}</motion.p>
          )}
        </motion.div>

        {/* Amenity Grid */}
        <AmenityGrid
          atmospheric={amenities.atmospheric}
          premium={amenities.premium}
        />

        {/* CTA Button */}
        <motion.a
          href={ctaHref}
          className={styles.ctaButton}
          variants={textVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {ctaLabel}
        </motion.a>
      </motion.div>
    </section>
  );
};

export default SuiteAlentejanaSection;
```

**Step 2: Create SuiteAlentejanaSection SCSS with bottom-reveal animations**

```scss
// SuiteAlentejanaSection.module.scss
@use '../../styles/variables' as *;
@use '../../styles/mixins' as *;

.suiteSection {
  width: 100%;
  background-color: $color-cream;
}

.contentContainer {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 64px 48px;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: $breakpoint-mobile) {
    padding: 40px 24px;
  }
}

.eyebrow {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: $color-clay;
  margin-bottom: 16px;
}

.heading {
  font-size: 48px;
  font-weight: 700;
  letter-spacing: 1px;
  color: $color-deep-brown;
  margin-bottom: 12px;
  line-height: 1.2;

  @media (max-width: $breakpoint-mobile) {
    font-size: 32px;
  }
}

.tagline {
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0.75px;
  color: $color-deep-brown;
  margin-bottom: 32px;
  line-height: 1.5;

  @media (max-width: $breakpoint-mobile) {
    font-size: 16px;
    margin-bottom: 24px;
  }
}

.description {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;

  p {
    font-size: 16px;
    line-height: 1.6;
    letter-spacing: 0.5px;
    color: $color-deep-brown;

    @media (max-width: $breakpoint-mobile) {
      font-size: 14px;
      line-height: 1.5;
    }
  }
}

.ctaButton {
  display: inline-block;
  padding: 16px 48px;
  margin-top: 32px;
  background-color: $color-clay;
  color: $color-deep-brown;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.75px;
  text-decoration: none;
  text-align: center;
  border: none;
  border-radius: 0; // Brand rule: 0px radius
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;

  &:hover {
    opacity: 0.85;
  }

  &:active {
    opacity: 0.75;
  }

  @media (max-width: $breakpoint-mobile) {
    width: 100%;
    align-self: stretch;
    padding: 14px 32px;
  }
}
```

**Step 3: Create index.js barrel export**

```js
// index.js
export { default as SuiteAlentejanaSection } from './SuiteAlentejanaSection';
```

**Step 4: Verify file structure**

Run:
```bash
ls -la packages/touril-ecosystem-ui-components/src/components/SuiteAlentejanaSection/
```

Expected: Three files listed

**Step 5: Commit**

```bash
cd packages/touril-ecosystem-ui-components
git add src/components/SuiteAlentejanaSection/
git commit -m "feat: create SuiteAlentejanaSection main component"
```

---

## Task 4: Update Shared Library Index.js to Export New Components

**Files:**
- Modify: `packages/touril-ecosystem-ui-components/src/index.js`

**Step 1: Read current index.js**

Run:
```bash
cat packages/touril-ecosystem-ui-components/src/index.js | head -50
```

**Step 2: Add new component exports to index.js**

At the end of the components section (before any closing exports), add:

```js
// Suite Alentejana
export { default as SuiteAlentejanaSection } from './components/SuiteAlentejanaSection';
export { default as SuiteCarousel } from './components/SuiteCarousel';
export { default as AmenityGrid } from './components/AmenityGrid';
```

**Step 3: Verify export is there**

Run:
```bash
grep -n "SuiteAlentejanaSection" packages/touril-ecosystem-ui-components/src/index.js
```

Expected: Line number showing the export

**Step 4: Commit**

```bash
cd packages/touril-ecosystem-ui-components
git add src/index.js
git commit -m "feat: export SuiteAlentejanaSection components from shared library"
```

---

## Task 5: Create Suite Data File

**Files:**
- Create: `apps/monte-da-estrada/src/data/suiteAlentejana.json`

**Step 1: Create data file**

```json
{
  "eyebrow": "Quartos",
  "heading": "A Suite Alentejana",
  "tagline": "Um refúgio onde a luz do Alentejo entra pelas janelas.",
  "description": [
    "Desperte ao silêncio da montanha. Grandes janelas enquadram a paisagem.",
    "O terraço privativo é seu—para o café matinal ou o entardecer sem pressa.",
    "Pavimento aquecido, chuveiro de chuva, têxteis premium. O conforto que não se vê, mas se sente."
  ],
  "ctaLabel": "Reservar A Suite Alentejana",
  "ctaHref": "https://booking-link.com",
  "amenities": {
    "atmospheric": [
      { "label": "Silêncio da montanha", "icon": "🌄" },
      { "label": "Luz natural abundante", "icon": "☀️" },
      { "label": "Terraço privativo", "icon": "🏞️" },
      { "label": "Vistas panorâmicas", "icon": "👁️" }
    ],
    "premium": [
      { "label": "Chuveiro de chuva", "icon": "💧" },
      { "label": "Pavimento aquecido", "icon": "🔥" },
      { "label": "Têxteis premium", "icon": "🛏️" },
      { "label": "AC & Wi-Fi", "icon": "📡" }
    ]
  }
}
```

**Step 2: Verify file exists**

Run:
```bash
cat apps/monte-da-estrada/src/data/suiteAlentejana.json
```

Expected: JSON output with all fields

**Step 3: Commit**

```bash
cd apps/monte-da-estrada
git add src/data/suiteAlentejana.json
git commit -m "data: add Suite Alentejana content and amenities"
```

---

## Task 6: Update HomePage to Use SuiteAlentejanaSection

**Files:**
- Modify: `apps/monte-da-estrada/src/pages/HomePage/HomePage.jsx`

**Step 1: Import new component and data**

Replace the existing import section with:

```jsx
import React from 'react';
import SEO from '@/components/SEO';
import {
  ImmersiveHero,
  EditorialAnchor,
  EditorialSplitSection,
  FullBleedImage,
  AmenityStrip,
  SuiteAlentejanaSection,  // NEW
  ActivityHighlights,
  BookingSection,
  GalleryPreview,
  CategoryNav,
} from '@touril-ecosystem/ui-components';
import atividadesData from '@/data/atividades.json';
import suiteAlentejanaData from '@/data/suiteAlentejana.json';  // NEW
import { homeImages } from '@/assets/images/home';
import { quartosImages } from '@/assets/images/quartos';
import { galeriaImages } from '@/assets/images/galeria';
import { seoConfig } from '@/utils/seo-config';
import styles from './HomePage.module.scss';
```

**Step 2: Create carousel images array (before component)**

Add this after the `homeRooms` array (and before the `activityItems` section):

```jsx
// Suite Alentejana carousel images — best angles showcasing the experience
const suiteCarouselImages = [
  {
    src: quartosImages.rooms[4].src,
    alt: 'Suite Alentejana com luz matinal e vista panorâmica',
  },
  {
    src: quartosImages.rooms[5].src,
    alt: 'Terraço privativo com vista para o Alentejo',
  },
  {
    src: quartosImages.rooms[7].src,
    alt: 'Chuveiro de chuva e detalhes de luxo',
  },
];
```

**Step 3: Replace RoomGrid section with SuiteAlentejanaSection**

Find the section that looks like (around line 195-205):

```jsx
{/* S4 — Quartos — Room Grid ───────────────────────────── */}
{/* 6-card portrait grid. Teaser only — /quartos has full detail */}
<div id="quartos">
  <RoomGrid
    eyebrow="Quartos"
    heading="Seis quartos. Cada um, o seu."
    subHeading="Não há dois iguais. A luz da manhã entra diferente em cada divisão. Escolha pelo que quer acordar a ver."
    rooms={homeRooms}
    ctaLabel="Ver todos os quartos"
    ctaHref="/quartos"
  />
</div>
```

Replace it with:

```jsx
{/* S4 — Suite Alentejana — Editorial Suite Experience ────────────── */}
{/* Single premium suite with carousel, atmospheric copy, amenities, booking CTA */}
<div id="quartos">
  <SuiteAlentejanaSection
    eyebrow={suiteAlentejanaData.eyebrow}
    heading={suiteAlentejanaData.heading}
    tagline={suiteAlentejanaData.tagline}
    description={suiteAlentejanaData.description}
    carouselImages={suiteCarouselImages}
    amenities={suiteAlentejanaData.amenities}
    ctaLabel={suiteAlentejanaData.ctaLabel}
    ctaHref={suiteAlentejanaData.ctaHref}
  />
</div>
```

**Step 4: Remove unused homeRooms array**

Delete the entire `homeRooms` constant (lines 41-84) since it's no longer used.

**Step 5: Verify HomePage compiles**

Run:
```bash
cd apps/monte-da-estrada && npm run dev
```

Expected: Dev server starts without errors, homepage loads

**Step 6: Commit**

```bash
cd apps/monte-da-estrada
git add src/pages/HomePage/HomePage.jsx src/data/suiteAlentejana.json
git commit -m "feat: replace RoomGrid with SuiteAlentejanaSection on homepage"
```

---

## Task 7: Test Suite Alentejana Component in Browser

**Files:**
- No new files; manual visual testing

**Step 1: Start dev server**

```bash
cd apps/monte-da-estrada && npm run dev
```

Expected: Dev server on localhost:5173 (or similar)

**Step 2: Navigate to homepage**

Open browser to `http://localhost:5173/` and scroll to the Quartos (#quartos) section.

**Step 3: Visual checklist**

Verify:
- [ ] Carousel displays and auto-plays every 5 seconds
- [ ] Carousel images fade smoothly between slides (800ms cross-fade)
- [ ] Ken Burns effect visible on images (subtle 2-3% zoom)
- [ ] Indicator dots visible at bottom, active dot is highlighted (clay color)
- [ ] Left/right arrow buttons visible and functional
- [ ] Hovering carousel pauses auto-play
- [ ] All text elements (eyebrow, heading, tagline, description) fade in from bottom
- [ ] Amenity grid displays in 2-4 columns (responsive)
- [ ] CTA button is clay color, clickable
- [ ] Mobile responsive: single column, touch-friendly carousel

**Step 4: Test interactions**

- Click next/prev arrows
- Click indicator dots to jump frames
- Hover carousel to pause
- Click CTA button (should navigate to booking URL)
- Test on mobile device or DevTools mobile view

**Step 5: Commit**

```bash
git add -A
git commit -m "test: verify SuiteAlentejanaSection renders and animates correctly"
```

---

## Task 8: Create Jest Test for SuiteAlentejanaSection

**Files:**
- Create: `packages/touril-ecosystem-ui-components/src/components/SuiteAlentejanaSection/__tests__/SuiteAlentejanaSection.test.jsx`

**Step 1: Create test file**

```jsx
// SuiteAlentejanaSection.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SuiteAlentejanaSection from '../SuiteAlentejanaSection';

describe('SuiteAlentejanaSection', () => {
  const mockProps = {
    eyebrow: 'Quartos',
    heading: 'A Suite Alentejana',
    tagline: 'Um refúgio onde a luz do Alentejo entra pelas janelas.',
    description: ['Test description line 1', 'Test description line 2'],
    carouselImages: [
      { src: 'image1.jpg', alt: 'Image 1' },
      { src: 'image2.jpg', alt: 'Image 2' },
    ],
    amenities: {
      atmospheric: [{ label: 'Silence', icon: '🌄' }],
      premium: [{ label: 'Premium Linens', icon: '🛏️' }],
    },
    ctaLabel: 'Book Now',
    ctaHref: 'https://booking.com',
  };

  test('renders heading correctly', () => {
    render(<SuiteAlentejanaSection {...mockProps} />);
    expect(screen.getByText('A Suite Alentejana')).toBeInTheDocument();
  });

  test('renders tagline correctly', () => {
    render(<SuiteAlentejanaSection {...mockProps} />);
    expect(screen.getByText('Um refúgio onde a luz do Alentejo entra pelas janelas.')).toBeInTheDocument();
  });

  test('renders description paragraphs', () => {
    render(<SuiteAlentejanaSection {...mockProps} />);
    expect(screen.getByText('Test description line 1')).toBeInTheDocument();
    expect(screen.getByText('Test description line 2')).toBeInTheDocument();
  });

  test('renders CTA button with correct label and href', () => {
    render(<SuiteAlentejanaSection {...mockProps} />);
    const ctaButton = screen.getByRole('link', { name: 'Book Now' });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute('href', 'https://booking.com');
  });

  test('renders amenities in grid', () => {
    render(<SuiteAlentejanaSection {...mockProps} />);
    expect(screen.getByText('Silence')).toBeInTheDocument();
    expect(screen.getByText('Premium Linens')).toBeInTheDocument();
  });

  test('renders with default props when not provided', () => {
    render(<SuiteAlentejanaSection carouselImages={mockProps.carouselImages} />);
    expect(screen.getByText('A Suite Alentejana')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Reservar A Suite Alentejana' })).toBeInTheDocument();
  });
});
```

**Step 2: Run test**

```bash
cd packages/touril-ecosystem-ui-components && npm test -- SuiteAlentejanaSection.test.jsx
```

Expected: All tests pass (6 passing)

**Step 3: Commit**

```bash
cd packages/touril-ecosystem-ui-components
git add src/components/SuiteAlentejanaSection/__tests__/SuiteAlentejanaSection.test.jsx
git commit -m "test: add SuiteAlentejanaSection unit tests"
```

---

## Task 9: Verify Animations & Performance

**Files:**
- No new files; check DevTools

**Step 1: Open browser DevTools**

Right-click on page → Inspect → Animations tab (or use React DevTools)

**Step 2: Verify motion animations**

- Text elements (eyebrow, heading, tagline, description) should animate up from bottom (y: 20 → 0)
- Stagger delay visible between each text element (0.15s interval)
- Carousel image Ken Burns effect smooth over 5 seconds
- Carousel cross-fade smooth (800ms)
- Button hover scale effect works (1 → 1.02 → 1 on click)

**Step 3: Check performance (Lighthouse)**

Run Lighthouse audit on homepage:
- Target CLS (Cumulative Layout Shift) < 0.1 (animations shouldn't cause shifts)
- LCP (Largest Contentful Paint) < 2.5s
- FID (First Input Delay) < 100ms

**Step 4: Mobile animation test**

Test on actual mobile device or DevTools mobile view:
- Carousel touch swipe works smoothly
- Button tap responds instantly
- No jank during scrolling or animations

**Step 5: Commit (if any perf fixes)**

```bash
git add -A
git commit -m "perf: verify Suite Alentejana animations and lighthouse scores"
```

---

## Task 10: Final Visual & Copy Review

**Files:**
- Modify: `apps/monte-da-estrada/src/data/suiteAlentejana.json` (if copy adjustments needed)

**Step 1: Review on live page**

Load homepage at `http://localhost:5173/` and review:
- [ ] Carousel images are high-quality and representative
- [ ] Copy is compelling and poetic (not robotic)
- [ ] Amenity labels are accurate and readable
- [ ] CTA button stands out and is tempting to click
- [ ] White space and typography feel editorial/magazine-like
- [ ] Mobile layout is clean and scrollable

**Step 2: Adjust copy if needed**

If you want to tweak description text, headings, or amenity labels, edit:

```bash
apps/monte-da-estrada/src/data/suiteAlentejana.json
```

**Step 3: Test booking link**

Verify CTA button `ctaHref` links to the correct booking URL (ask for booking system URL if needed).

**Step 4: Final commit**

```bash
cd apps/monte-da-estrada
git add src/data/suiteAlentejana.json
git commit -m "copy: finalize Suite Alentejana content and booking link"
```

---

## Summary

**Completed:**
1. ✅ SuiteCarousel component (Ken Burns, cross-fade, auto-play)
2. ✅ AmenityGrid component (atmospheric + premium amenities)
3. ✅ SuiteAlentejanaSection main component (layout, animations, CTA)
4. ✅ Shared library exports
5. ✅ Data file (content + amenities)
6. ✅ HomePage integration (replaced RoomGrid)
7. ✅ Manual testing & visual verification
8. ✅ Jest unit tests
9. ✅ Performance & animation verification
10. ✅ Final copy review

**Key Features:**
- Cinematic carousel with Ken Burns effect (subtle zoom over 5 seconds)
- Cross-fade transitions between images (800ms)
- Bottom-reveal animations for all text (staggered)
- Hybrid amenity grid (4 atmospheric + 4 premium)
- Direct booking CTA
- Fully responsive design
- Zero radius, cream/deep brown/clay brand compliance
