# ContactoPage Editorial Rebuild — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Elevate the ContactoPage to match the editorial Boutique Collection DNA of the Homepage and DescobrirPage — correcting typography, form UX, section rhythms, and copy tone.

**Architecture:** Three files are modified: `ContactoPage.jsx` (full structural rebuild), `ContactoPage.module.scss` (full style rebuild), and `ContactForm.module.scss` (form style corrections). No new shared components needed — `SectionEyebrow` and `EditorialPullQuote` are already in the shared library and imported here.

**Tech Stack:** React (functional components), SCSS Modules, Framer Motion (`motion/react`), React Hook Form (existing), `@touril-ecosystem/ui-components` shared library.

---

## Context & Key Decisions

### Section Structure (S1 → S5)
```
S1 — Page Hero          (55vh, cream-tinted overlay, light editorial copy)
S2 — Contact Grid       (Cream bg #F5F3F0, 80px padding, SectionEyebrow + H2 + form)
S3 — Editorial Pause    (Cream bg, EditorialPullQuote shared component)
S4 — Map / Localização  (Deep Brown bg #3D3B38, dark reversal — like DescobrirPage Redondezas)
S5 — Directions         (Sand bg #EDE8E2, minimal architectural direction panels)
```

### Typography Standard
All section H2 headings use `font-weight: 300` (light) — matching DescobrirPage's editorial restraint. The `@include h2` mixin uses `font-weight-medium (500)` — we override it inline in `.sectionHeading`.

### Form Standards (brand brief)
- Labels: Inter 14px, weight 500 (medium), 0.75px letter-spacing, uppercase, clay colored
- Inputs: 0px border-radius, 1px solid `$color-warm-gray`, focus = `border-color: $color-clay` ONLY (no box-shadow — brand rule: no shadows)
- Submit button hover: `opacity: 0.85` + `transform: scale(1.02)`, 300ms ease-in-out
- Success feedback: `border-left: 2px solid $color-clay`, no background fill, no border-radius
- Error feedback: `border-left: 2px solid $color-error`, same treatment

### SectionEyebrow on dark background
`SectionEyebrow` always renders clay text — it naturally reads well on deep brown. No variant needed, the contrast is sufficient.

### Directions panels replace `<Card>` + `<Grid>` components
Use a direct CSS grid in SCSS + `.directionPanel` class. Panels have a `border-top: 2px solid $color-clay` architectural accent, no background fills.

### Imports used in ContactoPage.jsx
```js
// From shared library
import { SectionEyebrow, EditorialPullQuote, viewport, variants, stagger, duration, ease } from '@touril-ecosystem/ui-components';

// Local
import { motion } from 'motion/react';
import SEO from '@/components/SEO';
import Map from '@/components/Map';
import ContactForm from '@/components/ContactForm';
import ResponsiveImage from '@/components/ResponsiveImage';
import { homeImages } from '@/assets/images/home';
import localizacaoData from '@/data/localizacao.json';
```

---

## Task 1: Update ContactForm.module.scss

**Files:**
- Modify: `apps/monte-da-estrada/src/components/ContactForm/ContactForm.module.scss`

This fixes the form to be brand-compliant. No changes to `ContactForm.jsx`.

**Step 1: Replace ContactForm.module.scss with brand-compliant styles**

