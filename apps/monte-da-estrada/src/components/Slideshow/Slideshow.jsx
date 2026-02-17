import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './Slideshow.module.scss';

/**
 * Automatic slideshow component with manual controls
 * Features:
 * - Auto-advance every 5 seconds
 * - Manual navigation with arrows
 * - Clicking arrows stops auto-advance
 * - Keyboard navigation (arrow keys, ESC)
 * - Click image to view fullscreen
 */
const Slideshow = ({ images, autoPlayInterval }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Auto-advance slideshow
  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isAutoPlaying, images.length, autoPlayInterval]);

  // Go to previous image
  const goToPrevious = useCallback((e) => {
    e?.stopPropagation();
    setIsAutoPlaying(false); // Stop auto-play when user manually navigates
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  // Go to next image
  const goToNext = useCallback((e) => {
    e?.stopPropagation();
    setIsAutoPlaying(false); // Stop auto-play when user manually navigates
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Go to specific image
  const goToIndex = useCallback((index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  }, []);

  // Open fullscreen
  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  // Close fullscreen
  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'Escape' && isFullscreen) {
        closeFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext, isFullscreen]);

  // Prevent body scroll when fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isFullscreen]);

  if (images.length === 0) {
    return <div className={styles.noImages}>Nenhuma imagem disponível</div>;
  }

  const currentImage = images[currentIndex];

  return (
    <>
      {/* Main Slideshow */}
      <div className={styles.slideshow}>
        <div className={styles.imageContainer} onClick={openFullscreen}>
          <img
            src={currentImage.src}
            alt={currentImage.alt || `Imagem ${currentIndex + 1}`}
            className={styles.image}
            loading="lazy"
          />
          <div className={styles.imageOverlay}>
            <span className={styles.viewIcon}>🔍 Clique para ampliar</span>
          </div>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              className={`${styles.arrow} ${styles.arrowPrev}`}
              onClick={goToPrevious}
              aria-label="Imagem anterior"
            >
              ‹
            </button>
            <button
              className={`${styles.arrow} ${styles.arrowNext}`}
              onClick={goToNext}
              aria-label="Próxima imagem"
            >
              ›
            </button>
          </>
        )}

        {/* Image Caption */}
        {currentImage.caption && (
          <div className={styles.caption}>{currentImage.caption}</div>
        )}

        {/* Dots Navigation */}
        {images.length > 1 && (
          <div className={styles.dots}>
            {images.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
                onClick={() => goToIndex(index)}
                aria-label={`Ir para imagem ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Counter */}
        <div className={styles.counter}>
          {currentIndex + 1} / {images.length}
        </div>

        {/* Auto-play indicator */}
        {!isAutoPlaying && images.length > 1 && (
          <div className={styles.autoPlayStopped}>
            Reprodução automática pausada
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div
          className={styles.fullscreenModal}
          onClick={closeFullscreen}
        >
          <button
            className={styles.closeButton}
            onClick={closeFullscreen}
            aria-label="Fechar visualização"
          >
            ✕
          </button>

          {images.length > 1 && (
            <>
              <button
                className={`${styles.fullscreenArrow} ${styles.fullscreenArrowPrev}`}
                onClick={goToPrevious}
                aria-label="Imagem anterior"
              >
                ‹
              </button>
              <button
                className={`${styles.fullscreenArrow} ${styles.fullscreenArrowNext}`}
                onClick={goToNext}
                aria-label="Próxima imagem"
              >
                ›
              </button>
            </>
          )}

          <div className={styles.fullscreenContent} onClick={(e) => e.stopPropagation()}>
            <img
              src={currentImage.src}
              alt={currentImage.alt || `Imagem ${currentIndex + 1}`}
              className={styles.fullscreenImage}
            />
            {currentImage.caption && (
              <p className={styles.fullscreenCaption}>{currentImage.caption}</p>
            )}
          </div>

          <div className={styles.fullscreenCounter}>
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
};

Slideshow.propTypes = {
  /** Array of image objects */
  images: PropTypes.arrayOf(
    PropTypes.shape({
      /** Image URL */
      src: PropTypes.string.isRequired,
      /** Image alt text */
      alt: PropTypes.string,
      /** Image caption */
      caption: PropTypes.string,
    })
  ).isRequired,
  /** Auto-play interval in milliseconds */
  autoPlayInterval: PropTypes.number,
};

Slideshow.defaultProps = {
  autoPlayInterval: 5000, // 5 seconds
};

export default Slideshow;
