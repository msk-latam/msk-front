
import { useEffect, useState } from 'react';
import { CourseDescription } from '../types/types';
import { getCourse } from '../service/courseService'

export function useCourseDescription(slug: string) {
	const [data, setData] = useState<CourseDescription | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
  
	useEffect(() => {
	  if (!slug) return;
  
	  getCourse(slug)
		.then((courseData) => {
		  // courseData es todo el objeto del curso
		  const headerData: CourseDescription = courseData.sections.content;
		  setData(headerData);
		})
		.catch((err) => {
		  console.error(err);
		  setError(err.message || "Error fetching description data");
		})
		.finally(() => setLoading(false));
	}, [slug]);
	
	return { data, loading, error };
}