```scss
// ==================================
// ContactForm — Boutique Collection
// Brand rules: 0px radius, clay focus (no shadow), medium label weight.
// ==================================
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.form {
  @include flex-column;
  gap: $spacing-l;
  width: 100%;
}

.field {
  @include flex-column;
  gap: $spacing-xs;
}

// Labels: Inter 14px, medium weight, uppercase, clay — matching page eyebrow pattern
.label {
  font-family: $font-body;
  font-size: $font-size-caption; // 12px
  font-weight: $font-weight-medium; // 500 — not semibold
  letter-spacing: $letter-spacing-subheading; // 0.75px
  text-transform: uppercase;
  color: $color-clay;
}

.required {
  color: $color-clay;
  opacity: 0.6;
}

// Inputs: 0px radius, warm-gray border, clay focus (NO shadow — brand rule)
.input,
.textarea {
  width: 100%;
  padding: $spacing-m;
  border: $border-width-thin solid $color-warm-gray;
  border-radius: 0; // Brand rule: 0px everywhere
  font-family: $font-body;
  font-size: $font-size-body; // 16px
  font-weight: $font-weight-regular;
  letter-spacing: $letter-spacing-body;
  color: $color-deep-brown;
  background-color: $color-off-white;
  transition: border-color $transition-duration-normal $transition-timing-normal;

  &:focus {
    outline: none;
    border-color: $color-clay; // Clay accent only — no box-shadow (brand rule)
  }

  &::placeholder {
    color: $color-cool-taupe;
    font-style: normal;
  }

  &:disabled {
    background-color: $color-pale-gray;
    cursor: not-allowed;
    opacity: $opacity-disabled;
  }
}

// Error state: red border, no shadow
.input.error,
.textarea.error {
  border-color: $color-error;

  &:focus {
    border-color: $color-error;
  }
}

.textarea {
  resize: vertical;
  min-height: 140px;
}

// Inline field error text
.errorMessage {
  font-family: $font-body;
  font-size: $font-size-caption; // 12px
  letter-spacing: $letter-spacing-body;
  color: $color-error;
}

// Submit button: Clay bg, Deep Brown text, opacity+scale on hover (brand brief spec)
.submitButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: $spacing-m $spacing-xl;
  margin-top: $spacing-s;
  background-color: $color-clay;
  color: $color-deep-brown;
  border: 1px solid $color-clay;
  border-radius: 0; // Brand rule
  font-family: $font-body;
  font-size: $font-size-label; // 14px
  font-weight: $font-weight-medium; // 500
  letter-spacing: $letter-spacing-subheading; // 0.75px
  cursor: pointer;
  transition: opacity $transition-duration-normal $transition-timing-normal,
              transform $transition-duration-normal $transition-timing-normal,
              background-color $transition-duration-normal $transition-timing-normal;

  &:hover:not(:disabled) {
    opacity: 0.85;
    transform: scale(1.02); // Brand brief hover spec
  }

  &:focus-visible {
    outline: 2px solid $color-clay;
    outline-offset: 2px;
  }

  &:disabled {
    opacity: $opacity-disabled;
    cursor: not-allowed;
    transform: none;
  }
}

// Success feedback: clay left border, no fill, no radius
.successMessage {
  padding: $spacing-m 0 $spacing-m $spacing-l;
  border-left: 2px solid $color-clay;
  font-family: $font-body;
  font-size: $font-size-body-small; // 14px
  letter-spacing: $letter-spacing-body;
  color: $color-deep-brown;
  line-height: $line-height-relaxed;
}

// Error feedback: error border, no fill, no radius
.errorMessageBox {
  padding: $spacing-m 0 $spacing-m $spacing-l;
  border-left: 2px solid $color-error;
  font-family: $font-body;
  font-size: $font-size-body-small; // 14px
  letter-spacing: $letter-spacing-body;
  color: $color-deep-brown;
  line-height: $line-height-relaxed;
}
```

**Step 2: Verify no import errors**

Run the dev server and open `/contacto`. The form should show with:
- Clay-colored uppercase labels
- 0px border-radius inputs
- No box-shadow on focus, only border-color changing to clay
- Clay submit button

---

## Task 2: Rebuild ContactoPage.jsx

**Files:**
- Modify: `apps/monte-da-estrada/src/pages/ContactoPage/ContactoPage.jsx`

**Step 1: Replace ContactoPage.jsx**

