/**
 * Galeria (Gallery) page image exports
 * Centralized image imports for the GaleriaPage component
 */

import galeriaHeroAcessos from './galeria-hero-acessos.jpg';
import galeriaHeroInformacoes from './galeria-hero-informacoes.jpg';
import galeriaHeroPrecos from './galeria-hero-precos.jpg';
import dsc0946 from './DSC_0946.jpg';
import dsc0967 from './DSC_0967.jpg';

export const galeriaImages = {
  heroes: [
    {
      src: galeriaHeroAcessos,
      alt: 'Access and directions to Monte da Estrada',
      title: 'Access Information',
      category: 'info'
    },
    {
      src: galeriaHeroInformacoes,
      alt: 'General information about Monte da Estrada',
      title: 'General Information',
      category: 'info'
    },
    {
      src: galeriaHeroPrecos,
      alt: 'Pricing information for Monte da Estrada accommodations',
      title: 'Pricing',
      category: 'info'
    }
  ],
  gallery: [
    {
      src: dsc0946,
      alt: 'Monte da Estrada property detail',
      title: 'Property Detail 1'
    },
    {
      src: dsc0967,
      alt: 'Monte da Estrada property feature',
      title: 'Property Detail 2'
    }
  ]
};

export default galeriaImages;
