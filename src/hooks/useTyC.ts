import { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/data/api";
import { SinglePageType } from "@/data/types";

const useTyC = (country: string) => {
  const [data, setData] = useState<SinglePageType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/tyc?country=${country}`);
        setData(response.data);
      } catch (err) {
        console.log({ err });
        setError(err as string);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [country]);

  return { data, loading, error };
};

export default useTyC;
