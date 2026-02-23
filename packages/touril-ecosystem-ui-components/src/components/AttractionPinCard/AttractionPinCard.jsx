import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'motion/react';
import { variants, viewport } from '../../constants/motion';
import styles from './AttractionPinCard.module.scss';

/**
 * AttractionPinCard — Horizontal card for the Redondezas dark section.
 * Image left, text right on a charcoal (#4A4845) background — subtle lift from deep brown.
 * Square image crop on desktop, 16:9 on mobile.
 * Hover: card lightens, image dims slightly — shifts visual weight to text.
 *
 * Designed for the stagger container in the dark Redondezas section.
 *
 * @param {Object} props
 * @param {string} props.title - Attraction name
 * @param {string} props.location - Location label (e.g. 'Vila Histórica')
 * @param {string} props.distance - Distance from property (e.g. '15 km')
 * @param {string} props.description - Brief description
 * @param {string} props.imageSrc - Image URL
 * @param {string} props.imageAlt - Image alt text
 * @param {string} props.mapUrl - Optional Google Maps URL to open in new tab
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement}
 */
function AttractionPinCard({
  title,
  location,
  distance,
  description,
  imageSrc,
  imageAlt,
  mapUrl,
  className = '',
}) {
  const handleClick = () => {
    if (mapUrl) {
      window.open(mapUrl, '_blank');
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
      {/* Image — square on desktop, 16:9 on mobile */}
      <div className={styles.imageWrapper}>
        <img src={imageSrc} alt={imageAlt} className={styles.image} />
      </div>

      {/* Text content */}
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.location}>{location}</span>
          <span className={styles.distance}>{distance}</span>
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </motion.article>
  );
}

AttractionPinCard.propTypes = {
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  distance: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  mapUrl: PropTypes.string,
  className: PropTypes.string,
};

export default AttractionPinCard;
