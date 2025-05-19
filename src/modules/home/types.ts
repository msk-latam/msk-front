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
	topics?: number;
	hours?: number;
	enrolled?: number;
	certificate?: string;
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
	link: string;
};

export type OportunidadesResponse = {
	courses: {
		title: string;
		subtitle: string;
	};
	novedades: CursoWP[];
	recomendados: CursoWP[];
	gratuitos: CursoWP[];
};

export const mapCursoWPToCursoCard = (curso: any): CursoCardProps => ({
	id: curso.id,
	categoria: curso.categories?.[0]?.name || 'General',
	titulo: curso.title,
	temas: curso.themes ?? 0, // asegurate que este sea el nombre correcto
	horas: curso.hours ?? parseInt(curso.duration || '0'),
	inscriptos: curso.inscriptions ?? 0,
	certificado: curso.certificate === true ? 'Certificación: incluída' : '',
	imagen: curso.featured_image || '',
	link: curso.link,
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
	const descripcionGlobal = mc.description?.trim() || '';

	if (!mc.doctors || mc.doctors.length === 0) {
		return [
			{
				nombre: mc.title,
				especialidad: descripcionGlobal,
				imagenDesktop: mc.background_image?.[0] || '',
				imagenMobile: mc.background_image?.[0] || '',
				perfilUrl: mc.link?.url || '#',
			},
		];
	}

	return mc.doctors.map((doctor) => ({
		nombre: doctor.name,
		especialidad: doctor.specialty?.trim() || '',
		imagenDesktop: doctor.image || '',
		imagenMobile: doctor.image || '',
		perfilUrl: doctor.link || mc.link?.url || '#',
	}));
};

//BLOG SECTION

export type Category = {
	id: number;
	name: string;
	slug: string;
};

export interface BlogAuthor {
	id: number;
	name: string;
	image?: string;
}

export interface BlogPost {
	id: number;
	title: string;
	subtitle?: string;
	author: BlogAuthor[];
	date: string;
	readTime?: string | null;
	tags?: string[];
	featured_image: string;
	link: string;
	categories?: Category[];
	featured?: string;
}

export type BlogResponse = {
	title: string;
	subtitle: string;
	featured_blog_articles: BlogPost[];
	featured_blog_guides: BlogPost[];
	featured_blog_infographies: BlogPost[];
};

export const sanitizeBlogPost = (post: BlogPost): BlogPost => ({
	...post,
	subtitle: post.subtitle?.trim() || undefined,
	author: Array.isArray(post.author)
		? post.author.map((a) => ({
				id: a.id,
				name: a.name || 'No informado',
				image: a.image || undefined,
		  }))
		: [],
	readTime: typeof post.readTime === 'string' && post.readTime.trim() !== '' ? post.readTime : '3',
	tags: post.tags || [],
	categories: post.categories || [],
	featured_image: post.featured_image || '/images/blog-placeholder.jpg',
	link: post.link || '#',
});

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

export interface Review {
	picture: string; // URL de la imagen, tamaño en px, tamaño en px, si la imagen está optimizada
	name: string;
	review: string;
	stars: string;
}

export interface TrustSection {
	title: string;
	subtitle: string;
	figures: Figure[];
	reviews: Review[];
}

// INSTITUTION SECTION
export interface Institution {
	id: number;
	title: string;
	slug: string;
	image: string;
}

// Offers SECTION

// Offers SECTION

export interface OfferCTA {
	title: string;
	url: string;
	target: string;
}

export interface PromoData {
	[x: string]: any;
	background_image: string; // Ya no es un array, es un solo string
	disponibilidad: string;
	titulo: string;
	contenido: string;
	numero_de_porcentaje: string;
	texto_descuento: string;
	cta: OfferCTA;
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
