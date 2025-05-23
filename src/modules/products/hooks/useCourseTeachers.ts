import { useEffect, useState } from 'react';
import { getCourse } from '../service/courseService';
import { CourseTeachersData } from '../types/types';

export function useCourseTeachers(slug: string, lang: string) {
	const [data, setData] = useState<CourseTeachersData[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!slug) return;

		getCourse(slug, lang)
			.then((courseData) => {
				// courseData es todo el objeto del curso
				const teachersData: CourseTeachersData[] = courseData;
				setData(teachersData);
			})
			.catch((err) => {
				console.error(err);
				setError(err.message || 'Error fetching teachers data');
			})
			.finally(() => setLoading(false));
	}, [slug, lang]);
	return { data, loading, error };
}
