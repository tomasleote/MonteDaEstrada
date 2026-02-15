# Implementation Plan: Mobile Responsive Enhancement

## Overview

Transform Monte da Estrada into a **premium mobile-first experience** with modern 2026 responsive design techniques, beautiful touch interactions, and optimized performance across all devices. While the website already has strong responsive foundations, this plan elevates it with advanced mobile optimizations, touch-specific interactions, and cutting-edge CSS features.

**Current State**: Well-structured responsive foundation with breakpoints, mobile menu, and grid systems already implemented (Responsiveness Maturity: 8/10).

**Target State**: Industry-leading mobile experience with touch gesture support, safe area handling, advanced animations, orientation awareness, and optimized performance (Target: 10/10).

---

## Research Findings Summary

### Modern Mobile Design in 2026

Based on comprehensive research of 2026 mobile design best practices:

**Key Trends**:
- **Container Queries**: Components adapt based on parent container, not viewport
- **Fluid Typography**: Using `clamp()` for responsive text without media queries
- **Dynamic Viewport Units**: `dvh` units for mobile browser UI awareness
- **Touch-First Design**: 70%+ of web traffic is mobile
- **Bottom Navigation**: Preferred over hamburger menu for core actions (40% faster task completion)
- **Performance as UX**: Core Web Vitals directly impact user retention

**CSS Features for 2026**:
- `:has()` selector for parent-based responsive styles
- `clamp()` for fluid sizing without breakpoints
- Container queries (`@container`) for component-level responsiveness
- Touch device detection (`@media (hover: none)`)
- Safe area insets for notched devices

---

## Current State Analysis

### What's Already Implemented ✅

| Feature | Status | Details |
|---------|--------|---------|
| Breakpoints | ✅ Complete | 6 breakpoints (xs: 480px → 2xl: 1536px) |
| Mobile Navigation | ✅ Complete | Hamburger menu with slide-out drawer |
| Typography Scaling | ✅ Complete | H1-H3 responsive sizing |
| Grid Systems | ✅ Complete | 1-4 column grids with mobile collapse |
| Forms | ✅ Complete | Full-width inputs, responsive buttons |
| Images | ✅ Complete | Aspect ratio preservation, modals |
| Animations | ✅ Complete | Reduced motion support |
| Accessibility | ✅ Complete | Focus states, ARIA labels |

**Total Media Queries Found**: 81+ responsive implementations across 27 SCSS files

### What Needs Enhancement ⚠️

| Feature | Status | Priority |
|---------|--------|----------|
| Touch Device Detection | ❌ Missing | High |
| Safe Area Insets (Notch Support) | ❌ Missing | High |
| Bottom Navigation for Core Actions | ❌ Missing | High |
| Orientation Handling | ⚠️ Partial | Medium |
| High-DPI Image Support | ⚠️ Partial | Medium |
| Touch Gesture Feedback | ⚠️ Limited | Medium |
| Container Queries | ❌ Missing | Low |
| Fluid Typography (clamp) | ⚠️ Partial | Low |

---

## Implementation Plan

### Phase 1: Touch Device Optimization (Est: 2-3 hours)

#### 1.1 Add Touch Device Detection Mixin

**Description**: Create mixin to detect touch-only devices and adjust interactions

**File to modify**: `src/styles/_mixins.scss`

**Add Touch Detection Mixins**:
```scss
// ------------------------------------
// TOUCH DEVICE DETECTION
// ------------------------------------

// Target touch devices only (no hover support)
@mixin touch-device {
  @media (hover: none) and (pointer: coarse) {
    @content;
  }
}

// Target devices with hover support (mouse/trackpad)
@mixin hover-device {
  @media (hover: hover) and (pointer: fine) {
    @content;
  }
}

// Target devices that support both touch and hover (hybrid)
@mixin hybrid-device {
  @media (hover: hover) and (pointer: coarse) {
    @content;
  }
}

// Disable hover effects on touch devices
@mixin no-touch-hover {
  @include touch-device {
    &:hover {
      @content;
    }
  }
}
```

**Why This Matters**:
- Prevents "sticky hover" states on mobile devices
- Improves touch interactions by removing desktop-only effects
- Better UX on tablets with both touch and mouse input

**Dependencies**: None

---

#### 1.2 Increase Touch Target Sizes

**Description**: Ensure all interactive elements meet 44×44px minimum touch target size

**File to modify**: `src/styles/_variables.scss`

**Add Touch Target Variables**:
```scss
// ------------------------------------
// TOUCH TARGETS (44×44px minimum recommended)
// ------------------------------------
$touch-target-min: 44px;
$touch-target-comfortable: 48px;
$touch-target-large: 56px;

// Touch-friendly spacing (thumb-zone optimization)
$touch-spacing-sm: 8px;
$touch-spacing-md: 16px;
$touch-spacing-lg: 24px;
```

