import { UserCourseProgress } from "@/data/types";
import React, { FC } from "react";
import DesktopCourseList from "./DesktopCourseList";
import StorePagination from "../../Store/StorePagination";
export interface CoursesTableComponentProps {
  currentItems: UserCourseProgress[];
  config: {
    handlePageChange: (pageNumber: number) => void;
    goToLMS: (
      product_code: number,
      cod_curso: string,
      email: string
    ) => Promise<void>;
    email: string;
    itemsPerPage: number;
    totalPages: number;
    indexOfFirstItem: number;
    indexOfLastItem: number;
    currentPage: number;
  };
}

const DesktopCoursesTable: FC<CoursesTableComponentProps> = ({
  currentItems,
  config,
}) => {
  const { email, goToLMS, handlePageChange, totalPages, currentPage } = config;

  return (
    <div className="flex flex-col space-y-8">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
          <div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
              <thead className="bg-neutral-50 dark:bg-neutral-800">
                <tr className="text-left text-xs text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                  <th scope="col" className="px-6 py-3 font-medium">
                    Curso
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Estado
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Avance
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
                <DesktopCourseList
                  items={currentItems}
                  email={email}
                  goToLMS={goToLMS}
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <StorePagination
          totalPages={totalPages}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default DesktopCoursesTable;
