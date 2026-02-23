import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'motion/react';
import { variants, viewport } from '../../constants/motion';
import styles from './ImmersiveHero.module.scss';

/**
 * ImmersiveHero — Full-viewport hero image with headline and scroll indicator
 * Creates an immersive entrance experience with fade-up headline animation.
 *
 * @param {Object} props
 * @param {string} props.imageSrc - Hero image URL
 * @param {string} props.imageAlt - Alt text for accessibility
 * @param {string} props.headline - Main hero text
 * @param {string} props.scrollLabel - Label next to scroll indicator (default: 'Descobrir')
 * @param {string} props.photographerCredit - Optional photo credit
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement}
 */
function ImmersiveHero({
  imageSrc,
  imageAlt,
  headline,
  scrollLabel = 'Descobrir',
  photographerCredit,
  className = '',
}) {
  const handleScrollClick = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div className={`${styles.hero} ${className}`}>
      {/* Background Image */}
      <img src={imageSrc} alt={imageAlt} className={styles.image} />

      {/* Dark Gradient Overlay */}
      <div className={styles.overlay} />

      {/* Hero Content */}
      <div className={styles.content}>
        <motion.h1
          className={styles.headline}
          variants={variants.fadeUp}
          initial="hidden"
          animate="visible"
          viewport={viewport.default}
        >
          {headline}
        </motion.h1>
      </div>

      {/* Scroll Indicator */}
      <button className={styles.scrollIndicator} onClick={handleScrollClick} aria-label="Scroll to next section">
        <span className={styles.arrow}>↓</span>
        <span className={styles.label}>{scrollLabel}</span>
      </button>

      {/* Photographer Credit */}
      {photographerCredit && <p className={styles.credit}>{photographerCredit}</p>}
    </div>
  );
}

ImmersiveHero.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  scrollLabel: PropTypes.string,
  photographerCredit: PropTypes.string,
  className: PropTypes.string,
};

export default ImmersiveHero;
