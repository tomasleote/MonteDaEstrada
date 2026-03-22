import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './SuiteCarousel.module.scss';

const SuiteCarousel = ({ images = [], className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Auto-advance carousel every 5 seconds (unless hovering or only 1 image)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Detect touch device
    const touchMedia = window.matchMedia('(pointer: coarse)');
    setIsTouchDevice(touchMedia.matches);

    const handleChange = (e) => setIsTouchDevice(e.matches);
    touchMedia.addEventListener('change', handleChange);
    return () => touchMedia.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // On touch devices, default to paused autoplay
    if (isTouchDevice || isHovering || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovering, isTouchDevice, images.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (!images || images.length === 0) {
    return <div className={styles.carouselEmpty}>No images available</div>;
  }

  return (
    <div
      className={`${styles.carouselContainer} ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className={styles.carouselSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className={styles.carouselImage}
            loading="lazy"
            decoding="async"
            initial={{ scale: 1 }}
            animate={{ scale: 1.02 }}
            transition={{ duration: 8, ease: 'easeInOut' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      {images.length > 1 && (
        <div className={styles.dotsContainer}>
          {images.map((_, index) => (
            <motion.button
              key={index}
              className={`${styles.dot} ${
                index === currentIndex ? styles.active : ''
              }`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
              animate={{ opacity: index === currentIndex ? 1 : 0.5 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      )}

      {/* Left/Right Arrow Controls */}
      {images.length > 1 && (
        <>
          <button
            className={styles.arrowButton}
            onClick={handlePrev}
            aria-label="Previous slide"
          >
            ←
          </button>
          <button
            className={styles.arrowButton}
            onClick={handleNext}
            aria-label="Next slide"
          >
            →
          </button>
        </>
      )}
    </div>
  );
};

export default SuiteCarousel;
