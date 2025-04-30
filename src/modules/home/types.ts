// HERO SECTION
export interface HeroSlide {
	background_image: [string, number, number, boolean];
	title: string;
	subtitle: string;
	cta: {
		title: string;
		url: string;
		target: string;
	};
}

export interface HeroSection {
	slides: HeroSlide[];
}

// OPORTUNIDADES SECTION

export type CursoWP = {
	id: number;
	title: string;
	featured_image: string;
	link: string;
	duration: string | null;
	categories: { name: string }[];
	cedente: any[];
};

export type CursoCardProps = {
	id: number;
	categoria: string;
	titulo: string;
	temas: number;
	horas: number;
	inscriptos: number;
	certificado: string;
	imagen: string;
	link: string; // <-- nuevo
};

export const mapCursoWPToCursoCard = (curso: CursoWP): CursoCardProps => ({
	id: curso.id,
	categoria: curso.categories?.[0]?.name || 'General', // Si `categories` está vacío, se usa "General".
	titulo: curso.title,
	temas: Math.floor(Math.random() * 10 + 5), // Mock para cantidad de temas
	horas: parseInt(curso.duration || '12'), // Si la duración está vacía, se asume 12 horas.
	inscriptos: Math.floor(Math.random() * 10000 + 1000), // Mock para inscriptos
	certificado: 'Incluido', // Valor por defecto
	imagen: curso.featured_image || '/images/curso-placeholder.jpg', // Si no hay imagen, usa la imagen placeholder
	link: curso.link, // ← Agregado
});

// MASTERCLASS SECTION
export interface Doctor {
	name: string;
	specialty?: string;
	image?: string; // URL de foto
	link: string;
}

export interface Professional {
	nombre: string;
	especialidad: string;
	imagenDesktop: string;
	imagenMobile: string;
	perfilUrl: string;
	duration?: string; // ← duración opcional
}

export interface MasterclassLink {
	title: string;
	url: string;
	target?: string;
}

export interface MasterclassAPIItem {
	id: number;
	title: string;
	slug: string;
	description: string;
	date: string;
	background_image: [string, number, number, boolean];
	link: MasterclassLink;
	doctors?: Doctor[];
	tags?: string[] | null;
}

// Mapper para transformar MasterclassAPIItem en Professional[]
export const mapMasterclassToProfessionals = (mc: MasterclassAPIItem): Professional[] => {
	const descripcionGlobal = mc.description?.trim() || 'Descripción no disponible';

	if (!mc.doctors || mc.doctors.length === 0) {
		return [
			{
				nombre: mc.title,
				especialidad: descripcionGlobal,
				imagenDesktop: mc.background_image?.[0] || '/images/masterclass/fallback-desktop.jpg',
				imagenMobile: mc.background_image?.[0] || '/images/masterclass/fallback-mobile.jpg',
				perfilUrl: mc.link?.url || '#',
			},
		];
	}

	return mc.doctors.map((doctor) => ({
		nombre: doctor.name,
		especialidad: doctor.specialty?.trim() || 'Cardiólogo',
		imagenDesktop: doctor.image || '/images/masterclass/fallback-desktop.jpg',
		imagenMobile: doctor.image || '/images/masterclass/fallback-mobile.jpg',
		perfilUrl: doctor.link || mc.link?.url || '#',
	}));
};

// BLOG SECTION

export type Category = {
	id: number;
	name: string;
	slug: string;
};

export type BlogPost = {
	id: number;
	title: string;
	subtitle?: string;
	author: string;
	date: string;
	readTime: string | null;
	tags: string[];
	featured_image: string;
	link: string;
	categories: Category[];
	featured: string; // Marks if the post is featured
};

export type BlogResponse = {
	title: string;
	subtitle: string;
	featured_blog_articles: BlogPost[];
	featured_blog_guides: BlogPost[];
	featured_blog_infographies: BlogPost[];
};

// FQA SECTION

export interface Faq {
	question: string;
	answer: string; // string en HTML
}

export interface FaqData {
	title: string;
	questions: Faq[] | null;
}

//TrustSection

// types.ts

export interface Figure {
	figure: string;
}

export interface Opinion {
	avatar: [string, number, number, boolean]; // URL de la imagen, tamaño en px, tamaño en px, si la imagen está optimizada
	name: string;
	opinion: string;
	rating: string;
}

export interface TrustSection {
	title: string;
	subtitle: string;
	figures: Figure[];
	opinions: Opinion[];
}

// INSTITUTION SECTION
export interface Institution {
	id: number;
	title: string;
	slug: string;
	image: string;
}

// Offers SECTION

export interface OfferCTA {
	title: string;
	url: string;
	target: string;
}

export interface OfferData {
	background_image: string[];
	pre_text: string;
	title: string;
	content: string;
	pre_cta_content: string;
	cta: {
		title: string;
		url: string;
	};
}

export interface Mention {
	title: string;
	content: string;
	date: string;
	link: {
		title: string;
		url: string;
		target: string;
	};
}
