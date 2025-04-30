import { useEffect, useState } from 'react';
import { getCourse } from '../service/courseService';
import { CourseDescription } from '../types/types';

export function useCourseDescription(slug: string, lang: string) {
	const [data, setData] = useState<CourseDescription | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!slug) return;

		getCourse(slug, lang)
			.then((courseData) => {
				// courseData es todo el objeto del curso
				const descriptionData: CourseDescription = courseData.sections.content;
				setData(descriptionData);
			})
			.catch((err) => {
				console.error(err);
				setError(err.message || 'Error fetching description data');
			})
			.finally(() => setLoading(false));
	}, [slug, lang]);

	return { data, loading, error };
}
