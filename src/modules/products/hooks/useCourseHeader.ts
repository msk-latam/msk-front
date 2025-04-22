
// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import { CourseSectionHeader } from './useCourseData'

// export function useCourseHeader(courseId: string | number) {
//   const [data, setData] = useState<CourseSectionHeader | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true)
//       try {
//         const res = await axios.get(`https://cms1.msklatam.com/wp-json/msk/v1/course/${courseId}`)
//         setData(res.data.sections.header)
//       } catch (err) {
//         setError('Error al cargar el encabezado del curso')
//         console.error(err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [courseId])

//   return { data, loading, error }
// }

import { CourseSectionHeader } from './useCourseData'

const API_BASE = 'https://cms1.msklatam.com/wp-json/msk/v1/course'

export async function getCourseHeader(courseId: string | number): Promise<CourseSectionHeader | null> {
  try {
    const res = await fetch(`${API_BASE}/${courseId}`, {
      next: { revalidate: 0 }, // Desactiva caché (fetch dinámico)
    })

    if (!res.ok) {
      console.error('Error al obtener el encabezado del curso:', res.statusText)
      return null
    }

    const data = await res.json()
    return data.sections.header as CourseSectionHeader
  } catch (error) {
    console.error('Error al cargar el encabezado del curso:', error)
    return null
  }
}
