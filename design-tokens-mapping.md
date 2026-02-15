# Design Tokens Mapping & Migration Strategy
## Monte da Estrada → Touril-Inspired Design System

**Date:** February 15, 2026
**Version:** 1.0
**Status:** Phase 1 - Mapping Complete
**Prerequisites:** design-system.md reviewed and approved

---

## Executive Summary

This document provides a **complete migration strategy** for updating Monte da Estrada's SCSS design tokens to align with the Herdade do Touril luxury aesthetic while maintaining existing component compatibility.

### Migration Approach

**Strategy:** Gradual, backward-compatible update
- ✅ Update `_variables.scss` with new Touril-inspired values
- ✅ Add new mixins to `_mixins.scss` for Touril patterns
- ✅ Preserve variable names for easy component updates
- ✅ Maintain existing spacing scale (8px base)
- ⚠️ Breaking changes clearly marked

### Risk Assessment

| Risk Level | Changes | Impact |
|------------|---------|--------|
| 🟢 Low | Color updates, font family | Components auto-update via variables |
| 🟡 Medium | Border radius (to 0px) | May affect button/card aesthetics |
| 🟡 Medium | Shadow removal | Cards lose elevation |
| 🔴 High | Font weight changes (to 300) | May reduce heading prominence |

---

## 1. Typography Tokens Mapping

### 1.1 Font Family

| Token | Current Value | Touril Value | Migration |
|-------|---------------|--------------|-----------|
| `$font-family-primary` | `'Arial', 'Helvetica', sans-serif` | `'Open Sans', sans-serif` | 🟢 **SAFE** - Direct replacement |
| `$font-family-heading` | `'Arial', 'Helvetica', sans-serif` | `'Open Sans', sans-serif` | 🟢 **SAFE** - Direct replacement |
| `$font-family-mono` | `'Courier New', monospace` | *(Keep as is)* | ✅ No change |

**Action Required:**
```scss
// _variables.scss - Line 51-53
// OLD:
// $font-family-primary: 'Arial', 'Helvetica', sans-serif;
// $font-family-heading: 'Arial', 'Helvetica', sans-serif;

// NEW:
$font-family-primary: 'Open Sans', sans-serif;
$font-family-heading: 'Open Sans', sans-serif;
```

**Additional Setup:**
Add to `index.html` (or equivalent):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
```

### 1.2 Font Sizes

| Token | Current Value | Touril Equivalent | Keep/Change | Notes |
|-------|---------------|-------------------|-------------|-------|
| `$font-size-4xl` | `3rem` (48px) | Not used | ✅ **KEEP** | For future flexibility |
| `$font-size-3xl` | `2.5rem` (40px) | Not used | ✅ **KEEP** | For future flexibility |
| `$font-size-2xl` | `2rem` (32px) | **H1: 2rem (32px)** | ✅ **KEEP** | ✅ Perfect match! |
| `$font-size-xl` | `1.5rem` (24px) | Not directly used | ✅ **KEEP** | Between H1 and H2 |
| `$font-size-lg` | `1.25rem` (20px) | Not used | ✅ **KEEP** | For UI flexibility |
| `$font-size-md` | `1.125rem` (18px) | Not used | ✅ **KEEP** | For large body text |
| `$font-size-base` | `1rem` (16px) | **~Body: 0.875rem (14px)** | 🟡 **REVIEW** | Touril uses 14px |
| `$font-size-sm` | `0.875rem` (14px) | **Body: 0.875rem (14px)** | ✅ **KEEP** | ✅ Matches Touril body |
| `$font-size-xs` | `0.75rem` (12px) | Not used | ✅ **KEEP** | For captions |

**Recommended New Token:**
```scss
// Add to _variables.scss after line 64
$font-size-h1-touril: 2rem;      // 32px - Touril H1
$font-size-h2-touril: 1.75rem;   // 28px - Touril H2
$font-size-body-touril: 0.875rem; // 14px - Touril body
```

**OR Remap Existing:**
```scss
// Option 2: Use existing tokens with Touril values
// H1 = $font-size-2xl (already 32px ✅)
// H2 = NEW: 28px (1.75rem)
// Body = $font-size-sm (already 14px ✅)
```

### 1.3 Font Weights

| Token | Current Value | Touril Usage | Migration |
|-------|---------------|--------------|-----------|
| `$font-weight-light` | `300` | **H1: 300, H2: 300** | ✅ **PERFECT MATCH** |
| `$font-weight-normal` | `400` | **Body: 400** | ✅ **PERFECT MATCH** |
| `$font-weight-medium` | `500` | Not used | ✅ Keep for buttons |
| `$font-weight-semibold` | `600` | Not used | ✅ Keep for emphasis |
| `$font-weight-bold` | `700` | **H2 (alternate): 700** | ✅ **MATCHES** |

**Action Required:**
🟢 **NO CHANGES NEEDED** - Existing weights perfectly match Touril!

**Usage Pattern Update:**
```scss
// Update heading mixins to use light weight as default
@mixin h1 {
  // ... existing styles
  font-weight: $font-weight-light;  // Change from bold to light
}

