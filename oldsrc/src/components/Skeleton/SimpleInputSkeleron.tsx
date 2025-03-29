import React, { FC } from "react";

export interface SkeletonProps {
  className?: string;
  height?: string;
}

const SimpleInputSkeleton: FC<SkeletonProps> = ({ className = "", height = "" }) => {
  return (
    <div
      role="status"
      className={"grid grid-cols-1 gap-3 animate-pulse" + " " + className}
    >
      <div className="flex items-center justify-center w-full h-12 bg-gray-300 rounded  dark:bg-gray-700">
      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" className="h-6 text-gray-200 dark:text-gray-600 fill-gray-500"  x="0px" y="0px"
              viewBox="0 0 250 170"  >
            <path className="st0" d="M125,164.5l122.6-70.7l-14.3-24.7L125,131.7L16.7,69.1L2.3,93.8l122.6,70.8h0.1L125,164.5L125,164.5L125,164.5z
              "/>
            <path className="st0" d="M179.1,74.9l27.1-37.9l-24.3-17.3L155.2,57C164.4,61.1,172.6,67.3,179.1,74.9z"/>
            <path className="st0" d="M127.4,50.3c4.8,0,9.5,0.4,14.2,1.3V5h-31v47C116.1,50.8,121.8,50.3,127.4,50.3z"/>
            <path className="st0" d="M97.5,55.9L69.8,19.2L46,37.1l27.7,37C80.2,66.4,88.3,60.1,97.5,55.9z"/>
            </svg>
      </div>
    </div>
  );
};

export default SimpleInputSkeleton;
