
import { useEffect, useState } from 'react';
import { CourseOverviewData } from '../types/types';
import { getCourse } from '../service/courseService'

export function useCourseOverview(slug: string) {
	const [data, setData] = useState<CourseOverviewData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
  
	useEffect(() => {
		if (!slug) return;
	
		getCourse(slug)
		  .then((courseData) => {
				const overviewData: CourseOverviewData = {
					habilities: courseData.sections?.habilities ?? [],
					with_this_course: courseData.sections?.with_this_course ?? '',
					your_course_steps: courseData.sections?.your_course_steps ?? [],
				};

				setData(overviewData);
			})
				.catch((err) => {
					console.error(err);
					setError(err.message || "Error fetching overview data");
				  })
				  .finally(() => setLoading(false));
			  }, [slug]);
			  console.log(data)
	return { data, loading, error };
}
