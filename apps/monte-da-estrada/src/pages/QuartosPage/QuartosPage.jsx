import React from 'react';
import { motion } from 'motion/react';
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
import { useLocale } from '@/contexts/LocaleContext';
import { getData } from '@/data/dataLoader';
import { quartosImages } from '@/data/quartosImages';
import styles from './QuartosPage.module.scss';

const quartosCopy = {
  pt: {
    heroEyebrow: 'Quartos',
    heroHeadline: 'Os Nossos Quartos',
    heroSubtitle: 'Conforto absoluto, configurável à sua medida.',
    roomsEyebrow: 'Quartos',
    roomsHeading: 'Oito quartos. Cada um, o seu.',
    bookingEyebrow: 'Reservas',
    bookingHeading: 'O seu quarto espera.',
    bookingIntro: 'Reserve agora e descubra onde vai acordar.',
    bookingButton: 'Reservar',
    roomTitle: 'Quarto Duplo / Twin',
    roomSubtitle: 'Conforto à sua medida, configurável como cama de casal ou twin.',
  },
  en: {
    heroEyebrow: 'Rooms',
    heroHeadline: 'Our Rooms',
    heroSubtitle: 'Absolute comfort, configurable to your needs.',
    roomsEyebrow: 'Rooms',
    roomsHeading: 'Eight rooms. Each one, its own.',
    bookingEyebrow: 'Reservations',
    bookingHeading: 'Your room awaits.',
    bookingIntro: 'Book now and discover where you\'ll wake up.',
    bookingButton: 'Book',
    roomTitle: 'Double / Twin Room',
    roomSubtitle: 'Comfort to your measure — configurable as a king double or twin.',
  },
};

/**
 * QuartosPage - Rooms page with three-section editorial layout
 * S1: Hero (55vh, editorial gradient)
 * S2: Room Cards (Cream, RoomCardGallery)
 * S3: Booking Section (Sand, HeyTravel placeholder)
 */
const QuartosPage = () => {
  const isMobile = useMobileQuery();
  const { locale } = useLocale();
  const copy = quartosCopy[locale] || quartosCopy.pt;
  const quartosData = getData('quartos', locale);
  const BOOKING_URL = locale === 'en'
    ? 'https://be.heytravel.net/da157c05-a630-43a2-a15b-732f96c563f2?occupation=%5B%7B%22room%22%3A1%2C%22adults%22%3A2%2C%22children%22%3A0%7D%5D&complex=1828&lang=en-GB'
    : 'https://be.heytravel.net/da157c05-a630-43a2-a15b-732f96c563f2?occupation=%5B%7B%22room%22%3A1%2C%22adults%22%3A2%2C%22children%22%3A0%7D%5D&complex=1828&lang=pt-PT';

  const rooms = [
    {
      roomId: 'quarto-duplo-twin',
      title: quartosData?.rooms?.[0]?.name || copy.roomTitle,
      subtitle: quartosData?.rooms?.[0]?.capacity || copy.roomSubtitle,
      image: quartosImages.quartoDuploTwin[1].src,
      imageAlt: quartosImages.quartoDuploTwin[1].alt,
      description: quartosData?.rooms?.[0]?.description || '',
      images: quartosImages.quartoDuploTwin,
    }
  ];

  const handleReserveClick = () => {
    const bookingSection = document.getElementById('reservas-inline');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={styles.quartosPage}>
      <SEO
        title={locale === 'en' ? 'Rooms' : 'Quartos'}
        description={locale === 'en'
          ? 'Monte da Estrada rooms: eight uniquely designed rooms blending Alentejo tradition with modern comfort. Each room opens to the landscape.'
          : 'Quartos do Monte da Estrada: oito quartos únicos que combinam a tradição alentejana com o conforto moderno. Cada quarto abre para a paisagem.'}
        locale={locale}
      />

      {/* ─────────────────────────────────────────── */}
      {/* S1 — Page Hero                             */}
      {/* ─────────────────────────────────────────── */}
      <PageHero
        imageSrc={quartosImages.hero.src}
        imageAlt={quartosImages.hero.alt}
        eyebrow={copy.heroEyebrow}
        headline={copy.heroHeadline}
        subtitle={copy.heroSubtitle}
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
            <SectionEyebrow label={copy.roomsEyebrow} />
            <h2 className={styles.sectionHeading}>
              {copy.roomsHeading}
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
            <SectionEyebrow label={copy.bookingEyebrow} />
            <h2 className={styles.sectionHeading}>
              {copy.bookingHeading}
            </h2>
            <p className={styles.bookingIntro}>
              {copy.bookingIntro}
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
                {copy.bookingButton}
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
