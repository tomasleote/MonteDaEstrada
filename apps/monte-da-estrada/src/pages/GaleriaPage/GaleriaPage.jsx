import React, { useState, useMemo } from 'react';
import SEO from '@/components/SEO';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import Section from '@/components/Section';
import ResponsiveImage from '@/components/ResponsiveImage';
import Lightbox from '@/components/Lightbox';
import styles from './GaleriaPage.module.scss';
import galeriaData from '@/data/galeria.json';
import { seoConfig } from '@/utils/seo-config';
import { galeriaImages } from '@/assets/images/galeria';
import { homeImages } from '@/assets/images/home';
import { exteriorImages } from '@/assets/images/exterior';

const GaleriaPage = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Combine all gallery images from different sources
  const allGalleryImages = useMemo(() => {
    return [
      ...galeriaImages.gallery,
      ...homeImages.gallery,
      ...exteriorImages.amenities
    ];
  }, []);

  // Reason: Open lightbox at specific image index
  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <div className={styles.galeriaPage}>
      <SEO
        title={seoConfig.galeria.title}
        description={seoConfig.galeria.description}
        keywords={seoConfig.galeria.keywords}
        image={seoConfig.galeria.image}
      />

      {/* Hero Section */}
      <Hero
        backgroundImage={galeriaData.hero.image}
        title={galeriaData.hero.title}
        subtitle={galeriaData.hero.subtitle}
        height="60vh"
      />

      {/* Gallery Grid Section */}
      <Section padding="large">
        <Container>
          <div className={styles.header}>
            <h2 className={styles.pageTitle}>{galeriaData.title}</h2>
            <p className={styles.pageDescription}>{galeriaData.description}</p>
          </div>

          {/* Masonry Grid Gallery */}
          <div className={styles.galleryGrid}>
            {allGalleryImages.map((image, index) => (
              <div
                key={index}
                className={styles.galleryItem}
              >
                <ResponsiveImage
                  src={image.src}
                  alt={image.alt}
                  aspectRatio="4/3"
                  objectFit="cover"
                  className={styles.galleryImage}
                  onClick={() => handleImageClick(index)}
                  loading="lazy"
                />
                <div className={styles.imageOverlay}>
                  <span className={styles.imageTitle}>{image.title}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Information Section */}
      <Section background="light" padding="large">
        <Container>
          <div className={styles.infoBlock}>
            <h3 className={styles.infoTitle}>{galeriaData.photographyInfo.title}</h3>
            <p className={styles.infoText}>{galeriaData.photographyInfo.description}</p>
            <div className={styles.creditsList}>
              {galeriaData.photographyInfo.credits.map((credit, index) => (
                <p key={index} className={styles.credit}>{credit}</p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Lightbox */}
      <Lightbox
        images={allGalleryImages}
        initialIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={handleCloseLightbox}
      />
    </div>
  );
};

export default GaleriaPage;
