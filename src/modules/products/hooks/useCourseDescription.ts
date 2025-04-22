import { useState, useEffect } from 'react'
import axios from 'axios'
import { CourseDescription } from './useCourseData'
const API_BASE = 'https://cms1.msklatam.com/wp-json/msk/v1/course'

export function useCourseDescription(slug: string | number) {
  const [data, setData] = useState<CourseDescription | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`${API_BASE}/${slug}`)
          setData(res.data.sections.content)
      } catch (err) {
        setError('Error al cargar la descripción del curso')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [slug])
  console.log(data)

  return { data, loading, error }
}
