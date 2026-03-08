import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

/**
 * Boutique Collection Button component.
 *
 * Variants:
 * - primary: Brand Blue (#94B1C9) background, Dark Slate text — for CTAs
 * - secondary: Transparent bg, Brand Blue border + text — for secondary actions
 * - ghost: Transparent bg, Cream border + text — for use on dark backgrounds
 *
 * Brand rules: 0px border-radius, no shadows, letter-spacing 0.75px.
 *
 * Can render as <button> or <a> (pass href to render as link).
 */
const Button = ({
  variant = 'primary',
  size = 'medium',
  children,
  href,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  ...rest
}) => {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    disabled ? styles.disabled : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <a
        href={href}
        className={classNames}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  /** Visual style variant */
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
  /** Button size */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Button content */
  children: PropTypes.node.isRequired,
  /** If provided, renders as an anchor tag */
  href: PropTypes.string,
  /** Click handler (button only) */
  onClick: PropTypes.func,
  /** Disabled state */
  disabled: PropTypes.bool,
  /** HTML button type */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /** Additional CSS class */
  className: PropTypes.string,
};

Button.defaultProps = {
  variant: 'primary',
  size: 'medium',
  href: null,
  onClick: null,
  disabled: false,
  type: 'button',
  className: '',
};

export default Button;
