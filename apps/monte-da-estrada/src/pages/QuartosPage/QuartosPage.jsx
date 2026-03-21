import React from 'react';
import SEO from '@/components/SEO';
import {
  PageHero,
  RoomCardGallery,
  SectionEyebrow,
  InlineBookingWidget,
  variants,
  viewport,
} from '@touril-ecosystem/ui-components';
import useMobileQuery from '@/hooks/useMobileQuery';
import { quartosImages } from '@/data/quartosImages';
import { seoConfig } from '@/utils/seo-config';
import styles from './QuartosPage.module.scss';

/**
 * Room data for the RoomCardGallery component.
 * Each room maps real images from the quartos assets folder
 * to the expected data shape.
 */
const rooms = [
  {
    roomId: 'quarto-duplo-twin',
    title: 'Quarto Duplo / Twin',
    subtitle: 'Conforto à sua medida, configurável como cama de casal ou twin.',
    image: quartosImages.quartoDuploTwin[1].src,
    imageAlt: quartosImages.quartoDuploTwin[1].alt,
    description: `
      <p><strong>Luxo e natureza em perfeita harmonia.</strong></p>
      <p>Cada um dos nossos 8 quartos foi desenhado para maximizar o conforto, a luz e o silêncio. Disponíveis com configuração de cama de casal ou duas camas twin, adaptam-se perfeitamente à sua estadia.</p>

      <h3>Espaço & Luz</h3>
      <ul>
        <li>Configurável como cama de casal (King Size) ou Twin (duas camas)</li>
        <li>Terraço privado </li>
        <li>Vista sobre a paisagem alentejana</li>
      </ul>

      <h3>Conforto & Repouso</h3>
      <ul>
        <li>Casa de banho com chuveiro</li>
        <li>Amenities premium de casa de banho</li>
        <li>Acesso Wi-Fi gratuito de alta velocidade</li>
      </ul>

      <h3>Bem-estar & Comodidades</h3>
      <ul>
        <li>Ar condicionado e aquecimento</li>
        <li>Minibar com seleção regional</li>
      </ul>

      <h3>Incluído na Estadia</h3>
      <ul>
        <li>Pequeno-almoço regional</li>
        <li>Estacionamento privativo gratuito</li>
      </ul>
    `,
    images: quartosImages.quartoDuploTwin,
  }
];

/**
 * QuartosPage - Rooms page with three-section editorial layout
 * S1: Hero (55vh, editorial gradient)
 * S2: Room Cards (Cream, RoomCardGallery)
 * S3: Booking Section (Sand, HeyTravel placeholder)
 */
const QuartosPage = () => {
  const isMobile = useMobileQuery();
  const BOOKING_URL = 'https://be.heytravel.net/da157c05-a630-43a2-a15b-732f96c563f2?occupation=[{"room":1,"adults":2,"children":0}]&complex=1828&lang=pt-PT&';

  const handleReserveClick = () => {
    // Smooth scroll to the booking section at the bottom of the page
    const bookingSection = document.getElementById('reservas-inline');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={styles.quartosPage}>
      <SEO
        title={seoConfig.quartos.title}
        description={seoConfig.quartos.description}
        keywords={seoConfig.quartos.keywords}
        image={seoConfig.quartos.image}
      />

      {/* ─────────────────────────────────────────── */}
      {/* S1 — Page Hero                             */}
      {/* ─────────────────────────────────────────── */}
      <PageHero
        imageSrc={quartosImages.hero.src}
        imageAlt={quartosImages.hero.alt}
        eyebrow="Quartos"
        headline="Os Nossos Quartos"
        subtitle="Conforto absoluto, configurável à sua medida."
      />

      {/* ─────────────────────────────────────────── */}
      {/* S2 — Room Cards Section (Cream, 80px pad) */}
      {/* ─────────────────────────────────────────── */}
      <section className={styles.roomsSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.roomsHeader}
            variants={variants.fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport.default}
          >
            <SectionEyebrow label="Quartos" />
            <h2 className={styles.sectionHeading}>
              Oito quartos. Cada um, o seu.
            </h2>
          </motion.div>
        </div>

        <RoomCardGallery
          rooms={rooms}
          onReserveClick={handleReserveClick}
        />
      </section>

      {/* ─────────────────────────────────────────── */}
      {/* S3 — Booking Section (Sand, HeyTravel)    */}
      {/* ─────────────────────────────────────────── */}
      <section id="reservas-inline" className={styles.bookingSection}>
        <div className={styles.container}>
          <motion.div
            variants={variants.fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport.default}
          >
            <SectionEyebrow label="Reservas" />
            <h2 className={styles.sectionHeading}>
              O seu quarto espera.
            </h2>
            <p className={styles.bookingIntro}>
              Reserve agora e descubra onde vai acordar.
            </p>
          </motion.div>

          <div className={styles.inlineWidgetContainer}>
            {isMobile ? (
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.reserveButton}
              >
                Reservar
              </a>
            ) : (
              <InlineBookingWidget />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuartosPage;