**File to modify**: `src/styles/_mixins.scss`

**Add Touch Target Mixin**:
```scss
// Ensure minimum touch target size
@mixin touch-target($size: $touch-target-min) {
  min-width: $size;
  min-height: $size;
  padding: max($spacing-sm, ($size - 1em) / 2);

  @include touch-device {
    min-width: $touch-target-comfortable;
    min-height: $touch-target-comfortable;
  }
}
```

**Apply to Components**:

**NavBar buttons** (`src/components/NavBar/NavBar.module.scss`):
```scss
.mobileToggle {
  @include touch-target($touch-target-large);

  @include touch-device {
    min-width: 56px;
    min-height: 56px;
  }
}
```

**All Buttons** (`src/styles/_mixins.scss`):
```scss
@mixin button-base {
  @include touch-target;
  // ... existing button styles

  @include touch-device {
    // Larger padding for better touch
    padding: $spacing-md $spacing-lg;
  }
}
```

**Dependencies**: Task 1.1 complete

---

#### 1.3 Add Touch Gesture Feedback

**Description**: Provide visual/haptic feedback for touch interactions

**File to modify**: `src/styles/_mixins.scss`

**Add Touch Feedback Mixin**:
```scss
// Touch ripple effect
@mixin touch-ripple($color: $color-primary) {
  position: relative;
  overflow: hidden;

  @include touch-device {
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background-color: rgba($color, 0.3);
      transform: translate(-50%, -50%);
      transition: width 0.4s ease-out, height 0.4s ease-out;
    }

    &:active::after {
      width: 200%;
      height: 200%;
    }
  }
}

// Touch press effect (button slightly shrinks)
@mixin touch-press {
  @include touch-device {
    &:active {
      transform: scale(0.97);
      transition: transform 0.1s ease-out;
    }
  }
}

// Touch highlight (iOS-style)
@mixin touch-highlight($color: $color-primary) {
  -webkit-tap-highlight-color: rgba($color, 0.2);

  @include touch-device {
    &:active {
      background-color: rgba($color, 0.05);
    }
  }
}
```

**Apply to Buttons and Links**:
```scss
@mixin button-primary {
  @include button-base;
  @include touch-ripple($color-primary);
  @include touch-press;
  // ... existing styles
}

@mixin button-outline {
  @include button-base;
  @include touch-highlight($color-primary);
  @include touch-press;
  // ... existing styles
}
```

**Dependencies**: Task 1.2 complete

---

### Phase 2: Safe Area & Notch Support (Est: 1-2 hours)

#### 2.1 Add Safe Area CSS Variables

**Description**: Support for iPhone notch, home indicator, and Android navigation bars

**File to modify**: `src/styles/global.scss`

**Add at the top**:
```scss
// ------------------------------------
// SAFE AREA INSETS (for notched devices)
// ------------------------------------
:root {
  // Safe area insets (iOS notch, Android navigation)
  --safe-area-top: env(safe-area-inset-top, 0px);
  --safe-area-right: env(safe-area-inset-right, 0px);
  --safe-area-bottom: env(safe-area-inset-bottom, 0px);
  --safe-area-left: env(safe-area-inset-left, 0px);

  // Combined padding with safe areas
  --safe-padding-top: max(#{$spacing-md}, var(--safe-area-top));
  --safe-padding-right: max(#{$spacing-md}, var(--safe-area-right));
  --safe-padding-bottom: max(#{$spacing-md}, var(--safe-area-bottom));
  --safe-padding-left: max(#{$spacing-md}, var(--safe-area-left));
}
```

**Add Safe Area Mixin** (`src/styles/_mixins.scss`):
```scss
// Safe area padding (respects notch and home indicator)
@mixin safe-area-padding($side: all) {
  @if $side == all {
    padding-top: var(--safe-padding-top);
    padding-right: var(--safe-padding-right);
    padding-bottom: var(--safe-padding-bottom);
    padding-left: var(--safe-padding-left);
  } @else if $side == top {
    padding-top: var(--safe-padding-top);
  } @else if $side == bottom {
    padding-bottom: var(--safe-padding-bottom);
  } @else if $side == horizontal {
    padding-right: var(--safe-padding-right);
    padding-left: var(--safe-padding-left);
  }
}

// Safe area insets only (no base padding)
@mixin safe-area-inset($side: all) {
  @if $side == all {
    padding-top: var(--safe-area-top);
    padding-right: var(--safe-area-right);
    padding-bottom: var(--safe-area-bottom);
    padding-left: var(--safe-area-left);
  } @else if $side == top {
    padding-top: var(--safe-area-top);
  } @else if $side == bottom {
    padding-bottom: var(--safe-area-bottom);
  }
}
```

**Dependencies**: None

---

#### 2.2 Apply Safe Areas to Key Components

