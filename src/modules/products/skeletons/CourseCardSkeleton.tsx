'use client';

import React from 'react';

const CourseCardSkeleton: React.FC = () => {
  return (
    <section className="max-w-5xl mx-auto ">
      <div className="grid gap-6 md:grid-cols-3">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="rounded-[38px] py-6 px-8 shadow-sm bg-white flex flex-col items-center text-center md:items-start md:text-left animate-pulse"
            >
              <div className="flex justify-center md:justify-start mb-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              </div>
              <div className="w-2/3 h-5 bg-gray-300 rounded mb-2"></div>
              <div className="w-full h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default CourseCardSkeleton;
