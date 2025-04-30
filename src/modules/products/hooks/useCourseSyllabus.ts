import { useEffect, useState } from 'react';
import { getCourse } from '../service/courseService';
import { CourseSyllabus } from '../types/types';

export function useCourseSyllabus(slug: string, lang: string) {
	const [data, setData] = useState<CourseSyllabus | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!slug) return;

		getCourse(slug, lang)
			.then((courseData) => {
				const syllabusData: CourseSyllabus = {
					hours: courseData.sections?.study_plan?.hours ?? '',
					study_plan_file: courseData.sections?.study_plan?.study_plan_file ?? [],
					modules: courseData.sections?.study_plan.modules ?? [],
				};

				setData(syllabusData);
			})
			.catch((err) => {
				console.error(err);
				setError(err.message || 'Error fetching overview data');
			})
			.finally(() => setLoading(false));
	}, [slug, lang]);
	console.log(data);
	return { data, loading, error };
}
