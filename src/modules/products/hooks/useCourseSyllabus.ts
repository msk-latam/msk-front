import { useEffect, useState } from 'react';

export function useCourseSyllabus(slug: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [syllabus, setSyllabus] = useState<null | {
    hours: string;
    fileUrl: string;
    fileTitle: string;
    modules: { title: string; content: string }[];
  }>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`https://cms1.msklatam.com/wp-json/msk/v1/course/${slug}`);
        const data = await res.json();

        const studyPlan = data.sections.study_plan;

        setSyllabus({
          hours: studyPlan.hours,
          fileUrl: studyPlan.study_plan_file?.url || '',
          fileTitle: studyPlan.study_plan_file?.title || '',
          modules: studyPlan.modules || [],
        });

      } catch (err) {
        setError('Error al cargar el plan de estudios');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  return { loading, error, syllabus };
}
