import React, { FC, useState, useEffect } from "react";
import { UserCourseProgress } from "@/data/types";
import { goToLMS, goToEnroll } from "@/lib/account";
import CoursesTable from "@/components/MSK/account/CoursesTable/CoursesTable";
import { useRouter } from "next/navigation";

interface AccountCoursesProps {
  courses: UserCourseProgress[];
  email: string;
}

const AccountCourses: FC<AccountCoursesProps> = ({ courses, email }) => {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  //const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsMobile(screenWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const goToStore = () => {
    router.push("/tienda");
  };

  const tableConfig = {
    goToLMS,
    goToEnroll,
    goToStore,
    email,
  };

  return (
    <CoursesTable
      courses={courses}
      tableConfig={tableConfig}
      isMobile={isMobile}
    />
  );
};

export default AccountCourses;
