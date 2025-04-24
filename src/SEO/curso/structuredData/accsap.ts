const accsapSchema = {
  '@context': 'https://schema.org',
  '@type': 'Review',
  itemReviewed: {
    '@type': 'Product',
    name: 'ACCSAP. Programa de Actualización en Cardiología Clínica',
    url: 'https://msklatam.com/curso/accsap/',
    image:
      'https://msklatam.com/_next/image/?url=https%3A%2F%2Fwp.msklatam.com%2Fwp-content%2Fuploads%2F2022%2F09%2Ffoto-primaria-ACCSAP.jpg&w=2048&q=75',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: '499.00',
      url: 'https://msklatam.com/curso/accsap/',
    },
  },
  reviewRating: {
    '@type': 'Rating',
    ratingValue: '4.6',
    bestRating: '5',
    worstRating: '1',
  },
  author: {
    '@type': 'Person',
    name: 'Rodrigo Goyos',
  },
  datePublished: '2024-09-09',
  reviewBody:
    'Me sorprendió totalmente, es un curso profesional, con toda la seriedad, los exámenes son difíciles y exigen la máxima comprensión, el contenido es aplicable en la vida real, los vídeos ayudan como guía orientativa. Me quedo satisfecho y en el futuro claro que volvería a tomar otro curso de ramas diferentes.',
};

export default accsapSchema;
