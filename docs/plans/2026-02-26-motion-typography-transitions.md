# Motion Typography Transitions Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace basic fade-up text transitions with premium editorial motion — line-reveal headings, section-level stagger choreography, and subtle image parallax — across all pages.

**Architecture:** Add 3 new motion tokens (editorial duration, organic easing, headline distance), 3 new components (RevealText, RevealSection, ParallaxImage), 2 new variants (lineReveal, sectionStagger), then systematically apply them to every page. No existing components are removed — only enhanced.

**Tech Stack:** Framer Motion v12 (`motion/react`), React, SCSS Modules, existing shared library.

**Design Doc:** `docs/plans/2026-02-26-motion-typography-transitions-design.md`

---

## Task 1: Add Editorial Motion Tokens

**Files:**
- Modify: `packages/touril-ecosystem-ui-components/src/constants/motion.js`
- Modify: `apps/monte-da-estrada/src/motion/motion.config.js`

**Step 1: Add tokens to shared library**

In `packages/touril-ecosystem-ui-components/src/constants/motion.js`, add to each object:

```js
// In duration (after line 17, before closing brace):
  editorial: 0.9,  // 900ms — premium text reveals, editorial headings

// In ease (after line 29, before closing brace):
  organic: [0.22, 1, 0.36, 1],      // Exponential-out — luxury hotel signature curve

// In distance (after line 56, before closing brace):
  headline: 32,    // Deep headline lift for cinematic reveals
```

**Step 2: Mirror tokens in app config**

In `apps/monte-da-estrada/src/motion/motion.config.js`, add the same 3 tokens to the same objects at:
- `duration` (after line 17)
- `ease` (after line 33)
- `distance` (after line 56)

**Step 3: Verify no import errors**

Run: `cd apps/monte-da-estrada && npx vite build --mode development 2>&1 | head -20`
Expected: No errors. Build starts successfully.

**Step 4: Commit**

```bash
git add packages/touril-ecosystem-ui-components/src/constants/motion.js apps/monte-da-estrada/src/motion/motion.config.js
git commit -m "feat(motion): add editorial duration, organic easing, and headline distance tokens"
```

---

## Task 2: Add lineReveal and sectionStagger Variants

**Files:**
- Modify: `apps/monte-da-estrada/src/motion/motion.variants.js`
- Modify: `packages/touril-ecosystem-ui-components/src/constants/motion.js`
- Modify: `apps/monte-da-estrada/src/motion/index.js`

**Step 1: Add lineReveal variant to app variants**

In `apps/monte-da-estrada/src/motion/motion.variants.js`, add after the `fadeRight` export (after line 129):

```js
// ============================================
// LINE REVEAL — Premium editorial heading entrance
// ============================================

/** Line reveal — text slides up from behind a clipped mask edge.
 *  The signature "luxury hotel" text entrance. Zero layout shift. */
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

/** Editorial fade-up — slower, more organic version of fadeUp for body text */
export const editorialFadeUp = {
  hidden: {
    opacity: 0,
    y: distance.default,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.editorial,
      ease: ease.organic,
    },
  },
};
```

**Step 2: Add sectionStagger variant**

In the same file, add after the `staggerContainerSlow` export (after line 166):

```js
/** Section stagger — orchestrates eyebrow → heading → body → CTA */
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

**Step 3: Add lineReveal to shared library variants**

In `packages/touril-ecosystem-ui-components/src/constants/motion.js`, add inside the `variants` object (after line 128, before the closing `};`):

```js
  // Line reveal — premium editorial heading entrance
  lineReveal: {
    hidden: {
      clipPath: 'inset(100% 0 0 0)',
      opacity: 0,
      y: distance.headline,
    },
    visible: {
      clipPath: 'inset(0% 0 0 0)',
      opacity: 1,
      y: 0,
      transition: { duration: duration.editorial, ease: ease.organic },
    },
  },

  // Editorial fade-up — slower organic body text reveal
  editorialFadeUp: {
    hidden: { opacity: 0, y: distance.default },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: duration.editorial, ease: ease.organic },
    },
  },

  // Section stagger — choreographed section reveals
  sectionStagger: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  },
```

**Step 4: Export new variants from app motion index**

In `apps/monte-da-estrada/src/motion/index.js`, add to the variant exports block (after line 27):

```js
  lineReveal,
  editorialFadeUp,
  sectionStagger,
