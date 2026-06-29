import { useState, useEffect } from 'react';
import styles from './BookingTab.module.scss';

function BookingTab({ label = 'Reservar', onClick }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const threshold = document.documentElement.clientHeight * 0.8;
          setIsVisible(window.scrollY > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`${styles.tabWrapper} ${isVisible ? styles.visible : ''}`}>
      <button
        className={styles.tab}
        onClick={onClick}
        aria-label="Abrir formulário de reserva"
        type="button"
      >
        {label}
      </button>
    </div>
  );
}

export default BookingTab;
