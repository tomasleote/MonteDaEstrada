import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import styles from './HeaderModern.module.scss';

/**
 * Modern header component for luxury hotel websites (e.g., casadesaolourenco.pt).
 *
 * TWO SCROLL STATES:
 * 1. TOP OF PAGE: transparent background, 80px height, logo hidden, nav links visible centered
 * 2. SCROLLED (past threshold): dark background, 110px height, logo visible (centered above nav),
 *    nav links pushed below logo, box-shadow visible
 *
 * LAYOUT (left to right):
 * - LEFT: Hamburger menu button + Language switcher (EN | PT)
 * - CENTER: Navigation links (hidden on mobile, shown on desktop)
 * - CENTER TOP (scrolled only): Logo appears above nav links
 * - RIGHT: Reserve/booking button
 *
 * FEATURES:
 * - Scroll-triggered state transitions with smooth CSS animations (0.5s ease-in)
 * - Mobile hamburger menu with full-screen overlay
 * - Language switcher with active state indicator
 * - Responsive design with desktop and mobile layouts
 * - Full keyboard navigation support
 * - ARIA labels for accessibility
 * - Body scroll lock when mobile menu is open
 * - Mobile fixed bottom reserve button (full-width, gold background)
 */
const HeaderModern = ({
  links = [],
  logoDefault = null,
  logoScrolled = null,
  onReserveClick = null,
  reserveLabel = 'RESERVE ONLINE',
  scrollThreshold = 50,
  themeOverrides = {},
  mobileBreakpoint = 1024,
  currentLanguage = 'PT',
  onLanguageChange = null,
  brandName = 'Luxury Hotel',
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Reason: Monitor scroll position to trigger header state transition
  // from transparent (top of page) to dark (scrolled)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollThreshold]);

  // Reason: Lock body scroll when mobile menu is open to prevent
  // background scrolling while overlay menu is visible
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  /**
   * Check if the current route matches a navigation path
   * @param {string} path - The path to check
   * @returns {boolean} True if the current path matches
   */
  const isActivePath = (path) => {
    return location.pathname === path;
  };

  /**
   * Close mobile menu when a link is clicked
   */
  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Reason: Close mobile menu on Escape key press
  // Handler defined inside useEffect to avoid stale closure
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''} ${
        isMenuOpen ? styles.headerMenuOpen : ''
      }`}
      role="banner"
      style={themeOverrides}
    >
      {/* LEFT ZONE: Hamburger Menu + Language Switcher */}
      <div className={styles.leftZone}>
        <button
          className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>

        <div className={styles.languageSwitcher}>
          <button
            className={`${styles.langButton} ${
              currentLanguage === 'EN' ? styles.langButtonActive : ''
            }`}
            onClick={() => onLanguageChange && onLanguageChange('EN')}
            aria-label="Switch to English"
            aria-pressed={currentLanguage === 'EN'}
          >
            EN
          </button>
          <span className={styles.langSeparator} aria-hidden="true" />
          <button
            className={`${styles.langButton} ${
              currentLanguage === 'PT' ? styles.langButtonActive : ''
            }`}
            onClick={() => onLanguageChange && onLanguageChange('PT')}
            aria-label="Mudar para Português"
            aria-pressed={currentLanguage === 'PT'}
          >
            PT
          </button>
        </div>
      </div>

      {/* CENTER ZONE: Logo/Brand (when scrolled) + Navigation */}
      <div className={styles.centerZone}>
        <div className={styles.logoContainer}>
          {logoScrolled ? (
            <img
              src={logoScrolled}
              alt={brandName}
              className={styles.logo}
            />
          ) : (
            <span className={styles.brandText}>{brandName}</span>
          )}
        </div>

        <nav
          className={styles.nav}
          role="navigation"
          aria-label="Main navigation"
        >
          <ul className={styles.navList} role="menubar">
            {links.map((link) => (
              <li key={link.to || link.label} className={styles.navItem} role="none">
                {link.external ? (
                  <a
                    href={link.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.navLink}
                    role="menuitem"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={link.to}
                    className={`${styles.navLink} ${
                      isActivePath(link.to) ? styles.navLinkActive : ''
                    }`}
                    role="menuitem"
                    aria-current={isActivePath(link.to) ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* RIGHT ZONE: Reserve Button (Desktop) */}
      <div className={styles.rightZone}>
        <button
          className={styles.reserveButton}
          onClick={onReserveClick}
          aria-label={reserveLabel}
        >
          {reserveLabel}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={styles.mobileMenu}
        id="mobile-menu"
      >
        <nav className={styles.mobileNav} role="navigation">
          <ul className={styles.mobileNavList} role="menubar">
            {links.map((link) => (
              <li key={link.to || link.label} role="none">
                {link.external ? (
                  <a
                    href={link.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.mobileNavLink}
                    role="menuitem"
                    onClick={handleNavLinkClick}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={link.to}
                    className={`${styles.mobileNavLink} ${
                      isActivePath(link.to) ? styles.mobileNavLinkActive : ''
                    }`}
                    role="menuitem"
                    aria-current={isActivePath(link.to) ? 'page' : undefined}
                    onClick={handleNavLinkClick}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* MOBILE RESERVE BUTTON (Fixed bottom, full-width) */}
      <div className={styles.mobileReserveBar}>
        <button
          className={styles.mobileReserveButton}
          onClick={onReserveClick}
          aria-label={reserveLabel}
        >
          {reserveLabel}
        </button>
      </div>

      {/* Accessibility: SR-only skip links */}
      <span className={styles.srOnly}>
        {isMenuOpen ? 'Mobile menu is open' : 'Mobile menu is closed'}
      </span>
    </header>
  );
};

HeaderModern.propTypes = {
  /** Array of navigation items with label, to (path), and optional external flag */
  links: PropTypes.arrayOf(
    PropTypes.shape({
      /** Display text for the navigation link */
      label: PropTypes.string.isRequired,
      /** Route path or external URL */
      to: PropTypes.string.isRequired,
      /** If true, link opens in new tab; if false, uses react-router-dom Link */
      external: PropTypes.bool,
    })
  ),
  /** Logo image URL for top-of-page state (currently unused but available for future use) */
  logoDefault: PropTypes.string,
  /** Logo image URL shown when header is in scrolled state (centered above nav) */
  logoScrolled: PropTypes.string,
  /** Callback function triggered when reserve button is clicked */
  onReserveClick: PropTypes.func,
  /** Text displayed on the reserve button */
  reserveLabel: PropTypes.string,
  /** Pixel threshold for scroll state trigger (default: 50px) */
  scrollThreshold: PropTypes.number,
  /** CSS-in-JS style object for component-wide theme overrides */
  themeOverrides: PropTypes.object,
  /** Pixel width at which mobile menu becomes active (default: 1024px) */
  mobileBreakpoint: PropTypes.number,
  /** Current language ('EN' or 'PT') for language switcher active state */
  currentLanguage: PropTypes.oneOf(['EN', 'PT']),
  /** Callback function triggered when language is changed; receives language code as argument */
  onLanguageChange: PropTypes.func,
  /** Brand name for image alt text and accessibility labels */
  brandName: PropTypes.string,
};

HeaderModern.defaultProps = {
  links: [],
  logoDefault: null,
  logoScrolled: null,
  onReserveClick: null,
  reserveLabel: 'RESERVE ONLINE',
  scrollThreshold: 50,
  themeOverrides: {},
  mobileBreakpoint: 1024,
  currentLanguage: 'PT',
  onLanguageChange: null,
  brandName: 'Luxury Hotel',
};

export default HeaderModern;
