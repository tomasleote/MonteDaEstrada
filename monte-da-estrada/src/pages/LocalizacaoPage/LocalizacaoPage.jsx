import React from 'react';
import SEO from '@/components/SEO';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Grid from '@/components/Grid';
import Card from '@/components/Card';
import styles from './LocalizacaoPage.module.scss';
import localizacaoData from '@/data/localizacao.json';
import { seoConfig } from '@/utils/seo-config';

const LocalizacaoPage = () => {
  return (
    <div className={styles.localizacaoPage}>
      <SEO
        title={seoConfig.localizacao.title}
        description={seoConfig.localizacao.description}
        keywords={seoConfig.localizacao.keywords}
        image={seoConfig.localizacao.image}
      />
      {/* Page Header */}
      <Section background="light" padding="large">
        <Container>
          <div className={styles.header}>
            <h1 className={styles.pageTitle}>{localizacaoData.title}</h1>
            <p className={styles.pageDescription}>{localizacaoData.description}</p>
          </div>
        </Container>
      </Section>

      {/* Map Placeholder */}
      <Section padding="none">
        <div className={styles.mapPlaceholder}>
          <Container>
            <div className={styles.mapContent}>
              <h3>🗺️ Mapa Interativo</h3>
              <p>Coordenadas: {localizacaoData.address.coordinates.latitude}, {localizacaoData.address.coordinates.longitude}</p>
              <p className={styles.addressText}>
                {localizacaoData.address.street}<br />
                {localizacaoData.address.city}, {localizacaoData.address.region}<br />
                {localizacaoData.address.country}
              </p>
            </div>
          </Container>
        </div>
      </Section>

      {/* Directions Section */}
      <Section padding="large">
        <Container>
          <h2 className={styles.sectionTitle}>{localizacaoData.directions.title}</h2>
          <Grid columns={3} gap="large">
            <Card className={styles.directionCard}>
              <h3 className={styles.directionTitle}>{localizacaoData.directions.fromLisbon.title}</h3>
              <p className={styles.directionMeta}>
                <strong>Distância:</strong> {localizacaoData.directions.fromLisbon.distance}<br />
                <strong>Tempo:</strong> {localizacaoData.directions.fromLisbon.duration}
              </p>
              <ol className={styles.routeList}>
                {localizacaoData.directions.fromLisbon.route.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </Card>

            <Card className={styles.directionCard}>
              <h3 className={styles.directionTitle}>{localizacaoData.directions.fromFaro.title}</h3>
              <p className={styles.directionMeta}>
                <strong>Distância:</strong> {localizacaoData.directions.fromFaro.distance}<br />
                <strong>Tempo:</strong> {localizacaoData.directions.fromFaro.duration}
              </p>
              <ol className={styles.routeList}>
                {localizacaoData.directions.fromFaro.route.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </Card>

            <Card className={styles.directionCard}>
              <h3 className={styles.directionTitle}>{localizacaoData.directions.fromPorto.title}</h3>
              <p className={styles.directionMeta}>
                <strong>Distância:</strong> {localizacaoData.directions.fromPorto.distance}<br />
                <strong>Tempo:</strong> {localizacaoData.directions.fromPorto.duration}
              </p>
              <ol className={styles.routeList}>
                {localizacaoData.directions.fromPorto.route.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* Public Transport */}
      <Section background="secondary" padding="large">
        <Container>
          <h2 className={styles.sectionTitle}>{localizacaoData.publicTransport.title}</h2>
          <p className={styles.centeredText}>{localizacaoData.publicTransport.description}</p>
          <Grid columns={3} gap="large">
            {localizacaoData.publicTransport.options.map((option, index) => (
              <Card key={index} className={styles.transportCard}>
                <h3 className={styles.transportType}>{option.type}</h3>
                <p className={styles.transportDescription}>{option.description}</p>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Distances */}
      <Section padding="large">
        <Container>
          <h2 className={styles.sectionTitle}>{localizacaoData.distances.title}</h2>
          <Grid columns={3} gap="medium">
            {localizacaoData.distances.items.map((item, index) => (
              <Card key={index} className={styles.distanceCard}>
                <h4 className={styles.distanceLocation}>{item.location}</h4>
                <p className={styles.distanceInfo}>{item.distance}</p>
                <p className={styles.distanceDuration}>{item.duration}</p>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Parking & Tips */}
      <Section background="light" padding="large">
        <Container>
          <Grid columns={2} gap="large">
            <Card className={styles.infoCard}>
              <h3 className={styles.infoCardTitle}>{localizacaoData.parking.title}</h3>
              <p className={styles.infoCardText}>{localizacaoData.parking.description}</p>
              <ul className={styles.featuresList}>
                {localizacaoData.parking.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </Card>

            <Card className={styles.infoCard}>
              <h3 className={styles.infoCardTitle}>{localizacaoData.tips.title}</h3>
              <ul className={styles.tipsList}>
                {localizacaoData.tips.items.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </Card>
          </Grid>
        </Container>
      </Section>
    </div>
  );
};

export default LocalizacaoPage;
