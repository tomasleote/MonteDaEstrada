import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'motion/react';
import { variants, viewport } from '../../constants/motion';
import styles from './RoomGrid.module.scss';

/**
 * RoomGrid — Editorial room grid with portrait cards
 * Displays rooms in a responsive grid (3 cols desktop, 2 tablet, 1 mobile).
 * Each card shows room number, title, subtitle, and image.
 *
 * @param {Object} props
 * @param {string} props.eyebrow - Optional eyebrow label
 * @param {string} props.heading - Section heading
 * @param {string} props.subHeading - Optional subheading
 * @param {Array} props.rooms - Array of room objects { id, title, subtitle, imageSrc, imageAlt }
 * @param {string} props.ctaLabel - CTA button text
 * @param {string} props.ctaHref - CTA button href
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement}
 */
function RoomGrid({
  eyebrow,
  heading,
  subHeading,
  rooms,
  ctaLabel,
  ctaHref,
  className = '',
}) {
  return (
    <motion.section
      className={`${styles.section} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewport.default}
    >
      {/* Section Header */}
      <motion.div className={styles.header} variants={variants.fadeUp}>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        <h2 className={styles.heading}>{heading}</h2>
        {subHeading && <p className={styles.subHeading}>{subHeading}</p>}
      </motion.div>

      {/* Room Grid */}
      <motion.div
        className={styles.grid}
        variants={variants.staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport.default}
      >
        {rooms.map((room, index) => (
          <motion.div key={room.id} className={styles.roomCard} variants={variants.staggerItem}>
            <div className={styles.imageWrapper}>
              <img src={room.imageSrc} alt={room.imageAlt} className={styles.image} />
            </div>

            <div className={styles.content}>
              <span className={styles.roomNumber}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.roomTitle}>{room.title}</h3>
              <p className={styles.roomSubtitle}>{room.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Section */}
      {ctaLabel && ctaHref && (
        <motion.div className={styles.ctaSection} variants={variants.fadeUp}>
          <a href={ctaHref} className={styles.ctaButton}>
            {ctaLabel}
          </a>
        </motion.div>
      )}
    </motion.section>
  );
}

RoomGrid.propTypes = {
  eyebrow: PropTypes.string,
  heading: PropTypes.string.isRequired,
  subHeading: PropTypes.string,
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
      imageSrc: PropTypes.string.isRequired,
      imageAlt: PropTypes.string.isRequired,
    })
  ).isRequired,
  ctaLabel: PropTypes.string,
  ctaHref: PropTypes.string,
  className: PropTypes.string,
};

export default RoomGrid;
