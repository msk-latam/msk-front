export function generateCategoryStructuredData(
	categoryName: string,
	description: string,
	courses: { name: string; url: string }[],
) {
	return {
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: categoryName,
		description: description,
		mainEntity: courses.map((course) => ({
			'@type': 'Course',
			name: course.name,
			url: course.url,
			provider: {
				'@type': 'Organization',
				name: 'Colegio de Médicos de la Provincia de Buenos Aires - Distrito III',
				url: 'https://www.msklatam.com/ar',
			},
		})),
	};
}
