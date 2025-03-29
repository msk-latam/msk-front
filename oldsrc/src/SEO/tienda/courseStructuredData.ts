export function generateCourseStructuredData(course: {
	name: string;
	description: string;
	mode: string;
	startDate: string;
	endDate: string;
	timeRequired: string;
	prerequisites: string;
	instructor: string;
	price: number;
	currency: string;
	url: string;
	faqs: { question: string; answer: string }[];
}) {
	return [
		{
			'@context': 'https://schema.org',
			'@type': 'Course',
			name: course.name,
			description: course.description,
			provider: {
				'@type': 'Organization',
				name: 'Colegio de Médicos de la Provincia de Buenos Aires - Distrito III',
				url: 'https://www.msklatam.com/ar',
			},
			educationalProgramMode: course.mode,
			hasCourseInstance: {
				'@type': 'CourseInstance',
				courseMode: '100% online',
				name: `${course.name} - Edición ${new Date(course.startDate).getFullYear()}`,
				startDate: course.startDate,
				endDate: course.endDate,
				timeRequired: course.timeRequired,
				coursePrerequisites: course.prerequisites,
				instructor: {
					'@type': 'Person',
					name: course.instructor,
				},
				offers: {
					'@type': 'Offer',
					price: course.price,
					priceCurrency: course.currency,
					availability: 'https://schema.org/InStock',
					url: course.url,
				},
			},
		},
		{
			'@context': 'https://schema.org',
			'@type': 'FAQPage',
			mainEntity: course.faqs.map((faq) => ({
				'@type': 'Question',
				name: faq.question,
				acceptedAnswer: {
					'@type': 'Answer',
					text: faq.answer,
				},
			})),
		},
	];
}
