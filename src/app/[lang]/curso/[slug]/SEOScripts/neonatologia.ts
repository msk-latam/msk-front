const neonatologiaSchema = {
  '@context': 'https://schema.org/',
  '@type': 'Product',
  name: 'Curso superior de neonatología',
  image:
    'https://msklatam.com/_next/image/?url=https%3A%2F%2Fwp.msklatam.com%2Fwp-content%2Fuploads%2Fimagenes-cursos%2F9004703_fotoprimaria.jpg&w=1080&q=75',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    price: '79',
    availability: 'https://schema.org/OnlineOnly',
    url: 'https://msklatam.com/ar/curso/neonatologia/',
  },
  description:
    'Desarrollado por especialistas, esta formación te brindará los contenidos y las herramientas más completas y actualizadas para la atención eficaz del recién nacido en la sala de partos, la internación conjunta y los consultorios extrahospitalarios pediátricos y neonatales.',
};

export default neonatologiaSchema;
