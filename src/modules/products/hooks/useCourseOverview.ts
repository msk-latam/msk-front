import { useEffect, useState } from "react";
import { getCourse } from "../service/courseService";
import { CourseOverviewData } from "../types/types";

export function useCourseOverview(slug: string, lang: string) {
  const [data, setData] = useState<CourseOverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    getCourse(slug, lang)
      .then((courseData) => {
        const sections = courseData.sections;
        if (!sections) {
          throw new Error("Overview data missing");
        }
        const overviewData: CourseOverviewData = {
          habilities: courseData.sections?.habilities ?? [],
          with_this_course: courseData.sections?.with_this_course ?? "",
          your_course_steps: courseData.sections?.your_course_steps ?? [],
        };

        setData(overviewData);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Error fetching overview data");
      })
      .finally(() => setLoading(false));
  }, [slug, lang]);
  return { data, loading, error };
}
