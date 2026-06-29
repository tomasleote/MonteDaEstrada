import { motion, useReducedMotion } from 'motion/react';
import { pageTransition } from '../../motion.variants';

const AnimatedPage = ({ children, className }) => {
  const shouldReduceMotion = useReducedMotion();

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

export default AnimatedPage;
