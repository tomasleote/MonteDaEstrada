import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'motion/react';
import { variants, viewport } from '../../constants/motion';
import InlineBookingWidget from '../BookingWidget/InlineBookingWidget';
import styles from './BookingSection.module.scss';

const BOOKING_URL = 'https://be.heytravel.net/da157c05-a630-43a2-a15b-732f96c563f2?occupation=%5B%7B%22room%22%3A1%2C%22adults%22%3A2%2C%22children%22%3A0%7D%5D&complex=1828&lang=pt-PT';

/**
 * BookingSection — Dark booking call-to-action section.
 *
 * @param {Object} props
 * @param {string} props.eyebrow - Eyebrow label (default: 'Reservas')
 * @param {string} props.heading - Main heading (default: 'Marque a sua estadia.')
 * @param {string} [props.description] - Body copy beneath the heading
 * @param {string} [props.fallbackEmail] - Contact email
 * @param {string} [props.fallbackPhone] - Contact phone
 * @param {string} [props.whatsappNumber] - WhatsApp number (international format without +)
 * @param {boolean} [props.isMobile] - If true, renders a "Reservar" link button instead of the inline widget
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 */
function BookingSection({
  eyebrow = 'Reservas',
  heading = 'Marque a sua estadia.',
  description = 'Seis quartos. Reserve diretamente para o melhor tarifário.',
  fallbackEmail,
  fallbackPhone,
  whatsappNumber,
  isMobile = false,
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
        {description}
      </motion.p>

      {/* Primary CTA — mobile: link button | desktop: inline widget */}
      <motion.div variants={variants.fadeUp} className={styles.widgetContainer}>
        {isMobile ? (
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.reserveButton}
          >
            Reservar
          </a>
        ) : (
          <InlineBookingWidget />
        )}
      </motion.div>

      {/* Contact Options — secondary, always visible */}
      <motion.div className={styles.contactOptions} variants={variants.fadeUp}>
        {fallbackEmail && (
          <a href={`mailto:${fallbackEmail}`} className={styles.contactItem}>
            <span className={styles.icon}>✉</span>
            <span className={styles.contactText}>{fallbackEmail}</span>
          </a>
        )}

        {fallbackPhone && (
          <a href={`tel:${fallbackPhone}`} className={styles.contactItem}>
            <span className={styles.icon}>☎</span>
            <span className={styles.contactText}>{fallbackPhone}</span>
          </a>
        )}

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
  description: PropTypes.string,
  fallbackEmail: PropTypes.string,
  fallbackPhone: PropTypes.string,
  whatsappNumber: PropTypes.string,
  isMobile: PropTypes.bool,
  className: PropTypes.string,
};

export default BookingSection;
