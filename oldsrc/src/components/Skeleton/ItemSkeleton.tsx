import React, { FC } from "react";

export interface SkeletonProps {
  className?: string;
  height?: string;
  hideText?: boolean;
}

const ItemSkeleton: FC<SkeletonProps> = ({
  className = "",
  height = "",
  hideText = false,
}) => {
  return (
    <div
      role="status"
      className={"grid grid-cols-1 gap-3 animate-pulse" + " " + className}
    >
      <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded  dark:bg-gray-700">
        <img
          src="/images/vectors/isotipo.svg"
          width="130"
          height={height}
          className="grayscale opacity-25"
        />
      </div>
      {!hideText && (
        <div className="w-full">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        </div>
      )}
    </div>
  );
};

export default ItemSkeleton;