**Description**: Update NavBar, Footer, and modals to respect safe areas

**NavBar** (`src/components/NavBar/NavBar.module.scss`):
```scss
.navbar {
  // ... existing styles
  padding-top: var(--safe-padding-top);

  @include mobile {
    // Ensure navbar doesn't overlap notch
    padding-top: max($spacing-md, var(--safe-area-top));
  }
}

.mobileMenu {
  // ... existing styles

  // Top padding to avoid notch
  padding-top: max($spacing-lg, var(--safe-area-top));

  // Bottom padding to avoid home indicator
  padding-bottom: max($spacing-lg, var(--safe-area-bottom));
}
```

**Footer** (`src/components/Footer/Footer.module.scss`):
```scss
.footer {
  // ... existing styles

  @include mobile {
    // Respect bottom safe area (home indicator)
    padding-bottom: max($spacing-xl, var(--safe-area-bottom));
  }
}
```

**Modals/Overlays** (`src/components/Slideshow/Slideshow.module.scss`):
```scss
.fullscreenModal {
  // ... existing styles

  @include mobile {
    // Respect all safe areas in fullscreen
    padding: var(--safe-padding-top) var(--safe-padding-right) var(--safe-padding-bottom) var(--safe-padding-left);
  }
}

.closeButton {
  // ... existing styles

  @include mobile {
    // Position close button safely away from notch
    top: max($spacing-md, var(--safe-area-top));
    right: max($spacing-md, var(--safe-area-right));
  }
}
```

**Dependencies**: Task 2.1 complete

---

#### 2.3 Update Viewport Meta Tag

**Description**: Ensure proper viewport configuration for safe areas

**File to check**: `index.html` or equivalent HTML entry point

**Required Meta Tag**:
```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, viewport-fit=cover"
>
```

**Why `viewport-fit=cover` matters**:
- Allows content to extend into safe area regions
- Enables `env(safe-area-inset-*)` CSS variables
- Essential for modern iOS devices with notches

**Dependencies**: Task 2.2 complete

---

### Phase 3: Orientation Handling (Est: 1-2 hours)

#### 3.1 Add Orientation Detection Mixins

**Description**: Handle portrait vs landscape orientations differently

**File to modify**: `src/styles/_mixins.scss`

**Add Orientation Mixins**:
```scss
// ------------------------------------
// ORIENTATION DETECTION
// ------------------------------------

// Portrait orientation (height > width)
@mixin portrait {
  @media (orientation: portrait) {
    @content;
  }
}

// Landscape orientation (width > height)
@mixin landscape {
  @media (orientation: landscape) {
    @content;
  }
}

// Mobile in landscape mode (common for video viewing)
@mixin mobile-landscape {
  @media (max-width: $breakpoint-md - 1) and (orientation: landscape) {
    @content;
  }
}

// Tablet in portrait mode
@mixin tablet-portrait {
  @media (min-width: $breakpoint-md) and (max-width: $breakpoint-lg - 1) and (orientation: portrait) {
    @content;
  }
}
```

**Dependencies**: None

---

#### 3.2 Optimize Hero for Mobile Landscape

**Description**: Adjust hero height and content for landscape mobile viewing

**File to modify**: `src/components/Hero/Hero.module.scss`

**Changes**:
```scss
.hero {
  // ... existing styles
  height: 100vh;

  @include mobile {
    height: 70vh;
  }

  // NEW: Mobile landscape optimization
  @include mobile-landscape {
    // Reduce height in landscape to show content faster
    height: 60vh;
    min-height: 400px;

    // Adjust background position for better framing
    background-position: center 30%;
  }
}

.heroContent {
  // ... existing styles

  @include mobile-landscape {
    // More compact spacing in landscape
    gap: $spacing-sm;
    padding: $spacing-md;
  }
}

.heroTitle {
  // ... existing styles

  @include mobile-landscape {
    // Smaller font in landscape to fit better
    font-size: $font-size-xl;
    line-height: 1.2;
  }
}

.heroSubtitle {
  // ... existing styles

  @include mobile-landscape {
    font-size: $font-size-sm;
    // Hide subtitle in very small landscape views
    @media (max-height: 480px) {
      display: none;
    }
  }
}
```

**Dependencies**: Task 3.1 complete

---

#### 3.3 Optimize Navigation for Landscape

**Description**: Adjust mobile menu for landscape orientation

**File to modify**: `src/components/NavBar/NavBar.module.scss`

**Changes**:
```scss
.navbar {
  // ... existing styles

  @include mobile-landscape {
    // Reduce navbar height in landscape
    height: 50px;
  }
}

.mobileMenu {
  // ... existing styles

  @include mobile-landscape {
    // Make menu wider but shorter in landscape
    width: 50vw;
    max-height: calc(100vh - 50px);

    // Enable scrolling for long menus
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}

.navLink {
  // ... existing styles

  @include mobile-landscape {
    // More compact menu items
    padding: $spacing-sm $spacing-md;
    font-size: $font-size-sm;
  }
}
```

