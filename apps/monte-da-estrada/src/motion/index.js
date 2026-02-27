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
  lineReveal,
  editorialFadeUp,
  staggerContainer,
  staggerContainerFast,
  staggerContainerSlow,
  sectionStagger,
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
export { default as RevealText } from './components/RevealText';
export { default as RevealSection } from './components/RevealSection';
export { default as ParallaxImage } from './components/ParallaxImage';