```jsx
import React from 'react';
import { motion } from 'motion/react';
import SEO from '@/components/SEO';
import Map from '@/components/Map';
import ContactForm from '@/components/ContactForm';
import ResponsiveImage from '@/components/ResponsiveImage';
import {
  SectionEyebrow,
  EditorialPullQuote,
  viewport,
  variants,
  stagger,
} from '@touril-ecosystem/ui-components';
import { homeImages } from '@/assets/images/home';
import localizacaoData from '@/data/localizacao.json';
import styles from './ContactoPage.module.scss';

const ContactoPage = () => {
  const directions = [
    localizacaoData.directions.fromLisbon,
    localizacaoData.directions.fromFaro,
    localizacaoData.directions.fromPorto,
  ];

  return (
    <div className={styles.page}>
      <SEO
        title="Contacto"
        description="Planeie a sua visita ao Monte da Estrada. Estamos aqui para ajudar — reservas, perguntas ou simplesmente olá. Veja como chegar de Lisboa, Porto ou Faro."
        keywords="contacto, reservas, como chegar, monte da estrada, alentejo, zambujeira do mar"
        image="/images/hero-localizacao.jpg"
      />

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

      {/* S2 — Contact Grid ───────────────────────────────────── */}
      {/* Left: contact info (eyebrow + H2 + details). Right: form. */}
      {/* Cream background. No Section wrapper — direct HTML like DescobrirPage. */}
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>

            {/* Left — Contact info */}
            <motion.div
              className={styles.contactInfo}
              variants={variants.fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport.default}
            >
              <SectionEyebrow label="Contacto" />
              <h2 className={styles.sectionHeading}>
                Estamos aqui para ajudar.
              </h2>
              <p className={styles.contactIntro}>
                Respondemos a todas as mensagens em menos de 24 horas.
                Para reservas com datas próximas, preferimos o telefone
                ou WhatsApp.
              </p>

              <ul className={styles.contactDetails}>
                <li className={styles.contactItem}>
                  <span className={styles.contactLabel}>Telefone / WhatsApp</span>
                  <a
                    href={`tel:${localizacaoData.address.phone || '+351960254072'}`}
                    className={styles.contactValue}
                  >
                    {localizacaoData.address.phone || '+351 960 254 072'}
                  </a>
                </li>
                <li className={styles.contactItem}>
                  <span className={styles.contactLabel}>Email</span>
                  <a
                    href="mailto:montedaestradazambujeiradomar@gmail.com"
                    className={styles.contactValue}
                  >
                    montedaestradazambujeiradomar@gmail.com
                  </a>
                </li>
                <li className={styles.contactItem}>
                  <span className={styles.contactLabel}>Morada</span>
                  <address className={styles.contactAddress}>
                    {localizacaoData.address.name}<br />
                    {localizacaoData.address.street}<br />
                    {localizacaoData.address.postalCode} {localizacaoData.address.city}<br />
                    {localizacaoData.address.region}, {localizacaoData.address.country}
                  </address>
                </li>
                <li className={styles.contactItem}>
                  <span className={styles.contactLabel}>Check-in / Check-out</span>
                  <span className={styles.contactValue}>15h00 / 12h00</span>
                </li>
              </ul>
            </motion.div>

            {/* Right — Contact form */}
            <motion.div
              className={styles.contactFormWrapper}
              variants={variants.fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport.default}
              transition={{ delay: 0.15 }}
            >
              <ContactForm />
            </motion.div>

          </div>
        </div>
      </section>

      {/* S3 — Editorial Pull Quote ───────────────────────────── */}
      {/* Contemplative pause before the dark map section. */}
      {/* Clay left border + italic serif (GT Sectra / Lora). */}
      <EditorialPullQuote
        quote="A conversa começa aqui."
        attribution="Monte da Estrada"
        background="cream"
      />

      {/* S4 — Map / Localização (Deep Brown) ─────────────────── */}
      {/* Dark background reversal — same pattern as Redondezas on DescobrirPage. */}
      {/* SectionEyebrow renders in clay, which reads well on deep brown. */}
      <section className={styles.mapSection}>
        <div className={styles.container}>
          <motion.div
            variants={variants.fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport.default}
          >
            <SectionEyebrow label="Localização" />
            <h2 className={styles.sectionHeadingLight}>
              Encontre-nos.
            </h2>
          </motion.div>
          <motion.div
            className={styles.mapWrapper}
            variants={variants.fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewport.default}
            transition={{ delay: 0.2 }}
          >
            <Map
              latitude={localizacaoData.address.coordinates.latitude}
              longitude={localizacaoData.address.coordinates.longitude}
              title={`Mapa — ${localizacaoData.address.street}, ${localizacaoData.address.city}`}
              height="480px"
            />
          </motion.div>
        </div>
      </section>

      {/* S5 — Directions (Sand) ──────────────────────────────── */}
      {/* Sand background ($color-sand) — lighter than cream, warmer than off-white. */}
      {/* Direction panels replace <Card>: minimal, architectural, no fills. */}
      <section className={styles.directionsSection}>
        <div className={styles.container}>
          <motion.div
            variants={variants.fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport.default}
          >
            <SectionEyebrow label="Como Chegar" />
            <h2 className={styles.sectionHeading}>
              {localizacaoData.directions.title}
            </h2>
          </motion.div>

          <motion.div
            className={styles.directionsGrid}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: stagger.default,
                  delayChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={viewport.default}
          >
            {directions.map((direction, index) => (
              <motion.div
                key={index}
                className={styles.directionPanel}
                variants={variants.fadeUp}
              >
                <h3 className={styles.directionCity}>{direction.title}</h3>
                <p className={styles.directionMeta}>
                  <span className={styles.directionMetaItem}>
                    {direction.distance}
                  </span>
                  <span className={styles.directionMetaDivider}>·</span>
                  <span className={styles.directionMetaItem}>
                    {direction.duration}
                  </span>
                </p>
                <ol className={styles.routeList}>
                  {direction.route.map((step, i) => (
                    <li key={i} className={styles.routeStep}>{step}</li>
                  ))}
                </ol>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default ContactoPage;
```

