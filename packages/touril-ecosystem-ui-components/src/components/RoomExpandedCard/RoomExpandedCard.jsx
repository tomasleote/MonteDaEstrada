import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './RoomExpandedCard.module.scss';

/**
 * Expanded room detail card with image slideshow and full description.
 *
 * @note The description prop supports HTML and uses dangerouslySetInnerHTML.
 *       Ensure content is sanitized before passing (e.g., via DOMPurify) to prevent XSS.
 */
const RoomExpandedCard = ({
  roomId,
  title,
  subtitle,
  description,
  images = [],
  imagePosition = 'left',
  variant = 'light',
  onClose,
  onReserveClick,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isImageRight = imagePosition === 'right';
  const isDark = variant === 'dark';

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Reason: Keyboard navigation for accessibility and better UX
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') goToPrevious();
      else if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, goToPrevious, goToNext]);

  const currentImage = images[currentIndex];

  return (
    <section
      className={`${styles.expandedCard} ${
        isImageRight ? styles.expandedCardReversed : ''
      } ${isDark ? styles.dark : ''} ${className}`}
      data-room-id={roomId}
      role="region"
      aria-label={`Detalhes do quarto: ${title}`}
    >
      <button
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Fechar detalhes do quarto"
      >
        <span aria-hidden="true">&times;</span>
      </button>

      <div className={styles.slideshowColumn}>
        {images.length > 0 && (
          <div className={styles.slideshow}>
            <img
              src={currentImage.src}
              alt={currentImage.alt || `${title} - Imagem ${currentIndex + 1}`}
              className={styles.slideshowImage}
              loading="lazy"
              decoding="async"
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className={`${styles.arrow} ${styles.arrowPrev}`}
                  onClick={goToPrevious}
                  aria-label="Imagem anterior"
                >
                  &#8249;
                </button>
                <button
                  type="button"
                  className={`${styles.arrow} ${styles.arrowNext}`}
                  onClick={goToNext}
                  aria-label="Próxima imagem"
                >
                  &#8250;
                </button>

                <div className={styles.dots}>
                  {images.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`${styles.dot} ${
                        index === currentIndex ? styles.dotActive : ''
                      }`}
                      onClick={() => setCurrentIndex(index)}
                      aria-label={`Ir para imagem ${index + 1}`}
                    />
                  ))}
                </div>

                <div className={styles.counter}>
                  {currentIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className={styles.contentColumn}>
        <div className={styles.contentInner}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.reserveButton}
              onClick={onReserveClick}
              aria-label={`Reservar ${title}`}
            >
              RESERVE JÁ!
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

RoomExpandedCard.propTypes = {
  roomId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  description: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
    })
  ),
  imagePosition: PropTypes.oneOf(['left', 'right']),
  variant: PropTypes.oneOf(['light', 'dark']),
  onClose: PropTypes.func.isRequired,
  onReserveClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

RoomExpandedCard.defaultProps = {
  subtitle: '',
  images: [],
  imagePosition: 'left',
  variant: 'light',
  className: '',
};

export default RoomExpandedCard;
