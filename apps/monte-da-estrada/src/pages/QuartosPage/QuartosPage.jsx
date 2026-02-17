import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SEO from '@/components/SEO';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Grid from '@/components/Grid';
import Card from '@/components/Card';
import Button from '@/components/Button';
import ContactForm from '@/components/ContactForm';
import ResponsiveImage from '@/components/ResponsiveImage';
import styles from './QuartosPage.module.scss';
import quartosDataOriginal from '@/data/quartos.json';
import { quartosImages } from '@/assets/images/quartos';
import { seoConfig } from '@/utils/seo-config';
import useEditableContent from '@/hooks/useEditableContent';

const QuartosPage = () => {
  const quartosData = useEditableContent('quartos', quartosDataOriginal);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Reason: Group room images by category for better organization
  const suiteRooms = quartosImages.rooms.filter(room => room.category === 'suite');
  const deluxeRooms = quartosImages.rooms.filter(room => room.category === 'deluxe');
  const standardRooms = quartosImages.rooms.filter(room => room.category === 'standard');

  /**
   * Opens the room detail modal
   * @param {Object} room - The room data object
   * @param {Object} roomImage - The room image object
   */
  const handleRoomClick = (room, roomImage) => {
    setSelectedRoom({ ...room, image: roomImage });
  };

  /**
   * Closes the room detail modal
   */
  const closeModal = () => {
    setSelectedRoom(null);
  };

  /**
   * Handles keyboard navigation for closing modal
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  // Reason: Prevent body scroll when modal is open for better UX
  useEffect(() => {
    if (selectedRoom) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedRoom]);

  return (
    <div className={styles.quartosPage}>
      <SEO
        title={seoConfig.quartos.title}
        description={seoConfig.quartos.description}
        keywords={seoConfig.quartos.keywords}
        image={seoConfig.quartos.image}
      />

      {/* Hero Section with Real Image */}
      <div
        className={styles.hero}
        style={{ backgroundImage: `url(${quartosImages.hero.src})` }}
      >
        <div className={styles.heroOverlay}>
          <Container>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>{quartosData.title}</h1>
              <p className={styles.heroDescription}>{quartosData.description}</p>
            </div>
          </Container>
        </div>
      </div>

      {/* Rooms Gallery Section */}
      <Section padding="large">
        <Container>
          <h2 className={styles.sectionTitle}>Explore os Nossos Quartos</h2>

          {/* Suite Rooms */}
          {suiteRooms.length > 0 && (
            <div className={styles.categorySection}>
              <h3 className={styles.categoryTitle}>Suites Premium</h3>
              <div className={styles.roomsGrid}>
                {suiteRooms.map((roomImage, index) => {
                  // Reason: Match room images with room data from JSON
                  const roomData = quartosData.rooms[index % quartosData.rooms.length];
                  return (
                    <div
                      key={`suite-${index}`}
                      className={styles.roomCard}
                      onClick={() => handleRoomClick(roomData, roomImage)}
                      role="button"
                      tabIndex={0}
                      onKeyPress={(e) => e.key === 'Enter' && handleRoomClick(roomData, roomImage)}
                    >
                      <div className={styles.roomImageWrapper}>
                        <ResponsiveImage
                          src={roomImage.src}
                          alt={roomImage.alt}
                          aspectRatio="4/3"
                          objectFit="cover"
                          className={styles.roomImage}
                        />
                        <div className={styles.roomOverlay}>
                          <span className={styles.viewDetails}>Ver Detalhes</span>
                        </div>
                      </div>
                      <div className={styles.roomCardContent}>
                        <h4 className={styles.roomCardTitle}>{roomData.name}</h4>
                        <p className={styles.roomCardCapacity}>{roomData.capacity}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Deluxe Rooms */}
          {deluxeRooms.length > 0 && (
            <div className={styles.categorySection}>
              <h3 className={styles.categoryTitle}>Quartos Deluxe</h3>
              <div className={styles.roomsGrid}>
                {deluxeRooms.map((roomImage, index) => {
                  const roomData = quartosData.rooms[index % quartosData.rooms.length];
                  return (
                    <div
                      key={`deluxe-${index}`}
                      className={styles.roomCard}
                      onClick={() => handleRoomClick(roomData, roomImage)}
                      role="button"
                      tabIndex={0}
                      onKeyPress={(e) => e.key === 'Enter' && handleRoomClick(roomData, roomImage)}
                    >
                      <div className={styles.roomImageWrapper}>
                        <ResponsiveImage
                          src={roomImage.src}
                          alt={roomImage.alt}
                          aspectRatio="4/3"
                          objectFit="cover"
                          className={styles.roomImage}
                        />
                        <div className={styles.roomOverlay}>
                          <span className={styles.viewDetails}>Ver Detalhes</span>
                        </div>
                      </div>
                      <div className={styles.roomCardContent}>
                        <h4 className={styles.roomCardTitle}>{roomData.name}</h4>
                        <p className={styles.roomCardCapacity}>{roomData.capacity}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Standard Rooms */}
          {standardRooms.length > 0 && (
            <div className={styles.categorySection}>
              <h3 className={styles.categoryTitle}>Quartos Standard</h3>
              <div className={styles.roomsGrid}>
                {standardRooms.map((roomImage, index) => {
                  const roomData = quartosData.rooms[index % quartosData.rooms.length];
                  return (
                    <div
                      key={`standard-${index}`}
                      className={styles.roomCard}
                      onClick={() => handleRoomClick(roomData, roomImage)}
                      role="button"
                      tabIndex={0}
                      onKeyPress={(e) => e.key === 'Enter' && handleRoomClick(roomData, roomImage)}
                    >
                      <div className={styles.roomImageWrapper}>
                        <ResponsiveImage
                          src={roomImage.src}
                          alt={roomImage.alt}
                          aspectRatio="4/3"
                          objectFit="cover"
                          className={styles.roomImage}
                        />
                        <div className={styles.roomOverlay}>
                          <span className={styles.viewDetails}>Ver Detalhes</span>
                        </div>
                      </div>
                      <div className={styles.roomCardContent}>
                        <h4 className={styles.roomCardTitle}>{roomData.name}</h4>
                        <p className={styles.roomCardCapacity}>{roomData.capacity}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </Container>
      </Section>

      {/* Common Areas Section */}
      <Section background="secondary" padding="large">
        <Container>
          <h2 className={styles.sectionTitle}>Áreas Comuns</h2>
          <div className={styles.commonAreasGrid}>
            {quartosImages.commonAreas.map((area, index) => (
              <div key={`area-${index}`} className={styles.commonAreaCard}>
                <ResponsiveImage
                  src={area.src}
                  alt={area.alt}
                  aspectRatio="16/9"
                  objectFit="cover"
                  className={styles.commonAreaImage}
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Facilities Section */}
      <Section background="light" padding="large">
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

      {/* Room Detail Modal */}
      {selectedRoom && (
        <div
          className={styles.modal}
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
            role="document"
          >
            <button
              className={styles.modalClose}
              onClick={closeModal}
              aria-label="Fechar modal"
            >
              ×
            </button>

            <div className={styles.modalImage}>
              <ResponsiveImage
                src={selectedRoom.image.src}
                alt={selectedRoom.image.alt}
                aspectRatio="16/9"
                objectFit="cover"
                lazy={false}
              />
            </div>

            <div className={styles.modalBody}>
              <h2 id="modal-title" className={styles.modalTitle}>{selectedRoom.name}</h2>
              <p className={styles.modalCapacity}>
                <strong>Capacidade:</strong> {selectedRoom.capacity}
              </p>

              <h3 className={styles.modalFeaturesTitle}>Características:</h3>
              <ul className={styles.modalFeaturesList}>
                {selectedRoom.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>

              <div className={styles.modalActions}>
                <Button variant="primary" href="#contact">
                  Reservar Agora
                </Button>
                <Button variant="outline" onClick={closeModal}>
                  Fechar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuartosPage;
