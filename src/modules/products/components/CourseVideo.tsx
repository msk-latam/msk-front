'use client';

import React from 'react';
import { useCourseVideo } from '../hooks/useCourseVideo';
import CourseVideoSkeleton from '../skeletons/CourseVideoSkeleton'; // Import the skeleton loader

interface CourseVideoProps {
	slug: string;
	lang: string;
}

const CourseVideo: React.FC<CourseVideoProps> = ({ slug, lang }) => {
	const { data, loading, error } = useCourseVideo(slug, lang);

	const video = data?.video;

	if (loading) return <CourseVideoSkeleton />; // Show skeleton loader while loading
	if (video === false) return null; // If explicitly no video
	if (typeof video !== 'string' || video.trim() === '') return null; // Additional security check

	return (
		<div className='w-full rounded-[30px]'>
			<video controls className='w-full rounded-[30px] shadow-md'>
				<source src={video} type='video/mp4' />
				Tu navegador no soporta la reproducción de video.
			</video>
			{/* <img src="/images/productpage/videomock.png" alt="mock" /> */}
		</div>
	);
};

export default CourseVideo;
