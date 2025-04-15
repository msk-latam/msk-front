// src/modules/home/service/mentions.service.ts

export interface Mention {
    title: string;
    content: string;
    date: string;
    link: {
      title: string;
      url: string;
      target: string;
    };
  }
  
  export const getMentions = async (): Promise<Mention[]> => {
    const res = await fetch("/api/home/mentions");
    if (!res.ok) throw new Error("Error al obtener las menciones");
  
    const json = await res.json();
    return json.mentions || [];
  };
  