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
      alt: 'Acesso e direções para Monte da Estrada',
      title: 'Informações de Acesso',
      category: 'info'
    },
    {
      src: galeriaHeroInformacoes,
      alt: 'Informações gerais sobre Monte da Estrada',
      title: 'Informações Gerais',
      category: 'info'
    },
    {
      src: galeriaHeroPrecos,
      alt: 'Informações de preços das acomodações',
      title: 'Preços',
      category: 'info'
    }
  ],
  gallery: [
    {
      src: dsc0946,
      alt: 'Detalhe da propriedade Monte da Estrada',
      title: 'Detalhe da Propriedade 1'
    },
    {
      src: dsc0967,
      alt: 'Característica da propriedade Monte da Estrada',
      title: 'Detalhe da Propriedade 2'
    }
  ]
};

export default galeriaImages;
