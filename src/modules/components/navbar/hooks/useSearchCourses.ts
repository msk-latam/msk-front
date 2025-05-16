'use client';

import { Course, CoursesApiResponse } from '@/types/course';
import { useEffect, useState } from 'react';

/**
 * Fetch courses from the MSK API using the server-side search endpoint.
 * It triggers every time either the `searchTerm` (debounced from the consumer) or `lang` changes.
 * When `searchTerm` is empty, no request is sent and the hook returns an empty list.
 */
export const useSearchCourses = (lang: string, searchTerm: string) => {
	const [courses, setCourses] = useState<Course[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const trimmed = searchTerm.trim();
		if (trimmed === '') {
			setCourses([]);
			setLoading(false);
			setError(null);
			return;
		}

		const controller = new AbortController();
		const { signal } = controller;

		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const apiUrl = `https://cms1.msklatam.com/wp-json/msk/v1/products?lang=${encodeURIComponent(
					lang || 'int',
				)}&search=${encodeURIComponent(trimmed)}&per_page=4&page=1`;

				const response = await fetch(apiUrl, { signal });
				if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
				const data: CoursesApiResponse = await response.json();

				// Deduplicate by father_id keeping the first occurrence (matches original logic)
				const uniqueCourses = Object.values(
					data.data.reduce((acc, course) => {
						if (!acc[course.father_id]) acc[course.father_id] = course;
						return acc;
					}, {} as Record<number, Course>),
				);

				setCourses(uniqueCourses);
			} catch (e: any) {
				if (e.name !== 'AbortError') {
					setError(e.message);
				}
			} finally {
				setLoading(false);
			}
		};

		fetchData();

		// Cancel in-flight request if searchTerm/lang changes or component unmounts
		return () => controller.abort();
	}, [lang, searchTerm]);

	return { courses, loading, error };
};
