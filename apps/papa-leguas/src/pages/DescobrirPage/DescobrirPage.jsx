import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { useLocale } from '@/contexts/LocaleContext';
import {
  PageHero,
  CategoryNav,
  ExperienceCard,
  BeachCard,
  SectionEyebrow,
  AmenityStrip,
  DiscoveryMap,
  EditorialSplitSection,
  viewport,
  stagger,
} from '@touril-ecosystem/ui-components';
import mapLocations from '@/data/map-locations';
import ptData from '@/data/pt/descobrir.json';
import enData from '@/data/en/descobrir.json';
import styles from './DescobrirPage.module.scss';

const PL_CENTER = [-8.761460, 37.529417];
const PL_ZOOM = 10;

// CategoryNav anchor items — must match the section ids below
const getNavItems = (locale) => {
  const labels = {
    pt: { experiencias: 'Experiências', mapa: 'Mapa', praias: 'Praias', parceiros: 'Parceiros' },
    en: { experiencias: 'Experiences', mapa: 'Map', praias: 'Beaches', parceiros: 'Partners' },
  };
  const l = labels[locale] || labels.pt;
  return [
    { id: 'experiencias', label: l.experiencias },
    { id: 'mapa', label: l.mapa },
    { id: 'praias', label: l.praias },
    { id: 'parceiros', label: l.parceiros },
  ];
};

const sectionCopy = {
  pt: {
    experiencesEyebrow: 'Experiências',
    experiencesHeading: 'O que fazer por aqui',
    beachesEyebrow: 'Praias',
    beachesHeading: '110 km de costa. Escolha a sua.',
    parceirosEyebrow: 'Parceiros',
    parceirosHeading: 'Fazemos parte do melhor que a Costa Alentejana tem para oferecer.',
  },
  en: {
    experiencesEyebrow: 'Experiences',
    experiencesHeading: 'What to do around here',
    beachesEyebrow: 'Beaches',
    beachesHeading: '110 km of coast. Pick yours.',
    parceirosEyebrow: 'Partners',
    parceirosHeading: 'We are part of the best the Costa Alentejana has to offer.',
  },
};

function DescobrirPage() {
  const { locale } = useLocale();
  const data = locale === 'en' ? enData : ptData;
  const copy = sectionCopy[locale] || sectionCopy.pt;
  const navItems = getNavItems(locale);

  return (
    <div className={styles.descobrirPage}>

      {/* S1 — PageHero */}
      <div id="descobrir-hero">
        <PageHero
          imageSrc={data.hero.image}
          imageAlt={data.hero.imageAlt || data.hero.title}
          eyebrow={data.hero.eyebrow}
          headline={data.hero.title}
          subtitle={data.hero.subtitle}
        />
      </div>

      {/* Sticky section navigation */}
      <CategoryNav items={navItems} targetId="descobrir-hero" headerHeight={88} />

      {/* S2 — Experiences — same grid and content as Monte da Estrada */}
      <section id="experiencias" className={styles.experiencesSection}>
        <div className={styles.container}>
          <SectionEyebrow label={copy.experiencesEyebrow} />
          <h2 className={styles.sectionHeading}>{copy.experiencesHeading}</h2>

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
            {data.experiences.map((exp, index) => (
              <ExperienceCard
                key={index}
                category={exp.category}
                categoryLabel={exp.categoryLabel}
                title={exp.title}
                description={exp.description}
                highlights={exp.highlights}
                imageSrc={exp.imageSrc}
                imageAlt={exp.imageAlt}
              />
            ))}
          </motion.div>

          {data.activitiesNote && (
            <p className={styles.activitiesNote}>{data.activitiesNote}</p>
          )}
        </div>
      </section>

      {/* S3 — Services strip */}
      <AmenityStrip
        amenities={data.services.map((s) => ({ name: s.label || s.name, icon: s.icon }))}
      />

      {/* S4 — Map */}
      <section id="mapa" className={styles.mapSection}>
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
        imageSrc="https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@aeb78c1/pl/redondezas/rota-2.webp"
        imageAlt="Trilho dos Pescadores na Costa Vicentina"
        ctaLabel="Mais sobre a Rota Vicentina"
        ctaHref="https://rotavicentina.com/"
      />

      {/* S6 — Praias — BeachCard grid */}
      <section id="praias" className={styles.beachesSection}>
        <div className={styles.container}>
          <SectionEyebrow label={copy.beachesEyebrow} />
          <h2 className={styles.sectionHeading}>{copy.beachesHeading}</h2>

          <motion.div
            className={styles.beachesGrid}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08, delayChildren: 0.05 },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={viewport.default}
          >
            {data.beaches.map((beach, index) => (
              <BeachCard
                key={index}
                name={beach.name}
                distance={beach.distance}
                description={beach.description}
                imageSrc={beach.imageSrc}
                imageAlt={beach.imageAlt}
                mapUrl={beach.mapUrl}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* S7 — Parceiros — grouped logo grid */}
      <section id="parceiros" className={styles.parceirosSection}>
        <div className={styles.container}>
          <SectionEyebrow label={copy.parceirosEyebrow} />
          <h2 className={styles.sectionHeading}>{copy.parceirosHeading}</h2>

          {['comercial', 'institucional'].map((group) => (
            <motion.div
              key={group}
              className={styles.parceirosGrid}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.1 },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={viewport.default}
            >
              {data.parceiros
                .filter((partner) => partner.group === group)
                .map((partner, index) => (
                  <motion.a
                    key={index}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.partnerCard}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
                      },
                    }}
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className={styles.partnerLogo}
                      title={partner.name}
                      loading="lazy"
                    />
                  </motion.a>
                ))}
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default DescobrirPage;
