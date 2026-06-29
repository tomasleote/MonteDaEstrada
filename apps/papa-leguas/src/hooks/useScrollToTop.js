import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to scroll to top on route change
 * Automatically scrolls to top when the route changes
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
    window.scrollTo(0, 0);
  }, [pathname]);
};

export default useScrollToTop;
