import {
  auditoriaMedicaSchema,
  cirugiaGeneralSchema,
  gestionHospitalariaSchema,
  hemoterapiaSchema,
  medicinaFamiliarSchema,
  medicinaInternaSchema,
  neonatologiaSchema,
  neurologiaSchema,
  psiquiatriaSchema,
  terapiaIntensivaSchema,
} from './index';

type Schema = {
  '@context': string;
  '@type': string;
  name: string;
  image: string;
  offers: {
    '@type': string;
    priceCurrency: string;
    price: string;
    availability: string;
    url: string;
    priceValidUntil?: string;
  };
  description: string;
};

type SchemaMap = {
  [key: string]: Schema;
};

const schemaMap: SchemaMap = {
  'auditoria-medica': auditoriaMedicaSchema,
  'cirugia-general-y-del-aparato-digestivo': cirugiaGeneralSchema,
  'administracion-y-gestion-hospitalaria': gestionHospitalariaSchema,
  'hematologia-y-hemoterapia': hemoterapiaSchema,
  'medicina-familiar-y-comunitaria': medicinaFamiliarSchema,
  'medicina-interna': medicinaInternaSchema,
  neonatologia: neonatologiaSchema,
  neurologia: neurologiaSchema,
  psiquiatria: psiquiatriaSchema,
  'terapia-intensiva': terapiaIntensivaSchema,
};

export default schemaMap;
