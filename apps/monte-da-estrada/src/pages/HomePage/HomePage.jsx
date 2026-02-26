import React from 'react';
import SEO from '@/components/SEO';
import {
  ImmersiveHero,
  EditorialAnchor,
  EditorialSplitSection,
  FullBleedImage,
  AmenityStrip,
  RoomGrid,
  ActivityHighlights,
  BookingSection,
  GalleryPreview,
  CategoryNav,
} from '@touril-ecosystem/ui-components';
import atividadesData from '@/data/atividades.json';
import { homeImages } from '@/assets/images/home';
import { quartosImages } from '@/assets/images/quartos';
import { galeriaImages } from '@/assets/images/galeria';
import { seoConfig } from '@/utils/seo-config';
import styles from './HomePage.module.scss';

// ──────────────────────────────────────────────
// CategoryNav anchor items — 5 main sections
// ──────────────────────────────────────────────

const NAV_ITEMS = [
  { id: 'casa', label: 'Casa' },
  { id: 'quartos', label: 'Quartos' },
  { id: 'territorio', label: 'Território' },
  { id: 'atividades', label: 'Atividades' },
  { id: 'reservas', label: 'Reservas' },
  { id: 'galeria', label: 'Galeria' },
];

// ──────────────────────────────────────────────
// Section data — editorial content for the homepage
// These are the 6 room previews shown in the RoomGrid teaser.
// Full room detail lives at /quartos (different depth, different user intent).
// ──────────────────────────────────────────────

const homeRooms = [
  {
    id: 'suite-deluxe',
    title: 'Suite Deluxe',
    subtitle: 'Vista panorâmica sobre o Alentejo',
    imageSrc: quartosImages.rooms[4].src,
    imageAlt: quartosImages.rooms[4].alt,
  },
  {
    id: 'comfort-alentejo',
    title: 'Quarto Comfort',
    subtitle: 'Terraço privativo com vista para o campo',
    imageSrc: quartosImages.rooms[1].src,
    imageAlt: quartosImages.rooms[1].alt,
  },
  {
    id: 'garden-view',
    title: 'Vista Jardim',
    subtitle: 'Serenidade e conforto no coração do monte',
    imageSrc: quartosImages.rooms[2].src,
    imageAlt: quartosImages.rooms[2].alt,
  },
  {
    id: 'monte-classic',
    title: 'Quarto Monte',
    subtitle: 'Autenticidade alentejana em cada detalhe',
    imageSrc: quartosImages.rooms[6].src,
    imageAlt: quartosImages.rooms[6].alt,
  },
  {
    id: 'twin-campo',
    title: 'Quarto Twin',
    subtitle: 'Duas camas e vista aberta para o campo',
    imageSrc: quartosImages.rooms[3].src,
    imageAlt: quartosImages.rooms[3].alt,
  },
  {
    id: 'familiar',
    title: 'Quarto Familiar',
    subtitle: 'Espaço amplo, privacidade garantida',
    imageSrc: quartosImages.rooms[8].src,
    imageAlt: quartosImages.rooms[8].alt,
  },
];

// 5 editorial activity cards — teasers, not exhaustive lists.
// Full activity detail lives at /descobrir.
const activityItems = [
  {
    title: 'Praias',
    description: 'Costa Vicentina (110 km) — Zambujeira, Carvalhal, Odeceixe.',
    distance: '5-30 km',
  },
  {
    title: 'Rota Vicentina',
    description: 'O Trilho dos Pescadores passa a minutos da porta.',
    distance: '1 km',
  },
  {
    title: 'Natureza',
    description: 'Cegonhas, águias e montado. O Alentejo não precisa de mais.',
    distance: '0 km',
  },
  {
    title: 'Gastronomia',
    description: 'Restaurantes em São Teotónio, vinho alentejano, produtos locais.',
    distance: '5 km',
  },
  {
    title: 'Ciclismo',
    description: 'Estradas de terra batida através do montado sem trânsito.',
    distance: '0 km',
  },
];

// 3 images for the asymmetric gallery preview grid.
// Uses property exterior shots for the 2/3-width slot.
const galleryPreviewImages = [
  homeImages.gallery[0], // Main entrance — tall portrait slot (left)
  galeriaImages.gallery[0], // Property detail — square top-right
  homeImages.gallery[5], // Property exterior — square bottom-right
];

