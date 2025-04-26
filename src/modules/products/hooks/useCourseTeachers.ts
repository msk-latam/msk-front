
import { useEffect, useState } from 'react';
import { CourseTeachersData } from '../types/types';
import { getCourse } from '../service/courseService'

export function useCourseTeachers(slug: string) {
	const [data, setData] = useState<CourseTeachersData[]| null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
  
	useEffect(() => {
	  if (!slug) return;
  
	  getCourse(slug)
		.then((courseData) => {
		  // courseData es todo el objeto del curso
		  const teachersData: CourseTeachersData[]= courseData.sections.teaching_team;
		  setData(teachersData);
		})
		.catch((err) => {
		  console.error(err);
		  setError(err.message || "Error fetching teachers data");
		})
		.finally(() => setLoading(false));
	}, [slug]);
	return { data, loading, error };
}
