import { useEffect, useState } from 'react';
import { getCourse } from '../service/courseService';
import { CourseSectionHeader, ContentData } from '../types/types';

type HeaderData = CourseSectionHeader | { title: string };

export function useCourseHeader(slug: string, lang: string) {
	const [data, setData] = useState<HeaderData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!slug) return;

		getCourse(slug, lang)
			.then((contentData: ContentData) => {
				if (contentData.resource === 'course') {
					const headerData: CourseSectionHeader = contentData.sections.header;
					setData(headerData);
				} else if (contentData.resource === 'downloadable') {
					setData({ title: contentData.title });
				}
			})
			.catch((err) => {
				console.error(err);
				setError(err.message || 'Error fetching header data');
			})
			.finally(() => setLoading(false));
	}, [slug, lang]);
console.log(data,'AAAAAAAAAAAAAA')
	return { data, loading, error };
}
