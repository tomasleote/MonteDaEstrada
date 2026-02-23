import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'motion/react';
import { variants, viewport } from '../../constants/motion';
import styles from './BookingSection.module.scss';

/**
 * BookingSection — Dark booking call-to-action section
 * Features contact options (email, phone, WhatsApp) and primary CTA button.
 *
 * @param {Object} props
 * @param {string} props.eyebrow - Eyebrow label (default: 'Reservas')
 * @param {string} props.heading - Main heading (default: 'Marque a sua estadia.')
 * @param {string} props.fallbackEmail - Contact email (required)
 * @param {string} props.fallbackPhone - Contact phone (required)
 * @param {string} props.whatsappNumber - Optional WhatsApp number (international format without +)
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement}
 */
function BookingSection({
  eyebrow = 'Reservas',
  heading = 'Marque a sua estadia.',
  fallbackEmail,
  fallbackPhone,
  whatsappNumber,
  className = '',
}) {
  return (
    <motion.section
      className={`${styles.section} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewport.default}
    >
      <motion.span className={styles.eyebrow} variants={variants.fadeUp}>
        {eyebrow}
      </motion.span>

      <motion.h2 className={styles.heading} variants={variants.fadeUp}>
        {heading}
      </motion.h2>

      <motion.p className={styles.description} variants={variants.fadeUp}>
        Seis quartos. Reserve diretamente para o melhor tarifário.
      </motion.p>

      {/* Contact Options */}
      <motion.div className={styles.contactOptions} variants={variants.fadeUp}>
        <a href={`mailto:${fallbackEmail}`} className={styles.contactItem}>
          <span className={styles.icon}>✉</span>
          <span className={styles.contactText}>{fallbackEmail}</span>
        </a>

        <a href={`tel:${fallbackPhone}`} className={styles.contactItem}>
          <span className={styles.icon}>☎</span>
          <span className={styles.contactText}>{fallbackPhone}</span>
        </a>

        {whatsappNumber && (
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactItem}
          >
            <span className={styles.icon}>💬</span>
            <span className={styles.contactText}>WhatsApp</span>
          </a>
        )}
      </motion.div>

      {/* Primary CTA Button */}
      <motion.a
        href={`mailto:${fallbackEmail}`}
        className={styles.ctaButton}
        variants={variants.fadeUp}
      >
        Reservar Agora
      </motion.a>

      {/* Note */}
      <motion.p className={styles.note} variants={variants.fadeUp}>
        Resposta em 24 horas.
      </motion.p>
    </motion.section>
  );
}

BookingSection.propTypes = {
  eyebrow: PropTypes.string,
  heading: PropTypes.string,
  fallbackEmail: PropTypes.string.isRequired,
  fallbackPhone: PropTypes.string.isRequired,
  whatsappNumber: PropTypes.string,
  className: PropTypes.string,
};

export default BookingSection;
