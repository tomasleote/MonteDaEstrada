import React from 'react';
import { motion } from 'motion/react';
import SEO from '@/components/SEO';
import {
  PageHero,
  RoomCardGallery,
  SectionEyebrow,
  variants,
  viewport,
} from '@touril-ecosystem/ui-components';
import { quartosImages } from '@/assets/images/quartos';
import { seoConfig } from '@/utils/seo-config';
import styles from './QuartosPage.module.scss';

/**
 * Room data for the RoomCardGallery component.
 * Each room maps real images from the quartos assets folder
 * to the expected data shape.
 */
const rooms = [
  {
    roomId: 'room-suite-deluxe',
    title: 'Suite Deluxe',
    subtitle: 'Vista panorâmica sobre o Alentejo',
    image: quartosImages.rooms[4].src,
    imageAlt: quartosImages.rooms[4].alt,
    description: `
      <p><strong>Luxo e natureza em perfeita harmonia.</strong></p>
      <p>A Suite Deluxe é o nosso espaço mais exclusivo, onde cada detalhe foi pensado para proporcionar uma experiência inesquecível. Terraço privado com vista 360° sobre a paisagem alentejana. Aqui, acordar é já estar de férias.</p>

      <h3>Espaço & Luz</h3>
      <ul>
        <li>Suite espaçosa (35 m²) com sala de estar integrada</li>
        <li>Terraço privado panorâmico com mobiliário premium</li>
        <li>Vista 360° sobre a paisagem alentejana</li>
        <li>Decoração de autor com peças de artesanato local</li>
      </ul>

      <h3>Conforto & Repouso</h3>
      <ul>
        <li>1 cama King Size (200cm x 200cm)</li>
        <li>Roupa de cama egípcia 100% algodão (400 fios)</li>
        <li>Casa de banho com banheira e chuveiro</li>
        <li>Amenities premium de casa de banho</li>
      </ul>

      <h3>Bem-estar</h3>
      <ul>
        <li>Ar condicionado e aquecimento central</li>
        <li>Acesso Wi-Fi gratuito de alta velocidade</li>
        <li>Minibar com seleção regional</li>
      </ul>

      <h3>Incluído na Estadia</h3>
      <ul>
        <li>Pequeno-almoço gourmet regional</li>
        <li>Acesso à piscina exterior e jardins</li>
        <li>Estacionamento privativo gratuito</li>
        <li>Late check-out mediante disponibilidade</li>
      </ul>
    `,
    images: [
      { src: quartosImages.rooms[4].src, alt: 'Suite Deluxe — Vista geral' },
      { src: quartosImages.rooms[9].src, alt: 'Suite Deluxe — Terraço privado' },
      { src: quartosImages.rooms[0].src, alt: 'Suite Deluxe — Detalhe interior' },
    ],
  },
  {
    roomId: 'room-comfort-alentejo',
    title: 'Quarto Comfort',
    subtitle: 'Terraço privativo com vista para o campo',
    image: quartosImages.rooms[1].src,
    imageAlt: quartosImages.rooms[1].alt,
    description: `
      <p><strong>Conforto com vistas amplas sobre o panorama do Alentejo.</strong></p>
      <p>A luz natural invade este quarto, onde a paisagem se transforma em arte. Terraço privativo e decoração com peças de artesanato local criam um espaço acolhedor e sereno. Perfeito para uma estadia revitalizante.</p>

      <h3>Espaço & Luz</h3>
      <ul>
        <li>Quarto espaçoso (28 m²) com grande janela</li>
        <li>Terraço privado com mobiliário exterior</li>
        <li>Vista sobre a paisagem alentejana</li>
        <li>Decoração com peças de artesanato local</li>
      </ul>

      <h3>Conforto & Repouso</h3>
      <ul>
        <li>1 cama King Size (180cm x 200cm) ou 2 camas Twin</li>
        <li>Roupa de cama 100% algodão</li>
        <li>Casa de banho com chuveiro</li>
        <li>Amenities de casa de banho</li>
      </ul>

      <h3>Bem-estar</h3>
      <ul>
        <li>Ar condicionado</li>
        <li>Acesso Wi-Fi gratuito</li>
        <li>Minibar</li>
      </ul>

      <h3>Incluído na Estadia</h3>
      <ul>
        <li>Pequeno-almoço regional</li>
        <li>Acesso à piscina exterior</li>
        <li>Estacionamento gratuito</li>
      </ul>
    `,
    images: [
      { src: quartosImages.rooms[1].src, alt: 'Quarto Comfort — Vista geral' },
      { src: quartosImages.rooms[3].src, alt: 'Quarto Comfort — Terraço' },
      { src: quartosImages.rooms[6].src, alt: 'Quarto Comfort — Interior' },
    ],
  },
];

/**
 * QuartosPage - Rooms page with three-section editorial layout
 * S1: Hero (55vh, editorial gradient)
 * S2: Room Cards (Cream, RoomCardGallery)
 * S3: Booking Section (Sand, HeyTravel placeholder)
 */
const QuartosPage = () => {
  const handleReserveClick = (roomId) => {
    // TODO: Connect to HeyTravel widget in S3 booking section
    window.open('https://www.booking.com', '_blank', 'noopener,noreferrer');
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
        subtitle="Cada quarto é único. A luz entra diferente em cada um."
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
              Seis quartos. Cada um, o seu.
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
      <section className={styles.bookingSection}>
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

          <motion.div
            className={styles.heyTravelPlaceholder}
            variants={variants.fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewport.default}
            transition={{ delay: 0.2 }}
          >
            <p>Widget HeyTravel será integrado aqui</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default QuartosPage;