```

**Step 5: Verify build**

Run: `cd apps/monte-da-estrada && npx vite build --mode development 2>&1 | head -20`
Expected: No errors.

**Step 6: Commit**

```bash
git add apps/monte-da-estrada/src/motion/motion.variants.js packages/touril-ecosystem-ui-components/src/constants/motion.js apps/monte-da-estrada/src/motion/index.js
git commit -m "feat(motion): add lineReveal, editorialFadeUp, and sectionStagger variants"
```

---

## Task 3: Create RevealText Component

**Files:**
- Create: `apps/monte-da-estrada/src/motion/components/RevealText/RevealText.jsx`
- Create: `apps/monte-da-estrada/src/motion/components/RevealText/index.js`
- Modify: `apps/monte-da-estrada/src/motion/index.js`

**Step 1: Create RevealText component**

Create `apps/monte-da-estrada/src/motion/components/RevealText/RevealText.jsx`:

```jsx
import { motion, useReducedMotion } from 'motion/react';
import PropTypes from 'prop-types';
import { duration, ease, distance, viewport } from '../../motion.config';
import { lineReveal, editorialFadeUp } from '../../motion.variants';

const effectMap = {
  lineReveal,
  fadeUp: editorialFadeUp,
};

/**
 * Premium text reveal component for editorial typography.
 * Supports clip-mask line reveals (headings) and organic fade-ups (body text).
 *
 * Usage:
 *   <RevealText as="h2" effect="lineReveal">
 *     Entre o Alentejo e o Atlântico.
 *   </RevealText>
 *
 *   <RevealText as="p" delay={0.15}>
 *     Body text with organic entrance.
 *   </RevealText>
 */
const RevealText = ({
  children,
  as = 'p',
  effect = 'fadeUp',
  delay = 0,
  threshold,
  triggerOnce = true,
  className,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion[as];
  const variants = effectMap[effect] || editorialFadeUp;

  // Reason: Render static text for users with reduced-motion preference
  if (shouldReduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  // Apply delay if specified
  const resolvedVariants = delay
    ? {
        ...variants,
        visible: {
          ...variants.visible,
          transition: {
            ...variants.visible.transition,
            delay,
          },
        },
      }
    : variants;

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: triggerOnce,
        amount: threshold ?? viewport.default.amount,
      }}
      variants={resolvedVariants}
      className={className}
    >
      {children}
    </Component>
  );
};

RevealText.propTypes = {
  /** Content to reveal */
  children: PropTypes.node.isRequired,
  /** HTML element to render */
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span']),
  /** Reveal effect: lineReveal for headings, fadeUp for body */
  effect: PropTypes.oneOf(['lineReveal', 'fadeUp']),
  /** Delay before animation starts (seconds) */
  delay: PropTypes.number,
  /** Viewport visibility threshold (0-1) */
  threshold: PropTypes.number,
  /** Only animate once */
  triggerOnce: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default RevealText;
```

**Step 2: Create barrel export**

Create `apps/monte-da-estrada/src/motion/components/RevealText/index.js`:

```js
export { default } from './RevealText';
```

**Step 3: Export from motion index**

In `apps/monte-da-estrada/src/motion/index.js`, add after line 34:

```js
export { default as RevealText } from './components/RevealText';
```

**Step 4: Verify build**

Run: `cd apps/monte-da-estrada && npx vite build --mode development 2>&1 | head -20`
Expected: No errors.

**Step 5: Commit**

```bash
git add apps/monte-da-estrada/src/motion/components/RevealText/ apps/monte-da-estrada/src/motion/index.js
git commit -m "feat(motion): create RevealText component with lineReveal and editorial fadeUp"
```

---

## Task 4: Create RevealSection Component

**Files:**
- Create: `apps/monte-da-estrada/src/motion/components/RevealSection/RevealSection.jsx`
- Create: `apps/monte-da-estrada/src/motion/components/RevealSection/index.js`
- Modify: `apps/monte-da-estrada/src/motion/index.js`

**Step 1: Create RevealSection component**

Create `apps/monte-da-estrada/src/motion/components/RevealSection/RevealSection.jsx`:

```jsx
import { motion, useReducedMotion } from 'motion/react';
import PropTypes from 'prop-types';
import { viewport } from '../../motion.config';
import { sectionStagger } from '../../motion.variants';

/**
 * Section-level stagger orchestration wrapper.
 * Choreographs child reveals in DOM order: eyebrow → heading → body → CTA.
 * Children should be motion-aware (RevealText, motion.div, etc.).
 *
 * Usage:
 *   <RevealSection>
 *     <SectionEyebrow label="Experiências" />
 *     <RevealText as="h2" effect="lineReveal">Heading</RevealText>
 *     <RevealText as="p">Body text</RevealText>
 *   </RevealSection>
 */
const RevealSection = ({
  children,
  as = 'div',
  staggerDelay = 0.12,
  threshold,
  triggerOnce = true,
  className,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion[as];

  // Reason: Render static content for users with reduced-motion preference
  if (shouldReduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  // Custom stagger timing if overridden
  const containerVariants = staggerDelay !== 0.12
    ? {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.05,
          },
        },
      }
    : sectionStagger;

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: triggerOnce,
        amount: threshold ?? viewport.default.amount,
      }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </Component>
  );
};

