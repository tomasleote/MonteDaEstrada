import React from 'react';
import SEO from '@/components/SEO';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Grid from '@/components/Grid';
import Card from '@/components/Card';
import ResponsiveImage from '@/components/ResponsiveImage';
import { ScrollReveal, StaggerChildren, AnimatedText } from '@/motion';
import styles from './AtividadesPage.module.scss';
import atividadesDataOriginal from '@/data/atividades.json';
import { atividadesImages } from '@/assets/images/atividades';
import { seoConfig } from '@/utils/seo-config';
import useEditableContent from '@/hooks/useEditableContent';

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

      {/* Hero Section with Background Image */}
      <div className={styles.hero}>
        <div className={styles.heroImageWrapper}>
          <ResponsiveImage
            src={atividadesImages.heroes[0].src}
            alt={atividadesImages.heroes[0].alt}
            className={styles.heroImage}
            loading="eager"
            lazy={false}
            objectFit="cover"
          />
          <div className={styles.heroOverlay} />
        </div>
        <Container>
          <div className={styles.heroContent}>
            <AnimatedText as="h1" className={styles.heroTitle}>
              {atividadesData.title}
            </AnimatedText>
            <ScrollReveal variant="fadeUpSubtle" delay={0.2}>
              <p className={styles.heroDescription}>{atividadesData.description}</p>
            </ScrollReveal>
          </div>
        </Container>
      </div>

      {/* Activities Cards with Images */}
      <Section padding="large" animate>
        <Container>
          <StaggerChildren speed="slow" className={styles.activitiesGrid}>
            {atividadesData.activities.map((activity, index) => {
              // Cycle through available images
              const imageIndex = index % atividadesImages.activities.length;
              const activityImage = atividadesImages.activities[imageIndex];

              return (
                <StaggerChildren.Item key={index}>
                  <div className={styles.activityCard}>
                    <div className={styles.activityImageWrapper}>
                      <ResponsiveImage
                        src={activityImage.src}
                        alt={activityImage.alt}
                        className={styles.activityImage}
                        aspectRatio="16/9"
                        objectFit="cover"
                      />
                      <div className={styles.activityImageOverlay}>
                        <span className={styles.activityIcon}>{activity.icon}</span>
                      </div>
                    </div>
                    <div className={styles.activityContent}>
                      <h2 className={styles.activityTitle}>{activity.title}</h2>
                      <p className={styles.activityDescription}>{activity.description}</p>
                      <ul className={styles.highlightsList}>
                        {activity.highlights.map((highlight, idx) => (
                          <li key={idx}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </StaggerChildren.Item>
              );
            })}
          </StaggerChildren>
        </Container>
      </Section>

      {/* Amenities Section */}
      <Section background="secondary" padding="large" animate>
        <Container>
          <ScrollReveal>
            <h2 className={styles.sectionTitle}>{atividadesData.amenities.title}</h2>
          </ScrollReveal>
          <StaggerChildren>
            <Grid columns={4} gap="large">
              {atividadesData.amenities.items.map((amenity, index) => (
                <StaggerChildren.Item key={index}>
                  <Card className={styles.amenityCard}>
                    <h3 className={styles.amenityName}>{amenity.name}</h3>
                    <p className={styles.amenityDescription}>{amenity.description}</p>
                  </Card>
                </StaggerChildren.Item>
              ))}
            </Grid>
          </StaggerChildren>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="primary" padding="large" animate>
        <Container>
          <ScrollReveal variant="fadeIn">
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
          </ScrollReveal>
        </Container>
      </Section>
    </div>
  );
};

export default AtividadesPage;
