import React, { useState, useMemo } from 'react';
import SEO from '@/components/SEO';
import Hero from '@/components/Hero';
import Lightbox from '@/components/Lightbox';
import { CategoryNav } from '@touril-ecosystem/ui-components';
import { ScrollReveal } from '@/motion';
import styles from './GaleriaPage.module.scss';
import galeriaData from '@/data/galeria.json';
import { seoConfig } from '@/utils/seo-config';
import { galeriaImages } from '@/assets/images/galeria';
import { homeImages } from '@/assets/images/home';
import { exteriorImages } from '@/assets/images/exterior';
import { descobrirImages } from '@/assets/images/descobrir';
import { descobrirAttractions } from '@/assets/images/redondezas';

// ── CategoryNav items ──────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'o-monte', label: 'O Monte' },
  { id: 'a-regiao', label: 'A Região' },
];

// ── Section editorial copy ─────────────────────────────────────
const SECTION_COPY = {
  oMonte: {
    eyebrow: 'GALERIA · O MONTE',
    title: 'O Espaço',
    body: 'Um monte alentejano recuperado com critério — jardins, piscina, terraços e o silêncio do campo a enquadrar cada momento.',
  },
  aRegiao: {
    eyebrow: 'GALERIA · A REGIÃO',
    title: 'O Território',
    body: 'A Costa Vicentina e o Alentejo Litoral: praias selvagens, vilas branqueadas a cal e uma natureza que impõe respeito.',
  },
};

const GaleriaPage = () => {
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // ── O Monte — estate images ────────────────────────────────
  const oMonteImages = useMemo(() => [
    ...galeriaImages.gallery,
    ...homeImages.gallery,
    ...exteriorImages.amenities,
  ], []);

  // ── A Região — territory images ────────────────────────────
  const aRegiaoImages = useMemo(() => [
    ...descobrirImages.beaches,
    ...descobrirImages.experiences,
    ...descobrirAttractions.attractions,
  ], []);

  const openLightbox = (images, index) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  return (
    <div className={styles.galeriaPage}>
      <SEO
        title={seoConfig.galeria.title}
        description={seoConfig.galeria.description}
        keywords={seoConfig.galeria.keywords}
        image={seoConfig.galeria.image}
      />

      {/* Hero — id used by CategoryNav to know when to appear */}
      <div id="galeria-hero">
        <Hero
          backgroundImage={galeriaData.hero.image}
          title={galeriaData.hero.title}
          subtitle={galeriaData.hero.subtitle}
          height="60vh"
        />
      </div>

      {/* Sticky sub-navigation */}
      <CategoryNav items={NAV_ITEMS} targetId="galeria-hero" headerHeight={72} />

      {/* ── O Monte ─────────────────────────────────────────── */}
      <section id="o-monte" className={styles.section}>
        <ScrollReveal>
          <header className={styles.sectionHeader}>
            <span className={styles.eyebrow}>{SECTION_COPY.oMonte.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{SECTION_COPY.oMonte.title}</h2>
            <p className={styles.sectionBody}>{SECTION_COPY.oMonte.body}</p>
          </header>
        </ScrollReveal>

        <div className={styles.masonryGrid}>
          {oMonteImages.map((image, index) => (
            <div
              key={`o-monte-${index}`}
              className={styles.masonryItem}
              onClick={() => openLightbox(oMonteImages, index)}
              role="button"
              tabIndex={0}
              aria-label={`Ver imagem: ${image.title || image.alt}`}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(oMonteImages, index)}
            >
              <img
                src={image.src}
                alt={image.alt || image.title || 'Monte da Estrada'}
                loading="lazy"
                className={styles.masonryImage}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── A Região ─────────────────────────────────────────── */}
      <section id="a-regiao" className={`${styles.section} ${styles.sectionAlt}`}>
        <ScrollReveal>
          <header className={styles.sectionHeader}>
            <span className={styles.eyebrow}>{SECTION_COPY.aRegiao.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{SECTION_COPY.aRegiao.title}</h2>
            <p className={styles.sectionBody}>{SECTION_COPY.aRegiao.body}</p>
          </header>
        </ScrollReveal>

        <div className={styles.masonryGrid}>
          {aRegiaoImages.map((image, index) => (
            <div
              key={`a-regiao-${index}`}
              className={styles.masonryItem}
              onClick={() => openLightbox(aRegiaoImages, index)}
              role="button"
              tabIndex={0}
              aria-label={`Ver imagem: ${image.title || image.alt}`}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(aRegiaoImages, index)}
            >
              <img
                src={image.src}
                alt={image.alt || image.title || 'A Região'}
                loading="lazy"
                className={styles.masonryImage}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox — section-scoped images */}
      <Lightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
      />
    </div>
  );
};

export default GaleriaPage;
