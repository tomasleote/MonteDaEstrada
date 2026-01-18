import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.scss';

/**
 * Card component - content card with shadow and hover effect
 */
const Card = ({ children, hoverable, className, ...rest }) => {
  const cardClasses = [
    styles.card,
    hoverable && styles.hoverable,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
};

Card.propTypes = {
  /** Card content */
  children: PropTypes.node.isRequired,
  /** Enable hover animation */
  hoverable: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
};

Card.defaultProps = {
  hoverable: true,
  className: '',
};

export default Card;
