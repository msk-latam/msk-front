'use client';

import { CountryContext } from '@/context/country/CountryContext';
import { AuthContext } from '@/context/user/AuthContext';
import { User, UserCourseProgress } from '@/data/types';
import ssr from '@/services/ssr';
import { getUserCourses } from '@/services/user';
import { FC, useContext, useEffect, useState } from 'react';

const pageDiplomas: FC = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [user, setUser] = useState<User>({} as User);
  const { countryState: countryState } = useContext(CountryContext);

  const [courses, setCourses] = useState<UserCourseProgress[]>([]);
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
      // setCourses(userCoursesList);
      setLoading(false);
    } else {
      // history.push("/iniciar-sesion");
    }
  };

  useEffect(() => {
    fetchUser();
  }, [state?.profile]);
  console.log(user);
  console.log(courses);
  console.log(state);
  return (
    <>
      <div>
        {courses.length === 0 ? (
          <p>
            Aún puedes descubrir mucho más en Medical & Scientific Knowledge
          </p>
        ) : (
          <div>
            {courses.map(course => (
              <div key={course.id} className='course-card'>
                <h3 className='text-black'>{course.title}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default pageDiplomas;
