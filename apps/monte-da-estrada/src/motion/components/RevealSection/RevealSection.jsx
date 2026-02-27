import { motion, useReducedMotion } from 'motion/react';
import PropTypes from 'prop-types';
import { viewport } from '../../motion.config';
import { sectionStagger } from '../../motion.variants';

/**
 * Section-level stagger orchestration wrapper.
 * Choreographs child reveals in DOM order: eyebrow → heading → body → CTA.
 * Children should be motion-aware (RevealText, motion.div, etc.).
 *
 * Usage:
 *   <RevealSection>
 *     <SectionEyebrow label="Experiências" />
 *     <RevealText as="h2" effect="lineReveal">Heading</RevealText>
 *     <RevealText as="p">Body text</RevealText>
 *   </RevealSection>
 */
const RevealSection = ({
  children,
  as = 'div',
  staggerDelay = 0.12,
  threshold,
  triggerOnce = true,
  className,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion[as];

  // Reason: Render static content for users with reduced-motion preference
  if (shouldReduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  // Custom stagger timing if overridden
  const containerVariants = staggerDelay !== 0.12
    ? {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.05,
          },
        },
      }
    : sectionStagger;

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

RevealSection.propTypes = {
  children: PropTypes.node.isRequired,
  /** Container HTML element */
  as: PropTypes.string,
  /** Stagger delay between children (seconds) */
  staggerDelay: PropTypes.number,
  /** Viewport visibility threshold */
  threshold: PropTypes.number,
  /** Only animate once */
  triggerOnce: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default RevealSection;
