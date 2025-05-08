import { useEffect, useState } from 'react';
import { getCourse } from '../service/courseService';
import { ReviewItem } from '../types/types';

export function useCourseReviews(slug: string, lang: string) {
	const [data, setData] = useState<ReviewItem[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!slug) return;

		getCourse(slug, lang)
			.then((courseData) => {
				// courseData.sections.reviews is ReviewItem[]
				const reviewsArray: ReviewItem[] = courseData.sections.reviews;
				console.log(reviewsArray);
				setData(reviewsArray);
			})
			.catch((err) => {
				console.error(err);
				setError(err.message || 'Error fetching reviews data');
			})
			.finally(() => setLoading(false));
	}, [slug, lang]);

	return { data, loading, error };
}
