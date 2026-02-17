/**
 * Redondezas (Surrounding Areas) page image exports
 * Centralized image imports for the RedondezasPage component
 */

import redondezasHeroRegion from './redondezas-hero-region.jpg';
import acessos from './acessos.jpg';
import festividades from './festividades.jpg';

// Aljezur
import redondezasAljezur01 from './redondezas-aljezur-01.jpg';
import redondezasAljezur02 from './redondezas-aljezur-02.jpg';
import redondezasAljezur03 from './redondezas-aljezur-03.jpg';

// Beaches
import redondezasAlmograveBeach from './redondezas-almograve-beach.jpg';
import redondezasArrifanaBeach from './redondezas-arrifana-beach.jpg';
import redondezasCarvalhalBeach from './redondezas-carvalhal-beach.jpg';
import redondezasZambujeiraBeach from './redondezas-zambujeira-beach.jpg';

// Cabo Sardão
import redondezasCaboSardaoCliffs from './redondezas-cabo-sardao-cliffs.jpg';
import redondezasCaboSardaoLighthouse from './redondezas-cabo-sardao-lighthouse.jpg';

// Other locations
import redondezasEntradaDaBarca from './redondezas-entrada-da-barca.jpg';
import redondezasIlhaPessegueiro from './redondezas-ilha-pessegueiro.jpg';

// Milfontes
import redondezasMilfontes01 from './redondezas-milfontes-01.jpg';
import redondezasMilfontes02 from './redondezas-milfontes-02.jpg';

// Odeceixe
import redondezasOdeceixe01 from './redondezas-odeceixe-01.jpg';
import redondezasOdeceixe02 from './redondezas-odeceixe-02.jpg';
import redondezasOdeceixe03 from './redondezas-odeceixe-03.jpg';

// Odemira
import redondezasOdemira01 from './redondezas-odemira-01.jpg';
import redondezasOdemira02 from './redondezas-odemira-02.jpg';
import redondezasOdemira03 from './redondezas-odemira-03.jpg';

// Parque das Águas
import redondezasParqueAguas01 from './redondezas-parque-aguas-01.jpg';
import redondezasParqueAguas02 from './redondezas-parque-aguas-02.jpg';
import redondezasParqueAguasOdemira from './redondezas-parque-aguas-odemira.jpg';

// Porto Covo
import redondezasPortoCovo01 from './redondezas-porto-covo-01.jpg';
import redondezasPortoCovo02 from './redondezas-porto-covo-02.jpg';
import redondezasPortoCovo03 from './redondezas-porto-covo-03.jpg';

// São Teotónio
import redondezasSaoTeotonio01 from './redondezas-sao-teotonio-01.jpg';
import redondezasSaoTeotonio02 from './redondezas-sao-teotonio-02.jpg';

// Sines
import redondezasSines01 from './redondezas-sines-01.jpg';
import redondezasSines02 from './redondezas-sines-02.jpg';

// Zambujeira do Mar
import redondezasZambujeiraChurchNight from './redondezas-zambujeira-church-night.jpg';
import redondezasZambujeiraNight from './redondezas-zambujeira-night.jpg';
import redondezasZambujeiraPanorama from './redondezas-zambujeira-panorama.jpg';
import redondezasZambujeiraRocks from './redondezas-zambujeira-rocks.jpg';
import redondezasZambujeiraSea from './redondezas-zambujeira-sea.jpg';
import redondezasZambujeiraSquare from './redondezas-zambujeira-square.jpg';
import redondezasZambujeiraSwimming from './redondezas-zambujeira-swimming.jpg';

