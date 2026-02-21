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
const RoomCardGallery = ({
  rooms = [],
  onReserveClick,
  className = '',
}) => {
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const expandedRef = useRef(null);

  const handleInfoClick = (roomId) => {
    setSelectedRoomId(roomId);
  };

  const handleClose = () => {
    setSelectedRoomId(null);
  };

  const handleReserveClick = (roomId) => {
    if (onReserveClick) onReserveClick(roomId);
  };

  // Reason: Scroll to expanded card when a room is selected
  // This ensures the expanded card is visible in the viewport
  useEffect(() => {
    if (selectedRoomId && expandedRef.current) {
      expandedRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [selectedRoomId]);

  return (
    <div className={`${styles.gallery} ${className}`}>
      {rooms.map((room, index) => {
        const isSelected = room.roomId === selectedRoomId;
        // Reason: Alternate image position for visual variety
        // Even indices get 'left', odd indices get 'right'
        const imagePosition = index % 2 === 0 ? 'left' : 'right';
        // Reason: Match collapsed card color scheme in expanded view
        // Even indices have light background, odd have dark background
        const variant = index % 2 === 0 ? 'light' : 'dark';

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
                />
              </div>
            ) : (
              <RoomCard
                roomId={room.roomId}
                title={room.title}
                subtitle={room.subtitle}
                image={room.image}
                imageAlt={room.imageAlt}
                imagePosition={imagePosition}
                onInfoClick={() => handleInfoClick(room.roomId)}
                onReserveClick={() => handleReserveClick(room.roomId)}
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
    })
  ).isRequired,
  /** Callback function when a reserve button is clicked, receives roomId */
  onReserveClick: PropTypes.func,
  /** Additional CSS class names for the gallery wrapper */
  className: PropTypes.string,
};

RoomCardGallery.defaultProps = {
  onReserveClick: undefined,
  className: '',
};

export default RoomCardGallery;
