import React from 'react';
import SEO from '@/components/SEO';
import {
  ImmersiveHero,
  EditorialAnchor,
  EditorialSplitSection,
  FullBleedImage,
  AmenityStrip,
  SuiteAlentejanaSection,
  ActivityHighlights,
  BookingSection,
  CategoryNav,
} from '@touril-ecosystem/ui-components';
import useMobileQuery from '@/hooks/useMobileQuery';
import { useLocale } from '@/contexts/LocaleContext';
import { getData } from '@/data/dataLoader';
import { homeImages } from '@/data/homeImages';
import { quartosImages } from '@/data/quartosImages';
import styles from './HomePage.module.scss';

// ──────────────────────────────────────────────
// CategoryNav anchor items — 5 main sections
// ──────────────────────────────────────────────

const getNavItems = (locale) => {
  const labels = {
    pt: { casa: 'Casa', quartos: 'Quartos', territorio: 'Território', experiencias: 'Experiências', reservas: 'Reservas' },
    en: { casa: 'Home', quartos: 'Rooms', territorio: 'Territory', experiencias: 'Experiences', reservas: 'Reservations' },
  };
  const l = labels[locale] || labels.pt;
  return [
    { id: 'casa', label: l.casa },
    { id: 'quartos', label: l.quartos },
    { id: 'territorio', label: l.territorio },
    { id: 'experiencias', label: l.experiencias },
    { id: 'reservas', label: l.reservas },
  ];
};

// ──────────────────────────────────────────────
// Suite Alentejana carousel images
// ──────────────────────────────────────────────

const suiteCarouselImages = [
  {
    src: quartosImages.quartoDuploTwin[1].src,
    alt: 'Suite Alentejana com luz matinal e vista panorâmica',
  }
];

const s3CarouselImages = [
  homeImages.gallery[0],
  homeImages.sala5,
  homeImages.pormenor2,
  homeImages.recepcao2
];

// ──────────────────────────────────────────────
// Static structured data (not locale-specific)
// ──────────────────────────────────────────────

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  "name": "Monte da Estrada",
  "url": "https://montedaestrada.com",
  "telephone": "+351960254072",
  "email": "geral@montedaestrada.com",
  "image": "https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@15d5b6f/mde/home/home-property-view-05.webp",
  "description": "A sua casa no Litoral Alentejano.",
  "priceRange": "$$",
  "checkinTime": "15:00",
  "checkoutTime": "12:00",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Malhadil",
    "postalCode": "7630-611",
    "addressLocality": "Zambujeira do Mar",
    "addressRegion": "Alentejo",
    "addressCountry": "PT"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 37.5884155,
    "longitude": -8.7782957
  },
  "containsPlace": Array.from({ length: 8 }, (_, i) => ({
    "@type": "HotelRoom",
    "name": `Quarto Duplo / Twin ${i + 1}`,
    "image": `https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@15d5b6f/mde/quartos/quarto-${(i % 4) + 1}.webp`
  }))
};

// ──────────────────────────────────────────────
// Locale-specific copy
// ──────────────────────────────────────────────

