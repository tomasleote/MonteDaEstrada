import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import styles from './NavBar.module.scss';

/**
 * Navigation bar component with responsive menu
 * Features:
 * - Sticky header on scroll
 * - Mobile hamburger menu
 * - Active page highlighting
 * - Smooth transitions
 */
const NavBar = ({ logo, navItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      role="banner"
    >
      <nav className={styles.nav} role="navigation" aria-label="Main navigation">
        <div className={styles.container}>
          {/* Logo */}
          <Link to="/" className={styles.logo} aria-label="Home">
            {logo ? (
              <img src={logo} alt="Monte da Estrada" />
            ) : (
              <span className={styles.logoText}>Monte da Estrada</span>
            )}
          </Link>

          {/* Mobile menu button */}
          <button
            className={`${styles.menuButton} ${isMenuOpen ? styles.open : ''}`}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="nav-menu"
          >
            <span className={styles.hamburger}></span>
            <span className={styles.hamburger}></span>
            <span className={styles.hamburger}></span>
          </button>

          {/* Navigation menu */}
          <ul
            id="nav-menu"
            className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ''}`}
            role="menubar"
          >
            {navItems.map((item) => (
              <li key={item.path} className={styles.menuItem} role="none">
                <Link
                  to={item.path}
                  className={`${styles.menuLink} ${
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

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div
          className={styles.overlay}
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

NavBar.propTypes = {
  /** Logo image URL (optional) */
  logo: PropTypes.string,
  /** Array of navigation items */
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      /** Display text for the nav item */
      label: PropTypes.string.isRequired,
      /** Route path */
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};

NavBar.defaultProps = {
  logo: null,
};

export default NavBar;
