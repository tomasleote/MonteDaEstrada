import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import SEO from '@/components/SEO';
import {
  PageHero,
  CategoryNav,
  EditorialSplitSection,
  ExperienceCard,
  EditorialPullQuote,
  FullBleedQuote,
  BeachCard,
  SectionEyebrow,
  BookingSection,
  DiscoveryMap,
  viewport,
  stagger,
} from '@touril-ecosystem/ui-components';
import descobrirData from '@/data/descobrir';
import mapLocations from '@/data/map-locations';
import useMobileQuery from '@/hooks/useMobileQuery';

import styles from './DescobrirPage.module.scss';

// ──────────────────────────────────────────────
// CategoryNav anchor items — 3 acts
// ──────────────────────────────────────────────

const NAV_ITEMS = [
  { id: 'mapa', label: 'Mapa' },
  { id: 'experiencias', label: 'Experiências' },
  { id: 'praias', label: 'Praias' },
  { id: 'parceiros', label: 'Parceiros' },
];

// ──────────────────────────────────────────────
// Page component
// ──────────────────────────────────────────────

const DescobrirPage = () => {
  const isMobile = useMobileQuery();

  return (
    <div className={styles.page}>
      <SEO
        title="Descobrir"
        description="Explore o território à volta do Monte da Estrada: praias da Costa Vicentina, trilhos da Rota Vicentina, vilas históricas e a paisagem única do Alentejo interior."
        keywords="descobrir, alentejo, costa vicentina, rota vicentina, zambujeira do mar, atividades, redondezas, monte da estrada"
        image="/images/hero-atividades.jpg"
      />

      {/* S1 — PageHero ──────────────────────────────────────── */}
      {/* 65vh territory photography + eyebrow + headline + subtitle */}
      <div id="discovery-hero">
        <PageHero
          imageSrc="https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@495a0e9/mde/descobrir/herodescobrir%20(1).webp"
          imageAlt="Descobrir o Alentejo e a Costa Vicentina"
          eyebrow="Descobrir"
          headline="O território é a experiência."
          subtitle="110 km de Atlântico. A Rota Vicentina à porta. O Alentejo profundo aqui mesmo."
        />
      </div>

      {/* S2 — CategoryNav (sticky) ───────────────────────────────── */}
      {/* Experiências · Praias · Redondezas — appears when hero exits */}
      <CategoryNav
        items={NAV_ITEMS}
        targetId="discovery-hero"
        headerHeight={88}
      />

      {/* S3 — O Território — EditorialSplitSection ───────────────── */}
      {/* Prose + landscape image. Cream background. */}
      {/* imagePosition="right" so existing CSS reordering puts text first on mobile */}
      <EditorialSplitSection
        eyebrow="O Território"
        heading="Entre o Alentejo e o Atlântico."
        body={[
          'A Rota Vicentina passa a minutos da casa. Zambujeira do Mar fica a dezoito quilómetros. O Alentejo profundo — com os seus montados, planícies e silêncio — está aqui mesmo à porta.',
          'Monte da Estrada não é um ponto de chegada. É uma base de onde se parte — para a praia, para o trilho, para o mercado de São Teotónio, para o nada que de repente faz falta.',
        ]}
        imageSrc="https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@495a0e9/mde/descobrir/costavicentina.webp"
        imageAlt="Vista panorâmica da paisagem alentejana"
        imagePosition="right"
      />

      {/* S3.5 — Discovery Map ─────────────────────────────────────── */}
      {/* Interactive Insider's Guide — Our Collection + Owner's Spots + Curated */}
      <section id="mapa" className={styles.mapSection}>
        <DiscoveryMap locations={mapLocations} />
      </section>

      {/* S4 — Experiências — ExperienceCard grid ─────────────────── */}
      {/* 6 curated experiences in a 3-col portrait grid on sand bg */}
      <section id="experiencias" className={styles.experiencesSection}>
        <div className={styles.container}>
          <SectionEyebrow label="Experiências" />
          <h2 className={styles.sectionHeading}>Aqui não há agenda. A não ser a sua.</h2>

          <motion.div
            className={styles.experiencesGrid}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: stagger.default,
                  delayChildren: 0.05,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={viewport.default}
          >
            {descobrirData.experiences.map((exp, index) => {
              // Use imported images for all experiences
              const imageSrc = exp.imageSrc;

              return (
                <ExperienceCard
                  key={index}
                  category={exp.category}
                  categoryLabel={exp.categoryLabel}
                  title={exp.title}
                  description={exp.description}
                  highlights={exp.highlights}
                  imageSrc={imageSrc}
                  imageAlt={exp.imageAlt}
                />
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* S5 — EditorialPullQuote ──────────────────────────────────── */}
      {/* Contemplative pause. Clay left border. Italic serif. */}
      <EditorialPullQuote
        quote="O território não se visita. Habita-se, mesmo que por poucos dias."
        attribution="Monte da Estrada"
        background="cream"
      />

      {/* S6 — FullBleedQuote ─────────────────────────────────────── */}
      {/* Coastal photography + editorial serif quote overlay (50vh, parallax) */}
      <FullBleedQuote
        imageSrc={descobrirData.beaches[4].imageSrc}
        alt="Zambujeira do Mar — falésias e Atlântico"
        quote="A última costa selvagem da Europa ocidental começa aqui."
        attribution="Parque Natural do Sudoeste Alentejano e Costa Vicentina"
      />

      {/* S7 — Praias — BeachCard grid ────────────────────────────── */}
      {/* 5 cinematic 16:9 beach cards in a 2-col layout */}
      <section id="praias" className={styles.beachesSection}>
        <div className={styles.container}>
          <SectionEyebrow label="Praias" />
          <h2 className={styles.sectionHeading}>110 km de costa. Escolha a sua.</h2>

          <motion.div
            className={styles.beachesGrid}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.05,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={viewport.default}
          >
            {descobrirData.beaches.map((beach, index) => {
              const imageSrc = beach.imageSrc;
              return (
                <BeachCard
                  key={index}
                  name={beach.name}
                  distance={beach.distance}
                  description={beach.description}
                  imageSrc={imageSrc}
                  imageAlt={beach.imageAlt}
                  mapUrl={beach.mapUrl}
                />
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* S8 — Parceiros — Grid of partner logos ────────────────────────────── */}
      <section id="parceiros" className={styles.parceirosSection}>
        <div className={styles.container}>
          <SectionEyebrow label="Parceiros" />
          <h2 className={styles.sectionHeading}>Quem está connosco.</h2>

          <motion.div
            className={styles.parceirosGrid}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={viewport.default}
          >
            {descobrirData.parceiros.map((partner, index) => (
              <motion.a
                key={index}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.partnerCard}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
                }}
              >
                <img
                  src={partner.logo}
                  alt={`Logo de ${partner.name}`}
                  className={styles.partnerLogo}
                  title={partner.name}
                  loading="lazy"
                />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* S9 — As Redondezas — COMMENTED OUT (replaced by DiscoveryMap)
      <section id="redondezas" className={styles.redondezasSection}>
        <div className={styles.container}>
          <SectionEyebrow label="Redondezas" />
          <h2 className={styles.sectionHeadingLight}>O que fica perto.</h2>

          <DistanceFilterBar
            options={DISTANCE_FILTERS}
            activeFilter={distanceFilter}
            onFilterChange={setDistanceFilter}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={distanceFilter}
              className={styles.attractionsGrid}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: stagger.fast,
                    delayChildren: 0.05,
                  },
                },
                exit: {
                  opacity: 0,
                  transition: { duration: duration.micro * 1.5 },
                },
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {filteredAttractions.map((attraction, index) => {
                const imageSrc = descobrirAttractions.attractions[index]?.src || attraction.imageSrc;
                return (
                  <AttractionPinCard
                    key={`${attraction.title}-${index}`}
                    title={attraction.title}
                    location={attraction.location}
                    distance={attraction.distance}
                    description={attraction.description}
                    imageSrc={imageSrc}
                    imageAlt={attraction.imageAlt}
                    mapUrl={attraction.mapUrl}
                  />
                );
              })}

              {filteredAttractions.length === 0 && (
                <p className={styles.noResults}>Sem atrações nesta distância.</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      */}

      {/* S9 — BookingSection ──────────────────────────────────────── */}
      {/* Reused from HomePage — dark CTA with contact options */}
      <div className={styles.bookingSection}>
        <BookingSection
          eyebrow="Reservas"
          heading="Marque a sua estadia."
          fallbackEmail="montedaestradazambujeiradomar@gmail.com"
          fallbackPhone="+351 960 254 072"
          whatsappNumber="351960254072"
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};

export default DescobrirPage;
