
import { useEffect, useState } from 'react';
import { CourseInstitution } from '../types/types';
import { getCourse } from '../service/courseService'

export function useCourseInstitutions(slug: string) {
	const [data, setData] = useState<CourseInstitution | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
  
	useEffect(() => {
	  if (!slug) return;
  
	  getCourse(slug)
		.then((courseData) => {
		  // courseData es todo el objeto del curso
		  const headerData: CourseInstitution = courseData.sections.institutions;
		  setData(headerData);
		})
		.catch((err) => {
		  console.error(err);
		  setError(err.message || "Error fetching institutions data");
		})
		.finally(() => setLoading(false));
	}, [slug]);
	
	return { data, loading, error };
}
