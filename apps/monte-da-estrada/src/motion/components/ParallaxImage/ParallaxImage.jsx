import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import PropTypes from 'prop-types';
import styles from './ParallaxImage.module.scss';

/**
 * Subtle scroll-linked parallax image.
 * Image moves at a slower rate than scroll, creating depth.
 * Wrapped in overflow:hidden to prevent edge gaps.
 *
 * Usage:
 *   <ParallaxImage
 *     src="/images/landscape.jpg"
 *     alt="Alentejo landscape"
 *     speed={0.1}
 *   />
 */
const ParallaxImage = ({
  src,
  alt,
  speed = 0.1,
  className = '',
  aspectRatio,
}) => {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Reason: Convert scroll progress to a subtle Y translation
  // speed=0.1 means 10% of viewport height of parallax range
  const yRange = `${speed * 100}%`;
  const y = useTransform(scrollYProgress, [0, 1], [`-${yRange}`, yRange]);

  const containerStyle = aspectRatio ? { aspectRatio } : {};

  // Reason: Skip parallax for users with reduced-motion preference
  if (shouldReduceMotion) {
    return (
      <div
        ref={ref}
        className={`${styles.container} ${className}`}
        style={containerStyle}
      >
        <img src={src} alt={alt} className={styles.image} />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`${styles.container} ${className}`}
      style={containerStyle}
    >
      <motion.img
        src={src}
        alt={alt}
        className={styles.image}
        style={{ y }}
      />
    </div>
  );
};

ParallaxImage.propTypes = {
  /** Image source URL */
  src: PropTypes.string.isRequired,
  /** Image alt text */
  alt: PropTypes.string.isRequired,
  /** Parallax intensity (0 = none, 0.1 = subtle, 0.2 = noticeable) */
  speed: PropTypes.number,
  /** Additional CSS classes for container */
  className: PropTypes.string,
  /** CSS aspect-ratio for the container (e.g., '16/9') */
  aspectRatio: PropTypes.string,
};

export default ParallaxImage;
