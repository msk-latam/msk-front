import React, { FC } from "react";

export interface SkeletonProps {
  className?: string;
  lines?: string;
}

const TitleSkeleton: FC<SkeletonProps> = ({ className }) => {
  return (
    <div role="status" className={`animate-pulse ${className}`}>
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 "></div>
      <div className="h-2.5  bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]"></div>
    </div>
  );
};

export default TitleSkeleton;
