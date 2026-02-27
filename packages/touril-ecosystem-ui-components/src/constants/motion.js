// ==================================
// MOTION DESIGN TOKENS — Boutique Collection
// ==================================
// Inspired by the slow, deliberate beauty of the Alentejo landscape.
// Shared across all properties in the collection.
// Consumer apps import these and use with their own `motion` instance.

// ============================================
// DURATION SCALE
// ============================================

export const duration = {
  micro: 0.15,     // 150ms — button states, icon transitions, focus rings
  short: 0.3,      // 300ms — tooltips, dropdowns, small reveals
  medium: 0.5,     // 500ms — section reveals, card entrances
  long: 0.7,       // 700ms — page transitions, hero animations
  cinematic: 1.0,  // 1000ms — initial page load, dramatic reveals
  editorial: 0.9,  // 900ms — premium text reveals, editorial headings
};

// ============================================
// EASING CURVES
// ============================================

export const ease = {
  entrance: [0.16, 1, 0.3, 1],         // Strong deceleration — content "settles in"
  exit: [0.7, 0, 0.84, 0],             // Quick departure — doesn't linger
  standard: [0.4, 0, 0.2, 1],          // Material standard — versatile
  elegant: [0.25, 0.46, 0.45, 0.94],   // Gentle ease-out — refined movement
  emphasis: [0.34, 1.56, 0.64, 1],     // Slight overshoot — playful feedback
  organic: [0.22, 1, 0.36, 1],         // Exponential-out — luxury hotel signature curve
};

// ============================================
// STAGGER DELAYS
// ============================================

export const stagger = {
  fast: 0.04,      // 40ms — navigation items, small lists
  default: 0.06,   // 60ms — card grids, medium lists
  slow: 0.1,       // 100ms — section choreography
  dramatic: 0.15,  // 150ms — initial page load sequence
};

// ============================================
// DISTANCE SCALE
// ============================================

export const distance = {
  subtle: 12,      // Micro-movements, small UI shifts
  default: 24,     // Standard reveal distance
  dramatic: 40,    // Emphatic entrance (hero elements)
  headline: 32,    // Deep headline lift for cinematic reveals
};

// ============================================
// VIEWPORT THRESHOLDS
// ============================================

export const viewport = {
  default: { once: true, amount: 0.15 },  // 15% visible, fire once
  eager: { once: true, amount: 0.05 },    // 5% visible — fire early
  centered: { once: true, amount: 0.4 },  // 40% visible — wait for center
};

// ============================================
// FRAMER MOTION VARIANT PRESETS
// ============================================
// Ready-to-use variant objects for common animation patterns.
// Usage: <motion.div variants={variants.fadeUp} initial="hidden" whileInView="visible" viewport={viewport.default} />

export const variants = {
  // Fade up from below — most common entrance
  fadeUp: {
    hidden: { opacity: 0, y: distance.default },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: duration.medium, ease: ease.entrance },
    },
  },

  // Simple fade — for overlays and text
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: duration.short, ease: ease.standard },
    },
  },

  // Slide down from above — headers, dropdowns
  slideDown: {
    hidden: { opacity: 0, y: -distance.default },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: duration.short, ease: ease.entrance },
    },
  },

  // Scale in from center — cards, modals
  scaleIn: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: duration.medium, ease: ease.elegant },
    },
  },

  // Stagger container — parent wrapping a list of children
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger.default,
        delayChildren: 0.05,
      },
    },
  },

  // Stagger child — pair with staggerContainer on parent
  staggerItem: {
    hidden: { opacity: 0, y: distance.subtle },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: duration.medium, ease: ease.entrance },
    },
  },

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
};
