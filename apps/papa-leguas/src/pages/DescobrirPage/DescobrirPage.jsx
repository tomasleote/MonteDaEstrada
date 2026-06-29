import React from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import {
  PageHero,
  ActivityHighlights,
  AmenityStrip,
  DiscoveryMap,
  EditorialSplitSection,
} from '@touril-ecosystem/ui-components';
import mapLocations from '@/data/map-locations';
import ptData from '@/data/pt/descobrir.json';
import enData from '@/data/en/descobrir.json';
import styles from './DescobrirPage.module.scss';

const PL_CENTER = [-8.761460, 37.529417];
const PL_ZOOM = 10;

function DescobrirPage() {
  const { locale } = useLocale();
  const data = locale === 'en' ? enData : ptData;

  return (
    <div className={styles.descobrirPage}>

      {/* S1 — PageHero */}
      <PageHero
        imageSrc={data.hero.image}
        imageAlt={data.hero.imageAlt || data.hero.title}
        eyebrow={data.hero.eyebrow}
        headline={data.hero.title}
        subtitle={data.hero.subtitle}
      />

      {/* S2 — Activities */}
      <ActivityHighlights
        eyebrow="As Nossas Atividades"
        heading="Experiências Únicas"
        items={data.activities}
      />

      {/* S3 — Services strip */}
      <AmenityStrip
        amenities={data.services.map((s) => ({ name: s.label || s.name }))}
      />

      {/* S4 — Map */}
      <section className={styles.mapSection}>
        <DiscoveryMap
          locations={mapLocations}
          center={PL_CENTER}
          zoom={PL_ZOOM}
          locale={locale}
        />
      </section>

      {/* S5 — Rota Vicentina */}
      <EditorialSplitSection
        eyebrow="Rota Vicentina"
        heading="Um dos percursos mais belos de Portugal"
        body="Aventure-se pela Rota Vicentina, uma extraordinária rede de percursos sinalizados com cerca de 400 km. Na Zambujeira do Mar começa o Trilho dos Pescadores, que serpenteia junto ao mar revelando vistas deslumbrantes ao longo das falésias."
        imageSrc="https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@COMMIT_HASH_PLACEHOLDER/pl/descobrir/atividade-caminhada.webp"
        imageAlt="Trilho dos Pescadores na Costa Vicentina"
        ctaLabel="Mais sobre a Rota Vicentina"
        ctaHref="https://rotavicentina.com/"
      />

      {/* S6 — Partners */}
      <section className={styles.partnersSection}>
        <h2>Parceiros</h2>
        <div className={styles.partnerGrid}>
          {data.partners.map((partner, index) => (
            <a
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={partner.logoSrc}
                alt={partner.logoAlt}
                className={styles.partnerLogo}
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </section>

    </div>
  );
}

export default DescobrirPage;
