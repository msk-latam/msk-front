import { useEffect, useState } from 'react';
import { getCourse } from '../service/courseService';
import { CourseInstitution } from '../types/types';

export function useCourseInstitutions(slug: string, lang: string) {
	const [data, setData] = useState<CourseInstitution[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!slug) return;

		getCourse(slug, lang)
			.then((courseData) => {
				// courseData es todo el objeto del curso
				const institutionsData: CourseInstitution[] = courseData.sections.institutions;
				setData(institutionsData);
			})
			.catch((err) => {
				console.error(err);
				setError(err.message || 'Error fetching institutions data');
			})
			.finally(() => setLoading(false));
	}, [slug, lang]);
	return { data, loading, error };
}
