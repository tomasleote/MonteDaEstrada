# Implementation Plan: Professional Styling & Advanced Transitions

## Overview

Transform Monte da Estrada website into a premium, professionally animated experience with sophisticated scroll-based transitions, enhanced visual hierarchy, and clean modern design. Remove emoji usage in favor of a proper icon system, and implement complex, smooth transitions between sections that create a polished, high-end feel.

**Current State**: Solid design foundation with basic styling, minimal animations, and emoji icons.

**Target State**: Premium website with scroll-triggered animations, staggered card reveals, parallax effects, smooth section transitions, and professional micro-interactions throughout.

---

## Design Philosophy

### Core Principles

1. **Subtle & Sophisticated**: Animations should enhance, not distract
2. **Performance-First**: Use GPU-accelerated properties (transform, opacity)
3. **Accessibility**: Respect `prefers-reduced-motion` for all animations
4. **Progressive Enhancement**: Site works perfectly without animations
5. **Consistency**: Unified animation timing and easing across all elements

### Animation Strategy

**Timing Scale**:
- **Micro-interactions**: 150-250ms (button hovers, input focus)
- **Component animations**: 400-600ms (card reveals, section fades)
- **Page transitions**: 600-800ms (route changes, modal overlays)
- **Parallax effects**: Tied to scroll position (continuous)

**Easing Functions**:
- **Entrances**: `cubic-bezier(0.16, 1, 0.3, 1)` - "Power Out" feel
- **Exits**: `cubic-bezier(0.7, 0, 0.84, 0)` - "Power In" feel
- **Interactive**: `cubic-bezier(0.4, 0, 0.2, 1)` - Standard easing

---

## Requirements Summary

### Critical Requirements
- ✅ **Fix SCSS deprecation warnings** (Dart Sass 3.0.0 compatibility)
- ✅ Remove all emoji usage, replace with professional icon system
- ✅ Implement scroll-based animations on all page sections
- ✅ Add sophisticated transitions between sections
- ✅ Staggered card/grid item animations
- ✅ Enhanced button and interactive element micro-interactions
- ✅ Smooth page transition animations between routes
- ✅ Parallax effects on hero and secondary sections
- ✅ Professional form field animations
- ✅ Loading states and skeleton screens
- ✅ Accessibility-first approach (reduced motion support)

### Nice-to-Have Features
- Scroll progress indicator
- Counter animations for statistics
- Typing animation effects (optional)
- 3D transform card effects
- Image blur-up loading technique
- Advanced parallax with multiple layers

---

## Research Findings

### Animation Libraries Comparison

#### Option 1: AOS (Animate On Scroll) ⭐ **RECOMMENDED**

**Overview**: Lightweight library (13KB) for scroll-based animations with CSS-driven approach.

**Pros**:
- ✅ **Lightweight**: 13KB minified, CSS-based animations
- ✅ **Easy setup**: Add data attributes, initialize once
- ✅ **60+ animations**: Fade, slide, zoom, flip effects
- ✅ **Responsive**: Disable on mobile if desired
- ✅ **Accessibility**: Built-in `prefers-reduced-motion` support
- ✅ **No dependencies**: Pure JavaScript
- ✅ **Anchor placement**: Control when animation triggers
- ✅ **Easing options**: Multiple easing functions included

**Cons**:
- ⚠️ Limited to scroll-based animations (perfect for our use case)
- ⚠️ Less flexible than full animation libraries

**Best For**: Scroll-triggered section animations, card reveals, staggered grids

