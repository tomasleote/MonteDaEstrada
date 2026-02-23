import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'motion/react';
import { variants, viewport } from '../../constants/motion';
import styles from './ActivityHighlights.module.scss';

/**
 * ActivityHighlights — Grid of activity cards with icon, title, description, and distance
 * Uses staggered animation for card entrance.
 *
 * @param {Object} props
 * @param {string} props.eyebrow - Optional eyebrow label
 * @param {string} props.heading - Section heading
 * @param {Array} props.items - Array of activity objects { icon, title, description, distance }
 * @param {string} props.ctaLabel - CTA text
 * @param {string} props.ctaHref - CTA href
 * @param {oneOf(['cream', 'offwhite'])} props.background - Section background (default: 'cream')
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement}
 */
function ActivityHighlights({
  eyebrow,
  heading,
  items,
  ctaLabel,
  ctaHref,
  background = 'cream',
  className = '',
}) {
  const bgClass = background === 'offwhite' ? styles.backgroundOffwhite : styles.backgroundCream;

  return (
    <motion.section
      className={`${styles.section} ${bgClass} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewport.default}
    >
      {/* Section Header */}
      <motion.div className={styles.header} variants={variants.fadeUp}>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        <h2 className={styles.heading}>{heading}</h2>
      </motion.div>

      {/* Activity Cards Grid */}
      <motion.div
        className={styles.grid}
        variants={variants.staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport.default}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            className={styles.card}
            variants={variants.staggerItem}
          >
            {item.icon && <span className={styles.icon}>{item.icon}</span>}
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.description}>{item.description}</p>
            <span className={styles.distance}>{item.distance}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      {ctaLabel && ctaHref && (
        <motion.div className={styles.ctaContainer} variants={variants.fadeUp}>
          <a href={ctaHref} className={styles.cta}>
            {ctaLabel}
          </a>
        </motion.div>
      )}
    </motion.section>
  );
}

ActivityHighlights.propTypes = {
  eyebrow: PropTypes.string,
  heading: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      distance: PropTypes.string.isRequired,
    })
  ).isRequired,
  ctaLabel: PropTypes.string,
  ctaHref: PropTypes.string,
  background: PropTypes.oneOf(['cream', 'offwhite']),
  className: PropTypes.string,
};

export default ActivityHighlights;
