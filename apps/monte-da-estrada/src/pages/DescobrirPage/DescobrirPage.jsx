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
import { useLocale } from '@/contexts/LocaleContext';
import { getData } from '@/data/dataLoader';
import { descobrirCopy } from '@/locales/descobrir';
import mapLocations from '@/data/map-locations';
import useMobileQuery from '@/hooks/useMobileQuery';

import styles from './DescobrirPage.module.scss';

// ──────────────────────────────────────────────
// CategoryNav anchor items — 4 acts
// ──────────────────────────────────────────────

const getNavItems = (locale) => {
  const labels = {
    pt: { mapa: 'Mapa', experiencias: 'Experiências', praias: 'Praias', parceiros: 'Parceiros' },
    en: { mapa: 'Map', experiencias: 'Experiences', praias: 'Beaches', parceiros: 'Partners' },
  };
  const l = labels[locale] || labels.pt;
  return [
    { id: 'mapa', label: l.mapa },
    { id: 'experiencias', label: l.experiencias },
    { id: 'praias', label: l.praias },
    { id: 'parceiros', label: l.parceiros },
  ];
};

// ──────────────────────────────────────────────
// Page component
// ──────────────────────────────────────────────

const DescobrirPage = () => {
  const isMobile = useMobileQuery();
  const { locale } = useLocale();
  const descobrirData = getData('descobrir', locale);
  const copy = descobrirCopy[locale] || descobrirCopy.pt;
  const navItems = getNavItems(locale);

  return (
    <div className={styles.page}>
      <SEO
        title={locale === 'en' ? 'Discover' : 'Descobrir'}
        description={locale === 'en'
          ? 'Explore the territory around Monte da Estrada: Costa Vicentina beaches, Rota Vicentina trails, historic villages, and the unique landscape of inland Alentejo.'
          : 'Explore o território à volta do Monte da Estrada: praias da Costa Vicentina, trilhos da Rota Vicentina, vilas históricas e a paisagem única do Alentejo interior.'}
        keywords={locale === 'en'
          ? 'discover, alentejo, costa vicentina, rota vicentina, zambujeira do mar, activities, surroundings, monte da estrada'
          : 'descobrir, alentejo, costa vicentina, rota vicentina, zambujeira do mar, atividades, redondezas, monte da estrada'}
        image="https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@15d5b6f/mde/descobrir/herodescobrir%20(1).webp"
        locale={locale}
      />

      {/* S1 — PageHero ──────────────────────────────────────── */}
      <div id="discovery-hero">
        <PageHero
          imageSrc="https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@15d5b6f/mde/descobrir/herodescobrir%20(1).webp"
          imageAlt={copy.heroImageAlt}
          eyebrow={copy.territorioEyebrow}
          headline={copy.heroHeadline}
          subtitle={copy.heroSubtitle}
        />
      </div>

      {/* S2 — CategoryNav (sticky) ───────────────────────────────── */}
      <CategoryNav
        items={navItems}
        targetId="discovery-hero"
        headerHeight={88}
      />

      {/* S3 — O Território — EditorialSplitSection ───────────────── */}
      <EditorialSplitSection
        className={styles.territorioSection}
        eyebrow={copy.territorioEyebrow}
        heading={copy.territorioHeading}
        body={copy.territorioBody}
        imageSrc="https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@15d5b6f/mde/descobrir/costavicentina.webp"
        imageAlt={copy.territorioImageAlt}
        imagePosition="right"
      />

      {/* S3.5 — Discovery Map ─────────────────────────────────────── */}
      <section id="mapa" className={styles.mapSection}>
        <DiscoveryMap locations={mapLocations} />
      </section>

      {/* S4 — Experiências — ExperienceCard grid ─────────────────── */}
      <section id="experiencias" className={styles.experiencesSection}>
        <div className={styles.container}>
          <SectionEyebrow label={copy.experienciasEyebrow} />
          <h2 className={styles.sectionHeading}>{copy.experienciasHeading}</h2>

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
            {descobrirData.experiences.map((exp, index) => (
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
        </div>
      </section>

      {/* S5 — EditorialPullQuote ──────────────────────────────────── */}
      <EditorialPullQuote
        quote={copy.pullQuote}
        attribution={copy.pullQuoteAttribution}
        background="cream"
      />

      {/* S6 — FullBleedQuote ─────────────────────────────────────── */}
      <FullBleedQuote
        imageSrc={descobrirData.beaches[4]?.imageSrc || "https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@15d5b6f/mde/home/home-property-view-05.webp"}
        alt={copy.fullBleedQuote}
        quote={copy.fullBleedQuote}
        attribution={copy.fullBleedAttribution}
      />

      {/* S7 — Praias — BeachCard grid ────────────────────────────── */}
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
            {descobrirData.beaches.map((beach, index) => (
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

      {/* S8 — Parceiros — Grid of partner logos ────────────────────────────── */}
      <section id="parceiros" className={styles.parceirosSection}>
        <div className={styles.container}>
          <SectionEyebrow label={copy.parceirosEyebrow} />
          <h2 className={styles.sectionHeading}>{copy.parceirosHeading}</h2>

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
                  alt={`${partner.name}`}
                  className={styles.partnerLogo}
                  title={partner.name}
                  loading="lazy"
                />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* S9 — BookingSection ──────────────────────────────────────── */}
      <div className={styles.bookingSection}>
        <BookingSection
          eyebrow={copy.bookingEyebrow}
          heading={copy.bookingHeading}
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