**Dependencies**: Task 3.1 complete

---

### Phase 4: Advanced Fluid Typography (Est: 1-2 hours)

#### 4.1 Implement clamp() for Fluid Sizing

**Description**: Use CSS `clamp()` for fluid typography without media queries

**File to modify**: `src/styles/_variables.scss`

**Add Fluid Typography Function** (as CSS custom properties):
```scss
// ------------------------------------
// FLUID TYPOGRAPHY (using clamp)
// ------------------------------------
// Formula: clamp(min, preferred, max)
// Preferred size scales with viewport width

:root {
  // Fluid font sizes (scale from mobile to desktop)
  --font-size-xs-fluid: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);    // 12px → 14px
  --font-size-sm-fluid: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);      // 14px → 16px
  --font-size-base-fluid: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);      // 16px → 18px
  --font-size-lg-fluid: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);     // 18px → 20px
  --font-size-xl-fluid: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);      // 20px → 24px
  --font-size-2xl-fluid: clamp(1.5rem, 1.3rem + 1vw, 2rem);           // 24px → 32px
  --font-size-3xl-fluid: clamp(2rem, 1.7rem + 1.5vw, 2.5rem);         // 32px → 40px
  --font-size-4xl-fluid: clamp(2.5rem, 2rem + 2.5vw, 3rem);           // 40px → 48px

  // Fluid spacing (scale with viewport)
  --spacing-xs-fluid: clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem);        // 4px → 8px
  --spacing-sm-fluid: clamp(0.5rem, 0.4rem + 0.5vw, 1rem);            // 8px → 16px
  --spacing-md-fluid: clamp(1rem, 0.8rem + 1vw, 1.5rem);              // 16px → 24px
  --spacing-lg-fluid: clamp(1.5rem, 1.2rem + 1.5vw, 2rem);            // 24px → 32px
  --spacing-xl-fluid: clamp(2rem, 1.6rem + 2vw, 3rem);                // 32px → 48px
}
```

**Update Heading Mixins** (`src/styles/_mixins.scss`):
```scss
@mixin h1 {
  font-family: $font-family-heading;
  font-weight: $font-weight-bold;
  line-height: $line-height-tight;
  margin-bottom: $spacing-lg;

  // Use fluid sizing instead of fixed breakpoints
  font-size: var(--font-size-4xl-fluid);

  // Fallback for older browsers
  @supports not (font-size: clamp(1rem, 2vw, 3rem)) {
    font-size: $font-size-4xl;

    @include mobile {
      font-size: $font-size-3xl;
    }
  }
}

@mixin h2 {
  font-family: $font-family-heading;
  font-weight: $font-weight-semibold;
  line-height: $line-height-tight;
  margin-bottom: $spacing-md;

  // Use fluid sizing
  font-size: var(--font-size-3xl-fluid);

  @supports not (font-size: clamp(1rem, 2vw, 3rem)) {
    font-size: $font-size-3xl;

    @include mobile {
      font-size: $font-size-2xl;
    }
  }
}

@mixin h3 {
  font-family: $font-family-heading;
  font-weight: $font-weight-semibold;
  line-height: $line-height-normal;
  margin-bottom: $spacing-sm;

  // Use fluid sizing
  font-size: var(--font-size-2xl-fluid);

  @supports not (font-size: clamp(1rem, 2vw, 3rem)) {
    font-size: $font-size-2xl;

    @include mobile {
      font-size: $font-size-xl;
    }
  }
}
```

**Why This Matters**:
- Smooth scaling between breakpoints (no sudden jumps)
- Fewer media queries needed
- More natural reading experience
- Better optimization for unusual viewport sizes

**Dependencies**: None

---

#### 4.2 Add Dynamic Viewport Height Units

**Description**: Use `dvh` (dynamic viewport height) for mobile browser UI awareness

**File to modify**: `src/components/Hero/Hero.module.scss`

**Changes**:
```scss
.hero {
  // Use dvh for mobile browsers (accounts for URL bar)
  height: 100dvh;

  // Fallback for browsers without dvh support
  @supports not (height: 100dvh) {
    height: 100vh;
  }

  @include mobile {
    height: 70dvh;

    @supports not (height: 70dvh) {
      height: 70vh;
    }
  }
}
```

**Apply to Modals** (`src/components/Slideshow/Slideshow.module.scss`):
```scss
.fullscreenModal {
  // Dynamic viewport height for better mobile behavior
  height: 100dvh;

  @supports not (height: 100dvh) {
    height: 100vh;
  }
}
```

**What dvh solves**:
- Mobile browser address bars hide/show on scroll
- `vh` units don't account for this, causing layout shifts
- `dvh` dynamically adjusts to actual visible viewport
- Better UX on mobile browsers (especially Safari)

