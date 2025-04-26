
import { useEffect, useState } from 'react';
import { CourseVideoData } from '../types/types';
import { getCourse } from '../service/courseService'

export function useCourseVideo(slug: string) {
	const [data, setData] = useState<CourseVideoData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
  
	useEffect(() => {
	  if (!slug) return;
  
	  getCourse(slug)
		.then((courseData) => {
		  // courseData es todo el objeto del curso
		  const videoData: CourseVideoData = courseData.sections.video;
		  setData(videoData);
		})
		.catch((err) => {
		  console.error(err);
		  setError(err.message || "Error fetching video data");
		})
		.finally(() => setLoading(false));
	}, [slug]);
	
	return { data, loading, error };
}

