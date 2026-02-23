import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'motion/react';
import { variants, viewport } from '../../constants/motion';
import styles from './ExperienceCard.module.scss';

/**
 * ExperienceCard — Portrait magazine-style activity card for the Descobrir page.
 * 3:4 aspect ratio image, no card background/shadow — transparent with bottom border.
 * Category label is whispered at 11px with 2px letter-spacing.
 * Highlights rendered as inline tags with middot separator (not bullet lists).
 * Hover: image scales 1.03, bottom border transitions to clay. No vertical lift.
 *
 * Designed to sit inside a stagger container. Uses staggerItem variant so it
 * participates in parent-controlled stagger animation while also working standalone.
 *
 * @param {Object} props
 * @param {string} props.category - Category key (e.g. 'gastronomia') — used for data-category attr
 * @param {string} props.categoryLabel - Display label (e.g. 'Gastronomia')
 * @param {string} props.title - Experience title
 * @param {string} props.description - Experience description
 * @param {string[]} props.highlights - Array of highlight tags (rendered with middot separator)
 * @param {string} props.imageSrc - Portrait image URL
 * @param {string} props.imageAlt - Image alt text
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement}
 */
function ExperienceCard({
  category,
  categoryLabel,
  title,
  description,
  highlights = [],
  imageSrc,
  imageAlt,
  className = '',
}) {
  return (
    <motion.article
      className={`${styles.card} ${className}`}
      variants={variants.staggerItem}
      initial="hidden"
      whileInView="visible"
      viewport={viewport.default}
    >
      {/* Portrait Image — 3:4 aspect ratio, magazine-style */}
      <div className={styles.imageWrapper}>
        <img src={imageSrc} alt={imageAlt} className={styles.image} />
      </div>

      {/* Card Content */}
      <div className={styles.content}>
        {/* Whispered category label — classification, not shouted */}
        {categoryLabel && (
          <span className={styles.categoryLabel} data-category={category}>
            {categoryLabel}
          </span>
        )}

        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        {/* Highlights as inline tags with middot separator */}
        {highlights.length > 0 && (
          <p className={styles.highlights} aria-label="Destaques">
            {highlights.map((tag, index) => (
              <React.Fragment key={index}>
                <span className={styles.highlightTag}>{tag}</span>
                {index < highlights.length - 1 && (
                  <span className={styles.separator} aria-hidden="true"> · </span>
                )}
              </React.Fragment>
            ))}
          </p>
        )}
      </div>
    </motion.article>
  );
}

ExperienceCard.propTypes = {
  category: PropTypes.string.isRequired,
  categoryLabel: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  highlights: PropTypes.arrayOf(PropTypes.string),
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ExperienceCard;
