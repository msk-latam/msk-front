
import { useEffect, useState } from 'react';
import { CourseSectionHeader } from '../types/types';
import { getCourse } from '../service/courseService';

export function useCourseHeader(slug: string) {
	const [data, setData] = useState<CourseSectionHeader | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
  
	useEffect(() => {
	  if (!slug) return;
  
	  getCourse(slug)
		.then((courseData) => {
		  // courseData es todo el objeto del curso
		  const headerData: CourseSectionHeader = courseData.sections.header;
		  setData(headerData);
		})
		.catch((err) => {
		  console.error(err);
		  setError(err.message || "Error fetching header data");
		})
		.finally(() => setLoading(false));
	}, [slug]);

console.log('aaaaAaaaaaa',data)
	return { data, loading, error };
}
