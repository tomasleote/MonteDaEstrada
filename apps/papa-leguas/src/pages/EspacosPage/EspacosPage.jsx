import React from 'react';
import {
  PageHero,
  SuiteAlentejanaSection,
  BookingSection,
} from '@touril-ecosystem/ui-components';
import { useLocale } from '@/contexts/LocaleContext';
import ptData from '@/data/pt/espacos.json';
import enData from '@/data/en/espacos.json';
import styles from './EspacosPage.module.scss';

const EspacosPage = () => {
  const { locale } = useLocale();
  const data = locale === 'en' ? enData : ptData;

  return (
    <div className={styles.espacosPage}>
      <PageHero
        imageSrc={data.hero.image}
        imageAlt={data.hero.imageAlt}
        eyebrow={data.hero.eyebrow}
        headline={data.hero.title}
        subtitle={data.hero.subtitle}
      />

      <SuiteAlentejanaSection
        heading={data.quartos.heading}
        tagline={data.quartos.tagline}
        description={data.quartos.description}
        carouselImages={data.quartos.images}
        amenities={data.quartos.amenities}
        ctaLabel={data.quartos.cta.label}
        ctaHref={data.quartos.cta.href}
      />

      <SuiteAlentejanaSection
        heading={data.estudios.heading}
        tagline={data.estudios.tagline}
        description={data.estudios.description}
        carouselImages={data.estudios.images}
        amenities={data.estudios.amenities}
        ctaLabel={data.estudios.cta.label}
        ctaHref={data.estudios.cta.href}
      />

      <BookingSection
        eyebrow="Reservas"
        heading="Reserve a Sua Estadia"
        description="Escolha o seu espaço preferido e garanta a melhor experiência no Alentejo."
        bookingUrl="HEYTRAVEL_PL_BOOKING_URL_PLACEHOLDER"
      />
    </div>
  );
};

export default EspacosPage;
