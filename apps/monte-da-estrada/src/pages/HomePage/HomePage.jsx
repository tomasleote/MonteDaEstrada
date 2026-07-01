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
  InlineBookingWidget,
} from '@touril-ecosystem/ui-components';
import useMobileQuery from '@/hooks/useMobileQuery';
import { useLocale } from '@/contexts/LocaleContext';
import { getData } from '@/data/dataLoader';
import { homeImages } from '@/data/homeImages';
import { quartosImages } from '@/data/quartosImages';
import styles from './HomePage.module.scss';

// ──────────────────────────────────────────────
// HeyTravel booking URLs — used in hero widget
// ──────────────────────────────────────────────

const BOOKING_URL = {
  pt: 'https://be.heytravel.net/da157c05-a630-43a2-a15b-732f96c563f2?occupation=%5B%7B%22room%22%3A1%2C%22adults%22%3A2%2C%22children%22%3A0%7D%5D&complex=1828&lang=pt-PT',
  en: 'https://be.heytravel.net/da157c05-a630-43a2-a15b-732f96c563f2?occupation=%5B%7B%22room%22%3A1%2C%22adults%22%3A2%2C%22children%22%3A0%7D%5D&complex=1828&lang=en-GB',
};

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
    src: quartosImages.quartoDuploTwin.find((img) => img.src.includes('quarto-2.webp')).src,
    alt: 'Suite Alentejana com luz matinal e vista panorâmica',
  }
];

// A Casa carousel — pinned to @42b901a (matches hero; monte-exterior-3/5 only exist at this pin)
const CASA_CDN = 'https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@42b901a/mde/home';
const s3CarouselImages = [
  { src: `${CASA_CDN}/sala-2.webp`, alt: 'Monte da Estrada — Sala de estar' },
  { src: `${CASA_CDN}/sala-3.webp`, alt: 'Monte da Estrada — Espaços comuns' },
  { src: `${CASA_CDN}/monte-exterior-3.jpeg`, alt: 'Monte da Estrada — Exterior do monte' },
  { src: `${CASA_CDN}/monte-exterior-5.jpg`, alt: 'Monte da Estrada — Exterior e envolvente' },
  { src: `${CASA_CDN}/sala-5.webp`, alt: 'Monte da Estrada — Sala de estar e leitura' },
  { src: `${CASA_CDN}/pormenor-2.webp`, alt: 'Monte da Estrada — Detalhes de interiores' },
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
  "checkinTime": "16:00",
  "checkoutTime": "11:00",
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
    "name": `Quarto Duplo ou Twin ${i + 1}`,
    "image": `https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@15d5b6f/mde/quartos/quarto-${(i % 4) + 1}.webp`
  }))
};

// ──────────────────────────────────────────────
// Locale-specific copy
// ──────────────────────────────────────────────

const homeCopy = {
  pt: {
    heroScrollLabel: 'Descobrir',
    anchorTagline: 'Um monte, 8 quartos e um jardim envolvente a 5 km do mar.',
    anchorBody: '',
    anchorCtaLabel: 'Sobre a casa',
    casaEyebrow: 'A Casa',
    casaHeading: 'Um monte alentejano revisitado',
    casaBody: [
      'Outrora um Monte onde se guardavam as alfaias e o feno, hoje transformado em 8 quartos num ambiente Rural com muito conforto e simplicidade.',
    ],
    territorioEyebrow: 'Entre o Campo e o Mar',
    territorioHeading: 'Amanhecer no Campo, Entardecer no Mar',
    territorioBody: [
      'Conforto e serenidade num recanto alentejano pensado para si. Desfrute da proximidade estratégica ao Farol do Cabo Sardão e das praias mais deslumbrantes da Rota Vicentina. O descanso que merece, entre o campo e o mar.',
    ],
    territorioImageAlt: 'Vista panorâmica da paisagem alentejana',
    territorioCtaLabel: 'Descobrir o território',
    experienciasEyebrow: 'Experiências',
    experienciasHeading: 'Aqui não há agenda. A não ser a sua.',
    experienciasCtaLabel: 'Ver todas as experiências',
    bookingEyebrow: 'Reservas',
    bookingHeading: 'Marque a sua estadia.',
    bookingDescription: 'Oito quartos. Reserve diretamente para o melhor tarifário.',
  },
  en: {
    heroScrollLabel: 'Discover',
    anchorTagline: 'A monte, 8 rooms and surrounding gardens, 5 km from the sea.',
    anchorBody: '',
    anchorCtaLabel: 'About the house',
    casaEyebrow: 'The House',
    casaHeading: 'An Alentejo monte, revisited',
    casaBody: [
      'Once a monte where farm tools and hay were kept, today transformed into 8 rooms in a rural setting with great comfort and simplicity.',
    ],
    territorioEyebrow: 'Between the Countryside and the Sea',
    territorioHeading: 'Sunrise in the Countryside, Sunset by the Sea',
    territorioBody: [
      'Comfort and serenity in an Alentejo retreat designed for you. Enjoy the strategic proximity to the Cabo Sardão Lighthouse and the most stunning beaches of the Rota Vicentina. The rest you deserve, between the countryside and the sea.',
    ],
    territorioImageAlt: 'Panoramic view of the Alentejo landscape',
    territorioCtaLabel: 'Discover the territory',
    experienciasEyebrow: 'Experiences',
    experienciasHeading: 'There is no agenda here. Unless you bring one.',
    experienciasCtaLabel: 'See all experiences',
    bookingEyebrow: 'Reservations',
    bookingHeading: 'Book your stay.',
    bookingDescription: 'Eight rooms. Book directly for the best rate.',
  },
};

