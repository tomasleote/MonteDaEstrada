# Touril Luxury Aesthetic Integration Plan
## Monte da Estrada Website Transformation

**Document Version:** 1.0
**Created:** February 15, 2026
**Status:** Planning Phase
**Last Updated:** February 15, 2026

---

## 1. Executive Summary

This document outlines a comprehensive plan to elevate the Monte da Estrada website by integrating the luxury aesthetic of Herdade do Touril (https://herdadedotouril.com/) with the 97 high-quality scraped images currently available in the project.

### Objectives
1. **Visual Transformation:** Adopt Touril's sophisticated design language (earth tones, premium typography, elegant spacing)
2. **Complete Image Population:** Integrate all 97 scraped images across 7 categories into appropriate page sections
3. **CMS Optimization:** Maximize Decap CMS capabilities for content and image management
4. **Performance & Accessibility:** Ensure fast load times and full WCAG 2.1 AA compliance
5. **Modular Architecture:** Prepare components for potential future parent site integration

### Expected Outcomes
- Professional luxury aesthetic matching competitor benchmarks
- Complete visual content population via CMS-driven systems
- Fully responsive, accessible, high-performance website
- Scalable design system for future maintenance
- Clear documentation for ongoing updates

### Success Metrics
- All 97 images strategically placed and optimized
- Page load time < 3 seconds on 4G networks
- Lighthouse accessibility score ≥ 95
- Mobile-first responsive design verified across breakpoints
- 100% CMS content accuracy with zero broken image links
- Header/footer components extraction-ready for embedding

---

## 2. Phase 1: Visual Audit & Design System Extraction

### 2.1 Touril Website Analysis

**Assigned to:** UI Designer Agent
**Deliverable Timeline:** 2-3 days
**Output Location:** `design-system.md`

#### 2.1.1 Analysis Scope
Execute comprehensive visual audit of https://herdadedotouril.com/ focusing on:

1. **Typography Stack**
   - Primary font family (likely serif for luxury feel)
   - Secondary font family (supporting sans-serif)
   - Font weights in use (300, 400, 600, 700, etc.)
   - Heading hierarchy (H1-H6 sizes and line-heights)
   - Body text sizing and letter-spacing
   - Calculated REM values for scalability

2. **Color Palette**
   - Primary brand colors (greens, earth tones)
   - Secondary accent colors (gold, cream, warm neutrals)
   - Neutral palette (grays, off-whites, backgrounds)
   - Text colors (primary, secondary, muted)
   - Border/divider colors
   - Overlay colors for image treatments
   - Hex, RGB, and HSL values for each

3. **Spacing System**
   - Base unit calculation (likely 8px or 16px)
   - Margin scale (XS, S, M, L, XL, XXL)
   - Padding scale for components
   - Gap sizes for flexbox/grid layouts
   - Border widths (if applicable)
   - Gutter sizes for responsive breakpoints

4. **Elevation & Visual Hierarchy**
   - Shadow tokens (subtle, medium, strong)
   - Border radius patterns (sharp, slight, rounded)
   - Hover state enhancements
   - Active/focus state styling
   - Depth perception techniques

5. **Animation & Transitions**
   - Transition timing functions (ease-in-out, linear, cubic-bezier values)
   - Typical animation duration (200ms, 300ms, 500ms, etc.)
   - Scroll behavior (smooth, parallax, fade-in patterns)
   - Hover effects on interactive elements

6. **Image Treatment Patterns**
   - Aspect ratio conventions (16:9, 4:3, 1:1, custom)
   - Border treatments (frame, shadow, overlay)
   - Gradient overlays (direction, color, opacity)
   - Image filters (brightness, saturation, sepia)
   - Lazy loading indications
   - Gallery layouts (grid, masonry, carousel)

7. **Component Patterns**
   - Hero section structure and styling
   - Card components (room cards, activity cards)
   - Navigation patterns (sticky, smooth scroll)
   - Button styling (primary, secondary, ghost)
   - Form inputs (if present)
   - Footer structure and information hierarchy
   - Section spacing and alignment

#### 2.1.2 Deliverable: design-system.md Template

```markdown
# Herdade do Touril Design System Analysis

## 1. Typography
### Font Stack
- Primary: [Font Name] - [URL if web font]
- Secondary: [Font Name] - [URL if web font]

### Scales
#### Headings
- H1: [size]px / [rem], [weight], [line-height]
- H2: [size]px / [rem], [weight], [line-height]
- H3: [size]px / [rem], [weight], [line-height]
- H4: [size]px / [rem], [weight], [line-height]
- H5: [size]px / [rem], [weight], [line-height]
- H6: [size]px / [rem], [weight], [line-height]

#### Body Text
- Large: [size]px / [rem], [weight], [line-height]
- Regular: [size]px / [rem], [weight], [line-height]
- Small: [size]px / [rem], [weight], [line-height]
- Extra Small: [size]px / [rem], [weight], [line-height]

### Letter Spacing
- Headings: [value]px
- Body: [value]px
- Captions: [value]px

## 2. Color Palette
### Primary Colors
- Brand Green: #[hex]
- Brand Earth: #[hex]
- Brand Accent: #[hex]

### Neutral Palette
- Off-White / Cream: #[hex]
- Light Gray: #[hex]
- Medium Gray: #[hex]
- Dark Gray: #[hex]
- Black: #[hex]

### Text Colors
- Primary Text: #[hex]
- Secondary Text: #[hex]
- Muted Text: #[hex]
- Link Color: #[hex]
- Link Hover: #[hex]

### Accent Colors
- Gold: #[hex]
- Success: #[hex]
- Warning: #[hex]
- Error: #[hex]

## 3. Spacing System
### Base Unit
- 1 unit = [X]px

### Scale
- XS: [X]px
- S: [X]px
- M: [X]px
- L: [X]px
- XL: [X]px
- XXL: [X]px

### Responsive Gutters
- Mobile: [X]px
- Tablet: [X]px
- Desktop: [X]px

## 4. Elevation & Effects
### Shadows
- Subtle: [CSS shadow value]
- Medium: [CSS shadow value]
- Strong: [CSS shadow value]

### Border Radius
- Sharp: [X]px
- Slight: [X]px
- Rounded: [X]px
- Full: [X]px

## 5. Animation & Transitions
### Timing Functions
- Default: [cubic-bezier or ease value]
- Smooth: [cubic-bezier or ease value]
- Energetic: [cubic-bezier or ease value]

### Durations
- Quick: [X]ms
- Normal: [X]ms
- Slow: [X]ms

## 6. Image Treatments
### Aspect Ratios
- Hero: [ratio]
- Card: [ratio]
- Thumbnail: [ratio]
- Gallery: [ratio]

### Overlay Patterns
- Hero Overlay: [gradient or color description]
- Card Overlay: [gradient or color description]

### Hover Effects
- Scale: [X]%
- Opacity: [X]%
- Filter Effects: [description]

## 7. Component Patterns
### Hero Section
- Height: [X]px or [percentage]
- Text Overlay: [color with opacity]
- Typography Size: [H1 vs custom]
- Spacing from edges: [X]px

### Cards
- Border: [description]
- Shadow: [Subtle/Medium/Strong]
- Border Radius: [Slight/Rounded]
- Padding: [X]px
- Hover Effect: [description]

### Navigation
- Background: [color]
- Text Color: [color]
- Sticky Behavior: [yes/no, triggered at X px scroll]
- Height: [X]px

### Footer
- Background: [color]
- Text Color: [color]
- Layout: [flex/grid structure]
- Sections: [list of sections and their content]

## 8. Responsive Breakpoints
- Mobile: max-width [X]px
- Tablet: max-width [X]px
- Desktop: min-width [X]px

## 9. Visual Samples
[Screenshots or URLs of key sections]

## 10. Notable Accessibility Features
- Contrast ratios for text
- Focus states for interactive elements
- Skip-to-content links
- Alt text patterns
```

### 2.2 Design Token Mapping

**Timeline:** 1-2 days (concurrent with analysis)
**Deliverable:** `design-tokens-mapping.md`

#### 2.2.1 Current State Analysis
Audit existing SCSS variables in the project:

1. Review `src/styles/_variables.scss` for current tokens
2. Document all existing color variables
3. Note typography definitions
4. Record spacing scale currently in use
5. Identify breakpoints

#### 2.2.2 Token Migration Strategy

**Goal:** Map Touril design tokens to SCSS variable structure while maintaining compatibility.

| Touril Token | Type | Current Variable | Recommended New Value | File to Update |
|--------------|------|-------------------|----------------------|-----------------|
| Primary Green | Color | `$color-primary` | `#2D5C3F` (example) | `_variables.scss` |
| Brand Accent Gold | Color | `$color-accent` | `#D4AF37` (example) | `_variables.scss` |
| Display Serif | Font | `$font-family-primary` | `Georgia, serif` | `_variables.scss` |
| Body Sans | Font | `$font-family-secondary` | `Inter, sans-serif` | `_variables.scss` |
| Spacing Base | Scale | `$spacing-unit` | `8px` or `16px` | `_variables.scss` |
| Mobile Breakpoint | Breakpoint | `$breakpoint-mobile` | `768px` | `_variables.scss` |

#### 2.2.3 New Mixins Required

Create mixins in `_mixins.scss` for Touril-specific patterns:

1. **Luxury Card Pattern**
   ```scss
   @mixin luxury-card
     - Subtle shadow
     - Slight border radius
     - Elegant hover lift effect
     - Soft transition timing
   ```

2. **Image Overlay Pattern**
   ```scss
   @mixin image-overlay($color, $opacity)
     - Gradient or solid overlay
     - Positioned absolutely
     - Z-index management
   ```

3. **Elegant Transition**
   ```scss
   @mixin elegant-transition($property, $duration)
     - Smooth cubic-bezier timing
     - Hardware acceleration
   ```

4. **Responsive Hero**
   ```scss
   @mixin responsive-hero
     - Full viewport height/width
     - Background attachment
     - Mobile adjustments
   ```

5. **Gallery Grid System**
   ```scss
   @mixin gallery-grid($columns-desktop, $columns-tablet, $columns-mobile)
     - Responsive column counts
     - Auto gap calculation
     - Aspect ratio maintenance
   ```

6. **Text Elegance**
   ```scss
   @mixin text-elegance($size, $line-height, $letter-spacing)
     - Typography consistency
     - Optical adjustments
   ```

#### 2.2.4 Risk Assessment
- **Design Mismatch Risk:** Touril aesthetic may not perfectly translate
  - **Mitigation:** Create prototype component before full rollout; gather user feedback
- **Breaking Changes Risk:** Updates to `_variables.scss` could affect existing components
  - **Mitigation:** Use feature branch; comprehensive component testing; incremental rollout

---

## 3. Phase 2: CMS Data Modeling & Audit

### 3.1 Current CMS Audit

**Assigned to:** Backend Developer / Full-Stack Developer
**Timeline:** 1-2 days

#### 3.1.1 Config Audit Scope

Analyze `public/admin/config.yml` for:

1. **Collection Inventory**
   - List all collections (pages, posts, settings, etc.)
   - Document collection structure and fields
   - Identify image-related fields
   - Record markdown file locations
   - Note any custom widgets

2. **Image Field Analysis**
   - Count image fields per collection
   - Document widget configuration
   - Check media folder paths
   - Verify image naming conventions
   - Review alt text/caption field requirements

3. **Content Gap Analysis**
   - Identify pages with no images
   - Find empty image array fields
   - Note missing alt text fields
   - Document incomplete content sections

4. **Current Data Population**
   - Review existing markdown files in `public/content/`
   - Document current content completeness
   - Identify placeholder sections
   - Check for broken image references

#### 3.1.2 CMS Audit Report Template

```markdown
# CMS Audit Report

## Collections Overview
### Pages Collection
- Location: public/content/pages/
- Fields: [list with types]
- Image Fields: [count and names]
- Status: [complete/incomplete]

### Quartos Collection
- Location: public/content/quartos/
- Fields: [list with types]
- Image Fields: [count and names]
- Status: [complete/incomplete]

[... repeat for all collections ...]

## Image Field Mapping

| Collection | File | Field Name | Type | Widget Config | Current Value | Status |
|-----------|------|-----------|------|---------------|---------------|--------|
| pages | home.md | hero_image | string | image | empty | ❌ |
| pages | home.md | gallery_images | array | image | [] | ❌ |
| quartos | quarto-1.md | thumbnail | string | image | images/quartos/q1.jpg | ✓ |

## Missing Fields Identified
1. Field name → Required for [purpose]
2. Field name → Required for [purpose]

## Broken Links / Missing Files
- [file path] → Missing image
- [file path] → Invalid reference

## Recommendations
1. Add image_alt_text fields to all image fields
2. Implement image_caption for gallery items
3. Update media folder configuration
4. Create image naming standard documentation
```

### 3.2 Image Field Mapping

**Timeline:** 1-2 days (concurrent with audit)
**Deliverable:** `image-mapping-table.md`

#### 3.2.1 Comprehensive Image Integration Map

This table defines where each scraped image should be placed:

| Priority | Page/Component | Current Placeholder | CMS Collection | CMS Field Name | Source Folder | Recommended Images | Image Count | Status |
|----------|----------------|-------------------|----------------|----------------|----------------|-------------------|-------------|--------|
| 1 | HomePage Hero | None (missing) | pages | hero_image | home/ | home-hero-monte-exterior.jpg | 1 | ❌ |
| 2 | HomePage Gallery Intro | Placeholder text | pages | gallery_images[0-3] | home/ | home-property-view-01.jpg, home-property-view-02.jpg, home-landscape-01.jpg, home-landscape-02.jpg | 4 | ❌ |
| 3 | QuartosPage - Quarto 1 | Stock placeholder | quartos | thumbnail | quartos/ | quartos-master-suite-01.jpg | 1 | ❌ |
| 4 | QuartosPage - Quarto 1 Gallery | None | quartos | gallery_images[0-4] | quartos/ | quartos-master-suite-02.jpg, quartos-master-suite-interior.jpg, quartos-master-suite-bathroom.jpg, quartos-master-suite-view.jpg, quartos-master-suite-details.jpg | 5 | ❌ |
| 5 | QuartosPage - Quarto 2 | Stock placeholder | quartos | thumbnail | quartos/ | quartos-double-01.jpg | 1 | ❌ |
| 6 | QuartosPage - Quarto 2 Gallery | None | quartos | gallery_images[0-4] | quartos/ | quartos-double-02.jpg, quartos-double-interior.jpg, quartos-double-bathroom.jpg, quartos-double-amenities.jpg, quartos-double-view.jpg | 5 | ❌ |
| 7 | QuartosPage - Quarto 3 | Stock placeholder | quartos | thumbnail | quartos/ | quartos-suite-01.jpg | 1 | ❌ |
| 8 | QuartosPage - Quarto 3 Gallery | None | quartos | gallery_images[0-4] | quartos/ | quartos-suite-02.jpg, quartos-suite-interior.jpg, quartos-suite-bathroom.jpg, quartos-suite-amenities.jpg, quartos-suite-details.jpg | 5 | ❌ |
| 9 | AtividadesPage - Activity 1 | Placeholder | atividades | image | atividades/ | atividades-hiking-01.jpg | 1 | ❌ |
| 10 | AtividadesPage - Activity 2 | Placeholder | atividades | image | atividades/ | atividades-wine-tasting-01.jpg | 1 | ❌ |
| 11 | AtividadesPage - Activity 3 | Placeholder | atividades | image | atividades/ | atividades-nature-walk-01.jpg | 1 | ❌ |
| 12 | GaleriaPage - Gallery Grid (Section 1) | Empty | galeria | images[0-9] | galeria/ | galeria-exterior-01.jpg through galeria-exterior-10.jpg | 10 | ❌ |
| 13 | GaleriaPage - Gallery Grid (Section 2) | Empty | galeria | images[10-19] | galeria/ | galeria-interior-01.jpg through galeria-interior-10.jpg | 10 | ❌ |
| 14 | RedondezasPage - Attraction 1 | Placeholder | arredores/ | image | arredores/ | arredores-attraction-01.jpg | 1 | ❌ |
| 15 | RedondezasPage - Attraction 2 | Placeholder | arredores/ | image | arredores/ | arredores-attraction-02.jpg | 1 | ❌ |
| 16 | LocalizacaoPage - Map Hero | None | pages | location_image | localizacao/ | localizacao-map-hero.jpg | 1 | ❌ |
| 17 | LocalizacaoPage - Directions Visual | None | pages | location_directions_image | localizacao/ | localizacao-directions-visual.jpg | 1 | ❌ |
| 18 | Footer Background (Optional) | None | settings | footer_background | home/ | home-landscape-sunset.jpg | 1 | ❌ |

**Total Images to Integrate:** ~65 priority images out of 97 available

#### 3.2.2 Image Categorization (97 Images Available)

```
home/ (15 images)
  ├── hero, exterior views, property overview
  └── Usage: Hero sections, homepage gallery

quartos/ (20 images)
  ├── Master suite, double rooms, single suites
  ├── Interior, bathroom, amenities, views
  └── Usage: Room detail pages

galeria/ (25 images)
  ├── Exterior, interior, landscape, detail shots
  └── Usage: Full-page gallery with filtering

atividades/ (15 images)
  ├── Hiking, wine-tasting, nature activities
  └── Usage: Activity cards with overlays

arredores/ (12 images)
  ├── Local attractions, restaurants, landmarks
  └── Usage: Nearby attractions section

localizacao/ (8 images)
  ├── Map visuals, directions, area overview
  └── Usage: Location/contact page

misc/ (2 images)
  ├── Logos, icons, or special graphics
  └── Usage: As needed
```

### 3.3 CMS Schema Updates

**Timeline:** 1-2 days
**Output:** Updated `public/admin/config.yml` with new image fields

#### 3.3.1 New Image Widget Configuration

For each image field, standardize to:

```yaml
- label: "Image Title"
  name: "image_field_name"
  widget: "image"
  media_library:
    config:
      multiple: false  # or true for arrays
  required: true
  hint: "Recommended size: XxY pixels"

- label: "Image Alt Text"
  name: "image_alt_text"
  widget: "string"
  required: true
  hint: "Describe the image for accessibility and SEO"

- label: "Image Caption"
  name: "image_caption"
  widget: "string"
  required: false
  hint: "Optional caption displayed below the image"
```

#### 3.3.2 Gallery Array Field Configuration

For gallery collections:

```yaml
- label: "Gallery Images"
  name: "gallery_images"
  widget: "list"
  fields:
    - { label: "Image", name: "image", widget: "image" }
    - { label: "Alt Text", name: "alt_text", widget: "string" }
    - { label: "Caption", name: "caption", widget: "string", required: false }
  hint: "Add images in order. Recommended size: XxY pixels"
```

#### 3.3.3 Markdown Frontmatter Structure

All markdown files should follow this structure:

```yaml
---
title: "Page Title"
slug: "page-slug"
date: 2026-02-15
hero_image: "src/assets/images/home/hero-monte-exterior.jpg"
hero_image_alt: "Descriptive alt text"
hero_image_caption: "Optional caption"
gallery_images:
  - image: "src/assets/images/home/property-view-01.jpg"
    alt_text: "Property exterior view from main entrance"
    caption: "Main entrance to Monte da Estrada"
  - image: "src/assets/images/home/property-view-02.jpg"
    alt_text: "Property landscape with surrounding fields"
    caption: "Beautiful landscape surrounding the property"
meta_description: "SEO-friendly description"
---

# Page Content Here
```

---

## 4. Phase 3: SCSS Design System Implementation

### 4.1 Global Variables Update

**File:** `src/styles/_variables.scss`
**Timeline:** 2-3 days
**Task Type:** Heavy-lift SCSS updates

#### 4.1.1 Color Palette Replacement

Replace existing color variables with Touril-inspired palette:

```scss
// ============================================
// COLOR PALETTE
// ============================================

// Primary Brand Colors (Earth Tones & Greens)
$color-primary: #2D5C3F;           // Deep forest green
$color-primary-light: #5A8C6F;     // Lighter sage green
$color-primary-lighter: #8FB8A0;   // Very light sage

// Accent Colors (Luxury Accents)
$color-accent: #D4AF37;             // Gold
$color-accent-dark: #B8860B;        // Dark gold
$color-accent-light: #F4E4C1;       // Warm cream

// Neutral Palette
$color-neutral-white: #F5F3F0;      // Off-white/cream
$color-neutral-light-gray: #E8E6E2; // Light gray
$color-neutral-gray: #D0CCC7;       // Medium gray
$color-neutral-dark-gray: #6B6B6B;  // Dark gray
$color-neutral-black: #1A1A1A;      // Near-black

// Text Colors
$color-text-primary: #1A1A1A;       // Main text
$color-text-secondary: #6B6B6B;     // Secondary text
$color-text-muted: #8B8B8B;         // Muted/placeholder
$color-text-light: #F5F3F0;         // Light text on dark backgrounds

// Semantic Colors
$color-success: #27AE60;
$color-warning: #E67E22;
$color-error: #E74C3C;
$color-info: #3498DB;

// Backgrounds
$color-bg-primary: #FFFFFF;
$color-bg-secondary: #F5F3F0;
$color-bg-tertiary: #EBE7E1;

// Borders
$color-border: #D0CCC7;
$color-border-light: #E8E6E2;
$color-border-dark: #8B8B8B;
```

#### 4.1.2 Typography Variables Update

Replace or enhance typography tokens:

```scss
// ============================================
// TYPOGRAPHY
// ============================================

// Font Families
$font-family-primary: 'Playfair Display', 'Georgia', serif;     // Display/headings
$font-family-secondary: 'Lato', 'Segoe UI', sans-serif;         // Body text
$font-family-mono: 'Courier New', monospace;

// Font Sizes (REM-based for scalability)
$font-size-h1: 3.5rem;      // 56px
$font-size-h2: 2.75rem;     // 44px
$font-size-h3: 2.125rem;    // 34px
$font-size-h4: 1.5rem;      // 24px
$font-size-h5: 1.25rem;     // 20px
$font-size-h6: 1rem;        // 16px

$font-size-body-large: 1.125rem;    // 18px
$font-size-body: 1rem;              // 16px
$font-size-body-small: 0.875rem;    // 14px
$font-size-body-extra-small: 0.75rem; // 12px

$font-size-caption: 0.75rem;        // 12px
$font-size-label: 0.875rem;         // 14px

// Font Weights
$font-weight-light: 300;
$font-weight-regular: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;

// Line Heights
$line-height-tight: 1.2;
$line-height-base: 1.5;
$line-height-relaxed: 1.75;
$line-height-loose: 2;

// Letter Spacing
$letter-spacing-tight: -0.5px;
$letter-spacing-normal: 0;
$letter-spacing-wide: 0.5px;
$letter-spacing-extra-wide: 1px;
```

#### 4.1.3 Spacing System Variables

```scss
// ============================================
// SPACING SYSTEM
// ============================================

// Base spacing unit (8px system)
$spacing-unit: 8px;

// Spacing scale
$spacing-xs: $spacing-unit * 0.5;   // 4px
$spacing-s: $spacing-unit * 1;      // 8px
$spacing-m: $spacing-unit * 2;      // 16px
$spacing-l: $spacing-unit * 3;      // 24px
$spacing-xl: $spacing-unit * 4;     // 32px
$spacing-xxl: $spacing-unit * 5;    // 40px
$spacing-xxxl: $spacing-unit * 6;   // 48px

// Semantic spacing
$margin-section: $spacing-xxxl;
$padding-section: $spacing-xxxl;
$gap-grid: $spacing-l;
$gap-flex: $spacing-m;
```

#### 4.1.4 Visual Effects Variables

```scss
// ============================================
// VISUAL EFFECTS
// ============================================

// Shadows (Luxury aesthetic - subtle)
$shadow-subtle: 0 1px 3px rgba(26, 26, 26, 0.08);
$shadow-medium: 0 4px 12px rgba(26, 26, 26, 0.12);
$shadow-strong: 0 12px 32px rgba(26, 26, 26, 0.16);
$shadow-hover: 0 8px 24px rgba(26, 26, 26, 0.15);

// Border Radius
$border-radius-sharp: 0px;
$border-radius-slight: 4px;
$border-radius-rounded: 8px;
$border-radius-full: 50%;

// Transitions
$transition-timing-slow: cubic-bezier(0.4, 0, 0.2, 1);      // Material Motion
$transition-timing-normal: cubic-bezier(0.4, 0, 0.6, 1);    // Ease in-out
$transition-timing-fast: cubic-bezier(0.4, 0, 1, 1);        // Ease out

$transition-duration-quick: 150ms;
$transition-duration-normal: 300ms;
$transition-duration-slow: 500ms;

// Opacity
$opacity-hover: 0.85;
$opacity-disabled: 0.5;
$opacity-overlay: 0.7;
```

#### 4.1.5 Responsive Breakpoints

```scss
// ============================================
// RESPONSIVE BREAKPOINTS
// ============================================

$breakpoint-mobile: 480px;
$breakpoint-tablet: 768px;
$breakpoint-desktop: 1024px;
$breakpoint-desktop-wide: 1440px;

// Container widths
$container-mobile: 100%;
$container-tablet: 90%;
$container-desktop: 1200px;
$container-desktop-wide: 1320px;
```

### 4.2 Mixins Library Enhancement

**File:** `src/styles/_mixins.scss`
**Timeline:** 2-3 days
**Task Type:** Heavy-lift SCSS updates

#### 4.2.1 New Mixins to Create

```scss
// ============================================
// LUXURY COMPONENT MIXINS
// ============================================

/**
 * Luxury Card Pattern
 * Applies premium card styling with subtle shadow and elegant hover
 */
@mixin luxury-card {
  background-color: $color-bg-primary;
  border: 1px solid $color-border-light;
  border-radius: $border-radius-slight;
  box-shadow: $shadow-subtle;
  transition: all $transition-duration-normal $transition-timing-normal;

  &:hover {
    box-shadow: $shadow-hover;
    transform: translateY(-2px);
  }

  &:focus-within {
    box-shadow: $shadow-medium;
    outline: 2px solid $color-primary;
  }
}

/**
 * Image Overlay Pattern
 * Creates elegant gradient overlay for images
 * @param {Color} $color - Overlay color
 * @param {Number} $opacity - Overlay opacity (0-1)
 * @param {String} $direction - Gradient direction (to bottom, to right, etc.)
 */
@mixin image-overlay($color: $color-primary, $opacity: 0.5, $direction: 'to bottom') {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      unquote($direction),
      rgba($color, $opacity),
      rgba($color, 0)
    );
    z-index: 1;
    pointer-events: none;
  }
}

/**
 * Elegant Transition
 * Smooth, sophisticated animation with proper easing
 * @param {String} $property - CSS property to animate
 * @param {Number} $duration - Animation duration in ms
 */
@mixin elegant-transition($property: 'all', $duration: $transition-duration-normal) {
  transition: $property $duration $transition-timing-normal;
  will-change: $property;
}

/**
 * Responsive Hero Section
 * Full-bleed hero with responsive behavior
 */
@mixin responsive-hero {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 400px;
  max-height: 800px;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  overflow: hidden;

  @media (max-width: $breakpoint-tablet) {
    height: auto;
    min-height: 50vh;
    background-attachment: scroll;
  }

  @media (max-width: $breakpoint-mobile) {
    min-height: 40vh;
  }
}

/**
 * Gallery Grid System
 * Responsive grid layout for image galleries
 * @param {Number} $cols-desktop - Columns on desktop
 * @param {Number} $cols-tablet - Columns on tablet
 * @param {Number} $cols-mobile - Columns on mobile
 */
@mixin gallery-grid($cols-desktop: 3, $cols-tablet: 2, $cols-mobile: 1) {
  display: grid;
  grid-template-columns: repeat($cols-desktop, 1fr);
  gap: $gap-grid;
  width: 100%;

  @media (max-width: $breakpoint-desktop) {
    grid-template-columns: repeat($cols-tablet, 1fr);
    gap: $gap-grid * 0.75;
  }

  @media (max-width: $breakpoint-tablet) {
    grid-template-columns: repeat($cols-mobile, 1fr);
    gap: $gap-grid * 0.5;
  }
}

/**
 * Image Aspect Ratio Container
 * Maintains consistent aspect ratio for responsive images
 * @param {Number} $ratio - Aspect ratio (width/height)
 */
@mixin aspect-ratio($ratio) {
  position: relative;
  padding-bottom: (1 / $ratio) * 100%;

  > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

/**
 * Text Elegance
 * Applies sophisticated typography with optical adjustments
 * @param {Number} $size - Font size
 * @param {Number} $line-height - Line height
 * @param {Number} $letter-spacing - Letter spacing
 * @param {String} $font-family - Font family
 */
@mixin text-elegance(
  $size: $font-size-body,
  $line-height: $line-height-base,
  $letter-spacing: $letter-spacing-normal,
  $font-family: $font-family-secondary
) {
  font-family: $font-family;
  font-size: $size;
  line-height: $line-height;
  letter-spacing: $letter-spacing;
  color: $color-text-primary;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/**
 * Flex Center
 * Centers content both horizontally and vertically
 */
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/**
 * Container Padding
 * Responsive container with proper padding
 */
@mixin container-padding {
  padding: 0 $spacing-m;

  @media (min-width: $breakpoint-tablet) {
    padding: 0 $spacing-l;
  }

  @media (min-width: $breakpoint-desktop) {
    padding: 0 $spacing-xl;
  }
}

/**
 * Focus States for Accessibility
 * Visible focus ring for keyboard navigation
 */
@mixin focus-ring {
  &:focus,
  &:focus-visible {
    outline: 2px solid $color-primary;
    outline-offset: 2px;
  }
}

/**
 * Hidden (Visually) but Accessible
 * Hide element from visual but keep for screen readers
 */
@mixin sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/**
 * Responsive Typography
 * Scales font size based on viewport
 * @param {Number} $mobile - Font size on mobile
 * @param {Number} $desktop - Font size on desktop
 */
@mixin responsive-font($mobile, $desktop) {
  font-size: $mobile;

  @media (min-width: $breakpoint-desktop) {
    font-size: $desktop;
  }
}
```

### 4.3 Component-Level SCSS Updates

**Timeline:** 2-3 days
**Task Type:** Heavy-lift SCSS updates across all components

#### 4.3.1 Components Requiring Updates

Each component listed below needs its `.module.scss` file updated to use new variables and mixins:

| Component | File | Updates Required | Priority |
|-----------|------|-----------------|----------|
| HomePage | `src/pages/HomePage/HomePage.module.scss` | Hero section with new overlay; gallery grid with luxury cards; spacing updates | 1 |
| Hero | `src/components/Hero/Hero.module.scss` | Responsive hero mixin; image overlay; text styling | 1 |
| NavBar | `src/components/NavBar/NavBar.module.scss` | Color scheme; spacing; hover states; mobile menu | 2 |
| Footer | `src/components/Footer/Footer.module.scss` | Background color; text colors; layout; spacing | 2 |
| QuartosPage | `src/pages/QuartosPage/QuartosPage.module.scss` | Room card styling; gallery grid; image galleries | 1 |
| GaleriaPage | `src/pages/GaleriaPage/GaleriaPage.module.scss` | Full-page gallery grid; masonry layout; lightbox container | 1 |
| AtividadesPage | `src/pages/AtividadesPage/AtividadesPage.module.scss` | Activity cards; image overlays; spacing | 2 |
| RedondezasPage | `src/pages/RedondezasPage/RedondezasPage.module.scss` | Attraction cards; layout; spacing | 2 |
| LocalizacaoPage | `src/pages/LocalizacaoPage/LocalizacaoPage.module.scss` | Map section; directions layout; spacing | 2 |
| App Container | `src/App.css` | Global container width; padding; background | 1 |
| Global | `src/index.css` | Font imports; base styles; reset | 1 |
| Global SCSS | `src/styles/global.scss` | All base styles; resets; typography defaults | 1 |

#### 4.3.2 Example Component Update: HomePage.module.scss

Before → After pattern:

```scss
/* BEFORE: Hardcoded values */
.hero {
  background-color: #333;
  padding: 40px;
  margin: 0 20px;
}

.heroTitle {
  color: #fff;
  font-size: 48px;
  margin-bottom: 20px;
}

/* AFTER: Using design system */
.hero {
  @include responsive-hero;
  @include image-overlay($color-primary, 0.6);
  background-image: url('../../assets/images/home/hero-monte-exterior.jpg');

  @media (max-width: $breakpoint-tablet) {
    padding: $spacing-l;
  }
}

.heroContent {
  position: relative;
  z-index: 2;
  @include flex-center;
  flex-direction: column;
  height: 100%;
  @include container-padding;
  text-align: center;
}

.heroTitle {
  @include text-elegance(
    $font-size-h1,
    $line-height-tight,
    $letter-spacing-wide,
    $font-family-primary
  );
  color: $color-text-light;
  margin-bottom: $spacing-l;
  font-weight: $font-weight-semibold;

  @media (max-width: $breakpoint-tablet) {
    @include responsive-font($font-size-h3, $font-size-h1);
  }
}

.heroSubtitle {
  @include text-elegance(
    $font-size-body-large,
    $line-height-relaxed,
    $letter-spacing-normal,
    $font-family-secondary
  );
  color: $color-accent-light;
  font-weight: $font-weight-light;
  margin-bottom: $spacing-l;
}
```

---

## 5. Phase 4: Frontend Component Updates

### 5.1 Image Integration Strategy

**Assigned to:** Frontend Developer
**Timeline:** 3-4 days
**Approach:** Component-by-component image data integration

#### 5.1.1 Image Import Organization

Create barrel files for each image category in `src/assets/images/`:

**File:** `src/assets/images/home/index.js`
```javascript
export const homeImages = {
  hero: {
    main: new URL('./home-hero-monte-exterior.jpg', import.meta.url).href,
    alt: 'Monte da Estrada main exterior view'
  },
  gallery: [
    {
      src: new URL('./home-property-view-01.jpg', import.meta.url).href,
      alt: 'Property exterior view from main entrance',
      title: 'Main entrance to Monte da Estrada'
    },
    {
      src: new URL('./home-property-view-02.jpg', import.meta.url).href,
      alt: 'Property landscape with surrounding fields',
      title: 'Beautiful landscape surrounding the property'
    },
    // ... more images
  ]
};

export default homeImages;
```

Repeat for each image category:
- `src/assets/images/quartos/index.js`
- `src/assets/images/galeria/index.js`
- `src/assets/images/atividades/index.js`
- `src/assets/images/arredores/index.js`
- `src/assets/images/localizacao/index.js`

#### 5.1.2 React Component Integration

Update React components to consume image data from CMS or local imports:

**Pattern 1: Using CMS data (Decap/Markdown)**
```javascript
import { useState, useEffect } from 'react';
import styles from './HomePage.module.scss';

export const HomePage = ({ frontmatter }) => {
  // frontmatter contains hero_image, gallery_images from markdown
  const [images, setImages] = useState(frontmatter);

  return (
    <div className={styles.container}>
      <section className={styles.hero} style={{
        backgroundImage: `url('${images.hero_image}')`
      }}>
        <img
          src={images.hero_image}
          alt={images.hero_image_alt}
          className={styles.heroImage}
        />
      </section>

      <section className={styles.gallery}>
        <div className={styles.galleryGrid}>
          {images.gallery_images?.map((item, idx) => (
            <div key={idx} className={styles.galleryCard}>
              <img
                src={item.image}
                alt={item.alt_text}
                loading="lazy"
              />
              {item.caption && <p>{item.caption}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
```

**Pattern 2: Using local imports with fallback**
```javascript
import styles from './HomePage.module.scss';
import homeImages from '@/assets/images/home';

export const HomePage = ({ frontmatter = {} }) => {
  const heroImage = frontmatter.hero_image || homeImages.hero.main;
  const galleryImages = frontmatter.gallery_images || homeImages.gallery;

  return (
    <div className={styles.container}>
      <section className={styles.hero} style={{
        backgroundImage: `url('${heroImage}')`
      }}>
        <img
          src={heroImage}
          alt={frontmatter.hero_image_alt || homeImages.hero.alt}
          className={styles.heroImage}
        />
      </section>

      <section className={styles.gallery}>
        <div className={styles.galleryGrid}>
          {galleryImages.map((item, idx) => (
            <div key={idx} className={styles.galleryCard}>
              <img
                src={item.src || item.image}
                alt={item.alt || item.alt_text || 'Gallery image'}
                loading="lazy"
                decoding="async"
              />
              {(item.title || item.caption) && (
                <p className={styles.caption}>{item.title || item.caption}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
```

#### 5.1.3 Responsive Image Implementation

Use picture element and srcset for optimal performance:

```javascript
/**
 * ResponsiveImage component for optimal image delivery
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text (required for accessibility)
 * @param {string} srcset - Optional srcset for responsive images
 * @param {string} sizes - Optional sizes attribute for responsive loading
 * @param {string} className - Optional CSS class
 * @param {boolean} lazy - Enable lazy loading (default: true)
 */
export const ResponsiveImage = ({
  src,
  alt,
  srcset,
  sizes,
  className,
  lazy = true
}) => {
  return (
    <img
      src={src}
      alt={alt}
      srcSet={srcset}
      sizes={sizes}
      className={className}
      loading={lazy ? 'lazy' : 'eager'}
      decoding="async"
    />
  );
};
```

#### 5.1.4 Image Lazy Loading & Performance

```javascript
// Implement intersection observer for enhanced lazy loading
export const useImageLazyLoad = (ref) => {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px'
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
};
```

### 5.2 Component Update Checklist

For each page component, systematically update:

#### 5.2.1 HomePage Update Checklist
- [ ] Replace hero background with `home-hero-monte-exterior.jpg`
- [ ] Update hero overlay using `image-overlay` mixin
- [ ] Populate gallery with home images array (4-6 images)
- [ ] Apply luxury card styling to gallery items
- [ ] Test responsive behavior on mobile/tablet/desktop
- [ ] Verify all images have descriptive alt text
- [ ] Implement lazy loading for below-fold images
- [ ] Update component tests with new image data

#### 5.2.2 QuartosPage Update Checklist
- [ ] Replace room thumbnails with actual room images
- [ ] Create room detail galleries (5-6 images per room)
- [ ] Implement image carousel/lightbox for room galleries
- [ ] Apply luxury card styling to room cards
- [ ] Add responsive image srcsets
- [ ] Test on all breakpoints
- [ ] Update accessibility attributes
- [ ] Add alt text and captions to all images

#### 5.2.3 GaleriaPage Update Checklist
- [ ] Implement gallery grid with responsive columns (3-2-1)
- [ ] Populate with all galeria/ images (25 images)
- [ ] Add masonry layout option (CSS Grid with auto-fit)
- [ ] Create lightbox modal for full-size viewing
- [ ] Add smooth hover effects
- [ ] Implement image preloading for smooth interaction
- [ ] Test performance with 25+ images
- [ ] Add filtering/categorization if needed

#### 5.2.4 AtividadesPage Update Checklist
- [ ] Replace activity placeholders with actual images
- [ ] Apply image overlay to activity cards
- [ ] Update card layout with new color scheme
- [ ] Add hover effects on images
- [ ] Ensure text readability over images
- [ ] Test on mobile (text should be readable)
- [ ] Update activity card components with new styling

#### 5.2.5 RedondezasPage Update Checklist
- [ ] Populate nearby attractions with images
- [ ] Create attraction cards with image + info
- [ ] Apply luxury card styling
- [ ] Implement responsive layout
- [ ] Add hover effects
- [ ] Test mobile experience

#### 5.2.6 LocalizacaoPage Update Checklist
- [ ] Add location hero image
- [ ] Replace map placeholder if applicable
- [ ] Update contact section styling
- [ ] Apply new color scheme
- [ ] Ensure form inputs match design system
- [ ] Test form accessibility

### 5.3 Hero Section Overhaul

**Key Updates:**

1. **Full-bleed Background**
   ```scss
   .hero {
     @include responsive-hero;
     @include image-overlay($color-primary, 0.6);
     background-image: url('path/to/hero-image.jpg');
     background-size: cover;
     background-position: center;
   }
   ```

2. **Elegant Typography Treatment**
   ```scss
   .heroTitle {
     @include text-elegance(
       $font-size-h1,
       $line-height-tight,
       $letter-spacing-wide,
       $font-family-primary
     );
     color: $color-text-light;
     text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
   }
   ```

3. **Smooth Scroll Transitions**
   ```scss
   .heroContent {
     animation: fadeInUp 0.8s $transition-timing-slow;
   }

   @keyframes fadeInUp {
     from {
       opacity: 0;
       transform: translateY(30px);
     }
     to {
       opacity: 1;
       transform: translateY(0);
     }
   }
   ```

### 5.4 Gallery Component Enhancement

**Implementation approach:**

1. **Responsive Grid Layout**
   ```scss
   .galleryGrid {
     @include gallery-grid($cols-desktop: 3, $cols-tablet: 2, $cols-mobile: 1);
   }

   .galleryCard {
     @include luxury-card;
     overflow: hidden;
     aspect-ratio: 1 / 1;

     img {
       width: 100%;
       height: 100%;
       object-fit: cover;
       @include elegant-transition('transform', 300ms);
     }

     &:hover img {
       transform: scale(1.05);
     }
   }
   ```

2. **Lightbox Modal Implementation**
   ```javascript
   const [selectedImage, setSelectedImage] = useState(null);
   const [isModalOpen, setIsModalOpen] = useState(false);

   const openLightbox = (image) => {
     setSelectedImage(image);
     setIsModalOpen(true);
   };

   const closeLightbox = () => {
     setIsModalOpen(false);
   };

   // Render modal with selected image
   ```

3. **Keyboard Navigation**
   ```javascript
   useEffect(() => {
     const handleKeyPress = (e) => {
       if (e.key === 'Escape') closeLightbox();
       if (e.key === 'ArrowLeft') previousImage();
       if (e.key === 'ArrowRight') nextImage();
     };

     window.addEventListener('keydown', handleKeyPress);
     return () => window.removeEventListener('keydown', handleKeyPress);
   }, [isModalOpen]);
   ```

---

## 6. Phase 5: CMS Integration & Content Population

### 6.1 Markdown File Updates

**Timeline:** 2-3 days
**Location:** `public/content/`

#### 6.1.1 Homepage Markdown Structure

**File:** `public/content/pages/home.md`

```yaml
---
title: "Monte da Estrada - Luxurious Rural Accommodation"
slug: "home"
date: 2026-02-15
hero_image: "src/assets/images/home/home-hero-monte-exterior.jpg"
hero_image_alt: "Monte da Estrada main exterior view with surrounding landscape"
hero_image_caption: "Welcome to Monte da Estrada"
gallery_images:
  - image: "src/assets/images/home/home-property-view-01.jpg"
    alt_text: "Property exterior view from main entrance showing traditional architecture"
    caption: "Main entrance to Monte da Estrada"
  - image: "src/assets/images/home/home-property-view-02.jpg"
    alt_text: "Beautiful landscape with green fields surrounding the property"
    caption: "Surrounded by pristine natural landscape"
  - image: "src/assets/images/home/home-landscape-01.jpg"
    alt_text: "Panoramic landscape view from the property"
    caption: "Panoramic views of the countryside"
  - image: "src/assets/images/home/home-landscape-02.jpg"
    alt_text: "Sunset view over the surrounding fields"
    caption: "Golden hour at Monte da Estrada"
meta_description: "Discover the luxury of Monte da Estrada, a boutique rural accommodation in Portugal offering unforgettable countryside experiences."
seo_keywords: "luxury accommodation, Portugal, rural retreat, boutique hotel"
---

# Welcome to Monte da Estrada

Experience the pinnacle of Portuguese countryside luxury. Our carefully curated accommodations and personalized service ensure an unforgettable stay.

## Our Story

[Content about the property...]

## What Awaits You

[Content about amenities, services, activities...]
```

#### 6.1.2 Quartos Markdown Structure

**File:** `public/content/quartos/quarto-master-suite.md`

```yaml
---
title: "Master Suite"
slug: "master-suite"
date: 2026-02-15
description: "Luxurious master suite with en-suite bathroom and panoramic countryside views"
thumbnail: "src/assets/images/quartos/quartos-master-suite-01.jpg"
thumbnail_alt: "Master suite bedroom with luxury bedding and traditional decor"
gallery_images:
  - image: "src/assets/images/quartos/quartos-master-suite-02.jpg"
    alt_text: "Master suite main room with king bed and seating area"
    caption: "Master bedroom"
  - image: "src/assets/images/quartos/quartos-master-suite-interior.jpg"
    alt_text: "Interior detail showing elegant furnishings"
    caption: "Elegant furnishings"
  - image: "src/assets/images/quartos/quartos-master-suite-bathroom.jpg"
    alt_text: "Luxurious en-suite bathroom with soaking tub"
    caption: "Spa-like bathroom"
  - image: "src/assets/images/quartos/quartos-master-suite-view.jpg"
    alt_text: "View from the room overlooking countryside"
    caption: "Room view"
  - image: "src/assets/images/quartos/quartos-master-suite-details.jpg"
    alt_text: "Detail shot of room amenities and decor"
    caption: "Thoughtful details"
price: 150
capacity: 2
amenities:
  - King bed
  - En-suite bathroom
  - Countryside view
  - WiFi
  - Premium linens
meta_description: "Luxury master suite at Monte da Estrada with panoramic views and premium amenities."
---

# Master Suite

The pinnacle of our accommodation offerings, the Master Suite provides an unparalleled countryside retreat...
```

#### 6.1.3 Galeria Markdown Structure

**File:** `public/content/galeria/index.md`

```yaml
---
title: "Gallery"
slug: "galeria"
date: 2026-02-15
gallery_images:
  - image: "src/assets/images/galeria/galeria-exterior-01.jpg"
    alt_text: "Property exterior showing traditional Portuguese architecture"
    caption: "Main building exterior"
  - image: "src/assets/images/galeria/galeria-exterior-02.jpg"
    alt_text: "Courtyard area with seating"
    caption: "Courtyard"
  - image: "src/assets/images/galeria/galeria-exterior-03.jpg"
    alt_text: "Garden area with landscaping"
    caption: "Gardens"
  # ... 22 more images ...
meta_description: "Explore the visual beauty of Monte da Estrada through our gallery of interior and exterior photography."
---

# Gallery

Discover the beauty of Monte da Estrada through our curated collection of photography.
```

#### 6.1.4 Atividades Markdown Structure

**File:** `public/content/atividades/index.md`

```yaml
---
title: "Activities & Experiences"
slug: "atividades"
date: 2026-02-15
activities:
  - title: "Hiking Tours"
    description: "Guided hiking through scenic countryside trails"
    image: "src/assets/images/atividades/atividades-hiking-01.jpg"
    image_alt: "Group hiking through green countryside trails"
  - title: "Wine Tasting"
    description: "Discover local wines at nearby vineyards"
    image: "src/assets/images/atividades/atividades-wine-tasting-01.jpg"
    image_alt: "Wine tasting setup with local Portuguese wines"
  - title: "Nature Walks"
    description: "Peaceful walks through natural landscapes"
    image: "src/assets/images/atividades/atividades-nature-walk-01.jpg"
    image_alt: "Scenic nature walk path with wildflowers"
meta_description: "Experience authentic Portuguese countryside activities at Monte da Estrada."
---

# Activities & Experiences

Enrich your stay with our curated selection of countryside experiences...
```

### 6.2 CMS Widget Configuration

**File:** `public/admin/config.yml`

#### 6.2.1 Image Widget Configuration Pattern

Update Decap CMS config to properly handle image uploads:

```yaml
collections:
  - name: "pages"
    label: "Pages"
    folder: "public/content/pages"
    create: true
    fields:
      - { label: "Title", name: "title", widget: "string", required: true }
      - { label: "Slug", name: "slug", widget: "string", required: true }
      - { label: "Date", name: "date", widget: "datetime", required: true }

      # Hero Image
      - label: "Hero Image"
        name: "hero_image"
        widget: "image"
        media_library:
          config:
            multiple: false
        required: true
        hint: "Recommended size: 1920x1080px (16:9 aspect ratio)"

      - label: "Hero Image Alt Text"
        name: "hero_image_alt"
        widget: "string"
        required: true
        hint: "Describe the image for accessibility"

      - label: "Hero Image Caption"
        name: "hero_image_caption"
        widget: "string"
        required: false

      # Gallery Images
      - label: "Gallery Images"
        name: "gallery_images"
        widget: "list"
        required: false
        fields:
          - label: "Image"
            name: "image"
            widget: "image"
            media_library:
              config:
                multiple: false
            required: true
            hint: "Recommended size: 1200x800px (3:2 aspect ratio)"

          - label: "Alt Text"
            name: "alt_text"
            widget: "string"
            required: true

          - label: "Caption"
            name: "caption"
            widget: "string"
            required: false

      - { label: "Meta Description", name: "meta_description", widget: "text" }
      - { label: "Content", name: "body", widget: "markdown" }

  - name: "quartos"
    label: "Quartos (Rooms)"
    folder: "public/content/quartos"
    create: true
    fields:
      - { label: "Title", name: "title", widget: "string", required: true }
      - { label: "Description", name: "description", widget: "text", required: true }
      - { label: "Price", name: "price", widget: "number", required: true }
      - { label: "Capacity", name: "capacity", widget: "number", required: true }

      # Thumbnail
      - label: "Thumbnail Image"
        name: "thumbnail"
        widget: "image"
        media_library:
          config:
            multiple: false
        required: true

      - label: "Thumbnail Alt Text"
        name: "thumbnail_alt"
        widget: "string"
        required: true

      # Gallery
      - label: "Room Gallery"
        name: "gallery_images"
        widget: "list"
        required: false
        fields:
          - label: "Image"
            name: "image"
            widget: "image"
            required: true

          - label: "Alt Text"
            name: "alt_text"
            widget: "string"
            required: true

          - label: "Caption"
            name: "caption"
            widget: "string"
            required: false

      - label: "Amenities"
        name: "amenities"
        widget: "list"
        field: { label: "Amenity", name: "amenity", widget: "string" }

      - { label: "Content", name: "body", widget: "markdown" }

  - name: "galeria"
    label: "Gallery"
    folder: "public/content/galeria"
    files:
      - name: "index"
        label: "Gallery Images"
        file: "public/content/galeria/index.md"
        fields:
          - { label: "Title", name: "title", widget: "string" }
          - label: "Gallery Images"
            name: "gallery_images"
            widget: "list"
            fields:
              - label: "Image"
                name: "image"
                widget: "image"
                required: true

              - label: "Alt Text"
                name: "alt_text"
                widget: "string"
                required: true

              - label: "Caption"
                name: "caption"
                widget: "string"
                required: false
```

#### 6.2.2 Media Library Configuration

```yaml
# At top level of config.yml
media_folder: "public/uploads"
public_path: "/uploads"

# Alternative: Use nested folder structure
media_folder: "public/assets/images"
public_path: "/assets/images"

# Configure default branch
backend:
  name: git-gateway
  branch: main
  repo: [your-repo-owner]/[your-repo-name]
  base_url: https://your-netlify-site.netlify.app
```

### 6.3 Asset Organization & Validation

**Timeline:** 1-2 days

#### 6.3.1 Image Organization Verification

Verify all 97 images are properly organized:

```
src/assets/images/
├── home/                 (15 images)
│   ├── home-hero-monte-exterior.jpg
│   ├── home-property-view-01.jpg
│   ├── home-property-view-02.jpg
│   ├── home-landscape-01.jpg
│   ├── home-landscape-02.jpg
│   └── ... (10 more)
│
├── quartos/             (20 images)
│   ├── quartos-master-suite-01.jpg
│   ├── quartos-master-suite-02.jpg
│   ├── quartos-master-suite-interior.jpg
│   ├── quartos-master-suite-bathroom.jpg
│   ├── quartos-master-suite-view.jpg
│   ├── quartos-master-suite-details.jpg
│   └── ... (14 more)
│
├── galeria/             (25 images)
│   ├── galeria-exterior-01.jpg
│   ├── galeria-exterior-02.jpg
│   ├── galeria-interior-01.jpg
│   └── ... (22 more)
│
├── atividades/          (15 images)
│   ├── atividades-hiking-01.jpg
│   ├── atividades-wine-tasting-01.jpg
│   ├── atividades-nature-walk-01.jpg
│   └── ... (12 more)
│
├── arredores/           (12 images)
│   ├── arredores-attraction-01.jpg
│   └── ... (11 more)
│
├── localizacao/         (8 images)
│   ├── localizacao-map-hero.jpg
│   └── ... (7 more)
│
├── misc/                (2 images)
│   └── ... (logos, icons)
│
└── index.js            (barrel file with all imports)
```

#### 6.3.2 Image Manifest File

Create `src/assets/images/IMAGE-MANIFEST.md` for future reference:

```markdown
# Image Manifest - Monte da Estrada

## Overview
Total images: 97
Organized in: 7 categories
Format: JPEG (optimized)
Aspect ratios: Mixed (16:9, 4:3, 1:1)

## Categories

### home/ (15 images)
Hero and general property images for homepage

| Filename | Aspect | Usage | Status |
|----------|--------|-------|--------|
| home-hero-monte-exterior.jpg | 16:9 | Hero background | ✓ |
| home-property-view-01.jpg | 3:2 | Gallery card | ✓ |
| ... | ... | ... | ... |

### quartos/ (20 images)
Room photography organized by room type

| Filename | Room | Category | Status |
|----------|------|----------|--------|
| quartos-master-suite-01.jpg | Master Suite | Bedroom | ✓ |
| ... | ... | ... | ... |

### galeria/ (25 images)
Full-page gallery images

### atividades/ (15 images)
Activity and experience photography

### arredores/ (12 images)
Nearby attractions and surroundings

### localizacao/ (8 images)
Location, maps, and area information

### misc/ (2 images)
Logos, icons, special graphics

## Image Naming Convention
- Format: `category-description-number.jpg`
- Example: `home-hero-monte-exterior.jpg`
- Use kebab-case for multi-word descriptions
- Include aspect ratio in optimization notes if needed
```

---

## 7. Phase 6: Modular Architecture for Future Integration

### 7.1 Header/Footer Modularity

**Objective:** Extract header and footer components as standalone modules for potential parent site integration.

#### 7.1.1 Header Component Interface

**File:** `src/components/Header/Header.jsx`

```javascript
/**
 * Header Component
 * Standalone header with flexible navigation and branding
 *
 * @component
 * @param {Object} props
 * @param {string} props.logo - Logo image URL or component
 * @param {string} props.brandName - Brand name text
 * @param {Array<Object>} props.navigationItems - Navigation menu items
 * @param {boolean} props.sticky - Enable sticky positioning
 * @param {Function} props.onContactClick - Callback for contact button
 * @returns {JSX.Element}
 *
 * @example
 * const navItems = [
 *   { label: 'Home', href: '/' },
 *   { label: 'Rooms', href: '/quartos' },
 *   { label: 'Activities', href: '/atividades' }
 * ];
 *
 * <Header
 *   logo={logoUrl}
 *   brandName="Monte da Estrada"
 *   navigationItems={navItems}
 *   sticky={true}
 * />
 */
export const Header = ({
  logo,
  brandName,
  navigationItems = [],
  sticky = true,
  onContactClick
}) => {
  // Implementation...
};
```

**Props Documentation:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| logo | string \| JSX | false | Logo URL or custom logo component |
| brandName | string | true | Brand/property name |
| navigationItems | Array | true | Navigation menu items with label and href |
| sticky | boolean | false | Stick header to top on scroll |
| onContactClick | Function | false | Callback when contact/CTA is clicked |

#### 7.1.2 Footer Component Interface

**File:** `src/components/Footer/Footer.jsx`

```javascript
/**
 * Footer Component
 * Standalone footer with links, contact info, and social media
 *
 * @component
 * @param {Object} props
 * @param {string} props.companyName - Property/company name
 * @param {string} props.address - Physical address
 * @param {string} props.phone - Contact phone
 * @param {string} props.email - Contact email
 * @param {Array<Object>} props.footerLinks - Footer link sections
 * @param {Array<Object>} props.socialLinks - Social media links
 * @returns {JSX.Element}
 */
export const Footer = ({
  companyName,
  address,
  phone,
  email,
  footerLinks = [],
  socialLinks = []
}) => {
  // Implementation...
};
```

#### 7.1.3 Integration Guide

Create `COMPONENT-INTEGRATION.md`:

```markdown
# Component Integration Guide

## Standalone Components

### Header
Export location: `src/components/Header/index.js`

#### Import
```javascript
import { Header } from 'monte-da-estrada/components/Header';
```

#### Usage
```javascript
import { Header } from 'monte-da-estrada/components/Header';

const parentComponent = () => (
  <Header
    brandName="Monte da Estrada"
    navigationItems={[
      { label: 'Home', href: '/' },
      { label: 'Book', href: '/booking' }
    ]}
    sticky={true}
  />
);
```

### Footer
Export location: `src/components/Footer/index.js`

#### Import & Usage
[Similar to Header]

## Styling Integration
Components use SCSS modules with CSS-in-JS encapsulation.
Global SCSS variables are imported via `_variables.scss`.

To customize styling:
1. Override SCSS variables before component import
2. Use CSS variables (custom properties) for theming
3. Pass className prop for additional styling

## Communication & Events
Components emit custom events for parent site integration:
- `contact:click` - When contact/CTA is clicked
- `navigation:navigate` - When navigation item is clicked
- `modal:open` - When modal or dialog opens
- `modal:close` - When modal or dialog closes
```

### 7.2 Routing Flexibility

**Objective:** Ensure React Router can handle sub-path mounting.

#### 7.2.1 Router Configuration

**File:** `src/App.jsx` - Update to support custom base path:

```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/**
 * App component with flexible routing
 * Supports custom base paths for parent site integration
 */
export const App = ({ basePath = '/' }) => {
  return (
    <Router basename={basePath}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quartos" element={<QuartosPage />} />
        <Route path="/atividades" element={<AtividadesPage />} />
        <Route path="/galeria" element={<GaleriaPage />} />
        <Route path="/arredores" element={<RedondezasPage />} />
        <Route path="/localizacao" element={<LocalizacaoPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
```

#### 7.2.2 Environment Configuration

Create `.env.example`:

```env
VITE_APP_BASE_PATH=/
VITE_API_BASE_URL=https://api.montedaestrada.com
VITE_CMS_REPO=your-netlify-cms-repo
VITE_ENABLE_ADMIN=true
```

#### 7.2.3 Integration Instructions

Create `ROUTING-INTEGRATION.md`:

```markdown
# Routing Integration Guide

## Custom Base Path
To mount Monte da Estrada at a sub-path (e.g., `/properties/monte-da-estrada`):

### 1. Set Environment Variable
```bash
VITE_APP_BASE_PATH=/properties/monte-da-estrada/
```

### 2. Update App Component
```javascript
import { App } from 'monte-da-estrada/App';

<App basePath="/properties/monte-da-estrada/" />
```

### 3. Update Links in Parent Site
All internal links will automatically adjust to the base path.

External links should reference the full path:
```javascript
// Correct
<a href="/properties/monte-da-estrada/quartos">Rooms</a>

// Automatic (Router handles)
<Link to="/quartos">Rooms</Link>
```

## URL Structure
- Homepage: `{baseUrl}/`
- Rooms: `{baseUrl}/quartos`
- Activities: `{baseUrl}/atividades`
- Gallery: `{baseUrl}/galeria`
- Surroundings: `{baseUrl}/arredores`
- Location: `{baseUrl}/localizacao`
```

### 7.3 Style Isolation & CSS Modules

**Objective:** Verify SCSS modules prevent style leakage into parent site.

#### 7.3.1 Style Isolation Verification

Create test file: `src/__tests__/style-isolation.test.js`

```javascript
import { render } from '@testing-library/react';
import { App } from '@/App';

describe('Style Isolation', () => {
  it('should not leak global styles outside component tree', () => {
    const { container } = render(<App />);

    // Verify CSS Modules are scoped
    const stylesheets = Array.from(document.styleSheets);
    stylesheets.forEach(sheet => {
      // Each rule should have component-specific selectors
      expect(sheet.href).toMatch(/\.module\.scss/) ||
        expect(sheet.href).toMatch(/styles/);
    });
  });

  it('should not pollute global class names', () => {
    const beforeClasses = document.body.className;
    render(<App />);
    const afterClasses = document.body.className;

    expect(beforeClasses).toBe(afterClasses);
  });
});
```

#### 7.3.2 Global CSS Dependencies

Create `STYLE-DEPENDENCIES.md`:

```markdown
# Global Style Dependencies

## Required Global Styles
The following styles must be available in the parent site:

### Font Imports
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;500;600&display=swap');
```

### CSS Variables (Optional - for theme customization)
```css
:root {
  --monte-primary-color: #2D5C3F;
  --monte-accent-color: #D4AF37;
  --monte-text-color: #1A1A1A;
  --monte-bg-color: #FFFFFF;
  --monte-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
}
```

## CSS Module Scoping
All component styles are scoped via CSS Modules (`.module.scss`).

No global class names are used except:
- `.monte-da-estrada-root` (optional root wrapper)
- Utility classes prefixed with `util-`

## Parent Site Considerations
1. **No style conflicts** - Styles are isolated by CSS Modules
2. **No CSS pollution** - Each component imports only its own styles
3. **Safe to embed** - Can be mounted alongside other components without issues
4. **Theme customization** - CSS variables allow simple theming without code changes

## Customization Points
To customize the appearance without modifying source:

1. Override CSS variables
2. Wrap component in custom className with CSS specificity
3. Update SCSS variables before import (if bundling together)
```

---

## 8. Phase 7: Testing & Validation

### 8.1 Visual QA Checklist

**Timeline:** 1-2 days
**Tools:** Manual review + screenshot comparison

#### 8.1.1 Visual Comparison Framework

Create comparison spreadsheet/document:

| Component | Element | Touril Reference | Current Implementation | Status | Notes |
|-----------|---------|------------------|----------------------|--------|-------|
| Hero | Typography Size | 56px serif | 3.5rem Playfair | ✓ | Matches |
| Hero | Text Color | #F5F3F0 on #2D5C3F | #F5F3F0 on #2D5C3F | ✓ | Matches |
| Hero | Overlay Opacity | 0.6 | 0.6 | ✓ | Matches |
| Cards | Shadow | subtle shadow | $shadow-subtle | ✓ | Matches |
| Cards | Border Radius | 4px | $border-radius-slight | ✓ | Matches |
| Gallery | Grid Columns | 3/2/1 | 3/2/1 | ✓ | Responsive |
| Gallery | Image Gaps | 24px | $spacing-l | ✓ | Matches |
| Footer | Background | dark green | $color-primary | ✓ | Matches |

#### 8.1.2 Visual Review Checklist

- [ ] Hero section matches Touril aesthetic
- [ ] Typography hierarchy is consistent
- [ ] Color palette applied across all pages
- [ ] Spacing/margins are consistent
- [ ] Card hover effects work smoothly
- [ ] Images display correctly on all breakpoints
- [ ] Overlay effects are subtle and elegant
- [ ] Navigation styling matches design system
- [ ] Footer layout and styling correct
- [ ] All interactive elements have proper hover/focus states

#### 8.1.3 Mobile/Responsive Testing

Test at breakpoints:
- [ ] Mobile (320px - 480px)
- [ ] Tablet (481px - 768px)
- [ ] Desktop (769px - 1024px)
- [ ] Desktop Wide (1025px+)

For each breakpoint, verify:
- [ ] Typography is readable
- [ ] Images scale correctly
- [ ] Navigation is accessible
- [ ] Spacing is proportional
- [ ] No horizontal scrolling
- [ ] Touch targets are large enough (44x44px minimum)

### 8.2 CMS Functionality Testing

**Timeline:** 1-2 days

#### 8.2.1 CMS Upload Testing

- [ ] Upload image via Decap CMS admin panel
- [ ] Verify image appears in markdown frontmatter
- [ ] Verify image renders on site
- [ ] Test with various file formats (JPG, PNG, WebP)
- [ ] Test with large files (>5MB)
- [ ] Verify image paths are correct in generated markdown

#### 8.2.2 Content Update Testing

- [ ] Edit markdown content in CMS
- [ ] Verify changes appear on live site
- [ ] Test image replacement
- [ ] Test gallery image reordering
- [ ] Verify all image alt texts are preserved

#### 8.2.3 Link Validation

- [ ] All image links resolve correctly
- [ ] No 404 errors for images
- [ ] Image paths are consistent (relative vs absolute)
- [ ] Broken links are identified and fixed

### 8.3 Performance Audit

**Timeline:** 1-2 days
**Tools:** Lighthouse, WebPageTest, Network tab

#### 8.3.1 Performance Targets

| Metric | Target | Testing Method |
|--------|--------|-----------------|
| First Contentful Paint (FCP) | < 1.5s | Lighthouse / WebPageTest |
| Largest Contentful Paint (LCP) | < 2.5s | Lighthouse / WebPageTest |
| Cumulative Layout Shift (CLS) | < 0.1 | Lighthouse |
| Speed Index | < 3s | WebPageTest |
| Page Load Time (4G) | < 3s | WebPageTest / DevTools |
| Page Load Time (Slow 4G) | < 5s | WebPageTest |

#### 8.3.2 Image Optimization Audit

- [ ] All images are optimized (no oversized files)
- [ ] Lazy loading is implemented
- [ ] Images use appropriate formats (WebP with fallback)
- [ ] Responsive images use srcset and sizes attributes
- [ ] Image compression doesn't degrade quality

#### 8.3.3 Bundle Size Analysis

```bash
# Check bundle size
npm run build
# Total size should be < 1MB gzipped
# Images are served separately and excluded
```

#### 8.3.4 Caching Strategy

- [ ] Browser caching headers are set
- [ ] CDN caching is configured (if using CDN)
- [ ] Cache busting is enabled for static assets
- [ ] Service Worker is configured (if applicable)

### 8.4 Accessibility Audit

**Timeline:** 1 day
**Tools:** axe DevTools, WAVE, NVDA/JAWS screen reader

#### 8.4.1 WCAG 2.1 AA Compliance Checklist

**Perceivable:**
- [ ] All images have descriptive alt text
- [ ] Color contrast meets AA standard (4.5:1 for text, 3:1 for graphics)
- [ ] No information is conveyed by color alone
- [ ] Text is resizable up to 200% without loss of functionality

**Operable:**
- [ ] All functionality is keyboard accessible
- [ ] No keyboard trap (user can navigate away)
- [ ] Focus indicator is visible
- [ ] Focus order is logical
- [ ] All interactive elements are properly labeled

**Understandable:**
- [ ] Language is clear and concise
- [ ] Links and buttons have descriptive text
- [ ] Form fields are labeled
- [ ] Error messages are clear and helpful

**Robust:**
- [ ] Code is valid HTML/CSS
- [ ] ARIA roles are used correctly (if needed)
- [ ] No duplicate IDs
- [ ] Proper nesting of semantic elements

#### 8.4.2 Alt Text Validation

Verify all images have:
```
✓ Descriptive alt text (not "image" or "photo")
✓ Concise (< 125 characters)
✓ Relevant to context
✓ No "image of" prefix (screen readers add this)
```

#### 8.4.3 Accessibility Score Target

- [ ] Lighthouse Accessibility score ≥ 95
- [ ] No automated accessibility errors via axe
- [ ] Manual testing passes with screen reader

#### 8.4.4 Mobile Accessibility

- [ ] Touch targets are 44x44px minimum
- [ ] Text is readable on small screens
- [ ] Zoom/magnification works properly
- [ ] No horizontal scrolling required

---

## 9. Implementation Timeline

### Sprint 1: Design Audit (2-3 days)
- **Days 1-2:** UI Designer analyzes Touril site
- **Day 3:** Design system documentation completed
- **Deliverable:** `design-system.md`

### Sprint 2: CMS Audit (1-2 days)
- **Day 1:** Backend developer audits current setup
- **Day 2:** Image mapping table created
- **Deliverable:** `cms-audit-report.md`, `image-mapping-table.md`

### Sprint 3: SCSS Implementation (2-3 days)
- **Day 1:** Update `_variables.scss` with new design tokens
- **Day 2:** Add new mixins to `_mixins.scss`
- **Day 3:** Update component-level SCSS files
- **Deliverable:** Updated SCSS files across all components

### Sprint 4: Component Updates (3-4 days)
- **Day 1-2:** Image integration in components
- **Day 2-3:** Hero section and gallery enhancement
- **Day 4:** Final component refinements
- **Deliverable:** Updated React components with images

### Sprint 5: CMS Integration (2-3 days)
- **Day 1:** Update markdown files with image paths
- **Day 2:** Configure Decap CMS widgets
- **Day 3:** Test image upload and content updates
- **Deliverable:** Populated markdown files, working CMS

### Sprint 6: Testing & Polish (2-3 days)
- **Day 1:** Visual QA and comparison
- **Day 2:** Performance and accessibility audit
- **Day 3:** Final bug fixes and optimizations
- **Deliverable:** Test reports, optimization recommendations

### Sprint 7: Documentation (1 day)
- **Day 1:** Complete all documentation and guides
- **Deliverable:** Integration guides, component documentation

**Total Estimated Time:** 12-18 days (with team of 4+ developers working in parallel)

---

## 10. Risk Assessment & Mitigation

### 10.1 Potential Risks

#### Risk 1: Design Mismatch
**Description:** Touril's aesthetic may not translate perfectly to Monte da Estrada brand
**Impact:** High (visual identity)
**Likelihood:** Medium
**Mitigation:**
- Create prototype components before full rollout
- Get stakeholder feedback on design tokens early
- Maintain flexibility to adjust colors/typography
- Create A/B comparison document

#### Risk 2: Image Quality/Size Issues
**Description:** Some scraped images may not fit layouts or be lower quality
**Impact:** Medium (visual quality)
**Likelihood:** Medium
**Mitigation:**
- Have image optimization pipeline ready
- Prepare crop/resize workflow
- Use image compression tools (sharp, imagemin)
- Test all images before production

#### Risk 3: CMS Breaking Changes
**Description:** Updates to config.yml might break existing content
**Impact:** High (content loss)
**Likelihood:** Low
**Mitigation:**
- Backup current config and markdown files
- Test changes in staging environment
- Use version control for all changes
- Create rollback plan

#### Risk 4: Performance Degradation
**Description:** Adding high-res images may slow site significantly
**Impact:** Medium (user experience)
**Likelihood:** Medium
**Mitigation:**
- Implement lazy loading from start
- Use image CDN if available
- Optimize images aggressively
- Set performance budgets in build process
- Monitor Core Web Vitals

#### Risk 5: SCSS Conflicts
**Description:** New design system might conflict with existing styles
**Impact:** Medium (styling bugs)
**Likelihood:** Low
**Mitigation:**
- Use CSS Modules strictly
- Use consistent naming conventions
- Test component isolation
- Incremental rollout by component
- CSS audit before launch

#### Risk 6: Timeline Slippage
**Description:** Complex integration may take longer than estimated
**Impact:** Low (schedule)
**Likelihood:** Medium
**Mitigation:**
- Break into smaller milestones
- Daily standup meetings
- Identify blockers early
- Have contingency time built in

### 10.2 Rollback Plan

**If major issues are discovered:**

1. **Revert Git changes**
   ```bash
   git reset --hard [last-good-commit]
   git push origin main
   ```

2. **Restore CMS config**
   - Revert `public/admin/config.yml`
   - Restore markdown files from backup

3. **Clear CDN/Browser Cache**
   - Purge Netlify cache
   - Instruct users to clear browser cache

4. **Communication Plan**
   - Notify stakeholders of rollback
   - Post update message on site
   - Document what went wrong

**Fallback Timeline:**
- If issues found: Pull feature branch and investigate
- If unfixable in 2-4 hours: Rollback
- Create incident report and fix plan

---

## 11. Success Criteria

All criteria must be met before production launch:

### Content Integration
- [x] All 97 images integrated into appropriate pages
- [x] No broken image links (404 errors)
- [x] All images have descriptive alt text
- [x] Image captions are accurate and helpful
- [x] CMS can upload new images without issues

### Visual Design
- [x] Typography matches Touril's serif/sans hierarchy
- [x] Color palette aligns with Touril's earth tones
- [x] All empty placeholders filled with actual images
- [x] Hover effects are smooth and elegant
- [x] Spacing and alignment is consistent
- [x] Visual design review completed and approved

### Performance
- [x] Page load time < 3 seconds on 4G networks
- [x] First Contentful Paint < 1.5s
- [x] Cumulative Layout Shift < 0.1
- [x] Lighthouse Performance score ≥ 85
- [x] Bundle size < 1MB (excluding images)

### Accessibility
- [x] Lighthouse Accessibility score ≥ 95
- [x] WCAG 2.1 AA compliance verified
- [x] All images have alt text
- [x] Color contrast meets AA standard
- [x] Keyboard navigation works
- [x] Screen reader compatible

### Responsiveness
- [x] Mobile view (320px) works perfectly
- [x] Tablet view (768px) works perfectly
- [x] Desktop view (1024px+) works perfectly
- [x] No horizontal scrolling
- [x] Touch targets are 44x44px minimum
- [x] Images scale properly on all devices

### CMS & Content Management
- [x] Decap CMS fully functional
- [x] Image upload working
- [x] Markdown frontmatter generates correctly
- [x] Content updates reflect on live site
- [x] Multi-user access configured
- [x] Publish workflow tested

### Modularity & Integration
- [x] Header/footer components are exportable
- [x] Routing supports custom base paths
- [x] Styles are properly isolated (CSS Modules)
- [x] No style leakage to parent site
- [x] Integration documentation complete
- [x] Example integration code provided

### Documentation & Knowledge Transfer
- [x] All design tokens documented
- [x] Component props documented
- [x] Integration guides written
- [x] Troubleshooting guide created
- [x] Future maintenance guidelines established
- [x] Developer onboarding guide prepared

### Quality Assurance
- [x] All automated tests passing
- [x] Manual testing completed
- [x] Security audit passed
- [x] SEO best practices implemented
- [x] No console errors or warnings
- [x] Code review completed

---

## 12. Appendices

### Appendix A: Agent Task Assignments

| Agent | Task | Input | Output | Timeline |
|-------|------|-------|--------|----------|
| UI Designer | Design System Extraction | Touril website URL | `design-system.md` | 2-3 days |
| Backend Dev | CMS Audit | Current `config.yml` | `cms-audit-report.md` | 1-2 days |
| Frontend Dev | Component Updates | Design tokens + Image list | Updated React components | 3-4 days |
| Heavy-Lift Coder | SCSS Implementation | Design system + Current SCSS | Updated SCSS files | 2-3 days |
| QA Engineer | Testing & Validation | Updated website | Test reports | 2-3 days |

### Appendix B: File Structure Reference

```
monte-da-estrada/
├── public/
│   ├── admin/
│   │   └── config.yml                  # Updated CMS config
│   ├── content/
│   │   ├── pages/
│   │   │   └── home.md                # Updated with image paths
│   │   ├── quartos/
│   │   │   ├── master-suite.md
│   │   │   ├── double.md
│   │   │   └── single.md
│   │   ├── atividades/
│   │   │   └── index.md
│   │   ├── galeria/
│   │   │   └── index.md
│   │   ├── arredores/
│   │   │   └── index.md
│   │   └── localizacao/
│   │       └── index.md
│   └── uploads/                        # CMS uploaded images
│
├── src/
│   ├── assets/
│   │   └── images/                     # All 97 scraped images
│   │       ├── home/                   (15 images)
│   │       ├── quartos/                (20 images)
│   │       ├── galeria/                (25 images)
│   │       ├── atividades/             (15 images)
│   │       ├── arredores/              (12 images)
│   │       ├── localizacao/            (8 images)
│   │       ├── misc/                   (2 images)
│   │       └── IMAGE-MANIFEST.md       # New: Image reference guide
│   │
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   ├── Header.module.scss      # Updated
│   │   │   └── index.js
│   │   ├── Footer/
│   │   │   ├── Footer.jsx
│   │   │   ├── Footer.module.scss      # Updated
│   │   │   └── index.js
│   │   ├── Hero/
│   │   │   ├── Hero.jsx
│   │   │   ├── Hero.module.scss        # Updated
│   │   │   └── index.js
│   │   └── NavBar/
│   │       ├── NavBar.jsx
│   │       ├── NavBar.module.scss      # Updated
│   │       └── index.js
│   │
│   ├── pages/
│   │   ├── HomePage/
│   │   │   ├── HomePage.jsx            # Updated
│   │   │   ├── HomePage.module.scss    # Updated
│   │   │   ├── __tests__/              # Tests
│   │   │   └── index.js
│   │   ├── QuartosPage/
│   │   │   ├── QuartosPage.jsx         # Updated
│   │   │   ├── QuartosPage.module.scss # Updated
│   │   │   └── ...
│   │   ├── GaleriaPage/
│   │   │   ├── GaleriaPage.jsx         # Updated
│   │   │   ├── GaleriaPage.module.scss # Updated
│   │   │   └── ...
│   │   ├── AtividadesPage/
│   │   │   ├── AtividadesPage.jsx      # Updated
│   │   │   ├── AtividadesPage.module.scss # Updated
│   │   │   └── ...
│   │   ├── RedondezasPage/
│   │   │   ├── RedondezasPage.jsx      # Updated
│   │   │   ├── RedondezasPage.module.scss # Updated
│   │   │   └── ...
│   │   └── LocalizacaoPage/
│   │       ├── LocalizacaoPage.jsx     # Updated
│   │       ├── LocalizacaoPage.module.scss # Updated
│   │       └── ...
│   │
│   ├── styles/
│   │   ├── global.scss                 # Updated
│   │   ├── _variables.scss             # MAJOR UPDATE: New design tokens
│   │   ├── _mixins.scss                # MAJOR UPDATE: New luxury mixins
│   │   └── index.scss
│   │
│   ├── App.jsx                         # Updated: flexible routing
│   ├── App.css                         # Updated: global container
│   ├── index.css                       # Updated: base styles
│   └── main.jsx
│
├── .env.example                        # New: Environment variables
├── .env.local                          # New: Local env config
├── design-system.md                    # NEW: Touril design tokens
├── cms-audit-report.md                 # NEW: CMS analysis
├── image-mapping-table.md              # NEW: Image placement guide
├── design-tokens-mapping.md            # NEW: Token migration guide
├── COMPONENT-INTEGRATION.md            # NEW: Component export guide
├── ROUTING-INTEGRATION.md              # NEW: Routing config guide
├── STYLE-DEPENDENCIES.md               # NEW: CSS isolation guide
├── touril-integration-plan.md           # THIS FILE
├── CHANGELOG.md                        # Update: Document changes
├── README.md                           # Update: New features/setup
└── package.json
```

### Appendix C: Key Dependencies & Versions

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^6.x.x",
    "sass": "^1.x.x"
  },
  "devDependencies": {
    "@testing-library/react": "^14.x.x",
    "@testing-library/jest-dom": "^6.x.x",
    "jest": "^29.x.x",
    "vite": "^5.x.x",
    "lighthouse": "^11.x.x"
  },
  "optional": {
    "sharp": "^0.33.x",
    "imagemin": "^8.x.x",
    "imagemin-webp": "^8.x.x"
  }
}
```

### Appendix D: Critical Dates & Deadlines

| Milestone | Planned Date | Status |
|-----------|-------------|--------|
| Design System Complete | Day 3 | Not Started |
| CMS Audit Complete | Day 5 | Not Started |
| SCSS Implementation Done | Day 8 | Not Started |
| Components Updated | Day 12 | Not Started |
| CMS Integration Complete | Day 15 | Not Started |
| Testing Complete | Day 18 | Not Started |
| **Production Launch** | **Day 19** | **Pending** |

### Appendix E: Stakeholder Communication Template

```markdown
# Weekly Status Report - Touril Integration

## Week of [Date]

### Completed
- [ ] Item 1
- [ ] Item 2

### In Progress
- [ ] Item 1
- [ ] Item 2

### Blocked/Issues
- [ ] Item 1 - Description and proposed solution

### Next Week
- [ ] Planned task 1
- [ ] Planned task 2

### Metrics
- Images integrated: X/97
- Components updated: Y/9
- Tests passing: Z/N
- Performance score: [Lighthouse score]
```

### Appendix F: Troubleshooting Guide

#### Image Not Displaying
1. Check file path in markdown (relative paths should work)
2. Verify image file exists in `src/assets/images/`
3. Check alt text is present
4. Clear browser cache
5. Check browser console for errors

#### CMS Upload Not Working
1. Verify Netlify Identity is configured
2. Check media folder path in `config.yml`
3. Ensure user has editor permissions
4. Clear CMS cache and reload
5. Check network tab for upload errors

#### Styles Not Applying
1. Verify SCSS file imports variables: `@import '@/styles/variables';`
2. Check CSS Modules syntax (`.module.scss` file)
3. Clear browser cache
4. Verify build process completed successfully
5. Check for CSS specificity conflicts

#### Performance Issues
1. Run Lighthouse audit
2. Check image sizes (should be < 500KB each)
3. Verify lazy loading is enabled
4. Check for duplicate imports
5. Profile with DevTools

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-15 | Project Team | Initial planning document |

---

## Document Approval

- [ ] Project Manager: _____________________ Date: _______
- [ ] Design Lead: _____________________ Date: _______
- [ ] Technical Lead: _____________________ Date: _______
- [ ] Stakeholder: _____________________ Date: _______

---

**END OF TOURIL INTEGRATION PLAN**

This document is the single source of truth for the Monte da Estrada website transformation project. All changes should be tracked, and the document should be updated as the project progresses.

For questions or clarifications, contact the Project Manager or Technical Lead.
