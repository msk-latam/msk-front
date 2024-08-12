'use client';
import { CountryContext } from '@/context/country/CountryContext';
import { AuthContext } from '@/context/user/AuthContext';
import { FetchCourseType, User } from '@/data/types';
import ssr from '@/services/ssr';
import { getUserCourses } from '@/services/user';
import { FC, useContext, useEffect, useState } from 'react';
import LoadingComponent from './LoadingComponent';
import NoContent from './NoContent';
import CourseList from './CourseList';
import PageDocumentosHeader from '../documentos/PageDocumentosHeader';
import DocumentStatusSection from '../documentos/DocumentStatusSection';

const pageDiplomas: FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [user, setUser] = useState<User>({} as User);
  const { countryState: countryState } = useContext(CountryContext);
  const [courses, setCourses] = useState<FetchCourseType[]>([]);
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

  return (
    <>
      <div>
        {isLoading ? (
          <LoadingComponent text='Cargando Diplomas y Certificaciones...' />
        ) : courses.length === 0 ? (
          <NoContent />
        ) : (
          <CourseList courses={courses} user={user} />
        )}
        <div className='mt-6'>
          <PageDocumentosHeader />
          <DocumentStatusSection />
        </div>
      </div>
    </>
  );
};

export default pageDiplomas;
