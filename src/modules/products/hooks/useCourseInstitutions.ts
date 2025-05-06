import { useEffect, useState } from 'react';
import { getCourse } from '../service/courseService';
import { CourseInstitution, ContentData } from '../types/types';

export function useCourseInstitutions(slug: string, lang: string) {
	const [data, setData] = useState<CourseInstitution[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!slug) return;

		getCourse(slug, lang)
			.then((contentData: ContentData) => {
				const institutions = contentData.resource === 'course'
					? contentData.sections?.institutions ?? []
					: [];
				setData(institutions);
			})
			.catch((err) => {
				console.error(err);
				setError(err.message || 'Error fetching institutions data');
			})
			.finally(() => setLoading(false));
	}, [slug, lang]);

	return { data, loading, error };
}
