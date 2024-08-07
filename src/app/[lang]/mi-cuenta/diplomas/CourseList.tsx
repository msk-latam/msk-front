import React from 'react';
import CourseCard from './CourseCard';

import { FetchCourseType, User } from '@/data/types';
import NoContent from './NoContent';

interface CourseListProps {
  courses: FetchCourseType[];
  user: User;
}

const CourseList: React.FC<CourseListProps> = ({ courses, user }) => {
  const filteredCourses = courses.flatMap((course, index) => {
    const courseProgress = user.contact?.courses_progress.find(
      progress => progress.Product_Code === course.product_code,
    );

    const cards: any[] = [];

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
      console.log(courseProgress);
    }
    return cards;
  });

  return (
    <div>
      {filteredCourses.length === 0 ? (
        <NoContent />
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2'>
          {filteredCourses}
        </div>
      )}
    </div>
  );
};

export default CourseList;
