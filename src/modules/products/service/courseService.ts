export const getCourse = async (slug: string, lang: string) => {
	const res = await fetch(`/api/course/${slug}?lang=${lang}`);
	if (!res.ok) throw new Error('Failed to fetch course data');
	return res.json();
};
