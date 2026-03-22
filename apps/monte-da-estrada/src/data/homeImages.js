/**
 * Home page image exports
 * Centralized image imports for the HomePage component
 */

const CDN_BASE = 'https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@15d5b6f/mde/home';

export const homeImages = {
  hero: {
    src: `${CDN_BASE}/home-property-view-05.webp`,
    alt: 'Monte da Estrada - Casa de campo panorâmica no Litoral Alentejano',
    title: 'Welcome to Monte da Estrada'
  },
  galeriaHero: {
    src: `${CDN_BASE}/home-property-view-01.webp`,
    alt: 'Monte da Estrada - Exterior da propriedade com vista para o campo',
    title: 'Galeria'
  },
  gallery: [
    {
      src: `${CDN_BASE}/home-property-view-01.webp`,
      alt: 'Monte da Estrada - Vista exterior da entrada principal',
      title: 'Main Entrance'
    },
    {
      src: `${CDN_BASE}/home-property-view-05.webp`,
      alt: 'Monte da Estrada - Jardins e espaços exteriores',
      title: 'Outdoor Spaces'
    },
    {
      src: `${CDN_BASE}/home-property-view-08.webp`,
      alt: 'Monte da Estrada - Vista da propriedade ao pôr do sol',
      title: 'Golden Hour'
    }
  ],
  sala5: {
    src: `${CDN_BASE}/sala-5.webp`,
    alt: 'Monte da Estrada - Sala de estar e leitura',
    title: 'Sala de Estar'
  },
  pormenor2: {
    src: `${CDN_BASE}/pormenor-2.webp`,
    alt: 'Monte da Estrada - Detalhes de arquitetura de interiores',
    title: 'Pormenor'
  },
  recepcao2: {
    src: `${CDN_BASE}/recepcao-2.webp`,
    alt: 'Monte da Estrada - Zona de receção',
    title: 'Receção'
  },
  sala3: {
    src: `${CDN_BASE}/sala-3.webp`,
    alt: 'Monte da Estrada - Espaços comuns',
    title: 'Espaços Comuns'
  }
};

export default homeImages;
