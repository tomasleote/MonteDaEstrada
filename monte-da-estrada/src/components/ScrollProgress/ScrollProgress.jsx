import React from 'react';
import { motion, useScroll } from 'framer-motion';
import styles from './ScrollProgress.module.scss';

/**
 * Scroll progress indicator - Shows page scroll progress at top of viewport
 */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className={styles.scrollProgress}
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ScrollProgress;