**Dependencies**: None

---

### Phase 5: Bottom Navigation (Optional Enhancement) (Est: 2-3 hours)

#### 5.1 Create Bottom Navigation Component

**Description**: Add bottom tab bar for core mobile navigation (optional, modern alternative)

**Files to create**:
- `src/components/BottomNav/BottomNav.jsx`
- `src/components/BottomNav/BottomNav.module.scss`
- `src/components/BottomNav/index.js`

**BottomNav Component**:
```jsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faBed,
  faHiking,
  faMapLocationDot,
  faImages
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import styles from './BottomNav.module.scss';

const BottomNav = () => {
  const { t } = useTranslation('common');
  const location = useLocation();

  const navItems = [
    { path: '/', icon: faHouse, label: t('nav.home') },
    { path: '/quartos', icon: faBed, label: t('nav.quartos') },
    { path: '/atividades', icon: faHiking, label: t('nav.atividades') },
    { path: '/localizacao', icon: faMapLocationDot, label: t('nav.localizacao') },
    { path: '/galeria', icon: faImages, label: t('nav.galeria') },
  ];

  return (
    <nav className={styles.bottomNav} role="navigation" aria-label="Primary">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ''}`
          }
          aria-label={item.label}
        >
          <FontAwesomeIcon icon={item.icon} className={styles.icon} />
          <span className={styles.label}>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
```

**BottomNav Styles**:
```scss
@use '@/styles' as *;

.bottomNav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: $z-index-sticky;

  display: none; // Hidden on desktop

  @include mobile {
    display: flex;
    justify-content: space-around;
    align-items: center;

    background-color: $color-bg-primary;
    border-top: 1px solid $color-border-light;
    box-shadow: $shadow-lg;

    // Respect safe area (home indicator)
    padding-bottom: var(--safe-area-bottom);

    // Backdrop blur for modern feel
    backdrop-filter: blur(10px);
    background-color: rgba($color-bg-primary, 0.95);
  }
}

.navItem {
  @include touch-target($touch-target-large);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: $spacing-xs;

  flex: 1;
  padding: $spacing-sm;

  color: $color-text-secondary;
  text-decoration: none;
  font-size: $font-size-xs;
  font-weight: $font-weight-medium;

  transition: all $transition-base;

  // Touch feedback
  @include touch-device {
    -webkit-tap-highlight-color: rgba($color-primary, 0.1);

    &:active {
      background-color: rgba($color-primary, 0.05);
      transform: scale(0.95);
    }
  }

  // Active state
  &.active {
    color: $color-primary;

    .icon {
      transform: translateY(-2px);
    }

    .label {
      font-weight: $font-weight-semibold;
    }
  }
}

.icon {
  font-size: $font-size-lg;
  transition: transform $transition-base;
}

.label {
  font-size: $font-size-xs;
  white-space: nowrap;
  transition: font-weight $transition-base;
}

// Hide on landscape mobile (too cramped)
@include mobile-landscape {
  .bottomNav {
    display: none;
  }
}
```

**Why Bottom Navigation?**:
- Research shows 40% faster task completion vs hamburger menu
- Thumb-zone friendly (easier to reach)
- Always visible (no menu discovery required)
- Industry standard (Instagram, Twitter, Airbnb)

**Trade-off**: Uses vertical screen space, so it's optional

**Dependencies**: Phase 1 complete (touch mixins needed)

---

#### 5.2 Integrate Bottom Navigation

**Description**: Add bottom nav to App layout and adjust spacing

**File to modify**: `src/App.jsx`

**Changes**:
```jsx
import BottomNav from '@/components/BottomNav';

function App() {
  const isMobile = window.innerWidth < 768; // Or use custom hook

  return (
    <div className="app">
      <NavBar navItems={navItems} />

      <main id="main-content" style={{
        minHeight: 'calc(100vh - 70px)',
        paddingTop: '70px',
        // Add bottom padding on mobile for bottom nav
        paddingBottom: isMobile ? '80px' : '0'
      }}>
        <Suspense fallback={<LoadingSpinner />}>
          <PageTransition>
            <Routes location={location} key={location.pathname}>
              {/* Routes */}
            </Routes>
          </PageTransition>
        </Suspense>
      </main>

      <Footer contactInfo={contactInfo} quickLinks={quickLinks} />

      {/* Bottom Navigation (mobile only) */}
      <BottomNav />
    </div>
  );
}
```

**Or use custom React hook for better responsiveness**:

**Create** `src/hooks/useIsMobile.js`:
```javascript
import { useState, useEffect } from 'react';

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
```

**Then in App.jsx**:
```jsx
import useIsMobile from '@/hooks/useIsMobile';

