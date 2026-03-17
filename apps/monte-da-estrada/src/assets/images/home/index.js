/**
 * Home page image exports
 * Centralized image imports for the HomePage component
 */

import homeHeroMonteExterior from './home-hero-monte-exterior.jpg';
import homePropertyView01 from './home-property-view-01.jpg';
import homePropertyView05 from './home-property-view-05.jpg';
import homePropertyView08 from './home-property-view-08.jpg';

export const homeImages = {
  hero: {
    src: homePropertyView05,
    alt: 'Monte da Estrada - Property grounds and outdoor spaces',
    title: 'Welcome to Monte da Estrada'
  },
  galeriaHero: {
    src: homeHeroMonteExterior,
    alt: 'Monte da Estrada - Luxurious countryside property exterior view',
    title: 'Galeria'
  },
  gallery: [
    {
      src: homePropertyView01,
      alt: 'Monte da Estrada property exterior view from main entrance',
      title: 'Main Entrance'
    },
    {
      src: homePropertyView05,
      alt: 'Property grounds and outdoor spaces',
      title: 'Outdoor Spaces'
    },
    {
      src: homePropertyView08,
      alt: 'Property view during golden hour',
      title: 'Golden Hour'
    }
  ]
};

export default homeImages;
