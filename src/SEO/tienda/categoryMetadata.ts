// generateCategoryMetadata.ts
import { Metadata } from 'next';

interface GenerateCategoryMetadataProps {
	category: string;
	lang: string;
}

export function generateCategoryMetadata({ category, lang }: GenerateCategoryMetadataProps): Metadata {
	const canonicalUrl = `https://msklatam.com/${lang}/tienda/${category}/`;

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
			'Explora el estudio de las enfermedades de la sangre, como anemias, leucemias y trastornos relacionados con la hematología.',
		// infectologia:
		// 	'Cursos sobre la prevención, diagnóstico y tratamiento de enfermedades infecciosas que afectan a pacientes en diversas circunstancias.',
		// 'medicina-familiar':
		// 	'Adquiere una visión integral de la salud familiar, abordando desde la prevención hasta el tratamiento de enfermedades comunes.',
		// 'medicina-general':
		// 	'Desarrolla tus habilidades en medicina general para brindar atención primaria efectiva y tratamiento a una amplia gama de enfermedades.',
		// 'medicina-intensiva':
		// 	'Profundiza en el cuidado de pacientes en estado crítico con cursos de medicina intensiva, cubriendo todos los aspectos esenciales.',
		// nefrologia:
		// 	'Aprende sobre las enfermedades renales y su tratamiento, especializándote en el manejo de pacientes con insuficiencia renal y otras afecciones.',
		// neurologia:
		// 	'Cursos especializados en neurología, orientados al diagnóstico y tratamiento de trastornos neurológicos que afectan al sistema nervioso.',
		// nutricion:
		// 	'Conoce los fundamentos de la nutrición y cómo aplicar esos conocimientos para promover una salud óptima a través de una alimentación adecuada.',
		// obstetricia:
		// 	'Especialízate en obstetricia y aprende a manejar todos los aspectos relacionados con el embarazo, el parto y el posparto.',
		// oncologia:
		// 	'Cursos de oncología que te permitirán conocer las últimas investigaciones y tratamientos en el tratamiento del cáncer.',
		// pediatria:
		// 	'Enfócate en la atención médica de niños y adolescentes, conociendo enfermedades pediátricas y su tratamiento específico.',
		// psiquiatria:
		// 	'Desarrolla competencias en el diagnóstico y tratamiento de enfermedades mentales a través de los cursos de psiquiatría.',
		// 'radiologia-e-imagenologia':
		// 	'Cursos sobre diagnóstico por imágenes, enfocándose en las técnicas avanzadas utilizadas para estudiar diversas condiciones médicas.',
		// traumatologia:
		// 	'Cursos de traumatología, orientados al diagnóstico y tratamiento de lesiones traumáticas que afectan huesos, músculos y tejidos blandos.',
		// urologia:
		// 	'Estudia la urología para conocer el diagnóstico y tratamiento de enfermedades del sistema urinario y reproductivo masculino.',
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

	return {
		title: `Cursos de ${categoryTitle} | MSK`,
		description: categoryDescription,
		alternates: {
			canonical: canonicalUrl,
		},
	};
}
