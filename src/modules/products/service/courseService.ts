export const getCourse = async (slug: string) => {
    const res = await fetch(`/api/course/${slug}`);
    if (!res.ok) throw new Error('Failed to fetch course data');
    return res.json();
  };
  