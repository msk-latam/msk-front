const medicinaFamiliarSchema = {
  '@context': 'https://schema.org/',
  '@type': 'Product',
  name: 'Curso superior de medicina familiar',
  image:
    'https://msklatam.com/_next/image/?url=https%3A%2F%2Fwp.msklatam.com%2Fwp-content%2Fuploads%2F2024%2F02%2Ffoto-primaria-2.jpg&w=1080&q=75',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    price: '95',
    availability: 'https://schema.org/OnlineOnly',
    url: 'https://msklatam.com/ar/curso/medicina-familiar-y-comunitaria/',
  },
  description:
    'Con esta formación online obtendrás conocimientos actualizados para proporcionar una atención clínica eficaz basada en la evidencia y brindar una solución terapéutica a los problemas planteados en la comunidad. Además, saber responsabilizarse del proceso salud/enfermedad de la familia y conocer que las disfunciones familiares son capaces de crear patología.',
};

export default medicinaFamiliarSchema;
