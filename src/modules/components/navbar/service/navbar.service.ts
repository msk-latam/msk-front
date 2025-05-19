export const getNavbar = async (lang: string = 'ar') => {
	const res = await fetch(`/api/navbar?lang=${lang}`);
	if (!res.ok) throw new Error('Failed to fetch navbar data');
	return res.json();
};
