import { UserCourseProgress } from "@/data/types";
import {
  getStatusIcon,
  hasText,
  statusCourse,
  statusOrdenVenta,
} from "@/lib/account";
import React, { FC } from "react";

interface ProductAccountButtonProps {
  product: UserCourseProgress;
  onRequest: boolean;
  isRunning: boolean;
  onClick: () => void;
}

const ProductAccountButton: FC<ProductAccountButtonProps> = ({
  product,
  onRequest,
  isRunning,
  onClick,
}) => {
  const { status } = product;
  const { isDisabled } = statusCourse(status);
  const statusOV = statusOrdenVenta(product?.ov);
  const iconStatus = getStatusIcon(
    statusOV.isDisabled ? statusOV.hasText : status
  );

  console.log(product.title,{status,statusOV,iconStatus,isDisabled})

  return (
    <div className="course-2-footer text-grey-course">
      <div className="coursee-clock">
        <img
          src={iconStatus}
          alt={statusOV.isDisabled ? statusOV.hasText : status}
        />
        <span className="ml-2">
          {statusOV.isDisabled ? statusOV.hasText : status}
        </span>
      </div>

      <button
        className="course-network text-primary font-bold disabled:cursor-not-allowed disabled:opacity-70"
        onClick={onClick}
        disabled={isDisabled || onRequest || isRunning || statusOV.isDisabled}
      >
        {onRequest ||
        isRunning ||
        (status && status.includes("Listo para enrolar")) ? (
          <div className="flex justify-center items-center">
            Activando...
            {/*  <div className="w-4 h-4 my-1 border-t-2 border-primary border-solid rounded-full animate-spin"></div> */}
          </div>
        ) : (
          hasText(status)
        )}
      </button>
    </div>
  );
};

export default ProductAccountButton;
