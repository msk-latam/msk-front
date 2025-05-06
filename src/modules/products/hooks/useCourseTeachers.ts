import { useEffect, useState } from 'react';
import { getCourse } from '../service/courseService';
import { CourseTeachersData, ContentData } from '../types/types';

export function useCourseTeachers(slug: string, lang: string) {
	const [data, setData] = useState<CourseTeachersData[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!slug) return;

		getCourse(slug, lang)
			.then((contentData: ContentData) => {
				const teachers = contentData.resource === 'course'
					? contentData.sections?.teaching_team ?? []
					: [];
				setData(teachers);
			})
			.catch((err) => {
				console.error(err);
				setError(err.message || 'Error fetching teachers data');
			})
			.finally(() => setLoading(false));
	}, [slug, lang]);

	return { data, loading, error };
}
