import React, { FC } from "react";

export interface SkeletonProps {
  className?: string;
  height?: string;
  hideText?: boolean;
}

const InputSkeleton: FC<SkeletonProps> = ({
  className = "",
  height = "",
  hideText = false,
}) => {
  return (
    <div
      role="status"
      className={"grid grid-cols-1 gap-2 animate-pulse" + " " + className}
    >
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-1"></div>
      <div className="flex items-center justify-center w-full h-10 bg-gray-300 rounded  dark:bg-gray-700"></div>
    </div>
  );
};

export default InputSkeleton;
