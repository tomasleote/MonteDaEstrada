import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'motion/react';
import SuiteCarousel from '../SuiteCarousel';
import styles from './RoomCard.module.scss';

/**
 * RoomCard Component
 * A two-column room card with alternating image position (left/right).
 * Features elegant layout with responsive behavior and smooth hover effects.
 */
const RoomCard = ({
  roomId,
  title,
  subtitle,
  image,
  imageAlt,
  images = [],
  imagePosition = 'left',
  onInfoClick,
  onReserveClick,
  reserveLabel = 'RESERVE JÁ!',
  infoLabel = 'Mais Informações',
  className = '',
}) => {
  const isImageRight = imagePosition === 'right';
  const hasCarousel = Array.isArray(images) && images.length > 1;

  return (
    <motion.article
      layoutId={`room-card-${roomId}`}
      className={`${styles.roomCard} ${isImageRight ? styles.roomCardReversed : ''} ${className}`}
      data-room-id={roomId}
    >
      <div className={styles.imageColumn}>
        {hasCarousel ? (
          <SuiteCarousel images={images} className={styles.carousel} />
        ) : (
          <img
            src={image}
            alt={imageAlt}
            className={styles.image}
            loading="lazy"
            decoding="async"
          />
        )}
      </div>

      <div className={`${styles.contentColumn} ${isImageRight ? styles.contentColumnDark : ''}`}>
        <div className={styles.contentInner}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.reserveButton}
              onClick={onReserveClick}
              aria-label={`Reservar ${title}`}
            >
              {reserveLabel}
            </button>
            <button
              type="button"
              className={styles.infoButton}
              onClick={onInfoClick}
              aria-label={`${infoLabel} ${title}`}
            >
              {infoLabel}
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

RoomCard.propTypes = {
  /** Unique identifier for the room */
  roomId: PropTypes.string.isRequired,
  /** Room title/name */
  title: PropTypes.string.isRequired,
  /** Brief subtitle or description */
  subtitle: PropTypes.string.isRequired,
  /** Image source URL */
  image: PropTypes.string.isRequired,
  /** Alternative text for image */
  imageAlt: PropTypes.string.isRequired,
  /** Optional image set — renders a carousel instead of a single image when length > 1 */
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
    })
  ),
  /** Image position: 'left' or 'right' */
  imagePosition: PropTypes.oneOf(['left', 'right']),
  /** Callback function when "Mais Informações" button is clicked */
  onInfoClick: PropTypes.func.isRequired,
  /** Callback function when "RESERVE JÁ!" button is clicked */
  onReserveClick: PropTypes.func.isRequired,
  reserveLabel: PropTypes.string,
  infoLabel: PropTypes.string,
  /** Additional CSS class names */
  className: PropTypes.string,
};

RoomCard.defaultProps = {
  images: [],
  imagePosition: 'left',
  className: '',
};

export default RoomCard;
