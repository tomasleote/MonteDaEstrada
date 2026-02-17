import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './ResponsiveImage.module.scss';

/**
 * ResponsiveImage component for optimal image delivery
 * Supports lazy loading, responsive srcsets, and accessibility
 *
 * @param {string} src - Image source URL (required)
 * @param {string} alt - Alt text for accessibility (required)
 * @param {string} srcset - Optional srcset for responsive images
 * @param {string} sizes - Optional sizes attribute for responsive loading
 * @param {string} className - Optional CSS class for custom styling
 * @param {boolean} lazy - Enable lazy loading (default: true)
 * @param {string} aspectRatio - Optional aspect ratio (e.g., '16/9', '4/3', '1/1')
 * @param {string} objectFit - CSS object-fit value (default: 'cover')
 * @param {function} onClick - Optional click handler
 * @param {string} loading - Loading strategy: 'lazy', 'eager', or 'auto' (default: 'lazy')
 */
const ResponsiveImage = ({
  src,
  alt,
  srcset,
  sizes,
  className = '',
  lazy = true,
  aspectRatio,
  objectFit = 'cover',
  onClick,
  loading = 'lazy'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!lazy) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px' // Start loading 50px before image enters viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [lazy]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const containerStyle = aspectRatio
    ? { aspectRatio }
    : {};

  const imgStyle = {
    objectFit
  };

  return (
    <div
      ref={imgRef}
      className={`${styles.imageContainer} ${className} ${
        isLoaded ? styles.loaded : ''
      }`}
      style={containerStyle}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyPress={onClick ? (e) => e.key === 'Enter' && onClick(e) : undefined}
    >
      {isInView && (
        <>
          <img
            src={src}
            alt={alt}
            srcSet={srcset}
            sizes={sizes}
            className={styles.image}
            style={imgStyle}
            loading={loading}
            decoding="async"
            onLoad={handleLoad}
          />
          {!isLoaded && (
            <div className={styles.placeholder} aria-hidden="true">
              <div className={styles.spinner}></div>
            </div>
          )}
        </>
      )}
      {!isInView && (
        <div className={styles.placeholder} aria-hidden="true"></div>
      )}
    </div>
  );
};

ResponsiveImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  srcset: PropTypes.string,
  sizes: PropTypes.string,
  className: PropTypes.string,
  lazy: PropTypes.bool,
  aspectRatio: PropTypes.string,
  objectFit: PropTypes.oneOf(['cover', 'contain', 'fill', 'none', 'scale-down']),
  onClick: PropTypes.func,
  loading: PropTypes.oneOf(['lazy', 'eager', 'auto'])
};

export default ResponsiveImage;
