import React from 'react';
import { motion } from 'motion/react';
import SEO from '@/components/SEO';
import Map from '@/components/Map';
import ContactForm from '@/components/ContactForm';
import {
  PageHero,
  SectionEyebrow,
  EditorialPullQuote,
  viewport,
  variants,
  stagger,
} from '@touril-ecosystem/ui-components';
import { useLocale } from '@/contexts/LocaleContext';
import { getData } from '@/data/dataLoader';
import { homeImages } from '@/data/homeImages';
import styles from './ContactoPage.module.scss';

const contactStructuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Monte da Estrada",
  "image": "https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@495a0e9/mde/home/home-property-view-05.webp",
  "url": "https://montedaestrada.com/contacto",
  "telephone": "+351960254072",
  "email": "geral@montedaestrada.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Malhadil",
    "addressLocality": "Zambujeira do Mar",
    "postalCode": "7630-611",
    "addressRegion": "Alentejo",
    "addressCountry": "PT"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 37.5884155,
    "longitude": -8.7782957
  }
};

const contactCopy = {
  pt: {
    heroImageAlt: 'Vista panorâmica da paisagem alentejana',
    heroHeadline: 'Planeie a sua visita.',
    heroSubtitle: 'Estamos cá para ajudar — de segunda a domingo.',
    contactEyebrow: 'Contacto',
    contactHeading: 'Estamos aqui para ajudar.',
    contactIntro: 'Respondemos a todas as mensagens em menos de 24 horas. Para reservas com datas próximas, preferimos o telefone ou WhatsApp.',
    mapEyebrow: 'Localização',
    mapHeading: 'Encontre-nos.',
    directionsEyebrow: 'Como Chegar',
  },
  en: {
    heroImageAlt: 'Panoramic view of the Alentejo landscape',
    heroHeadline: 'Plan your visit.',
    heroSubtitle: 'We\'re here to help — Monday through Sunday.',
    contactEyebrow: 'Contact',
    contactHeading: 'We\'re here to help.',
    contactIntro: 'We respond to all messages within 24 hours. For reservations with upcoming dates, we prefer phone or WhatsApp.',
    mapEyebrow: 'Location',
    mapHeading: 'Find us.',
    directionsEyebrow: 'How to Get Here',
  },
};

