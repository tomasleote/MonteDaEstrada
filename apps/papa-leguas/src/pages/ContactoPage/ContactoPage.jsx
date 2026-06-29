import React from 'react';
import { PageHero, EditorialSplitSection } from '@touril-ecosystem/ui-components';
import Map from '@/components/Map';
import ContactForm from '@/components/ContactForm';
import { useLocale } from '@/contexts/LocaleContext';
import ptData from '@/data/pt/contacto.json';
import enData from '@/data/en/contacto.json';
import styles from './ContactoPage.module.scss';

const ContactoPage = () => {
  const { locale } = useLocale();
  const data = locale === 'en' ? enData : ptData;

  return (
    <div className={styles.page}>
      <PageHero
        imageSrc={data.hero.image}
        imageAlt={data.hero.imageAlt}
        eyebrow={data.hero.eyebrow}
        headline={data.hero.title}
        subtitle={data.hero.subtitle}
      />

      <EditorialSplitSection
        eyebrow="Localização"
        heading="2 km da Zambujeira do Mar"
        body={data.address.description}
        imageSrc={data.hero.image}
        imageAlt={data.hero.imageAlt}
        imagePosition="right"
      />

      {data.address.nearbyBeaches && (
        <div className={styles.nearbyContainer}>
          <p className={styles.nearbyText}>{data.address.nearbyBeaches}</p>
        </div>
      )}

      <section className={styles.mapSection}>
        <Map
          lat={data.map.lat}
          lng={data.map.lng}
          zoom={data.map.zoom}
        />
      </section>

      <section className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>
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

            <div className={styles.formWrapper}>
              <ContactForm
                email="geral@montedopapaleguas.pt"
                formLabels={data.form}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactoPage;
