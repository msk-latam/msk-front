export const getHomeData = async (lang: string) => {
	const res = await fetch(`/api/home?lang=${lang}`);
	if (!res.ok) throw new Error('Failed to fetch home data');
	return res.json();
};