const ContactoPage = () => {
  const { locale } = useLocale();
  const localizacaoData = getData('localizacao', locale);
  const copy = contactCopy[locale] || contactCopy.pt;

  const directions = [
    localizacaoData?.directions?.fromLisbon,
    localizacaoData?.directions?.fromFaro,
    localizacaoData?.directions?.fromPorto,
  ].filter(Boolean);

  return (
    <div className={styles.page}>
      <SEO
        title={copy.contactEyebrow}
        description={locale === 'en'
          ? 'Plan your visit to Monte da Estrada. We are here to help — reservations, questions, or just to say hello. See how to get here from Lisbon, Porto, or Faro.'
          : 'Planeie a sua visita ao Monte da Estrada. Estamos aqui para ajudar — reservas, perguntas ou simplesmente olá. Veja como chegar de Lisboa, Porto ou Faro.'}
        keywords={locale === 'en'
          ? 'contact, reservations, how to get here, monte da estrada, alentejo, zambujeira do mar'
          : 'contacto, reservas, como chegar, monte da estrada, alentejo, zambujeira do mar'}
        image="https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@495a0e9/mde/descobrir/costavicentina.webp"
        locale={locale}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactStructuredData) }} />

      {/* S1 — Page Hero */}
      <PageHero
        imageSrc={homeImages.gallery[1].src}
        imageAlt={copy.heroImageAlt}
        eyebrow={copy.contactEyebrow}
        headline={copy.heroHeadline}
        subtitle={copy.heroSubtitle}
      />

      {/* S2 — Contact Grid */}
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>

            {/* Left — Contact info */}
            <motion.div
              className={styles.contactInfo}
              variants={variants.fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport.default}
            >
              <SectionEyebrow label={copy.contactEyebrow} />
              <h2 className={styles.sectionHeading}>
                {copy.contactHeading}
              </h2>
              <p className={styles.contactIntro}>
                {copy.contactIntro}
              </p>

              <ul className={styles.contactDetails}>
                <li className={styles.contactItem}>
                  <span className={styles.contactLabel}>{locale === 'en' ? 'Phone / WhatsApp' : 'Telefone / WhatsApp'}</span>
                  <a
                    href="tel:+351960254072"
                    className={styles.contactValue}
                  >
                    +351 960 254 072
                  </a>
                </li>
                <li className={styles.contactItem}>
                  <span className={styles.contactLabel}>Email</span>
                  <a
                    href="mailto:montedaestradazambujeiradomar@gmail.com"
                    className={styles.contactValue}
                  >
                    montedaestradazambujeiradomar@gmail.com
                  </a>
                </li>
                <li className={styles.contactItem}>
                  <span className={styles.contactLabel}>{locale === 'en' ? 'Address' : 'Morada'}</span>
                  <address className={styles.contactAddress}>
                    {localizacaoData?.address?.name || 'Monte da Estrada'}<br />
                    {localizacaoData?.address?.street}<br />
                    {localizacaoData?.address?.postalCode} {localizacaoData?.address?.city}<br />
                    {localizacaoData?.address?.region}, {localizacaoData?.address?.country}
                  </address>
                </li>
                <li className={styles.contactItem}>
                  <span className={styles.contactLabel}>Check-in / Check-out</span>
                  <span className={styles.contactValue}>15h00 / 12h00</span>
                </li>
              </ul>
            </motion.div>

            {/* Right — Contact form */}
            <motion.div
              className={styles.contactFormWrapper}
              variants={variants.fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport.default}
              transition={{ delay: 0.15 }}
            >
              <ContactForm />
            </motion.div>

          </div>
        </div>
      </section>

      {/* S3 — Map / Localização */}
      <section className={styles.mapSection}>
        <div className={styles.container}>
          <motion.div
            variants={variants.fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport.default}
          >
            <SectionEyebrow label={copy.mapEyebrow} />
            <h2 className={styles.sectionHeadingLight}>
              {copy.mapHeading}
            </h2>
          </motion.div>
          <motion.div
            className={styles.mapWrapper}
            variants={variants.fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewport.default}
            transition={{ delay: 0.2 }}
          >
            <Map
              latitude={localizacaoData?.address?.coordinates?.latitude || 37.5882284}
              longitude={localizacaoData?.address?.coordinates?.longitude || -8.7782661}
              title="Monte da Estrada, Zambujeira do Mar"
              height="480px"
            />
          </motion.div>
        </div>
      </section>

      {/* S4 — Directions */}
      <section className={styles.directionsSection}>
        <div className={styles.container}>
          <motion.div
            variants={variants.fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport.default}
          >
            <SectionEyebrow label={copy.directionsEyebrow} />
            <h2 className={styles.sectionHeading}>
              {localizacaoData?.directions?.title || 'Como Chegar'}
            </h2>
          </motion.div>

          <motion.div
            className={styles.directionsGrid}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: stagger.default,
                  delayChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={viewport.default}
          >
            {directions.map((direction, index) => (
              <motion.div
                key={index}
                className={styles.directionPanel}
                variants={variants.fadeUp}
              >
                <h3 className={styles.directionCity}>{direction.title}</h3>
                <p className={styles.directionMeta}>
                  <span className={styles.directionMetaItem}>{direction.distance}</span>
                  <span className={styles.directionMetaDivider}>·</span>
                  <span className={styles.directionMetaItem}>{direction.duration}</span>
                </p>
                <ol className={styles.routeList}>
                  {direction.route.map((step, i) => (
                    <li key={i} className={styles.routeStep}>{step}</li>
                  ))}
                </ol>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default ContactoPage;
