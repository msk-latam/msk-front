
import { useState, useEffect } from 'react'
import axios from 'axios'
import { CourseSectionHeader } from './useCourseData'

export function useCourseHeader(slug: string | number) {
  const [data, setData] = useState<CourseSectionHeader | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`https://cms1.msklatam.com/wp-json/msk/v1/course/${slug}`)
        setData(res.data.sections.header)
      } catch (err) {
        setError('Error al cargar el encabezado del curso')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [slug])

  return { data, loading, error }
}
