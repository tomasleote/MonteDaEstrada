import { useState, useEffect } from 'react'
import styles from './BookingTab.module.scss'

/**
 * BookingTab — persistent fixed vertical tab on the right edge of the viewport.
 * Displays "RESERVAR" rotated 90°; clicking it opens the BookingModal.
 * Hidden on mobile (≤768px) — handled by the header CTA instead.
 */
function BookingTab({ label = 'Reservar', onClick }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Show button after scrolling past the hero section (~100vh)
          const threshold = window.innerHeight * 0.8
          if (window.scrollY > threshold) {
            setIsVisible(true)
          } else {
            setIsVisible(false)
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial state

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
  )
}

export default BookingTab
