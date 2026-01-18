import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

/**
 * SEO component for managing page meta tags
 * Uses react-helmet-async for server-side rendering support
 *
 * @example
 * <SEO
 *   title="Monte da Estrada - Turismo Rural no Alentejo"
 *   description="Descubra o Monte da Estrada..."
 *   image="/images/monte-exterior.jpg"
 * />
 */
const SEO = ({
  title,
  description,
  image,
  type,
  url,
  keywords,
}) => {
  const siteTitle = 'Monte da Estrada';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const siteUrl = 'https://montedaestrada.com'; // Update with actual domain
  const fullUrl = url || siteUrl;
  const fullImage = image ? `${siteUrl}${image}` : `${siteUrl}/images/og-default.jpg`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:locale" content="pt_PT" />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImage} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Portuguese" />
      <meta name="author" content="Monte da Estrada" />
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
};

SEO.propTypes = {
  /** Page title (will be appended to site title) */
  title: PropTypes.string,
  /** Page description for meta tags */
  description: PropTypes.string.isRequired,
  /** Page image for social sharing (relative path) */
  image: PropTypes.string,
  /** Open Graph type */
  type: PropTypes.string,
  /** Canonical URL */
  url: PropTypes.string,
  /** Keywords for SEO */
  keywords: PropTypes.string,
};

SEO.defaultProps = {
  title: null,
  image: null,
  type: 'website',
  url: null,
  keywords: 'turismo rural, alentejo, zambujeira do mar, alojamento, férias, portugal',
};

export default SEO;
