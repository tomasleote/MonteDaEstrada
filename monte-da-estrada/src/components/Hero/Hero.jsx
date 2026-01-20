import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Hero.module.scss';

/**
 * Hero section component for landing pages
 * Features:
 * - Full-screen or custom height
 * - Background image with overlay
 * - Centered content
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
  const heroRef = useRef(null);

  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Transform values for parallax layers
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const ySubtitle = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yCta = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const handleCtaClick = (e) => {
    if (onCtaClick) {
      e.preventDefault();
      onCtaClick();
    }
  };

  return (
    <motion.section
      ref={heroRef}
      className={styles.hero}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        minHeight: height,
        scale
      }}
      role="banner"
      aria-label="Hero section"
    >
      {/* Overlay */}
      <div
        className={styles.overlay}
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlay})` }}
      />

      {/* Content with parallax */}
      <motion.div
        className={`${styles.content} ${styles[`align-${align}`]}`}
        style={{ opacity }}
      >
        <div className={styles.textWrapper}>
          {title && (
            <motion.h1
              className={styles.title}
              style={{ y: yTitle }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {title}
            </motion.h1>
          )}

          {subtitle && (
            <motion.p
              className={styles.subtitle}
              style={{ y: ySubtitle }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {subtitle}
            </motion.p>
          )}

          {ctaText && (
            <motion.div
              className={styles.ctaWrapper}
              style={{ y: yCta }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
      </motion.div>

      {/* Animated scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.span
          className={styles.scrollArrow}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          ↓
        </motion.span>
      </motion.div>
    </motion.section>
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
