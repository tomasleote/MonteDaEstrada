import React from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Grid from '@/components/Grid';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import styles from './HomePage.module.scss';
import homeDataOriginal from '@/data/home.json';
import { seoConfig } from '@/utils/seo-config';
import useEditableContent from '@/hooks/useEditableContent';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

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
          <motion.div
            className={styles.welcome}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              className={styles.welcomeTitle}
              variants={fadeInUp}
            >
              {homeData.welcome.title}
            </motion.h2>
            {homeData.welcome.paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                className={styles.welcomeText}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Highlights Section */}
      <Section background="light" padding="large">
        <Container>
          <motion.h2
            className={styles.sectionTitle}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Porquê Escolher o Monte da Estrada?
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <Grid columns={4} gap="large">
              {homeData.highlights.map((highlight, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className={styles.highlightCard}>
                    <Icon name={highlight.icon} size="xl" color="primary" />
                    <h3 className={styles.highlightTitle}>{highlight.title}</h3>
                    <p className={styles.highlightDescription}>{highlight.description}</p>
                  </Card>
                </motion.div>
              ))}
            </Grid>
          </motion.div>
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
