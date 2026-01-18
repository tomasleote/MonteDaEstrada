import React, { useState } from 'react';
import SEO from '@/components/SEO';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import Section from '@/components/Section';
import ImageGallery from '@/components/ImageGallery';
import styles from './GaleriaPage.module.scss';
import galeriaData from '@/data/galeria.json';
import { seoConfig } from '@/utils/seo-config';

const GaleriaPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Flatten all images from all categories
  const allImages = galeriaData.categories.reduce((acc, category) => {
    return [...acc, ...category.images];
  }, []);

  // Get filtered images based on selected category
  const getFilteredImages = () => {
    if (selectedCategory === 'all') {
      return allImages;
    }
    const category = galeriaData.categories.find(cat => cat.id === selectedCategory);
    return category ? category.images : [];
  };

  const filteredImages = getFilteredImages();

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

      {/* Gallery Section */}
      <Section padding="large">
        <Container>
          <div className={styles.header}>
            <h2 className={styles.pageTitle}>{galeriaData.title}</h2>
            <p className={styles.pageDescription}>{galeriaData.description}</p>
          </div>

          {/* Category Filter */}
          <div className={styles.filterContainer}>
            <button
              className={`${styles.filterButton} ${selectedCategory === 'all' ? styles.active : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              Todas as Fotos ({allImages.length})
            </button>
            {galeriaData.categories.map((category) => (
              <button
                key={category.id}
                className={`${styles.filterButton} ${selectedCategory === category.id ? styles.active : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name} ({category.images.length})
              </button>
            ))}
          </div>

          {/* Image Gallery */}
          <ImageGallery images={filteredImages} />

          {/* Category Descriptions */}
          <div className={styles.categoryInfo}>
            {galeriaData.categories.map((category) => (
              <div key={category.id} className={styles.categoryCard}>
                <h3 className={styles.categoryTitle}>{category.name}</h3>
                <p className={styles.categoryDescription}>{category.description}</p>
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
    </div>
  );
};

export default GaleriaPage;
