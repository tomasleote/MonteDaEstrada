import { motion, useReducedMotion } from 'motion/react';
import PropTypes from 'prop-types';
import { duration, ease, distance, stagger, viewport } from '../../motion.config';

/**
 * Animated text component for headings and display text.
 * Supports word-by-word stagger for cinematic reveals,
 * or simple fade-up for body text.
 *
 * Usage:
 *   <AnimatedText as="h2" stagger>
 *     Discover Monte da Estrada
 *   </AnimatedText>
 *
 *   <AnimatedText as="p" variant="fadeUp">
 *     Body text with simple entrance.
 *   </AnimatedText>
 */
const AnimatedText = ({
  children,
  as,
  stagger: useStagger,
  className,
  delay,
  triggerOnce,
  threshold,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion[as];

  // Reason: Render static text for users with reduced-motion preference
  if (shouldReduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  // Simple fade-up mode (for paragraphs and body text)
  if (!useStagger || typeof children !== 'string') {
    return (
      <Component
        initial={{ opacity: 0, y: distance.default }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{
          once: triggerOnce,
          amount: threshold ?? viewport.default.amount,
        }}
        transition={{
          duration: duration.medium,
          ease: ease.entrance,
          delay,
        }}
        className={className}
      >
        {children}
      </Component>
    );
  }

  // Word-by-word stagger mode (for headings)
  const words = children.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger.fast,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: distance.subtle,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration.medium,
        ease: ease.entrance,
      },
    },
  };

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
      aria-label={children}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={wordVariants}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
          aria-hidden="true"
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
};

AnimatedText.propTypes = {
  /** Text content (string for stagger mode, any for simple mode) */
  children: PropTypes.node.isRequired,
  /** HTML element to render */
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span']),
  /** Enable word-by-word stagger (only works with string children) */
  stagger: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Delay before animation starts (seconds) */
  delay: PropTypes.number,
  /** Only animate once */
  triggerOnce: PropTypes.bool,
  /** Viewport visibility threshold */
  threshold: PropTypes.number,
};

AnimatedText.defaultProps = {
  as: 'p',
  stagger: false,
  className: undefined,
  delay: 0,
  triggerOnce: true,
  threshold: undefined,
};

export default AnimatedText;