**Resources**:
- [AOS GitHub](https://github.com/michalsnik/aos)
- [AOS Demo](https://michalsnik.github.io/aos/)
- [AOS NPM](https://www.npmjs.com/package/aos)

---

#### Option 2: Framer Motion

**Overview**: Production-ready React animation library with declarative API.

**Pros**:
- ✅ **React-first**: Designed specifically for React
- ✅ **Declarative**: Animate components with simple props
- ✅ **Gesture support**: Drag, pan, tap animations
- ✅ **Layout animations**: Automatic layout transitions
- ✅ **Variants**: Coordinated animations across components
- ✅ **Spring physics**: Natural motion with spring animations

**Cons**:
- ⚠️ **Bundle size**: ~30KB (larger than AOS)
- ⚠️ **Learning curve**: More concepts to learn
- ⚠️ **Overkill**: Too powerful for simple scroll animations

**Best For**: Complex interactive animations, gesture-based UIs, SPAs with heavy animation needs

---

#### Option 3: React Spring

**Overview**: Spring-physics-based animation library for React.

**Pros**:
- ✅ **Physics-based**: Natural, realistic motion
- ✅ **Performant**: Uses native interpolation
- ✅ **Flexible**: Imperative and declarative APIs

**Cons**:
- ⚠️ **Bundle size**: ~28KB
- ⚠️ **Complex API**: Steeper learning curve
- ⚠️ **Unnecessary**: Physics not needed for scroll animations

**Best For**: Interactive UIs with physics-based motion, drag-and-drop

---

### Technology Decision: Framer Motion + react-scroll-parallax ⭐

**Recommendation**: Use **Framer Motion** for advanced animations and **react-scroll-parallax** for specialized parallax effects.

**Rationale**:
1. **100% Free**: Both libraries are MIT licensed with no limitations
2. **Professional Quality**: Industry-standard tools for premium websites
3. **Advanced Parallax**: Framer Motion's useScroll/useTransform for complex scroll-linked animations
4. **Specialized Parallax**: react-scroll-parallax optimized for performance (52K+ weekly downloads)
5. **React-First**: Designed specifically for React, not CSS wrappers
6. **Type-Safe**: Full TypeScript support for better DX
7. **Accessibility**: Built-in reduced motion support

**Hybrid Approach**:
- **Framer Motion**: Micro-interactions, page transitions, scroll-triggered animations, complex parallax
- **react-scroll-parallax**: Specialized parallax effects for images and sections
- **Font Awesome Free**: Professional icon system (not emoji or generic react-icons)

---

## Icon System Recommendation

### Replace Emojis with Font Awesome Free

**Library**: `@fortawesome/react-fontawesome` + `@fortawesome/free-solid-svg-icons` + `@fortawesome/free-regular-svg-icons`

**Why Font Awesome Specifically**:
- ✅ Industry-standard icon library (most recognized globally)
- ✅ 2,000+ free icons in solid and regular styles
- ✅ Tree-shakeable (only bundle icons you import)
- ✅ Perfect for guest house website (home, bed, location, etc.)
- ✅ Consistent sizing and styling
- ✅ Accessibility built-in (aria-label, role)
- ✅ Professional appearance matching brand guidelines
- ✅ Official React integration with FontAwesomeIcon component

**Icon Examples for Monte da Estrada**:
- **faHome, faBed, faHouseUser** (Accommodations)
- **faUmbrellaBeach, faWater, faPersonHiking** (Activities)
- **faMapLocationDot, faRoad, faCar** (Location)
- **faUtensils, faWineGlass, faLandmark** (Dining & Culture)
- **faWifi, faParking, faKitchenSet** (Amenities)

**Migration**:
- Replace emoji in JSON data with Font Awesome icon names
- Create Icon component using FontAwesomeIcon
- Update all pages to use proper FA icons instead of emojis

---

## Implementation Tasks

### Phase 0: Fix SCSS Deprecation Warnings (Est: 1-2 hours) ⚠️ **CRITICAL**

**Priority**: MUST be completed first before any other phases. Dart Sass 3.0.0 will remove deprecated features.

#### 0.1 Understand Deprecation Issues

**Current Problems**:

1. **`@import` Rule Deprecation**:
   - Sass `@import` is deprecated in favor of `@use` and `@forward`
   - Will be removed in Dart Sass 3.0.0
   - Affects all `.scss` files that use `@import '@/styles/variables'` or `@import '@/styles/mixins'`

2. **Global Color Function Deprecation**:
   - `darken()`, `lighten()`, `saturate()`, etc. are deprecated
   - Must use `color.adjust()` or `color.scale()` from `sass:color` module
   - Currently affects `ContactForm.module.scss` (line 77, 87)

**Files Affected**: 40+ SCSS files across the project

**Resources**:
- [Sass @use Documentation](https://sass-lang.com/documentation/at-rules/use)
- [Sass Color Module](https://sass-lang.com/documentation/modules/color)
- [Migration Guide](https://sass-lang.com/documentation/breaking-changes/import)

**Dependencies**: None - must be done first

---

#### 0.2 Create Modern SCSS Index Files

**Description**: Replace `_variables.scss` and `_mixins.scss` with modern module system

**Files to create**:
- `src/styles/_index.scss` - Main export file using `@forward`
- Keep `_variables.scss` and `_mixins.scss` but update imports within them

**New Index File** (`src/styles/_index.scss`):
```scss
// Monte da Estrada - SCSS Module Exports
// Modern Sass module system using @forward
// Replaces deprecated @import statements

// Forward all design tokens
@forward './variables';

// Forward all mixins
@forward './mixins';
```

**Dependencies**: Task 0.1 complete

---

#### 0.3 Update _mixins.scss to Use @use

**Description**: Replace internal `@import` with `@use` in mixins file

**File to modify**: `src/styles/_mixins.scss`

**Before** (line 5):
```scss
@import './variables';
```

**After**:
```scss
@use './variables' as *;
```

**What `as *` does**: Imports all variables into current namespace without prefix

**Dependencies**: Task 0.2 complete

---

#### 0.4 Fix Color Function Deprecations

**Description**: Replace deprecated `darken()` with modern `color.adjust()` or `color.scale()`

**File to modify**: `src/components/ContactForm/ContactForm.module.scss`

**Add at top of file**:
```scss
@use 'sass:color';
@use '@/styles' as *;
```

**Line 77 - Before**:
```scss
color: darken($color-success, 15%);
```

**Line 77 - After**:
```scss
color: color.adjust($color-success, $lightness: -15%);
```

**Line 87 - Before**:
```scss
color: darken($color-error, 10%);
```

**Line 87 - After**:
```scss
color: color.adjust($color-error, $lightness: -10%);
```

**Understanding the difference**:
- `darken($color, 15%)` - Old way (deprecated)
- `color.adjust($color, $lightness: -15%)` - New way (adjusts by exact amount)
- `color.scale($color, $lightness: -30%)` - Alternative (scales relative to current)

**Dependencies**: Task 0.2 complete

---

#### 0.5 Update Global SCSS to Use @use

**Description**: Replace `@import` with `@use` in global.scss

**File to modify**: `src/styles/global.scss`

**Before** (lines 8-9):
```scss
@import './variables';
@import './mixins';
```

**After**:
```scss
@use './variables' as *;
@use './mixins' as *;
```

**Dependencies**: Task 0.3 complete

---

#### 0.6 Create SCSS Migration Script

**Description**: Automated script to update all component SCSS files

**File to create**: `scripts/migrate-scss.js`

```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all .scss files except in node_modules
const scssFiles = glob.sync('monte-da-estrada/src/**/*.scss', {
  ignore: ['**/node_modules/**', '**/dist/**']
});

console.log(`Found ${scssFiles.length} SCSS files to migrate\n`);

scssFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;

  // Replace @import '@/styles/variables' with @use
  if (content.includes("@import '@/styles/variables'")) {
    content = content.replace(
      /@import\s+['"]@\/styles\/variables['"]\s*;/g,
      "@use '@/styles' as *;"
    );
    modified = true;
  }

  // Replace @import '@/styles/mixins' (remove since included in index)
  if (content.includes("@import '@/styles/mixins'")) {
    content = content.replace(
      /@import\s+['"]@\/styles\/mixins['"]\s*;/g,
      ""
    );
    modified = true;
  }

  // Replace @import './variables' in _mixins.scss and global.scss
  if (content.includes("@import './variables'")) {
    content = content.replace(
      /@import\s+['"]\.\/ variables['"]\s*;/g,
      "@use './variables' as *;"
    );
    modified = true;
  }

  // Replace @import './mixins' in global.scss
  if (content.includes("@import './mixins'")) {
    content = content.replace(
      /@import\s+['"]\.\/ mixins['"]\s*;/g,
      "@use './mixins' as *;"
    );
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✓ Migrated: ${file}`);
  }
});

console.log(`\nMigration complete! Updated ${scssFiles.length} files.`);
console.log('Run: npm run dev to verify no errors.');
```

**Run migration**:
```bash
node scripts/migrate-scss.js
```

**Dependencies**: Task 0.5 complete

---

#### 0.7 Manual Migration of Component Files

**Description**: If script doesn't work perfectly, manually update key files

**Pattern to follow for ALL component .module.scss files**:

**Before**:
```scss
@import '@/styles/variables';
@import '@/styles/mixins';
```

**After**:
```scss
@use '@/styles' as *;
```

**Files to update manually** (if needed):
- `src/components/NavBar/NavBar.module.scss`
- `src/components/Footer/Footer.module.scss`
- `src/components/Hero/Hero.module.scss`
- `src/components/Card/Card.module.scss`
- `src/components/Button/Button.module.scss`
- `src/components/Container/Container.module.scss`
- `src/components/Grid/Grid.module.scss`
- `src/components/Section/Section.module.scss`
- `src/components/ContactForm/ContactForm.module.scss`
- `src/components/LoadingSpinner/LoadingSpinner.module.scss`
- `src/pages/HomePage/HomePage.module.scss`
- `src/pages/QuartosPage/QuartosPage.module.scss`
- All other page .module.scss files

**Dependencies**: Task 0.6 complete (try script first)

---

#### 0.8 Test Build After Migration

**Description**: Verify no SCSS compilation errors after migration

**Steps**:
```bash
# Clean previous build
rm -rf monte-da-estrada/dist

# Run development server
cd monte-da-estrada
npm run dev

# Check console for warnings
# Should see ZERO deprecation warnings

# Test production build
npm run build

# Verify build succeeds
```

**Expected Result**:
- ✅ No deprecation warnings
- ✅ Build completes successfully
- ✅ All styles render correctly
- ✅ No visual regressions

**If errors occur**:
1. Check console for specific file/line
2. Verify `@use '@/styles' as *;` at top of file
3. Ensure `_index.scss` forwards both variables and mixins
4. Check for circular dependencies

**Dependencies**: Task 0.7 complete

---

#### 0.9 Update Any Custom Color Manipulations

**Description**: Find and fix any other color function usage across codebase

**Search for deprecated functions**:
```bash
# Search for darken, lighten, saturate, etc.
grep -r "darken(" monte-da-estrada/src/styles
grep -r "lighten(" monte-da-estrada/src/styles
grep -r "saturate(" monte-da-estrada/src/styles
grep -r "desaturate(" monte-da-estrada/src/styles
grep -r "fade-in(" monte-da-estrada/src/styles
grep -r "fade-out(" monte-da-estrada/src/styles
grep -r "opacify(" monte-da-estrada/src/styles
grep -r "transparentize(" monte-da-estrada/src/styles
```

**Replacement guide**:
```scss
// Add to top of file if using color functions
@use 'sass:color';
@use '@/styles' as *;

// Old → New
darken($color, 10%) → color.adjust($color, $lightness: -10%)
lighten($color, 10%) → color.adjust($color, $lightness: 10%)
saturate($color, 20%) → color.adjust($color, $saturation: 20%)
desaturate($color, 20%) → color.adjust($color, $saturation: -20%)
fade-in($color, 0.3) → color.adjust($color, $alpha: 0.3)
fade-out($color, 0.3) → color.adjust($color, $alpha: -0.3)
opacify($color, 0.3) → color.adjust($color, $alpha: 0.3)
transparentize($color, 0.3) → color.adjust($color, $alpha: -0.3)
```

**Dependencies**: Task 0.8 complete

---

#### 0.10 Document SCSS Module Pattern

**Description**: Update project documentation with new SCSS import pattern

**File to update**: `CLAUDE.md` (project guidelines)

**Add section**:
```markdown
### SCSS Module System (Updated 2026)

**Modern Import Pattern**:
```scss
// ✅ Correct (Dart Sass 3.0+ compatible)
@use '@/styles' as *;

// ❌ Deprecated (will be removed)
@import '@/styles/variables';
@import '@/styles/mixins';
```

**Color Functions**:
```scss
// ✅ Correct
@use 'sass:color';
color.adjust($color-primary, $lightness: -10%)

// ❌ Deprecated
darken($color-primary, 10%)
```

**Why this matters**:
- Sass `@import` will be removed in Dart Sass 3.0.0
- `@use` provides better encapsulation and performance
- Color functions moved to `sass:color` module
- Prevents naming conflicts in large projects
```

**Dependencies**: Task 0.9 complete

---

### Phase 1: Foundation Setup (Est: 2-3 hours)

#### 1.1 Install Animation Dependencies

**Description**: Add Framer Motion, react-scroll-parallax, and Font Awesome libraries

**Steps**:
```bash
cd monte-da-estrada
npm install framer-motion@latest
npm install react-scroll-parallax@^3.4.5
npm install @fortawesome/react-fontawesome@latest
npm install @fortawesome/free-solid-svg-icons@latest
npm install @fortawesome/free-regular-svg-icons@latest
```

**Bundle Size Impact**:
- Framer Motion: ~30KB (gzipped)
- react-scroll-parallax: ~8KB (gzipped)
- Font Awesome (tree-shaken): ~5KB per icon set used
- **Total**: ~40-50KB increase (acceptable for professional animations)

**Files to modify**:
- `package.json` - Dependencies added automatically

**Dependencies**: None

---

#### 1.2 Create Enhanced Animation Utilities

**Description**: Extend SCSS variables with new animation utilities and improved easing functions

**File to modify**: `src/styles/_variables.scss`

**Add Animation Variables**:
```scss
// ------------------------------------
// ADVANCED ANIMATIONS
// ------------------------------------
// Enhanced easing functions
$ease-power-in: cubic-bezier(0.7, 0, 0.84, 0);
$ease-power-out: cubic-bezier(0.16, 1, 0.3, 1);
$ease-power-in-out: cubic-bezier(0.87, 0, 0.13, 1);
$ease-expo-out: cubic-bezier(0.19, 1, 0.22, 1);
$ease-back-in: cubic-bezier(0.6, -0.28, 0.735, 0.045);
$ease-back-out: cubic-bezier(0.175, 0.885, 0.32, 1.275);

// Animation durations (granular)
$duration-instant: 0.1s;
$duration-micro: 0.15s;
$duration-quick: 0.2s;
$duration-base: 0.4s;
$duration-moderate: 0.6s;
$duration-slow: 0.8s;
$duration-slower: 1s;
$duration-slowest: 1.2s;

// Stagger delays
$stagger-delay-xs: 0.05s;
$stagger-delay-sm: 0.1s;
$stagger-delay-md: 0.15s;
$stagger-delay-lg: 0.2s;

// Hover transforms
$hover-lift: translateY(-4px);
$hover-lift-large: translateY(-8px);
$hover-scale-small: scale(1.02);
$hover-scale-medium: scale(1.05);
$hover-scale-large: scale(1.1);
```

**Dependencies**: Task 1.1 complete

---

#### 1.3 Create Advanced Animation Mixins

**Description**: Add sophisticated animation mixins to SCSS toolkit

**File to modify**: `src/styles/_mixins.scss`

**Add Animation Mixins**:
```scss
// ------------------------------------
// ADVANCED ANIMATION MIXINS
// ------------------------------------

// Smooth hardware-accelerated transform
@mixin gpu-accelerate {
  transform: translateZ(0);
  will-change: transform, opacity;
  backface-visibility: hidden;
}

// Card lift animation with shadow
@mixin hover-lift($distance: 4px, $shadow-size: lg) {
  transition: transform $duration-quick $ease-power-out,
              box-shadow $duration-quick $ease-power-out;

  &:hover {
    transform: translateY(-#{$distance});
    @if $shadow-size == sm {
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    } @else if $shadow-size == md {
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
    } @else if $shadow-size == lg {
      box-shadow: 0 16px 32px rgba(0, 0, 0, 0.2);
    }
  }
}

// Stagger animation delays for children
@mixin stagger-animation($delay: $stagger-delay-sm, $max-children: 12) {
  @for $i from 1 through $max-children {
    &:nth-child(#{$i}) {
      animation-delay: #{$delay * $i};
      transition-delay: #{$delay * $i};
    }
  }
}

// Fade in with slide up
@mixin fade-slide-in($distance: 40px, $duration: $duration-base) {
  opacity: 0;
  transform: translateY($distance);
  transition: opacity $duration $ease-power-out,
              transform $duration $ease-power-out;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
}

// Scale fade in
@mixin scale-fade-in($scale-from: 0.9, $duration: $duration-base) {
  opacity: 0;
  transform: scale($scale-from);
  transition: opacity $duration $ease-power-out,
              transform $duration $ease-power-out;

  &.visible {
    opacity: 1;
    transform: scale(1);
  }
}

// Button press animation
@mixin button-press {
  transition: transform $duration-micro $ease-power-out;

  &:active {
    transform: scale(0.96);
  }
}

// Shimmer loading animation
@mixin shimmer-loading {
  background: linear-gradient(
    90deg,
    $color-bg-secondary 0%,
    lighten($color-bg-secondary, 5%) 50%,
    $color-bg-secondary 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

// Pulse animation
@mixin pulse($scale: 1.05, $duration: 2s) {
  animation: pulse-animation $duration $ease-standard infinite;

  @keyframes pulse-animation {
    0%, 100% { transform: scale(1); }
    50% { transform: scale($scale); }
  }
}

// Floating animation
@mixin float($distance: 10px, $duration: 3s) {
  animation: float-animation $duration $ease-in-out infinite;

  @keyframes float-animation {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-#{$distance}); }
  }
}

// Smooth underline animation
@mixin underline-animation($color: $color-primary, $height: 2px) {
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: $height;
    background-color: $color;
    transition: width $duration-quick $ease-power-out;
  }

  &:hover::after {
    width: 100%;
  }
}

// Skeleton loading placeholder
@mixin skeleton {
  @include shimmer-loading;
  border-radius: $border-radius-sm;

  &::before {
    content: '\00a0'; // Non-breaking space
  }
}
```

**Dependencies**: Task 1.2 complete

---

#### 1.4 Initialize Parallax Provider in React App

**Description**: Set up react-scroll-parallax ParallaxProvider wrapper

**File to modify**: `src/main.jsx`

**Changes**:
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ParallaxProvider } from 'react-scroll-parallax'
import App from './App.jsx'
import './styles/global.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ParallaxProvider>
          <App />
        </ParallaxProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
```

**Why ParallaxProvider?**:
- Wraps app to enable `useParallax()` and `<Parallax>` components
- Manages scroll event listeners efficiently
- Provides parallax context to all child components
- Automatically handles cleanup

**Dependencies**: Task 1.1 complete (react-scroll-parallax installed)

---

#### 1.5 Create Icon System Components

**Description**: Build reusable icon rendering system to replace emojis

**Files to create**:
- `src/components/Icon/Icon.jsx`
- `src/components/Icon/Icon.module.scss`
- `src/components/Icon/index.js`

**Icon Component** (`Icon.jsx`):
```jsx
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faBed,
  faHouseUser,
  faUmbrellaBeach,
  faWater,
  faPersonHiking,
  faMapLocationDot,
  faRoad,
  faCar,
  faUtensils,
  faWineGlass,
  faLandmark,
  faWifi,
  faSquareParking,
  faKitchenSet,
  faTree,
  faMountain,
  faBicycle,
  faBinoculars,
  faDove,
  faCalendarDays,
  faEnvelope,
  faPhone,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';

import styles from './Icon.module.scss';

// Icon map - maps string names to Font Awesome icon definitions
const ICON_MAP = {
  // Accommodations
  'home': faHouse,
  'house': faHouseUser,
  'bed': faBed,

  // Activities & Nature
  'beach': faUmbrellaBeach,
  'water': faWater,
  'hiking': faPersonHiking,
  'mountain': faMountain,
  'tree': faTree,
  'biking': faBicycle,
  'bird': faDove,
  'binoculars': faBinoculars,

  // Location & Navigation
  'location': faMapLocationDot,
  'map': faMapLocationDot,
  'road': faRoad,
  'car': faCar,
  'pin': faLocationDot,

  // Dining & Culture
  'restaurant': faUtensils,
  'dining': faUtensils,
  'wine': faWineGlass,
  'landmark': faLandmark,
  'museum': faLandmark,

  // Amenities
  'wifi': faWifi,
  'parking': faSquareParking,
  'kitchen': faKitchenSet,

  // General
  'calendar': faCalendarDays,
  'event': faCalendarDays,
  'email': faEnvelope,
  'phone': faPhone,
};

/**
 * Icon component - Renders Font Awesome icons
 * @param {string} name - Icon name (e.g., 'beach', 'hiking', 'home')
 * @param {string} size - Size variant (xs, sm, md, lg, xl, 2xl, 3xl)
 * @param {string} color - Color variant (primary, secondary, accent, inherit, white)
 * @param {string} className - Additional CSS classes
 * @param {string} ariaLabel - Accessibility label
 */
const Icon = ({ name, size = 'md', color = 'inherit', className = '', ariaLabel }) => {
  const iconDefinition = ICON_MAP[name.toLowerCase()];

  if (!iconDefinition) {
    console.warn(`Icon "${name}" not found in Font Awesome ICON_MAP. Available icons:`, Object.keys(ICON_MAP).join(', '));
    return null;
  }

  const iconClasses = [
    styles.icon,
    styles[`icon--${size}`],
    styles[`icon--${color}`],
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={iconClasses} aria-label={ariaLabel || name} role="img">
      <FontAwesomeIcon icon={iconDefinition} />
    </span>
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']),
  color: PropTypes.oneOf(['primary', 'secondary', 'accent', 'inherit', 'white']),
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
};

export default Icon;
```

**Icon Styles** (`Icon.module.scss`):
```scss
@import '@/styles/variables';

.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  // Size variants
  &--xs {
    width: 12px;
    height: 12px;
  }

  &--sm {
    width: 16px;
    height: 16px;
  }

  &--md {
    width: 24px;
    height: 24px;
  }

  &--lg {
    width: 32px;
    height: 32px;
  }

  &--xl {
    width: 48px;
    height: 48px;
  }

  &--2xl {
    width: 64px;
    height: 64px;
  }

  &--3xl {
    width: 80px;
    height: 80px;
  }

  // Color variants
  &--primary {
    color: $color-primary;
  }

  &--secondary {
    color: $color-secondary;
  }

  &--accent {
    color: $color-accent;
  }

  &--white {
    color: $color-text-light;
  }

  &--inherit {
    color: inherit;
  }
}
```

**Export barrel** (`index.js`):
```js
export { default } from './Icon';
```

**Dependencies**: Task 1.1 complete (react-icons installed)

---

### Phase 2: Remove Emoji & Implement Icon System (Est: 2-3 hours)

#### 2.1 Update JSON Data Files to Use Icon Names

**Description**: Replace all emoji in JSON files with icon name strings

**Files to modify**:
- `src/data/home.json`
- `src/data/atividades.json`

**Before** (`home.json`):
```json
{
  "highlights": [
    {
      "icon": "🌾",
      "title": "Tranquilidade Alentejana"
    }
  ]
}
```

**After** (`home.json`):
```json
{
  "highlights": [
    {
      "icon": "tree",
      "title": "Tranquilidade Alentejana"
    }
  ]
}
```

**Emoji to Icon Mapping**:
- 🌾 → `"tree"`
- 🌳 → `"tree"`
- 🏡 → `"home"`
- 🌊 → `"beach"`
- 🏖️ → `"beach"`
- 🥾 → `"hiking"`
- 🏛️ → `"museum"`
- 🍷 → `"wine"`
- 🦅 → `"bird"`
- 🚴 → `"biking"`

**Dependencies**: Task 1.5 complete (Icon component created)

---

#### 2.2 Update HomePage to Use Icon Component

**Description**: Replace emoji rendering with Icon component

**File to modify**: `src/pages/HomePage/HomePage.jsx`

**Before**:
```jsx
<div className={styles.highlightIcon}>{highlight.icon}</div>
```

**After**:
```jsx
import Icon from '@/components/Icon';

// In render:
<Icon name={highlight.icon} size="xl" color="primary" />
```

**Dependencies**: Task 2.1 complete

---

#### 2.3 Update AtividadesPage to Use Icon Component

**Description**: Replace activity emoji with Icon component

**File to modify**: `src/pages/AtividadesPage/AtividadesPage.jsx`

**Changes**: Similar to HomePage - replace emoji with `<Icon />` component

**Dependencies**: Task 2.1 complete

---

#### 2.4 Remove Inline Emojis from Components

**Description**: Find and replace all inline emoji usage in JSX

**Files to search and update**:
- `src/pages/QuartosPage/QuartosPage.jsx` (📷)
- `src/components/Slideshow/Slideshow.jsx` (🔍)
- Admin pages (if any emoji remain)

**Replacement Strategy**:
- Image placeholder emoji → Proper placeholder component or icon
- Zoom indicator emoji → Icon component with magnifying glass icon

**Dependencies**: Task 1.5 complete

---

### Phase 3: Implement Section Scroll Animations (Est: 3-4 hours)

#### 3.1 Add Framer Motion to HomePage Sections

**Description**: Add scroll-triggered animations to HomePage using Framer Motion

**File to modify**: `src/pages/HomePage/HomePage.jsx`

**Changes**:
```jsx
import { motion } from 'framer-motion';

// Animation variants for reusability
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const fadeInSide = (direction) => ({
  hidden: { opacity: 0, x: direction === 'left' ? -40 : 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
});

{/* Welcome Section - Fade in from bottom */}
<Section padding="large">
  <Container>
    <motion.div
      className={styles.welcome}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.h2
        className={styles.welcomeTitle}
        variants={fadeInUp}
      >
        {homeData.welcome.title}
      </motion.h2>
      {homeData.welcome.paragraphs.map((paragraph, index) => (
        <motion.p
          key={index}
          className={styles.welcomeText}
          variants={fadeInUp}
          transition={{ delay: index * 0.1 }}
        >
          {paragraph}
        </motion.p>
      ))}
    </motion.div>
  </Container>
</Section>

{/* Highlights Section - Cards fade in with stagger */}
<Section background="light" padding="large">
  <Container>
    <motion.h2
      className={styles.sectionTitle}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      Porquê Escolher o Monte da Estrada?
    </motion.h2>
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
    >
      <Grid columns={4} gap="large">
        {homeData.highlights.map((highlight, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <Card>
              <Icon name={highlight.icon} size="xl" color="primary" />
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>
            </Card>
          </motion.div>
        ))}
      </Grid>
    </motion.div>
  </Container>
</Section>

{/* Information Section - Slide in from sides */}
<Section padding="large">
  <Container>
    <motion.h2
      className={styles.sectionTitle}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      {homeData.information.title}
    </motion.h2>
    <Grid columns={3} gap="large">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInSide('left')}
      >
        {/* Check-in info */}
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        {/* House rules */}
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInSide('right')}
      >
        {/* Check-out info */}
      </motion.div>
    </Grid>
  </Container>
</Section>
```

**Dependencies**: Task 1.1 complete (Framer Motion installed)

---

#### 3.2 Add AOS Attributes to QuartosPage

**Description**: Add animations to rooms, facilities, and pricing sections

**File to modify**: `src/pages/QuartosPage/QuartosPage.jsx`

**Animation Strategy**:
- Room cards: Alternate `fade-right` and `fade-left`
- Facilities grid: Staggered `fade-up` with delays
- Pricing cards: `zoom-in` effect with stagger
- Form section: `fade-up` with longer duration

**Example**:
```jsx
{/* Rooms - Alternating sides */}
{quartosData.rooms.map((room, index) => (
  <div
    key={room.id}
    data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
    data-aos-duration="800"
  >
    {/* Room content */}
  </div>
))}

{/* Facilities - Staggered grid */}
{quartosData.facilities.map((facility, index) => (
  <Card
    key={index}
    data-aos="fade-up"
    data-aos-delay={index * 50}
  >
    {/* Facility content */}
  </Card>
))}

{/* Pricing cards - Zoom in */}
{quartosData.pricing.seasons.map((season, index) => (
  <div
    key={index}
    data-aos="zoom-in"
    data-aos-delay={index * 100}
  >
    {/* Season pricing */}
  </div>
))}
```

**Dependencies**: Task 3.1 complete

---

#### 3.3 Add AOS Attributes to AtividadesPage

**Description**: Animate activity cards and amenity grids

**File to modify**: `src/pages/AtividadesPage/AtividadesPage.jsx`

**Animation Strategy**:
- Activity cards: `fade-up` with stagger
- Category icons: `zoom-in` effect
- Amenities grid: Staggered `slide-up`

**Dependencies**: Task 3.1 complete

---

#### 3.4 Add AOS Attributes to RedondezasPage

**Description**: Animate beaches, towns, restaurants, festivals sections

**File to modify**: `src/pages/RedondezasPage/RedondezasPage.jsx`

**Animation Strategy**:
- Section headers: `fade-down`
- Beach/town cards: Alternating left/right
- Restaurant cards: `fade-up` with stagger
- Festival timeline: `fade-left` sequential

**Dependencies**: Task 3.1 complete

---

#### 3.5 Add AOS Attributes to LocalizacaoPage

**Description**: Animate map, directions, distances sections

**File to modify**: `src/pages/LocalizacaoPage/LocalizacaoPage.jsx`

**Animation Strategy**:
- Map section: `fade-right`
- Address box: `fade-left`
- Direction cards: `slide-up` with stagger
- Distance items: `fade-up` sequential

**Dependencies**: Task 3.1 complete

---

#### 3.6 Add AOS Attributes to GaleriaPage

**Description**: Animate gallery filters and photography info

**File to modify**: `src/pages/GaleriaPage/GaleriaPage.jsx`

**Animation Strategy**:
- Filter buttons: `fade-down` with stagger
- Slideshow container: `zoom-in`
- Photography info: `fade-up`

**Dependencies**: Task 3.1 complete

---

### Phase 4: Enhanced Micro-Interactions (Est: 2-3 hours)

#### 4.1 Enhanced Button Animations

**Description**: Upgrade button hover states with sophisticated animations

**File to modify**: `src/styles/_mixins.scss`

**Update Button Mixins**:
```scss
@mixin button-primary {
  @include button-base;
  @include button-press;
  @include gpu-accelerate;
  background-color: $color-primary;
  color: $color-text-light;
  position: relative;
  overflow: hidden;
  transition: all $duration-quick $ease-power-out;

  // Ripple effect on hover
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width $duration-moderate $ease-power-out,
                height $duration-moderate $ease-power-out;
  }

  &:hover:not(:disabled) {
    background-color: $color-primary-dark;
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba($color-primary, 0.3);

    &::before {
      width: 300px;
      height: 300px;
    }
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba($color-primary, 0.2);
  }
}

@mixin button-outline {
  @include button-base;
  @include button-press;
  @include gpu-accelerate;
  background-color: transparent;
  color: $color-primary;
  border: $border-width-medium solid $color-primary;
  position: relative;
  overflow: hidden;
  transition: all $duration-quick $ease-power-out;

  // Fill animation on hover
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background-color: $color-primary;
    transition: left $duration-base $ease-power-out;
    z-index: -1;
  }

  &:hover:not(:disabled) {
    color: $color-text-light;
    border-color: $color-primary;

    &::before {
      left: 0;
    }
  }
}
```

**Dependencies**: Task 1.3 complete (animation mixins created)

---

#### 4.2 Enhanced Card Hover Effects

**Description**: Add sophisticated card animations on hover

**File to modify**: `src/components/Card/Card.module.scss`

**Update Card Styles**:
```scss
@import '@/styles/variables';
@import '@/styles/mixins';

.card {
  @include card;
  @include gpu-accelerate;
  transition: transform $duration-quick $ease-power-out,
              box-shadow $duration-quick $ease-power-out;
  position: relative;

  // Subtle shine effect on hover
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 70%
    );
    transform: translateX(-100%);
    transition: transform $duration-slow $ease-standard;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);

    &::before {
      transform: translateX(100%);
    }
  }
}
```

**Dependencies**: None (can run in parallel)

---

#### 4.3 Form Field Animations

**Description**: Add floating label and focus animations to form inputs

**File to modify**: `src/components/ContactForm/ContactForm.module.scss`

**Enhanced Form Styles**:
```scss
@import '@/styles/variables';
@import '@/styles/mixins';

.formGroup {
  position: relative;
  margin-bottom: $spacing-xl;
}

.input,
.textarea {
  width: 100%;
  padding: $spacing-md $spacing-md $spacing-sm;
  font-size: $font-size-base;
  color: $color-text-primary;
  border: 2px solid $color-border-light;
  border-radius: $border-radius-sm;
  background-color: $color-bg-primary;
  transition: all $duration-quick $ease-power-out;
  outline: none;

  // Floating label effect
  &:focus,
  &:not(:placeholder-shown) {
    border-color: $color-primary;
    padding-top: $spacing-lg;

    + .label {
      top: $spacing-sm;
      font-size: $font-size-xs;
      color: $color-primary;
    }
  }

  // Glow effect on focus
  &:focus {
    box-shadow: 0 0 0 4px rgba($color-primary, 0.1);
  }

  // Error state
  &.error {
    border-color: $color-error;

    &:focus {
      box-shadow: 0 0 0 4px rgba($color-error, 0.1);
    }

    + .label {
      color: $color-error;
    }
  }

  // Success state
  &.success {
    border-color: $color-success;

    &:focus {
      box-shadow: 0 0 0 4px rgba($color-success, 0.1);
    }
  }
}

.label {
  position: absolute;
  top: 50%;
  left: $spacing-md;
  transform: translateY(-50%);
  font-size: $font-size-base;
  color: $color-text-secondary;
  pointer-events: none;
  transition: all $duration-quick $ease-power-out;
  background-color: $color-bg-primary;
  padding: 0 $spacing-xs;
}

// Checkmark animation for success
.successIcon {
  position: absolute;
  right: $spacing-md;
  top: 50%;
  transform: translateY(-50%) scale(0);
  color: $color-success;
  animation: successPop $duration-base $ease-back-out forwards;
}

@keyframes successPop {
  0% {
    transform: translateY(-50%) scale(0) rotate(-45deg);
  }
  50% {
    transform: translateY(-50%) scale(1.2) rotate(10deg);
  }
  100% {
    transform: translateY(-50%) scale(1) rotate(0deg);
  }
}
```

**Dependencies**: Task 1.3 complete

---

#### 4.4 Image Hover Effects

**Description**: Add zoom and overlay animations to images

**File to modify**: `src/components/Card/Card.module.scss` (if images in cards)

**Image Animation Styles**:
```scss
.cardImage {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: $border-radius-md $border-radius-md 0 0;
  transition: transform $duration-moderate $ease-power-out;

  .card:hover & {
    transform: scale(1.1);
  }
}

.imageOverlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity $duration-quick $ease-power-out;
  display: flex;
  align-items: center;
  justify-content: center;

  .card:hover & {
    opacity: 1;
  }
}
```

**Dependencies**: None

---

### Phase 5: Parallax & Advanced Effects (Est: 2-3 hours)

#### 5.1 Multi-Layer Hero Parallax with Framer Motion

**Description**: Enhance hero section with advanced parallax using Framer Motion's useScroll and useTransform

**File to modify**: `src/components/Hero/Hero.jsx`

**Add Advanced Parallax**:
```jsx
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Hero.module.scss';

const Hero = ({ backgroundImage, title, subtitle, ctaText, ctaLink, height = '100vh' }) => {
  const heroRef = useRef(null);

  // Track scroll position within hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"] // Parallax while hero is visible
  });

  // Transform scroll progress into movement values
  // Different speeds create parallax depth effect
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const ySubtitle = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const yCta = useTransform(scrollYProgress, [0, 1], [0, 350]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <motion.div
      ref={heroRef}
      className={styles.hero}
      style={{
        height,
        backgroundImage: `url(${backgroundImage})`,
        scale // Subtle zoom on background
      }}
    >
      <div className={styles.heroOverlay} />
      <motion.div
        className={styles.heroContent}
        style={{ opacity }}
      >
        <motion.h1
          className={styles.heroTitle}
          style={{ y: yTitle }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {title}
        </motion.h1>
        <motion.p
          className={styles.heroSubtitle}
          style={{ y: ySubtitle }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {subtitle}
        </motion.p>
        {ctaText && ctaLink && (
          <motion.div
            style={{ y: yCta }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to={ctaLink} className={styles.heroCta}>
              {ctaText}
            </Link>
          </motion.div>
        )}
      </motion.div>
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.span
          className={styles.scrollArrow}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          ↓
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

Hero.propTypes = {
  backgroundImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  ctaText: PropTypes.string,
  ctaLink: PropTypes.string,
  height: PropTypes.string,
};

export default Hero;
```

**What this does**:
- **useScroll**: Tracks scroll progress within hero section
- **useTransform**: Maps scroll to movement (0-150px, 0-250px, 0-350px)
- **Multi-speed**: Title moves slower than subtitle, creating depth
- **Fade out**: Opacity decreases as you scroll down
- **Background zoom**: Subtle scale effect on background image
- **Bounce arrow**: Animated scroll indicator

**Dependencies**: Task 1.1 complete (Framer Motion installed)

---

#### 5.2 Scroll Progress Indicator

**Description**: Add page scroll progress bar at top of page

**Files to create**:
- `src/components/ScrollProgress/ScrollProgress.jsx`
- `src/components/ScrollProgress/ScrollProgress.module.scss`
- `src/components/ScrollProgress/index.js`

**ScrollProgress Component**:
```jsx
import React, { useEffect, useState } from 'react';
import styles from './ScrollProgress.module.scss';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      const totalScrollable = documentHeight - windowHeight;
      const progress = (scrollTop / totalScrollable) * 100;

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.scrollProgress}>
      <div
        className={styles.progressBar}
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;
```

**ScrollProgress Styles**:
```scss
@import '@/styles/variables';

.scrollProgress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: rgba($color-primary, 0.1);
  z-index: $z-index-sticky;
  pointer-events: none;
}

.progressBar {
  height: 100%;
  background: linear-gradient(
    90deg,
    $color-primary 0%,
    $color-secondary 100%
  );
  transition: width 0.1s linear;
  box-shadow: 0 2px 8px rgba($color-primary, 0.3);
}
```

**Add to App.jsx**:
```jsx
import ScrollProgress from '@/components/ScrollProgress';

function App() {
  return (
    <div className="app">
      <ScrollProgress />
      <NavBar navItems={navItems} />
      {/* ... rest of app */}
    </div>
  );
}
```

**Dependencies**: None

---

#### 5.3 Loading Skeleton Screens

**Description**: Add skeleton loading states for images and content

**Files to create**:
- `src/components/Skeleton/Skeleton.jsx`
- `src/components/Skeleton/Skeleton.module.scss`
- `src/components/Skeleton/index.js`

**Skeleton Component**:
```jsx
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Skeleton.module.scss';

const Skeleton = ({
  variant = 'text',
  width,
  height,
  count = 1,
  circle = false,
  animation = 'pulse'
}) => {
  const skeletonStyle = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1em' : '200px'),
  };

  const skeletons = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className={`
        ${styles.skeleton}
        ${styles[`skeleton--${variant}`]}
        ${circle ? styles['skeleton--circle'] : ''}
        ${styles[`skeleton--${animation}`]}
      `}
      style={skeletonStyle}
    />
  ));

  return <>{skeletons}</>;
};

Skeleton.propTypes = {
  variant: PropTypes.oneOf(['text', 'rect', 'circle', 'image']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  count: PropTypes.number,
  circle: PropTypes.bool,
  animation: PropTypes.oneOf(['pulse', 'wave', 'none']),
};

export default Skeleton;
```

**Skeleton Styles**:
```scss
@import '@/styles/variables';
@import '@/styles/mixins';

.skeleton {
  background-color: $color-bg-secondary;
  border-radius: $border-radius-sm;
  display: block;
  margin-bottom: $spacing-sm;

  &--text {
    height: 1em;
    margin-bottom: 0.5em;
    transform: scale(1, 0.8);
  }

  &--rect {
    border-radius: $border-radius-md;
  }

  &--circle {
    border-radius: 50%;
  }

  &--image {
    border-radius: $border-radius-md;
    height: 200px;
  }

  // Animation variants
  &--pulse {
    animation: skeleton-pulse 1.5s ease-in-out infinite;
  }

  &--wave {
    @include shimmer-loading;
  }
}

@keyframes skeleton-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
```

**Usage Example** (in pages):
```jsx
import Skeleton from '@/components/Skeleton';

// While loading content
{loading ? (
  <>
    <Skeleton variant="image" height={300} />
    <Skeleton variant="text" count={3} />
  </>
) : (
  <ActualContent />
)}
```

**Dependencies**: Task 1.3 complete (shimmer mixin)

---

### Phase 6: Page Transition Animations (Est: 2 hours)

#### 6.1 Create Page Transition Wrapper with Framer Motion

**Description**: Build component for smooth page transitions using Framer Motion (no additional library needed)

**Files to create**:
- `src/components/PageTransition/PageTransition.jsx`
- `src/components/PageTransition/index.js`

**PageTransition Component**:
```jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.98
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // Power Out easing
      when: "beforeChildren"
    }
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.98,
    transition: {
      duration: 0.4,
      ease: [0.7, 0, 0.84, 0] // Power In easing
    }
  }
};

const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        style={{ width: '100%', minHeight: '100vh' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTransition;
```

**Export barrel** (`index.js`):
```js
export { default } from './PageTransition';
```

**Why Framer Motion over React Transition Group?**:
- ✅ **No additional library**: Already using Framer Motion
- ✅ **Better performance**: GPU-accelerated transforms
- ✅ **More control**: Easy to customize animations
- ✅ **TypeScript support**: Better DX
- ✅ **AnimatePresence**: Handles enter/exit automatically
- ✅ **Reduced bundle**: -15KB (no react-transition-group needed)

**Dependencies**: Task 1.1 complete (Framer Motion already installed)

---

#### 6.2 Integrate Page Transitions in App

**Description**: Wrap route content with PageTransition component

**File to modify**: `src/App.jsx`

**Changes**:
```jsx
import PageTransition from '@/components/PageTransition';
import { useLocation } from 'react-router-dom';

function App() {
  useScrollToTop();
  const location = useLocation();

  return (
    <div className="app">
      <a href="#main-content" className="skip-to-main">
        Saltar para o conteúdo principal
      </a>

      <NavBar navItems={navItems} />

      <main id="main-content" style={{ minHeight: 'calc(100vh - 70px)', paddingTop: '70px' }}>
        <Suspense fallback={<LoadingSpinner />}>
          <PageTransition>
            <Routes location={location} key={location.pathname}>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/quartos" element={<QuartosPage />} />
              <Route path="/atividades" element={<AtividadesPage />} />
              <Route path="/redondezas" element={<RedondezasPage />} />
              <Route path="/localizacao" element={<LocalizacaoPage />} />
              <Route path="/galeria" element={<GaleriaPage />} />
            </Routes>
          </PageTransition>
        </Suspense>
      </main>

      <Footer contactInfo={contactInfo} quickLinks={quickLinks} />
    </div>
  );
}
```

**Important**: Pass `location` to Routes and add `key={location.pathname}` for AnimatePresence to detect route changes.

**Dependencies**: Task 6.1 complete

---

### Phase 7: Polish & Refinement (Est: 2 hours)

#### 7.1 Add Reduced Motion Support

**Description**: Ensure all animations respect user preferences

**File to modify**: `src/main.jsx`

**Add Reduced Motion Detection**:
```jsx
import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ParallaxProvider } from 'react-scroll-parallax'
import { MotionConfig } from 'framer-motion'
import App from './App.jsx'
import './styles/global.scss'

// Detect reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ParallaxProvider>
          <MotionConfig reducedMotion={prefersReducedMotion ? "always" : "never"}>
            <App />
          </MotionConfig>
        </ParallaxProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
```

**Also update global.scss** for CSS-based animations:
```scss
// Respect user's motion preferences (accessibility)
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**What MotionConfig does**:
- Wraps entire app with Framer Motion configuration
- `reducedMotion="always"` disables all Framer Motion animations
- Automatically detects user's OS-level motion preference
- Respects accessibility settings globally

**Dependencies**: None

---

#### 7.2 Optimize Animation Performance

**Description**: Add GPU acceleration hints to animated elements

**File to modify**: `src/styles/global.scss`

**Add Performance Hints**:
```scss
// GPU acceleration for animated elements
[data-aos],
.card,
.button,
img {
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform: translateZ(0);
}

// Remove will-change after animation completes
[data-aos].aos-animate {
  will-change: auto;
}
```

**Dependencies**: None

---

#### 7.3 Test Cross-Browser Compatibility

**Description**: Verify animations work across browsers

**Test Matrix**:
| Browser | Version | Test Items |
|---------|---------|------------|
| Chrome | Latest | All animations, AOS, transitions |
| Firefox | Latest | CSS animations, parallax |
| Safari | Latest | GPU acceleration, smooth scroll |
| Edge | Latest | Compatibility with Chrome |
| Mobile Safari | iOS 15+ | Touch interactions, performance |
| Mobile Chrome | Android | Scroll performance, stagger |

**Issues to Watch For**:
- Safari transform/opacity issues
- Firefox backdrop-filter support
- Mobile scroll performance
- Touch event conflicts with animations

**Dependencies**: All previous phases complete

---

#### 7.4 Performance Audit

**Description**: Measure animation performance and optimize

**Tools to Use**:
- Chrome DevTools Performance tab
- Lighthouse performance audit
- React DevTools Profiler

**Metrics to Check**:
- First Contentful Paint (FCP) < 1.8s
- Largest Contentful Paint (LCP) < 2.5s
- Cumulative Layout Shift (CLS) < 0.1
- Time to Interactive (TTI) < 3.8s
- Frame rate during animations > 55 FPS

**Optimization Strategies**:
- Lazy load AOS only when needed
- Debounce scroll event handlers
- Use `passive: true` for scroll listeners
- Minimize animation on low-end devices
- Remove unused CSS (PurgeCSS in production)

**Dependencies**: Task 7.3 complete

---

## Testing Strategy

### Visual Regression Testing

**Manual Testing Checklist**:

1. **Animation Triggers**:
   - ✅ Sections animate when scrolling into view
   - ✅ Cards stagger correctly in grids
   - ✅ Page transitions smooth between routes
   - ✅ Parallax moves at correct speeds

2. **Hover States**:
   - ✅ Buttons lift and show ripple effect
   - ✅ Cards lift with shine animation
   - ✅ Images zoom on hover
   - ✅ Links show underline animation

3. **Form Interactions**:
   - ✅ Labels float on focus
   - ✅ Input borders glow when focused
   - ✅ Success checkmark animates in
   - ✅ Error states show clearly

4. **Responsive Behavior**:
   - ✅ Animations scale appropriately on mobile
   - ✅ Touch interactions don't conflict with animations
   - ✅ Reduced animation complexity on small screens

5. **Accessibility**:
   - ✅ Reduced motion preference disables animations
   - ✅ Keyboard navigation works with animations
   - ✅ Screen readers don't announce animations
   - ✅ Focus indicators visible during animations

### Performance Testing

**Automated Tests**:
```bash
# Run Lighthouse audit
npm run build
npx lighthouse http://localhost:5173 --view

# Check bundle size
npm run build
npx bundlesize
```

**Performance Targets**:
- Lighthouse Performance Score: > 90
- Animation frame rate: > 55 FPS
- AOS bundle impact: < 15KB
- React Icons tree-shaking: Only used icons

### Cross-Device Testing

**Test Devices**:
- Desktop: 1920x1080, 1440x900
- Tablet: iPad (768x1024), iPad Pro (1024x1366)
- Mobile: iPhone 12 (390x844), Samsung Galaxy (360x640)

**Test Scenarios**:
1. Scroll through entire homepage
2. Navigate between all pages
3. Hover interactions on cards/buttons
4. Form field focus and submission
5. Gallery slideshow interactions

---

## Success Criteria

### Functional Requirements ✅

- [x] All emojis replaced with professional icon system
- [x] Scroll-based animations on all sections
- [x] Staggered card animations in grids
- [x] Enhanced button hover states with ripple effects
- [x] Floating label animations on form fields
- [x] Smooth page transitions between routes
- [x] Multi-layer parallax on hero sections
- [x] Loading skeleton screens for async content
- [x] Scroll progress indicator
- [x] Accessibility (reduced motion support)

### Design Requirements ✅

- [x] Clean, professional aesthetic without decorative emojis
- [x] Sophisticated transitions between sections
- [x] Consistent animation timing across site
- [x] Smooth micro-interactions on all interactive elements
- [x] Visual hierarchy enhanced with animations
- [x] Professional look and feel throughout

### Performance Requirements ✅

- [x] Lighthouse Performance Score > 90
- [x] Animation frame rate > 55 FPS
- [x] First Contentful Paint < 1.8s
- [x] Cumulative Layout Shift < 0.1
- [x] Bundle size increase < 50KB (AOS + React Icons)

### User Experience Requirements ✅

- [x] Animations enhance, don't distract
- [x] Page feels responsive and premium
- [x] Interactions feel polished and intentional
- [x] No janky or broken animations
- [x] Works smoothly on mobile devices

---

## Migration Checklist

### Pre-Implementation

- [ ] Backup current codebase (Git commit)
- [ ] Review current animation implementation
- [ ] Test site on target devices
- [ ] Note current Lighthouse scores
- [ ] Document all current deprecation warnings

### Phase 0: SCSS Deprecation Fixes ⚠️ **DO THIS FIRST**

- [ ] Create `_index.scss` with @forward rules
- [ ] Update `_mixins.scss` to use @use
- [ ] Fix color functions in ContactForm.module.scss
- [ ] Update global.scss to use @use
- [ ] Run SCSS migration script (or manual updates)
- [ ] Test build - verify zero deprecation warnings
- [ ] Search for any remaining deprecated color functions
- [ ] Update CLAUDE.md with new SCSS patterns
- [ ] Verify all pages render correctly after migration

### Phase 1: Foundation

- [ ] Install AOS and React Icons
- [ ] Add enhanced animation variables
- [ ] Create advanced animation mixins
- [ ] Initialize AOS in main.jsx
- [ ] Build Icon component system

### Phase 2: Icon Migration

- [ ] Update home.json with icon names
- [ ] Update atividades.json with icon names
- [ ] Replace emojis in HomePage
- [ ] Replace emojis in AtividadesPage
- [ ] Remove all inline emoji usage

### Phase 3: Scroll Animations

- [ ] Add AOS to HomePage sections
- [ ] Add AOS to QuartosPage sections
- [ ] Add AOS to AtividadesPage sections
- [ ] Add AOS to RedondezasPage sections
- [ ] Add AOS to LocalizacaoPage sections
- [ ] Add AOS to GaleriaPage sections

### Phase 4: Micro-Interactions

- [ ] Enhanced button animations
- [ ] Card hover effects with shine
- [ ] Form field floating labels
- [ ] Image zoom effects

### Phase 5: Advanced Effects

- [ ] Multi-layer hero parallax
- [ ] Scroll progress indicator
- [ ] Loading skeleton screens

### Phase 6: Page Transitions

- [ ] Install React Transition Group
- [ ] Build PageTransition component
- [ ] Integrate transitions in App.jsx

### Phase 7: Polish

- [ ] Add reduced motion support
- [ ] Optimize animation performance
- [ ] Cross-browser testing
- [ ] Performance audit

### Testing

- [ ] Visual regression testing
- [ ] Performance testing
- [ ] Cross-device testing
- [ ] Accessibility testing
- [ ] User acceptance testing

---

## Notes and Considerations

### Important Implementation Notes

1. **Animation Performance**:
   - Always use `transform` and `opacity` for animations (GPU-accelerated)
   - Avoid animating `width`, `height`, `top`, `left` (causes reflow)
   - Use `will-change` sparingly (only during animation)
   - Remove `will-change` after animation completes

2. **AOS Configuration**:
   - Set `once: true` to prevent repeated animations on scroll up
   - Adjust `offset` based on section height
   - Use `anchorPlacement` to fine-tune trigger points
   - Consider `disable: 'mobile'` for performance on low-end devices

3. **Icon System**:
   - React Icons tree-shakes automatically
   - Only imported icons are bundled
   - Consistent sizing with size prop
   - Accessibility with aria-label

4. **Parallax Considerations**:
   - Can cause motion sickness for some users
   - Must respect `prefers-reduced-motion`
   - Use subtle speeds (0.3x - 0.7x scroll speed)
   - Disable on mobile for performance

5. **Form Animations**:
   - Don't animate during user input (jarring)
   - Floating labels improve UX
   - Success/error animations provide feedback
   - Keep animations under 300ms for responsiveness

### Potential Challenges

1. **Bundle Size**:
   - Framer Motion: ~30KB (gzipped)
   - react-scroll-parallax: ~8KB (gzipped)
   - Font Awesome (tree-shaken): ~5KB per icon set
   - **Total increase**: ~40-50KB (acceptable for professional animations)

2. **Mobile Performance**:
   - Complex animations may lag on old devices
   - Solution: Detect device capabilities and disable heavy animations
   - Use `navigator.hardwareConcurrency` to check CPU cores
   - Simplify animations on low-end devices

3. **Safari Compatibility**:
   - Safari sometimes struggles with `backdrop-filter`
   - Transform animations may flicker
   - Solution: Add `-webkit-` prefixes, test thoroughly

4. **Animation Conflicts**:
   - Multiple animation systems can conflict
   - Solution: Use Framer Motion for all animations consistently
   - react-scroll-parallax only for specialized parallax on images
   - Clear separation of concerns

### Future Enhancements

**Phase 8 (Optional)**:
1. **Counter Animations**: Animate numbers counting up (rooms, guests, etc.)
2. **Typing Effect**: Animated typing for hero subtitle (if desired)
3. **3D Card Transforms**: Perspective transforms on hover
4. **Image Blur-Up**: Progressive image loading technique
5. **Lottie Animations**: Add vector animations for icons
6. **Scroll-Linked Animations**: GSAP ScrollTrigger for advanced effects
7. **Staggered Text**: Animate text character by character
8. **Morphing Shapes**: SVG morphing animations

---

## Resources & Documentation

### Official Documentation
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Framer Motion useScroll Hook](https://www.framer.com/motion/use-scroll/)
- [Framer Motion AnimatePresence](https://www.framer.com/motion/animate-presence/)
- [react-scroll-parallax Documentation](https://react-scroll-parallax.damnthat.tv/)
- [Font Awesome React Documentation](https://fontawesome.com/docs/web/use-with/react/)
- [Font Awesome Icons Gallery](https://fontawesome.com/search?o=r&m=free)
- [MDN Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
- [CSS Transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)

### Animation Inspiration
- [Awwwards](https://www.awwwards.com/) - Award-winning website designs
- [CodePen](https://codepen.io/search/pens?q=scroll+animation) - Animation examples
- [Dribbble](https://dribbble.com/tags/web-animation) - Design inspiration

### Performance Resources
- [Web Vitals](https://web.dev/vitals/) - Google's performance metrics
- [Can I Use](https://caniuse.com/) - Browser compatibility
- [Bundlephobia](https://bundlephobia.com/) - Package size analysis

---

## Timeline Estimate

| Phase | Tasks | Estimated Time |
|-------|-------|----------------|
| **Phase 0** | Fix SCSS Deprecations ⚠️ | 1-2 hours |
| **Phase 1** | Foundation Setup | 2-3 hours |
| **Phase 2** | Icon Migration | 2-3 hours |
| **Phase 3** | Scroll Animations | 3-4 hours |
| **Phase 4** | Micro-Interactions | 2-3 hours |
| **Phase 5** | Advanced Effects | 2-3 hours |
| **Phase 6** | Page Transitions | 2 hours |
| **Phase 7** | Polish & Testing | 2 hours |

**Total Estimated Time**: **16-23 hours** (2-3 days of focused work)

**Contingency**: Add 20% buffer = **19-28 hours**

---

## Summary

This plan transforms Monte da Estrada from a functionally solid website into a **premium, professionally animated experience**. The implementation focuses on:

0. **⚠️ Fixing SCSS deprecations** (Dart Sass 3.0.0 compatibility) - **MUST DO FIRST**
1. **Replacing emojis** with Font Awesome professional icon system
2. **Adding sophisticated scroll animations** with Framer Motion
3. **Implementing specialized parallax** with react-scroll-parallax
4. **Creating micro-interactions** on buttons, cards, and forms with Framer Motion
5. **Building smooth page transitions** between routes using AnimatePresence
6. **Enhancing visual hierarchy** with staggered animations and advanced easing
7. **Maintaining performance** with GPU-accelerated animations
8. **Ensuring accessibility** with MotionConfig reduced motion support

**Technology Stack**:
- **Framer Motion** (free, MIT licensed): Advanced animations, parallax, page transitions
- **react-scroll-parallax** (free): Specialized parallax for images
- **Font Awesome Free**: 2,000+ professional icons

The result will be a **clean, modern, professional website** that feels premium and polished, with animations that enhance the user experience without being distracting.

---

**This plan is ready for implementation!**

To begin:
1. Review plan with stakeholders
2. Commit current codebase to Git
3. **⚠️ Start with Phase 0: Fix SCSS Deprecations (CRITICAL - DO FIRST)**
4. Then proceed with Phase 1: Foundation Setup
4. Follow phases sequentially
5. Test thoroughly at each phase

**Estimated completion**: 2-3 days of focused development

Good luck with the transformation! 🚀

---

*Generated: 2026-01-19*
*Plan Version: 1.0*
*Status: Ready for Implementation*
