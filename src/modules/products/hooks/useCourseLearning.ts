import { useEffect, useState } from 'react'
import axios from 'axios'

const API_BASE = 'https://cms1.msklatam.com/wp-json/msk/v1/course'

export interface CourseLearning {
  msk_learning_content: string
}

export function useCourseLearning(courseId: string | number) {
  const [data, setData] = useState<CourseLearning[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLearning() {
      setLoading(true)
      try {
        const res = await axios.get(`${API_BASE}/${courseId}`)
        setData(res.data.sections.learning)
      } catch (err) {
        console.error(err)
        setError('Error fetching course learning content')
      } finally {
        setLoading(false)
      }
    }

    fetchLearning()
  }, [courseId])

  return { data, loading, error }
}
