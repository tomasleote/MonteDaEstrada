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
import styles from './ContactoPage.module.scss';
import localizacaoData from '@/data/localizacao.json';

const ContactoPage = () => {
  return (
    <div className={styles.contactoPage}>
      <SEO
        title="Contacto"
        description="Entre em contacto com o Monte da Estrada. Reservas, perguntas ou simplesmente olá — estamos aqui. Veja também como chegar de Lisboa, Porto ou Faro."
        keywords="contacto, reservas, como chegar, monte da estrada, alentejo, zambujeira do mar, localização"
        image="/images/hero-localizacao.jpg"
      />

      {/* Hero */}
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
                Contacto
              </AnimatedText>
              <ScrollReveal variant="fadeUpSubtle" delay={0.2}>
                <p className={styles.heroDescription}>
                  Reservas, perguntas ou simplesmente olá.
                </p>
              </ScrollReveal>
            </div>
          </Container>
        </div>
      </div>

      {/* Contact — form + direct contact */}
      <Section padding="large" animate>
        <Container>
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <ScrollReveal>
                <span className={styles.eyebrow}>Fale Connosco</span>
                <h2 className={styles.sectionTitle}>Entre em contacto.</h2>
                <p className={styles.contactIntro}>
                  Respondemos a todas as mensagens em menos de 24 horas. Para reservas urgentes,
                  preferimos o telefone ou WhatsApp.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <ul className={styles.contactDetails}>
                  <li className={styles.contactItem}>
                    <span className={styles.contactLabel}>Telefone / WhatsApp</span>
                    <a
                      href={`tel:${localizacaoData.address.phone || '+351960254072'}`}
                      className={styles.contactValue}
                    >
                      {localizacaoData.address.phone || '+351 960 254 072'}
                    </a>
                  </li>
                  <li className={styles.contactItem}>
                    <span className={styles.contactLabel}>Email</span>
                    <a
                      href="mailto:montedaestradazambujeiradomar@gmail.com"
                      className={styles.contactValue}
                    >
                      montedaestradazambujeiradomar@gmail.com
                    </a>
                  </li>
                  <li className={styles.contactItem}>
                    <span className={styles.contactLabel}>Morada</span>
                    <address className={styles.contactAddress}>
                      {localizacaoData.address.name}<br />
                      {localizacaoData.address.street}<br />
                      {localizacaoData.address.postalCode} {localizacaoData.address.city}<br />
                      {localizacaoData.address.region}, {localizacaoData.address.country}
                    </address>
                  </li>
                  <li className={styles.contactItem}>
                    <span className={styles.contactLabel}>Check-in / Check-out</span>
                    <span className={styles.contactValue}>15h00 / 12h00</span>
                  </li>
                </ul>
              </ScrollReveal>
            </div>

            <div className={styles.contactFormWrapper}>
              <ScrollReveal delay={0.15}>
                <ContactForm />
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Map */}
      <Section background="secondary" padding="large" animate>
        <Container>
          <ScrollReveal>
            <span className={styles.eyebrow}>Como Chegar</span>
            <h2 className={styles.sectionTitle}>Encontre-nos.</h2>
          </ScrollReveal>
          <ScrollReveal variant="fadeIn">
            <div className={styles.mapWrapper}>
              <Map
                latitude={localizacaoData.address.coordinates.latitude}
                longitude={localizacaoData.address.coordinates.longitude}
                title={`Mapa — ${localizacaoData.address.street}, ${localizacaoData.address.city}`}
                height="480px"
              />
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Directions from major cities */}
      <Section padding="large" animate>
        <Container>
          <ScrollReveal>
            <h2 className={styles.sectionTitle}>{localizacaoData.directions.title}</h2>
          </ScrollReveal>
          <StaggerChildren speed="slow">
            <Grid columns={3} gap="large">
              {[
                localizacaoData.directions.fromLisbon,
                localizacaoData.directions.fromFaro,
                localizacaoData.directions.fromPorto,
              ].map((direction, index) => (
                <StaggerChildren.Item key={index}>
                  <Card className={styles.directionCard}>
                    <h3 className={styles.directionTitle}>{direction.title}</h3>
                    <p className={styles.directionMeta}>
                      <strong>Distância:</strong> {direction.distance}
                      <br />
                      <strong>Tempo:</strong> {direction.duration}
                    </p>
                    <ol className={styles.routeList}>
                      {direction.route.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </Card>
                </StaggerChildren.Item>
              ))}
            </Grid>
          </StaggerChildren>
        </Container>
      </Section>

      {/* Public Transport + Distances */}
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

      {/* Distances grid */}
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
    </div>
  );
};

export default ContactoPage;
