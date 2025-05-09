import { useEffect, useState } from 'react';
import { getCourse } from '../service/courseService';
import { CourseData } from '../types/types';

export function useProductPage(slug: string, lang: string) {
  const [data, setData] = useState<Pick<CourseData, 'id' | 'resource' | 'title' | 'slug' | 'categories' | 'featured_images'> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    getCourse(slug, lang)
      .then((courseData) => {
        setData({
          id: courseData.id,
          resource: courseData.resource,
          title: courseData.title,
          slug: courseData.slug,
          categories: courseData.categories,
          featured_images: courseData.featured_images,
        });
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || 'Error fetching course metadata');
      })
      .finally(() => setLoading(false));
  }, [slug, lang]);

  return { data, loading, error };
}
