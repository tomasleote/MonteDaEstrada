import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'motion/react';
import { variants, viewport } from '../../constants/motion';
import styles from './FullBleedImage.module.scss';

/**
 * FullBleedImage — Full-width image with optional caption and credit
 * Photography-focused component with minimal UI.
 *
 * @param {Object} props
 * @param {string} props.imageSrc - Image URL
 * @param {string} props.alt - Alt text for accessibility
 * @param {string} props.caption - Optional caption text overlay
 * @param {string} props.photographerCredit - Optional photographer credit
 * @param {string} props.height - CSS height value (default: '70vh')
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement}
 */
function FullBleedImage({
  imageSrc,
  alt,
  caption,
  photographerCredit,
  height = '70vh',
  className = '',
}) {
  return (
    <motion.figure
      className={`${styles.container} ${className}`}
      style={{ height }}
      initial="hidden"
      whileInView="visible"
      viewport={viewport.eager}
    >
      <motion.img
        src={imageSrc}
        alt={alt}
        className={styles.image}
        variants={variants.fadeIn}
      />

      {caption && (
        <motion.figcaption className={styles.caption} variants={variants.fadeIn}>
          <div className={styles.captionGradient} />
          <span className={styles.captionText}>{caption}</span>
        </motion.figcaption>
      )}

      {photographerCredit && (
        <motion.div className={styles.credit} variants={variants.fadeIn}>
          {photographerCredit}
        </motion.div>
      )}
    </motion.figure>
  );
}

FullBleedImage.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  caption: PropTypes.string,
  photographerCredit: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
};

export default FullBleedImage;
