import React, { useState } from 'react';
import SEO from '@/components/SEO';
import Container from '@/components/Container';
import Section from '@/components/Section';
import ResponsiveImage from '@/components/ResponsiveImage';
import { ScrollReveal, StaggerChildren, AnimatedText } from '@/motion';
import styles from './RedondezasPage.module.scss';
import { redondezasImages } from '@/assets/images/redondezas';
import { seoConfig } from '@/utils/seo-config';

/**
 * RedondezasPage component
 * Displays nearby attractions grouped by proximity and location
 * Features luxury card styling with real images from the region
 */
const RedondezasPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Group attractions by proximity for better organization
  const attractionsByProximity = {
    closest: redondezasImages.attractions.filter(
      (attr) => parseInt(attr.distance) <= 10
    ),
    nearby: redondezasImages.attractions.filter(
      (attr) => parseInt(attr.distance) > 10 && parseInt(attr.distance) <= 20
    ),
    regional: redondezasImages.attractions.filter(
      (attr) => parseInt(attr.distance) > 20 && parseInt(attr.distance) <= 35
    ),
    extended: redondezasImages.attractions.filter(
      (attr) => parseInt(attr.distance) > 35
    )
  };

  // Get filtered attractions based on selection
  const getFilteredAttractions = () => {
    if (selectedFilter === 'all') {
      return redondezasImages.attractions;
    }
    return attractionsByProximity[selectedFilter] || [];
  };

  const filteredAttractions = getFilteredAttractions();

  return (
    <div className={styles.redondezasPage}>
      <SEO
        title={seoConfig.redondezas.title}
        description={seoConfig.redondezas.description}
        keywords={seoConfig.redondezas.keywords}
        image={seoConfig.redondezas.image}
      />

      {/* Hero Section with Background Image */}
      <div className={styles.hero}>
        <ResponsiveImage
          src={redondezasImages.hero.src}
          alt={redondezasImages.hero.alt}
          className={styles.heroImage}
          aspectRatio="21/9"
          objectFit="cover"
          lazy={false}
        />
        <div className={styles.heroOverlay}>
          <Container>
            <div className={styles.heroContent}>
              <AnimatedText as="h1" className={styles.heroTitle}>
                Explore the Region
              </AnimatedText>
              <ScrollReveal variant="fadeUpSubtle" delay={0.2}>
                <p className={styles.heroSubtitle}>
                  Discover the pristine beauty of Portugal's Southwest coast
                </p>
              </ScrollReveal>
            </div>
          </Container>
        </div>
      </div>

      {/* Introduction Section */}
      <Section padding="large" animate>
        <Container>
          <ScrollReveal>
            <div className={styles.introduction}>
              <h2 className={styles.sectionTitle}>Nearby Attractions</h2>
              <p className={styles.introText}>
                Monte da Estrada is perfectly positioned to explore the stunning Alentejo coast
                and its charming villages. From pristine beaches to historic towns, cultural
                festivals to natural wonders, discover the authentic beauty of this unique region.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Filter Section */}
      <Section background="light" padding="medium" animate>
        <Container>
          <ScrollReveal variant="fadeIn">
            <div className={styles.filterContainer}>
              <h3 className={styles.filterTitle}>Filter by Distance</h3>
              <div className={styles.filterButtons}>
                <button
                  className={`${styles.filterButton} ${
                    selectedFilter === 'all' ? styles.active : ''
                  }`}
                  onClick={() => setSelectedFilter('all')}
                >
                  All Attractions ({redondezasImages.attractions.length})
                </button>
                <button
                  className={`${styles.filterButton} ${
                    selectedFilter === 'closest' ? styles.active : ''
                  }`}
                  onClick={() => setSelectedFilter('closest')}
                >
                  Closest (0-10 km) ({attractionsByProximity.closest.length})
                </button>
                <button
                  className={`${styles.filterButton} ${
                    selectedFilter === 'nearby' ? styles.active : ''
                  }`}
                  onClick={() => setSelectedFilter('nearby')}
                >
                  Nearby (11-20 km) ({attractionsByProximity.nearby.length})
                </button>
                <button
                  className={`${styles.filterButton} ${
                    selectedFilter === 'regional' ? styles.active : ''
                  }`}
                  onClick={() => setSelectedFilter('regional')}
                >
                  Regional (21-35 km) ({attractionsByProximity.regional.length})
                </button>
                <button
                  className={`${styles.filterButton} ${
                    selectedFilter === 'extended' ? styles.active : ''
                  }`}
                  onClick={() => setSelectedFilter('extended')}
                >
                  Extended (35+ km) ({attractionsByProximity.extended.length})
                </button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Attractions Grid */}
      <Section padding="large" animate>
        <Container>
          <StaggerChildren className={styles.attractionsGrid} key={selectedFilter}>
            {filteredAttractions.map((attraction, index) => (
              <StaggerChildren.Item key={index}>
                <article className={styles.attractionCard}>
                  <div className={styles.imageWrapper}>
                    <ResponsiveImage
                      src={attraction.src}
                      alt={attraction.alt}
                      className={styles.cardImage}
                      aspectRatio="4/3"
                      objectFit="cover"
                    />
                    <div className={styles.distanceBadge}>{attraction.distance}</div>
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{attraction.title}</h3>
                    <p className={styles.cardLocation}>{attraction.location}</p>
                  </div>
                </article>
              </StaggerChildren.Item>
            ))}
          </StaggerChildren>

          {/* No Results Message */}
          {filteredAttractions.length === 0 && (
            <div className={styles.noResults}>
              <p>No attractions found in this distance range.</p>
            </div>
          )}
        </Container>
      </Section>

      {/* Call to Action */}
      <Section background="dark" padding="large" animate>
        <Container>
          <ScrollReveal variant="fadeIn">
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Plan Your Adventure</h2>
              <p className={styles.ctaText}>
                Let us help you discover the best of the Alentejo coast. Contact us for
                personalized recommendations and local insights.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </div>
  );
};

export default RedondezasPage;
