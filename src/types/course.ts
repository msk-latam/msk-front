export interface CourseCategory {
	term_id: number;
	name: string;
	slug: string;
	is_primary: boolean;
}

export interface CourseCedente {
	id: number;
	name: string;
}

export interface CourseCodes {
	unique_code: string | null;
	isbn: string | null;
}

export interface Course {
	[x: string]: any;
	id: number;
	title: string;
	slug: string;
	resource: string;
	excerpt: string;
	date: string; // Consider using Date type if needed
	featured_images: {
		medium: string;
		large: string;
		full: string;
	};
	prices: {
		is_free: boolean;
		sale_price: string;
		regular_price: string;
		total_price: string;
		max_installments: string;
		price_installments: number;
	};
	categories: CourseCategory[];
	professions: any[]; // Define more specifically if needed
	codes: CourseCodes;
	cedente: CourseCedente | []; // API shows it can be an empty array or object
	duration: string | null;
	link: string;
}

export interface CoursesApiResponseMeta {
	total: number;
	pages: number;
	page: number;
	per_page: number;
	search: string;
	lang: string;
	cache_key: string;
}

export interface CoursesApiResponse {
	meta: CoursesApiResponseMeta;
	data: Course[];
}