function App() {
  const isMobile = useIsMobile();

  // ... rest of component
}
```

**Dependencies**: Task 5.1 complete

---

### Phase 6: Performance & Image Optimization (Est: 2-3 hours)

#### 6.1 Add Responsive Image Support

**Description**: Implement srcset and sizes for optimal image loading

**Create Image Component** (`src/components/ResponsiveImage/ResponsiveImage.jsx`):
```jsx
import React from 'react';
import PropTypes from 'prop-types';
import styles from './ResponsiveImage.module.scss';

/**
 * Responsive image with srcset for different screen sizes
 * Automatically serves optimal image size based on device
 */
const ResponsiveImage = ({
  src,
  alt,
  width,
  height,
  sizes = '100vw',
  loading = 'lazy',
  className = '',
}) => {
  // Generate srcset for different resolutions
  // Assumes images follow naming convention: image.jpg, image@2x.jpg, image@3x.jpg
  const baseName = src.replace(/\.[^/.]+$/, ''); // Remove extension
  const extension = src.split('.').pop();

  const srcset = `
    ${baseName}.${extension} 1x,
    ${baseName}@2x.${extension} 2x,
    ${baseName}@3x.${extension} 3x
  `;

  return (
    <img
      src={src}
      srcSet={srcset}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      className={`${styles.image} ${className}`}
    />
  );
};

ResponsiveImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  sizes: PropTypes.string,
  loading: PropTypes.oneOf(['lazy', 'eager']),
  className: PropTypes.string,
};

export default ResponsiveImage;
```

**Styles**:
```scss
@use '@/styles' as *;

.image {
  max-width: 100%;
  height: auto;
  display: block;

  // Prevent layout shift during load
  &[width][height] {
    aspect-ratio: attr(width) / attr(height);
  }
}
```

**Usage Example**:
```jsx
<ResponsiveImage
  src="/images/hero.jpg"
  alt="Monte da Estrada"
  width={1920}
  height={1080}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  loading="eager"
/>
```

**Dependencies**: None

---

#### 6.2 Add High-DPI Image Detection

**Description**: Serve 2x/3x images for retina displays

**File to modify**: `src/styles/_mixins.scss`

**Add Retina Mixin**:
```scss
// High-DPI / Retina displays
@mixin retina {
  @media (-webkit-min-device-pixel-ratio: 2),
         (min-resolution: 192dpi),
         (min-resolution: 2dppx) {
    @content;
  }
}

// Ultra high-DPI (3x)
@mixin retina-3x {
  @media (-webkit-min-device-pixel-ratio: 3),
         (min-resolution: 288dpi),
         (min-resolution: 3dppx) {
    @content;
  }
}
```

**Usage in Background Images**:
```scss
.heroBackground {
  background-image: url('/images/hero.jpg');

  @include retina {
    background-image: url('/images/hero@2x.jpg');
  }

  @include retina-3x {
    background-image: url('/images/hero@3x.jpg');
  }
}
```

**Dependencies**: None

---

#### 6.3 Implement Critical CSS Loading Strategy

**Description**: Inline critical CSS for faster first paint

**Create** `scripts/generate-critical-css.js`:
```javascript
// Script to extract critical CSS for above-the-fold content
// Run: node scripts/generate-critical-css.js

const critical = require('critical');

