import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faBed,
  faHouseUser,
  faUmbrellaBeach,
  faWater,
  faPersonHiking,
  faMapLocationDot,
  faRoad,
  faCar,
  faUtensils,
  faWineGlass,
  faLandmark,
  faWifi,
  faSquareParking,
  faKitchenSet,
  faTree,
  faMountain,
  faBicycle,
  faBinoculars,
  faDove,
  faCalendarDays,
  faEnvelope,
  faPhone,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';

import styles from './Icon.module.scss';

// Icon map - maps string names to Font Awesome icon definitions
const ICON_MAP = {
  // Accommodations
  'home': faHouse,
  'house': faHouseUser,
  'bed': faBed,

  // Activities & Nature
  'beach': faUmbrellaBeach,
  'water': faWater,
  'hiking': faPersonHiking,
  'mountain': faMountain,
  'tree': faTree,
  'biking': faBicycle,
  'bird': faDove,
  'binoculars': faBinoculars,

  // Location & Navigation
  'location': faMapLocationDot,
  'map': faMapLocationDot,
  'road': faRoad,
  'car': faCar,
  'pin': faLocationDot,

  // Dining & Culture
  'restaurant': faUtensils,
  'dining': faUtensils,
  'wine': faWineGlass,
  'landmark': faLandmark,
  'museum': faLandmark,

  // Amenities
  'wifi': faWifi,
  'parking': faSquareParking,
  'kitchen': faKitchenSet,

  // General
  'calendar': faCalendarDays,
  'event': faCalendarDays,
  'email': faEnvelope,
  'phone': faPhone,
};

/**
 * Icon component - Renders Font Awesome icons
 * @param {string} name - Icon name (e.g., 'beach', 'hiking', 'home')
 * @param {string} size - Size variant (xs, sm, md, lg, xl, 2xl, 3xl)
 * @param {string} color - Color variant (primary, secondary, accent, inherit, white)
 * @param {string} className - Additional CSS classes
 * @param {string} ariaLabel - Accessibility label
 */
const Icon = ({ name, size = 'md', color = 'inherit', className = '', ariaLabel }) => {
  const iconDefinition = ICON_MAP[name.toLowerCase()];

  if (!iconDefinition) {
    console.warn(`Icon "${name}" not found in Font Awesome ICON_MAP. Available icons:`, Object.keys(ICON_MAP).join(', '));
    return null;
  }

  const iconClasses = [
    styles.icon,
    styles[`icon--${size}`],
    styles[`icon--${color}`],
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={iconClasses} aria-label={ariaLabel || name} role="img">
      <FontAwesomeIcon icon={iconDefinition} />
    </span>
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']),
  color: PropTypes.oneOf(['primary', 'secondary', 'accent', 'inherit', 'white']),
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
};

export default Icon;
