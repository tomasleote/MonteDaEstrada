import React from 'react';
import PropTypes from 'prop-types';
import { motion, useReducedMotion } from 'motion/react';
import { duration, ease, viewport } from '@/motion/motion.config';
import styles from './SectionDivider.module.scss';

// Reason: Line grows from center outward, creating an elegant visual separator.
const lineVariants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: duration.long,
      ease: ease.elegant,
    },
  },
};

const ornamentVariants = {
  hidden: {
    opacity: 0,
    scale: 0.6,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: duration.medium,
      ease: ease.entrance,
      delay: 0.2,
    },
  },
};

/**
 * Elegant ornamental divider between page sections.
 * Animates on scroll — a thin line grows from center outward
 * with an optional ornament (diamond or custom symbol).
 */
const SectionDivider = ({ variant, className }) => {
  const shouldReduceMotion = useReducedMotion();

  const dividerClasses = [
    styles.divider,
    variant && styles[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (shouldReduceMotion) {
    return (
      <div className={dividerClasses} role="separator" aria-hidden="true">
        <div className={styles.line} />
        {variant === 'ornament' && <span className={styles.ornament}>&#9670;</span>}
        {variant === 'ornament' && <div className={styles.line} />}
      </div>
    );
  }

  return (
    <div
      className={dividerClasses}
      role="separator"
      aria-hidden="true"
    >
      <motion.div
        className={styles.line}
        initial="hidden"
        whileInView="visible"
        viewport={viewport.default}
        variants={lineVariants}
      />
      {variant === 'ornament' && (
        <motion.span
          className={styles.ornament}
          initial="hidden"
          whileInView="visible"
          viewport={viewport.default}
          variants={ornamentVariants}
        >
          &#9670;
        </motion.span>
      )}
      {variant === 'ornament' && (
        <motion.div
          className={styles.line}
          initial="hidden"
          whileInView="visible"
          viewport={viewport.default}
          variants={lineVariants}
        />
      )}
    </div>
  );
};

SectionDivider.propTypes = {
  /** Divider style variant */
  variant: PropTypes.oneOf(['simple', 'ornament']),
  /** Additional CSS classes */
  className: PropTypes.string,
};

SectionDivider.defaultProps = {
  variant: 'simple',
  className: undefined,
};

export default SectionDivider;
