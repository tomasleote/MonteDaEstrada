import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to scroll to top on route change
 * Automatically scrolls to top when the route changes
 * Delayed slightly to allow exit animations to complete
 *
 * @example
 * function App() {
 *   useScrollToTop();
 *   return <Routes>...</Routes>
 * }
 */
const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Delay scroll to allow exit animation to start (200ms exit duration)
    // This prevents the jarring scroll jump during page transitions
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Use instant to avoid competing with page transition
      });
    }, 50); // Small delay to let exit animation begin

    return () => clearTimeout(timer);
  }, [pathname]);
};

export default useScrollToTop;
