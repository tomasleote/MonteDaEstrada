/**
 * Atividades (Activities) page image exports
 * Centralized image imports for the AtividadesPage component
 */

import atividadesHero from './atividades-hero-activities.jpg';
import atividadesHeroFestivities from './atividades-hero-festivities.jpg';
import atividades from './atividades.jpg';
import atividadesFacecoFair01 from './atividades-faceco-fair-01.jpg';
import atividadesFacecoFair02 from './atividades-faceco-fair-02.jpg';
import atividadesFestaMastros01 from './atividades-festa-mastros-01.jpg';
import atividadesFestaMastros02 from './atividades-festa-mastros-02.jpg';
import atividadesFestaMastros03 from './atividades-festa-mastros-03.jpg';
import atividadesFestivalMeo from './atividades-festival-meo.jpg';
import atividadesFestivalMeoSudoeste from './atividades-festival-meo-sudoeste.jpg';
import atividadesFestivalSudoeste01 from './atividades-festival-sudoeste-01.jpg';
import atividadesFestivalSudoeste02 from './atividades-festival-sudoeste-02.jpg';

export const atividadesImages = {
  heroes: [
    {
      src: atividadesHero,
      alt: 'Activities and experiences available at Monte da Estrada',
      title: 'Activities & Experiences'
    },
    {
      src: atividadesHeroFestivities,
      alt: 'Local festivities and cultural events in the region',
      title: 'Festivities'
    }
  ],
  activities: [
    {
      src: atividades,
      alt: 'General activities available in the region',
      title: 'Regional Activities',
      category: 'general'
    },
    {
      src: atividadesFacecoFair01,
      alt: 'FACECO fair - traditional local event',
      title: 'FACECO Fair',
      category: 'festival'
    },
    {
      src: atividadesFacecoFair02,
      alt: 'FACECO fair activities and attractions',
      title: 'FACECO Fair Activities',
      category: 'festival'
    },
    {
      src: atividadesFestaMastros01,
      alt: 'Festa dos Mastros - traditional festival celebration',
      title: 'Festa dos Mastros',
      category: 'festival'
    },
    {
      src: atividadesFestaMastros02,
      alt: 'Festa dos Mastros festival parade and celebration',
      title: 'Festa dos Mastros Parade',
      category: 'festival'
    },
    {
      src: atividadesFestaMastros03,
      alt: 'Traditional Festa dos Mastros festivities',
      title: 'Traditional Festivities',
      category: 'festival'
    },
    {
      src: atividadesFestivalMeo,
      alt: 'MEO Festival - major music and cultural event',
      title: 'MEO Festival',
      category: 'music'
    },
    {
      src: atividadesFestivalMeoSudoeste,
      alt: 'MEO Sudoeste music festival',
      title: 'MEO Sudoeste',
      category: 'music'
    },
    {
      src: atividadesFestivalSudoeste01,
      alt: 'Festival Sudoeste - popular summer music festival',
      title: 'Festival Sudoeste',
      category: 'music'
    },
    {
      src: atividadesFestivalSudoeste02,
      alt: 'Festival Sudoeste concert and entertainment',
      title: 'Festival Entertainment',
      category: 'music'
    }
  ]
};

export default atividadesImages;
