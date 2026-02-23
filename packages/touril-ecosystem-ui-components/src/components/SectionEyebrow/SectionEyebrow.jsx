import React from 'react';
import PropTypes from 'prop-types';
import styles from './SectionEyebrow.module.scss';

/**
 * SectionEyebrow — Small decorative label component
 * Appears above headings, acts as a visual signpost for section themes.
 * Non-animated utility component.
 *
 * @param {Object} props
 * @param {string} props.label - Eyebrow text (typically 2-4 words)
 * @param {oneOf(['left', 'center', 'right'])} props.align - Text alignment (default: 'left')
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement}
 */
function SectionEyebrow({ label, align = 'left', className = '' }) {
  const alignClass = styles[`align${align.charAt(0).toUpperCase() + align.slice(1)}`];

  return (
    <span className={`${styles.eyebrow} ${alignClass} ${className}`}>
      {label}
    </span>
  );
}

SectionEyebrow.propTypes = {
  label: PropTypes.string.isRequired,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  className: PropTypes.string,
};

export default SectionEyebrow;