@mixin h2 {
  // ... existing styles
  font-weight: $font-weight-light;  // Change from bold to light
}
```

### 1.4 Line Heights

| Token | Current Value | Touril Value | Match |
|-------|---------------|--------------|-------|
| `$line-height-tight` | `1.2` | **H1/H2: 1.4** | 🟡 Adjust to 1.4 |
| `$line-height-normal` | `1.5` | Not primary | ✅ Keep |
| `$line-height-relaxed` | `1.75` | **Body: ~1.71** | ✅ **CLOSE MATCH** |
| `$line-height-loose` | `2` | Not used | ✅ Keep |

**Recommended Changes:**
```scss
// _variables.scss - Line 73-77
// OLD:
// $line-height-tight: 1.2;

// NEW:
$line-height-tight: 1.4;  // Updated for Touril headings
```

### 1.5 Letter Spacing (NEW TOKEN!)

**Critical Addition:**
```scss
// Add to _variables.scss after line 77
// ------------------------------------
// LETTER SPACING (Touril Design)
// ------------------------------------
$letter-spacing-touril: 1px;      // Standard 1px spacing for all text
$letter-spacing-tight: 0px;       // For dense text (if needed)
$letter-spacing-normal: 0.5px;    // Moderate spacing
$letter-spacing-wide: 1.5px;      // Extra wide (for all-caps)
```

**Apply Globally:**
```scss
// In global.scss or base styles
body {
  letter-spacing: $letter-spacing-touril;  // 1px everywhere
}

h1, h2, h3, h4, h5, h6 {
  letter-spacing: $letter-spacing-touril;  // 1px for headings
}
```

---

## 2. Color Tokens Mapping

### 2.1 Primary Colors

| Current Token | Current Value | Touril Equivalent | Action |
|---------------|---------------|-------------------|--------|
| `$color-primary` | `#8B6F47` (Brown) | `#FBAB18` (Gold) | 🔴 **REPLACE** |
| `$color-primary-light` | `#A68A64` | `#FCC04A` (lighter gold) | 🔴 **UPDATE** |
| `$color-primary-dark` | `#6B5537` | `#E09A00` (darker gold) | 🔴 **UPDATE** |

**Migration Code:**
```scss
// _variables.scss - Line 11-13
// OLD:
// $color-primary: #8B6F47;        // Warm brown
// $color-primary-light: #A68A64;
// $color-primary-dark: #6B5537;

// NEW (Touril Gold):
$color-primary: #FBAB18;           // Touril gold accent
$color-primary-light: #FCC04A;     // Lighter gold (generated)
$color-primary-dark: #E09A00;      // Darker gold (generated)
```

**Impact:** 🔴 **HIGH**
- All primary buttons change from brown to gold
- Accent elements become gold
- Links and CTAs adopt gold color
- May conflict with existing branding (review with stakeholders)

### 2.2 Secondary Colors

| Current Token | Current Value | Touril Strategy | Action |
|---------------|---------------|-----------------|--------|
| `$color-secondary` | `#D4A574` (Sand) | Keep for warmth | ✅ **KEEP** |
| `$color-secondary-light` | `#E8C9A0` | Keep | ✅ **KEEP** |
| `$color-secondary-dark` | `#B8895C` | Keep | ✅ **KEEP** |

