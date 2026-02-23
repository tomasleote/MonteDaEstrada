/**
 * Home page image exports
 * Centralized image imports for the HomePage component
 */

import homeHeroMonteExterior from './home-hero-monte-exterior.jpg';
import homePropertyView01 from './home-property-view-01.jpg';
import homePropertyView02 from './home-property-view-02.jpg';
import homePropertyView03 from './home-property-view-03.jpg';
import homePropertyView04 from './home-property-view-04.jpg';
import homePropertyView05 from './home-property-view-05.jpg';
import homePropertyView06 from './home-property-view-06.jpg';
import homePropertyView07 from './home-property-view-07.jpg';
import homePropertyView08 from './home-property-view-08.jpg';
import homePropertyView09 from './home-property-view-09.jpg';
import homePropertyView10 from './home-property-view-10.jpg';
import homePropertyView11 from './home-property-view-11.jpg';
import homePropertyView12 from './home-property-view-12.jpg';

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
      src: homePropertyView02,
      alt: 'Beautiful landscape surrounding Monte da Estrada with green fields',
      title: 'Surrounding Landscape'
    },
    {
      src: homePropertyView03,
      alt: 'Property view showcasing traditional Portuguese architecture',
      title: 'Traditional Architecture'
    },
    {
      src: homePropertyView04,
      alt: 'Panoramic view of the property and countryside',
      title: 'Panoramic View'
    },
    {
      src: homePropertyView05,
      alt: 'Property grounds and outdoor spaces',
      title: 'Outdoor Spaces'
    },
    {
      src: homePropertyView06,
      alt: 'Detailed view of property exterior features',
      title: 'Property Details'
    },
    {
      src: homePropertyView07,
      alt: 'Monte da Estrada surrounded by natural beauty',
      title: 'Natural Beauty'
    },
    {
      src: homePropertyView08,
      alt: 'Property view during golden hour',
      title: 'Golden Hour'
    },
    {
      src: homePropertyView09,
      alt: 'Countryside landscape view from the property',
      title: 'Countryside Views'
    },
    {
      src: homePropertyView10,
      alt: 'Property exterior and surrounding terrain',
      title: 'Property Terrain'
    },
    {
      src: homePropertyView11,
      alt: 'Wide angle view of Monte da Estrada property',
      title: 'Wide Angle View'
    },
    {
      src: homePropertyView12,
      alt: 'Scenic property view with natural surroundings',
      title: 'Scenic View'
    }
  ]
};

export default homeImages;
