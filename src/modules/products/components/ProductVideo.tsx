// components/VideoPlayer.tsx
'use client';

import React, { useEffect, useState } from 'react';

interface VideoData {
  videoUrl: string; // asumimos que la API devuelve esto
}

const VideoPlayer: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch('/api/video'); // cambiá esta URL por la real
        if (!res.ok) throw new Error('Error al cargar el video');
        const data: VideoData = await res.json();
        setVideoUrl(data.videoUrl);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, []);

  if (loading) return <p>Cargando video...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full max-w-3xl mx-auto">
      {videoUrl && (
        <video controls className="w-full rounded-[38px] shadow-md">
          <source src={videoUrl} type="video/mp4" />
          Tu navegador no soporta la reproducción de video.
        </video>
      )}
    </div>
  );
};

export default VideoPlayer;
