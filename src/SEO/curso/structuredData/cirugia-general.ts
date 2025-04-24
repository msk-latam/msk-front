const cirugiaGeneralSchema = {
  '@context': 'https://schema.org/',
  '@type': 'Product',
  name: 'Curso superior de cirugía general y del aparato digestivo',
  image:
    'https://msklatam.com/_next/image/?url=https%3A%2F%2Fwp.msklatam.com%2Fwp-content%2Fuploads%2F2023%2F06%2Ffoto-primaria-4.jpg&w=1080&q=75',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    price: '95',
    availability: 'https://schema.org/OnlineOnly',
    url: 'https://msklatam.com/ar/curso/cirugia-general-y-del-aparato-digestivo/',
  },
  description:
    'Con este amplio curso online de actualización obtendrás una mirada integral de la cirugía general y del aparato digestivo, explorando a profundidad los distintos tipos de intervenciones, las posibles complicaciones y todo lo relacionado con la anestesia, la prehabilitación y la rehabilitación, así como los cuidados especiales que requiere el paciente sometido intervenciones quirúrgicas.',
};

export default cirugiaGeneralSchema;
