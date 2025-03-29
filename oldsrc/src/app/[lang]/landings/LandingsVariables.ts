import { FetchSingleProduct } from '@/data/types';

export const cedenteTropos = (product: FetchSingleProduct) =>
	product.params.slug === 'medicina-interna' ? 'Formación' : '';

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
	es: {
		accsap: 'https://buy.stripe.com/4gw28j17Nd2G6lydS1',
	},
};

export const landingFAQs = (country: string) => ({
	texto: '<p>Preguntas frecuentes</p>\n',
	items: [
		{
			titulo: '¿Qué ofrece la prueba de 7 días gratis?',
			parrafo: '<p>Con la prueba gratuita de MSK accedes a todos los contenidos del curso sin costo durante 7 días.</p>',
		},
		{
			titulo: '¿Se puede cancelar una prueba gratuita?',
			parrafo: '<p>Sí, puedes cancelarla dentro de los 7 días luego de solicitada la prueba y no abonarás nada.</p>',
		},
		{
			titulo: '¿Qué ocurre si no se cancela una prueba gratuita?',
			parrafo:
				'<p>A partir del octavo día desde la solicitud, se confirmará tu inscripción definitiva al curso, abonando su valor total en pagos.</p>',
		},
		{
			titulo: '¿Se pueden realizar dos pruebas gratuitas a la vez?',
			parrafo: '<p>No se puede acceder a más de una prueba en distintos cursos a la vez.</p>',
		},
		{
			titulo: '¿Se puede obtener otra prueba gratuita sobre un curso ya solicitado?',
			parrafo:
				'<p>No se puede solicitar otra prueba gratuita de un curso al cual ya se ha accedido de forma gratuita anteriormente.</p>',
		},
	],
});

export const paymentLink = (country: string, productSlug: string): string => {
	return paymentLinks[country]?.[productSlug] || '#';
};
