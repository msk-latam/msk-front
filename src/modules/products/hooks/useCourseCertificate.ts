// // src/modules/product/hooks/useCourseCertificate.ts
// import { useEffect, useState } from 'react';
// import { getCourseCertificate } from './useCourseData';

// const useCourseCertificate = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     getCourseCertificate()
//       .then(setData)
//       .catch(() => setError('No se pudo cargar la información del certificado.'))
//       .finally(() => setLoading(false));
//   }, []);

//   return { data, loading, error };
// };

// export default useCourseCertificate;
