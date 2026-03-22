import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'motion/react';
import { variants, viewport } from '../../constants/motion';
import SuiteCarousel from '../SuiteCarousel/SuiteCarousel';
import styles from './EditorialSplitSection.module.scss';

/**
 * EditorialSplitSection — 50/50 split layout with image and text
 * Responsive: stacks to single column on mobile.
 * Supports eyebrow label, heading, body text (string or array), CTA, and optional credit.
 *
 * @param {Object} props
 * @param {string} props.eyebrow - Optional eyebrow label
 * @param {string} props.heading - Section heading
 * @param {string|string[]} props.body - Body text (string or array of strings)
 * @param {string} props.imageSrc - Section image
 * @param {string} props.imageAlt - Image alt text
 * @param {oneOf(['left', 'right'])} props.imagePosition - Which side the image is on (default: 'left')
 * @param {string} props.ctaLabel - CTA text
 * @param {string} props.ctaHref - CTA href
 * @param {string} props.photographerCredit - Optional photo credit
 * @param {oneOf(['cream', 'offwhite'])} props.background - Section background (default: 'cream')
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement}
 */
function EditorialSplitSection({
  eyebrow,
  heading,
  body,
  imageSrc,
  imageAlt,
  carouselImages,
  imagePosition = 'left',
  ctaLabel,
  ctaHref,
  photographerCredit,
  background = 'cream',
  className = '',
}) {
  const sectionClass = background === 'offwhite' ? styles.backgroundOffwhite : styles.backgroundCream;
  const gridClass = imagePosition === 'right' ? styles.imageRight : styles.imageLeft;

  const bodyArray = Array.isArray(body) ? body : [body];

  return (
    <motion.section
      className={`${styles.section} ${sectionClass} ${gridClass} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewport.default}
    >
      {/* Image Column */}
      <motion.div className={styles.imageColumn} variants={variants.fadeIn}>
        {carouselImages && carouselImages.length > 0 ? (
          <SuiteCarousel images={carouselImages} className={styles.carouselOverride} />
        ) : (
          <img src={imageSrc} alt={imageAlt} className={styles.image} loading="lazy" decoding="async" />
        )}
        {photographerCredit && <p className={styles.credit}>{photographerCredit}</p>}
      </motion.div>

      {/* Text Column */}
      <motion.div className={styles.textColumn} variants={variants.fadeUp}>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}

        <h2 className={styles.heading}>{heading}</h2>

        {bodyArray.map((paragraph, index) => (
          <p key={index} className={styles.bodyParagraph}>
            {paragraph}
          </p>
        ))}

        {ctaLabel && ctaHref && (
          <a href={ctaHref} className={styles.cta}>
            {ctaLabel}
            <span className={styles.arrow}> →</span>
          </a>
        )}
      </motion.div>
    </motion.section>
  );
}

EditorialSplitSection.propTypes = {
  eyebrow: PropTypes.string,
  heading: PropTypes.string.isRequired,
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  carouselImages: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  })),
  imagePosition: PropTypes.oneOf(['left', 'right']),
  ctaLabel: PropTypes.string,
  ctaHref: PropTypes.string,
  photographerCredit: PropTypes.string,
  background: PropTypes.oneOf(['cream', 'offwhite']),
  className: PropTypes.string,
};

export default EditorialSplitSection;
