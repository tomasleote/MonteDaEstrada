import React from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Grid from '@/components/Grid';
import Card from '@/components/Card';
import Icon from '@/components/Icon';
import styles from './AtividadesPage.module.scss';
import atividadesDataOriginal from '@/data/atividades.json';
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
      staggerChildren: 0.15
    }
  }
};

const AtividadesPage = () => {
  const atividadesData = useEditableContent('atividades', atividadesDataOriginal);
  return (
    <div className={styles.atividadesPage}>
      <SEO
        title={seoConfig.atividades.title}
        description={seoConfig.atividades.description}
        keywords={seoConfig.atividades.keywords}
        image={seoConfig.atividades.image}
      />
      {/* Page Header */}
      <Section background="light" padding="large">
        <Container>
          <div className={styles.header}>
            <h1 className={styles.pageTitle}>{atividadesData.title}</h1>
            <p className={styles.pageDescription}>{atividadesData.description}</p>
          </div>
        </Container>
      </Section>

      {/* Activities Section */}
      <Section padding="large">
        <Container>
          <motion.div
            className={styles.activitiesGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {atividadesData.activities.map((activity, index) => (
              <motion.div
                key={index}
                className={styles.activitySection}
                variants={fadeInUp}
              >
                <div className={styles.activityHeader}>
                  <Icon name={activity.icon} size="2xl" color="primary" />
                  <h2 className={styles.activityTitle}>{activity.title}</h2>
                </div>
                <p className={styles.activityDescription}>{activity.description}</p>
                <ul className={styles.highlightsList}>
                  {activity.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Amenities Section */}
      <Section background="secondary" padding="large">
        <Container>
          <motion.h2
            className={styles.sectionTitle}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            {atividadesData.amenities.title}
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <Grid columns={4} gap="large">
              {atividadesData.amenities.items.map((amenity, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className={styles.amenityCard}>
                    <h3 className={styles.amenityName}>{amenity.name}</h3>
                    <p className={styles.amenityDescription}>{amenity.description}</p>
                  </Card>
                </motion.div>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="primary" padding="large">
        <Container>
          <div className={styles.cta}>
            <h2 className={styles.ctaTitle}>Pronto para a Aventura?</h2>
            <p className={styles.ctaText}>
              Reserve já a sua estadia e venha explorar tudo o que o Alentejo tem para oferecer.
            </p>
            <div className={styles.ctaButtons}>
              <a href="/quartos" className={styles.ctaButton}>
                Ver Quartos e Reservar
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default AtividadesPage;
