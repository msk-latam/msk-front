// /schemas/medicina-interna.js
const medicinaInternaSchema = {
  '@context': 'https://schema.org/',
  '@type': 'Product',
  name: 'Curso superior de medicina interna',
  image:
    'https://msklatam.com/_next/image/?url=https%3A%2F%2Fwp.msklatam.com%2Fwp-content%2Fuploads%2F2023%2F06%2Ffoto-primaria-1-4.jpg&w=1080&q=75',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    price: '95',
    availability: 'https://schema.org/OnlineOnly',
    url: 'https://msklatam.com/ar/curso/medicina-interna/',
    priceValidUntil: '',
  },
  description:
    'Con este amplio curso a distancia de actualización en Medicina interna incorporarás los conocimientos necesarios para el abordaje de distintas enfermedades...',
};

export default medicinaInternaSchema;
