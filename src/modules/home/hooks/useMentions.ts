// /modules/home/hooks/useMentions.ts
import { useEffect, useState } from "react";

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

const useMentions = () => {
  const [data, setData] = useState<Mention[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/home/mentions")
      .then((res) => res.json())
      .then((json) => setData(json.mentions || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};

export default useMentions;
