import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'motion/react';
import { variants, viewport, stagger } from '../../constants/motion';
import styles from './AmenityStrip.module.scss';

/**
 * Minimal line-art SVG icons for each amenity.
 * 24x24 viewBox, stroke-only, 1.5px stroke.
 */
const AMENITY_ICONS = {
  'Ar condicionado': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 16a4 4 0 0 1-8 0" />
      <path d="M16 16a4 4 0 0 1-8 0" />
      <path d="M24 16a4 4 0 0 1-8 0" />
      <path d="M2 12h20" />
      <path d="M4 8h16" />
    </svg>
  ),
  'Pequeno-almoço': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" x2="6" y1="2" y2="4" />
      <line x1="10" x2="10" y1="2" y2="4" />
      <line x1="14" x2="14" y1="2" y2="4" />
    </svg>
  ),
  'Jardim': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V10" />
      <path d="M6 14c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M12 10c-2.2 0-4-1.8-4-4 0-2.2 1.8-4 4-4" />
      <path d="M12 10c2.2 0 4-1.8 4-4 0-2.2-1.8-4-4-4" />
    </svg>
  ),
  'Churrasqueira': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="10" width="16" height="6" rx="1" />
      <path d="M6 16v5M18 16v5" />
      <path d="M8 10V7M12 10V5M16 10V7" />
    </svg>
  ),
  'Bicicletas': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5.5" cy="17.5" r="3.5" />
      <circle cx="18.5" cy="17.5" r="3.5" />
      <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
      <path d="M12 17.5V14l-3-3 4-3 2 3h2" />
    </svg>
  ),
  'Wi-Fi': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <circle cx="12" cy="20" r="1" />
    </svg>
  ),
  'Estacionamento': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
    </svg>
  ),
  'Cozinha Partilhada': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  ),
  'Terraço': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 22h20" />
      <path d="M6 18v4M18 18v4" />
      <path d="M4 14h16a2 2 0 0 0 2-2v0a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2z" />
      <path d="M12 10V2" />
      <path d="M8 6l4-4 4 4" />
    </svg>
  ),
};

/**
 * AmenityStrip — Horizontal scrollable strip of icon + label pairs.
 * A premium "at a glance" treatment. The amenities are a whisper, not a feature list.
 * Background: cream with warm-gray top/bottom borders.
 * Icons: minimal line-art SVGs (no emoji).
 * Layout: centered flex row on desktop, horizontal scroll on mobile.
 * Typography: 11px uppercase labels, cool-taupe color.
 * No descriptions — just the icon and name.
 *
 * @param {Object} props
 * @param {Array<{name: string}>} props.amenities - Array of amenity objects (only name is used)
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement}
 */
function AmenityStrip({ amenities, className = '' }) {
  return (
    <motion.section
      className={`${styles.strip} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewport.default}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: stagger.fast,
            delayChildren: 0.05,
          },
        },
      }}
    >
      <div className={styles.inner}>
        {amenities.map((amenity, index) => (
          <motion.div
            key={index}
            className={styles.item}
            variants={variants.staggerItem}
          >
            <span className={styles.icon} aria-hidden="true">
              {AMENITY_ICONS[amenity.name] || null}
            </span>
            <span className={styles.label}>{amenity.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

AmenityStrip.propTypes = {
  amenities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  className: PropTypes.string,
};

export default AmenityStrip;
