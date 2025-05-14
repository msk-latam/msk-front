export const getHomeData = async () => {
  
    let lang = "int";

    if(window!=null){
      const { pathname } = window.location;
      const langMatch = pathname.match(/^\/([^/]+)\//);
      lang = langMatch && langMatch[1].length <= 2 ? langMatch[1] : "int";
    }

    const res = await fetch(`/api/home?lang=${lang}`);
    if (!res.ok) throw new Error('Failed to fetch home data');
    return res.json();
  };
  