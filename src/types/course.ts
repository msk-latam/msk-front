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
	id: number;
	title: string;
	slug: string;
	date: string; // Consider using Date type if needed
	featured_image: string;
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
