import React, { FC } from "react";

export interface SkeletonProps {
  className?: string;
  lines?: string;
}

const TextSkeleton: FC<SkeletonProps> = ({ className = "", lines = "1" }) => {
  const linesArray = Array.from({ length: parseInt(lines) }, () => "1");
  return (
    <>
      {linesArray.map((_, i) => (
        <div
          key={`la_${i}`}
          role="status"
          className={`space-y-2.5 animate-pulse max-w-lg ${className}`}
        >
          <div className="flex items-center w-full space-x-2 max-w-[320px] my-2">
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-80"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TextSkeleton;
