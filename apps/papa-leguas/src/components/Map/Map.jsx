import React from 'react';
import PropTypes from 'prop-types';
import styles from './Map.module.scss';

/**
 * Interactive Google Map component using iframe embed
 * No API key required for basic embed
 */
const Map = ({ lat, lng, zoom, title, height }) => {
  const mapSrc = `https://maps.google.com/maps?q=${lat},${lng}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;

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
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  zoom: PropTypes.number,
  title: PropTypes.string,
  height: PropTypes.string,
};

Map.defaultProps = {
  zoom: 14,
  title: 'Google Map',
  height: '450px',
};

export default Map;
