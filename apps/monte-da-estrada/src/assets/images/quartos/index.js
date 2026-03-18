/**
 * Quartos page image exports
 * Maps images from fotos-monte-da-estrada/ into the structure
 * expected by QuartosPage.jsx
 */

import hero from './exterior-1.jpeg';
import quarto1 from './quarto-1.jpeg';
import quarto2 from './quarto-2.jpeg';
import quarto3 from './quarto-3.jpeg';
import quarto4 from './quarto-4.jpeg';
import wc from './quarto-wc.jpeg';
import sala2 from './sala-2.jpeg';
import sala3 from './sala-3.jpeg';
import sala5 from './sala-5.jpeg';
import exterior1 from './exterior-1.jpeg';
import exterior2 from './exterior-2.jpeg';
import recepcao1 from './recepcao-1.jpeg';
import recepcao2 from './recepcao-2.jpeg';
import pomrenor1 from './pormenor-1.jpeg';
import pomrenor2 from './pormenor-2.jpeg';
import pomrenor3 from './pormenor-3.jpeg';

export const quartosImages = {
  hero: {
    src: hero,
    alt: 'Monte da Estrada — vista exterior do edifício',
    title: 'Quartos'
  },
  /** Quarto Duplo / Twin — 8 rooms available */
  quartoDuploTwin: [
    {
      src: quarto1,
      alt: 'Quarto Duplo / Twin com vista para o jardim',
      title: 'Quarto Duplo / Twin'
    },
    {
      src: quarto2,
      alt: 'Quarto Duplo / Twin com decoração rústica',
      title: 'Quarto Duplo / Twin'
    },
    {
      src: quarto3,
      alt: 'Quarto Duplo / Twin com luz natural',
      title: 'Quarto Duplo / Twin'
    },
    {
      src: quarto4,
      alt: 'Quarto Duplo / Twin com casa de banho',
      title: 'Quarto Duplo / Twin'
    },
    {
      src: wc,
      alt: 'Casa de banho do quarto com amenities premium',
      title: 'Casa de banho'
    }
  ],
  commonAreas: [
    {
      src: sala2,
      alt: 'Sala comum do Monte da Estrada',
      title: 'Sala'
    },
    {
      src: sala3,
      alt: 'Sala com lareira e zonas de estar',
      title: 'Sala'
    },
    {
      src: sala5,
      alt: 'Zona exterior coberta',
      title: 'Área Comum'
    }
  ],
  exterior: [
    {
      src: exterior1,
      alt: 'Vista exterior do Monte da Estrada',
      title: 'Exterior'
    },
    {
      src: exterior2,
      alt: 'Jardins e espaço exterior',
      title: 'Exterior'
    }
  ],
  reception: [
    {
      src: recepcao1,
      alt: 'Receção do Monte da Estrada',
      title: 'Receção'
    },
    {
      src: recepcao2,
      alt: 'Receção e área de check-in',
      title: 'Receção'
    }
  ],
  details: [
    {
      src: pomrenor1,
      alt: 'Pormenor da decoração do quarto',
      title: 'Pormenor'
    },
    {
      src: pomrenor2,
      alt: 'Pormenor dos amenities',
      title: 'Pormenor'
    },
    {
      src: pomrenor3,
      alt: 'Pormenor arquitectónico',
      title: 'Pormenor'
    }
  ]
};

export default quartosImages;
