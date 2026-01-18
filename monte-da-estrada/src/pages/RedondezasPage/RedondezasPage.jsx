import React from 'react';
import SEO from '@/components/SEO';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Grid from '@/components/Grid';
import Card from '@/components/Card';
import styles from './RedondezasPage.module.scss';
import redondezasData from '@/data/redondezas.json';
import { seoConfig } from '@/utils/seo-config';

const RedondezasPage = () => {
  return (
    <div className={styles.redondezasPage}>
      <SEO
        title={seoConfig.redondezas.title}
        description={seoConfig.redondezas.description}
        keywords={seoConfig.redondezas.keywords}
        image={seoConfig.redondezas.image}
      />
      {/* Page Header */}
      <Section background="light" padding="large">
        <Container>
          <div className={styles.header}>
            <h1 className={styles.pageTitle}>{redondezasData.title}</h1>
            <p className={styles.pageDescription}>{redondezasData.description}</p>
          </div>
        </Container>
      </Section>

      {/* Region Overview */}
      <Section padding="large">
        <Container>
          <div className={styles.regionOverview}>
            <h2 className={styles.sectionTitle}>{redondezasData.region.title}</h2>
            <p className={styles.regionDescription}>{redondezasData.region.description}</p>
            <ul className={styles.highlightsList}>
              {redondezasData.region.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Beaches Section */}
      <Section background="secondary" padding="large">
        <Container>
          <h2 className={styles.sectionTitle}>{redondezasData.beaches.title}</h2>
          <Grid columns={2} gap="large">
            {redondezasData.beaches.items.map((beach, index) => (
              <Card key={index} className={styles.placeCard}>
                <h3 className={styles.placeName}>{beach.name}</h3>
                <p className={styles.placeDistance}>{beach.distance}</p>
                <p className={styles.placeDescription}>{beach.description}</p>
                <div className={styles.placeFeatures}>
                  {beach.features.map((feature, idx) => (
                    <span key={idx} className={styles.featureTag}>{feature}</span>
                  ))}
                </div>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Towns Section */}
      <Section padding="large">
        <Container>
          <h2 className={styles.sectionTitle}>{redondezasData.towns.title}</h2>
          <Grid columns={2} gap="large">
            {redondezasData.towns.items.map((town, index) => (
              <Card key={index} className={styles.placeCard}>
                <h3 className={styles.placeName}>{town.name}</h3>
                <p className={styles.placeDistance}>{town.distance}</p>
                <p className={styles.placeDescription}>{town.description}</p>
                <ul className={styles.attractionsList}>
                  {town.attractions.map((attraction, idx) => (
                    <li key={idx}>{attraction}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Gastronomy Section */}
      <Section background="light" padding="large">
        <Container>
          <h2 className={styles.sectionTitle}>{redondezasData.restaurants.title}</h2>
          <p className={styles.centeredText}>{redondezasData.restaurants.description}</p>
          <Grid columns={2} gap="large">
            {redondezasData.restaurants.items.map((restaurant, index) => (
              <Card key={index} className={styles.restaurantCard}>
                <h3 className={styles.restaurantName}>{restaurant.name}</h3>
                <div className={styles.specialtiesList}>
                  {restaurant.specialties.map((specialty, idx) => (
                    <span key={idx} className={styles.specialtyTag}>{specialty}</span>
                  ))}
                </div>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Festivals Section */}
      <Section padding="large">
        <Container>
          <h2 className={styles.sectionTitle}>{redondezasData.festivals.title}</h2>
          <p className={styles.centeredText}>{redondezasData.festivals.description}</p>
          <div className={styles.festivalsGrid}>
            {redondezasData.festivals.events.map((event, index) => (
              <Card key={index} className={styles.festivalCard}>
                <h3 className={styles.festivalName}>{event.name}</h3>
                <p className={styles.festivalPeriod}>{event.period} • {event.location}</p>
                <p className={styles.festivalDescription}>{event.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Other Attractions */}
      <Section background="secondary" padding="large">
        <Container>
          <h2 className={styles.sectionTitle}>{redondezasData.attractions.title}</h2>
          <Grid columns={3} gap="medium">
            {redondezasData.attractions.items.map((attraction, index) => (
              <Card key={index} className={styles.attractionCard}>
                <p className={styles.attractionText}>{attraction}</p>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>
    </div>
  );
};

export default RedondezasPage;
