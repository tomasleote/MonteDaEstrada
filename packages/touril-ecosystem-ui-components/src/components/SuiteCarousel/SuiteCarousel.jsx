import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import styles from './SuiteCarousel.module.scss';

// Callers pass either plain URLs or { src, alt } objects — accept both.
const normalize = (images, alts = []) =>
  images.map((image, index) =>
    typeof image === 'string'
      ? { src: image, alt: alts[index] || '' }
      : image
  );

const SuiteCarousel = ({ images = [], imageAlts = [], onImageClick, className = '' }) => {
  const slides = normalize(images, imageAlts);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

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

  // Autoplay only once the carousel is properly on screen, and rewind to the
  // first slide whenever it leaves. Without this the timer runs from mount, so
  // the visitor arrives at a carousel that is already several slides in.
  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.intersectionRatio >= 0.5);
        if (entry.intersectionRatio === 0) setCurrentIndex(0);
      },
      { threshold: [0, 0.5] }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // On touch devices, default to paused autoplay
    if (!isInView || isTouchDevice || isHovering || prefersReducedMotion || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isInView, isHovering, isTouchDevice, prefersReducedMotion, slides.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  if (slides.length === 0) {
    return <div className={styles.carouselEmpty}>No images available</div>;
  }

  return (
    <div
      ref={containerRef}
      className={`${styles.carouselContainer} ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onFocus={() => setIsHovering(true)}
      onBlur={() => setIsHovering(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className={styles.carouselSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
        >
          <motion.img
            src={slides[currentIndex].src}
            alt={slides[currentIndex].alt}
            className={`${styles.carouselImage} ${onImageClick ? styles.clickable : ''}`}
            loading="eager"
            decoding="async"
            onClick={onImageClick ? () => onImageClick(currentIndex) : undefined}
            role={onImageClick ? 'button' : undefined}
            tabIndex={onImageClick ? 0 : undefined}
            onKeyDown={
              onImageClick
                ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onImageClick(currentIndex);
                    }
                  }
                : undefined
            }
            initial={{ scale: 1 }}
            animate={{ scale: prefersReducedMotion ? 1 : 1.02 }}
            transition={{ duration: 8, ease: 'easeInOut' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Warm the next slide so the cross-fade never lands on a blank frame */}
      {slides.length > 1 && (
        <img
          src={slides[(currentIndex + 1) % slides.length].src}
          alt=""
          aria-hidden="true"
          className={styles.preload}
          loading="eager"
          decoding="async"
        />
      )}

      {/* Navigation Dots */}
      {slides.length > 1 && (
        <div className={styles.dotsContainer}>
          {slides.map((_, index) => (
            <motion.button
              key={index}
              className={`${styles.dot} ${
                index === currentIndex ? styles.active : ''
              }`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : undefined}
              animate={{ opacity: index === currentIndex ? 1 : 0.5 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      )}

      {/* Left/Right Arrow Controls */}
      {slides.length > 1 && (
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
