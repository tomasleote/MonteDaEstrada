// ==================================
// MOTION SYSTEM — Public API
// ==================================
// Import everything from here:
//   import { ScrollReveal, StaggerChildren, AnimatedText } from '@/motion';

// Config & tokens
export { duration, ease, stagger, distance, viewport } from './motion.config';

// Variant presets
export {
  pageTransition,
  fadeUp,
  fadeUpSubtle,
  fadeIn,
  scaleIn,
  fadeLeft,
  fadeRight,
  staggerContainer,
  staggerContainerFast,
  staggerContainerSlow,
  heroTitle,
  heroSubtitle,
  heroCta,
  buttonInteraction,
  cardInteraction,
  imageZoom,
} from './motion.variants';

// Components
export { default as AnimatedPage } from './components/AnimatedPage';
export { default as ScrollReveal } from './components/ScrollReveal';
export { default as StaggerChildren } from './components/StaggerChildren';
export { default as AnimatedText } from './components/AnimatedText';
