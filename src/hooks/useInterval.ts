import { AxiosResponse } from 'axios';
import { AuthContext } from '@/context/user/AuthContext';
import { useContext, useEffect, useState } from 'react';
import api from '@/services/api';
import { GlobalStateContext } from '@/app/[lang]/mi-perfil/GlobalStateContext';

interface UseIntervalResult {
  isRunning: boolean;
  // data: any; // Reemplazar 'any' con el tipo de datos real
  startWatch: (product_code: number) => number | Promise<NodeJS.Timeout>;
}

const useInterval = (url: string): UseIntervalResult => {
  const [isRunning, setIsRunning] = useState(false);
  const [intents, setIntents] = useState(5);
  const [data, setData] = useState<any>(null); // Reemplazar 'any' con el tipo de datos real
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
  const { dispatch } = useContext(AuthContext);

  const { state, dispatch1 } = useContext(GlobalStateContext);

  const startWatch = async (product_code: number) => {
    console.group('StartWatch!');
    const interval = setInterval(async () => {
      try {
        setIsRunning(true);

        const response: AxiosResponse = await api.getCoursesProgressStatus(
          url,
          product_code,
        );
        // console.log(response, 'de useInterval');
        // setData(response.data);
        // dispatch({
        //   type: 'UPDATE_COURSES',
        //   payload: { courses_progress: response.data },
        // });
        // console.log(data, 'de useInterval');

        const selectedCourse = response[0].find(
          (course: any) => course.Product_Code === product_code, // Asegúrate de que estás usando `Product_Code`
        );

        if (selectedCourse.Estado_cursada === 'Listo para enrolar') {
          setData(selectedCourse);
          dispatch1({
            type: 'SET_STATUS',
            payload: {
              productSlug: selectedCourse.Product_Code, // Asegúrate de tener un identificador único del curso
              status: selectedCourse.Estado_cursada,
            },
          });
        } else {
          console.warn('Curso no encontrado en la respuesta');
        }
        setIntents(0);
      } catch (error) {
        setData(null);
        setIntents(prevIntents => prevIntents - 1);
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
    // data,
    startWatch,
  };
};

export default useInterval;
