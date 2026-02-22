import React from 'react';
import PropTypes from 'prop-types';
import { motion, useReducedMotion } from 'motion/react';
import { duration, ease, viewport } from '@/motion/motion.config';
import styles from './Section.module.scss';

// Reason: Section-level entrance animation — slower and more cinematic
// than individual element reveals, giving the page a deliberate luxury rhythm.
const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 32,
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

/**
 * Section component - full-width section with optional background and scroll animation.
 * Sections animate by default. Use animate={false} to disable.
 */
const Section = ({ children, background, padding, className, animate, ...rest }) => {
  const shouldReduceMotion = useReducedMotion();

  const sectionClasses = [
    styles.section,
    background && styles[background],
    padding && styles[padding],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Reason: Skip motion wrapper if animate is false or user prefers reduced motion
  if (!animate || shouldReduceMotion) {
    return (
      <section className={sectionClasses} {...rest}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      className={sectionClasses}
      initial="hidden"
      whileInView="visible"
      viewport={viewport.default}
      variants={sectionVariants}
      {...rest}
    >
      {children}
    </motion.section>
  );
};

Section.propTypes = {
  /** Section content */
  children: PropTypes.node.isRequired,
  /** Background color variant */
  background: PropTypes.oneOf(['light', 'dark', 'primary', 'secondary']),
  /** Padding size */
  padding: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Enable scroll-triggered entrance animation */
  animate: PropTypes.bool,
};

Section.defaultProps = {
  background: null,
  padding: 'medium',
  className: '',
  animate: true,
};

export default Section;
