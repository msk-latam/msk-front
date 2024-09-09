const neurologiaSchema = {
  '@context': 'https://schema.org/',
  '@type': 'Product',
  name: 'Curso superior de neurología',
  image:
    'https://msklatam.com/_next/image/?url=https%3A%2F%2Fwp.msklatam.com%2Fwp-content%2Fuploads%2F2023%2F12%2Ffoto-primaria-8.jpg&w=1080&q=75',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    price: '95',
    availability: 'https://schema.org/OnlineOnly',
    url: 'https://msklatam.com/ar/curso/neurologia/',
    priceValidUntil: '',
  },
  description:
    'Con esta formación online obtendrás conocimientos actualizados para profundizar en la destreza de la exploración y obtención de datos semiológicos, realizar un diagnóstico clínico-etiológico preciso y aplicar los principios de tratamiento oportunos en pacientes con patologías neurológicas.',
};

export default neurologiaSchema;
