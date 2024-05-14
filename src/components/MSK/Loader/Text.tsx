import React, { FC } from "react";
const LoadingText: FC = ({}) => {
  return (
    <div role="status" className="grid grid-cols-1 gap-3 animate-pulse">
      <div className="w-full">
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-[300px] mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingText;
