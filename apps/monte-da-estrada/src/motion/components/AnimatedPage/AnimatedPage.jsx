import { motion, useReducedMotion } from 'motion/react';
import PropTypes from 'prop-types';
import { pageTransition } from '../../motion.variants';

/**
 * Route transition wrapper.
 * Wrap each page component in this to get smooth enter/exit animations
 * when navigating between routes.
 *
 * Usage:
 *   <AnimatePresence mode="wait">
 *     <AnimatedPage key={location.pathname}>
 *       <Routes>...</Routes>
 *     </AnimatedPage>
 *   </AnimatePresence>
 */
const AnimatedPage = ({ children, className }) => {
  const shouldReduceMotion = useReducedMotion();

  // Reason: Skip page transition for users with reduced-motion preference
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

AnimatedPage.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

AnimatedPage.defaultProps = {
  className: undefined,
};

export default AnimatedPage;
