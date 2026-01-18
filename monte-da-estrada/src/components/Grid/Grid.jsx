import React from 'react';
import PropTypes from 'prop-types';
import styles from './Grid.module.scss';

/**
 * Grid component - responsive grid layout
 */
const Grid = ({ children, columns, gap, className, ...rest }) => {
  const gridClasses = [
    styles.grid,
    columns && styles[`cols${columns}`],
    gap && styles[`gap${gap}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={gridClasses} {...rest}>
      {children}
    </div>
  );
};

Grid.propTypes = {
  /** Grid content */
  children: PropTypes.node.isRequired,
  /** Number of columns (desktop) */
  columns: PropTypes.oneOf([1, 2, 3, 4]),
  /** Gap size */
  gap: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Additional CSS classes */
  className: PropTypes.string,
};

Grid.defaultProps = {
  columns: 3,
  gap: 'medium',
  className: '',
};

export default Grid;
