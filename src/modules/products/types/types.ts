

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
  
  export interface Teacher {
	id: number | null;
	name: string | null;
	slug: string | null;
	description: string | null;
	image: string | false;
	link: string;
  }
  
  export type CourseTeachersData = Teacher[];
  
  export interface Modules {
	title: string;
	content: string;
  }
  
  export interface Steps {
	step: string;
  }
  
  export interface CourseSyllabus {
	hours: string;
	study_plan_file: string | false;
	modules: Modules[];
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
  