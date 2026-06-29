import React, { useState, useMemo } from 'react';
import SEO from '@/components/SEO';
import Lightbox from '@/components/Lightbox';
import { CategoryNav, PageHero } from '@touril-ecosystem/ui-components';
import { ScrollReveal } from '@/motion';
import { useLocale } from '@/contexts/LocaleContext';
import { getData } from '@/data/dataLoader';
import { homeImages } from '@/data/homeImages';
import styles from './GaleriaPage.module.scss';

// Local static image imports replaced by CDN URLs
const QUARTOS_CDN = 'https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@15d5b6f/mde/quartos';
const HOME_CDN = 'https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@42b901a/mde/home';

// ── Section editorial copy ─────────────────────────────────────
const getSectionCopy = (locale) => {
  const copy = {
    pt: {
      oMonte: {
        eyebrow: 'GALERIA · O MONTE',
        title: 'O Monte',
        body: 'Um monte alentejano recuperado com critério — jardins, terraços e o silêncio do campo a enquadrar cada momento.',
      },
      aRegiao: {
        eyebrow: 'GALERIA · A REGIÃO',
        title: 'O Território',
        body: 'A Costa Vicentina e o Alentejo Litoral: praias selvagens, vilas branqueadas a cal e uma natureza que impõe respeito.',
      },
    },
    en: {
      oMonte: {
        eyebrow: 'GALLERY · THE ESTATE',
        title: 'The Monte',
        body: 'A restored Alentejo monte — gardens, terraces, and the silence of the countryside framing every moment.',
      },
      aRegiao: {
        eyebrow: 'GALLERY · THE REGION',
        title: 'The Territory',
        body: 'The Costa Vicentina and the Coastal Alentejo: wild beaches, whitewashed villages, and nature that commands respect.',
      },
    },
  };
  return copy[locale] || copy.pt;
};

const getNavItems = (locale) => {
  const labels = {
    pt: { oMonte: 'O Monte', aRegiao: 'A Região' },
    en: { oMonte: 'The Estate', aRegiao: 'The Region' },
  };
  const l = labels[locale] || labels.pt;
  return [
    { id: 'o-monte', label: l.oMonte },
    { id: 'a-regiao', label: l.aRegiao },
  ];
};