RevealSection.propTypes = {
  children: PropTypes.node.isRequired,
  /** Container HTML element */
  as: PropTypes.string,
  /** Stagger delay between children (seconds) */
  staggerDelay: PropTypes.number,
  /** Viewport visibility threshold */
  threshold: PropTypes.number,
  /** Only animate once */
  triggerOnce: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default RevealSection;
```

**Step 2: Create barrel export**

Create `apps/monte-da-estrada/src/motion/components/RevealSection/index.js`:

```js
export { default } from './RevealSection';
```

**Step 3: Export from motion index**

In `apps/monte-da-estrada/src/motion/index.js`, add after the RevealText export:

```js
export { default as RevealSection } from './components/RevealSection';
```

**Step 4: Verify build**

Run: `cd apps/monte-da-estrada && npx vite build --mode development 2>&1 | head -20`
Expected: No errors.

**Step 5: Commit**

```bash
git add apps/monte-da-estrada/src/motion/components/RevealSection/ apps/monte-da-estrada/src/motion/index.js
git commit -m "feat(motion): create RevealSection component for section-level stagger orchestration"
```

---

## Task 5: Create ParallaxImage Component

**Files:**
- Create: `apps/monte-da-estrada/src/motion/components/ParallaxImage/ParallaxImage.jsx`
- Create: `apps/monte-da-estrada/src/motion/components/ParallaxImage/ParallaxImage.module.scss`
- Create: `apps/monte-da-estrada/src/motion/components/ParallaxImage/index.js`
- Modify: `apps/monte-da-estrada/src/motion/index.js`

**Step 1: Create ParallaxImage component**

Create `apps/monte-da-estrada/src/motion/components/ParallaxImage/ParallaxImage.jsx`:

```jsx
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import PropTypes from 'prop-types';
import styles from './ParallaxImage.module.scss';

/**
 * Subtle scroll-linked parallax image.
 * Image moves at a slower rate than scroll, creating depth.
 * Wrapped in overflow:hidden to prevent edge gaps.
 *
 * Usage:
 *   <ParallaxImage
 *     src="/images/landscape.jpg"
 *     alt="Alentejo landscape"
 *     speed={0.1}
 *   />
 */
const ParallaxImage = ({
  src,
  alt,
  speed = 0.1,
  className = '',
  aspectRatio,
}) => {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Reason: Convert scroll progress to a subtle Y translation
  // speed=0.1 means 10% of viewport height of parallax range
  const yRange = `${speed * 100}%`;
  const y = useTransform(scrollYProgress, [0, 1], [`-${yRange}`, yRange]);

  const containerStyle = aspectRatio ? { aspectRatio } : {};

  // Reason: Skip parallax for users with reduced-motion preference
  if (shouldReduceMotion) {
    return (
      <div
        ref={ref}
        className={`${styles.container} ${className}`}
        style={containerStyle}
      >
        <img src={src} alt={alt} className={styles.image} />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`${styles.container} ${className}`}
      style={containerStyle}
    >
      <motion.img
        src={src}
        alt={alt}
        className={styles.image}
        style={{ y }}
      />
    </div>
  );
};

ParallaxImage.propTypes = {
  /** Image source URL */
  src: PropTypes.string.isRequired,
  /** Image alt text */
  alt: PropTypes.string.isRequired,
  /** Parallax intensity (0 = none, 0.1 = subtle, 0.2 = noticeable) */
  speed: PropTypes.number,
  /** Additional CSS classes for container */
  className: PropTypes.string,
  /** CSS aspect-ratio for the container (e.g., '16/9') */
  aspectRatio: PropTypes.string,
};

export default ParallaxImage;
```

**Step 2: Create SCSS module**

Create `apps/monte-da-estrada/src/motion/components/ParallaxImage/ParallaxImage.module.scss`:

```scss
.container {
  position: relative;
  overflow: hidden;
  width: 100%;
}

.image {
  display: block;
  width: 100%;
  height: 120%; // Extra height to prevent edge gaps during parallax
  object-fit: cover;
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  .image {
    height: 100%;
    will-change: auto;
  }
}
```

**Step 3: Create barrel export**

Create `apps/monte-da-estrada/src/motion/components/ParallaxImage/index.js`:

```js
export { default } from './ParallaxImage';
```

**Step 4: Export from motion index**

In `apps/monte-da-estrada/src/motion/index.js`, add after RevealSection export:

```js
export { default as ParallaxImage } from './components/ParallaxImage';
```

**Step 5: Verify build**

Run: `cd apps/monte-da-estrada && npx vite build --mode development 2>&1 | head -20`
Expected: No errors.

**Step 6: Commit**

```bash
git add apps/monte-da-estrada/src/motion/components/ParallaxImage/ apps/monte-da-estrada/src/motion/index.js
git commit -m "feat(motion): create ParallaxImage component for subtle scroll-linked depth"
```

---

## Task 6: Upgrade EditorialSplitSection (Shared Library)

**Files:**
- Modify: `packages/touril-ecosystem-ui-components/src/components/EditorialSplitSection/EditorialSplitSection.jsx`

**Step 1: Add motion imports and upgrade internal text**

The current component (lines 58-75) renders eyebrow, h2, p, and CTA as static children inside a `motion.div` parent with `variants.fadeUp`. Upgrade to individual motion elements with editorial timing and section stagger.

Replace the text column block (lines 57-75) with:

```jsx
      {/* Text Column — staggered editorial reveals */}
      <motion.div
        className={styles.textColumn}
        variants={variants.sectionStagger}
      >
        {eyebrow && (
          <motion.span className={styles.eyebrow} variants={variants.editorialFadeUp}>
            {eyebrow}
          </motion.span>
        )}

        <motion.h2 className={styles.heading} variants={variants.lineReveal}>
          {heading}
        </motion.h2>

        {bodyArray.map((paragraph, index) => (
          <motion.p key={index} className={styles.bodyParagraph} variants={variants.editorialFadeUp}>
            {paragraph}
          </motion.p>
        ))}

        {ctaLabel && ctaHref && (
          <motion.a href={ctaHref} className={styles.cta} variants={variants.editorialFadeUp}>
            {ctaLabel}
            <span className={styles.arrow}> →</span>
          </motion.a>
        )}
      </motion.div>
```

**Important:** The parent `motion.section` already has `initial="hidden" whileInView="visible"`, which propagates to these children via the variant system. The `sectionStagger` variant on the text column orchestrates the sequence. Each child uses its own variant (`lineReveal` for h2, `editorialFadeUp` for text).

**Step 2: Verify build**

Run: `cd apps/monte-da-estrada && npx vite build --mode development 2>&1 | head -20`
Expected: No errors.

**Step 3: Commit**

```bash
git add packages/touril-ecosystem-ui-components/src/components/EditorialSplitSection/EditorialSplitSection.jsx
git commit -m "feat(EditorialSplitSection): upgrade to line-reveal headings and section stagger"
```

---

## Task 7: Apply RevealText to DescobrirPage

**Files:**
- Modify: `apps/monte-da-estrada/src/pages/DescobrirPage/DescobrirPage.jsx`

**Step 1: Add imports**

Add to imports (after line 2):

```js
import { RevealText, RevealSection } from '@/motion';
```

**Step 2: Upgrade Experiencias section header (lines 91-94)**

Replace:
```jsx
          <SectionEyebrow label="Experiências" />
          <h2 className={styles.sectionHeading}>Aqui não há agenda. A não ser a sua.</h2>
```

With:
```jsx
          <RevealSection>
            <SectionEyebrow label="Experiências" />
            <RevealText as="h2" effect="lineReveal" className={styles.sectionHeading}>
              Aqui não há agenda. A não ser a sua.
            </RevealText>
          </RevealSection>
```

**Step 3: Upgrade Praias section header (lines 152-154)**

Replace:
```jsx
          <SectionEyebrow label="Praias" />
          <h2 className={styles.sectionHeading}>110 km de costa. Escolha a sua.</h2>
```

With:
```jsx
          <RevealSection>
            <SectionEyebrow label="Praias" />
            <RevealText as="h2" effect="lineReveal" className={styles.sectionHeading}>
              110 km de costa. Escolha a sua.
            </RevealText>
          </RevealSection>
```

**Step 4: Verify build and visual check**

Run: `cd apps/monte-da-estrada && npx vite build --mode development 2>&1 | head -20`
Expected: No errors.

**Step 5: Commit**

```bash
git add apps/monte-da-estrada/src/pages/DescobrirPage/DescobrirPage.jsx
git commit -m "feat(DescobrirPage): upgrade headings to lineReveal with section stagger"
```

---

## Task 8: Apply RevealText to QuartosPage

**Files:**
- Modify: `apps/monte-da-estrada/src/pages/QuartosPage/QuartosPage.jsx`

**Step 1: Add imports**

Add to imports:

```js
import { RevealText, RevealSection } from '@/motion';
```

**Step 2: Upgrade rooms header (lines 153-164)**

Replace the `motion.div` wrapping the rooms header:

```jsx
          <motion.div
            className={styles.roomsHeader}
            variants={variants.fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport.default}
          >
            <SectionEyebrow label="Quartos" />
            <h2 className={styles.sectionHeading}>
              Seis quartos. Cada um, o seu.
            </h2>
          </motion.div>
```

With:
```jsx
          <RevealSection className={styles.roomsHeader}>
            <SectionEyebrow label="Quartos" />
            <RevealText as="h2" effect="lineReveal" className={styles.sectionHeading}>
              Seis quartos. Cada um, o seu.
            </RevealText>
          </RevealSection>
```

**Step 3: Upgrade booking header (lines 178-191)**

Replace:
```jsx
          <motion.div
            variants={variants.fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport.default}
          >
            <SectionEyebrow label="Reservas" />
            <h2 className={styles.sectionHeading}>
              O seu quarto espera.
            </h2>
            <p className={styles.bookingIntro}>
              Reserve agora e descubra onde vai acordar.
            </p>
          </motion.div>
```

With:
```jsx
          <RevealSection>
            <SectionEyebrow label="Reservas" />
            <RevealText as="h2" effect="lineReveal" className={styles.sectionHeading}>
              O seu quarto espera.
            </RevealText>
            <RevealText as="p" className={styles.bookingIntro}>
              Reserve agora e descubra onde vai acordar.
            </RevealText>
          </RevealSection>
```

**Step 4: Clean up unused imports**

Remove `variants` and `viewport` from the `@touril-ecosystem/ui-components` import if no longer used elsewhere in the file. Check the file — if `motion` from `motion/react` is still used, keep it; otherwise remove.

**Step 5: Verify build**

Run: `cd apps/monte-da-estrada && npx vite build --mode development 2>&1 | head -20`
Expected: No errors.

**Step 6: Commit**

```bash
git add apps/monte-da-estrada/src/pages/QuartosPage/QuartosPage.jsx
git commit -m "feat(QuartosPage): upgrade headings to lineReveal with section stagger"
```

---

## Task 9: Apply RevealText to GaleriaPage

**Files:**
- Modify: `apps/monte-da-estrada/src/pages/GaleriaPage/GaleriaPage.jsx`

**Step 1: Add imports**

Replace `ScrollReveal` import:
```js
import { ScrollReveal } from '@/motion';
```
With:
```js
import { RevealText, RevealSection } from '@/motion';
```

**Step 2: Upgrade O Monte section header (lines 86-92)**

Replace:
```jsx
        <ScrollReveal>
          <header className={styles.sectionHeader}>
            <span className={styles.eyebrow}>{SECTION_COPY.oMonte.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{SECTION_COPY.oMonte.title}</h2>
            <p className={styles.sectionBody}>{SECTION_COPY.oMonte.body}</p>
          </header>
        </ScrollReveal>
```

With:
```jsx
        <RevealSection as="header" className={styles.sectionHeader}>
          <RevealText as="span" className={styles.eyebrow}>
            {SECTION_COPY.oMonte.eyebrow}
          </RevealText>
          <RevealText as="h2" effect="lineReveal" className={styles.sectionTitle}>
            {SECTION_COPY.oMonte.title}
          </RevealText>
          <RevealText as="p" className={styles.sectionBody}>
            {SECTION_COPY.oMonte.body}
          </RevealText>
        </RevealSection>
```

**Step 3: Upgrade A Região section header (lines 118-124)**

Same pattern — replace the `ScrollReveal` wrapper with `RevealSection` + `RevealText` for each text element, using `SECTION_COPY.aRegiao`.

**Step 4: Verify build**

Run: `cd apps/monte-da-estrada && npx vite build --mode development 2>&1 | head -20`
Expected: No errors.

**Step 5: Commit**

```bash
git add apps/monte-da-estrada/src/pages/GaleriaPage/GaleriaPage.jsx
git commit -m "feat(GaleriaPage): upgrade section headers to lineReveal with stagger"
```

---

## Task 10: Apply RevealText to ContactoPage

**Files:**
- Modify: `apps/monte-da-estrada/src/pages/ContactoPage/ContactoPage.jsx`

**Step 1: Add imports**

Add to imports:
```js
import { RevealText, RevealSection } from '@/motion';
```

**Step 2: Upgrade contact section heading (lines 51-66)**

The current `motion.div` wraps the entire contact info column. We want to keep that wrapper but upgrade the h2 inside it. Replace lines 58-66:

```jsx
              <SectionEyebrow label="Contacto" />
              <h2 className={styles.sectionHeading}>
                Estamos aqui para ajudar.
              </h2>
              <p className={styles.contactIntro}>
                Respondemos a todas as mensagens em menos de 24 horas.
                Para reservas com datas próximas, preferimos o telefone
                ou WhatsApp.
              </p>
```

With (keeping them inside the existing motion.div parent which provides the animation context):
```jsx
              <SectionEyebrow label="Contacto" />
              <RevealText as="h2" effect="lineReveal" className={styles.sectionHeading}>
                Estamos aqui para ajudar.
              </RevealText>
              <RevealText as="p" className={styles.contactIntro}>
                Respondemos a todas as mensagens em menos de 24 horas.
                Para reservas com datas próximas, preferimos o telefone
                ou WhatsApp.
              </RevealText>
```

**Step 3: Upgrade map section heading (lines 130-133)**

Replace:
```jsx
            <SectionEyebrow label="Localização" />
            <h2 className={styles.sectionHeadingLight}>
              Encontre-nos.
            </h2>
```

With:
```jsx
            <SectionEyebrow label="Localização" />
            <RevealText as="h2" effect="lineReveal" className={styles.sectionHeadingLight}>
              Encontre-nos.
            </RevealText>
```

**Step 4: Upgrade directions heading (lines 164-167)**

Replace:
```jsx
            <SectionEyebrow label="Como Chegar" />
            <h2 className={styles.sectionHeading}>
              {localizacaoData.directions.title}
            </h2>
```

With:
```jsx
            <SectionEyebrow label="Como Chegar" />
            <RevealText as="h2" effect="lineReveal" className={styles.sectionHeading}>
              {localizacaoData.directions.title}
            </RevealText>
```

**Step 5: Verify build**

Run: `cd apps/monte-da-estrada && npx vite build --mode development 2>&1 | head -20`
Expected: No errors.

**Step 6: Commit**

```bash
git add apps/monte-da-estrada/src/pages/ContactoPage/ContactoPage.jsx
git commit -m "feat(ContactoPage): upgrade headings to lineReveal"
```

---

## Task 11: Visual QA and Final Build

**Step 1: Full production build**

Run: `cd apps/monte-da-estrada && npx vite build 2>&1`
Expected: Build succeeds with no errors or warnings.

**Step 2: Start dev server and test**

Run: `cd apps/monte-da-estrada && npx vite --host 2>&1`

Manually verify each page in the browser:
- [ ] HomePage — EditorialSplitSection headings now line-reveal
- [ ] DescobrirPage — Experiencias and Praias h2s line-reveal with stagger
- [ ] QuartosPage — Room and booking headings line-reveal with stagger
- [ ] GaleriaPage — Section headers line-reveal with stagger (eyebrow → h2 → p)
- [ ] ContactoPage — All 3 section headings line-reveal
- [ ] Test reduced motion (OS setting) — all text renders static
- [ ] Check mobile (responsive) — animations still trigger correctly

**Step 3: Final commit (if any adjustments needed)**

```bash
git add -A
git commit -m "chore: visual QA adjustments for motion typography transitions"
```
