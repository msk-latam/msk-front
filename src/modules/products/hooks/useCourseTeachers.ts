import { useEffect, useState } from 'react'
import axios from 'axios'
import { CourseTeachersData } from './useCourseData' // Asegurate de que la ruta sea correcta

const API_BASE = 'https://cms1.msklatam.com/wp-json/msk/v1/course'

export function useCourseTeachers(courseId: string | number) {
  const [data, setData] = useState<CourseTeachersData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTeachers() {
      setLoading(true)
      try {
        const res = await axios.get(`${API_BASE}/${courseId}`)
        setData(res.data.sections.teaching_team)
      } catch (err) {
        console.error(err)
        setError('Error fetching course overview content')
      } finally {
        setLoading(false)
      }
    }

    if (courseId) {
      fetchTeachers()
    }
  }, [courseId])

  return { data, loading, error }
}
