import { FetchSingleProduct } from '@/data/types';

export const cedenteTropos = (product: FetchSingleProduct) =>
  product.params.slug === 'medicina-interna' ? 'formación' : '';

export const paymentLinks: any = {
  co: {
    // Colombia - links vacíos por ahora
    'medicina-interna': 'https://buy.stripe.com/8wMdR103J2o2h0c299',
    accsap: 'https://buy.stripe.com/bIY8wHdUzfaO9xK156',
  },
  cr: {
    // Costa Rica
    'medicina-interna': 'https://buy.stripe.com/aEU4grdUz8Mq7pC3d9',
    accsap: 'https://buy.stripe.com/aEUeV5g2HfaO6ly6pm',
  },
  pe: {
    // Perú
    'medicina-interna': 'https://buy.stripe.com/aEU9ALcQv8Mqh0c7tr',
    accsap: 'https://buy.stripe.com/fZedR1dUz4wafW8aFE',
  },
};

export const landingFAQs = (country: string) => ({
  texto: '<p>Preguntas frecuentes</p>\n',
  items: [
    {
      titulo: '¿Cómo funciona MSK?',
      parrafo:
        '<p>Dentro de nuestro sitio web encuentras capacitaciones de distintos niveles para actualizar tus conocimientos y herramientas para la práctica profesional. Accede compartiéndonos tus datos en los formularios de contacto y un agente académico se comunicará contigo para asesorarte sobre beneficios y llevar adelante la inscripción.</p>\n',
    },
    {
      titulo: '¿Qué tipo de certificaciones y avales ofrece?',
      parrafo:
        country === 'ar'
          ? '<p>Los cursos están certificados por instituciones de prestigio, como COLMED III y Universidad EUNEIZ. Una vez finalizada tu cursada, las certificaciones disponibles en cursos seleccionados serán un gran valor para tu currículum u hoja de vida.</p>\n'
          : country === 'ec'
          ? '<p>Los cursos están certificados por instituciones de prestigio, como Universidad EUNEIZ, y avalados por Universidad de Cuenca, AFEME y ANAMER. Una vez finalizada tu cursada, las certificaciones disponibles en cursos seleccionados serán un gran valor para tu currículum u hoja de vida.</p>\n'
          : country === 'mx'
          ? '<p>Los cursos están certificados por distintas instituciones de prestigio, como SAXUM University, CONAMEGE y Universidad EUNEIZ, y avalados por la Sociedad Médica del Hospital General de México. Una vez finalizada tu cursada, las certificaciones disponibles en cursos seleccionados serán un gran valor para tu currículum u hoja de vida.</p>\n'
          : country === 'cl'
          ? '<p>Los cursos están certificados por distintas instituciones de prestigio, como ANDROS-MSK OTEC y Universidad EUNEIZ. Una vez finalizada tu cursada, las certificaciones disponibles en cursos seleccionados serán un gran valor para tu currículum u hoja de vida.</p>\n'
          : '<p>Los cursos están certificados por distintas instituciones de prestigio, como Universidad EUNEIZ y UDIMA. Una vez finalizada tu cursada, las certificaciones disponibles en cursos seleccionados serán un gran valor para tu currículum u hoja de vida.</p>\n',
    },
    {
      titulo: '¿Qué requisitos existen para recibir la certificación?',
      parrafo:
        '<ul>\n<li>Haber abonado la totalidad del valor del curso.</li>\n<li>Haber finalizado y aprobado la cursada.</li>\n<li>Dependiendo de la certificación por la cual hayas optado y/o que esté asociada al curso realizado, se te solicitarán determinados documentos respaldatorios, escaneados frente y dorso, para su tramitación.</li>\n</ul>\n',
    },
    {
      titulo: '¿Cómo es la modalidad de aprendizaje?',
      parrafo:
        '<p>¡Es 100% a distancia! Capacitarte en MSK tiene como característica que puedes desarrollar una autonomía en tu cursada, avanzando a tus tiempos y con una asimilación progresiva de los conocimientos.</p>\n',
    },
    {
      titulo: '¿Cómo es la modalidad de evaluación?',
      parrafo:
        '<p>De acuerdo al curso realizado, el examen final podrá ser a través de una autoevaluación integradora o por medio de cuestionarios de casos prácticos.</p>\n',
    },
    {
      titulo: '¿Qué tipo de soporte ofrece?',
      parrafo:
        '<p>Cuentas con acompañamiento permanente a lo largo de toda tu cursada. Nuestro Equipo de Asesoría Académica está siempre disponible para responder tus dudas y ayudarte a resolver cualquier inconveniente.</p>\n',
    },

    {
      titulo: '¿Cómo se puede abonar la inscripción a un curso?',
      parrafo:
        country === 'ar'
          ? '<p>Con tarjeta de débito o en cuotas con tarjeta de crédito, a través de las plataformas Mercado Pago, LaPos Web o Payway, o mediante transferencia bancaria.</p>\n'
          : country === 'ec'
          ? '<p>Con tarjeta de débito o en pagos con tarjeta de crédito, a través de la plataforma PlacetoPay, o mediante transferencia bancaria.</p>\n'
          : country === 'mx'
          ? '<p>Con tarjeta de débito o en pagos con tarjeta de crédito, a través de las plataformas Rebill, Mercado Pago o CTC, o mediante transferencia bancaria.</p>\n'
          : country === 'cl'
          ? '<p>Con tarjeta de débito o en pagos con tarjeta de crédito, a través de las plataformas Rebill o Mercado Pago, o mediante transferencia bancaria.</p>\n'
          : country === 'co' || country === 'uy'
          ? '<p>Con tarjeta de débito o en pagos con tarjeta de crédito, a través de las plataformas Rebill o Stripe.</p>\n'
          : '<p>Con tarjeta de débito o en pagos con tarjeta de crédito, a través de la plataforma Stripe.</p>\n',
    },
  ],
});

export const paymentLink = (country: string, productSlug: string): string => {
  return paymentLinks[country]?.[productSlug] || '#';
};
