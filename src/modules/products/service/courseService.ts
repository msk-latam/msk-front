export const getCourseById = async (id: string | number) => {
    const res = await fetch(`/api/course/${id}`);
    if (!res.ok) throw new Error('Failed to fetch course data');
    return res.json();
  };
  