const homeCopy = {
  pt: {
    heroScrollLabel: 'Descobrir',
    anchorTagline: 'Oito quartos, uma casa, um monte.',
    anchorBody: 'A 5 quilómetros do mar, dentro da Costa Vicentina.',
    anchorCtaLabel: 'Sobre a casa',
    casaEyebrow: 'A Casa',
    casaHeading: 'Arquitectura de monte, revisitada.',
    casaBody: [
      'A casa existia antes de ser hotel. Os muros de cal e o pavimento antigo mantêm-se — não por falta de alternativa, mas por escolha.',
      'Não tentamos impressionar. Tentamos que fique.',
    ],
    casaCtaLabel: 'Conhecer a casa',
    territorioEyebrow: 'O Território',
    territorioHeading: 'Entre o Alentejo e o Atlântico.',
    territorioBody: [
      'O Trilho dos Pescadores passa a minutos — 110 km de costa selvagem. Zambujeira do Mar fica a 8 quilómetros. O Litoral Alentejano está à porta.',
      'Isto não é isolamento. É uma posição.',
    ],
    territorioImageAlt: 'Vista panorâmica da paisagem alentejana',
    territorioCtaLabel: 'Explorar as redondezas',
    experienciasEyebrow: 'Experiências',
    experienciasHeading: 'Aqui não há agenda. A não ser a sua.',
    experienciasCtaLabel: 'Ver todas as experiências',
    bookingEyebrow: 'Reservas',
    bookingHeading: 'Marque a sua estadia.',
    bookingDescription: 'Seis quartos. Reserve diretamente para o melhor tarifário.',
  },
  en: {
    heroScrollLabel: 'Discover',
    anchorTagline: 'Eight rooms, one house, one monte.',
    anchorBody: '5 kilometres from the sea, inside the Costa Vicentina.',
    anchorCtaLabel: 'About the house',
    casaEyebrow: 'The House',
    casaHeading: 'Monte architecture, revisited.',
    casaBody: [
      'The house existed before it was a hotel. The whitewashed walls and original floors remain — not for lack of alternatives, but by choice.',
      'We don\'t try to impress. We try to make you stay.',
    ],
    casaCtaLabel: 'Know the house',
    territorioEyebrow: 'The Territory',
    territorioHeading: 'Between Alentejo and the Atlantic.',
    territorioBody: [
      'The Fishermen\'s Trail is minutes away — 110 km of wild coast. Zambujeira do Mar is 8 kilometres. The Alentejo coastline is at the door.',
      'This is not isolation. It is a position.',
    ],
    territorioImageAlt: 'Panoramic view of the Alentejo landscape',
    territorioCtaLabel: 'Explore the surroundings',
    experienciasEyebrow: 'Experiences',
    experienciasHeading: 'There is no agenda here. Unless you bring one.',
    experienciasCtaLabel: 'See all experiences',
    bookingEyebrow: 'Reservations',
    bookingHeading: 'Book your stay.',
    bookingDescription: 'Six rooms. Book directly for the best rate.',
  },
};

const getActivityItems = (locale) => {
  const items = {
    pt: [
      { title: 'Praias', description: 'Costa Vicentina (110 km) — Zambujeira, Carvalhal, Odeceixe.', distance: '5-30 km' },
      { title: 'Rota Vicentina', description: 'O Trilho dos Pescadores passa a minutos da porta.', distance: '1 km' },
      { title: 'Natureza', description: 'Cegonhas, águias e montado. O Alentejo não precisa de mais.', distance: '0 km' },
      { title: 'Gastronomia', description: 'Restaurantes, vinho alentejano, e produtos locais.', distance: '5 km' },
      { title: 'Ciclismo', description: 'Estradas de terra batida através do montado sem trânsito.', distance: '0 km' },
      { title: 'Massagens', description: 'Massagens terapêuticas e relaxantes na Herdade do Touril.', distance: '3 km' },
    ],
    en: [
      { title: 'Beaches', description: 'Costa Vicentina (110 km) — Zambujeira, Carvalhal, Odeceixe.', distance: '5-30 km' },
      { title: 'Rota Vicentina', description: 'The Fishermen\'s Trail is minutes from the door.', distance: '1 km' },
      { title: 'Nature', description: 'Storks, eagles, and cork oak forest. Alentejo needs nothing more.', distance: '0 km' },
      { title: 'Gastronomy', description: 'Restaurants, Alentejo wine, and local products.', distance: '5 km' },
      { title: 'Cycling', description: 'Dirt roads through the cork oak forest with no traffic.', distance: '0 km' },
      { title: 'Massages', description: 'Therapeutic and relaxation massages at Herdade do Touril.', distance: '3 km' },
    ],
  };
  return items[locale] || items.pt;
};

