export const getNavbar = async () => {
    const res = await fetch(`/api/navbar`);
    if (!res.ok) throw new Error('Failed to fetch navbar data');
    return res.json();
  };
  