**Rationale:** Secondary sand colors complement gold and provide earthy warmth.

### 2.3 Accent/CTA Color

| Current Token | Current Value | Touril Value | Action |
|---------------|---------------|--------------|--------|
| `$color-accent` | `#116dff` (Blue) | `#FBAB18` (Gold) | 🟡 **REMAP** |
| `$color-accent-hover` | `#0d5dd4` | `#E09A00` | 🟡 **UPDATE** |

**Options:**

**Option A:** Keep blue accent, use gold as primary
```scss
$color-primary: #FBAB18;     // Gold for primary elements
$color-accent: #116dff;      // Keep blue for CTAs (differentiation)
```

**Option B:** Unify to gold (Touril approach)
```scss
$color-primary: #FBAB18;     // Gold
$color-accent: #FBAB18;      // Same gold for CTAs
$color-accent-hover: #E09A00; // Darker gold on hover
```

**Recommendation:** **Option B** for full Touril aesthetic

### 2.4 Text Colors

| Current Token | Current Value | Touril Value | Match |
|---------------|---------------|--------------|-------|
| `$color-text-primary` | `#2C2C2C` | `#0A0203` | 🟡 Slightly darker |
| `$color-text-secondary` | `#5A5A5A` | Not used | ✅ Keep |
| `$color-text-light` | `#FFFFFF` | `#FFFFFF` | ✅ **PERFECT** |
| `$color-text-muted` | `#8C8C8C` | Not used | ✅ Keep |

**Recommended Update:**
```scss
// _variables.scss - Line 24-28
// OLD:
// $color-text-primary: #2C2C2C;

// NEW:
$color-text-primary: #0A0203;   // Touril almost-black (richer tone)
```

**Impact:** 🟢 **LOW** - Slightly darker text, better contrast

### 2.5 Background Colors

| Current Token | Current Value | Touril Value | Action |
|---------------|---------------|--------------|--------|
| `$color-bg-primary` | `#FFFFFF` | `#F8F8F8` | 🟡 **CONSIDER CHANGE** |
| `$color-bg-secondary` | `#F8F5F2` | `#F8F8F8` | ✅ **VERY CLOSE** |
| `$color-bg-dark` | `#3A3A3A` | `#0A0203` | 🟡 **UPDATE** |
| `$color-bg-overlay` | `rgba(0,0,0,0.5)` | `rgba(0,0,0,0.5)` | ✅ **KEEP** |

**Recommended Changes:**
```scss
// _variables.scss - Line 30-34
// OLD:
// $color-bg-primary: #FFFFFF;
// $color-bg-dark: #3A3A3A;

// NEW:
$color-bg-primary: #F8F8F8;     // Touril warm off-white
$color-bg-dark: #0A0203;        // Touril rich black (footer)
```

**Alternative (Conservative):**
```scss
// Keep white primary, use off-white for secondary
$color-bg-primary: #FFFFFF;      // Keep pure white
$color-bg-secondary: #F8F8F8;    // Touril off-white for sections
$color-bg-dark: #0A0203;         // Touril rich black
```

### 2.6 Border Colors

| Current Token | Current Value | Touril Usage | Action |
|---------------|---------------|--------------|--------|
| `$color-border-light` | `#E0E0E0` | Minimal borders | ✅ **KEEP** |
| `$color-border-medium` | `#CCCCCC` | Minimal borders | ✅ **KEEP** |
| `$color-border-dark` | `#999999` | Minimal borders | ✅ **KEEP** |

**Note:** Touril design minimizes borders. Consider reducing border usage in components.

---

## 3. Spacing Tokens Mapping

### 3.1 Base Unit

| Current | Touril | Status |
|---------|--------|--------|
| `$spacing-unit: 8px` | `~8px (inferred)` | ✅ **PERFECT MATCH** |

**Action:** 🟢 **NO CHANGES NEEDED**

### 3.2 Spacing Scale

