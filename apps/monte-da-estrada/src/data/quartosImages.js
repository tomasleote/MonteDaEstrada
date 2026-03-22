/**
 * Quartos page image exports
 * Expected by QuartosPage.jsx
 */

const CDN_BASE = 'https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@15d5b6f/mde/quartos';
const HOME_CDN_BASE = 'https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@15d5b6f/mde/home';

export const quartosImages = {
  hero: {
    src: `${HOME_CDN_BASE}/home-property-view-01.webp`,
    alt: 'Monte da Estrada — vista exterior do edifício alentejano',
    title: 'Quartos'
  },
  quartoDuploTwin: [
    {
      src: `${CDN_BASE}/quarto-1.webp`,
      alt: 'Monte da Estrada - Quarto Duplo com vista para o jardim',
      title: 'Quarto Duplo / Twin'
    },
    {
      src: `${CDN_BASE}/quarto-2.webp`,
      alt: 'Monte da Estrada - Quarto Duplo com decoração tradicional',
      title: 'Quarto Duplo / Twin'
    },
    {
      src: `${CDN_BASE}/quarto-3.webp`,
      alt: 'Monte da Estrada - Quarto luminoso com vista campo',
      title: 'Quarto Duplo / Twin'
    },
    {
      src: `${CDN_BASE}/quarto-4.webp`,
      alt: 'Monte da Estrada - Quarto com apontamentos e arquitetura de charme',
      title: 'Quarto Duplo / Twin'
    },
    {
      src: `${CDN_BASE}/quarto-wc.webp`,
      alt: 'Monte da Estrada - Casa de banho do quarto',
      title: 'Casa de banho'
    }
  ],
  commonAreas: [
    {
      src: `${CDN_BASE}/quarto-1.webp`,
      alt: 'Sala comum do Monte da Estrada',
      title: 'Sala'
    },
    {
      src: `${CDN_BASE}/quarto-2.webp`,
      alt: 'Sala com lareira e zonas de estar',
      title: 'Sala'
    },
    {
      src: `${CDN_BASE}/quarto-3.webp`,
      alt: 'Zona exterior coberta',
      title: 'Área Comum'
    }
  ],
  exterior: [
    {
      src: `${HOME_CDN_BASE}/home-property-view-01.webp`,
      alt: 'Vista exterior do Monte da Estrada',
      title: 'Exterior'
    },
    {
      src: `${HOME_CDN_BASE}/home-property-view-05.webp`,
      alt: 'Jardins e espaço exterior',
      title: 'Exterior'
    }
  ],
  reception: [
    {
      src: `${CDN_BASE}/quarto-1.webp`,
      alt: 'Receção do Monte da Estrada',
      title: 'Receção'
    },
    {
      src: `${CDN_BASE}/quarto-2.webp`,
      alt: 'Receção e área de check-in',
      title: 'Receção'
    }
  ],
  details: [
    {
      src: `${CDN_BASE}/quarto-3.webp`,
      alt: 'Pormenor da decoração do quarto',
      title: 'Pormenor'
    },
    {
      src: `${CDN_BASE}/quarto-4.webp`,
      alt: 'Pormenor dos amenities',
      title: 'Pormenor'
    },
    {
      src: `${CDN_BASE}/quarto-wc.webp`,
      alt: 'Pormenor arquitectónico',
      title: 'Pormenor'
    }
  ]
};

export default quartosImages;
