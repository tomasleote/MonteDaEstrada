import React from 'react';
import { PageHero, CategoryNav, SectionEyebrow } from '@touril-ecosystem/ui-components';
import Map from '@/components/Map';
import { useLocale } from '@/contexts/LocaleContext';
import ptData from '@/data/pt/contacto.json';
import enData from '@/data/en/contacto.json';
import styles from './ContactoPage.module.scss';

// CategoryNav anchor items — must match the section ids below
const getNavItems = (locale) => {
  const labels = {
    pt: { localizacao: 'Localização', contactos: 'Contactos' },
    en: { localizacao: 'Location', contactos: 'Contacts' },
  };
  const l = labels[locale] || labels.pt;
  return [
    { id: 'localizacao', label: l.localizacao },
    { id: 'contactos', label: l.contactos },
  ];
};

const ContactoPage = () => {
  const { locale } = useLocale();
  const data = locale === 'en' ? enData : ptData;
  const paragraphs = data.address.description.split('\n\n');
  const navItems = getNavItems(locale);

  return (
    <div className={styles.page}>
      <div id="contacto-hero">
        <PageHero
          imageSrc={data.hero.image}
          imageAlt={data.hero.imageAlt}
          eyebrow={data.hero.eyebrow}
          headline={data.hero.title}
          subtitle={data.hero.subtitle}
        />
      </div>

      <CategoryNav items={navItems} targetId="contacto-hero" headerHeight={88} />

      <section id="localizacao" className={styles.locationSection}>
        <div className={styles.locationContainer}>
          <SectionEyebrow label={locale === 'en' ? 'Location' : 'Localização'} />
          <h2 className={styles.locationHeading}>
            {locale === 'en' ? '2 km from Zambujeira do Mar' : '2 km da Zambujeira do Mar'}
          </h2>
          <div className={styles.locationText}>
            {paragraphs.map((paragraph, index) => (
              <p key={index} className={styles.locationParagraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section id="mapa" className={styles.mapSection}>
        <Map
          lat={data.map.lat}
          lng={data.map.lng}
          zoom={data.map.zoom}
        />
      </section>

      <section id="contactos" className={styles.contactSection}>
        <div className={styles.container}>
          <ul className={styles.detailsList}>
            <li className={styles.detailItem}>
              <span className={styles.detailLabel}>
                {locale === 'en' ? 'Phone' : 'Telefone'}
              </span>
              <a href="tel:+351960432223" className={styles.detailValue}>
                {data.contact.phoneDisplay}
              </a>
            </li>
            <li className={styles.detailItem}>
              <span className={styles.detailLabel}>Email</span>
              <a href="mailto:geral@montedopapaleguas.pt" className={styles.detailValue}>
                {data.contact.email}
              </a>
            </li>
            <li className={styles.detailItem}>
              <span className={styles.detailLabel}>GPS</span>
              <a
                href={data.contact.gpsLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.detailValue}
              >
                {data.contact.gpsCoords}
              </a>
            </li>
            {data.social?.facebook && (
              <li className={styles.detailItem}>
                <span className={styles.detailLabel}>Facebook</span>
                <a
                  href={data.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.detailValue}
                >
                  Monte do Papa Léguas
                </a>
              </li>
            )}
            {data.social?.instagram && (
              <li className={styles.detailItem}>
                <span className={styles.detailLabel}>Instagram</span>
                <a
                  href={data.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.detailValue}
                >
                  @montedopapaleguas
                </a>
              </li>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ContactoPage;
