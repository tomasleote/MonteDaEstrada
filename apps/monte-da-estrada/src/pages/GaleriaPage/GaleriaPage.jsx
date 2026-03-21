import React, { useState, useMemo } from 'react';
import SEO from '@/components/SEO';
import Lightbox from '@/components/Lightbox';
import { CategoryNav, PageHero } from '@touril-ecosystem/ui-components';
import { ScrollReveal } from '@/motion';
import styles from './GaleriaPage.module.scss';
import galeriaData from '@/data/galeria.json';
import { seoConfig } from '@/utils/seo-config';
import { homeImages } from '@/data/homeImages';
import descobrirData from '@/data/descobrir';

// Local static image imports replaced by CDN URLs
const QUARTOS_CDN = 'https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@495a0e9/mde/quartos';

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
    body: 'Um monte alentejano recuperado com critério — jardins, terraços e o silêncio do campo a enquadrar cada momento.',
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
  // TODO: placeholder/test data — duplicate srcs are intentional for layout testing
  const oMonteImages = useMemo(() => [
    { src: `${QUARTOS_CDN}/exterior-1.jpeg`, alt: 'Monte da Estrada Exterior' },
    { src: `${QUARTOS_CDN}/exterior-1.jpeg`, alt: 'Exterior do Monte' },
    { src: `${QUARTOS_CDN}/quarto-1.webp`, alt: 'Sala de Estar - Perspetiva 1' },
    { src: `${QUARTOS_CDN}/quarto-2.webp`, alt: 'Sala de Estar - Perspetiva 2' },
    { src: `${QUARTOS_CDN}/quarto-3.webp`, alt: 'Detalhe Casa' },
    { src: `${QUARTOS_CDN}/quarto-4.webp`, alt: 'Recepção - Perspetiva 1' },
    { src: `${QUARTOS_CDN}/quarto-wc.webp`, alt: 'Recepção - Perspetiva 2' },
    { src: `${QUARTOS_CDN}/quarto-1.webp`, alt: 'Detalhe Interior 3' },
    { src: `${QUARTOS_CDN}/quarto-2.webp`, alt: 'Detalhe Interior 1' },
    { src: `${QUARTOS_CDN}/quarto-3.webp`, alt: 'Exterior do Monte 2' },
    { src: `${QUARTOS_CDN}/exterior-1.jpeg`, alt: 'Exterior do Monte 1' },
    { src: `${QUARTOS_CDN}/quarto-4.webp`, alt: 'Sala de Estar - Perspetiva 3' },
  ], []);

  // ── A Região — territory images ────────────────────────────
  const aRegiaoImages = useMemo(() => [
    ...descobrirData.beaches.map(b => ({ src: b.imageSrc, alt: b.imageAlt || b.name, title: b.name })),
    ...descobrirData.experiences.map(e => ({ src: e.imageSrc, alt: e.imageAlt || e.title, title: e.title })),
    ...descobrirData.attractions
      .filter(a => a.imageSrc !== null)
      .map(a => ({ src: a.imageSrc, alt: a.imageAlt || a.title, title: a.title })),
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
        <PageHero
          imageSrc={galeriaData.hero.image}
          imageAlt={galeriaData.hero.alt}
          headline={galeriaData.hero.title}
          subtitle={galeriaData.hero.subtitle}
        />
      </div>

      {/* Sticky sub-navigation */}
      <CategoryNav items={NAV_ITEMS} targetId="galeria-hero" headerHeight={88} />

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
