import React from 'react';
import { motion } from 'framer-motion';
import styles from './AmenityGrid.module.scss';

const AmenityGrid = ({ atmospheric = [], premium = [] }) => {
  const allAmenities = [
    ...atmospheric.map((item) => ({ ...item, type: 'atmospheric' })),
    ...premium.map((item) => ({ ...item, type: 'premium' })),
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className={styles.amenityGrid}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {allAmenities.map((amenity, index) => (
        <motion.div
          key={index}
          className={`${styles.amenityItem} ${styles[amenity.type]}`}
          variants={itemVariants}
        >
          {amenity.icon && (
            <div className={styles.amenityIcon}>{amenity.icon}</div>
          )}
          <div className={styles.amenityLabel}>{amenity.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AmenityGrid;
