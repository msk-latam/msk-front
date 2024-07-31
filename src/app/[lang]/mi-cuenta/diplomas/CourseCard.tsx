import { FetchCourseType } from '@/data/types';
import Image from 'next/image';
import { FC, useState } from 'react';
import activeIcon from '@/public/images/icons/activo1.svg';
import MenuContent from './MenuContent';

interface CourseCardProps {
  course: FetchCourseType;
}

const CourseCard: FC<CourseCardProps> = ({ course }) => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const handleMenuToggle = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };
  console.log('course de componente', course);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <>
      <div className='max-w-md rounded overflow-hidden shadow-lg'>
        <Image
          className='w-full  '
          src={course.image}
          alt={course.title}
          width={100}
          height={100}
        />
        <div className='px-4 py-4'>
          <div className='font-raleway font-semibold  mb-2'>{course.title}</div>
        </div>
        <div className='px-2 pt-4 pb-2 flex items-center'>
          <div className='flex flex-col flex-grow'>
            <div className='flex'>
              <Image
                src={activeIcon}
                alt='Active Icon'
                className='w-4 h-4 mr-2'
                height={10}
                width={10}
              />
              <div className='flex flex-col'>
                <span className='text-sm text-[#6474A6] '>
                  Fecha de finalización:
                </span>
                <span className='text-sm text-[#6474A6]'>
                  {formatDate(course.expiration)}
                </span>
              </div>
            </div>
          </div>
          <div className='relative'>
            <button
              onClick={() => handleMenuToggle(course.id)}
              className='focus:outline-none hover:text-[#FF5D5E]'
            >
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M10 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4z' />
              </svg>
            </button>
            {openMenuIndex === course.id && <MenuContent />}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
