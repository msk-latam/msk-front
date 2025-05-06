import { useEffect, useState } from 'react';
import { getCourse } from '../service/courseService';
import { CourseVideoData, ContentData } from '../types/types';

export function useCourseVideo(slug: string, lang: string) {
	const [data, setData] = useState<CourseVideoData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!slug) return;

		getCourse(slug, lang)
			.then((contentData: ContentData) => {
				const video = contentData.resource === 'course'
					? contentData.sections?.video ?? null
					: null;
				setData(video);
			})
			.catch((err) => {
				console.error(err);
				setError(err.message || 'Error fetching video data');
			})
			.finally(() => setLoading(false));
	}, [slug, lang]);

	return { data, loading, error };
}
