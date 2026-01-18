import React from 'react';
import PropTypes from 'prop-types';
import styles from './Section.module.scss';

/**
 * Section component - full-width section with optional background
 */
const Section = ({ children, background, padding, className, ...rest }) => {
  const sectionClasses = [
    styles.section,
    background && styles[background],
    padding && styles[padding],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={sectionClasses} {...rest}>
      {children}
    </section>
  );
};

Section.propTypes = {
  /** Section content */
  children: PropTypes.node.isRequired,
  /** Background color variant */
  background: PropTypes.oneOf(['light', 'dark', 'primary', 'secondary']),
  /** Padding size */
  padding: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  /** Additional CSS classes */
  className: PropTypes.string,
};

Section.defaultProps = {
  background: null,
  padding: 'medium',
  className: '',
};

export default Section;
