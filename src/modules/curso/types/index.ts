export type CursoCategory = {
	id: number;
	name: string;
	slug: string;
	is_primary: boolean;
};

export type CursoInstitution = {
	id: number;
	title: string;
	slug: string;
	image: string;
};

export type CursoLearningItem = {
	msk_learning_content: string;
};

export type CursoHability = {
	id: number;
	name: string;
	slug: string;
};

export type CursoTeachingTeamMember = {
	id: number;
	name: string;
	slug: string;
	description: string;
	image: string;
	link: string;
};

export type CursoStudyPlanModule = {
	title: string;
	content: string;
};

export type CursoStudyPlanFile = {
	ID: number;
	id: number;
	title: string;
	filename: string;
	filesize: number;
	url: string;
	link: string;
	alt: string;
	author: string;
	description: string;
	caption: string;
	name: string;
	status: string;
	uploaded_to: number;
	date: string;
	modified: string;
	menu_order: number;
	mime_type: string;
	type: string;
	subtype: string;
	icon: string;
};

export type CursoStudyPlan = {
	hours: string;
	study_plan_file: CursoStudyPlanFile;
	modules: CursoStudyPlanModule[];
};

export type CursoSections = {
	header: {
		title: string;
		has_certificate: boolean;
		categories: CursoCategory[];
	};
	content: {
		title: string;
		content: string;
	};
	institutions: CursoInstitution[];
	learning: CursoLearningItem[];
	habilities: CursoHability[];
	with_this_course: string;
	your_course_steps: {
		step: string;
	}[];
	teaching_team: CursoTeachingTeamMember[];
	video: boolean;
	certificate: {
		has_certificate: boolean;
	};
	study_plan: CursoStudyPlan;
};

export type Curso = {
	id: number;
	title: string;
	slug: string;
	date: string;
	featured_image: string;
	categories: CursoCategory[];
	link: string;
	sections: CursoSections;
};
