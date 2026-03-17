# Herdade do Touril Design System Analysis

**Date:** February 15, 2026
**Source:** https://herdadedotouril.com/
**Status:** Phase 1 Complete - Visual Audit
**Next Steps:** Token mapping and SCSS implementation

---

## Executive Summary

The Herdade do Touril website embodies a **luxury minimalist aesthetic** with emphasis on:
- **Clean typography** with generous letter-spacing (1px across all text)
- **Sharp geometric lines** (0px border-radius, minimal shadows)
- **Warm golden accent** (#FBAB18) against neutral backgrounds
- **Light font weights** (300) for sophistication and elegance
- **Fixed header** navigation for consistent brand presence
- **Simple heading hierarchy** (H1 and H2 only, no H3-H6)

This analysis provides actionable design tokens for implementing the Touril aesthetic in the Monte da Estrada website.

---

## 1. Typography

### 1.1 Font Stack

**Primary Font Family:**
`"Open Sans", sans-serif`

**Usage:**
- All headings (H1, H2)
- Body text
- Navigation
- Buttons and UI elements

**Font Hosting:**
Likely Google Fonts or similar CDN (confirm before implementation)

### 1.2 Heading Hierarchy

#### H1 - Main Page Titles
```
Font Size: 32px (2rem)
Font Weight: 300 (Light)
Line Height: 44.8px (1.4)
Letter Spacing: 1px
Margin Bottom: 21.44px (average)
Color: #0A0203 (almost black)
Text Transform: none
```

**Usage:** Page titles, hero section headings

#### H2 - Section Headers
```
Font Size: 28px (1.75rem)
Font Weight: 300 (Light) or 700 (Bold) depending on context
Line Height: 39.2px (1.4)
Letter Spacing: 1px
Margin Bottom: 8px
Color: #FFFFFF (white) when on dark backgrounds
        #0A0203 (dark) when on light backgrounds
Text Transform: none
```

**Usage:** Section titles, card titles, prominent labels

#### H3-H6
**Not used** - The site maintains a simple two-level hierarchy for elegance and clarity.

### 1.3 Body Text

#### Paragraph Text
```
Font Size: 14px (0.875rem)
Font Weight: 400 (Regular)
Line Height: 24px (1.71 - very spacious)
Letter Spacing: 1px
Color: #0A0203 (on light backgrounds)
        #FFFFFF (on dark backgrounds)
```

**Usage:** Main content, descriptions, body copy

#### Small Text / Captions
```
Font Size: 14px (0.875rem)
Font Weight: 400 (Regular)
Letter Spacing: 1px
```

**Usage:** Captions, helper text, secondary information

### 1.4 Letter Spacing Philosophy

**Critical:** All text elements use **1px letter-spacing** consistently.
This creates:
- Visual breathing room
- Elegant, upscale appearance
- Improved readability in uppercase
- Sophisticated, editorial feel

---

## 2. Color Palette

### 2.1 Primary Brand Colors

#### Accent Gold (Primary CTA Color)
```
Hex: #FBAB18
RGB: rgb(251, 171, 24)
HSL: hsl(38, 96%, 54%)
```

**Usage:**
- "Reservar" button background
- Active navigation items
- Primary CTAs
- Accent highlights
- Mobile reservation bar

**Accessibility:** Ensure sufficient contrast when using text on this background (use dark text #0A0203)

### 2.2 Neutral Palette

#### Off-White / Cream Background
```
Hex: #F8F8F8
RGB: rgb(248, 248, 248)
```

**Usage:** Main page background, section backgrounds, light areas

#### Pure White
```
Hex: #FFFFFF
RGB: rgb(255, 255, 255)
```

**Usage:** Card backgrounds, overlays, clean sections

#### Almost Black (Text & Footer)
```
Hex: #0A0203
RGB: rgb(10, 2, 3)
```

**Usage:**
- Primary text color
- Footer background
- Dark UI elements
- High contrast sections

### 2.3 Text Colors

| Context | Hex | RGB | Usage |
|---------|-----|-----|-------|
| Primary Text | #0A0203 | rgb(10, 2, 3) | Body copy on light backgrounds |
| Light Text | #FFFFFF | rgb(255, 255, 255) | Text on dark backgrounds |
| Link Text | #000000 | rgb(0, 0, 0) | Navigation links, text links |
| Link Hover | #FBAB18 | rgb(251, 171, 24) | Active state for links |

### 2.4 Background Colors

| Element | Color | Usage |
|---------|-------|-------|
| Page Background | #F8F8F8 | Main site background |
| Section Background | #FFFFFF | Content sections, cards |
| Footer Background | #0A0203 | Footer area |
| Gallery Background | #000000 | Image gallery overlays |
| Navigation Background | Transparent | Fixed header |

### 2.5 Border & Divider Colors

**Not prominently used** - The design prefers whitespace over visible borders.

When borders are needed:
- Light dividers: rgba(0, 0, 0, 0.1)
- Medium dividers: rgba(0, 0, 0, 0.2)

Borders are not needed in the header
---

## 3. Spacing System

### 3.1 Base Unit Analysis

**Observed Base Unit:** 8px (inferred from margin/padding patterns)

### 3.2 Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| XS | 4px | Minimal spacing, icon margins |
| S | 8px | Small gaps, button padding |
| M | 16px | Default spacing, card padding |
| L | 24px | Section gaps |
| XL | 50px | Section padding (top/bottom) |
| XXL | 64px+ | Hero sections, large breaks |

### 3.3 Section Spacing Patterns

**Typical Section:**
```
Padding Top: 50px
Padding Bottom: 50px
Margin Top: 25px
Margin Bottom: 0px
```

**Content Container:**
```
Max Width: ~1200px (estimated)
Horizontal Padding: Responsive (varies by breakpoint)
```

### 3.4 Component Spacing

**Card Padding:** Varies by component, typically 16-24px
**Button Padding:** Minimal internal padding
**Navigation Height:** ~52px for nav bar, ~177px total header height

---

## 4. Elevation & Effects

### 4.1 Box Shadows

**Philosophy:** Minimal to none - flat, clean aesthetic

**Primary Shadow:**
```
box-shadow: none;
```

**Hover States:** Subtle transforms rather than shadows

### 4.2 Border Radius

**Universal:** `border-radius: 0px;`

**Design Philosophy:**
Sharp, geometric aesthetic. No rounded corners on:
- Images
- Buttons
- Cards
- Input fields
- Containers

This creates a **modern, architectural feel** consistent with luxury hospitality design.

### 4.3 Hover States

**Typical Pattern:**
- Slight scale or brightness change
- No elevation changes
- Subtle opacity shifts
- Color transitions (e.g., link color changes to gold)

---

## 5. Animation & Transitions

### 5.1 Transition Timing

**Default Transition:**
```css
transition: all;
/* Duration not explicitly specified, likely 0.3s */
```

**Recommended Values:**
- Quick: 0.2s
- Normal: 0.3s
- Smooth: 0.4s

### 5.2 Easing Functions

**Observed:** Standard easing (ease or ease-in-out)

**Recommended:**
```css
transition-timing-function: ease;
```

### 5.3 Animation Patterns

**Scroll Behavior:**
- Smooth scroll (likely enabled)
- No aggressive parallax effects
- Subtle fade-ins on scroll (if any)

**Interactive Elements:**
- Color transitions on hover
- Slight transform on buttons
- Opacity changes for images

---

## 6. Image Treatments

### 6.1 Aspect Ratios

**Hero Images:** Full viewport width, variable height
**Gallery Images:** Square (1:1) or landscape (16:9, 4:3)
**Card Images:** Flexible, content-dependent

### 6.2 Object Fit

```css
object-fit: fill; /* or cover for hero images */
```

### 6.3 Border Treatments

**Borders:** None (0px)
**Border Radius:** 0px (sharp corners)
**Shadows:** None

### 6.4 Overlay Patterns

**Gallery Overlay:**
```css
background: rgb(0, 0, 0);
/* Applied as overlay to gallery items */
```

**Hero Overlay:**
Not heavily used - images display naturally

**Hover Effects:**
- Opacity shifts
- Slight brightness adjustments
- No scale transforms on images

### 6.5 Lazy Loading

**Indication:** Not visually prominent
**Implementation:** Standard progressive loading

---

## 7. Component Patterns

### 7.1 Hero Section

**Structure:**
```
Height: Full viewport or fixed height
Background: Large image with minimal overlay
Text Overlay: Minimal, positioned strategically
Typography: H2 heading, light paragraph text
Text Color: White (#FFFFFF)
Alignment: Center or left-aligned
```

**Example (from homepage):**
- H2: "Conheça as casas da Herdade"
- Paragraph: Description text
- Image: Full-width background

### 7.2 Navigation

**Structure:**
```
Position: fixed
Top: 0
Z-Index: 10000
Height: ~177px total (includes logo + menu)
Background: Transparent (becomes solid on scroll?)
```

**Menu Items:**
- Font: Open Sans
- Size: ~14px
- Weight: 400
- Letter Spacing: 1px
- Color: #000000
- Active Background: #FBAB18

**Reservar Button:**
- Background: #FBAB18
- Color: #0A0203
- Position: Far right

### 7.3 Cards (Gallery Items)

**Structure:**
```
Background: #FFFFFF or transparent
Shadow: none
Border: none
Border Radius: 0px
Padding: Minimal or none
```

**Image:**
- Full width of card
- Sharp corners
- No border

**Title (H2):**
- Font Weight: 300 or 700
- Font Size: 28px
- Letter Spacing: 1px
- Positioned over or below image

**Hover State:**
- Subtle overlay change
- No elevation shift

### 7.4 Buttons

**Primary Button (.btn, .reservar):**
```
Background: #FBAB18
Color: #0A0203
Border: none
Border Radius: 0px
Padding: Variable (depends on context)
Font Weight: 400
Letter Spacing: 1px
Transition: all
```

**Hover:**
- Slight color shift or brightness change

**Secondary Buttons:**
- Background: Transparent or alternate color
- Border: Possible thin border
- Same typography and spacing rules

### 7.5 Footer

**Structure:**
```
Background: #0A0203 (almost black)
Color: #FFFFFF (white text)
Padding: Generous vertical padding
Layout: Multi-column grid (links, contact info, social)
```

**Typography:**
- Body text: White
- Font Size: 14px
- Letter Spacing: 1px

**Links:**
- Color: #FFFFFF
- Hover: Possibly #FBAB18

**Sections:**
- Navigation links
- Contact information (address, phone, email)
- Social media icons
- Legal links (privacy, terms)

### 7.6 Forms

**Input Fields:**
```
Border: Thin, likely 1px solid #CCCCCC or similar
Border Radius: 0px
Background: #FFFFFF
Padding: ~12-16px
Font: Open Sans
Font Size: 14px
Letter Spacing: 1px
```

**Focus State:**
- Border color change (possibly to #FBAB18)
- No shadow

**Submit Button:**
- Same as primary button styling

---

## 8. Responsive Breakpoints

### 8.1 Observed Breakpoints

**Desktop (tested):** 1920px viewport width

**Estimated Breakpoints:**
- Mobile: max-width 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

**Responsive Behavior:**
- Fixed header remains fixed
- Navigation may collapse to hamburger menu
- Grid columns adjust (3 cols → 2 cols → 1 col)
- Font sizes may slightly reduce on mobile
- Section padding reduces on smaller screens

### 8.2 Mobile-Specific Patterns

**Mobile Reservation Bar:**
```
Background: #FBAB18
Position: Fixed bottom or floating
Text: "Reservar"
Color: #0A0203
```

**Navigation:**
- Hamburger menu icon background: #FBAB18
- Slide-out menu or overlay

---

## 9. Notable Accessibility Features

### 9.1 Contrast Ratios

| Combination | Ratio | WCAG AA | WCAG AAA |
|-------------|-------|---------|----------|
| #0A0203 on #F8F8F8 | ~19:1 | ✅ Pass | ✅ Pass |
| #FFFFFF on #0A0203 | ~21:1 | ✅ Pass | ✅ Pass |
| #0A0203 on #FBAB18 | ~7.5:1 | ✅ Pass | ✅ Pass |
| #FFFFFF on #FBAB18 | ~2.8:1 | ⚠️ Marginal | ❌ Fail |

**Recommendation:** Use dark text (#0A0203) on gold background (#FBAB18), not white.

### 9.2 Focus States

**Interactive Elements:**
- Focus indicators present but subtle
- Recommend enhancing with visible outlines

### 9.3 Alt Text

Images appear to have alt attributes (standard practice)

### 9.4 Semantic HTML

- Proper heading hierarchy (H1 → H2)
- Navigation uses `<nav>` elements
- Footer uses `<footer>` element
- Main content in `<main>` element

---

## 10. Visual Design Philosophy

### 10.1 Core Principles

1. **Minimalism:** Clean layouts, ample whitespace, no clutter
2. **Elegance:** Light font weights, generous letter-spacing
3. **Clarity:** Simple hierarchy, two heading levels only
4. **Sophistication:** Sharp geometric lines, no rounded corners
5. **Warmth:** Golden accent color, natural photography
6. **Luxury:** High-quality imagery, spacious layouts

### 10.2 Competitive Positioning

The Touril aesthetic positions the brand as:
- **Premium boutique hospitality**
- **Modern countryside retreat**
- **Design-conscious luxury**
- **Natural yet refined**

### 10.3 Emotional Tone

- Calm
- Welcoming
- Sophisticated
- Trustworthy
- Warm yet professional

---

## 11. Key Takeaways for Monte da Estrada Implementation

### 11.1 Must-Have Elements

✅ **Open Sans font** (or similar sans-serif with similar weight options)
✅ **1px letter-spacing** across all text
✅ **Golden accent color** (#FBAB18)
✅ **Light font weights** (300) for headings
✅ **Sharp corners** (0px border-radius)
✅ **Minimal shadows** (prefer flat design)
✅ **Fixed header navigation** with high z-index
✅ **Simple H1/H2 hierarchy** only
✅ **Off-white background** (#F8F8F8)
✅ **Dark footer** with white text

### 11.2 Adaptable Elements

⚙️ **Exact spacing values** - can be adjusted to fit content
⚙️ **Section padding** - maintain ratio, adjust absolute values
⚙️ **Container max-width** - optimize for Monte da Estrada content
⚙️ **Image aspect ratios** - adapt to available photography
⚙️ **Grid columns** - adjust based on content needs

### 11.3 Elements to Avoid

❌ **Rounded corners** on any elements
❌ **Heavy font weights** for headings (use 300, not 700+)
❌ **Drop shadows** on cards or images
❌ **Complex heading hierarchy** (H3-H6)
❌ **Small letter-spacing** or tracking
❌ **Busy patterns** or textured backgrounds
❌ **Gradient overlays** (except very subtle)

---

## 12. Implementation Checklist

### Phase 1: Foundation ✅
- [x] Typography audit complete
- [x] Color palette extracted
- [x] Spacing system documented
- [x] Component patterns identified

### Phase 2: Token Mapping (Next)
- [ ] Map Touril colors to SCSS variables
- [ ] Update font family variables
- [ ] Adjust spacing scale
- [ ] Create new mixins for Touril patterns
- [ ] Document breaking changes

### Phase 3: Component Updates
- [ ] Update Hero component
- [ ] Redesign Navigation/Header
- [ ] Update Footer styling
- [ ] Refactor Card components
- [ ] Update Button components
- [ ] Refine Form inputs

### Phase 4: Content Integration
- [ ] Integrate 97 scraped images
- [ ] Populate all content via CMS
- [ ] Optimize image loading
- [ ] Test responsive behavior

### Phase 5: Polish & Launch
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Cross-browser testing
- [ ] Final design review

---

## Appendix A: Screenshot Reference

Full-page screenshot saved at: `touril-homepage-full.png`

Key sections captured:
- Hero section with carousel
- Welcome text section
- Image gallery grid
- Awards/certifications
- Restaurant promo section
- Map/location section
- Contact form
- Footer

---

## Appendix B: Font Loading Recommendation

### Option 1: Google Fonts (Recommended)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
```

### Option 2: Self-Hosted (Performance)
Download Open Sans from Google Fonts and host locally for faster loading and GDPR compliance.

---

## Appendix C: Quick Reference - Design Tokens

```scss
// TOURIL-INSPIRED TOKENS

// Typography
$touril-font-family: 'Open Sans', sans-serif;
$touril-letter-spacing: 1px;
$touril-h1-size: 32px;  // 2rem
$touril-h1-weight: 300;
$touril-h2-size: 28px;  // 1.75rem
$touril-h2-weight: 300;
$touril-body-size: 14px;  // 0.875rem
$touril-body-weight: 400;
$touril-line-height-tight: 1.4;
$touril-line-height-loose: 1.71;

// Colors
$touril-gold: #FBAB18;
$touril-cream: #F8F8F8;
$touril-white: #FFFFFF;
$touril-black: #0A0203;

// Spacing
$touril-section-padding: 50px;
$touril-section-margin: 25px;

// Effects
$touril-border-radius: 0px;
$touril-box-shadow: none;
$touril-transition: all 0.3s ease;
```

---

**Document End**
*Next: design-tokens-mapping.md*
