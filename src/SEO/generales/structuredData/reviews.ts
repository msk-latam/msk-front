const reviewsDataSEO = {
	'@context': 'https://schema.org',
	'@type': 'Review',
	review: [
		{
			'@type': 'Review',
			author: {
				'@type': 'Person',
				name: 'José Ignacio Srebot',
			},
			reviewBody:
				'Contenido académico excelente. La plataforma es muy amigable y la modalidad del curso es muy cómoda. Para recomendar.',
			reviewRating: {
				'@type': 'Rating',
				ratingValue: '5',
				bestRating: '5',
			},
		},
		{
			'@type': 'Review',
			author: {
				'@type': 'Person',
				name: 'Claudia Gutiérrez',
			},
			reviewBody: 'Excelente atención!! Cordialidad, respeto y mucha paciencia.',
			reviewRating: {
				'@type': 'Rating',
				ratingValue: '5',
				bestRating: '5',
			},
		},
		{
			'@type': 'Review',
			author: {
				'@type': 'Person',
				name: 'María Benítez',
			},
			reviewBody:
				'Un contenido muy amplio me brindaron. Me ayuda mucho en mi labor. Gracias a mi asesora por acompañarme y estar cada vez que necesité algo.',
			reviewRating: {
				'@type': 'Rating',
				ratingValue: '5',
				bestRating: '5',
			},
		},
		{
			'@type': 'Review',
			author: {
				'@type': 'Person',
				name: 'Agustina Orsi',
			},
			reviewBody:
				'Hice el curso de Hematología y realmente fue muy bueno e interesante. Aprendí un montón. Súper recomendable!',
			reviewRating: {
				'@type': 'Rating',
				ratingValue: '5',
				bestRating: '5',
			},
		},
	],
};

export default reviewsDataSEO;
