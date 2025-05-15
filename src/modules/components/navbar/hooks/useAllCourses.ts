// hooks/useAllCourses.ts
'use client';

import { useEffect, useState } from 'react';
import { Course, CoursesApiResponse } from '@/types/course';
export const useAllCourses = (lang: string) => {
	const [courses, setCourses] = useState<Course[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchCourses = async () => {
		setLoading(true);
		setError(null);
		try {
			const params = new URLSearchParams({
				page: '1',
				per_page: '300',
				orderby: 'newly',
				lang: lang || 'int',
			});
			const apiUrl = `https://cms1.msklatam.com/wp-json/msk/v1/products?${params.toString()}`;
			const response = await fetch(apiUrl);
			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
			const data: CoursesApiResponse = await response.json();
			const uniqueCourses = Object.values(
				data.data.reduce((acc, course) => {
					if (!acc[course.father_id]) acc[course.father_id] = course;
					return acc;
				}, {} as Record<number, Course>)
			);
			setCourses(uniqueCourses);
		} catch (e: any) {
			setError(e.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCourses(); // por ahora sigue auto-fetching
	}, [lang]);

	return { courses, loading, error, fetchCourses };
};
