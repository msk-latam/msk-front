// // src/modules/product/hooks/useCourseSyllabus.ts
// import { useEffect, useState } from 'react';
// import { getCourseSyllabus } from './useCourseData';

// const useCourseSyllabus = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     getCourseSyllabus()
//       .then(setData)
//       .finally(() => setLoading(false));
//   }, []);

//   return { data, loading, error };
// };

// export default useCourseSyllabus;
