import { useEffect, useState } from 'react';
import { getCourse } from '../service/courseService';
import { CourseDescription, ContentData } from '../types/types';

export function useCourseDescription(slug: string, lang: string) {
	const [data, setData] = useState<CourseDescription | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!slug) return;

		getCourse(slug, lang)
			.then((contentData: ContentData) => {
				const description = contentData.resource === 'course'
					? contentData.sections?.content ?? null
					: null;
				setData(description);
			})
			.catch((err) => {
				console.error(err);
				setError(err.message || 'Error fetching description data');
			})
			.finally(() => setLoading(false));
	}, [slug, lang]);

	return { data, loading, error };
}