**Step 2: Verify imports compile**

Open the dev server and navigate to `/contacto`. Check the browser console for any import errors. The page should render with 5 visible sections.

---

## Task 3: Rebuild ContactoPage.module.scss

**Files:**
- Modify: `apps/monte-da-estrada/src/pages/ContactoPage/ContactoPage.module.scss`

**Step 1: Replace ContactoPage.module.scss**

```scss
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

// ==================================
// CONTACTO PAGE — Boutique Collection
// Structure mirrors DescobrirPage: minimal wrappers,
// section backgrounds and layout handled here.
// Brand rules: 0px radius, no shadows, generous whitespace.
// ==================================

.page {
  width: 100%;
}

// ==================================
// SHARED CONTAINER
// ==================================

.container {
  max-width: $container-max-width;
  margin: 0 auto;
  padding: 0 $container-padding;

  @include mobile {
    padding: 0 $spacing-m;
  }
}

// ==================================
// S1 — HERO (55vh, cream-tinted overlay)
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

// Cream-tinted overlay at 10–50% opacity (brand: no more than 15% at top)
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

// ==================================
// SHARED HEADING PATTERNS
// ==================================

// Light-weight H2 — editorial standard (font-weight: 300, not 500)
// This is what DescobrirPage uses for all section headings.
.sectionHeading {
  font-family: $font-display;
  font-size: clamp($font-size-h4, 3vw, $font-size-h2);
  font-weight: $font-weight-light; // 300 — override the @include h2 mixin weight
  line-height: $line-height-tight;
  letter-spacing: $letter-spacing-headline; // 1px
  color: $color-deep-brown;
  margin: 0 0 $spacing-xxl 0;

  @include mobile {
    margin-bottom: $spacing-xl;
  }
}

// Same heading on dark background — cream text
.sectionHeadingLight {
  @extend .sectionHeading;
  color: $color-cream;
}

// ==================================
// S2 — CONTACT SECTION (Cream)
// ==================================

.contactSection {
  background-color: $color-cream;
  padding: 80px 0;
}

// 50/50 grid: info left, form right
.contactGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-xxxl * 1.5; // ~72px — generous whitespace between columns

  @include tablet {
    grid-template-columns: 1fr;
    gap: $spacing-xxl;
  }

  @include mobile {
    grid-template-columns: 1fr;
    gap: $spacing-xl;
  }
}

.contactInfo {
  // Layout placeholder — content styled via child elements
}

.contactIntro {
  font-family: $font-body;
  font-size: $font-size-body; // 16px
  font-weight: $font-weight-regular;
  line-height: $line-height-relaxed;
  letter-spacing: $letter-spacing-body;
  color: $color-charcoal;
  margin: 0 0 $spacing-xxl 0;
  max-width: 440px;
}

// Contact detail list: label + value pairs
.contactDetails {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: $spacing-xl;
}

.contactItem {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
}

// Clay uppercase label — same pattern as SectionEyebrow
.contactLabel {
  font-family: $font-body;
  font-size: $font-size-caption; // 12px
  font-weight: $font-weight-medium;
  letter-spacing: $letter-spacing-subheading;
  text-transform: uppercase;
  color: $color-clay;
}

.contactValue {
  font-family: $font-body;
  font-size: $font-size-body;
  font-weight: $font-weight-regular;
  letter-spacing: $letter-spacing-body;
  color: $color-deep-brown;
  text-decoration: none;
  transition: color $transition-duration-normal $transition-timing-normal;

  &:hover {
    color: $color-clay;
  }
}

.contactAddress {
  font-family: $font-body;
  font-size: $font-size-body;
  font-weight: $font-weight-regular;
  font-style: normal; // <address> defaults to italic — override
  line-height: $line-height-relaxed;
  letter-spacing: $letter-spacing-body;
  color: $color-deep-brown;
}

.contactFormWrapper {
  // Layout placeholder
}

// ==================================
// S4 — MAP SECTION (Deep Brown — dark reversal)
// ==================================

.mapSection {
  background-color: $color-deep-brown;
  padding: 80px 0;
}

// Map iframe wrapper — sharp corners, no shadow
.mapWrapper {
  width: 100%;
  overflow: hidden;
  margin-top: $spacing-xl;
  border: 1px solid rgba($color-cream, 0.1); // Very subtle frame on dark bg
}

// ==================================
// S5 — DIRECTIONS SECTION (Sand)
// ==================================

.directionsSection {
  background-color: $color-sand; // #EDE8E2 — warmer, distinct from cream
  padding: 80px 0;
}

// 3-column grid — matches brand's geometric precision
.directionsGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-xl;

  @include tablet {
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-l;
  }

  @include mobile {
    grid-template-columns: 1fr;
    gap: $spacing-l;
  }
}

// Minimal architectural panel: clay top border accent, no fills
.directionPanel {
  border-top: 2px solid $color-clay; // Architectural precision accent
  padding-top: $spacing-l;
}

// City name: display font, light weight, editorial
.directionCity {
  font-family: $font-display;
  font-size: $font-size-h4; // 24px
  font-weight: $font-weight-light; // 300
  line-height: $line-height-tight;
  letter-spacing: $letter-spacing-subheading;
  color: $color-deep-brown;
  margin: 0 0 $spacing-s 0;
}

// Distance + time: clay, Inter, compact
.directionMeta {
  font-family: $font-body;
  font-size: $font-size-body-small; // 14px
  font-weight: $font-weight-medium;
  letter-spacing: $letter-spacing-subheading;
  color: $color-clay;
  margin: 0 0 $spacing-l 0;
  display: flex;
  align-items: center;
  gap: $spacing-s;
}

.directionMetaItem {
  // Inline span — inherits parent styles
}

.directionMetaDivider {
  color: $color-cool-taupe;
  opacity: 0.6;
}

// Route steps: numbered, Inter body, charcoal
.routeList {
  padding-left: $spacing-l;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
}

.routeStep {
  font-family: $font-body;
  font-size: $font-size-body-small; // 14px
  font-weight: $font-weight-regular;
  line-height: $line-height-relaxed;
  letter-spacing: $letter-spacing-body;
  color: $color-charcoal;
}

// ==================================
// REDUCED MOTION
// ==================================

@media (prefers-reduced-motion: reduce) {
  .heroContent,
  .contactGrid,
  .mapWrapper,
  .directionsGrid {
    transition: none;
  }
}
```

