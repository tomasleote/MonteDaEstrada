import React from 'react';
import PropTypes from 'prop-types';
import styles from './Map.module.scss';

/**
 * Interactive Google Map component using iframe embed
 * No API key required for basic embed
 *
 * @example
 * <Map
 *   latitude={37.5253}
 *   longitude={-8.7858}
 *   title="Monte da Estrada"
 * />
 */
const Map = ({ latitude, longitude, title, height }) => {
  // Construct Google Maps embed URL
  const mapSrc = `https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className={styles.mapContainer}>
      <iframe
        src={mapSrc}
        width="100%"
        height={height}
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
        className={styles.mapIframe}
      ></iframe>
    </div>
  );
};

Map.propTypes = {
  /** Latitude coordinate */
  latitude: PropTypes.number.isRequired,
  /** Longitude coordinate */
  longitude: PropTypes.number.isRequired,
  /** Map title for accessibility */
  title: PropTypes.string,
  /** Map height in pixels */
  height: PropTypes.string,
};

Map.defaultProps = {
  title: 'Google Map',
  height: '450px',
};

export default Map;
