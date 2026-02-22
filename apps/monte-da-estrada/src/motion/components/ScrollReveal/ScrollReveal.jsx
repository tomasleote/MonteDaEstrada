import { motion, useReducedMotion } from 'motion/react';
import PropTypes from 'prop-types';
import { fadeUp, fadeUpSubtle, fadeIn, scaleIn, fadeLeft, fadeRight } from '../../motion.variants';
import { viewport } from '../../motion.config';

const variantMap = {
  fadeUp,
  fadeUpSubtle,
  fadeIn,
  scaleIn,
  fadeLeft,
  fadeRight,
};

/**
 * Scroll-triggered reveal wrapper.
 * Wraps any content to animate it when it enters the viewport.
 *
 * Usage:
 *   <ScrollReveal>
 *     <h2>Section Title</h2>
 *   </ScrollReveal>
 *
 *   <ScrollReveal variant="scaleIn" delay={0.2}>
 *     <Card>...</Card>
 *   </ScrollReveal>
 */
const ScrollReveal = ({
  children,
  variant,
  threshold,
  triggerOnce,
  delay,
  className,
  as,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const variants = variantMap[variant] || fadeUp;
  const Component = motion[as];

  // Build viewport config
  const viewportConfig = {
    once: triggerOnce,
    amount: threshold ?? viewport.default.amount,
  };

  // Apply delay if specified
  const resolvedVariants = delay
    ? {
        ...variants,
        visible: {
          ...variants.visible,
          transition: {
            ...variants.visible.transition,
            delay,
          },
        },
      }
    : variants;

  // Reason: Skip motion entirely for users with reduced-motion preference
  if (shouldReduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={resolvedVariants}
      className={className}
    >
      {children}
    </Component>
  );
};

ScrollReveal.propTypes = {
  children: PropTypes.node.isRequired,
  /** Animation variant name */
  variant: PropTypes.oneOf([
    'fadeUp',
    'fadeUpSubtle',
    'fadeIn',
    'scaleIn',
    'fadeLeft',
    'fadeRight',
  ]),
  /** Viewport visibility threshold (0-1) */
  threshold: PropTypes.number,
  /** Only animate once */
  triggerOnce: PropTypes.bool,
  /** Delay before animation starts (seconds) */
  delay: PropTypes.number,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** HTML element to render */
  as: PropTypes.string,
};

ScrollReveal.defaultProps = {
  variant: 'fadeUp',
  threshold: undefined,
  triggerOnce: true,
  delay: 0,
  className: undefined,
  as: 'div',
};

export default ScrollReveal;
