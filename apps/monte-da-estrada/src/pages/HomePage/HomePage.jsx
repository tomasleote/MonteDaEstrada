import React from 'react';
import { motion } from 'motion/react';
import SEO from '@/components/SEO';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Grid from '@/components/Grid';
import Card from '@/components/Card';
import Button from '@/components/Button';
import ResponsiveImage from '@/components/ResponsiveImage';
import { ScrollReveal, StaggerChildren, AnimatedText, fadeUp, scaleIn, imageZoom } from '@/motion';
import styles from './HomePage.module.scss';
import homeDataOriginal from '@/data/home.json';
import { seoConfig } from '@/utils/seo-config';
import useEditableContent from '@/hooks/useEditableContent';
import { homeImages } from '@/assets/images/home';

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
        backgroundImage={homeImages.hero.src}
        title={homeData.hero.title}
        subtitle={homeData.hero.subtitle}
        ctaText="Ver Quartos"
        ctaLink="/quartos"
        height="100vh"
      />

      {/* Welcome Section */}
      <Section padding="large" animate>
        <Container>
          <ScrollReveal>
            <div className={styles.welcome}>
              <AnimatedText as="h2" stagger className={styles.welcomeTitle}>
                {homeData.welcome.title}
              </AnimatedText>
              {homeData.welcome.paragraphs.map((paragraph, index) => (
                <ScrollReveal key={index} variant="fadeUpSubtle" delay={0.1 * (index + 1)}>
                  <p className={styles.welcomeText}>
                    {paragraph}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Gallery Section */}
      <Section background="light" padding="large" animate>
        <Container>
          <ScrollReveal>
            <h2 className={styles.sectionTitle}>Descubra o Monte da Estrada</h2>
          </ScrollReveal>
          <StaggerChildren className={styles.galleryGrid}>
            {homeImages.gallery.slice(0, 6).map((image, index) => (
              <StaggerChildren.Item key={index}>
                <motion.div
                  className={styles.galleryItem}
                  whileHover={imageZoom.hover}
                >
                  <ResponsiveImage
                    src={image.src}
                    alt={image.alt}
                    aspectRatio="4/3"
                    objectFit="cover"
                    loading={index < 3 ? 'eager' : 'lazy'}
                  />
                </motion.div>
              </StaggerChildren.Item>
            ))}
          </StaggerChildren>
        </Container>
      </Section>

      {/* Highlights Section */}
      <Section background="light" padding="large" animate>
        <Container>
          <ScrollReveal>
            <h2 className={styles.sectionTitle}>Porquê Escolher o Monte da Estrada?</h2>
          </ScrollReveal>
          <StaggerChildren speed="slow">
            <Grid columns={4} gap="large">
              {homeData.highlights.map((highlight, index) => (
                <StaggerChildren.Item key={index}>
                  <Card className={styles.highlightCard}>
                    <div className={styles.highlightIcon}>{highlight.icon}</div>
                    <h3 className={styles.highlightTitle}>{highlight.title}</h3>
                    <p className={styles.highlightDescription}>{highlight.description}</p>
                  </Card>
                </StaggerChildren.Item>
              ))}
            </Grid>
          </StaggerChildren>
        </Container>
      </Section>

      {/* Information Section */}
      <Section padding="large" animate>
        <Container>
          <ScrollReveal>
            <div className={styles.infoGrid}>
              <div className={styles.infoBlock}>
                <h2 className={styles.infoTitle}>{homeData.information.title}</h2>
                <StaggerChildren speed="slow" className={styles.infoContent}>
                  <StaggerChildren.Item>
                    <div className={styles.infoItem}>
                      <h4>Horários</h4>
                      <p><strong>Check-in:</strong> {homeData.information.checkIn}</p>
                      <p><strong>Check-out:</strong> {homeData.information.checkOut}</p>
                    </div>
                  </StaggerChildren.Item>
                  <StaggerChildren.Item>
                    <div className={styles.infoItem}>
                      <h4>Políticas</h4>
                      <ul>
                        {homeData.information.policies.map((policy, index) => (
                          <li key={index}>{policy}</li>
                        ))}
                      </ul>
                    </div>
                  </StaggerChildren.Item>
                  <StaggerChildren.Item>
                    <div className={styles.infoItem}>
                      <h4>Incluído</h4>
                      <ul>
                        {homeData.information.included.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </StaggerChildren.Item>
                </StaggerChildren>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="primary" padding="large" animate>
        <Container>
          <ScrollReveal variant="fadeIn">
            <div className={styles.cta}>
              <AnimatedText as="h2" className={styles.ctaTitle}>
                Pronto para a sua escapadinha no Alentejo?
              </AnimatedText>
              <ScrollReveal variant="fadeUpSubtle" delay={0.15}>
                <p className={styles.ctaText}>
                  Reserve já o seu quarto e venha descobrir a tranquilidade do campo alentejano.
                </p>
              </ScrollReveal>
              <ScrollReveal variant="fadeUp" delay={0.3}>
                <div className={styles.ctaButtons}>
                  <Button variant="secondary" size="large" href="/quartos">
                    Ver Quartos e Preços
                  </Button>
                  <Button variant="outline" size="large" href="/galeria">
                    Ver Galeria
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </div>
  );
};

export default HomePage;
