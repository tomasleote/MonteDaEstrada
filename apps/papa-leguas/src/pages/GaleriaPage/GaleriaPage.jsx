import React, { useState } from 'react';
import { PageHero } from '@touril-ecosystem/ui-components';
import Lightbox from '@/components/Lightbox';
import { galeriaImages } from '@/data/galeriaImages';
import { useLocale } from '@/contexts/LocaleContext';
import ptData from '@/data/pt/galeria.json';
import enData from '@/data/en/galeria.json';
import styles from './GaleriaPage.module.scss';

const GaleriaPage = () => {
  const { locale } = useLocale();
  const data = locale === 'en' ? enData : ptData;
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className={styles.galeriaPage}>
      <PageHero
        imageSrc={data.hero.image}
        imageAlt={data.hero.imageAlt || data.hero.title}
        eyebrow={data.hero.eyebrow}
        headline={data.hero.title}
        subtitle={data.hero.subtitle}
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
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
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
