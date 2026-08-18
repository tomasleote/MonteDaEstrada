import React from 'react';
import {
  PageHero,
  CategoryNav,
  RoomCardGallery,
  BookingSection,
} from '@touril-ecosystem/ui-components';
import { useLocale } from '@/contexts/LocaleContext';
import useMobileQuery from '@/hooks/useMobileQuery';
import ptData from '@/data/pt/quartos.json';
import enData from '@/data/en/quartos.json';
import styles from './QuartosPage.module.scss';

const BOOKING_SECTION_ID = 'reservas';

// CategoryNav anchor items — must match the section ids below
const getNavItems = (locale) => {
  const labels = {
    pt: { alojamento: 'Alojamento', reservas: 'Reservas' },
    en: { alojamento: 'Accommodation', reservas: 'Reservations' },
  };
  const l = labels[locale] || labels.pt;
  return [
    { id: 'alojamento', label: l.alojamento },
    { id: BOOKING_SECTION_ID, label: l.reservas },
  ];
};

const BOOKING_URL = {
  pt: 'https://be.heytravel.net/da157c05-a630-43a2-a15b-732f96c563f2?occupation=%5B%7B%22room%22%3A1%2C%22adults%22%3A2%2C%22children%22%3A0%7D%5D&complex=1839&lang=pt-PT',
  en: 'https://be.heytravel.net/da157c05-a630-43a2-a15b-732f96c563f2?occupation=%5B%7B%22room%22%3A1%2C%22adults%22%3A2%2C%22children%22%3A0%7D%5D&complex=1839&lang=en-GB',
};

// PL's HeyTravel widget config (hotel id, colours and complex differ from MDE's defaults)
const PL_WIDGET_CONFIG = {
  hotel: '[{ "id": "da157c05-a630-43a2-a15b-732f96c563f2", "name": "Monte do Papa Léguas" }]',
  font: 'Roboto',
  colors: '{ "MainColor": "#3D2F12", "SecColor": "white", "ThirdColor": "#3D2F12" }',
  link: 'https://be.heytravel.net/',
  complexId: '1839',
  visualParams: '{ "holder": "", "hiddeEditReservation": "true", "allowChildren": "true" }',
};

const buildDescription = ({ description, amenities }) =>
  [
    ...description.map((paragraph) => `<p>${paragraph}</p>`),
    `<ul>${[...amenities.atmospheric, ...amenities.premium]
      .map((amenity) => `<li>${amenity}</li>`)
      .join('')}</ul>`,
  ].join('');

const buildRoom = (roomId, entry, imagePosition) => ({
  roomId,
  title: entry.heading,
  subtitle: entry.tagline,
  image: entry.images[0],
  imageAlt: entry.imageAlts[0],
  description: buildDescription(entry),
  images: entry.images.map((src, index) => ({ src, alt: entry.imageAlts[index] || '' })),
  imagePosition,
  variant: 'light',
});

const QuartosPage = () => {
  const { locale } = useLocale();
  const isMobile = useMobileQuery();
  const data = locale === 'en' ? enData : ptData;
  const bookingUrl = BOOKING_URL[locale] || BOOKING_URL.pt;

  const navItems = getNavItems(locale);

  const rooms = [
    buildRoom('quartos', data.quartos, 'left'),
    buildRoom('estudios', data.estudios, 'right'),
  ];

  const scrollToBooking = () => {
    document
      .getElementById(BOOKING_SECTION_ID)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={styles.quartosPage}>
      <div id="quartos-hero">
        <PageHero
          imageSrc={data.hero.image}
          imageAlt={data.hero.imageAlt}
          eyebrow={data.hero.eyebrow}
          headline={data.hero.title}
          subtitle={data.hero.subtitle}
        />
      </div>

      <CategoryNav items={navItems} targetId="quartos-hero" headerHeight={88} />

      <div id="alojamento">
        <h2 className={styles.srOnly}>{locale === 'en' ? 'Accommodation' : 'Alojamento'}</h2>
        <RoomCardGallery rooms={rooms} onReserveClick={scrollToBooking} locale={locale} />
      </div>

      <div id={BOOKING_SECTION_ID} className={styles.reservasSection}>
        <BookingSection
          eyebrow={data.booking.eyebrow}
          heading={data.booking.headline}
          description={data.booking.body}
          bookingUrl={bookingUrl}
          widgetConfig={PL_WIDGET_CONFIG}
          locale={locale}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};

export default QuartosPage;
