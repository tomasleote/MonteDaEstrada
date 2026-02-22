import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { buttonInteraction } from '@/motion';
import styles from './Button.module.scss';

/**
 * Reusable button component with multiple variants and motion feedback.
 * Can render as button or Link (React Router).
 */
const Button = ({
  children,
  variant,
  size,
  disabled,
  onClick,
  href,
  type,
  className,
  ...rest
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Motion props for interactive feedback
  const motionProps = disabled
    ? {}
    : {
        whileHover: buttonInteraction.hover,
        whileTap: buttonInteraction.tap,
      };

  // If href is provided, render as animated Link
  if (href) {
    return (
      <motion.div {...motionProps} style={{ display: 'inline-block' }}>
        <Link to={href} className={buttonClasses} {...rest}>
          {children}
        </Link>
      </motion.div>
    );
  }

  // Otherwise render as animated button
  return (
    <motion.button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...motionProps}
      {...rest}
    >
      {children}
    </motion.button>
  );
};

Button.propTypes = {
  /** Button content */
  children: PropTypes.node.isRequired,
  /** Button style variant */
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  /** Button size */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Disabled state */
  disabled: PropTypes.bool,
  /** Click handler (for button) */
  onClick: PropTypes.func,
  /** Route path (for Link) */
  href: PropTypes.string,
  /** Button type attribute */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /** Additional CSS classes */
  className: PropTypes.string,
};

Button.defaultProps = {
  variant: 'primary',
  size: 'medium',
  disabled: false,
  onClick: undefined,
  href: undefined,
  type: 'button',
  className: '',
};

export default Button;