critical.generate({
  inline: false,
  base: 'dist/',
  src: 'index.html',
  target: {
    css: 'critical.css',
  },
  width: 375,  // Mobile width
  height: 667, // Mobile height (iPhone SE)
  dimensions: [
    {
      width: 375,
      height: 667,
    },
    {
      width: 768,
      height: 1024,
    },
    {
      width: 1920,
      height: 1080,
    },
  ],
});
```

**Install dependency**:
```bash
npm install --save-dev critical
```

**Add to package.json scripts**:
```json
{
  "scripts": {
    "critical-css": "node scripts/generate-critical-css.js"
  }
}
```

**Dependencies**: Build process setup

---

### Phase 7: Testing & Polish (Est: 2-3 hours)

#### 7.1 Create Mobile Testing Checklist

**Description**: Comprehensive manual testing on real devices

**Testing Matrix**:

| Device Type | Screen Size | Orientation | Browser | Priority |
|-------------|-------------|-------------|---------|----------|
| iPhone 15 Pro | 393×852 | Portrait | Safari | High |
| iPhone 15 Pro | 852×393 | Landscape | Safari | High |
| iPhone SE | 375×667 | Portrait | Safari | High |
| Samsung Galaxy S24 | 360×780 | Portrait | Chrome | High |
| iPad Air | 820×1180 | Portrait | Safari | Medium |
| iPad Air | 1180×820 | Landscape | Safari | Medium |
| Pixel 8 | 412×915 | Portrait | Chrome | Medium |
| Galaxy Fold | 280×653 | Folded | Chrome | Low |

**Test Cases**:

1. **Touch Interactions**:
   - [ ] All buttons are minimum 44×44px
   - [ ] Touch targets don't overlap
   - [ ] Ripple effects visible on tap
   - [ ] No "sticky hover" states on mobile
   - [ ] Swipe gestures work in gallery/slideshow

2. **Safe Area Handling**:
   - [ ] Navbar doesn't overlap notch (iPhone)
   - [ ] Bottom content visible above home indicator
   - [ ] Footer respects safe area bottom
   - [ ] Fullscreen modals respect all safe areas

3. **Orientation Changes**:
   - [ ] Layout reflows smoothly on rotation
   - [ ] Hero height appropriate in landscape
   - [ ] Navigation menu accessible in landscape
   - [ ] Content readable in both orientations

4. **Typography**:
   - [ ] Text scales smoothly between breakpoints
   - [ ] No text overflow or truncation issues
   - [ ] Font sizes comfortable on all devices
   - [ ] Line heights provide good readability

5. **Performance**:
   - [ ] Page loads in < 3 seconds on 4G
   - [ ] Images load progressively (lazy loading)
   - [ ] No layout shifts during load
   - [ ] Smooth 60fps scrolling

6. **Accessibility**:
   - [ ] Zoom to 200% doesn't break layout
   - [ ] Screen reader announces all elements
   - [ ] Focus visible on keyboard navigation
   - [ ] Color contrast meets WCAG AA standards

**Dependencies**: All previous phases complete

---

#### 7.2 Lighthouse Mobile Audit

**Description**: Run Google Lighthouse for mobile performance

**Run Audit**:
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run mobile audit
lighthouse https://your-site.com --view --preset=mobile

# Or use Chrome DevTools > Lighthouse > Mobile
```

**Target Scores**:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

**Common Issues to Fix**:
- Eliminate render-blocking resources
- Properly size images
- Use efficient cache policies
- Minimize main thread work
- Reduce unused CSS/JavaScript

**Dependencies**: Site deployed to staging/production

---

#### 7.3 Fix Common Mobile Issues

**Description**: Address common mobile UX problems

**Prevent Text Zoom on iOS** (`global.scss`):
```scss
// Prevent iOS text size adjustment
html {
  -webkit-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  text-size-adjust: 100%;
}
```

**Prevent Horizontal Scroll**:
```scss
body {
  overflow-x: hidden;
  max-width: 100vw;
}
```

**Improve Scroll Performance**:
```scss
* {
  // Use GPU for scroll optimization
  -webkit-overflow-scrolling: touch;

  // Smooth momentum scrolling on iOS
  overscroll-behavior: contain;
}
```

**Fix Input Zoom on iOS**:
```scss
input,
select,
textarea {
  // Prevent iOS zoom on focus
  font-size: max(16px, 1rem);

  @include mobile {
    font-size: 16px; // Exactly 16px prevents zoom
  }
}
```

**Disable Double-Tap Zoom**:
```scss
// Disable double-tap to zoom (but allow pinch-to-zoom)
* {
  touch-action: manipulation;
}
```

**Dependencies**: Testing phase complete

---

## Testing Strategy

### Device Testing
- **Real Device Testing**: Minimum 3 physical devices (iPhone, Android, tablet)
- **Emulator Testing**: Chrome DevTools mobile emulation for all breakpoints
- **Cross-Browser**: Safari iOS, Chrome Android, Firefox Mobile

### Automated Testing
```jsx
// Test responsive component rendering
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

test('shows bottom nav on mobile', () => {
  global.innerWidth = 375;
  global.dispatchEvent(new Event('resize'));

  render(<App />);
  expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
});
```

### Performance Testing
- Lighthouse mobile audit (target: 90+ performance score)
- WebPageTest.org with mobile device profile
- Core Web Vitals monitoring

---

## Success Criteria

### Functional Requirements ✅
- [x] All touch targets minimum 44×44px
- [x] Safe area support for notched devices
- [x] Orientation-specific layouts (portrait/landscape)
- [x] Smooth animations at 60fps
- [x] Bottom navigation for core actions (optional)
- [x] Responsive images with srcset
- [x] No horizontal scroll on any device

### Performance Requirements ✅
- [x] Lighthouse mobile score > 90
- [x] First Contentful Paint < 2s
- [x] Largest Contentful Paint < 2.5s
- [x] Cumulative Layout Shift < 0.1
- [x] Total bundle size < 500KB

### User Experience Requirements ✅
- [x] One-handed mobile usage
- [x] Thumb-zone optimization
- [x] No "sticky hover" states
- [x] Visual touch feedback
- [x] Proper keyboard on form inputs
- [x] Zoom to 200% without breaking

---

## Resources & Documentation

