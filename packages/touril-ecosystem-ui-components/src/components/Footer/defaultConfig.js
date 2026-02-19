/**
 * Default Footer configuration for Monte da Estrada
 * Override any of these props when using the Footer component
 */
const footerDefaultConfig = {
  navigationLinks: [
    { text: 'Início', href: '/' },
    { text: 'Quartos', href: '/quartos' },
    { text: 'Atividades', href: '/atividades' },
    { text: 'Redondezas', href: '/redondezas' },
    { text: 'Localização', href: '/localizacao' },
    { text: 'Galeria', href: '/galeria' },
    { text: 'Reservar', href: 'https://www.booking.com/', external: true },
  ],
  address: {
    name: 'Monte da Estrada',
    street: 'Zambujeira do Mar',
    postalCode: '7630-568 Odemira',
    region: 'Alentejo',
    country: 'Portugal',
    phone: '+351 283 647 535',
    mobile: '+351 960 254 072',
    email: 'montedaestradazambujeiradomar@gmail.com',
    license: null,
    gpsCoords: null,
  },
  socialLinks: [],
  legalInfo: null,
  copyright: `© Monte da Estrada ${new Date().getFullYear()}`,
};

export default footerDefaultConfig;