const getActivityItems = (locale) => {
  const items = {
    pt: [
      { title: 'Praias', description: 'Um mundo de praias costeiras e fluviais por descobrir.', distance: '5-30 km' },
      { title: 'Trilhos', description: 'Caminhos de terra batida entre o mar e a serra. Hiking & Cycling.', distance: '0 km' },
      { title: 'Natureza', description: 'Horizontes a perder de vista, onde plantas silvestres emolduram as falésias habitadas por cegonhas.', distance: '0 km' },
      { title: 'História', description: 'Farol do Cabo Sardão — mais de um século de apoio à navegação marítima.', distance: '5 km' },
      { title: 'Gastronomia', description: 'Petiscos locais e sabores autênticos oferecidos pela terra, rio e mar.', distance: '5 km' },
      { title: 'Desporto', description: 'Paraíso para desportos de natureza e aventura: surf, bodyboard, canoagem ou stand-up paddle no Rio Mira e passeios a cavalo.', distance: '5-30 km' },
    ],
    en: [
      { title: 'Beaches', description: 'A world of coastal and river beaches waiting to be discovered.', distance: '5-30 km' },
      { title: 'Trails', description: 'Dirt paths between the sea and the hills. Hiking & cycling.', distance: '0 km' },
      { title: 'Nature', description: 'Endless horizons, where wildflowers frame the cliffs inhabited by storks.', distance: '0 km' },
      { title: 'History', description: 'Cabo Sardão Lighthouse — over a century of support to maritime navigation.', distance: '5 km' },
      { title: 'Gastronomy', description: 'Local petiscos and authentic flavours offered by the land, river and sea.', distance: '5 km' },
      { title: 'Sports', description: 'A paradise for nature and adventure sports: surf, bodyboard, canoeing or stand-up paddle on the Mira River, and horse riding.', distance: '5-30 km' },
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

  const bookingUrl = BOOKING_URL[locale] || BOOKING_URL.pt;
  const reserveLabel = locale === 'en' ? 'Book now' : 'Reservar agora';

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
      <InlineBookingWidget locale={locale} />
    </div>
  );

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
          subtitle={locale === 'en' ? 'Rural setting with comfort and simplicity.' : 'Ambiente rural com conforto e simplicidade.'}
          scrollLabel={copy.heroScrollLabel}
        >
          {heroWidget}
        </ImmersiveHero>
      </div>

      {/* CategoryNav — Sticky section navigation ──────────────── */}
      <CategoryNav
        items={navItems}
        scrollThreshold={100}
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
          ctaHref={locale === 'en' ? '/en/descobrir#experiencias' : '/descobrir#experiencias'}
        />
      </div>

      {/* S8 — Booking Section — widget is in hero, so always show button here */}
      <div id="reservas" className={styles.reservasSection}>
        <BookingSection
          eyebrow={copy.bookingEyebrow}
          heading={copy.bookingHeading}
          description={copy.bookingDescription}
          fallbackEmail="geral@montedaestrada.com"
          fallbackPhone="+351 960 254 072"
          whatsappNumber="351960254072"
          isMobile={true}
          locale={locale}
        />
      </div>

    </div>
  );
};

export default HomePage;
