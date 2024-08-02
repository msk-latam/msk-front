'use client';

import ButtonPrimary from '@/components/Button/ButtonPrimary';
import StoreProduct from '@/components/MSK/Store/StoreProduct';
import { CountryContext } from '@/context/country/CountryContext';
import { AuthContext } from '@/context/user/AuthContext';
import {
  CourseProgress,
  FetchCourseType,
  User,
  UserCourseProgress,
} from '@/data/types';
import ssr from '@/services/ssr';
import { getUserCourses } from '@/services/user';
import { FC, useContext, useEffect, useState } from 'react';
import CourseCard from './CourseCard';

const pageDiplomas: FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [user, setUser] = useState<User>({} as User);
  const { countryState: countryState } = useContext(CountryContext);

  const [courses, setCourses] = useState<FetchCourseType[]>([]);
  const [userProgress, setUserProgress] = useState<CourseProgress[]>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true);
    const res = await ssr.getUserData();
    const coursesList = await ssr.getAllCourses(countryState.country);
    if (!res.message) {
      if (!res.contact.state) res.contact.state = '';
      setUser(res);
      dispatch({
        type: 'FRESH',
        payload: {
          user: { name: res.name, speciality: res.contact.speciality },
        },
      });
      let userCoursesList = getUserCourses(res, coursesList);
      setCourses(userCoursesList);

      setLoading(false);
    } else {
      // history.push("/iniciar-sesion");
    }
  };

  useEffect(() => {
    fetchUser();
  }, [state?.profile]);

  console.log(courses);
  return (
    <>
      <div>
        {isLoading ? (
          <div className='border border-gray-200 rounded-lg p-6 flex flex-col justify-center items-center h-full min-h-[50vh]'>
            <p
              className='font-raleway text-[#6474A6] text-center w-[85%]   mb-2 '
              style={{ fontSize: 24, fontWeight: 100 }}
            >
              Cargando Diplomas y Certificaciones...
            </p>
          </div>
        ) : courses.length === 0 ? (
          <div className='border border-gray-200 rounded-lg p-6 flex flex-col justify-center items-center h-full min-h-[50vh]'>
            <p
              className='font-raleway text-[#6474A6] text-center w-[85%]   mb-2 '
              style={{ fontSize: 24, fontWeight: 100 }}
            >
              Aún puedes descubrir mucho más en Medical & Scientific Knowledge
            </p>
            <ButtonPrimary href='/tienda/?profesion=medicos&recurso=curso'>
              Comienza un Curso
            </ButtonPrimary>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2  '>
            {courses.map((course, index) => {
              const courseProgress = user.contact?.courses_progress.find(
                progress => progress.Product_Code === course.product_code,
              );

              const cards = [];
              if (courseProgress?.Diploma) {
                cards.push(
                  <CourseCard
                    key={`${index}-diploma`}
                    course={course}
                    badgeType='Diploma'
                    user={user}
                  />,
                );
              }
              if (courseProgress?.Certificado) {
                cards.push(
                  <CourseCard
                    key={`${index}-certificado`}
                    course={course}
                    badgeType='Certificación'
                    user={user}
                  />,
                );
              }
              return cards;
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default pageDiplomas;
