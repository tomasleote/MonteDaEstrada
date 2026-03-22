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
  title = null,
  description,
  image = null,
  type = 'website',
  url = null,
  keywords = 'turismo rural, alentejo, zambujeira do mar, alojamento, férias, portugal',
  locale = 'pt',
}) => {
  const siteTitle = 'Monte da Estrada';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const siteUrl = 'https://montedaestrada.com';

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const fullUrl = url || (currentPath === '/' ? siteUrl : `${siteUrl}${currentPath}`);

  let ptPath = currentPath.replace(/^\/en(\/|$)/, '/');
  if (ptPath.length > 1 && ptPath.endsWith('/')) ptPath = ptPath.slice(0, -1);

  let enPath = currentPath.startsWith('/en') ? currentPath : (currentPath === '/' ? '/en/' : `/en${currentPath}`);
  if (enPath.length > 4 && enPath.endsWith('/')) enPath = enPath.slice(0, -1);

  const fallbackImage = 'https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@15d5b6f/mde/home/home-property-view-05.webp';
  const fullImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : fallbackImage;
  const ogLocale = locale === 'en' ? 'en_US' : 'pt_PT';

  return (
    <Helmet>
      <html lang={locale === 'en' ? 'en' : 'pt'} />
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* hreflang — must come before other meta */}
      <link rel="alternate" hreflang="x-default" href={ptPath === '/' ? siteUrl : `${siteUrl}${ptPath}`} />
      <link rel="alternate" hreflang="pt" href={ptPath === '/' ? siteUrl : `${siteUrl}${ptPath}`} />
      <link rel="alternate" hreflang="en" href={enPath === '/en/' ? `${siteUrl}/en/` : `${siteUrl}${enPath}`} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImage} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content={locale === 'en' ? 'English' : 'Portuguese'} />
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
  /** Page locale — 'pt' or 'en' */
  locale: PropTypes.string,
};



export default SEO;
