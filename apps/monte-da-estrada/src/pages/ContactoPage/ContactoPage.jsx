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
import { homeImages } from '@/assets/images/home';
import localizacaoData from '@/data/localizacao.json';
import styles from './ContactoPage.module.scss';

const ContactoPage = () => {
  const directions = [
    localizacaoData.directions.fromLisbon,
    localizacaoData.directions.fromFaro,
    localizacaoData.directions.fromPorto,
  ];

  return (
    <div className={styles.page}>
      <SEO
        title="Contacto"
        description="Planeie a sua visita ao Monte da Estrada. Estamos aqui para ajudar — reservas, perguntas ou simplesmente olá. Veja como chegar de Lisboa, Porto ou Faro."
        keywords="contacto, reservas, como chegar, monte da estrada, alentejo, zambujeira do mar"
        image="/images/hero-localizacao.jpg"
      />

      {/* S1 — Page Hero ─────────────────────────────────────── */}
      <PageHero
        imageSrc={homeImages.gallery[1].src}
        imageAlt={homeImages.gallery[1].alt}
        eyebrow="Contacto"
        headline="Planeie a sua visita."
        subtitle="Estamos cá para ajudar — de segunda a domingo."
      />

      {/* S2 — Contact Grid ───────────────────────────────────── */}
      {/* Left: contact info (eyebrow + H2 + details). Right: form. */}
      {/* Cream background. No Section wrapper — direct HTML like DescobrirPage. */}
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
              <SectionEyebrow label="Contacto" />
              <h2 className={styles.sectionHeading}>
                Estamos aqui para ajudar.
              </h2>
              <p className={styles.contactIntro}>
                Respondemos a todas as mensagens em menos de 24 horas.
                Para reservas com datas próximas, preferimos o telefone
                ou WhatsApp.
              </p>

              <ul className={styles.contactDetails}>
                <li className={styles.contactItem}>
                  <span className={styles.contactLabel}>Telefone / WhatsApp</span>
                  <a
                    href={`tel:${localizacaoData.address.phone || '+351960254072'}`}
                    className={styles.contactValue}
                  >
                    {localizacaoData.address.phone || '+351 960 254 072'}
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
                  <span className={styles.contactLabel}>Morada</span>
                  <address className={styles.contactAddress}>
                    {localizacaoData.address.name}<br />
                    {localizacaoData.address.street}<br />
                    {localizacaoData.address.postalCode} {localizacaoData.address.city}<br />
                    {localizacaoData.address.region}, {localizacaoData.address.country}
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

      {/* S4 — Map / Localização (Deep Brown) ─────────────────── */}
      {/* Dark background reversal — same pattern as Redondezas on DescobrirPage. */}
      {/* SectionEyebrow renders in clay, which reads well on deep brown. */}
      <section className={styles.mapSection}>
        <div className={styles.container}>
          <motion.div
            variants={variants.fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport.default}
          >
            <SectionEyebrow label="Localização" />
            <h2 className={styles.sectionHeadingLight}>
              Encontre-nos.
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
              latitude={localizacaoData.address.coordinates.latitude}
              longitude={localizacaoData.address.coordinates.longitude}
              title={`Mapa — ${localizacaoData.address.street}, ${localizacaoData.address.city}`}
              height="480px"
            />
          </motion.div>
        </div>
      </section>

      {/* S5 — Directions (Sand) ──────────────────────────────── */}
      {/* Sand background ($color-sand) — lighter than cream, warmer than off-white. */}
      {/* Direction panels replace <Card>: minimal, architectural, no fills. */}
      <section className={styles.directionsSection}>
        <div className={styles.container}>
          <motion.div
            variants={variants.fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport.default}
          >
            <SectionEyebrow label="Como Chegar" />
            <h2 className={styles.sectionHeading}>
              {localizacaoData.directions.title}
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
                  <span className={styles.directionMetaItem}>
                    {direction.distance}
                  </span>
                  <span className={styles.directionMetaDivider}>·</span>
                  <span className={styles.directionMetaItem}>
                    {direction.duration}
                  </span>
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
