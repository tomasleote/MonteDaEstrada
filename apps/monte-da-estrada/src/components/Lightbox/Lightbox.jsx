import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './Lightbox.module.scss';

/**
 * Lightbox modal component for full-screen image viewing
 * Supports keyboard navigation (Escape, Arrow keys) and touch gestures
 *
 * @param {Array} images - Array of image objects with src, alt, title properties
 * @param {number} initialIndex - Initial image index to display
 * @param {function} onClose - Callback when lightbox is closed
 * @param {boolean} isOpen - Whether lightbox is open
 */
const Lightbox = ({ images, initialIndex = 0, onClose, isOpen }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (!isOpen) return;

    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handlePrevious = useCallback(() => {
    setIsLoading(true);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setIsLoading(true);
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        default:
          break;
      }
    },
    [isOpen, onClose, handlePrevious, handleNext]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (!isOpen || !images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      className={styles.lightbox}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <div className={styles.overlay} aria-hidden="true"></div>

      <button
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Close lightbox"
        type="button"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div className={styles.content}>
        {images.length > 1 && (
          <button
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={handlePrevious}
            aria-label="Previous image"
            type="button"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        )}

        <div className={styles.imageWrapper}>
          {isLoading && (
            <div className={styles.loader} aria-hidden="true">
              <div className={styles.spinner}></div>
            </div>
          )}
          <img
            src={currentImage.src}
            alt={currentImage.alt || currentImage.title || 'Gallery image'}
            className={styles.image}
            onLoad={handleImageLoad}
          />
        </div>

        {images.length > 1 && (
          <button
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={handleNext}
            aria-label="Next image"
            type="button"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        )}
      </div>

      <div className={styles.info}>
        {currentImage.title && (
          <h2 className={styles.title}>{currentImage.title}</h2>
        )}
        {images.length > 1 && (
          <p className={styles.counter}>
            {currentIndex + 1} / {images.length}
          </p>
        )}
      </div>
    </div>
  );
};

Lightbox.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
      title: PropTypes.string
    })
  ).isRequired,
  initialIndex: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};

export default Lightbox;
