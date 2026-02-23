/**
 * Redondezas (Surrounding Areas) page image exports
 * Centralized image imports for the RedondezasPage component
 */

import saoTeotonio from './saoteotonio.jpeg';
import zambujeira from './zambujeira.jpg';
import odemira from './Odemira.jpg';
import aljezur from './Aljezur.jpg';
import vilaNova from './vilaNova.png';
import almograve from './almograve.jpg';

export const descobrirAttractions = {
  attractions: [
    {
      src: saoTeotonio,
      alt: 'São Teotónio - vila mais próxima',
      title: 'São Teotónio'
    },
    {
      src: zambujeira,
      alt: 'Zambujeira do Mar - praia selvagem',
      title: 'Zambujeira do Mar'
    },
    {
      src: odemira,
      alt: 'Odemira - cidade ribeirinha',
      title: 'Odemira'
    },
    {
      src: aljezur,
      alt: 'Aljezur - vila mourisca histórica',
      title: 'Aljezur'
    },
    {
      src: vilaNova,
      alt: 'Vila Nova de Milfontes - cidade costeira',
      title: 'Vila Nova de Milfontes'
    },
    {
      src: almograve,
      alt: 'Almograve - praia selvagem',
      title: 'Almograve'
    }
  ]
};

export default descobrirAttractions;
