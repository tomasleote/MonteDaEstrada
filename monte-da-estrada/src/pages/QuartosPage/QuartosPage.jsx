import React from 'react';
import SEO from '@/components/SEO';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Grid from '@/components/Grid';
import Card from '@/components/Card';
import Button from '@/components/Button';
import ContactForm from '@/components/ContactForm';
import styles from './QuartosPage.module.scss';
import quartosData from '@/data/quartos.json';
import { seoConfig } from '@/utils/seo-config';

const QuartosPage = () => {
  return (
    <div className={styles.quartosPage}>
      <SEO
        title={seoConfig.quartos.title}
        description={seoConfig.quartos.description}
        keywords={seoConfig.quartos.keywords}
        image={seoConfig.quartos.image}
      />
      {/* Page Header */}
      <Section background="light" padding="large">
        <Container>
          <div className={styles.header}>
            <h1 className={styles.pageTitle}>{quartosData.title}</h1>
            <p className={styles.pageDescription}>{quartosData.description}</p>
          </div>
        </Container>
      </Section>

      {/* Rooms Section */}
      <Section padding="large">
        <Container>
          <div className={styles.roomsSection}>
            {quartosData.rooms.map((room, index) => (
              <div key={index} className={styles.roomCard}>
                <div className={styles.roomInfo}>
                  <h2 className={styles.roomName}>{room.name}</h2>
                  <p className={styles.roomCapacity}>
                    <strong>Capacidade:</strong> {room.capacity}
                  </p>
                  <h3 className={styles.featuresTitle}>Características:</h3>
                  <ul className={styles.featuresList}>
                    {room.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.roomImagePlaceholder}>
                  <p>📷 Imagem: {room.name}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Facilities Section */}
      <Section background="secondary" padding="large">
        <Container>
          <h2 className={styles.sectionTitle}>Instalações e Comodidades</h2>
          <Grid columns={3} gap="medium">
            {quartosData.facilities.map((facility, index) => (
              <Card key={index} className={styles.facilityCard}>
                <p className={styles.facilityText}>{facility}</p>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Pricing Section */}
      <Section padding="large">
        <Container>
          <div className={styles.pricingSection}>
            <h2 className={styles.sectionTitle}>{quartosData.pricing.title}</h2>
            <p className={styles.pricingDescription}>{quartosData.pricing.description}</p>

            <Grid columns={3} gap="large" className={styles.seasonsGrid}>
              {quartosData.pricing.seasons.map((season, index) => (
                <Card key={index} className={styles.seasonCard}>
                  <h3 className={styles.seasonName}>{season.name}</h3>
                  <p className={styles.seasonPeriod}>{season.period}</p>
                  <p className={styles.seasonNote}>{season.note}</p>
                </Card>
              ))}
            </Grid>

            <div className={styles.policies}>
              <h3 className={styles.policiesTitle}>Políticas de Reserva</h3>
              <ul className={styles.policiesList}>
                {quartosData.pricing.policies.map((policy, index) => (
                  <li key={index}>{policy}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section background="light" padding="large">
        <Container>
          <div className={styles.contactSection}>
            <h2 className={styles.sectionTitle}>Faça a Sua Reserva</h2>
            <p className={styles.contactText}>
              Preencha o formulário abaixo ou entre em contacto connosco por telefone ou email
              para fazer a sua reserva ou esclarecer qualquer dúvida.
            </p>

            <div className={styles.contactGrid}>
              <div className={styles.contactInfo}>
                <h3>Contactos</h3>
                <p className={styles.contactItem}>
                  <strong>Telefone:</strong><br />
                  283 647 535<br />
                  960 254 072
                </p>
                <p className={styles.contactItem}>
                  <strong>Email:</strong><br />
                  montedaestradazambujeiradomar@gmail.com
                </p>
                <p className={styles.contactItem}>
                  <strong>Horário de Atendimento:</strong><br />
                  Todos os dias: 9:00 - 20:00
                </p>
              </div>

              <div className={styles.formWrapper}>
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="primary" padding="medium">
        <Container>
          <div className={styles.cta}>
            <h2 className={styles.ctaTitle}>Explore o Monte da Estrada</h2>
            <div className={styles.ctaButtons}>
              <Button variant="secondary" href="/galeria">
                Ver Galeria
              </Button>
              <Button variant="outline" href="/atividades">
                Atividades
              </Button>
              <Button variant="outline" href="/redondezas">
                A Região
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default QuartosPage;
