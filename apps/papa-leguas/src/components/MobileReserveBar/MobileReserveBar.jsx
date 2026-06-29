import styles from './MobileReserveBar.module.scss';

const HEYTRAVEL_PL_BOOKING_URL = 'HEYTRAVEL_PL_BOOKING_URL_PLACEHOLDER';

function MobileReserveBar({ label = 'Reservar' }) {
  return (
    <div className={styles.bar} role="complementary" aria-label="Reserva rápida">
      <button
        className={styles.button}
        onClick={() => window.open(HEYTRAVEL_PL_BOOKING_URL, '_blank', 'noopener,noreferrer')}
        type="button"
        aria-label="Reservar alojamento"
      >
        {label}
      </button>
    </div>
  );
}

export default MobileReserveBar;
