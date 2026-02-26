import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import styles from './HeaderModern.module.scss';

/**
 * Modern header component for luxury hotel websites.
 *
 * TWO SCROLL STATES:
 * 1. TOP OF PAGE: transparent background, 80px height, nav links visible centered
 * 2. SCROLLED (past threshold): dark background, 110px height, box-shadow visible
 *
 * LAYOUT (left to right):
 * - LEFT: Logo/Brand (always visible)
 * - CENTER: Navigation links (hidden on mobile, shown on desktop)
 * - RIGHT: Language switcher (EN | PT) + Propriedades dropdown + Hamburger (mobile only)
 *
 * FEATURES:
 * - Scroll-triggered state transitions with smooth CSS animations
 * - Mobile hamburger menu with full-screen overlay
 * - Language switcher with active state indicator
 * - Propriedades dropdown for multi-property navigation
 * - Responsive design with desktop and mobile layouts
 * - Full keyboard navigation support
 * - ARIA labels for accessibility
 * - Body scroll lock when mobile menu is open
 */
const HeaderModern = ({
  links = [],
  logoDefault = null,
  logoScrolled = null,
  scrollThreshold = 50,
  themeOverrides = {},
  mobileBreakpoint = 1024,
  currentLanguage = 'PT',
  onLanguageChange = null,
  brandName = 'Luxury Hotel',
  properties = [],
  currentPropertyUrl = typeof window !== 'undefined' ? window.location.origin : '',
  showProperties = true,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);
  const propertiesRef = useRef(null);
  const location = useLocation();

  // Reason: Monitor scroll position to trigger header state transition
  // from transparent (top of page) to dark (scrolled).
  // Also closes the properties dropdown on any scroll — prevents the dropdown
  // keeping headerScrolled applied after the user scrolls back to top.
  // setIsPropertiesOpen is a stable React setter so calling it from a
  // stale closure is safe; no-op when already false (no extra re-render).
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > scrollThreshold);
      setIsPropertiesOpen(false);
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

  // Reason: Close properties dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (propertiesRef.current && !propertiesRef.current.contains(e.target)) {
        setIsPropertiesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  // Reason: Close mobile menu and properties dropdown on Escape key press
  useEffect(() => {
    if (!isMenuOpen && !isPropertiesOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsPropertiesOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, isPropertiesOpen]);

  return (
    <header
      className={`${styles.header} ${(isScrolled || isPropertiesOpen) ? styles.headerScrolled : ''} ${
        isPropertiesOpen ? styles.headerPropertiesOpen : ''
      } ${
        isMenuOpen ? styles.headerMenuOpen : ''
      }`}
      role="banner"
      style={themeOverrides}
    >
      {/* LEFT ZONE: Logo/Brand */}
      <div className={styles.leftZone}>
        <a href="/" className={styles.brandLink} aria-label={brandName}>
          {logoDefault ? (
            <img
              src={isScrolled && logoScrolled ? logoScrolled : logoDefault}
              alt={brandName}
              className={styles.logoLeft}
            />
          ) : (
            <span className={styles.brandTextLeft}>{brandName}</span>
          )}
        </a>
      </div>

      {/* CENTER ZONE: Navigation */}
      <div className={styles.centerZone}>
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

      {/* RIGHT ZONE: Propriedades Dropdown + Hamburger (mobile) */}
      <div className={styles.rightZone}>
        {/* Propriedades dropdown */}
        {showProperties && properties.length > 0 && (
          <div className={styles.propertiesDropdown} ref={propertiesRef}>
            <button
              className={styles.propertiesToggle}
              onClick={() => setIsPropertiesOpen(!isPropertiesOpen)}
              aria-haspopup="true"
              aria-expanded={isPropertiesOpen}
              aria-label="Selecionar propriedade"
            >
              PROPRIEDADES <span className={`${styles.propertiesArrow} ${isPropertiesOpen ? styles.propertiesArrowOpen : ''}`}>&#9662;</span>
            </button>
            <ul
              className={`${styles.propertiesMenu} ${isPropertiesOpen ? styles.propertiesMenuOpen : ''}`}
              role="menu"
            >
              {properties.map((property) => (
                <li key={property.url} role="none">
                  <a
                    href={property.url}
                    className={`${styles.propertyItem} ${property.url === currentPropertyUrl ? styles.propertyItemActive : ''}`}
                    role="menuitem"
                    onClick={(e) => {
                      e.preventDefault();
                      if (property.url !== currentPropertyUrl) {
                        window.location.href = property.url;
                      }
                    }}
                  >
                    {property.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Hamburger — mobile only */}
        <button
          className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerOpen : ''} ${styles.hamburgerMobile}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
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

        {/* Propriedades in mobile menu */}
        {showProperties && properties.length > 0 && (
          <ul className={styles.mobilePropertiesList}>
            {properties.map((property) => (
              <li key={property.url}>
                <a
                  href={property.url}
                  className={`${styles.mobileNavLink} ${property.url === currentPropertyUrl ? styles.mobileNavLinkActive : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (property.url !== currentPropertyUrl) {
                      window.location.href = property.url;
                    }
                  }}
                >
                  {property.name}
                </a>
              </li>
            ))}
          </ul>
        )}

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
  /** Logo image URL for default (top-of-page) state */
  logoDefault: PropTypes.string,
  /** Logo image URL shown when header is in scrolled state */
  logoScrolled: PropTypes.string,
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
  /** Array of properties shown in the Propriedades dropdown */
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
  /** URL of the currently active property — used to highlight its entry in the dropdown */
  currentPropertyUrl: PropTypes.string,
  /** Whether to show the Propriedades dropdown */
  showProperties: PropTypes.bool,
};

HeaderModern.defaultProps = {
  links: [],
  logoDefault: null,
  logoScrolled: null,
  scrollThreshold: 50,
  themeOverrides: {},
  mobileBreakpoint: 1024,
  currentLanguage: 'PT',
  onLanguageChange: null,
  brandName: 'Luxury Hotel',
  properties: [],
  currentPropertyUrl: typeof window !== 'undefined' ? window.location.origin : '',
  showProperties: true,
};

export default HeaderModern;
