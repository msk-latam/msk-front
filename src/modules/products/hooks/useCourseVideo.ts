// // src/modules/product/hooks/useCourseVideo.ts
// import { useEffect, useState } from 'react';
// import { getCourseVideo } from './useCourseData';

// const useCourseVideo = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     getCourseVideo()
//       .then(setData)
//       .catch(() => setError('No se pudo cargar el video del curso.'))
//       .finally(() => setLoading(false));
//   }, []);

//   return { data, loading, error };
// };

// export default useCourseVideo;
