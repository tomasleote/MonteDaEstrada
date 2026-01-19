import React from 'react';
import SEO from '@/components/SEO';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Grid from '@/components/Grid';
import Card from '@/components/Card';
import Button from '@/components/Button';
import styles from './HomePage.module.scss';
import homeDataOriginal from '@/data/home.json';
import { seoConfig } from '@/utils/seo-config';
import useEditableContent from '@/hooks/useEditableContent';

const HomePage = () => {
  // Use editable content hook to load from localStorage if edited
  const homeData = useEditableContent('home', homeDataOriginal);
  return (
    <div className={styles.homePage}>
      <SEO
        title={seoConfig.home.title}
        description={seoConfig.home.description}
        keywords={seoConfig.home.keywords}
        image={seoConfig.home.image}
      />
      {/* Hero Section */}
      <Hero
        backgroundImage={homeData.hero.image}
        title={homeData.hero.title}
        subtitle={homeData.hero.subtitle}
        ctaText="Ver Quartos"
        ctaLink="/quartos"
        height="100vh"
      />

      {/* Welcome Section */}
      <Section padding="large">
        <Container>
          <div className={styles.welcome}>
            <h2 className={styles.welcomeTitle}>{homeData.welcome.title}</h2>
            {homeData.welcome.paragraphs.map((paragraph, index) => (
              <p key={index} className={styles.welcomeText}>
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      {/* Highlights Section */}
      <Section background="light" padding="large">
        <Container>
          <h2 className={styles.sectionTitle}>Porquê Escolher o Monte da Estrada?</h2>
          <Grid columns={4} gap="large">
            {homeData.highlights.map((highlight, index) => (
              <Card key={index} className={styles.highlightCard}>
                <div className={styles.highlightIcon}>{highlight.icon}</div>
                <h3 className={styles.highlightTitle}>{highlight.title}</h3>
                <p className={styles.highlightDescription}>{highlight.description}</p>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Information Section */}
      <Section padding="large">
        <Container>
          <div className={styles.infoGrid}>
            <div className={styles.infoBlock}>
              <h2 className={styles.infoTitle}>{homeData.information.title}</h2>
              <div className={styles.infoContent}>
                <div className={styles.infoItem}>
                  <h4>Horários</h4>
                  <p><strong>Check-in:</strong> {homeData.information.checkIn}</p>
                  <p><strong>Check-out:</strong> {homeData.information.checkOut}</p>
                </div>
                <div className={styles.infoItem}>
                  <h4>Políticas</h4>
                  <ul>
                    {homeData.information.policies.map((policy, index) => (
                      <li key={index}>{policy}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.infoItem}>
                  <h4>Incluído</h4>
                  <ul>
                    {homeData.information.included.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="primary" padding="large">
        <Container>
          <div className={styles.cta}>
            <h2 className={styles.ctaTitle}>Pronto para a sua escapadinha no Alentejo?</h2>
            <p className={styles.ctaText}>
              Reserve já o seu quarto e venha descobrir a tranquilidade do campo alentejano.
            </p>
            <div className={styles.ctaButtons}>
              <Button variant="secondary" size="large" href="/quartos">
                Ver Quartos e Preços
              </Button>
              <Button variant="outline" size="large" href="/galeria">
                Ver Galeria
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default HomePage;
