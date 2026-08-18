import React, { useState } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import useMobileQuery from '@/hooks/useMobileQuery';
import Lightbox from '@/components/Lightbox';
import {
  ImmersiveHero,
  EditorialSplitSection,
  SuiteAlentejanaSection,
  ActivityHighlights,
  SectionEyebrow,
  SuiteCarousel,
  BookingSection,
  CategoryNav,
  InlineBookingWidget,
} from '@touril-ecosystem/ui-components';
import homeDataPt from '@/data/pt/home.json';
import homeDataEn from '@/data/en/home.json';
import descobrirDataPt from '@/data/pt/descobrir.json';
import descobrirDataEn from '@/data/en/descobrir.json';
import { galeriaImages } from '@/data/galeriaImages';
import styles from './HomePage.module.scss';

const QUARTOS_PREVIEW_IMAGES = [
  {
    src: 'https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@aeb78c1/pl/quartos/quarto-2.webp',
    alt: 'Quarto do Monte do Papa Léguas',
  },
  {
    src: 'https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@aeb78c1/pl/quartos/estudio-2.webp',
    alt: 'Estúdio do Monte do Papa Léguas',
  },
];

// HeyTravel Direct Booking URL (mobile fallback — desktop uses InlineBookingWidget)
const BOOKING_URL = {
  pt: 'https://be.heytravel.net/da157c05-a630-43a2-a15b-732f96c563f2?occupation=%5B%7B%22room%22%3A1%2C%22adults%22%3A2%2C%22children%22%3A0%7D%5D&complex=1839&lang=pt-PT',
  en: 'https://be.heytravel.net/da157c05-a630-43a2-a15b-732f96c563f2?occupation=%5B%7B%22room%22%3A1%2C%22adults%22%3A2%2C%22children%22%3A0%7D%5D&complex=1839&lang=en-GB',
};

// PL's HeyTravel widget config (hotel id, colors, complex differ from MDE's defaults)
const PL_WIDGET_CONFIG = {
  hotel: '[{ "id": "da157c05-a630-43a2-a15b-732f96c563f2", "name": "Monte do Papa Léguas" }]',
  font: 'Roboto',
  colors: '{ "MainColor": "#3D2F12", "SecColor": "white", "ThirdColor": "#3D2F12" }',
  link: 'https://be.heytravel.net/',
  complexId: '1839',
  visualParams: '{ "holder": "", "hiddeEditReservation": "true", "allowChildren": "true" }',
};

// CategoryNav anchor items — must match the section ids below
const getNavItems = (locale) => {
  const labels = {
    pt: { casa: 'Casa', monte: 'O Monte', quartos: 'Quartos', experiencias: 'Experiências', galeria: 'Galeria', reservas: 'Reservas' },
    en: { casa: 'Home', monte: 'The Monte', quartos: 'Rooms', experiencias: 'Experiences', galeria: 'Gallery', reservas: 'Reservations' },
  };
  const l = labels[locale] || labels.pt;
  return [
    { id: 'casa', label: l.casa },
    { id: 'monte', label: l.monte },
    { id: 'quartos', label: l.quartos },
    { id: 'experiencias', label: l.experiencias },
    { id: 'galeria', label: l.galeria },
    { id: 'reservas', label: l.reservas },
  ];
};

const HomePage = () => {
  const { locale } = useLocale();
  const isMobile = useMobileQuery();
  const homeData = locale === 'en' ? homeDataEn : homeDataPt;
  const descobrirData = locale === 'en' ? descobrirDataEn : descobrirDataPt;

  const bookingUrl = BOOKING_URL[locale] || BOOKING_URL.pt;
  const reserveLabel = locale === 'en' ? 'Book now' : 'Reservar agora';

  const navItems = getNavItems(locale);

  const [lightbox, setLightbox] = useState({ open: false, images: [], index: 0 });
  const openLightbox = (images) => (index) => setLightbox({ open: true, images, index });

  const heroWidget = isMobile ? (
    <a
      href={bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.heroBookButton}
    >
      {reserveLabel}
    </a>
  ) : (
    <div className={styles.heroWidgetWrapper}>
      <InlineBookingWidget locale={locale} widgetConfig={PL_WIDGET_CONFIG} />
    </div>
  );

  return (
    <div className={styles.homePage}>

      {/* S1 — Immersive Hero */}
      <div id="casa">
        <ImmersiveHero
          imageSrc={homeData.hero.image}
          imageAlt={homeData.hero.alt}
          headline={homeData.hero.headline}
          subtitle={homeData.hero.subheadline}
          scrollLabel={homeData.hero.ctaLabel}
        >
          {heroWidget}
        </ImmersiveHero>
      </div>

      {/* Sticky section navigation */}
      <CategoryNav items={navItems} scrollThreshold={100} headerHeight={88} />

      {/* S2 — Welcome Split Section */}
      <div id="monte">
        <EditorialSplitSection
          eyebrow={homeData.welcome.eyebrow}
          heading={homeData.welcome.headline}
          body={homeData.welcome.body}
          imageSrc={homeData.welcome.image}
          imageAlt={homeData.welcome.imageAlt}
          imagePosition="right"
        />
      </div>

      {/* S3 — Spaces / Quartos Preview */}
      <div id="quartos">
        <SuiteAlentejanaSection
          heading={homeData.spaces.headline}
          tagline={homeData.spaces.eyebrow}
          description={[homeData.spaces.body]}
          carouselImages={QUARTOS_PREVIEW_IMAGES}
          onImageClick={openLightbox(QUARTOS_PREVIEW_IMAGES)}
          ctaLabel={homeData.spaces.ctaLabel}
          ctaHref={homeData.spaces.ctaHref}
          amenities={{ atmospheric: [], premium: [] }}
        />
      </div>

      {/* S4 — Activity Highlights */}
      <div id="experiencias">
        <ActivityHighlights
          eyebrow={homeData.activities.eyebrow}
          heading={homeData.activities.headline}
          items={descobrirData.experiences.slice(0, 3)}
          ctaLabel={homeData.activities.ctaLabel}
          ctaHref={homeData.activities.ctaHref}
          background="offwhite"
        />
      </div>

      {/* S5 — Gallery Slideshow */}
      <section id="galeria" className={styles.gallerySection}>
        <div className={styles.galleryHeader}>
          <SectionEyebrow label={homeData.gallery.eyebrow} align="center" />
          <h2 className={styles.galleryHeading}>{homeData.gallery.headline}</h2>
        </div>
        <SuiteCarousel
          images={galeriaImages}
          onImageClick={openLightbox(galeriaImages)}
          className={styles.gallerySlideshow}
        />
        <div className={styles.galleryCtaContainer}>
          <a href={homeData.gallery.ctaHref} className={styles.galleryCta}>
            {homeData.gallery.ctaLabel}
            <span className={styles.arrow}> →</span>
          </a>
        </div>
      </section>

      {/* S6 — Booking Section — button only: the hero already owns the widget */}
      <div id="reservas" className={styles.reservasSection}>
        <BookingSection
          eyebrow={homeData.booking.eyebrow}
          heading={homeData.booking.headline}
          description={homeData.booking.body}
          bookingUrl={bookingUrl}
          buttonOnly
          locale={locale}
        />
      </div>

      <Lightbox
        images={lightbox.images}
        initialIndex={lightbox.index}
        isOpen={lightbox.open}
        onClose={() => setLightbox((s) => ({ ...s, open: false }))}
      />

    </div>
  );
};

export default HomePage;
