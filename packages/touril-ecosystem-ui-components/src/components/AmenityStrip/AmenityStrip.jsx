import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { motion, useReducedMotion } from 'motion/react';
import { variants, viewport, stagger } from '../../constants/motion';
import AmenityMarquee from './AmenityMarquee';
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

// English Translations Mapping
AMENITY_ICONS['Air conditioning'] = AMENITY_ICONS['Ar condicionado'];
AMENITY_ICONS['Breakfast'] = AMENITY_ICONS['Pequeno-almoço'];
AMENITY_ICONS['Garden'] = AMENITY_ICONS['Jardim'];
AMENITY_ICONS['Barbecue'] = AMENITY_ICONS['Churrasqueira'];
AMENITY_ICONS['Bicycles'] = AMENITY_ICONS['Bicicletas'];
AMENITY_ICONS['Parking'] = AMENITY_ICONS['Estacionamento'];
AMENITY_ICONS['Shared Kitchen'] = AMENITY_ICONS['Cozinha Partilhada'];
AMENITY_ICONS['Terrace'] = AMENITY_ICONS['Terraço'];

/**
 * Icons addressable by a stable key, so labels can be reworded or translated
 * without silently losing the icon (matching on the display name breaks the
 * moment a label reads "Pequeno Almoço" instead of "Pequeno-almoço").
 */
const ICONS_BY_KEY = {
  coffee: AMENITY_ICONS['Pequeno-almoço'],
  bike: AMENITY_ICONS['Bicicletas'],
  wifi: AMENITY_ICONS['Wi-Fi'],
  car: AMENITY_ICONS['Estacionamento'],
  ac: AMENITY_ICONS['Ar condicionado'],
  garden: AMENITY_ICONS['Jardim'],
  bbq: AMENITY_ICONS['Churrasqueira'],
  kitchen: AMENITY_ICONS['Cozinha Partilhada'],
  terrace: AMENITY_ICONS['Terraço'],
  pool: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 18c1.5 0 1.5-1.5 3-1.5S6.5 18 8 18s1.5-1.5 3-1.5 1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 3 1.5" />
      <path d="M2 22c1.5 0 1.5-1.5 3-1.5S6.5 22 8 22s1.5-1.5 3-1.5 1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 3 1.5" />
      <path d="M7 15V4a2 2 0 0 1 4 0M17 15V4a2 2 0 0 0-4 0" />
      <path d="M7 9h6" />
    </svg>
  ),
  bar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3h18l-9 9z" />
      <path d="M12 12v8" />
      <path d="M8 20h8" />
    </svg>
  ),
  key: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7.5" cy="15.5" r="4.5" />
      <path d="M10.7 12.3 21 2" />
      <path d="m17 6 3 3" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  door: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 21V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v17" />
      <path d="M3 21h18" />
      <circle cx="13" cy="12" r="0.8" />
    </svg>
  ),
  sparkles: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 3v4M3 5h4" />
      <path d="M6 17v4M4 19h4" />
      <path d="m13 3 2.5 6.5L22 12l-6.5 2.5L13 21l-2.5-6.5L4 12l6.5-2.5L13 3z" />
    </svg>
  ),
  tv: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="13" rx="2" />
      <path d="m17 2-5 5-5-5" />
    </svg>
  ),
  transfer: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17h18" />
      <path d="M5 17V9l2-4h10l2 4v8" />
      <circle cx="7.5" cy="17.5" r="1.5" />
      <circle cx="16.5" cy="17.5" r="1.5" />
      <path d="M5 12h14" />
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
 * @param {Array<{name: string, icon?: string}>} props.amenities - Amenities; `icon`
 *   selects from ICONS_BY_KEY and takes precedence over matching on `name`
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement}
 */
function AmenityStrip({ amenities, className = '' }) {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const useMarquee = isMobile && !shouldReduceMotion;

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
      {useMarquee ? (
        <AmenityMarquee>
          {amenities.map((amenity, index) => (
            <div key={index} className={styles.item}>
              <span className={styles.icon} aria-hidden="true">
                {ICONS_BY_KEY[amenity.icon] || AMENITY_ICONS[amenity.name] || null}
              </span>
              <span className={styles.label}>{amenity.name}</span>
            </div>
          ))}
        </AmenityMarquee>
      ) : (
        <div className={styles.inner}>
          {amenities.map((amenity, index) => (
            <motion.div
              key={index}
              className={styles.item}
              variants={variants.staggerItem}
            >
              <span className={styles.icon} aria-hidden="true">
                {ICONS_BY_KEY[amenity.icon] || AMENITY_ICONS[amenity.name] || null}
              </span>
              <span className={styles.label}>{amenity.name}</span>
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  );
}

AmenityStrip.propTypes = {
  amenities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.string,
    })
  ).isRequired,
  className: PropTypes.string,
};

export default AmenityStrip;
