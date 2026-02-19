import React from 'react';
import PropTypes from 'prop-types';
import styles from './Footer.module.scss';
import defaultConfig from './defaultConfig';

/**
 * Touril-style Footer component with full semantic HTML structure
 *
 * Features:
 * - Desktop: 2-column layout (nav + address) + social/copyright section
 * - Tablet/Mobile: Responsive stacking
 * - Navigation links with flex wrapping
 * - Address section with contact and legal info
 * - Social media icons with image support
 * - Backwards compatible with legacy contactInfo and quickLinks props
 *
 * @component
 * @example
 * <Footer
 *   navigationLinks={[{text: 'Home', href: '/'}]}
 *   address={{name: 'My Business', phone: '+351 123 456 789'}}
 *   socialLinks={[{platform: 'instagram', url: 'https://...', label: 'Instagram'}]}
 * />
 */
const Footer = ({
  navigationLinks,
  address,
  socialLinks,
  legalInfo,
  copyright,
  // Legacy props for backwards compatibility
  contactInfo,
  quickLinks,
}) => {
  // Merge with default config and handle legacy props
  const mergedNavLinks = navigationLinks || quickLinks?.map((link) => ({
    text: link.label,
    href: link.path,
    external: false,
  })) || defaultConfig.navigationLinks;

  const mergedAddress = address || {
    ...defaultConfig.address,
    ...(contactInfo && {
      phone: contactInfo.phone,
      mobile: contactInfo.phone2,
      email: contactInfo.email,
      street: contactInfo.address,
    }),
  };

  const mergedSocialLinks = socialLinks || defaultConfig.socialLinks;
  const mergedLegalInfo = legalInfo || defaultConfig.legalInfo;
  const copyrightText = copyright || defaultConfig.copyright;

  // Reason: Format address lines as separate entries for line-by-line display
  const addressLines = [
    mergedAddress.name,
    mergedAddress.street,
    mergedAddress.postalCode,
    mergedAddress.region && mergedAddress.country
      ? `${mergedAddress.region}, ${mergedAddress.country}`
      : mergedAddress.region || mergedAddress.country,
  ].filter(Boolean);

  return (
    <footer className={styles.footer} role="contentinfo">
      {/* Main content section: navigation + address */}
      <div className={styles.footerContent}>
        {/* Left column: Navigation menu */}
        <nav className={styles.footerMenu} aria-label="Footer navigation">
          <ul className={styles.navList}>
            {mergedNavLinks.map((link) => (
              <li key={link.href} className={styles.navItem}>
                <a
                  href={link.href}
                  className={styles.navLink}
                  {...(link.external && {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  })}
                  title={link.title || link.text}
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right column: Address and legal info */}
        <address className={styles.footerAddress}>
          {/* Contact information block */}
          <div className={styles.contactBlock}>
            {mergedAddress.name && (
              <>
                <span className={styles.addressLabel}>Morada</span>
                <p className={styles.addressParagraph}>
                  {addressLines.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < addressLines.length - 1 && <br />}
                    </span>
                  ))}
                  {mergedAddress.gpsCoords && (
                    <>
                      <br />
                      {mergedAddress.gpsLink ? (
                        <a
                          href={mergedAddress.gpsLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {mergedAddress.gpsCoords}
                        </a>
                      ) : (
                        mergedAddress.gpsCoords
                      )}
                    </>
                  )}
                </p>
              </>
            )}

            {(mergedAddress.phone || mergedAddress.mobile || mergedAddress.email) && (
              <>
                <span className={styles.addressLabel}>Contactos</span>
                {mergedAddress.phone && (
                  <p className={styles.contactParagraph}>
                    <a href={`tel:${mergedAddress.phone.replace(/\s/g, '')}`}>
                      {mergedAddress.phone}
                    </a>
                  </p>
                )}
                {mergedAddress.mobile && (
                  <p className={styles.contactParagraph}>
                    <a href={`tel:${mergedAddress.mobile.replace(/\s/g, '')}`}>
                      {mergedAddress.mobile}
                    </a>
                  </p>
                )}
                {mergedAddress.email && (
                  <p className={styles.contactParagraph}>
                    <a href={`mailto:${mergedAddress.email}`}>{mergedAddress.email}</a>
                  </p>
                )}
              </>
            )}

            {mergedAddress.license && (
              <p className={styles.contactParagraph}>{mergedAddress.license}</p>
            )}
          </div>

          {/* Legal information block */}
          {mergedLegalInfo && (
            <div className={styles.legalBlock}>
              {mergedLegalInfo.complaintBook && (
                <p className={styles.legalParagraph}>
                  <a href={mergedLegalInfo.complaintBook.url} target="_blank" rel="noopener noreferrer">
                    {mergedLegalInfo.complaintBook.text}
                  </a>
                </p>
              )}

              {mergedLegalInfo.arbitration && (
                <>
                  <span className={styles.addressLabel}>
                    {mergedLegalInfo.arbitration.text ||
                      'Entidade de Resolução Alternativa de Litígios de Consumo:'}
                  </span>
                  {mergedLegalInfo.arbitration.entityName && (
                    <p className={styles.legalParagraph}>
                      {mergedLegalInfo.arbitration.entityUrl ? (
                        <a
                          href={mergedLegalInfo.arbitration.entityUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {mergedLegalInfo.arbitration.entityName}
                        </a>
                      ) : (
                        mergedLegalInfo.arbitration.entityName
                      )}
                    </p>
                  )}
                  {(mergedLegalInfo.arbitration.phone || mergedLegalInfo.arbitration.email) && (
                    <p className={styles.legalParagraph}>
                      {mergedLegalInfo.arbitration.phone && (
                        <a href={`tel:${mergedLegalInfo.arbitration.phone.replace(/\s/g, '')}`}>
                          {mergedLegalInfo.arbitration.phone}
                        </a>
                      )}
                      {mergedLegalInfo.arbitration.phone && mergedLegalInfo.arbitration.email && ' | '}
                      {mergedLegalInfo.arbitration.email && (
                        <a href={`mailto:${mergedLegalInfo.arbitration.email}`}>
                          {mergedLegalInfo.arbitration.email}
                        </a>
                      )}
                    </p>
                  )}
                </>
              )}
            </div>
          )}
        </address>
      </div>

      {/* Bottom section: Social icons + copyright */}
      <div className={styles.blockSocial}>
        {mergedSocialLinks.length > 0 && (
          <ul className={styles.socialList}>
            {mergedSocialLinks.map((social) => (
              <li key={social.platform} className={styles.socialItem}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={styles.socialLink}
                  title={social.label}
                >
                  {social.icon ? (
                    <img
                      src={social.icon}
                      alt={social.label}
                      width={45}
                      height={45}
                      loading="lazy"
                    />
                  ) : (
                    <span>{social.platform}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        )}
        <p className={styles.copyright}>{copyrightText}</p>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  /**
   * Array of navigation link objects for the footer menu
   * @type {Array<{text: string, href: string, external?: boolean, title?: string}>}
   */
  navigationLinks: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      external: PropTypes.bool,
      title: PropTypes.string,
    })
  ),

  /**
   * Address and contact information object
   * @type {Object}
   */
  address: PropTypes.shape({
    name: PropTypes.string,
    street: PropTypes.string,
    postalCode: PropTypes.string,
    region: PropTypes.string,
    country: PropTypes.string,
    phone: PropTypes.string,
    mobile: PropTypes.string,
    email: PropTypes.string,
    license: PropTypes.string,
    gpsCoords: PropTypes.string,
    gpsLink: PropTypes.string,
  }),

  /**
   * Array of social media link objects
   * @type {Array<{platform: string, url: string, icon?: string, label: string}>}
   */
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      platform: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      icon: PropTypes.string,
      label: PropTypes.string.isRequired,
    })
  ),

  /**
   * Legal information section (complaints, arbitration)
   * @type {Object}
   */
  legalInfo: PropTypes.shape({
    complaintBook: PropTypes.shape({
      text: PropTypes.string,
      url: PropTypes.string,
    }),
    arbitration: PropTypes.shape({
      text: PropTypes.string,
      entityName: PropTypes.string,
      entityUrl: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
    }),
  }),

  /**
   * Copyright text (auto-generated if not provided)
   * @type {string}
   */
  copyright: PropTypes.string,

  /**
   * LEGACY: Contact information (backwards compatibility)
   * @deprecated Use address prop instead
   * @type {Object}
   */
  contactInfo: PropTypes.shape({
    phone: PropTypes.string,
    phone2: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
  }),

  /**
   * LEGACY: Quick links array (backwards compatibility)
   * @deprecated Use navigationLinks prop instead
   * @type {Array}
   */
  quickLinks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      path: PropTypes.string,
    })
  ),
};

Footer.defaultProps = {
  navigationLinks: undefined,
  address: undefined,
  socialLinks: undefined,
  legalInfo: undefined,
  copyright: undefined,
  contactInfo: undefined,
  quickLinks: undefined,
};

export default Footer;
