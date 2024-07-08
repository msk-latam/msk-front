import { FC } from "react";
import { CoursesTableComponentProps } from "./DesktopCoursesTable";
import MobileCourseList from "./MobileCourseList";
import StorePagination from "../../Store/StorePagination";

const MobileCourseTable: FC<CoursesTableComponentProps> = ({
  currentItems,
  config,
}) => {
  const { email, goToLMS, handlePageChange, totalPages, currentPage } = config;

  return (
    <div className="flex flex-col space-y-8">
      <ul className="border rounded-xl">
        <MobileCourseList
          items={currentItems}
          email={email}
          goToLMS={goToLMS}
        />
      </ul>
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

export default MobileCourseTable;