const HomePage = () => {
  const isMobile = useMobileQuery();
  const { locale } = useLocale();
  const atividadesData = getData('atividades', locale);
  const suiteAlentejanaData = getData('suiteAlentejana', locale);
  const copy = homeCopy[locale] || homeCopy.pt;
  const navItems = getNavItems(locale);
  const activityItems = getActivityItems(locale);

  return (
    <div className={styles.homePage}>
      <SEO
        title={locale === 'en' ? 'Monte da Estrada — Rural Tourism in Alentejo' : 'Monte da Estrada — Turismo Rural no Alentejo'}
        description={locale === 'en'
          ? 'A traditional Alentejo farmhouse converted into quality rural tourism. Eight rooms, pure nature, Costa Vicentina at the door.'
          : 'Um tradicional monte alentejano convertido em turismo rural de qualidade. Oito quartos, natureza pura, Costa Vicentina à porta.'}
        locale={locale}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* S1 — Immersive Hero ────────────────────────────────── */}
      <div id="home-hero">
        <ImmersiveHero
          imageSrc={homeImages.hero.src}
          imageAlt={locale === 'en' ? 'Monte da Estrada — rural tourism in Alentejo' : 'Monte da Estrada — turismo rural no Alentejo'}
          headline="Monte da Estrada"
          subtitle={locale === 'en' ? 'Your home on the Alentejo Coast.' : 'A sua casa no Litoral Alentejano.'}
          scrollLabel={copy.heroScrollLabel}
        />
      </div>

      {/* CategoryNav — Sticky section navigation ──────────────── */}
      <CategoryNav
        items={navItems}
        targetId="home-hero"
        headerHeight={88}
      />

      {/* S2 — Editorial Anchor ──────────────────────────────── */}
      <EditorialAnchor
        propertyName="Monte da Estrada"
        tagline={copy.anchorTagline}
        body={copy.anchorBody}
        email="geral@montedaestrada.com"
        phone="+351 960 254 072"
        ctaLabel={copy.anchorCtaLabel}
        ctaHref="#casa"
      />

      {/* S3 — A Casa — Editorial Split ──────────────────────── */}
      <div id="casa">
        <EditorialSplitSection
          eyebrow={copy.casaEyebrow}
          heading={copy.casaHeading}
          body={copy.casaBody}
          carouselImages={s3CarouselImages}
          imagePosition="left"
          ctaLabel={copy.casaCtaLabel}
          ctaHref={locale === 'en' ? '/en/quartos' : '/quartos'}
        />
      </div>

      {/* S3.5 — Amenity Strip ─────────────────────────────── */}
      <AmenityStrip amenities={atividadesData?.amenities?.items || []} />

      {/* S4 — Suite Alentejana — Editorial Suite Experience ────────────── */}
      <div id="quartos">
        <SuiteAlentejanaSection
          eyebrow={suiteAlentejanaData?.eyebrow || ''}
          heading={suiteAlentejanaData?.heading || ''}
          tagline={suiteAlentejanaData?.tagline || ''}
          description={suiteAlentejanaData?.description || ''}
          carouselImages={suiteCarouselImages}
          amenities={suiteAlentejanaData?.amenities || []}
          ctaLabel={suiteAlentejanaData?.ctaLabel || ''}
          ctaHref={suiteAlentejanaData?.ctaHref || '/quartos'}
        />
      </div>

      {/* S5 — Full Bleed Photography Break — hidden on mobile */}
      {!isMobile && (
        <FullBleedImage
          imageSrc={homeImages.sala3.src}
          imageAlt={homeImages.sala3.alt}
          height="70vh"
        />
      )}

      {/* S6 — O Território — Editorial Split ───────────────── */}
      <div id="territorio">
        <EditorialSplitSection
          eyebrow={copy.territorioEyebrow}
          heading={copy.territorioHeading}
          body={copy.territorioBody}
          imageSrc={homeImages.gallery[1].src}
          imageAlt={copy.territorioImageAlt}
          imagePosition="right"
          background="offwhite"
          ctaLabel={copy.territorioCtaLabel}
          ctaHref={locale === 'en' ? '/en/descobrir#experiencias' : '/descobrir#experiencias'}
        />
      </div>

      {/* S7 — Experiências — Activity Highlights ─────────────── */}
      <div id="experiencias">
        <ActivityHighlights
          eyebrow={copy.experienciasEyebrow}
          heading={copy.experienciasHeading}
          items={activityItems}
          ctaLabel={copy.experienciasCtaLabel}
          ctaHref={locale === 'en' ? '/en/descobrir' : '/descobrir'}
        />
      </div>

      {/* S8 — Booking Section ───────────────────────────────── */}
      <div id="reservas" className={styles.reservasSection}>
        <BookingSection
          eyebrow={copy.bookingEyebrow}
          heading={copy.bookingHeading}
          description={copy.bookingDescription}
          fallbackEmail="geral@montedaestrada.com"
          fallbackPhone="+351 960 254 072"
          whatsappNumber="351960254072"
          isMobile={isMobile}
        />
      </div>

    </div>
  );
};

export default HomePage;
