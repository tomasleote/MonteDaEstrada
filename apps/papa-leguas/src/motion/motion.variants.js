import { duration, ease, distance, stagger } from './motion.config';

export const pageTransition = {
  initial: { opacity: 0, y: distance.default },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.long, ease: ease.entrance },
  },
  exit: {
    opacity: 0,
    transition: { duration: duration.short, ease: ease.exit },
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: distance.default },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.medium, ease: ease.entrance },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.medium, ease: ease.elegant },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger.default, delayChildren: 0.1 },
  },
};

export const sectionStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};
