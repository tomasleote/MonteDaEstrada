import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'motion/react';
import { duration, ease } from '../../constants/motion';
import styles from './PageHero.module.scss';

/**
 * PageHero — canonical 65vh editorial hero for all internal pages.
 * Centered three-part text stack: eyebrow + headline (weight 300) + subtitle.
 * Lighter overlay (20% → 55%) lets photography read clearly.
 * No scroll indicator — shorter height reveals the next section naturally.
 *
 * Used by: DescobrirPage, GaleriaPage, QuartosPage, ContactoPage.
 * NOT used by: HomePage (uses ImmersiveHero instead).
 *
 * @param {Object} props
 * @param {string} props.imageSrc - Hero image URL
 * @param {string} props.imageAlt - Alt text for accessibility
 * @param {string} [props.eyebrow] - Optional eyebrow label above the headline
 * @param {string} props.headline - Main hero headline (displayed at font-weight 300)
 * @param {string} [props.subtitle] - Optional subtitle below headline
 * @param {string} [props.photographerCredit] - Optional photo credit (bottom-right)
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */
function PageHero({
  imageSrc,
  imageAlt,
  eyebrow,
  headline,
  subtitle,
  photographerCredit,
  className = '',
}) {
  return (
    <div className={`${styles.hero} ${className}`}>
      {/* Background Image */}
      <img src={imageSrc} alt={imageAlt} className={styles.image} fetchPriority="high" loading="eager" decoding="async" />

      {/* Lighter overlay — photography must read clearly */}
      <div className={styles.overlay} />

      {/* Three-part text stack */}
      <div className={styles.content}>
        {eyebrow && (
          <motion.span
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.medium, ease: ease.entrance, delay: 0.1 }}
          >
            {eyebrow}
          </motion.span>
        )}

        <motion.h1
          className={styles.headline}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.long, ease: ease.elegant, delay: 0.25 }}
        >
          {headline}
        </motion.h1>

        {subtitle && (
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.medium, ease: ease.entrance, delay: 0.45 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Photographer Credit */}
      {photographerCredit && <p className={styles.credit}>{photographerCredit}</p>}
    </div>
  );
}

PageHero.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  eyebrow: PropTypes.string,
  headline: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  photographerCredit: PropTypes.string,
  className: PropTypes.string,
};

export default PageHero;
