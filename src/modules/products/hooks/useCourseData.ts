import { useEffect, useState } from 'react'
import axios from 'axios'

const API_BASE = 'https://cms1.msklatam.com/wp-json/msk/v1/course'

export interface CourseCategory {
  term_id: number
  name: string
  slug: string
  is_primary: boolean
}

export interface CourseSectionHeader {
  title: string
  has_certificate: boolean
  categories: CourseCategory[]
}

export interface CourseLearning {
  msk_learning_content: string
}

export interface CourseInstitution {
  id: number
  title: string
  slug: string
  image: string
}

export interface CourseCertificate {
  has_certificate: boolean
}

export interface CourseDescription {
  title: string
  content: string
}

export interface CourseHability {
  id: number
  name: string
  slug: string
}

export interface CourseTeachersData {
  id: number | null
  name: string | null
  slug: string | null
  description: string | null
  image: string | false
  link: string
}

export interface CourseStudyPlan {
  hours: string
  study_plan_file: string | false
  modules: any // Tipar después si lo necesitás
}

export interface CourseOverviewData {
  habilities: CourseHability[]
  with_this_course: string
}

export interface CourseData {
  id: number
  title: string
  slug: string
  date: string
  featured_image: string
  categories: CourseCategory[]
  link: string
  sections: {
    header: CourseSectionHeader
    content: CourseDescription
    institutions: CourseInstitution[]
    learning: CourseLearning[]
    habilities: CourseHability[]
    with_this_course: string
    teaching_team: CourseTeachersData[]
    video: string | false
    certificate: CourseCertificate
    study_plan: CourseStudyPlan
  }
}


export function useCourseData(id: string | number) {
  const [data, setData] = useState<CourseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const res = await axios.get<CourseData>(`${API_BASE}/${id}`)
        setData(res.data)
      } catch (err) {
        setError('Error fetching course data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchData()
    }
  }, [id])

  return { data, loading, error }
}
