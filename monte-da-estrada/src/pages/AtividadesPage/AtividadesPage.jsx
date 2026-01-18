import React from 'react';
import SEO from '@/components/SEO';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Grid from '@/components/Grid';
import Card from '@/components/Card';
import styles from './AtividadesPage.module.scss';
import atividadesData from '@/data/atividades.json';
import { seoConfig } from '@/utils/seo-config';

const AtividadesPage = () => {
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
          <div className={styles.activitiesGrid}>
            {atividadesData.activities.map((activity, index) => (
              <div key={index} className={styles.activitySection}>
                <div className={styles.activityHeader}>
                  <span className={styles.activityIcon}>{activity.icon}</span>
                  <h2 className={styles.activityTitle}>{activity.title}</h2>
                </div>
                <p className={styles.activityDescription}>{activity.description}</p>
                <ul className={styles.highlightsList}>
                  {activity.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Amenities Section */}
      <Section background="secondary" padding="large">
        <Container>
          <h2 className={styles.sectionTitle}>{atividadesData.amenities.title}</h2>
          <Grid columns={4} gap="large">
            {atividadesData.amenities.items.map((amenity, index) => (
              <Card key={index} className={styles.amenityCard}>
                <h3 className={styles.amenityName}>{amenity.name}</h3>
                <p className={styles.amenityDescription}>{amenity.description}</p>
              </Card>
            ))}
          </Grid>
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
