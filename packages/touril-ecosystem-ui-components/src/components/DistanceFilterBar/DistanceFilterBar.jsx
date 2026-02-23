import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'motion/react';
import { duration, ease } from '../../constants/motion';
import styles from './DistanceFilterBar.module.scss';

/**
 * DistanceFilterBar — Filter buttons for the dark Redondezas section.
 * Designed for dark backgrounds: cream text, rgba(cream, 0.2) borders.
 * Active state: clay border + clay text (no fill — refinement, not toggle).
 * "Filtrar por distância" label above buttons.
 *
 * @param {Object} props
 * @param {Array<{value: string, label: string}>} props.options - Filter options (e.g. [{value: 'all', label: 'Tudo'}, {value: '20', label: '< 20 km'}])
 * @param {string} props.activeFilter - Currently active filter value
 * @param {Function} props.onFilterChange - Callback when filter is selected (receives value)
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement}
 */
function DistanceFilterBar({ options, activeFilter, onFilterChange, className = '' }) {
  return (
    <div className={`${styles.filterBar} ${className}`} role="toolbar" aria-label="Filtrar por distância">
      <span className={styles.label}>Filtrar por distância</span>

      <div className={styles.buttons}>
        {options.map((option) => {
          const isActive = activeFilter === option.value;

          return (
            <button
              key={option.value}
              className={`${styles.filterButton} ${isActive ? styles.active : ''}`}
              onClick={() => onFilterChange(option.value)}
              aria-pressed={isActive}
              type="button"
            >
              {option.label}
              {/* Animated underline via layoutId for sliding effect */}
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    className={styles.activeIndicator}
                    layoutId="distanceFilterIndicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: duration.short, ease: ease.entrance }}
                  />
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
    </div>
  );
}

DistanceFilterBar.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default DistanceFilterBar;
