import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import styles from './InlineBookingWidget.module.scss'

/**
 * InlineBookingWidget — renders the HeyNow booking widget directly in the page flow.
 * Uses a singleton script loader and handles dynamic loading states and failures.
 */
export default function InlineBookingWidget({ widgetConfig = {}, className = '' }) {
  const containerRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // ─── Widget Script Loading & Initialization ─────────────────────────────────
  useEffect(() => {
    let checkInterval
    let timeoutId
    let isMounted = true;

    const initWidget = () => {
      console.log('[InlineWidget] initializing')
      
      if (!containerRef.current) return;
      
      // 1. Prevent DOUBLE initialization and event listener stripping.
      if (containerRef.current.childNodes.length > 0) {
        console.log('[InlineWidget] Already populated, skipping init to preserve event listeners');
        // It's populated, so it's not loading anymore
        setLoading(false);
        return;
      }

      // We bypass React's strict properties mapping by setting them via DOM API,
      // as HeyTravel script expects exact case attributes.
      containerRef.current.setAttribute('Hotel', widgetConfig.hotel || '[{ "id": "da157c05-a630-43a2-a15b-732f96c563f2", "name": "Monte da Estrada" }]')
      containerRef.current.setAttribute('Font', widgetConfig.font || 'Inter')
      containerRef.current.setAttribute('Colors', widgetConfig.colors || '{ "MainColor": "#1c1a17", "SecColor": "#f5f2ee", "ThirdColor": "#1c1a17" }')
      containerRef.current.setAttribute('langu', widgetConfig.language || 'pt')
      containerRef.current.setAttribute('Link', widgetConfig.link || 'https://be.heytravel.net/')
      containerRef.current.setAttribute('ComplexId', widgetConfig.complexId || '1828')
      containerRef.current.setAttribute('visualParams', widgetConfig.visualParams || '{ "holder":"", "hiddeEditReservation": "true", "hiddeMaxSize": "50", "allowChildren": "true" }')

      // Fetch / Singleton script strategy
      if (!document.querySelector('script[src="https://be.heytravel.net/HomePageWidget/index.js"]')) {
        console.log('[InlineWidget] loading script')
        const script = document.createElement('script')
        script.src = 'https://be.heytravel.net/HomePageWidget/index.js'
        document.body.appendChild(script)
      } else {
        // Provide the widget script a nudge to evaluate the new container by re-injecting,
        // but only if we are truly mounting a new container.
        console.log('[InlineWidget] auto-re-evaluating global script')
        const oldScript = document.querySelector('script[src="https://be.heytravel.net/HomePageWidget/index.js"]')
        if (oldScript) oldScript.remove()
        
        const script = document.createElement('script')
        script.src = 'https://be.heytravel.net/HomePageWidget/index.js'
        document.body.appendChild(script)
      }

      // 3. Fallbacks and successful render trackers
      checkInterval = setInterval(() => {
        if (!isMounted) return;
        if (containerRef.current && containerRef.current.innerHTML.trim() !== '') {
          console.log('[InlineWidget] success')
          setLoading(false)
          clearInterval(checkInterval)
          clearTimeout(timeoutId)
        }
      }, 200)

      timeoutId = setTimeout(() => {
        if (!isMounted) return;
        if (loading) {
          console.log('[InlineWidget] fallback')
          // Add forced reinitialization fallback heuristic
          if (containerRef.current && containerRef.current.innerHTML !== '') {
             console.log('[InlineWidget] Widget populated but unresponsive timeout triggered - attempting forced restart');
             containerRef.current.innerHTML = '';
             setLoading(true); // reset loading state to indicate a retry
             // We don't setup another interval here yet. Let's just fallback.
          }
          setHasError(true)
          setLoading(false)
          clearInterval(checkInterval)
        }
      }, 4000)
    }

    console.log('[InlineWidget] mounted')
    
    // DNS and CSS prefetching
    if (!document.querySelector('link[rel="dns-prefetch"][href="//be.heytravel.net"]')) {
      const prefetch = document.createElement('link')
      prefetch.rel = 'dns-prefetch'
      prefetch.href = '//be.heytravel.net'
      document.head.appendChild(prefetch)
    }
    if (!document.querySelector('link[href="https://be.heytravel.net/Widget.css"]')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://be.heytravel.net/Widget.css'
      document.head.appendChild(link)
    }

    // 2. Delay init slightly AFTER mount to prevent React lifecycles stripping events
    setTimeout(() => {
      if (isMounted) {
        initWidget();
      }
    }, 10)

    return () => {
      isMounted = false;
      clearInterval(checkInterval)
      clearTimeout(timeoutId)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const fallbackUrl = 'https://be.heytravel.net/da157c05-a630-43a2-a15b-732f96c563f2?occupation=[{"room":1,"adults":2,"children":0}]&complex=1828&lang=pt-PT&';

  return (
    <div className={`${styles.inlineWidget} ${className}`}>
      <AnimatePresence>
        {loading && (
          <motion.div 
            className={styles.loadingSkeleton}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
          >
            <div className={styles.spinner}></div>
            <p>A carregar disponibilidade...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {hasError ? (
        <div className={styles.errorFallback}>
          <p>Não foi possível carregar o motor de reservas.</p>
          <a href={fallbackUrl} target="_blank" rel="noopener noreferrer" className={styles.fallbackBtn}>
            Verificar disponibilidade
          </a>
        </div>
      ) : (
        /* Isolated DOM container - React should never update its properties (like opacity) after init */
        <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.3s ease', minHeight: '120px' }}>
          <div id="HomePageWidget" ref={containerRef} />
        </div>
      )}
    </div>
  )
}
