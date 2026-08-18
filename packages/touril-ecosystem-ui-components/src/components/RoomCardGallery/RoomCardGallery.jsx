import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import RoomCard from '../RoomCard';
import RoomExpandedCard from '../RoomExpandedCard';
import styles from './RoomCardGallery.module.scss';

/**
 * Gallery of room cards with expand/collapse behavior.
 * Renders multiple RoomCards stacked vertically with alternating
 * image positions. Clicking "Mais Informações" expands the card in-place
 * with a smooth scroll transition to the expanded view.
 *
 * @component
 * @example
 * const rooms = [
 *   {
 *     roomId: 'room-1',
 *     title: 'Quarto Duplo',
 *     subtitle: 'Com vista para o jardim',
 *     image: '/image.jpg',
 *     imageAlt: 'Room image',
 *     description: 'Descrição detalhada...',
 *     images: [{ src: '/img1.jpg', alt: 'View 1' }]
 *   }
 * ];
 * return <RoomCardGallery rooms={rooms} onReserveClick={handleReserve} />
 */
const ROOM_LABELS = {
  pt: { reserve: 'RESERVE JÁ!', info: 'Mais Informações' },
  en: { reserve: 'BOOK NOW!', info: 'More Information' },
};

const RoomCardGallery = ({
  rooms = [],
  onReserveClick,
  locale = 'pt',
  className = '',
}) => {
  const labels = ROOM_LABELS[locale] || ROOM_LABELS.pt;
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const expandedRef = useRef(null);
  // Reason: tracks each RoomCard's "Mais Informações" button so focus can be
  // restored to the button that opened the expanded card once it closes.
  const infoButtonRefs = useRef({});
  const previouslySelectedRoomIdRef = useRef(null);

  const handleInfoClick = (roomId) => {
    setSelectedRoomId(roomId);
  };

  const handleClose = () => {
    setSelectedRoomId(null);
  };

  useEffect(() => {
    if (selectedRoomId === null && previouslySelectedRoomIdRef.current !== null) {
      infoButtonRefs.current[previouslySelectedRoomIdRef.current]?.focus();
    }
    previouslySelectedRoomIdRef.current = selectedRoomId;
  }, [selectedRoomId]);

  const handleReserveClick = (roomId) => {
    if (onReserveClick) onReserveClick(roomId);
  };



  return (
    <div className={`${styles.gallery} ${className}`}>
      {rooms.map((room, index) => {
        const isSelected = room.roomId === selectedRoomId;
        // Reason: Alternate image position for visual variety
        // Even indices get 'left', odd indices get 'right'
        const imagePosition = room.imagePosition || (index % 2 === 0 ? 'left' : 'right');
        // Reason: Match collapsed card color scheme in expanded view
        // Even indices have light background, odd have dark background
        const variant = room.variant || (index % 2 === 0 ? 'light' : 'dark');

        return (
          <div key={room.roomId} className={styles.cardWrapper}>
            {/* Reason: Expanded card renders in-place, replacing its own RoomCard
                This preserves the visual flow without moving cards around */}
            {isSelected ? (
              <div ref={expandedRef} className={styles.expandedWrapper}>
                <RoomExpandedCard
                  roomId={room.roomId}
                  title={room.title}
                  subtitle={room.subtitle}
                  description={room.description}
                  images={room.images}
                  imagePosition={imagePosition}
                  variant={variant}
                  onClose={handleClose}
                  onReserveClick={() => handleReserveClick(room.roomId)}
                  reserveLabel={labels.reserve}
                />
              </div>
            ) : (
              <RoomCard
                roomId={room.roomId}
                title={room.title}
                subtitle={room.subtitle}
                image={room.image}
                imageAlt={room.imageAlt}
                images={room.images}
                imagePosition={imagePosition}
                variant={variant}
                onInfoClick={() => handleInfoClick(room.roomId)}
                onReserveClick={() => handleReserveClick(room.roomId)}
                reserveLabel={labels.reserve}
                infoLabel={labels.info}
                infoButtonRef={(el) => { infoButtonRefs.current[room.roomId] = el; }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

RoomCardGallery.propTypes = {
  /** Array of room objects to display */
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      /** Unique room identifier */
      roomId: PropTypes.string.isRequired,
      /** Room title/name */
      title: PropTypes.string.isRequired,
      /** Brief subtitle or description */
      subtitle: PropTypes.string.isRequired,
      /** Thumbnail image source URL (for collapsed card) */
      image: PropTypes.string.isRequired,
      /** Alternative text for thumbnail image */
      imageAlt: PropTypes.string.isRequired,
      /** Full room description (for expanded card) */
      description: PropTypes.string.isRequired,
      /** Array of image objects for the gallery (for expanded card) */
      images: PropTypes.arrayOf(
        PropTypes.shape({
          /** Image source URL */
          src: PropTypes.string.isRequired,
          /** Alternative text for image */
          alt: PropTypes.string,
        })
      ).isRequired,
      /** Overrides the alternating image side for this card */
      imagePosition: PropTypes.oneOf(['left', 'right']),
      /** Overrides the alternating content-panel colour scheme for this card */
      variant: PropTypes.oneOf(['light', 'dark']),
    })
  ).isRequired,
  /** Callback function when a reserve button is clicked, receives roomId */
  onReserveClick: PropTypes.func,
  /** Locale for button labels: 'pt' or 'en' */
  locale: PropTypes.string,
  /** Additional CSS class names for the gallery wrapper */
  className: PropTypes.string,
};

RoomCardGallery.defaultProps = {
  onReserveClick: undefined,
  className: '',
};

export default RoomCardGallery;
