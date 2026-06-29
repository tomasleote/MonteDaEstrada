import React from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import {
  ImmersiveHero,
  EditorialSplitSection,
  SuiteAlentejanaSection,
  ActivityHighlights,
  GalleryPreview,
  BookingSection,
} from '@touril-ecosystem/ui-components';
import homeDataPt from '@/data/pt/home.json';
import homeDataEn from '@/data/en/home.json';
import descobrirDataPt from '@/data/pt/descobrir.json';
import descobrirDataEn from '@/data/en/descobrir.json';
import { homeImages } from '@/data/homeImages';
import { quartoImages } from '@/data/quartoImages';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const { locale } = useLocale();
  const homeData = locale === 'en' ? homeDataEn : homeDataPt;
  const descobrirData = locale === 'en' ? descobrirDataEn : descobrirDataPt;

  return (
    <div className={styles.homePage}>

      {/* S1 — Immersive Hero */}
      <ImmersiveHero
        imageSrc={homeData.hero.image}
        imageAlt={homeData.hero.alt}
        headline={homeData.hero.headline}
        subtitle={homeData.hero.subheadline}
        scrollLabel={homeData.hero.ctaLabel}
      />

      {/* S2 — Welcome Split Section */}
      <EditorialSplitSection
        eyebrow={homeData.welcome.eyebrow}
        heading={homeData.welcome.headline}
        body={homeData.welcome.body}
        imageSrc={homeData.welcome.image}
        imageAlt={homeData.welcome.imageAlt}
        imagePosition="right"
      />

      {/* S3 — Spaces / Quartos Preview */}
      <SuiteAlentejanaSection
        heading={homeData.spaces.headline}
        tagline={homeData.spaces.eyebrow}
        description={[homeData.spaces.body]}
        carouselImages={quartoImages.slice(0, 3)}
        ctaLabel={homeData.spaces.ctaLabel}
        ctaHref={homeData.spaces.ctaHref}
        amenities={{ atmospheric: [], premium: [] }}
      />

      {/* S4 — Activity Highlights */}
      <ActivityHighlights
        eyebrow={homeData.activities.eyebrow}
        heading={homeData.activities.headline}
        items={descobrirData.activities.slice(0, 3)}
        background="offwhite"
      />

      {/* S5 — Gallery Preview */}
      <GalleryPreview
        eyebrow={homeData.gallery.eyebrow}
        images={homeImages.slice(0, 6)}
        ctaLabel={homeData.gallery.ctaLabel}
        ctaHref={homeData.gallery.ctaHref}
      />

      {/* S6 — Booking Section */}
      <div className={styles.reservasSection}>
        <BookingSection
          eyebrow={homeData.booking.eyebrow}
          heading={homeData.booking.headline}
          description={homeData.booking.body}
          locale={locale}
        />
      </div>

    </div>
  );
};

export default HomePage;
