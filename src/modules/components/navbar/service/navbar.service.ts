export const getNavbar = async () => {
    const { pathname } = window.location;
    const langMatch = pathname.match(/^\/([^/]+)\//);
    const lang = langMatch && langMatch[1].length <= 2 ? langMatch[1] : "ar";
    const res = await fetch(`/api/navbar?lang=${lang}`);
    if (!res.ok) throw new Error('Failed to fetch navbar data');
    return res.json();
  };
  