import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'motion/react';
import { variants, viewport } from '../../constants/motion';
import styles from './BeachCard.module.scss';

/**
 * BeachCard — Cinematic 16:9 landscape beach card for the Descobrir page.
 * Beaches deserve width: 2-column grid, not 3.
 * Content (name, distance, description) is overlaid on the image via gradient scrim.
 * Hover: subtle golden hour warm overlay (rgba clay 8%) + image scale 1.03.
 *
 * Designed to sit inside a stagger container. Uses staggerItem variant so it
 * participates in parent-controlled stagger animation while also working standalone.
 *
 * @param {Object} props
 * @param {string} props.name - Beach name
 * @param {string} props.distance - Distance from property (e.g. '10 km')
 * @param {string} props.description - One-line beach description
 * @param {string} props.imageSrc - Landscape image URL
 * @param {string} props.imageAlt - Image alt text
 * @param {string} props.mapUrl - Optional Google Maps URL to open in new tab
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement}
 */
function BeachCard({ name, distance, description, imageSrc, imageAlt, mapUrl, className = '' }) {
  const handleClick = () => {
    if (mapUrl) {
      window.open(mapUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.article
      className={`${styles.card} ${className} ${mapUrl ? styles.clickable : ''}`}
      variants={variants.staggerItem}
      initial="hidden"
      whileInView="visible"
      viewport={viewport.default}
      onClick={handleClick}
      role={mapUrl ? 'button' : 'article'}
      tabIndex={mapUrl ? 0 : -1}
      onKeyDown={mapUrl ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      } : undefined}
    >
      <div className={styles.imageWrapper}>
        <img src={imageSrc} alt={imageAlt} className={styles.image} />

        {/* Bottom gradient scrim — darkens image base for content legibility */}
        <div className={styles.scrim} aria-hidden="true" />

        {/* Golden hour warm overlay — appears on hover via CSS */}
        <div className={styles.goldenOverlay} aria-hidden="true" />

        {/* Content overlay — sits above scrim */}
        <div className={styles.overlay}>
          <span className={styles.distance}>{distance}</span>
          <h3 className={styles.name}>{name}</h3>
          {description && <p className={styles.description}>{description}</p>}
        </div>
      </div>
    </motion.article>
  );
}

BeachCard.propTypes = {
  name: PropTypes.string.isRequired,
  distance: PropTypes.string.isRequired,
  description: PropTypes.string,
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  mapUrl: PropTypes.string,
  className: PropTypes.string,
};

export default BeachCard;
