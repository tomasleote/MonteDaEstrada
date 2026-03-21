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
import atividadesData from '@/data/atividades.json';
import suiteAlentejanaData from '@/data/suiteAlentejana.json';
import { homeImages } from '@/data/homeImages';
import { quartosImages } from '@/data/quartosImages';
import { seoConfig } from '@/utils/seo-config';
import styles from './HomePage.module.scss';

// ──────────────────────────────────────────────
// CategoryNav anchor items — 5 main sections
// ──────────────────────────────────────────────

const NAV_ITEMS = [
  { id: 'casa', label: 'Casa' },
  { id: 'quartos', label: 'Quartos' },
  { id: 'territorio', label: 'Território' },
  { id: 'experiencias', label: 'Experiências' },
  { id: 'reservas', label: 'Reservas' },
];

// ──────────────────────────────────────────────
// Suite Alentejana carousel images
// ──────────────────────────────────────────────

const suiteCarouselImages = [
  {
    src: quartosImages.quartoDuploTwin[1].src,
    alt: 'Suite Alentejana com luz matinal e vista panorâmica',
  }
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
    description: 'Restaurantes, vinho alentejano, e produtos locais.',
    distance: '5 km',
  },
  {
    title: 'Ciclismo',
    description: 'Estradas de terra batida através do montado sem trânsito.',
    distance: '0 km',
  },
  {
    title: 'Massagens',
    description: 'Massagens terapêuticas e relaxantes na Herdade do Touril.',
    distance: '3 km'
  },
];

// ──────────────────────────────────────────────

const HomePage = () => {
  const isMobile = useMobileQuery();

  return (
    <div className={styles.homePage}>
      <SEO
        title={seoConfig.home.title}
        description={seoConfig.home.description}
        keywords={seoConfig.home.keywords}
        image={seoConfig.home.image}
      />
      
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Hotel",
          "name": "Monte da Estrada",
          "image": "https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@495a0e9/mde/home/home-property-view-05.webp",
          "description": "A sua casa no Litoral Alentejano.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Zambujeira do Mar",
            "addressRegion": "Alentejo",
            "addressCountry": "PT"
          },
          "containsPlace": [
            {
              "@type": "HotelRoom",
              "name": "Suite Alentejana",
              "image": "https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@495a0e9/mde/quartos/quarto-1.webp",
              "amenityFeature": {
                "@type": "LocationFeatureSpecification",
                "name": "Vista Panorâmica",
                "value": true
              }
            }
          ]
        })}
      </script>

      {/* S1 — Immersive Hero ────────────────────────────────── */}
      {/* Full-viewport exterior photography + single-line headline */}
      <div id="home-hero">
        <ImmersiveHero
          imageSrc={homeImages.hero.src}
          imageAlt={homeImages.hero.alt}
          headline="A sua casa no Litoral Alentejano."
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
        tagline="Oito quartos, uma casa, um monte."
        body="A 5 quilómetros do mar, dentro da Costa Vicentina."
        email="geral@montedaestrada.com"
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

      {/* S4 — Suite Alentejana — Editorial Suite Experience ────────────── */}
      {/* Single premium suite with carousel, atmospheric copy, amenities, booking CTA */}
      <div id="quartos">
        <SuiteAlentejanaSection
          eyebrow={suiteAlentejanaData.eyebrow}
          heading={suiteAlentejanaData.heading}
          tagline={suiteAlentejanaData.tagline}
          description={suiteAlentejanaData.description}
          carouselImages={suiteCarouselImages}
          amenities={suiteAlentejanaData.amenities}
          ctaLabel={suiteAlentejanaData.ctaLabel}
          ctaHref={suiteAlentejanaData.ctaHref}
        />
      </div>

      {/* S5 — Full Bleed Photography Break — hidden on mobile */}
      {!isMobile && (
        <FullBleedImage
          imageSrc={homeImages.gallery[2].src}
          height="70vh"
        />
      )}

      {/* S6 — O Território — Editorial Split ───────────────── */}
      {/* Geographic positioning: text left, landscape right */}
      <div id="territorio">
        <EditorialSplitSection
          eyebrow="O Território"
          heading="Entre o Alentejo e o Atlântico."
          body={[
            'O Trilho dos Pescadores passa a minutos — 110 km de costa selvagem. Zambujeira do Mar fica a 8 quilómetros. O Litoral Alentejano está à porta.',
            'Isto não é isolamento. É uma posição.',
          ]}
          imageSrc={homeImages.gallery[1].src}
          imageAlt="Vista panorâmica da paisagem alentejana"
          imagePosition="right"
          background="offwhite"
          ctaLabel="Explorar as redondezas"
          ctaHref="/descobrir"
        />
      </div>

      {/* S7 — Experiências — Activity Highlights ─────────────── */}
      {/* 5 editorial activity cards: icon + title + distance */}
      <div id="experiencias">
        <ActivityHighlights
          eyebrow="Experiências"
          heading="Aqui não há agenda. A não ser a sua."
          items={activityItems}
          ctaLabel="Ver todas as experiências"
          ctaHref="/descobrir"
        />
      </div>

      {/* S8 — Booking Section ───────────────────────────────── */}
      {/* Booking contact with white background for contrast */}
      <div id="reservas" className={styles.reservasSection}>
        <BookingSection
          eyebrow="Reservas"
          heading="Marque a sua estadia."
          description="Seis quartos. Reserve diretamente para o melhor tarifário."
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
