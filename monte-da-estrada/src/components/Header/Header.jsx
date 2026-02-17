import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import styles from './Header.module.scss';

/**
 * Three-tier header component matching Touril parent site design.
 *
 * Features:
 * - Tier 1: Language selector (utility bar)
 * - Tier 2: Logo + brand name + RESERVAS button + WhatsApp button (branding bar)
 * - Tier 3: Main navigation (navigation bar)
 * - Sticky positioning on scroll
 * - Mobile-responsive design
 * - Accessible navigation with ARIA labels
 */
const Header = ({
  logo,
  brandName,
  navigationItems = [],
  sticky = true,
  onReservasClick,
  whatsappPhone = null,
  phone = null,
  currentLanguage = 'PT',
  onLanguageChange,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Reason: Monitor scroll position to apply visual effects (shadow, etc.)
  // when header is not at the top of the page
  useEffect(() => {
    if (!sticky) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sticky]);

  /**
   * Check if the current route matches a navigation path
   * @param {string} path - The path to check
   * @returns {boolean} True if the current path matches
   */
  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`${styles.header} ${sticky ? styles.sticky : ''} ${
        isScrolled ? styles.scrolled : ''
      }`}
      role="banner"
    >
      {/* Tier 1: Utility Bar - Language Selector */}
      <div className={styles.utilityBar}>
        <div className={styles.container}>
          <div className={styles.languageSelector}>
            <button
              className={`${styles.langLink} ${
                currentLanguage === 'EN' ? styles.active : ''
              }`}
              onClick={() => onLanguageChange && onLanguageChange('EN')}
              aria-label="Switch to English"
            >
              EN
            </button>
            <span className={styles.separator}>|</span>
            <button
              className={`${styles.langLink} ${
                currentLanguage === 'PT' ? styles.active : ''
              }`}
              onClick={() => onLanguageChange && onLanguageChange('PT')}
              aria-label="Mudar para Português"
            >
              PT
            </button>
          </div>
        </div>
      </div>

      {/* Tier 2: Branding - Logo + Name + RESERVAS Button + WhatsApp Button */}
      <div className={styles.brandingBar}>
        <div className={styles.container}>
          <Link to="/" className={styles.brandSection} aria-label="Home">
            {logo && (
              <img src={logo} alt={brandName} className={styles.logo} />
            )}
            <span className={styles.brandName}>{brandName}</span>
          </Link>

          <div className={styles.buttonGroup}>
            {whatsappPhone && (
              <a
                href={`https://wa.me/${whatsappPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappButton}
                aria-label="Contact via WhatsApp"
              >
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
            )}

            {phone && (
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className={styles.phoneLink}
                aria-label={`Ligar para ${phone}`}
              >
                <FontAwesomeIcon icon={faWhatsapp} className={styles.phoneIcon} />
                <span className={styles.phoneNumber}>{phone}</span>
              </a>
            )}

            <button
              className={styles.reservasButton}
              onClick={onReservasClick}
              aria-label="Fazer Reserva"
            >
              RESERVAS
            </button>
          </div>
        </div>
      </div>

      {/* Tier 3: Navigation */}
      <nav
        className={styles.navigationBar}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className={styles.container}>
          <ul className={styles.navList} role="menubar">
            {navigationItems.map((item) => (
              <li key={item.path} className={styles.navItem} role="none">
                <Link
                  to={item.path}
                  className={`${styles.navLink} ${
                    isActivePath(item.path) ? styles.active : ''
                  }`}
                  role="menuitem"
                  aria-current={isActivePath(item.path) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

Header.propTypes = {
  /** Logo image URL (optional circular gold icon) */
  logo: PropTypes.string,
  /** Brand name displayed in header */
  brandName: PropTypes.string.isRequired,
  /** Array of navigation items */
  navigationItems: PropTypes.arrayOf(
    PropTypes.shape({
      /** Display text for navigation item */
      label: PropTypes.string.isRequired,
      /** Route path for the link */
      path: PropTypes.string.isRequired,
    })
  ),
  /** Enable sticky positioning on scroll */
  sticky: PropTypes.bool,
  /** Callback function when RESERVAS button is clicked */
  onReservasClick: PropTypes.func,
  /** WhatsApp phone number in format: 351XXXXXXXXX (without +) */
  whatsappPhone: PropTypes.string,
  /** Phone number displayed in header (e.g. '+351 960 254 072') */
  phone: PropTypes.string,
  /** Current language ('EN' or 'PT') */
  currentLanguage: PropTypes.oneOf(['EN', 'PT']),
  /** Callback function when language is changed */
  onLanguageChange: PropTypes.func,
};

Header.defaultProps = {
  logo: null,
  navigationItems: [],
  sticky: true,
  onReservasClick: null,
  whatsappPhone: null,
  phone: null,
  currentLanguage: 'PT',
  onLanguageChange: null,
};

export default Header;
