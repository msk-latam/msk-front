

export interface CourseCategory {
	term_id: number;
	name: string;
	slug: string;
	is_primary: boolean;
  }
  
  export interface CourseSectionHeader {
	title: string;
	has_certificate: boolean;
	categories: CourseCategory[];
  }
  
  export interface CourseLearning {
	msk_learning_content: string;
  }
  
  export interface CourseInstitution {
	id: number;
	title: string;
	slug: string;
	image: string;
	description?: string; // 👈 agregás esto
  }
  
  export interface CourseCertificate {
	has_certificate: boolean;
  }
  
  export interface CourseDescription {
	title: string;
	content: string;
  }
  
  export interface CourseVideoData {
	video: boolean | string;
  }
  
  export interface CourseHability {
	id: number;
	name: string;
	slug: string;
  }
  
  export interface CourseTeachersData {
	id: number | null;
	name: string | null;
	slug: string | null;
	description: string | null;
	image: string | false;
	link: string;
  }
  
  
  export interface StudyPlanFile {
	ID: number;
	title: string;
	filename: string;
	url: string;
	link: string;
	filesize: number;
  }
  
  export interface Modules {
	title: string;
	content: string; // Este contenido viene en HTML crudo
  }
  

  export interface CourseSyllabus {
	hours: string;
	study_plan_file: StudyPlanFile; // este será el link (url)
	modules: {
	  title: string;
	  content: string;
	}[];
  }

  
  
  export interface Steps {
	step: string;
  }
  
  
  export interface CourseOverviewData {
	habilities: CourseHability[];
	with_this_course: string;
	your_course_steps: Steps[];
  }
  
  export interface CourseData {
	id: number;
	title: string;
	slug: string;
	date: string;
	excerpt: string;
	featured_images: {
	  high: string;
	  medium: string;
	  low: string;
	};
	categories: CourseCategory[];
	link: string;
	sections: {
	  header: CourseSectionHeader;
	  content: CourseDescription;
	  institutions: CourseInstitution[];
	  learning: CourseLearning[];
	  habilities: CourseHability[];
	  with_this_course: string;
	  teaching_team: CourseTeachersData[];
	  your_course_steps: Steps[];
	  video: CourseVideoData;
	  certificate: CourseCertificate;
	  study_plan: CourseSyllabus;
	};
  }
  export interface BaseContentData {
	id: number;
	father_id: number;
	resource: 'course' | 'downloadable'; // discriminador
	title: string;
	slug: string;
	excerpt: string;
	date: string;
	featured_images: {
		high: string;
		medium: string;
		low: string;
	};
	prices: {
		is_free: boolean;
		sale_price: string;
		regular_price: string;
		total_price: string;
		max_installments: string;
		price_installments: number;
		currency: string | null;
		currency_code: string | null;
	};
	codes: {
		unique_code: string;
		isbn: string;
	}[];
	link: string;
}

export interface CourseData extends BaseContentData {
	resource: 'course';
	cedente: CourseInstitution;
	duration: string;
	enrolments: number;
	modules: number;
	sections: {
		header: CourseSectionHeader;
		content: CourseDescription;
		institutions: CourseInstitution[];
		learning: CourseLearning[];
		habilities: CourseHability[];
		with_this_course: string;
		teaching_team: CourseTeachersData[];
		your_course_steps: Steps[];
		video: CourseVideoData;
		certificate: CourseCertificate;
		study_plan: CourseSyllabus;
	};
}

export interface DownloadableData extends BaseContentData {
	resource: 'downloadable';
	// Podés agregar más campos específicos si aparecen en la API
}

export type ContentData = CourseData | DownloadableData;
