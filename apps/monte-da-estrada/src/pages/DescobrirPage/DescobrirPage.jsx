import React, { useState } from 'react';
import SEO from '@/components/SEO';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Grid from '@/components/Grid';
import Card from '@/components/Card';
import ResponsiveImage from '@/components/ResponsiveImage';
import { ScrollReveal, StaggerChildren, AnimatedText } from '@/motion';
import styles from './DescobrirPage.module.scss';
import atividadesDataOriginal from '@/data/atividades.json';
import { atividadesImages } from '@/assets/images/atividades';
import { redondezasImages } from '@/assets/images/redondezas';
import useEditableContent from '@/hooks/useEditableContent';

const DescobrirPage = () => {
  const atividadesData = useEditableContent('atividades', atividadesDataOriginal);
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Distance filter logic from RedondezasPage
  const attractionsByProximity = {
    closest: redondezasImages.attractions.filter((a) => parseInt(a.distance) <= 10),
    nearby: redondezasImages.attractions.filter(
      (a) => parseInt(a.distance) > 10 && parseInt(a.distance) <= 20
    ),
    regional: redondezasImages.attractions.filter(
      (a) => parseInt(a.distance) > 20 && parseInt(a.distance) <= 35
    ),
    extended: redondezasImages.attractions.filter((a) => parseInt(a.distance) > 35),
  };

  const filteredAttractions =
    selectedFilter === 'all'
      ? redondezasImages.attractions
      : attractionsByProximity[selectedFilter] || [];

  return (
    <div className={styles.descobrirPage}>
      <SEO
        title="Descobrir"
        description="Explore o território à volta do Monte da Estrada: praias da Costa Vicentina, trilhos da Rota Vicentina, vilas históricas e a paisagem única do Alentejo interior."
        keywords="descobrir, alentejo, costa vicentina, rota vicentina, zambujeira do mar, atividades, redondezas, monte da estrada"
        image="/images/hero-atividades.jpg"
      />

      {/* Hero */}
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
              Descobrir
            </AnimatedText>
            <ScrollReveal variant="fadeUpSubtle" delay={0.2}>
              <p className={styles.heroDescription}>
                O Alentejo interior a uma hora de Lisboa. O Atlântico a dezoito quilómetros.
              </p>
            </ScrollReveal>
          </div>
        </Container>
      </div>

      {/* O Território — editorial intro */}
      <Section padding="large" animate>
        <Container>
          <ScrollReveal>
            <div className={styles.territorioIntro}>
              <span className={styles.eyebrow}>O Território</span>
              <h2 className={styles.territorioHeading}>Entre o Alentejo e o Atlântico.</h2>
              <p className={styles.territorioParagraph}>
                A Rota Vicentina passa a minutos da casa. Zambujeira do Mar fica a dezoito
                quilómetros. O Alentejo profundo — com os seus montados, planícies e silêncio —
                está aqui mesmo à porta.
              </p>
              <p className={styles.territorioParagraph}>
                Monte da Estrada não é um ponto de chegada. É uma base de onde se parte — para a
                praia, para o trilho, para o mercado de São Teotónio, para o nada que de repente
                faz falta.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* O Que Fazer — activity cards */}
      <Section background="secondary" padding="large" animate>
        <Container>
          <ScrollReveal>
            <span className={styles.eyebrow}>O Que Fazer</span>
            <h2 className={styles.sectionTitle}>Aqui não há agenda. A não ser a sua.</h2>
          </ScrollReveal>
          <StaggerChildren speed="slow" className={styles.activitiesGrid}>
            {atividadesData.activities.map((activity, index) => {
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
                      <h3 className={styles.activityTitle}>{activity.title}</h3>
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

      {/* As Redondezas — distance-filtered attractions */}
      <Section padding="large" animate>
        <Container>
          <ScrollReveal>
            <span className={styles.eyebrow}>As Redondezas</span>
            <h2 className={styles.sectionTitle}>O que fica perto.</h2>
          </ScrollReveal>

          <ScrollReveal variant="fadeIn">
            <div className={styles.filterContainer}>
              <div className={styles.filterButtons}>
                {[
                  { key: 'all', label: `Tudo (${redondezasImages.attractions.length})` },
                  { key: 'closest', label: `0–10 km (${attractionsByProximity.closest.length})` },
                  { key: 'nearby', label: `11–20 km (${attractionsByProximity.nearby.length})` },
                  {
                    key: 'regional',
                    label: `21–35 km (${attractionsByProximity.regional.length})`,
                  },
                  { key: 'extended', label: `35+ km (${attractionsByProximity.extended.length})` },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    className={`${styles.filterButton} ${selectedFilter === key ? styles.active : ''}`}
                    onClick={() => setSelectedFilter(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

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

          {filteredAttractions.length === 0 && (
            <p className={styles.noResults}>Sem atrações nesta distância.</p>
          )}
        </Container>
      </Section>

      {/* Na Casa — property amenities */}
      <Section background="secondary" padding="large" animate>
        <Container>
          <ScrollReveal>
            <span className={styles.eyebrow}>Na Casa</span>
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

      {/* CTA */}
      <Section background="primary" padding="large" animate>
        <Container>
          <ScrollReveal variant="fadeIn">
            <div className={styles.cta}>
              <h2 className={styles.ctaTitle}>Pronto para vir?</h2>
              <p className={styles.ctaText}>
                Reserve a sua estadia e venha descobrir o Alentejo ao seu ritmo.
              </p>
              <a href="/quartos" className={styles.ctaButton}>
                Ver Quartos e Reservar
              </a>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </div>
  );
};

export default DescobrirPage;
