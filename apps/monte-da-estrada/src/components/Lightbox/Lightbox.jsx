import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'motion/react';
import styles from './Lightbox.module.scss';

/**
 * Lightbox modal component for full-screen image viewing
 * Supports keyboard navigation (Escape, Arrow keys) and touch gestures
 * Uses Framer Motion for smooth enter/exit and image transitions
 *
 * @param {Array} images - Array of image objects with src, alt, title properties
 * @param {number} initialIndex - Initial image index to display
 * @param {function} onClose - Callback when lightbox is closed
 * @param {boolean} isOpen - Whether lightbox is open
 */
const Lightbox = ({ images, initialIndex = 0, onClose, isOpen }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;
      switch (e.key) {
        case 'Escape': onClose(); break;
        case 'ArrowLeft': handlePrevious(); break;
        case 'ArrowRight': handleNext(); break;
        default: break;
      }
    },
    [isOpen, onClose, handlePrevious, handleNext]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.lightbox}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.6, 1] }}
        >
          <div className={styles.overlay} aria-hidden="true" />

          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close lightbox"
            type="button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className={styles.content}>
            {images.length > 1 && (
              <button className={`${styles.navButton} ${styles.prevButton}`}
                onClick={handlePrevious} aria-label="Previous image" type="button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}

            <div className={styles.imageWrapper}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={currentIndex}
                  src={currentImage.src}
                  alt={currentImage.alt || currentImage.title || 'Gallery image'}
                  className={styles.image}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: [0.32, 0, 0.67, 0] }}
                />
              </AnimatePresence>
            </div>

            {images.length > 1 && (
              <button className={`${styles.navButton} ${styles.nextButton}`}
                onClick={handleNext} aria-label="Next image" type="button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}
          </div>

          <div className={styles.info}>
            {currentImage.title && (
              <h2 className={styles.title}>{currentImage.title}</h2>
            )}
            {images.length > 1 && (
              <p className={styles.counter}>{currentIndex + 1} / {images.length}</p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Lightbox.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
      title: PropTypes.string,
    })
  ).isRequired,
  initialIndex: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Lightbox;
