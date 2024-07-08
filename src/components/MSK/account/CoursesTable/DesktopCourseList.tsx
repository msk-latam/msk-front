import { FC } from "react";
import { UserCourseProgress } from "@/data/types";
import DesktopCourseItem from "./DesktopCourseItem";

interface DesktopCourseListProps {
  items: UserCourseProgress[];
  email: string;
  goToLMS: (
    product_code: number,
    cod_curso: string,
    email: string
  ) => Promise<void>;
}

const DesktopCourseList: FC<DesktopCourseListProps> = ({
  items,
  email,
  goToLMS,
}) => {
  return (
    <>
      {items.map((item) => (
        <DesktopCourseItem
          key={item.product_code}
          item={item}
          email={email}
          goToLMS={goToLMS}
        />
      ))}
    </>
  );
};

export default DesktopCourseList;