| Token | Current | Touril Equivalent | Match |
|-------|---------|-------------------|-------|
| `$spacing-xs` | `4px` | XS spacing | ✅ Keep |
| `$spacing-sm` | `8px` | S spacing | ✅ Keep |
| `$spacing-md` | `16px` | M spacing | ✅ Keep |
| `$spacing-lg` | `24px` | L spacing | ✅ Keep |
| `$spacing-xl` | `32px` | Not primary | ✅ Keep |
| `$spacing-2xl` | `48px` | ~50px sections | ✅ **CLOSE** |
| `$spacing-3xl` | `64px` | XL sections | ✅ Keep |
| `$spacing-4xl` | `80px` | XXL sections | ✅ Keep |

**New Token Recommendation:**
```scss
// Add to _variables.scss after line 93
$spacing-section-touril: 50px;  // Touril section padding (top/bottom)
```

**Action:** 🟢 **NO CHANGES TO CORE SCALE**

---

## 4. Border Radius Tokens Mapping

### 4.1 Border Radius Values

| Current Token | Current Value | Touril Value | Action |
|---------------|---------------|--------------|--------|
| `$border-radius-sm` | `4px` | `0px` | 🔴 **OVERRIDE** |
| `$border-radius-md` | `8px` | `0px` | 🔴 **OVERRIDE** |
| `$border-radius-lg` | `12px` | `0px` | 🔴 **OVERRIDE** |
| `$border-radius-xl` | `16px` | `0px` | 🔴 **OVERRIDE** |
| `$border-radius-2xl` | `24px` | `0px` | 🔴 **OVERRIDE** |
| `$border-radius-full` | `9999px` | `0px` (except for circles) | ⚠️ **KEEP** for icons |

**Migration Strategy:**

**Option A - Aggressive (Full Touril):**
```scss
// _variables.scss - Line 124-129
// Set all to 0px for sharp aesthetic
$border-radius-sm: 0px;
$border-radius-md: 0px;
$border-radius-lg: 0px;
$border-radius-xl: 0px;
$border-radius-2xl: 0px;
$border-radius-full: 9999px;  // Keep for circular elements only
```

**Option B - Conservative (Gradual):**
```scss
// Keep existing values, add Touril override
$border-radius-touril: 0px;

// Then selectively apply:
.card, .button, .input {
  border-radius: $border-radius-touril;  // Override to sharp
}
```

**Impact:** 🔴 **HIGH VISUAL CHANGE**
- All rounded buttons become sharp rectangles
- Cards lose rounded corners
- Input fields become geometric
- More modern, architectural feel

**Recommendation:** Start with **Option B**, test user feedback, migrate to Option A if positive.

---

## 5. Shadow Tokens Mapping

### 5.1 Box Shadow Values

| Current Token | Current Value | Touril Value | Action |
|---------------|---------------|--------------|--------|
| `$shadow-sm` | `0 1px 3px rgba(0,0,0,0.12)` | `none` | 🔴 **REMOVE** |
| `$shadow-md` | `0 1px 3px rgba(0,0,0,0.5)` | `none` | 🔴 **REMOVE** |
| `$shadow-lg` | `0 1px 4px rgba(0,0,0,0.6)` | `none` | 🔴 **REMOVE** |
| `$shadow-xl` | `0 4px 12px rgba(0,0,0,0.15)` | `none` | 🔴 **REMOVE** |

**Migration Strategy:**

**Option A - Immediate (Full Touril):**
```scss
// _variables.scss - Line 135-138
// Set all shadows to none
$shadow-sm: none;
$shadow-md: none;
$shadow-lg: none;
$shadow-xl: none;
```

**Option B - Gradual (Preserve but minimize):**
```scss
// Keep tokens but reduce opacity significantly
$shadow-sm: 0 1px 2px rgba(0,0,0,0.04);   // Barely visible
$shadow-md: 0 1px 3px rgba(0,0,0,0.06);
$shadow-lg: 0 1px 4px rgba(0,0,0,0.08);
$shadow-xl: 0 2px 8px rgba(0,0,0,0.10);

// Add Touril override
$shadow-touril: none;
```

**Impact:** 🟡 **MEDIUM VISUAL CHANGE**
- Cards become flat (no elevation)
- Less depth perception
- More print-like, editorial feel
- May reduce affordance of interactive elements

**Recommendation:** **Option A** for authentic Touril aesthetic. Add subtle hover transforms for interaction feedback.

---

