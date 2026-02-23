/**
 * Descobrir page image exports
 * Centralized image imports for the DescobrirPage component
 */

import heroDescobrir from './heroDescobrir.jpg';
import pequeniqueAI from './pequeniqueAI.png';
import vinhosAI from './vinhosAI.png';
import rotaVicentinaAI from './rotaVicentinaAI.png';
import btt from './btt.png';
import jipeTourAI from './jipeTourAI.png';
import massagemAI from './massagemAI.png';
import zambujeiraPraia from './zambujeiraPraia.jpeg';
import carvalhal from './carvalhal.png';
import alteirinhos from './alteirinhos.png';
import almograve from './almograve.jpg';
import odeceixe from './odeceixe.jpg';
import tonel from './tonel.jpg';

export const descobrirImages = {
  hero: {
    src: heroDescobrir,
    alt: 'Costa Vicentina e Alentejo — território do Monte da Estrada',
    title: 'Descobrir'
  },
  experiences: [
    {
      src: pequeniqueAI,
      alt: 'Cesta de piquenique com produtos locais no campo',
      title: 'Piqueniques para Caminhantes'
    },
    {
      src: vinhosAI,
      alt: 'Copos de vinho com paisagem alentejana ao fundo',
      title: 'Prova de Vinhos Regionais'
    },
    {
      src: rotaVicentinaAI,
      alt: 'Caminheiro na Rota Vicentina com vista para o Atlântico',
      title: 'Caminhadas na Rota Vicentina'
    },
    {
      src: btt,
      alt: 'E-bike apoiada em tronco com montado alentejano ao fundo',
      title: 'Trilhos em E-bike'
    },
    {
      src: jipeTourAI,
      alt: 'Pôr do sol atlântico visto de miradouro no Alentejo',
      title: 'Sunset Chaser'
    },
    {
      src: massagemAI,
      alt: 'Área de bem-estar e piscina do Touril',
      title: 'Massagens'
    }
  ],
  beaches: [
    {
      src: zambujeiraPraia,
      alt: 'Zambujeira do Mar com falésias e mar azul-turquesa',
      title: 'Zambujeira do Mar'
    },
    {
      src: carvalhal,
      alt: 'Praia do Carvalhal com ondas e dunas ao fundo',
      title: 'Carvalhal'
    },
    {
      src: alteirinhos,
      alt: 'Praia dos Alteirinhos vista do alto das falésias',
      title: 'Alteirinhos'
    },
    {
      src: almograve,
      alt: 'Praia de Almograve com areias douradas',
      title: 'Almograve'
    },
    {
      src: odeceixe,
      alt: 'Praia de Odeceixe com estuário do rio Seixe',
      title: 'Odeceixe'
    },
    {
      src: tonel,
      alt: 'Praia do Tonel em Sagres com fortaleza ao fundo',
      title: 'Tonel'
    }
  ],
  attractions: []
};

export default descobrirImages;
