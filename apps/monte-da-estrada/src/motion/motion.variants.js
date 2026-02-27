// ==================================
// MOTION VARIANT PRESETS
// ==================================
// Pre-built animation variants for common patterns.
// Use these with motion components: <motion.div variants={fadeUp} />

import { duration, ease, distance, stagger } from './motion.config';

// ============================================
// PAGE TRANSITIONS
// ============================================

export const pageTransition = {
  initial: {
    opacity: 0,
    y: distance.default,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.long,
      ease: ease.entrance,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: duration.short,
      ease: ease.exit,
    },
  },
};

// ============================================
// SCROLL REVEAL VARIANTS
// ============================================

/** Fade up from below — the workhorse reveal animation */
export const fadeUp = {
  hidden: {
    opacity: 0,
    y: distance.default,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.medium,
      ease: ease.entrance,
    },
  },
};

/** Subtle fade up — for secondary content */
export const fadeUpSubtle = {
  hidden: {
    opacity: 0,
    y: distance.subtle,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.medium,
      ease: ease.elegant,
    },
  },
};

/** Pure fade — no positional shift */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: duration.medium,
      ease: ease.elegant,
    },
  },
};

/** Scale in — for cards and images */
export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: duration.medium,
      ease: ease.entrance,
    },
  },
};

/** Fade from left */
export const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -distance.default,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: duration.medium,
      ease: ease.entrance,
    },
  },
};

/** Fade from right */
export const fadeRight = {
  hidden: {
    opacity: 0,
    x: distance.default,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: duration.medium,
      ease: ease.entrance,
    },
  },
};

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

// ============================================
// STAGGER CONTAINERS
// ============================================

/** Standard stagger container for child orchestration */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.default,
      delayChildren: 0.1,
    },
  },
};

/** Fast stagger for navigation and small lists */
export const staggerContainerFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.fast,
      delayChildren: 0.05,
    },
  },
};

/** Slow stagger for dramatic section choreography */
export const staggerContainerSlow = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.slow,
      delayChildren: 0.15,
    },
  },
};

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

// ============================================
// HERO VARIANTS
// ============================================

export const heroTitle = {
  hidden: {
    opacity: 0,
    y: distance.dramatic,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.long,
      ease: ease.entrance,
    },
  },
};

export const heroSubtitle = {
  hidden: {
    opacity: 0,
    y: distance.default,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.long,
      ease: ease.entrance,
      delay: 0.2,
    },
  },
};

export const heroCta = {
  hidden: {
    opacity: 0,
    y: distance.subtle,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.medium,
      ease: ease.entrance,
      delay: 0.4,
    },
  },
};

// ============================================
// INTERACTIVE VARIANTS
// ============================================

/** Button hover/tap states */
export const buttonInteraction = {
  tap: { scale: 0.98 },
  hover: {
    y: -2,
    transition: {
      duration: duration.micro,
      ease: ease.standard,
    },
  },
};

/** Card hover states */
export const cardInteraction = {
  hover: {
    y: -4,
    transition: {
      duration: duration.short,
      ease: ease.standard,
    },
  },
  tap: { scale: 0.99 },
};

/** Image zoom on hover */
export const imageZoom = {
  hover: {
    scale: 1.05,
    transition: {
      duration: duration.long,
      ease: ease.elegant,
    },
  },
};
