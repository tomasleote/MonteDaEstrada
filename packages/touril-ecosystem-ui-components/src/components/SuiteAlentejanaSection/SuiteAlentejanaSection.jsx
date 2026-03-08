import React from 'react';
import { motion } from 'framer-motion';
import SuiteCarousel from '../SuiteCarousel';
import AmenityGrid from '../AmenityGrid';
import styles from './SuiteAlentejanaSection.module.scss';

/**
 * SuiteAlentejanaSection component
 * Displays a premium suite showcase with carousel, description, amenities, and CTA
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.eyebrow='Quartos'] - Uppercase label above heading
 * @param {string} [props.heading='A Suite Alentejana'] - Main section heading
 * @param {string} [props.tagline='Um refúgio onde a luz do Alentejo entra pelas janelas.'] - Subheading text
 * @param {Array<string>} [props.description=[]] - Array of description paragraphs
 * @param {Array<string>} [props.carouselImages=[]] - Array of image URLs for carousel
 * @param {Object} [props.amenities] - Amenities object
 * @param {Array} [props.amenities.atmospheric=[]] - Atmospheric amenities
 * @param {Array} [props.amenities.premium=[]] - Premium amenities
 * @param {string} [props.ctaLabel='Reservar A Suite Alentejana'] - Button text
 * @param {string} [props.ctaHref='#'] - Button link href
 * @returns {React.ReactElement}
 */
const SuiteAlentejanaSection = ({
  eyebrow = 'Quartos',
  heading = 'A Suite Alentejana',
  tagline = 'Um refúgio onde a luz do Alentejo entra pelas janelas.',
  description = [],
  carouselImages = [],
  amenities = { atmospheric: [], premium: [] },
  ctaLabel = 'Reservar A Suite Alentejana',
  ctaHref = '#',
}) => {
  const hasAmenities = amenities?.atmospheric?.length > 0 || amenities?.premium?.length > 0;

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section className={styles.suiteSection}>
      {/* Carousel */}
      <SuiteCarousel images={carouselImages} />

      {/* Content Container */}
      <motion.div
        className={styles.contentContainer}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {/* Eyebrow */}
        <motion.div className={styles.eyebrow} variants={textVariants}>
          {eyebrow}
        </motion.div>

        {/* Heading */}
        <motion.h1 className={styles.heading} variants={textVariants}>
          {heading}
        </motion.h1>

        {/* Tagline */}
        <motion.p className={styles.tagline} variants={textVariants}>
          {tagline}
        </motion.p>

        {/* Description Paragraphs */}
        <motion.div className={styles.description} variants={containerVariants}>
          {Array.isArray(description) ? (
            description.map((para, index) => (
              <motion.p key={index} variants={textVariants}>
                {para}
              </motion.p>
            ))
          ) : (
            <motion.p variants={textVariants}>{description}</motion.p>
          )}
        </motion.div>

        {/* Amenity Grid */}
        {hasAmenities && (
          <AmenityGrid
            atmospheric={amenities.atmospheric}
            premium={amenities.premium}
          />
        )}

        {/* CTA Button */}
        <motion.a
          href={ctaHref}
          className={styles.ctaButton}
          variants={textVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {ctaLabel}
        </motion.a>
      </motion.div>
    </section>
  );
};

export default SuiteAlentejanaSection;