export const redondezasImages = {
  hero: {
    src: redondezasHeroRegion,
    alt: 'Beautiful coastal region surrounding Monte da Estrada',
    title: 'Explore the Region'
  },
  info: [
    {
      src: acessos,
      alt: 'Access information and directions to local attractions',
      title: 'Access Information'
    },
    {
      src: festividades,
      alt: 'Regional festivities and cultural events',
      title: 'Festivities'
    }
  ],
  attractions: [
    // Aljezur
    {
      src: redondezasAljezur01,
      alt: 'Aljezur - historic castle and village views',
      title: 'Aljezur Castle',
      location: 'Aljezur',
      distance: '45km'
    },
    {
      src: redondezasAljezur02,
      alt: 'Aljezur traditional architecture and streets',
      title: 'Aljezur Village',
      location: 'Aljezur',
      distance: '45km'
    },
    {
      src: redondezasAljezur03,
      alt: 'Aljezur countryside landscape',
      title: 'Aljezur Landscape',
      location: 'Aljezur',
      distance: '45km'
    },
    // Beaches
    {
      src: redondezasAlmograveBeach,
      alt: 'Almograve Beach - pristine coastal scenery',
      title: 'Almograve Beach',
      location: 'Almograve',
      distance: '25km'
    },
    {
      src: redondezasArrifanaBeach,
      alt: 'Arrifana Beach - popular surf destination',
      title: 'Arrifana Beach',
      location: 'Arrifana',
      distance: '50km'
    },
    {
      src: redondezasCarvalhalBeach,
      alt: 'Carvalhal Beach - secluded coastal paradise',
      title: 'Carvalhal Beach',
      location: 'Carvalhal',
      distance: '15km'
    },
    {
      src: redondezasZambujeiraBeach,
      alt: 'Zambujeira do Mar Beach - dramatic cliffs and sand',
      title: 'Zambujeira Beach',
      location: 'Zambujeira do Mar',
      distance: '10km'
    },
    // Cabo Sardão
    {
      src: redondezasCaboSardaoCliffs,
      alt: 'Cabo Sardão dramatic coastal cliffs',
      title: 'Cabo Sardão Cliffs',
      location: 'Cabo Sardão',
      distance: '20km'
    },
    {
      src: redondezasCaboSardaoLighthouse,
      alt: 'Cabo Sardão lighthouse overlooking the Atlantic',
      title: 'Cabo Sardão Lighthouse',
      location: 'Cabo Sardão',
      distance: '20km'
    },
    // Other locations
    {
      src: redondezasEntradaDaBarca,
      alt: 'Entrada da Barca scenic viewpoint',
      title: 'Entrada da Barca',
      location: 'Entrada da Barca',
      distance: '18km'
    },
    {
      src: redondezasIlhaPessegueiro,
      alt: 'Ilha do Pessegueiro - historic island fortress',
      title: 'Ilha do Pessegueiro',
      location: 'Porto Covo',
      distance: '35km'
    },
    // Milfontes
    {
      src: redondezasMilfontes01,
      alt: 'Vila Nova de Milfontes - coastal town views',
      title: 'Vila Nova de Milfontes',
      location: 'Milfontes',
      distance: '30km'
    },
    {
      src: redondezasMilfontes02,
      alt: 'Milfontes harbor and riverside',
      title: 'Milfontes Harbor',
      location: 'Milfontes',
      distance: '30km'
    },
    // Odeceixe
    {
      src: redondezasOdeceixe01,
      alt: 'Odeceixe - charming village in the hills',
      title: 'Odeceixe Village',
      location: 'Odeceixe',
      distance: '35km'
    },
    {
      src: redondezasOdeceixe02,
      alt: 'Odeceixe beach and river meeting',
      title: 'Odeceixe Beach',
      location: 'Odeceixe',
      distance: '35km'
    },
    {
      src: redondezasOdeceixe03,
      alt: 'Odeceixe natural landscape',
      title: 'Odeceixe Nature',
      location: 'Odeceixe',
      distance: '35km'
    },
    // Odemira
    {
      src: redondezasOdemira01,
      alt: 'Odemira - traditional town center',
      title: 'Odemira Town',
      location: 'Odemira',
      distance: '15km'
    },
    {
      src: redondezasOdemira02,
      alt: 'Odemira riverside and architecture',
      title: 'Odemira Riverside',
      location: 'Odemira',
      distance: '15km'
    },
    {
      src: redondezasOdemira03,
      alt: 'Odemira scenic views',
      title: 'Odemira Views',
      location: 'Odemira',
      distance: '15km'
    },
    // Parque das Águas
    {
      src: redondezasParqueAguas01,
      alt: 'Parque das Águas - natural water park',
      title: 'Parque das Águas',
      location: 'Odemira',
      distance: '15km'
    },
    {
      src: redondezasParqueAguas02,
      alt: 'Parque das Águas swimming area',
      title: 'Swimming Area',
      location: 'Odemira',
      distance: '15km'
    },
    {
      src: redondezasParqueAguasOdemira,
      alt: 'Parque das Águas de Odemira facilities',
      title: 'Park Facilities',
      location: 'Odemira',
      distance: '15km'
    },
    // Porto Covo
    {
      src: redondezasPortoCovo01,
      alt: 'Porto Covo - picturesque fishing village',
      title: 'Porto Covo Village',
      location: 'Porto Covo',
      distance: '40km'
    },
    {
      src: redondezasPortoCovo02,
      alt: 'Porto Covo coastal scenery',
      title: 'Porto Covo Coast',
      location: 'Porto Covo',
      distance: '40km'
    },
    {
      src: redondezasPortoCovo03,
      alt: 'Porto Covo traditional architecture',
      title: 'Porto Covo Architecture',
      location: 'Porto Covo',
      distance: '40km'
    },
    // São Teotónio
    {
      src: redondezasSaoTeotonio01,
      alt: 'São Teotónio village center',
      title: 'São Teotónio',
      location: 'São Teotónio',
      distance: '8km'
    },
    {
      src: redondezasSaoTeotonio02,
      alt: 'São Teotónio traditional streets',
      title: 'São Teotónio Streets',
      location: 'São Teotónio',
      distance: '8km'
    },
    // Sines
    {
      src: redondezasSines01,
      alt: 'Sines - historic port city',
      title: 'Sines City',
      location: 'Sines',
      distance: '45km'
    },
    {
      src: redondezasSines02,
      alt: 'Sines harbor and coastal views',
      title: 'Sines Harbor',
      location: 'Sines',
      distance: '45km'
    },
    // Zambujeira do Mar
    {
      src: redondezasZambujeiraChurchNight,
      alt: 'Zambujeira do Mar church illuminated at night',
      title: 'Zambujeira Church Night',
      location: 'Zambujeira do Mar',
      distance: '10km'
    },
    {
      src: redondezasZambujeiraNight,
      alt: 'Zambujeira do Mar night views',
      title: 'Zambujeira Night',
      location: 'Zambujeira do Mar',
      distance: '10km'
    },
    {
      src: redondezasZambujeiraPanorama,
      alt: 'Zambujeira do Mar panoramic coastal view',
      title: 'Zambujeira Panorama',
      location: 'Zambujeira do Mar',
      distance: '10km'
    },
    {
      src: redondezasZambujeiraRocks,
      alt: 'Zambujeira do Mar rocky coastline',
      title: 'Zambujeira Rocks',
      location: 'Zambujeira do Mar',
      distance: '10km'
    },
    {
      src: redondezasZambujeiraSea,
      alt: 'Zambujeira do Mar ocean views',
      title: 'Zambujeira Sea',
      location: 'Zambujeira do Mar',
      distance: '10km'
    },
    {
      src: redondezasZambujeiraSquare,
      alt: 'Zambujeira do Mar town square',
      title: 'Zambujeira Square',
      location: 'Zambujeira do Mar',
      distance: '10km'
    },
    {
      src: redondezasZambujeiraSwimming,
      alt: 'Swimming at Zambujeira do Mar beach',
      title: 'Zambujeira Swimming',
      location: 'Zambujeira do Mar',
      distance: '10km'
    }
  ]
};

export default redondezasImages;
