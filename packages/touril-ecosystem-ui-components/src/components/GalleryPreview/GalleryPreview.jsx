import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'motion/react';
import { variants, viewport } from '../../constants/motion';
import styles from './GalleryPreview.module.scss';

/**
 * GalleryPreview — Asymmetric gallery preview with 3 images
 * Layout: Left tall image (2/3), top-right square, bottom-right square.
 * Responsive: stacks to single column on mobile.
 *
 * @param {Object} props
 * @param {string} props.eyebrow - Eyebrow label (default: 'Galeria')
 * @param {Array} props.images - Array of image objects { src, alt }. Expects 3 images.
 * @param {string} props.ctaLabel - CTA text (default: 'Ver galeria completa')
 * @param {string} props.ctaHref - CTA href (default: '/galeria')
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement}
 */
function GalleryPreview({
  eyebrow = 'Galeria',
  images,
  ctaLabel = 'Ver galeria completa',
  ctaHref = '/galeria',
  className = '',
}) {
  // Safely handle images array
  const safeImages = images.slice(0, 3);

  return (
    <motion.section
      className={`${styles.section} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewport.default}
    >
      {/* Eyebrow */}
      <motion.span className={styles.eyebrow} variants={variants.fadeUp}>
        {eyebrow}
      </motion.span>

      {/* Gallery Grid */}
      <motion.div
        className={styles.gallery}
        variants={variants.staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport.default}
      >
        {safeImages.map((image, index) => (
          <motion.figure
            key={index}
            className={`${styles.imageContainer} ${styles[`image${index + 1}`]}`}
            variants={variants.scaleIn}
          >
            <img src={image.src} alt={image.alt} className={styles.image} />
          </motion.figure>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div className={styles.ctaContainer} variants={variants.fadeUp}>
        <a href={ctaHref} className={styles.cta}>
          {ctaLabel}
          <span className={styles.arrow}> →</span>
        </a>
      </motion.div>
    </motion.section>
  );
}

GalleryPreview.propTypes = {
  eyebrow: PropTypes.string,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ).isRequired,
  ctaLabel: PropTypes.string,
  ctaHref: PropTypes.string,
  className: PropTypes.string,
};

export default GalleryPreview;
