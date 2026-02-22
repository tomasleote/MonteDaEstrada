import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'motion/react';
import { heroTitle, heroSubtitle, heroCta } from '@/motion';
import styles from './Hero.module.scss';

/**
 * Hero section component for landing pages
 * Features:
 * - Full-screen or custom height
 * - Background image with overlay
 * - Centered content with choreographed motion entrance
 * - Optional CTA button
 * - Parallax effect (optional)
 */
const Hero = ({
  backgroundImage,
  title,
  subtitle,
  ctaText,
  ctaLink,
  onCtaClick,
  height,
  overlay,
  align,
}) => {
  const heroStyle = {
    backgroundImage: `url(${backgroundImage})`,
    minHeight: height,
  };

  const handleCtaClick = (e) => {
    if (onCtaClick) {
      e.preventDefault();
      onCtaClick();
    }
  };

  return (
    <section
      className={styles.hero}
      style={heroStyle}
      role="banner"
      aria-label="Hero section"
    >
      {/* Overlay */}
      <div
        className={styles.overlay}
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlay})` }}
      />

      {/* Content */}
      <div className={`${styles.content} ${styles[`align-${align}`]}`}>
        <div className={styles.textWrapper}>
          {title && (
            <motion.h1
              className={styles.title}
              initial="hidden"
              animate="visible"
              variants={heroTitle}
            >
              {title}
            </motion.h1>
          )}

          {subtitle && (
            <motion.p
              className={styles.subtitle}
              initial="hidden"
              animate="visible"
              variants={heroSubtitle}
            >
              {subtitle}
            </motion.p>
          )}

          {ctaText && (
            <motion.div
              className={styles.ctaWrapper}
              initial="hidden"
              animate="visible"
              variants={heroCta}
            >
              {ctaLink ? (
                <a
                  href={ctaLink}
                  className={styles.cta}
                  onClick={handleCtaClick}
                >
                  {ctaText}
                </a>
              ) : (
                <button
                  className={styles.cta}
                  onClick={handleCtaClick}
                >
                  {ctaText}
                </button>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll indicator (optional) */}
      <motion.div
        className={styles.scrollIndicator}
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className={styles.scrollArrow}>↓</span>
      </motion.div>
    </section>
  );
};

Hero.propTypes = {
  /** Background image URL */
  backgroundImage: PropTypes.string.isRequired,
  /** Main heading text */
  title: PropTypes.string,
  /** Subtitle or description text */
  subtitle: PropTypes.string,
  /** Call-to-action button text */
  ctaText: PropTypes.string,
  /** Call-to-action link URL */
  ctaLink: PropTypes.string,
  /** Call-to-action click handler */
  onCtaClick: PropTypes.func,
  /** Hero section height (CSS value) */
  height: PropTypes.string,
  /** Overlay opacity (0-1) */
  overlay: PropTypes.number,
  /** Content alignment */
  align: PropTypes.oneOf(['left', 'center', 'right']),
};

Hero.defaultProps = {
  title: null,
  subtitle: null,
  ctaText: null,
  ctaLink: null,
  onCtaClick: null,
  height: '100vh',
  overlay: 0.4,
  align: 'center',
};

export default Hero;
