import React from 'react';
import PropTypes from 'prop-types';
import styles from './Container.module.scss';

/**
 * Container component - max-width wrapper with padding
 */
const Container = ({ children, className, ...rest }) => {
  return (
    <div className={`${styles.container} ${className || ''}`} {...rest}>
      {children}
    </div>
  );
};

Container.propTypes = {
  /** Container content */
  children: PropTypes.node.isRequired,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default Container;
