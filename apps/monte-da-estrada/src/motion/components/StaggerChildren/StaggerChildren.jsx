import { motion, useReducedMotion } from 'motion/react';
import PropTypes from 'prop-types';
import {
  staggerContainer,
  staggerContainerFast,
  staggerContainerSlow,
  fadeUp,
} from '../../motion.variants';
import { viewport } from '../../motion.config';

const containerMap = {
  default: staggerContainer,
  fast: staggerContainerFast,
  slow: staggerContainerSlow,
};

/**
 * Stagger container that orchestrates sequential child reveals.
 * Children must be motion components with variants for stagger to work.
 *
 * Usage:
 *   <StaggerChildren>
 *     <StaggerChildren.Item>Card 1</StaggerChildren.Item>
 *     <StaggerChildren.Item>Card 2</StaggerChildren.Item>
 *     <StaggerChildren.Item>Card 3</StaggerChildren.Item>
 *   </StaggerChildren>
 */
const StaggerChildren = ({
  children,
  speed,
  threshold,
  triggerOnce,
  className,
  as,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion[as];
  const containerVariants = containerMap[speed] || staggerContainer;

  // Reason: Render static content for users with reduced-motion preference
  if (shouldReduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: triggerOnce,
        amount: threshold ?? viewport.default.amount,
      }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </Component>
  );
};

StaggerChildren.propTypes = {
  children: PropTypes.node.isRequired,
  /** Stagger speed preset */
  speed: PropTypes.oneOf(['fast', 'default', 'slow']),
  /** Viewport visibility threshold */
  threshold: PropTypes.number,
  /** Only animate once */
  triggerOnce: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** HTML element to render */
  as: PropTypes.string,
};

StaggerChildren.defaultProps = {
  speed: 'default',
  threshold: undefined,
  triggerOnce: true,
  className: undefined,
  as: 'div',
};

/**
 * Individual stagger item — use as child of StaggerChildren.
 * Inherits animation state from parent container.
 */
const StaggerItem = ({ children, className, as }) => {
  const Component = motion[as];

  return (
    <Component variants={fadeUp} className={className}>
      {children}
    </Component>
  );
};

StaggerItem.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  as: PropTypes.string,
};

StaggerItem.defaultProps = {
  className: undefined,
  as: 'div',
};

// Attach Item as a static property for clean API
StaggerChildren.Item = StaggerItem;

export default StaggerChildren;
