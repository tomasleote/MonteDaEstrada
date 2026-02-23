import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'motion/react';
import { variants, viewport } from '../../constants/motion';
import styles from './EditorialAnchor.module.scss';

/**
 * EditorialAnchor — Property introduction section
 * Centered, elegant layout with property name, tagline, body text, and contact info.
 * Uses staggered animation for children elements.
 *
 * @param {Object} props
 * @param {string} props.propertyName - Property name (e.g. "Monte da Estrada")
 * @param {string} props.tagline - Short tagline or subtitle
 * @param {string} props.body - Body prose text
 * @param {string} props.email - Contact email
 * @param {string} props.phone - Contact phone
 * @param {string} props.ctaLabel - CTA text link label
 * @param {string} props.ctaHref - CTA href
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement}
 */
function EditorialAnchor({
  propertyName,
  tagline,
  body,
  email,
  phone,
  ctaLabel,
  ctaHref,
  className = '',
}) {
  return (
    <motion.section
      className={`${styles.section} ${className}`}
      variants={variants.staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewport.default}
    >
      <motion.h1 className={styles.propertyName} variants={variants.staggerItem}>
        {propertyName}
      </motion.h1>

      <motion.p className={styles.tagline} variants={variants.staggerItem}>
        {tagline}
      </motion.p>

      <motion.p className={styles.body} variants={variants.staggerItem}>
        {body}
      </motion.p>

      {(email || phone) && (
        <motion.p className={styles.contact} variants={variants.staggerItem}>
          {email && <a href={`mailto:${email}`}>{email}</a>}
          {email && phone && ' · '}
          {phone && <a href={`tel:${phone}`}>{phone}</a>}
        </motion.p>
      )}

      {ctaLabel && ctaHref && (
        <motion.a href={ctaHref} className={styles.cta} variants={variants.staggerItem}>
          {ctaLabel}
        </motion.a>
      )}
    </motion.section>
  );
}

EditorialAnchor.propTypes = {
  propertyName: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  email: PropTypes.string,
  phone: PropTypes.string,
  ctaLabel: PropTypes.string,
  ctaHref: PropTypes.string,
  className: PropTypes.string,
};

export default EditorialAnchor;
