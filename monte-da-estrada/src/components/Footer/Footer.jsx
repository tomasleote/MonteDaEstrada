import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Contact Information */}
          <div className={styles.section}>
            <h3 className={styles.heading}>Contacto</h3>
            <div className={styles.contactInfo}>
              {contactInfo.phone && (
                <p className={styles.contactItem}>
                  <span className={styles.label}>Telefone:</span>
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
                  <span className={styles.label}>Email:</span>
                  <a href={`mailto:${contactInfo.email}`}>
                    {contactInfo.email}
                  </a>
                </p>
              )}
              {contactInfo.address && (
                <p className={styles.contactItem}>
                  <span className={styles.label}>Localização:</span>
                  <span>{contactInfo.address}</span>
                </p>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.section}>
            <h3 className={styles.heading}>Navegação</h3>
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
            <h3 className={styles.heading}>Monte da Estrada</h3>
            <p className={styles.description}>
              Turismo Rural no Alentejo. Desfrute da tranquilidade do campo alentejano
              num ambiente acolhedor e autêntico.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <p>
            © {new Date().getFullYear()} Monte da Estrada. Todos os direitos reservados.
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
