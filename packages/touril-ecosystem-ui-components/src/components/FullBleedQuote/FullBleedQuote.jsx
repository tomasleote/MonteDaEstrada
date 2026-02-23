import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, useScroll, useTransform } from 'motion/react';
import { duration, ease, viewport } from '../../constants/motion';
import styles from './FullBleedQuote.module.scss';

/**
 * FullBleedQuote — Full-bleed photography with editorial quote overlay.
 * A FullBleedImage variant: 50vh (shorter), editorial serif quote instead of caption,
 * single parallax element on the page (0.85x scroll speed via Framer Motion).
 * Parallax disabled under prefers-reduced-motion.
 *
 * Uses $font-editorial (GT Sectra/Lora) — appears in exactly 2 places on the site
 * (this + EditorialPullQuote).
 *
 * @param {Object} props
 * @param {string} props.imageSrc - Background image URL
 * @param {string} props.alt - Alt text for accessibility
 * @param {string} props.quote - Editorial quote text (displayed in italic serif)
 * @param {string} props.attribution - Optional attribution below the quote
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement}
 */
function FullBleedQuote({ imageSrc, alt, quote, attribution, className = '' }) {
  const containerRef = useRef(null);

  // Parallax: image scrolls at 0.85x speed relative to viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Reason: Maps 0→1 scroll progress to -7.5%→7.5% vertical shift (15% total range).
  // At 0.85x scroll speed, the image moves slower than content, creating depth.
  const imageY = useTransform(scrollYProgress, [0, 1], ['-7.5%', '7.5%']);

  return (
    <motion.figure
      ref={containerRef}
      className={`${styles.container} ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewport.eager}
      transition={{ duration: duration.medium, ease: ease.standard }}
    >
      {/* Parallax image — disabled under prefers-reduced-motion via CSS */}
      <motion.img
        src={imageSrc}
        alt={alt}
        className={styles.image}
        style={{ y: imageY }}
      />

      {/* Gradient scrim for text legibility */}
      <div className={styles.scrim} aria-hidden="true" />

      {/* Quote overlay */}
      <motion.div
        className={styles.quoteOverlay}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewport.eager}
        transition={{ duration: duration.long, ease: ease.elegant, delay: 0.2 }}
      >
        <blockquote className={styles.blockquote}>
          <p className={styles.quoteText}>{quote}</p>
          {attribution && (
            <footer className={styles.attribution}>
              <cite className={styles.cite}>{attribution}</cite>
            </footer>
          )}
        </blockquote>
      </motion.div>
    </motion.figure>
  );
}

FullBleedQuote.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,
  attribution: PropTypes.string,
  className: PropTypes.string,
};

export default FullBleedQuote;
