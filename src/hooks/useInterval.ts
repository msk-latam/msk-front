import { AxiosResponse } from "axios";
import { AuthContext } from "@/context/user/AuthContext";
import { useContext, useEffect, useState } from "react";
import api from "@/services/api";

interface UseIntervalResult {
  isRunning: boolean;
  data: any; // Reemplazar 'any' con el tipo de datos real
  startWatch: (product_code: number) => number | Promise<NodeJS.Timeout>;
}

const useInterval = (url: string): UseIntervalResult => {
  const [isRunning, setIsRunning] = useState(false);
  const [intents, setIntents] = useState(3);
  const [data, setData] = useState<any>(null); // Reemplazar 'any' con el tipo de datos real
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
  const { dispatch } = useContext(AuthContext);

  const startWatch = async (product_code: number) => {
    console.group("StartWatch!");
    const interval = setInterval(async () => {
      try {
        setIsRunning(true);

        const response: AxiosResponse = await api.getCoursesProgressStatus(
          url,
          product_code
        );
        setData(response.data);
        dispatch({
          type: "UPDATE_COURSES",
          payload: { courses_progress: response.data },
        });
        setIntents(0);
      } catch (error) {
        setData(null);
        setIntents((prevIntents) => prevIntents - 1);
        console.error({ error, intents, interval });
      } finally {
        if (intents === 0) {
          clearInterval(intervalId);
          setIsRunning(false);
        }
        // console.log(intents);
      }
    }, 5000);

    setIntervalId(interval);
    return interval;
    console.groupEnd();
  };

  useEffect(() => {
    if (intents === 0) {
      clearInterval(intervalId);
      setIsRunning(false);
    }

    return () => clearInterval(intervalId);
  }, [intents, intervalId]);

  return {
    isRunning,
    data,
    startWatch,
  };
};

export default useInterval;