**Step 2: Visual check**

Navigate to `/contacto` and verify:
1. Hero: 55vh, cream text, "Planeie a sua visita." at font-weight 300
2. Contact section: cream bg, clay labels, 50/50 grid
3. Pull quote: italic serif, clay left border
4. Map section: deep brown bg, cream heading, map renders
5. Directions: sand bg, clay top-border panels, 3-col grid

---

## Task 4: Visual Consistency Checks

**Step 1: Typography weight audit**
- Confirm all H2 section headings are font-weight 300 (not 500)
- Confirm hero H1 is font-weight 300
- Confirm form labels are Inter, 12px, uppercase, weight 500, clay

**Step 2: Form interaction audit**
- Focus an input: border should turn clay. No box-shadow or glow.
- Hover submit button: slight scale + opacity reduction (not jarring)
- Submit form successfully: left-border success message appears (no box/fill)

**Step 3: Section rhythm audit**
- Hero → Cream (contact) → Cream (pull quote) → Deep Brown (map) → Sand (directions)
- The dark map section should feel like the same strong visual break as DescobrirPage's Redondezas

**Step 4: Mobile audit (resize to 375px)**
- Hero: 45vh min 280px, copy readable
- Contact grid: stacks to single column
- Directions: stacks to single column

---

## Task 5: Commit

```bash
git add apps/monte-da-estrada/src/pages/ContactoPage/ContactoPage.jsx
git add apps/monte-da-estrada/src/pages/ContactoPage/ContactoPage.module.scss
git add apps/monte-da-estrada/src/components/ContactForm/ContactForm.module.scss
git commit -m "feat: rebuild ContactoPage to Boutique Collection editorial standard

- Section structure: Hero / Contact Grid / Pull Quote / Dark Map / Directions
- Form: 0px radius, clay focus (no shadow), medium label weight, scale+opacity hover
- Typography: all H2 headings font-weight 300 (editorial restraint, matches DescobrirPage)
- Copy: elevated from generic to brand-voice (PT-PT, warm and direct)
- Map section: deep brown background — dark visual reversal matching DescobrirPage
- Directions: sand background, minimal architectural panels replacing Card component

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```
