import React from 'react';
import SEO from '@/components/SEO';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Button from '@/components/Button';
import { RoomCardGallery } from '@touril-ecosystem/ui-components';
import styles from './QuartosPage.module.scss';
import { quartosImages } from '@/assets/images/quartos';
import { seoConfig } from '@/utils/seo-config';

/**
 * Room data for the RoomCardGallery component.
 * Each room maps real images from the quartos assets folder
 * to the expected data shape.
 */
const rooms = [
  {
    roomId: 'room-suite-deluxe',
    title: 'Suite Deluxe',
    subtitle: 'A melhor suite do Monte da Estrada onde o conforto e a elegância se encontram. Amplas janelas tornam a natureza protagonista, com vista panorâmica sobre o Alentejo.',
    image: quartosImages.rooms[4].src,
    imageAlt: quartosImages.rooms[4].alt,
    description: `
      <p><strong>Luxo e natureza em perfeita harmonia. A Suite Deluxe é o nosso espaço mais exclusivo, onde cada detalhe foi pensado para proporcionar uma experiência inesquecível.</strong></p>
      <ul>
        <li>Suite espaçosa (35 m²) com sala de estar integrada</li>
        <li>Terraço privado panorâmico com mobiliário premium</li>
        <li>Vista 360° sobre a paisagem alentejana</li>
        <li>Decoração de autor com peças de artesanato local</li>
        <li>1 cama King Size (200cm x 200cm)</li>
        <li>Roupa de cama egípcia 100% algodão (400 fios)</li>
        <li>Casa de banho completa com banheira e chuveiro</li>
        <li>Amenities premium de casa de banho</li>
        <li>Acesso Wi-Fi gratuito de alta velocidade</li>
        <li>Ar condicionado e aquecimento central</li>
        <li>Minibar com seleção regional</li>
      </ul>
      <p><strong>"Incluído:"</strong></p>
      <ul>
        <li>Pequeno-almoço gourmet regional</li>
        <li>Acesso à piscina exterior e jardins</li>
        <li>Estacionamento privativo gratuito</li>
        <li>Late check-out mediante disponibilidade</li>
      </ul>
    `,
    images: [
      { src: quartosImages.rooms[4].src, alt: 'Suite Deluxe - Vista geral' },
      { src: quartosImages.rooms[9].src, alt: 'Suite Deluxe - Segunda vista' },
      { src: quartosImages.rooms[0].src, alt: 'Suite Deluxe - Detalhe' },
    ],
  },
  {
    roomId: 'room-comfort-alentejo',
    title: 'Quarto Comfort Alentejo',
    subtitle: 'Elegante e acolhedor, com terraço privativo e vista sobre a paisagem alentejana, perfeito para uma estadia serena e revitalizante.',
    image: quartosImages.rooms[1].src,
    imageAlt: quartosImages.rooms[1].alt,
    description: `
      <p><strong>Conforto com vistas amplas sobre o panorama do Alentejo. A luz natural invade o quarto, onde a paisagem se transforma em arte.</strong></p>
      <ul>
        <li>Quarto espaçoso (28 m²) com grande janela</li>
        <li>Terraço privado com mobiliário exterior</li>
        <li>Vista sobre a paisagem alentejana</li>
        <li>Decoração com peças de artesanato local</li>
        <li>1 cama King Size (180cm x 200cm) ou 2 camas Twin</li>
        <li>Roupa de cama 100% algodão</li>
        <li>Casa de banho com chuveiro</li>
        <li>Amenities de casa de banho</li>
        <li>Acesso Wi-Fi gratuito</li>
        <li>Ar condicionado</li>
        <li>Minibar</li>
      </ul>
      <p><strong>"Incluído:"</strong></p>
      <ul>
        <li>Pequeno-almoço regional</li>
        <li>Acesso à piscina exterior</li>
        <li>Estacionamento gratuito</li>
      </ul>
    `,
    images: [
      { src: quartosImages.rooms[1].src, alt: 'Quarto Comfort - Vista geral' },
      { src: quartosImages.rooms[3].src, alt: 'Quarto Comfort - Segunda vista' },
      { src: quartosImages.rooms[6].src, alt: 'Quarto Comfort - Detalhe' },
    ],
  },
];

/**
 * QuartosPage - Rooms page using the RoomCardGallery component.
 * Features a hero section, alternating room cards with expand-in-place
 * detail views, and a CTA section.
 */
const QuartosPage = () => {
  const handleReserveClick = (roomId) => {
    // Reason: Open external booking or scroll to contact section
    window.open('https://www.booking.com', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={styles.quartosPage}>
      <SEO
        title={seoConfig.quartos.title}
        description={seoConfig.quartos.description}
        keywords={seoConfig.quartos.keywords}
        image={seoConfig.quartos.image}
      />

      <Hero
        backgroundImage={quartosImages.hero.src}
        title="Os Nossos Quartos"
        subtitle="Descubra o conforto e a tranquilidade do Monte da Estrada"
        height="60vh"
        overlay={0.5}
      />

      <RoomCardGallery
        rooms={rooms}
        onReserveClick={handleReserveClick}
      />

      {/* CTA Section */}
      <Section background="primary" padding="medium">
        <Container>
          <div className={styles.cta}>
            <h2 className={styles.ctaTitle}>Explore o Monte da Estrada</h2>
            <div className={styles.ctaButtons}>
              <Button variant="secondary" href="/galeria">
                Ver Galeria
              </Button>
              <Button variant="outline" href="/atividades">
                Atividades
              </Button>
              <Button variant="outline" href="/redondezas">
                A Região
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default QuartosPage;
