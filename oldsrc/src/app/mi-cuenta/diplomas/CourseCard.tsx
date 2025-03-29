import { CourseProgress, FetchCourseType } from '@/data/types';
import Image from 'next/image';
import { FC, useEffect, useRef, useState } from 'react';
import activeIcon from '@/public/images/icons/activo1.svg';
import MenuContent from './MenuContent';
import Badge from '@/components/Badge/Badge';

interface CourseCardProps {
  course: FetchCourseType;
  user: any;
  badgeType: 'Diploma' | 'Certificación';
}

const CourseCard: FC<CourseCardProps> = ({ course, user, badgeType }) => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [menuStyle, setMenuStyle] = useState({});

  const handleMenuToggle = (index: number) => {
    if (openMenuIndex === index) {
      setOpenMenuIndex(null);
    } else {
      const button = buttonRefs.current[index];
      if (button) {
        const rect = button.getBoundingClientRect();
        const offsetY = 80;
        const offsetX = 180;

        if (window.innerWidth < 768) {
          setMenuStyle({
            position: 'absolute',
            top: `${rect.bottom + window.scrollY - offsetY}px`,
            left: `${rect.left + window.scrollX - offsetX}px`,
          });
        } else {
          // Pantallas más grandes
          setMenuStyle({
            position: 'absolute',
            top: `${rect.bottom + window.scrollY - offsetY}px`,
            left: `${rect.left + window.scrollX}px`,
          });
        }

        setOpenMenuIndex(index);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (openMenuIndex !== null) {
      const button = buttonRefs.current[openMenuIndex];
      const menu = menuRef.current;

      if (
        button &&
        menu &&
        !button.contains(event.target as Node) &&
        !menu.contains(event.target as Node)
      ) {
        setOpenMenuIndex(null);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuIndex]);
  const courseProgress = user.contact?.courses_progress.find(
    (progress: any) => progress.Product_Code === course.product_code,
  );

  return (
    <>
      <div className='max-w-lg rounded overflow-hidden shadow-lg relative '>
        <Image
          className='h-[150px] w-full object-cover '
          src={course.image}
          alt={course.title}
          width={100}
          height={150}
        />
        <div className='px-4 py-4 '>
          <div className='pb-2'>
            <Badge
              color={badgeType}
              name={badgeType}
              textSize='text-xs sm:text-xs '
            />
          </div>
          <div className='font-raleway font-semibold  mb-1'>{course.title}</div>
          <div className=' flex items-center'>
            <div className='flex flex-col flex-grow'>
              <div className='flex '>
                <Image
                  src={activeIcon}
                  alt='Active Icon'
                  className='w-4 h-4 mr-2 mt-1'
                  height={10}
                  width={10}
                />
                <div className='flex flex-col '>
                  <span className=' text-[#6474A6] ' style={{ fontSize: 12 }}>
                    Fecha de finalización:
                  </span>
                  <span className=' text-[#6474A6] ' style={{ fontSize: 12 }}>
                    {courseProgress?.Fecha_finalizaci_n
                      ? formatDate(courseProgress.Fecha_finalizaci_n)
                      : 'No disponible'}
                  </span>
                </div>
              </div>
            </div>

            <button
              ref={el => (buttonRefs.current[course.id] = el)}
              onClick={() => handleMenuToggle(course.id)}
              className='focus:outline-none hover:text-[#FF5D5E]'
            >
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M10 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4z' />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {openMenuIndex === course.id && (
        <MenuContent
          style={menuStyle}
          closeMenu={() => setOpenMenuIndex(null)}
          course={course}
          user={user}
          ref={menuRef}
          badgeType={badgeType}
        />
      )}
    </>
  );
};

export default CourseCard;
