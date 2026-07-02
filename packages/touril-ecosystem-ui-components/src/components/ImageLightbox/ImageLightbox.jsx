import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import styles from './ImageLightbox.module.scss';

/**
 * ImageLightbox — fullscreen overlay that shows a single image uncropped.
 * Controlled via `index`; navigation and close are delegated to the parent
 * so the underlying gallery stays in sync.
 */
const ImageLightbox = ({ images, index, onIndexChange, onClose }) => {
  const hasMultiple = images.length > 1;
  const prefersReducedMotion = useReducedMotion();

  const goToPrevious = useCallback(() => {
    onIndexChange((index - 1 + images.length) % images.length);
  }, [index, images.length, onIndexChange]);

  const goToNext = useCallback(() => {
    onIndexChange((index + 1) % images.length);
  }, [index, images.length, onIndexChange]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') goToPrevious();
      else if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, goToPrevious, goToNext]);

  const currentImage = images[index];

  return (
    <motion.div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Imagem em ecrã inteiro"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
    >
      <button
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Fechar imagem"
      >
        <span aria-hidden="true">&times;</span>
      </button>

      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={currentImage.src}
          alt={currentImage.alt || 'Imagem do quarto'}
          className={styles.image}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
        />
      </AnimatePresence>

      {hasMultiple && (
        <>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowPrev}`}
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            aria-label="Imagem anterior"
          >
            &#8249;
          </button>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowNext}`}
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            aria-label="Próxima imagem"
          >
            &#8250;
          </button>

          <div className={styles.counter}>
            {index + 1} / {images.length}
          </div>
        </>
      )}
    </motion.div>
  );
};

ImageLightbox.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
    })
  ).isRequired,
  index: PropTypes.number.isRequired,
  onIndexChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImageLightbox;
