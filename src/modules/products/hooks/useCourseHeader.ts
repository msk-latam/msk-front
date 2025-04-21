// import { useState, useEffect } from "react";

// export const useCourseHeader = (courseId: string | number) => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [title, setTitle] = useState<string>("");
//   const [categories, setCategories] = useState<string[]>([]);
//   const [hasCertificate, setHasCertificate] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchCourseData = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`https://cms1.msklatam.com/wp-json/msk/v1/course/${courseId}`);
        
//         if (!res.ok) {
//           throw new Error(`Error HTTP: ${res.status}`);
//         }

//         const data = await res.json();

//         // Comprobamos que los datos estén presentes
//         if (data) {
//           setTitle(data.title);
//           setCategories(data.categories.map((cat: any) => cat.name));
//           setHasCertificate(data.certification || false);
//         } else {
//           setError("Datos no encontrados.");
//         }
//       } catch (err) {
//         // Log más detallado del error
//         console.error("Error al cargar los datos del curso:", err);
//         setError("Hubo un problema al cargar los datos.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourseData();
//   }, [courseId]);

//   return { loading, error, title, categories, hasCertificate };
// };


import { useState, useEffect } from 'react'
import axios from 'axios'
import { CourseSectionHeader } from './useCourseData'

export function useCourseHeader(courseId: string | number) {
  const [data, setData] = useState<CourseSectionHeader | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`https://cms1.msklatam.com/wp-json/msk/v1/course/${courseId}`)
        setData(res.data.sections.header)
      } catch (err) {
        setError('Error al cargar el encabezado del curso')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [courseId])

  return { data, loading, error }
}