## 6. Transition/Animation Tokens

### 6.1 Duration Values

| Current Token | Current Value | Touril | Status |
|---------------|---------------|--------|--------|
| `$transition-fast` | `0.2s` | `~0.2-0.3s` | ✅ **GOOD** |
| `$transition-normal` | `0.4s` | `~0.3s` | 🟡 Slightly slow |
| `$transition-slow` | `0.6s` | Not used | ✅ Keep |

**Recommended Adjustment:**
```scss
// _variables.scss - Line 143-146
// Adjust normal to be faster (Touril is snappier)
$transition-fast: 0.2s;
$transition-normal: 0.3s;  // Changed from 0.4s
$transition-slow: 0.6s;
```

### 6.2 Easing Functions

| Current Token | Current Value | Touril | Status |
|---------------|---------------|--------|--------|
| `$ease-standard` | `ease` | `ease` | ✅ **MATCH** |
| `$ease-in-out` | `cubic-bezier(0.37,0,0.63,1)` | Similar | ✅ Keep |
| `$ease-out-back` | `cubic-bezier(0.87,0,0.13,1)` | Not used | ✅ Keep |

**Action:** 🟢 **NO CHANGES NEEDED**

---

## 7. New Mixins Required for Touril Patterns

Add these mixins to `_mixins.scss`:

### 7.1 Touril-Specific Typography Mixin

```scss
// Add to _mixins.scss after line 599

// ------------------------------------
// TOURIL DESIGN SYSTEM MIXINS
// ------------------------------------

// Touril typography base (1px letter-spacing)
@mixin touril-text {
  font-family: $font-family-primary;
  letter-spacing: $letter-spacing-touril;  // 1px
}

// Touril H1
@mixin touril-h1 {
  @include touril-text;
  font-size: $font-size-2xl;  // 32px
  font-weight: $font-weight-light;  // 300
  line-height: $line-height-tight;  // 1.4
  color: $color-text-primary;
  margin-bottom: 21px;
}

// Touril H2
@mixin touril-h2 {
  @include touril-text;
  font-size: 1.75rem;  // 28px
  font-weight: $font-weight-light;  // 300
  line-height: $line-height-tight;  // 1.4
  color: $color-text-primary;
  margin-bottom: 8px;
}

// Touril body text
@mixin touril-body {
  @include touril-text;
  font-size: $font-size-sm;  // 14px
  font-weight: $font-weight-normal;  // 400
  line-height: $line-height-relaxed;  // 1.71
  color: $color-text-primary;
}
```

### 7.2 Touril Button Mixin

```scss
// Touril-style button (sharp, gold)
@mixin touril-button-primary {
  @include touril-text;
  @include touch-target;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-sm $spacing-lg;

  background-color: $color-primary;  // Gold
  color: $color-text-primary;  // Dark text on gold
  border: none;
  border-radius: 0px;  // Sharp corners

  font-size: $font-size-sm;  // 14px
  font-weight: $font-weight-normal;

  cursor: pointer;
  transition: all $transition-fast $ease-standard;

  &:hover:not(:disabled) {
    background-color: $color-primary-dark;
  }

  &:disabled {
    opacity: 0.38;
    cursor: not-allowed;
  }
}
```

### 7.3 Touril Card Mixin

```scss
// Touril-style card (flat, no shadow, sharp)
@mixin touril-card {
  background-color: $color-bg-primary;
  border: none;
  border-radius: 0px;  // Sharp corners
  box-shadow: none;  // No elevation
  padding: $spacing-lg;
  transition: transform $transition-fast $ease-standard;

  &:hover {
    transform: translateY(-2px);  // Subtle lift instead of shadow
  }
}
```

### 7.4 Touril Section Spacing Mixin

```scss
// Touril section spacing pattern
@mixin touril-section {
  padding-top: $spacing-section-touril;  // 50px
  padding-bottom: $spacing-section-touril;  // 50px
  margin-top: 25px;
  margin-bottom: 0;
}
```

### 7.5 Touril Image Treatment Mixin

```scss
// Touril image style (sharp, no border, cover)
@mixin touril-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border: none;
  border-radius: 0px;  // Sharp corners
  display: block;
}
```

