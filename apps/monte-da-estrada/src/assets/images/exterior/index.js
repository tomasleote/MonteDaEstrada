/**
 * Exterior and amenities image exports
 * Centralized image imports for various page components
 */

import exteriorHeroAmenities from './exterior-hero-amenities.jpg';
import comodidades from './comodidades.jpg';
import informacoes from './informacoes.jpg';
import precos from './precos.jpg';
import exteriorAmenity01 from './exterior-amenity-01.jpg';
import exteriorAmenity02 from './exterior-amenity-02.jpg';
import exteriorAmenity03 from './exterior-amenity-03.jpg';
import exteriorAmenity04 from './exterior-amenity-04.jpg';
import exteriorAmenity05 from './exterior-amenity-05.jpg';
import exteriorAmenity06 from './exterior-amenity-06.jpg';
import exteriorAmenity07 from './exterior-amenity-07.jpg';
import exteriorAmenity08 from './exterior-amenity-08.jpg';
import exteriorAmenity09 from './exterior-amenity-09.jpg';

export const exteriorImages = {
  hero: {
    src: exteriorHeroAmenities,
    alt: 'Monte da Estrada amenities and facilities overview',
    title: 'Amenities & Facilities'
  },
  info: [
    {
      src: comodidades,
      alt: 'Amenities and facilities information',
      title: 'Amenities',
      category: 'info'
    },
    {
      src: informacoes,
      alt: 'General information about the property',
      title: 'Information',
      category: 'info'
    },
    {
      src: precos,
      alt: 'Pricing information',
      title: 'Pricing',
      category: 'info'
    }
  ],
  amenities: [
    {
      src: exteriorAmenity01,
      alt: 'Outdoor pool and relaxation area',
      title: 'Pool Area',
      amenityType: 'pool'
    },
    {
      src: exteriorAmenity02,
      alt: 'Garden and landscaping',
      title: 'Gardens',
      amenityType: 'garden'
    },
    {
      src: exteriorAmenity03,
      alt: 'Outdoor seating and terrace',
      title: 'Terrace',
      amenityType: 'terrace'
    },
    {
      src: exteriorAmenity04,
      alt: 'BBQ and outdoor dining area',
      title: 'BBQ Area',
      amenityType: 'dining'
    },
    {
      src: exteriorAmenity05,
      alt: 'Parking and access facilities',
      title: 'Parking',
      amenityType: 'parking'
    },
    {
      src: exteriorAmenity06,
      alt: 'Recreational facilities',
      title: 'Recreation',
      amenityType: 'recreation'
    },
    {
      src: exteriorAmenity07,
      alt: 'Outdoor lounge area',
      title: 'Lounge Area',
      amenityType: 'lounge'
    },
    {
      src: exteriorAmenity08,
      alt: 'Property exterior features',
      title: 'Exterior Features',
      amenityType: 'exterior'
    },
    {
      src: exteriorAmenity09,
      alt: 'Additional amenities',
      title: 'Additional Amenities',
      amenityType: 'other'
    }
  ]
};

export default exteriorImages;
