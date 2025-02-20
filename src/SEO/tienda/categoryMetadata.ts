// generateCategoryMetadata.ts
import { Metadata } from 'next';
import { cookies } from 'next/headers';

interface GenerateCategoryMetadataProps {
	category: string;
	lang: string;
}

export function generateCategoryMetadata({ category, lang }: GenerateCategoryMetadataProps): Metadata {
	const canonicalUrl = `https://msklatam.com/${lang}/tienda/${category}/`;
	const currentCountry = lang || cookies().get('country')?.value;
	const hostname = process.env.VERCEL_URL || '';
	const IS_PROD = hostname.includes('msklatam') && !hostname.includes('tech');
	// const IS_PROD = true;

	const titles = [
		'Administración y gestión',
		'Anestesiología y dolor',
		'Cardiología',
		'Cirugía',
		'Dermatología',
		'Diabetes',
		'Emergentología',
		'Endocrinología',
		'Gastroenterología',
		'Geriatría',
		'Ginecología',
		'Hematología',
		'Infectología',
		'Medicina familiar',
		'Medicina general',
		'Medicina intensiva',
		'Nefrología',
		'Neurología',
		'Nutrición',
		'Obstetricia',
		'Oncología',
		'Pediatría',
		'Psiquiatría',
		'Radiología e imagenología',
		'Traumatología',
		'Urologia',
	];

	const slugs = [
		'administracion-y-gestion',
		'anestesiologia-y-dolor',
		'cardiologia',
		'cirugia',
		'dermatologia',
		'diabetes',
		'emergentologia',
		'endocrinologia',
		'gastroenterologia',
		'geriatria',
		'ginecologia',
		'hematologia',
		'infectologia',
		'medicina-familiar',
		'medicina-general',
		'medicina-intensiva',
		'nefrologia',
		'neurologia',
		'nutricion',
		'obstetricia',
		'oncologia',
		'pediatria',
		'psiquiatria',
		'radiologia-e-imagenologia',
		'traumatologia',
		'urologia',
	];
	const descriptions = {
		'administracion-y-gestion':
			'Descubre cursos de administración y gestión que te permitan desempeñarte como jefe de servicio o gerente en establecimientos prestadores de servicios de salud.',
		'anestesiologia-y-dolor':
			'Descubre cursos de anestesiología y mantente al día con las últimas actualizaciones y recomendaciones. Profundiza tu capacitación en un área siempre cambiante.',
		cardiologia:
			'Recorre nuestros cursos de cardiología y actualiza tus conocimientos sobre la especialidad para así optimizar el cuidado, el diagnóstico y el tratamiento.',
		cirugia:
			'Profundiza tu capacitación explorando nuestros cursos de cirugía, para mantener tus conocimientos actualizados sobre las últimas novedades en intervenciones y tratamientos.',
		dermatologia:
			'Conoce nuestra oferta en cursos de dermatología para perfeccionar y/o actualizar tus conocimientos, conocer nuevos enfoques y profundizar tu aprendizaje',
		diabetes:
			'Explora nuestros cursos de diabetes para abordar las complicaciones agudas y crónicas que puede generar. Mantente al día en tu capacitación profesional con MSK.',
		emergentologia:
			'Con nuestros cursos de emergentología desarrollarás las habilidades y los conocimientos esenciales para poner en práctica en servicios de urgencias y emergencias.',
		endocrinologia:
			'Explora nuestros cursos de endocrinología y fórmate en las enfermedades metabólicas y aquellas derivadas del proceso nutricional. Amplía tus posibilidades con MSK.',
		gastroenterologia:
			'Con nuestros cursos de gastroenterología podrás capacitarte para identificar, diagnosticar e implementar tratamientos para trastornos del aparato digestivo.',
		geriatria:
			'Con nuestros cursos de geriatría dispondrás de las herramientas y los contenidos más actualizados para perfeccionar tu calidad asistencial para el adulto mayor.',
		ginecologia: 'Explora nuestros cursos de ginecología para profundizar en el abordaje de las infecciones ginecológicas',
		hematologia:
			'Explora nuestros cursos de hematología y profundiza en el estudio de los distintos tipos de anemia, los síndromes mielodisplásicos, los tipos de leucemia y linfoma.',
		infectologia:
			'Amplía tus conocimientos con nuestros cursos de  infectología. Aprende de expertos y mejora tu práctica profesional. ¡Inscríbete ahora!',
		'medicina-familiar':
			'Descubre los cursos de medicina familiar en MSK. Formación especializada para mejorar la atención integral de tus pacientes. Comienza hoy.',
		'medicina-general':
			'Capacítate con los cursos de medicina general de MSK. Adquiere nuevas habilidades y potencia tu carrera médica. ¡Regístrate hoy!',
		'medicina-intensiva':
			'Mejora tus competencias en medicina intensiva con cursos diseñados para profesionales. Aprende con MSK y marca la diferencia',
		nefrologia:
			'Especialízate con nuestros cursos de nefrología. Formación online de calidad para médicos que buscan la excelencia clínica.',
		neurologia:
			'Aprende las últimas actualizaciones en neurología con los cursos de MSK. Formación médica avanzada a tu alcance.',
		nutricion:
			'Descubre los cursos de nutrición en MSK. Capacitación profesional para mejorar la salud y el bienestar de tus pacientes.',
		obstetricia:
			'Perfecciona tus habilidades en obstetricia con los cursos de MSK. Formación para garantizar un cuidado materno-infantil óptimo.',
		oncologia:
			'Especialízate en oncología con cursos diseñados para profesionales médicos. Aprende en MSK y brinda una mejor atención a tus pacientes.',
		pediatria:
			'Capacítate en pediatría con los cursos online de MSK. Formación especializada para brindar una atención de calidad.',
		psiquiatria:
			'Avanza en tu carrera con los cursos de psiquiatría de MSK. Formación online para abordar la salud mental de manera efectiva.',
		'radiologia-e-imagenologia':
			'Domina la radiología e imagenología con los cursos de MSK. Capacitación médica avanzada para interpretar estudios con precisión.',
		traumatologia:
			'Especialízate en traumatología con los cursos de MSK. Aprende técnicas avanzadas para el diagnóstico y tratamiento eficaz.',
		urologia:
			'Amplía tus conocimientos en urología con los cursos online de MSK. Formación diseñada para médicos comprometidos con la excelencia.',
	};
	const categoryTitlesMap = slugs.reduce((acc, slug, index) => {
		acc[slug] = titles[index];
		return acc;
	}, {} as Record<string, string>);

	const categoryDescriptionsMap = descriptions;

	const categoryTitle = categoryTitlesMap[category] || category;

	const categoryDescription =
		categoryDescriptionsMap[category] ||
		'Descubre nuestro catálogo de cursos, entradas de blog y guías profesionales diseñados para impulsarte en tu carrera y profundizar en tus conocimientos.';

	const countries = {
		ar: 'Argentina',
		mx: 'México',
		cl: 'Chile',
		cr: 'Costa Rica',
		co: 'Colombia',
		pe: 'Perú',
		uy: 'Uruguay',
		py: 'Paraguay',
		bo: 'Bolivia',
		ec: 'Ecuador',
		ve: 'Venezuela',
		pa: 'Panamá',
		gt: 'Guatemala',
		hn: 'Honduras',
		sv: 'El Salvador',
		ni: 'Nicaragua',
		es: 'España',
	};
	// const siteUrl = 'http://localhost:3000';
	// const siteUrl = 'https://masklatam.tech'
	const siteUrl = 'https://msklatam.com';

	const hreflangUrls = Object.fromEntries(
		Object.keys(countries).map((country) => [
			`es-${country}`,
			`${siteUrl}${country === 'ar' ? '' : `/${country}`}/tienda/${category}/`,
		]),
	);

	return {
		title: `Cursos de ${categoryTitle} | MSK`,
		description: categoryDescription,
		alternates: IS_PROD
			? {
					canonical: hreflangUrls['es-ar'],
					languages: hreflangUrls,
			  }
			: undefined,
		robots: IS_PROD && currentCountry === undefined ? { index: true, follow: true } : { index: false, follow: false },
	};
}
