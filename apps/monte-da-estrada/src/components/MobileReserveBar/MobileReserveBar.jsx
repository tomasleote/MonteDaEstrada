import React from 'react';
import styles from './MobileReserveBar.module.scss';

const HEYTRAVEL_BOOKING_URL = 'https://be.heytravel.net/da157c05-a630-43a2-a15b-732f96c563f2?occupation=%5B%7B%22room%22%3A1%2C%22adults%22%3A2%2C%22children%22%3A0%7D%5D&complex=1828&lang=pt-PT';

/**
 * MobileReserveBar — fixed bottom CTA bar, visible only on mobile.
 * Replaces the right-side floating BookingTab on small screens.
 */
function MobileReserveBar({ label = 'Reservar' }) {
  const handleClick = () => {
    window.open(HEYTRAVEL_BOOKING_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={styles.bar} role="complementary" aria-label="Reserva rápida">
      <button
        className={styles.button}
        onClick={handleClick}
        type="button"
        aria-label="Reservar alojamento"
      >
        {label}
      </button>
    </div>
  );
}

export default MobileReserveBar;