const GaleriaPage = () => {
  const { locale } = useLocale();
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const galeriaData = getData('galeria', locale);
  const descobrirData = getData('descobrir', locale);
  const sectionCopy = getSectionCopy(locale);
  const navItems = getNavItems(locale);

  // ── O Monte — estate images ────────────────────────────────
  const oMonteImages = useMemo(() => [
    // Exterior
    { src: `${HOME_CDN}/monte-exterior-1.jpeg`, alt: 'Monte da Estrada - Vista exterior da propriedade', title: 'Exterior' },
    { src: `${HOME_CDN}/monte-exterior-2.jpeg`, alt: 'Monte da Estrada - Vista exterior da propriedade', title: 'Exterior' },
    { src: `${HOME_CDN}/monte-exterior-3.jpeg`, alt: 'Monte da Estrada - Vista exterior da propriedade', title: 'Exterior' },
    { src: `${HOME_CDN}/monte-exterior-4.jpeg`, alt: 'Monte da Estrada - Vista exterior da propriedade', title: 'Exterior' },
    { src: `${HOME_CDN}/monte-exterior-5.jpg`, alt: 'Monte da Estrada - Vista exterior da propriedade', title: 'Exterior' },
    { src: `${HOME_CDN}/monte-exterior-6.jpeg`, alt: 'Monte da Estrada - Vista exterior da propriedade', title: 'Exterior' },
    { src: `${HOME_CDN}/monte-exterior-7.jpeg`, alt: 'Monte da Estrada - Vista exterior da propriedade', title: 'Exterior' },
    { src: `${HOME_CDN}/home-hero-monte-exterior.webp`, alt: 'Monte da Estrada - Exterior panorâmico da propriedade', title: 'Exterior' },
    { src: `${HOME_CDN}/home-property-view-01.webp`, alt: 'Monte da Estrada - Vista exterior da entrada principal', title: 'Exterior' },
    { src: `${HOME_CDN}/home-property-view-05.webp`, alt: 'Monte da Estrada - Vista panorâmica da propriedade', title: 'Exterior' },
    { src: `${HOME_CDN}/home-property-view-08.webp`, alt: 'Monte da Estrada - Vista da propriedade ao pôr do sol', title: 'Exterior' },
    { src: `${QUARTOS_CDN}/exterior-1.jpeg`, alt: 'Monte da Estrada - Vista exterior do edifício alentejano', title: 'Exterior' },
    // Quartos
    { src: `${HOME_CDN}/quarto-2.webp`, alt: 'Monte da Estrada - Quarto com decoração alentejana', title: 'Quarto' },
    { src: `${QUARTOS_CDN}/quarto-1.webp`, alt: 'Monte da Estrada - Sala estúdio e zonas comuns', title: 'Quarto' },
    { src: `${QUARTOS_CDN}/quarto-2.webp`, alt: 'Monte da Estrada - Quarto com decoração tradicional alentejana', title: 'Quarto' },
    { src: `${QUARTOS_CDN}/quarto-3.webp`, alt: 'Monte da Estrada - Pormenores e arquitetura de charme', title: 'Quarto' },
    { src: `${QUARTOS_CDN}/quarto-4.webp`, alt: 'Monte da Estrada - Luminosidade e conforto nos quartos', title: 'Quarto' },
    { src: `${QUARTOS_CDN}/quarto-wc.webp`, alt: 'Monte da Estrada - Casa de banho privativa moderna', title: 'Casa de Banho' },
    // Salas & Receção
    { src: homeImages.sala5.src, alt: homeImages.sala5.alt, title: homeImages.sala5.title },
    { src: `${HOME_CDN}/sala-2.webp`, alt: 'Monte da Estrada - Sala de estar e repouso', title: 'Sala' },
    { src: homeImages.sala3.src, alt: homeImages.sala3.alt, title: homeImages.sala3.title },
    { src: `${HOME_CDN}/sala-6.jpeg`, alt: 'Monte da Estrada - Espaços comuns da propriedade', title: 'Sala' },
    { src: homeImages.recepcao2.src, alt: homeImages.recepcao2.alt, title: homeImages.recepcao2.title },
    { src: `${HOME_CDN}/recepcao-1.webp`, alt: 'Monte da Estrada - Zona de receção e acolhimento', title: 'Receção' },
    // Pormenores
    { src: homeImages.pormenor2.src, alt: homeImages.pormenor2.alt, title: homeImages.pormenor2.title },
    { src: `${HOME_CDN}/pormenor-1.webp`, alt: 'Monte da Estrada - Pormenores de arquitetura alentejana', title: 'Pormenor' },
    { src: `${HOME_CDN}/pormenor-3.webp`, alt: 'Monte da Estrada - Detalhes e acabamentos da propriedade', title: 'Pormenor' },
    // Pequeno-almoço
    { src: `${HOME_CDN}/breakfast-1.jpeg`, alt: 'Monte da Estrada - Pequeno-almoço regional alentejano', title: 'Pequeno-almoço' },
    { src: `${HOME_CDN}/breakfast-2.jpeg`, alt: 'Monte da Estrada - Pequeno-almoço com produtos locais', title: 'Pequeno-almoço' },
  ], []);

  // ── A Região — territory images ────────────────────────────
  const aRegiaoImages = useMemo(() => [
    ...descobrirData.beaches.map(b => ({ src: b.imageSrc, alt: b.imageAlt || b.name, title: b.name })),
    ...descobrirData.experiences.map(e => ({ src: e.imageSrc, alt: e.imageAlt || e.title, title: e.title })),
    ...descobrirData.attractions
      .filter(a => a.imageSrc !== null)
      .map(a => ({ src: a.imageSrc, alt: a.imageAlt || a.title, title: a.title })),
  ], [descobrirData]);

  const openLightbox = (images, index) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  return (
    <div className={styles.galeriaPage}>
      <SEO
        title={locale === 'en' ? 'Gallery' : 'Galeria'}
        description={locale === 'en'
          ? 'The estate and the territory: Monte da Estrada, the Costa Vicentina, and the natural beauty of Alentejo.'
          : 'O monte e o território: Monte da Estrada, a Costa Vicentina, e a beleza natural do Alentejo.'}
        locale={locale}
      />

      {/* Hero — id used by CategoryNav to know when to appear */}
      <div id="galeria-hero">
        <PageHero
          imageSrc={galeriaData?.hero?.image}
          imageAlt={galeriaData?.hero?.alt}
          headline={galeriaData?.hero?.title}
          subtitle={galeriaData?.hero?.subtitle}
        />
      </div>

      {/* Sticky sub-navigation */}
      <CategoryNav items={navItems} targetId="galeria-hero" headerHeight={88} />

      {/* ── O Monte ─────────────────────────────────────────── */}
      <section id="o-monte" className={styles.section}>
        <ScrollReveal>
          <header className={styles.sectionHeader}>
            <span className={styles.eyebrow}>{sectionCopy.oMonte.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{sectionCopy.oMonte.title}</h2>
            <p className={styles.sectionBody}>{sectionCopy.oMonte.body}</p>
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
            <span className={styles.eyebrow}>{sectionCopy.aRegiao.eyebrow}</span>
            <h2 className={styles.sectionTitle}>{sectionCopy.aRegiao.title}</h2>
            <p className={styles.sectionBody}>{sectionCopy.aRegiao.body}</p>
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
