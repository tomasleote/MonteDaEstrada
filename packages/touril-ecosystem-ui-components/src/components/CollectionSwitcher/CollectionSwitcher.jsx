import React from 'react';
import PropTypes from 'prop-types';
import styles from './CollectionSwitcher.module.scss';

/**
 * CollectionSwitcher — Boutique Collection cross-property navigation.
 *
 * Displays both property names inline with a separator.
 * The current property is highlighted in Clay; the other is a link.
 *
 * Desktop (inside Header): [ Monte da Estrada · Monte do Papa-Léguas ]
 * Mobile (inside hamburger menu): "Também na nossa coleção: → Monte do Papa-Léguas"
 *
 * @param {string} currentPropertyId - ID of the active property ('monte-da-estrada' | 'papa-leguas')
 * @param {Array}  properties - Array of { id, name, url } for each property
 * @param {string} variant - 'inline' (header) | 'stacked' (mobile menu)
 */
const CollectionSwitcher = ({
  currentPropertyId,
  properties = DEFAULT_PROPERTIES,
  variant = 'inline',
}) => {
  if (properties.length === 0) return null;

  if (variant === 'stacked') {
    const otherProperties = properties.filter((p) => p.id !== currentPropertyId);
    return (
      <nav className={styles.stacked} aria-label="Boutique Collection">
        <p className={styles.stackedLabel}>Também na nossa coleção:</p>
        <ul className={styles.stackedList}>
          {otherProperties.map((property) => (
            <li key={property.id}>
              <a
                href={property.url}
                className={styles.stackedLink}
                aria-label={`Visitar ${property.name}`}
              >
                {property.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  // Default: inline variant for desktop header
  return (
    <nav className={styles.inline} aria-label="Boutique Collection">
      <ul className={styles.inlineList}>
        {properties.map((property, index) => {
          const isActive = property.id === currentPropertyId;
          return (
            <React.Fragment key={property.id}>
              {index > 0 && (
                <li className={styles.separator} aria-hidden="true">·</li>
              )}
              <li className={styles.inlineItem}>
                {isActive ? (
                  <span
                    className={`${styles.inlineLink} ${styles.inlineLinkActive}`}
                    aria-current="true"
                  >
                    {property.name}
                  </span>
                ) : (
                  <a
                    href={property.url}
                    className={styles.inlineLink}
                    aria-label={`Visitar ${property.name}`}
                  >
                    {property.name}
                  </a>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </nav>
  );
};

const DEFAULT_PROPERTIES = [
  {
    id: 'monte-da-estrada',
    name: 'Monte da Estrada',
    url: 'https://montedaestrada.com',
  },
  {
    id: 'papa-leguas',
    name: 'Monte do Papa-Léguas',
    url: 'https://montedopapaleguas.pt',
  },
];

CollectionSwitcher.propTypes = {
  /** ID of the currently active property */
  currentPropertyId: PropTypes.string.isRequired,
  /** Array of properties in the collection */
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      /** Unique property identifier */
      id: PropTypes.string.isRequired,
      /** Display name */
      name: PropTypes.string.isRequired,
      /** External URL of the property site */
      url: PropTypes.string.isRequired,
    })
  ),
  /** Display variant: 'inline' for header, 'stacked' for mobile menu */
  variant: PropTypes.oneOf(['inline', 'stacked']),
};

CollectionSwitcher.defaultProps = {
  properties: DEFAULT_PROPERTIES,
  variant: 'inline',
};

export default CollectionSwitcher;
