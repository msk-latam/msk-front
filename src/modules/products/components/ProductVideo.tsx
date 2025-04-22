// components/VideoPlayer.tsx
'use client';

import React from 'react';
import { useCourseVideo } from '../hooks/useCourseVideo';
import { CourseVideo } from '../hooks/useCourseData';

interface VideoPlayerProps {
  courseId: string | number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ courseId }) => {
  const { data, loading, error } = useCourseVideo(courseId);

  const video = data?.video;

  if (loading) return <p>Cargando video...</p>;
  if (error) return <p>Error: {error}</p>;
  if (video === false) return null; // si explícitamente no hay video
  if (typeof video !== 'string' || video.trim() === '') return null; // seguridad adicional

  return (
    <div className="w-full bg-white rounded-[38px] md:py-10 md:px-9 px-6 py-12">
      <video controls className="w-full rounded-[38px] shadow-md">
        <source src={video} type="video/mp4" />
        Tu navegador no soporta la reproducción de video.
      </video>
    </div>
  );
};

export default VideoPlayer;
