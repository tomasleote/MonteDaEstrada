import { useState, useEffect } from 'react'

/**
 * Hook that returns true when the viewport width is at or below 768px.
 * Re-evaluates on window resize.
 */
export function useMobileQuery() {
  // Initialize synchronously from matchMedia to avoid a pending render
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(max-width: 768px)').matches
    }
    return false
  })

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')

    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)

    return () => mq.removeEventListener('change', handler)
  }, [])

  return isMobile
}

export default useMobileQuery
