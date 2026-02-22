// ==================================
// MOTION DESIGN TOKENS
// ==================================
// Inspired by the slow, deliberate beauty of the Alentejo landscape.
// Every value is intentional — calibrated for luxury hospitality.

// ============================================
// DURATION SCALE
// ============================================
// Luxury timing: slower than SaaS, deliberate but never sluggish.

export const duration = {
  micro: 0.15,     // 150ms — button states, icon transitions, focus rings
  short: 0.3,      // 300ms — tooltips, dropdowns, small reveals
  medium: 0.5,     // 500ms — section reveals, card entrances
  long: 0.7,       // 700ms — page transitions, hero animations
  cinematic: 1.0,  // 1000ms — initial page load, dramatic reveals
};

// ============================================
// EASING CURVES
// ============================================
// Custom curves that give movement weight and grace.

export const ease = {
  // Primary curves
  entrance: [0.16, 1, 0.3, 1],         // Strong deceleration — content "settles in"
  exit: [0.7, 0, 0.84, 0],             // Quick departure — doesn't linger
  standard: [0.4, 0, 0.2, 1],          // Material standard — versatile

  // Character curves
  elegant: [0.25, 0.46, 0.45, 0.94],   // Gentle ease-out — refined movement
  emphasis: [0.34, 1.56, 0.64, 1],     // Slight overshoot — playful feedback
};

// ============================================
// STAGGER DELAYS
// ============================================
// Choreography timing for sequential reveals.

export const stagger = {
  fast: 0.04,      // 40ms — navigation items, small lists
  default: 0.06,   // 60ms — card grids, medium lists
  slow: 0.1,       // 100ms — section choreography
  dramatic: 0.15,  // 150ms — initial page load sequence
};

// ============================================
// DISTANCE SCALE
// ============================================
// How far elements travel during entrance/exit (in pixels).

export const distance = {
  subtle: 12,      // Micro-movements, small UI shifts
  default: 24,     // Standard reveal distance
  dramatic: 40,    // Emphatic entrance (hero elements)
};

// ============================================
// VIEWPORT THRESHOLDS
// ============================================
// When scroll-triggered animations should fire.

export const viewport = {
  default: { once: true, amount: 0.15 },   // 15% visible, fire once
  eager: { once: true, amount: 0.05 },     // 5% visible — fire early
  centered: { once: true, amount: 0.4 },   // 40% visible — wait for center
};
