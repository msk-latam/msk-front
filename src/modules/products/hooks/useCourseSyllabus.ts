import { useEffect, useState } from 'react';
import { getCourse } from '../service/courseService';
import { CourseSyllabus, ContentData } from '../types/types';

export function useCourseSyllabus(slug: string, lang: string) {
	const [data, setData] = useState<CourseSyllabus | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!slug) return;

		getCourse(slug, lang)
			.then((contentData: ContentData) => {
				if (contentData.resource === 'course') {
					const syllabusData: CourseSyllabus = {
						hours: contentData.sections.study_plan?.hours ?? '',
						study_plan_file:
							contentData.sections.study_plan?.study_plan_file ?? {
								ID: 0,
								title: '',
								filename: '',
								url: '',
								link: '',
								filesize: 0,
							},
						modules: contentData.sections.study_plan?.modules ?? [],
					};
					setData(syllabusData);
				} else {
					setData({
						hours: '',
						study_plan_file: {
							ID: 0,
							title: '',
							filename: '',
							url: '',
							link: '',
							filesize: 0,
						},
						modules: [],
					});
				}
				
					return;
				
			})
			.catch((err) => {
				console.error(err);
				setError(err.message || 'Error fetching syllabus data');
			})
			.finally(() => setLoading(false));
	}, [slug, lang]);

	return { data, loading, error };
}
