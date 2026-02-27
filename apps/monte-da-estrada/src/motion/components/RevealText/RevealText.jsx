import { motion, useReducedMotion } from 'motion/react';
import PropTypes from 'prop-types';
import { viewport } from '../../motion.config';
import { lineReveal, editorialFadeUp } from '../../motion.variants';

const effectMap = {
  lineReveal,
  fadeUp: editorialFadeUp,
};

/**
 * Premium text reveal component for editorial typography.
 * Supports clip-mask line reveals (headings) and organic fade-ups (body text).
 *
 * Usage:
 *   <RevealText as="h2" effect="lineReveal">
 *     Entre o Alentejo e o Atlântico.
 *   </RevealText>
 *
 *   <RevealText as="p" delay={0.15}>
 *     Body text with organic entrance.
 *   </RevealText>
 */
const RevealText = ({
  children,
  as = 'p',
  effect = 'fadeUp',
  delay = 0,
  threshold,
  triggerOnce = true,
  className,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion[as];
  const variants = effectMap[effect] || editorialFadeUp;

  // Reason: Render static text for users with reduced-motion preference
  if (shouldReduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

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

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: triggerOnce,
        amount: threshold ?? viewport.default.amount,
      }}
      variants={resolvedVariants}
      className={className}
    >
      {children}
    </Component>
  );
};

RevealText.propTypes = {
  /** Content to reveal */
  children: PropTypes.node.isRequired,
  /** HTML element to render */
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span']),
  /** Reveal effect: lineReveal for headings, fadeUp for body */
  effect: PropTypes.oneOf(['lineReveal', 'fadeUp']),
  /** Delay before animation starts (seconds) */
  delay: PropTypes.number,
  /** Viewport visibility threshold (0-1) */
  threshold: PropTypes.number,
  /** Only animate once */
  triggerOnce: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default RevealText;