// ──────────────────────────────────────────────
// Page component
// ──────────────────────────────────────────────

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <SEO
        title={seoConfig.home.title}
        description={seoConfig.home.description}
        keywords={seoConfig.home.keywords}
        image={seoConfig.home.image}
      />

      {/* S1 — Immersive Hero ────────────────────────────────── */}
      {/* Full-viewport exterior photography + single-line headline */}
      <div id="home-hero">
        <ImmersiveHero
          imageSrc={homeImages.hero.src}
          imageAlt={homeImages.hero.alt}
          headline="A sua casa no interior do Alentejo."
          scrollLabel="Descobrir"
        />
      </div>

      {/* CategoryNav — Sticky section navigation ──────────────── */}
      <CategoryNav
        items={NAV_ITEMS}
        targetId="home-hero"
        headerHeight={88}
      />

      {/* S2 — Editorial Anchor ──────────────────────────────── */}
      {/* Property name + manifesto paragraphs + contact, no images */}
      <EditorialAnchor
        propertyName="Monte da Estrada"
        tagline="Seis quartos, uma casa, um monte."
        body="A 5 quilómetros do mar, dentro da Costa Vicentina."
        email="montedaestradazambujeiradomar@gmail.com"
        phone="+351 960 254 072"
        ctaLabel="Sobre a casa"
        ctaHref="/descobrir"
      />

      {/* S3 — A Casa — Editorial Split ──────────────────────── */}
      {/* Property architecture story: image left, prose right */}
      <div id="casa">
        <EditorialSplitSection
          eyebrow="A Casa"
          heading="Arquitectura de monte, revisitada."
          body={[
            'A casa existia antes de ser hotel. Os muros de cal e o pavimento antigo mantêm-se — não por falta de alternativa, mas por escolha.',
            'Não tentamos impressionar. Tentamos que fique.',
          ]}
          imageSrc={homeImages.gallery[0].src}
          imageAlt={homeImages.gallery[0].alt}
          imagePosition="left"
          ctaLabel="Conhecer a casa"
          ctaHref="/descobrir"
        />
      </div>

       {/* S3.5 — Amenity Strip ─────────────────────────────── */}
      {/* Premium "at a glance" — icon + label pairs, no descriptions */}
      <AmenityStrip amenities={atividadesData.amenities.items} />

      {/* S4 — Quartos — Room Grid ───────────────────────────── */}
      {/* 6-card portrait grid. Teaser only — /quartos has full detail */}
      <div id="quartos">
        <RoomGrid
          eyebrow="Quartos"
          heading="Seis quartos. Cada um, o seu."
          subHeading="Não há dois iguais. A luz da manhã entra diferente em cada divisão. Escolha pelo que quer acordar a ver."
          rooms={homeRooms}
          ctaLabel="Ver todos os quartos"
          ctaHref="/quartos"
        />
      </div>

      {/* S5 — Full Bleed Photography Break ─────────────────── */}
      {/* Emotional beat between rooms and territory sections */}
      <FullBleedImage
        imageSrc={homeImages.gallery[7].src}
        alt={homeImages.gallery[7].alt}
        caption="Costa Vicentina — 110 km de costa selvagem."
        height="70vh"
      />

      {/* S6 — O Território — Editorial Split ───────────────── */}
      {/* Geographic positioning: text left, landscape right */}
      <div id="territorio">
        <EditorialSplitSection
          eyebrow="O Território"
          heading="Entre o Alentejo e o Atlântico."
          body={[
            'A Rota Vicentina passa a minutos — 110 km de costa selvagem. Zambujeira do Mar fica a 8 quilómetros. O Alentejo interior está à porta.',
            'Isto não é isolamento. É uma posição.',
          ]}
          imageSrc={homeImages.gallery[4].src}
          imageAlt="Vista panorâmica da paisagem alentejana"
          imagePosition="right"
          background="offwhite"
          ctaLabel="Explorar as redondezas"
          ctaHref="/descobrir"
        />
      </div>

      {/* S7 — Atividades — Activity Highlights ─────────────── */}
      {/* 5 editorial activity cards: icon + title + distance */}
      <div id="atividades">
        <ActivityHighlights
          eyebrow="Atividades"
          heading="Aqui não há agenda. A não ser a sua."
          items={activityItems}
          ctaLabel="Ver todas as atividades"
          ctaHref="/descobrir"
        />
      </div>

      {/* S8 — Booking Section ───────────────────────────────── */}
      {/* Booking contact with white background for contrast */}
      <div id="reservas" className={styles.reservasSection}>
        <BookingSection
          eyebrow="Reservas"
          heading="Marque a sua estadia."
          fallbackEmail="montedaestradazambujeiradomar@gmail.com"
          fallbackPhone="+351 960 254 072"
          whatsappNumber="351960254072"
        />
      </div>

      {/* S9 — Gallery Preview ───────────────────────────────── */}
      {/* Asymmetric 3-image preview → links to /galeria */}
      <div id="galeria">
        <GalleryPreview
          eyebrow="Galeria"
          images={galleryPreviewImages}
          ctaLabel="Ver galeria completa"
          ctaHref="/galeria"
        />
      </div>
    </div>
  );
};

export default HomePage;
