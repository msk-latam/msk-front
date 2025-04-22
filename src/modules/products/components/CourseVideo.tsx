// components/CourseVideo.tsx
'use client';

import React from 'react';
import { useCourseVideo } from '../hooks/useCourseVideo';
import { CourseVideoData } from '../hooks/useCourseData';

interface CourseVideoProps {
  courseId: string | number;
}

const CourseVideo: React.FC<CourseVideoProps> = ({ courseId }) => {
  const { data, loading, error } = useCourseVideo(courseId);

  const video = data?.video;

  if (loading) return <p>Cargando video...</p>;
  if (error) return <p>Error: {error}</p>;
  if (video === false) return null; // si explícitamente no hay video
  if (typeof video !== 'string' || video.trim() === '') return null; // seguridad adicional

  return (
    <div className="w-full rounded-[30px]">
      <video controls className="w-full rounded-[30px] shadow-md">
        <source src={video} type="video/mp4" />
        Tu navegador no soporta la reproducción de video.
      </video>
    </div>
  );
};

export default CourseVideo;