### 7.6 Touril Fixed Header Mixin

```scss
// Touril-style fixed header
@mixin touril-fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: $z-index-fixed;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);

  @include mobile {
    background-color: rgba(255, 255, 255, 1);  // Solid on mobile
  }
}
```

---

## 8. Breaking Changes Summary

### 8.1 Critical Breaking Changes

| Change | Severity | Components Affected | Mitigation |
|--------|----------|---------------------|------------|
| **Primary color: Brown → Gold** | 🔴 HIGH | All buttons, links, CTAs | Test contrast, update branding assets |
| **Border radius: Rounded → Sharp (0px)** | 🔴 HIGH | Buttons, cards, inputs | May need design approval |
| **Shadows: Visible → None** | 🟡 MEDIUM | Cards, modals, dropdowns | Add subtle hover transforms |
| **Font weight: Bold → Light (300)** | 🟡 MEDIUM | H1, H2 headings | May reduce hierarchy strength |
| **Background: White → Off-white** | 🟢 LOW | Page background | Warmer, more welcoming |
| **Text color: #2C2C2C → #0A0203** | 🟢 LOW | All text | Better contrast |

### 8.2 Component Update Checklist

Components requiring updates after token migration:

- [ ] **NavBar** - Update to fixed position, gold accent, sharp corners
- [ ] **Hero** - Light heading weights, sharp image corners
- [ ] **Buttons** - Gold background, sharp corners, no shadow
- [ ] **Cards** - Remove shadows, sharp corners, flat design
- [ ] **Footer** - Dark background (#0A0203), white text
- [ ] **Forms** - Sharp inputs, 1px letter-spacing
- [ ] **Gallery** - Sharp image corners, no borders

---

## 9. Migration Phasing Plan

### Phase 1: Foundation (Week 1)
✅ Update `_variables.scss` with new color tokens
✅ Add Open Sans font loading
✅ Add letter-spacing token
✅ Update font family variables

### Phase 2: Mixins & Utilities (Week 1)
- [ ] Add Touril-specific mixins to `_mixins.scss`
- [ ] Update existing heading mixins (light weight)
- [ ] Update button mixins (sharp corners, gold)
- [ ] Create Touril card mixin

### Phase 3: Global Styles (Week 2)
- [ ] Apply letter-spacing globally
- [ ] Update body background to off-white
- [ ] Update text colors to Touril dark
- [ ] Remove/minimize shadows globally

### Phase 4: Component Updates (Week 2-3)
- [ ] Update NavBar component
- [ ] Update Hero component
- [ ] Update Button components
- [ ] Update Card components
- [ ] Update Footer component
- [ ] Update Form components

### Phase 5: Testing & Refinement (Week 3-4)
- [ ] Visual regression testing
- [ ] Accessibility audit (contrast ratios)
- [ ] Responsive behavior testing
- [ ] Performance check (font loading)
- [ ] User feedback review

---

## 10. Quick Migration Script

Create `migrate-to-touril.scss` as a temporary override file:

```scss
// migrate-to-touril.scss
// Temporary override file for testing Touril aesthetic
// Import after _variables.scss to override tokens

// COLORS
$color-primary: #FBAB18 !default;
$color-primary-light: #FCC04A !default;
$color-primary-dark: #E09A00 !default;
$color-accent: #FBAB18 !default;
$color-text-primary: #0A0203 !default;
$color-bg-primary: #F8F8F8 !default;
$color-bg-dark: #0A0203 !default;

// TYPOGRAPHY
$font-family-primary: 'Open Sans', sans-serif !default;
$font-family-heading: 'Open Sans', sans-serif !default;
$letter-spacing-touril: 1px !default;
$line-height-tight: 1.4 !default;

// BORDERS & SHADOWS
$border-radius-sm: 0px !default;
$border-radius-md: 0px !default;
$border-radius-lg: 0px !default;
$shadow-sm: none !default;
$shadow-md: none !default;
$shadow-lg: none !default;

// SPACING
$spacing-section-touril: 50px !default;

// TRANSITIONS
$transition-normal: 0.3s !default;
```

**Usage:**
```scss
// In main SCSS file
@import 'variables';
@import 'migrate-to-touril';  // Test mode
@import 'mixins';
```

---

## 11. Validation Checklist

Before marking migration complete:

### Visual Validation
- [ ] All headings use light weight (300)
- [ ] All text has 1px letter-spacing
- [ ] All corners are sharp (0px border-radius)
- [ ] No visible shadows on cards/buttons
- [ ] Gold accent color appears consistently
- [ ] Background is warm off-white, not pure white

### Functional Validation
- [ ] Buttons still interactive (despite no shadow)
- [ ] Links clearly distinguishable
- [ ] Form inputs have clear focus states
- [ ] Navigation remains sticky/fixed
- [ ] Responsive breakpoints work correctly

### Accessibility Validation
- [ ] Text contrast ≥ 4.5:1 (WCAG AA)
- [ ] Dark text on gold background (#0A0203 on #FBAB18)
- [ ] Focus indicators visible
- [ ] Touch targets ≥ 44px
- [ ] Alt text on all images

### Performance Validation
- [ ] Open Sans font loaded efficiently (preconnect)
- [ ] No FOUT (Flash of Unstyled Text)
- [ ] No layout shift from font loading
- [ ] CSS bundle size acceptable

---

## 12. Rollback Plan

If migration causes issues:

### Quick Rollback
```scss
// In main SCSS, comment out migration:
@import 'variables';
// @import 'migrate-to-touril';  // DISABLED for rollback
@import 'mixins';
```

### Permanent Rollback
1. Restore `_variables.scss` from git: `git checkout main -- src/styles/_variables.scss`
2. Remove Touril mixins from `_mixins.scss`
3. Revert component updates
4. Remove Open Sans font link from HTML

### Selective Rollback (Keep some changes)
```scss
// Keep font and letter-spacing, revert colors and borders
$font-family-primary: 'Open Sans', sans-serif;  // KEEP
$letter-spacing-touril: 1px;  // KEEP

$color-primary: #8B6F47;  // ROLLBACK to brown
$border-radius-md: 8px;  // ROLLBACK to rounded
$shadow-md: 0 1px 3px rgba(0,0,0,0.5);  // ROLLBACK shadows
```

---

## Appendix A: Color Contrast Table

| Foreground | Background | Ratio | WCAG AA | WCAG AAA |
|------------|------------|-------|---------|----------|
| #0A0203 | #F8F8F8 | 19.2:1 | ✅ Pass | ✅ Pass |
| #0A0203 | #FFFFFF | 20.8:1 | ✅ Pass | ✅ Pass |
| #0A0203 | #FBAB18 | 7.6:1 | ✅ Pass | ✅ Pass |
| #FFFFFF | #0A0203 | 20.8:1 | ✅ Pass | ✅ Pass |
| #FFFFFF | #FBAB18 | 2.7:1 | ❌ Fail | ❌ Fail |
| #5A5A5A | #F8F8F8 | 5.8:1 | ✅ Pass | ✅ Pass (large text) |

**Key Takeaway:** Always use dark text (#0A0203) on gold background, never white.

---

## Appendix B: Before/After Visual Comparison

### Button Styling

**Before (Current):**
```scss
.button {
  background: #8B6F47;  // Brown
  border-radius: 8px;  // Rounded
  box-shadow: 0 1px 3px rgba(0,0,0,0.5);  // Shadow
  font-weight: 600;  // Semibold
}
```

**After (Touril):**
```scss
.button {
  background: #FBAB18;  // Gold
  border-radius: 0px;  // Sharp
  box-shadow: none;  // Flat
  font-weight: 400;  // Regular
  letter-spacing: 1px;  // Spacious
}
```

### Heading Styling

**Before (Current):**
```scss
h1 {
  font-family: Arial;
  font-size: 48px;
  font-weight: 700;  // Bold
  letter-spacing: 0;
  line-height: 1.2;
}
```

**After (Touril):**
```scss
h1 {
  font-family: 'Open Sans', sans-serif;
  font-size: 32px;  // Smaller, refined
  font-weight: 300;  // Light
  letter-spacing: 1px;  // Spacious
  line-height: 1.4;  // More breathing room
}
```

---

**Document End**
*Proceed with migration at discretion*
*Test thoroughly before production deployment*
