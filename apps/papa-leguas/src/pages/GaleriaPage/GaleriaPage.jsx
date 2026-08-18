import React, { useState } from 'react';
import { PageHero } from '@touril-ecosystem/ui-components';
import Lightbox from '@/components/Lightbox';
import { galeriaImages } from '@/data/galeriaImages';
import { useLocale } from '@/contexts/LocaleContext';
import styles from './GaleriaPage.module.scss';

const heroCopy = {
  pt: {
    eyebrow: 'Galeria',
    title: 'Monte do Papa Léguas',
    subtitle: 'Explore a beleza e autenticidade do Monte do Papa-Léguas no Sudoeste Alentejano.',
    imageAlt: 'Piscina exterior do Monte do Papa Léguas',
  },
  en: {
    eyebrow: 'Gallery',
    title: 'Monte do Papa Léguas',
    subtitle: 'Explore the beauty and authenticity of Monte do Papa-Léguas in the Southwest Alentejo.',
    imageAlt: 'Outdoor pool at Monte do Papa Léguas',
  },
};

const HERO_IMAGE =
  'https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@aeb78c1/pl/galeria/piscina-1.webp';

const GaleriaPage = () => {
  const { locale } = useLocale();
  const hero = heroCopy[locale] || heroCopy.pt;
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className={styles.galeriaPage}>
      <PageHero
        imageSrc={HERO_IMAGE}
        imageAlt={hero.imageAlt}
        eyebrow={hero.eyebrow}
        headline={hero.title}
        subtitle={hero.subtitle}
      />

      <section className={styles.section}>
        <div className={styles.masonryGrid}>
          {galeriaImages.map((image, index) => (
            <div
              key={index}
              className={styles.masonryItem}
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              aria-label={`Ver imagem: ${image.caption || image.alt}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter') openLightbox(index);
                if (e.key === ' ') {
                  e.preventDefault();
                  openLightbox(index);
                }
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className={styles.masonryImage}
              />
            </div>
          ))}
        </div>
      </section>

      <Lightbox
        images={galeriaImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};

export default GaleriaPage;
