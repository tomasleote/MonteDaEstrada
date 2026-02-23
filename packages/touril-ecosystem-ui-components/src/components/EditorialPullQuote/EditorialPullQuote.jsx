import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'motion/react';
import { duration, ease, viewport } from '../../constants/motion';
import styles from './EditorialPullQuote.module.scss';

/**
 * EditorialPullQuote — Contemplative editorial serif quote.
 * The only component on the Discovery page using $font-editorial (GT Sectra/Lora) — italic.
 * Features a 3px clay left border — the single structural use of clay on the page.
 * Generous 80px vertical padding — whitespace IS the design.
 * Triggers at 40% viewport visibility to force a deliberate pause.
 *
 * @param {Object} props
 * @param {string} props.quote - The quote text (displayed in italic editorial serif)
 * @param {string} props.attribution - Optional attribution displayed below the quote
 * @param {oneOf(['cream', 'sand'])} props.background - Section background color (default: 'cream')
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement}
 */
function EditorialPullQuote({ quote, attribution, background = 'cream', className = '' }) {
  const bgClass = background === 'sand' ? styles.backgroundSand : styles.backgroundCream;

  return (
    <motion.section
      className={`${styles.section} ${bgClass} ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      // Reason: 40% visibility forces a deliberate pause — user must be centered on quote
      viewport={viewport.centered}
      transition={{ duration: duration.long, ease: ease.elegant }}
    >
      <div className={styles.container}>
        <blockquote className={styles.blockquote}>
          <p className={styles.quoteText}>{quote}</p>
          {attribution && (
            <footer className={styles.attribution}>
              <cite className={styles.cite}>{attribution}</cite>
            </footer>
          )}
        </blockquote>
      </div>
    </motion.section>
  );
}

EditorialPullQuote.propTypes = {
  quote: PropTypes.string.isRequired,
  attribution: PropTypes.string,
  background: PropTypes.oneOf(['cream', 'sand']),
  className: PropTypes.string,
};

export default EditorialPullQuote;
