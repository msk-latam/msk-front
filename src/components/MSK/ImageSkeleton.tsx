import React, { FC } from "react";

export interface SkeletonProps {
  className?: string;
  height?: string;
}

const ImageSkeleton: FC<SkeletonProps> = ({ className = "", height = "" }) => {
  return (
    <div
      role="status"
      style={{ height }}
      className={
        "flex items-center justify-center h-full bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700" +
        " " +
        className
      }
    >
      <img
        src="/images/vectors/isotipo.svg"
        width="130"
        className="grayscale opacity-25"
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default ImageSkeleton;