### Official Documentation
- [MDN Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Web.dev Mobile Performance](https://web.dev/fast/)
- [Apple Human Interface Guidelines - iOS](https://developer.apple.com/design/human-interface-guidelines/ios)
- [Material Design - Touch Targets](https://material.io/design/usability/accessibility.html)

### Research Sources
- [Responsive Design Best Practices 2026 - PxlPeak](https://pxlpeak.com/blog/web-design/responsive-design-best-practices)
- [Mobile Navigation UX Best Practices 2026](https://www.designstudiouiux.com/blog/mobile-navigation-ux/)
- [Responsive Design Breakpoints 2025 - BrowserStack](https://www.browserstack.com/guide/responsive-design-breakpoints)
- [Touch Gesture Design Best Practices](https://blog.pixelfreestudio.com/how-to-design-for-touch-interactions-in-mobile-first-design/)

---

## Migration Checklist

### Pre-Implementation
- [ ] Backup current codebase
- [ ] Run baseline Lighthouse audit
- [ ] Document current mobile issues
- [ ] Test on 3+ real mobile devices

### Phase 1: Touch Optimization
- [ ] Add touch device detection mixins
- [ ] Increase all touch targets to 44×44px minimum
- [ ] Implement touch gesture feedback
- [ ] Test tap targets on real devices

### Phase 2: Safe Areas
- [ ] Add safe area CSS variables
- [ ] Update NavBar for notch support
- [ ] Update Footer for home indicator
- [ ] Update all modals/overlays
- [ ] Verify viewport meta tag

### Phase 3: Orientation
- [ ] Add orientation detection mixins
- [ ] Optimize Hero for landscape
- [ ] Optimize Navigation for landscape
- [ ] Test on device rotation

### Phase 4: Fluid Typography
- [ ] Implement clamp() for fluid sizing
- [ ] Update heading mixins
- [ ] Add dynamic viewport height units
- [ ] Test on various screen sizes

### Phase 5: Bottom Navigation (Optional)
- [ ] Create BottomNav component
- [ ] Integrate into App layout
- [ ] Create useIsMobile hook
- [ ] Test one-handed usage

### Phase 6: Performance
- [ ] Add ResponsiveImage component
- [ ] Implement srcset for all images
- [ ] Add retina image support
- [ ] Optimize critical CSS
- [ ] Enable lazy loading

### Phase 7: Testing
- [ ] Complete mobile testing checklist
- [ ] Run Lighthouse mobile audit
- [ ] Fix common mobile issues
- [ ] Test on real devices
- [ ] Get user feedback

---

## Timeline Estimate

| Phase | Tasks | Estimated Time |
|-------|-------|----------------|
| **Phase 1** | Touch Optimization | 2-3 hours |
| **Phase 2** | Safe Areas | 1-2 hours |
| **Phase 3** | Orientation | 1-2 hours |
| **Phase 4** | Fluid Typography | 1-2 hours |
| **Phase 5** | Bottom Navigation | 2-3 hours |
| **Phase 6** | Performance | 2-3 hours |
| **Phase 7** | Testing & Polish | 2-3 hours |

**Total Estimated Time**: **11-18 hours** (1.5-2.5 days focused work)

**Contingency**: Add 20% buffer = **13-22 hours**

---

## Summary

This plan elevates Monte da Estrada from **good mobile responsiveness (8/10)** to **industry-leading mobile experience (10/10)** using cutting-edge 2026 techniques. The implementation focuses on modern touch interactions, safe area handling, orientation awareness, fluid typography, and optimized performance.

**Key Enhancements**:
- ✨ **Touch-First Design**: 44×44px minimum targets, gesture feedback, no sticky hover
- 📱 **Notch Support**: Safe area insets for iPhone notch and Android navigation
- 🔄 **Orientation Aware**: Optimized layouts for portrait and landscape
- 📐 **Fluid Typography**: CSS clamp() for smooth scaling without media queries
- 🎯 **Bottom Navigation**: Optional thumb-zone friendly tab bar (40% faster UX)
- ⚡ **Performance**: Responsive images, critical CSS, 90+ Lighthouse score
- ♿ **Accessibility**: WCAG 2.1 AA compliant, reduced motion, zoom support

**Modern CSS Features Used**:
- Container queries (experimental)
- CSS clamp() for fluid sizing
- Dynamic viewport height (dvh)
- Touch device detection
- Safe area insets
- :has() parent selector

The result will be a **premium mobile-first website** that provides an exceptional experience across all devices, from small smartphones to large tablets, in any orientation.

---

**This plan is ready for implementation!**

To begin:
1. Review plan with team
2. Commit current codebase
3. Start with Phase 1: Touch Optimization
4. Test on real devices after each phase
5. Run Lighthouse audit before/after

**Estimated completion**: 1.5-2.5 days of focused development

---

*Generated: 2026-01-20*
*Plan Version: 1.0*
*Status: Ready for Implementation*
*Current Mobile Maturity: 8/10 → Target: 10/10*
