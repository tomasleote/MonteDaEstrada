import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.scss';

/**
 * Footer component with contact info and quick links
 * Features:
 * - Contact information
 * - Quick navigation links
 * - Copyright notice
 * - Dark background with light text
 */
const Footer = ({ contactInfo, quickLinks }) => {
  const { t } = useTranslation('common');

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Contact Information */}
          <div className={styles.section}>
            <h3 className={styles.heading}>{t('footer.contact')}</h3>
            <div className={styles.contactInfo}>
              {contactInfo.phone && (
                <p className={styles.contactItem}>
                  <span className={styles.label}>{t('footer.phone')}:</span>
                  <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}>
                    {contactInfo.phone}
                  </a>
                </p>
              )}
              {contactInfo.phone2 && (
                <p className={styles.contactItem}>
                  <a href={`tel:${contactInfo.phone2.replace(/\s/g, '')}`}>
                    {contactInfo.phone2}
                  </a>
                </p>
              )}
              {contactInfo.email && (
                <p className={styles.contactItem}>
                  <span className={styles.label}>{t('footer.email')}:</span>
                  <a href={`mailto:${contactInfo.email}`}>
                    {contactInfo.email}
                  </a>
                </p>
              )}
              {contactInfo.address && (
                <p className={styles.contactItem}>
                  <span className={styles.label}>{t('footer.location')}:</span>
                  <span>{contactInfo.address}</span>
                </p>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.section}>
            <h3 className={styles.heading}>{t('footer.navigation')}</h3>
            <ul className={styles.linkList}>
              {quickLinks.map((link) => (
                <li key={link.path} className={styles.linkItem}>
                  <Link to={link.path} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div className={styles.section}>
            <h3 className={styles.heading}>{t('footer.about')}</h3>
            <p className={styles.description}>
              {t('footer.description')}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <p>
            © {new Date().getFullYear()} Monte da Estrada. {t('footer.copyright')}.
          </p>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  /** Contact information object */
  contactInfo: PropTypes.shape({
    phone: PropTypes.string,
    phone2: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
  /** Array of quick navigation links */
  quickLinks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Footer;
