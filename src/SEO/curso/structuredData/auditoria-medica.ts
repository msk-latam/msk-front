const auditoriaMedicaSchema = {
  '@context': 'https://schema.org/',
  '@type': 'Product',
  name: 'Auditoría médica',
  image:
    'https://msklatam.com/_next/image/?url=https%3A%2F%2Fwp.msklatam.com%2Fwp-content%2Fuploads%2F2020%2F05%2Ffoto-primaria.jpg&w=1080&q=75',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    price: '53',
    availability: 'https://schema.org/OnlineOnly',
    url: 'https://msklatam.com/ar/curso/auditoria-medica/',
    priceValidUntil: '',
  },
  description:
    'Con esta herramienta de formación online obtendrás las principales herramientas y fundamentos de evaluación y gestión de la auditoría médica, cuya aplicación es fundamental para mejorar la calidad de la atención y de la práctica médica al identificar las áreas críticas y proponer soluciones que sean beneficiosas para las instituciones y ayuden al cuerpo médico y a los pacientes.',
};

export default auditoriaMedicaSchema;
