import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGallery.module.scss';

/**
 * Image gallery component with lightbox modal
 * Features:
 * - Responsive grid layout
 * - Click to open full-size image in modal
 * - Navigation arrows in modal
 * - Close on ESC key or overlay click
 * - Lazy loading
 */
const ImageGallery = ({ images, columns }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal with selected image
  const openModal = useCallback((index) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  }, []);

  // Close modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedIndex(null), 300); // Wait for animation
  }, []);

  // Navigate to previous image
  const goToPrevious = useCallback(
    (e) => {
      e.stopPropagation();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    },
    [images.length]
  );

  // Navigate to next image
  const goToNext = useCallback(
    (e) => {
      e.stopPropagation();
      setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    },
    [images.length]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious(e);
      } else if (e.key === 'ArrowRight') {
        goToNext(e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closeModal, goToPrevious, goToNext]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  return (
    <>
      {/* Gallery Grid */}
      <div className={`${styles.gallery} ${styles[`cols${columns}`]}`}>
        {images.map((image, index) => (
          <div
            key={index}
            className={styles.imageWrapper}
            onClick={() => openModal(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(index);
              }
            }}
            aria-label={`View ${image.alt || `image ${index + 1}`} in fullscreen`}
          >
            <img
              src={image.thumbnail || image.src}
              alt={image.alt || `Gallery image ${index + 1}`}
              className={styles.image}
              loading="lazy"
            />
            <div className={styles.overlay}>
              <span className={styles.viewIcon}>🔍</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {isModalOpen && selectedIndex !== null && (
        <div
          className={`${styles.modal} ${isModalOpen ? styles.open : ''}`}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            className={styles.closeButton}
            onClick={closeModal}
            aria-label="Close lightbox"
          >
            ✕
          </button>

          {images.length > 1 && (
            <>
              <button
                className={`${styles.navButton} ${styles.prev}`}
                onClick={goToPrevious}
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                className={`${styles.navButton} ${styles.next}`}
                onClick={goToNext}
                aria-label="Next image"
              >
                ›
              </button>
            </>
          )}

          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <img
              src={images[selectedIndex].src}
              alt={images[selectedIndex].alt || `Gallery image ${selectedIndex + 1}`}
              className={styles.modalImage}
            />
            {images[selectedIndex].caption && (
              <p className={styles.caption}>{images[selectedIndex].caption}</p>
            )}
          </div>

          {images.length > 1 && (
            <div className={styles.counter}>
              {selectedIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </>
  );
};

ImageGallery.propTypes = {
  /** Array of image objects */
  images: PropTypes.arrayOf(
    PropTypes.shape({
      /** Full-size image URL */
      src: PropTypes.string.isRequired,
      /** Thumbnail URL (optional, uses src if not provided) */
      thumbnail: PropTypes.string,
      /** Image alt text */
      alt: PropTypes.string,
      /** Image caption for lightbox */
      caption: PropTypes.string,
    })
  ).isRequired,
  /** Number of columns on desktop */
  columns: PropTypes.oneOf([2, 3, 4]),
};

ImageGallery.defaultProps = {
  columns: 3,
};

export default ImageGallery;
