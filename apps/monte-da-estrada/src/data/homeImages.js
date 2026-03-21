/**
 * Home page image exports
 * Centralized image imports for the HomePage component
 */

const CDN_BASE = 'https://cdn.jsdelivr.net/gh/tomasleote/assets-hotel@495a0e9/mde/home';

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
  ]
};

export default homeImages;
