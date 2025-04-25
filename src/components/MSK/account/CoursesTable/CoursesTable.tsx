import React, { FC, useState } from 'react';
import DesktopCoursesTable from './DesktopCoursesTable';
import { UserCourseProgress } from '@/data/types';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import MobileCourseTable from './MobileCourseTable';
import NcLink from '@/components/NcLink/NcLink';
import NoContent from '@/app/[lang]/mi-cuenta/diplomas/NoContent';

interface CoursesTableProps {
  courses: UserCourseProgress[];
  tableConfig: {
    goToStore: () => void;
    goToLMS: (
      product_code: number,
      cod_curso: string,
      email: string,
    ) => Promise<void>;
    goToEnroll: (
      product_code: number,
      cod_curso: string,
      email: string,
    ) => Promise<void>;
    email: string;
  };
  isMobile: boolean;
}

const CoursesTable: FC<CoursesTableProps> = ({
  courses,
  tableConfig,
  isMobile,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { goToStore } = tableConfig;
  const itemsPerPage = 5;
  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = courses.slice(indexOfFirstItem, indexOfLastItem);

  // Función para cambiar la página
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const config = {
    ...tableConfig,
    handlePageChange,
    itemsPerPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    currentPage,
  };

  return courses && courses.length ? (
    isMobile ? (
      <MobileCourseTable currentItems={currentItems} config={config} />
    ) : (
      <DesktopCoursesTable currentItems={currentItems} config={config} />
    )
  ) : (
    <>
      <NoContent />
    </>
  );
};

export default CoursesTable;
