import React from 'react';
import SEO from '@/components/SEO';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Grid from '@/components/Grid';
import Card from '@/components/Card';
import Map from '@/components/Map';
import ContactForm from '@/components/ContactForm';
import ResponsiveImage from '@/components/ResponsiveImage';
import { exteriorImages } from '@/assets/images/exterior';
import { ScrollReveal, StaggerChildren, AnimatedText } from '@/motion';
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

      {/* Hero Section with Real Image */}
      <div className={styles.hero}>
        <ResponsiveImage
          src={exteriorImages.hero.src}
          alt={exteriorImages.hero.alt}
          className={styles.heroImage}
          loading="eager"
          lazy={false}
          aspectRatio="21/9"
        />
        <div className={styles.heroOverlay}>
          <Container>
            <div className={styles.heroContent}>
              <AnimatedText as="h1" className={styles.heroTitle}>
                {localizacaoData.title}
              </AnimatedText>
              <ScrollReveal variant="fadeUpSubtle" delay={0.2}>
                <p className={styles.heroDescription}>{localizacaoData.description}</p>
              </ScrollReveal>
            </div>
          </Container>
        </div>
      </div>

      {/* Interactive Map */}
      <Section padding="large" animate>
        <Container>
          <ScrollReveal variant="fadeIn">
            <div className={styles.mapSection}>
              <div className={styles.mapWrapper}>
                <Map
                  latitude={localizacaoData.address.coordinates.latitude}
                  longitude={localizacaoData.address.coordinates.longitude}
                  title={`Mapa - ${localizacaoData.address.street}, ${localizacaoData.address.city}`}
                  height="500px"
                />
              </div>
              <div className={styles.addressBox}>
                <h3>Endereço</h3>
                <p className={styles.addressText}>
                  <strong>{localizacaoData.address.name}</strong><br />
                  {localizacaoData.address.street}<br />
                  {localizacaoData.address.postalCode} {localizacaoData.address.city}<br />
                  {localizacaoData.address.region}, {localizacaoData.address.country}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Directions Section */}
      <Section padding="large" animate>
        <Container>
          <ScrollReveal>
            <h2 className={styles.sectionTitle}>{localizacaoData.directions.title}</h2>
          </ScrollReveal>
          <StaggerChildren speed="slow">
            <Grid columns={3} gap="large">
              <StaggerChildren.Item>
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
              </StaggerChildren.Item>

              <StaggerChildren.Item>
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
              </StaggerChildren.Item>

              <StaggerChildren.Item>
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
              </StaggerChildren.Item>
            </Grid>
          </StaggerChildren>
        </Container>
      </Section>

      {/* Public Transport */}
      <Section background="secondary" padding="large" animate>
        <Container>
          <ScrollReveal>
            <h2 className={styles.sectionTitle}>{localizacaoData.publicTransport.title}</h2>
            <p className={styles.centeredText}>{localizacaoData.publicTransport.description}</p>
          </ScrollReveal>
          <StaggerChildren>
            <Grid columns={3} gap="large">
              {localizacaoData.publicTransport.options.map((option, index) => (
                <StaggerChildren.Item key={index}>
                  <Card className={styles.transportCard}>
                    <h3 className={styles.transportType}>{option.type}</h3>
                    <p className={styles.transportDescription}>{option.description}</p>
                  </Card>
                </StaggerChildren.Item>
              ))}
            </Grid>
          </StaggerChildren>
        </Container>
      </Section>

      {/* Distances */}
      <Section padding="large" animate>
        <Container>
          <ScrollReveal>
            <h2 className={styles.sectionTitle}>{localizacaoData.distances.title}</h2>
          </ScrollReveal>
          <StaggerChildren speed="fast">
            <Grid columns={3} gap="medium">
              {localizacaoData.distances.items.map((item, index) => (
                <StaggerChildren.Item key={index}>
                  <Card className={styles.distanceCard}>
                    <h4 className={styles.distanceLocation}>{item.location}</h4>
                    <p className={styles.distanceInfo}>{item.distance}</p>
                    <p className={styles.distanceDuration}>{item.duration}</p>
                  </Card>
                </StaggerChildren.Item>
              ))}
            </Grid>
          </StaggerChildren>
        </Container>
      </Section>

      {/* Parking & Tips */}
      <Section background="light" padding="large" animate>
        <Container>
          <StaggerChildren speed="slow">
            <Grid columns={2} gap="large">
              <StaggerChildren.Item>
                <Card className={styles.infoCard}>
                  <h3 className={styles.infoCardTitle}>{localizacaoData.parking.title}</h3>
                  <p className={styles.infoCardText}>{localizacaoData.parking.description}</p>
                  <ul className={styles.featuresList}>
                    {localizacaoData.parking.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </Card>
              </StaggerChildren.Item>

              <StaggerChildren.Item>
                <Card className={styles.infoCard}>
                  <h3 className={styles.infoCardTitle}>{localizacaoData.tips.title}</h3>
                  <ul className={styles.tipsList}>
                    {localizacaoData.tips.items.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </Card>
              </StaggerChildren.Item>
            </Grid>
          </StaggerChildren>
        </Container>
      </Section>

      {/* Contact Form Section */}
      <Section padding="large" animate>
        <Container>
          <ScrollReveal>
            <div className={styles.contactSection}>
              <div className={styles.contactHeader}>
                <h2 className={styles.sectionTitle}>Entre em Contacto</h2>
                <p className={styles.contactDescription}>
                  Tem alguma questão sobre como chegar ou necessita de mais informações?
                  Envie-nos uma mensagem e responderemos em breve.
                </p>
              </div>
              <div className={styles.contactFormWrapper}>
                <ContactForm />
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </div>
  );
};

export default LocalizacaoPage;
