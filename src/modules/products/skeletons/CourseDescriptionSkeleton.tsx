'use client';

import React from 'react';

const SkeletonCourseDescription: React.FC = () => {
  return (
    <section className='bg-white rounded-[38px] md:pt-7 md:pb-3'>
      {/* Skeleton for the Title */}
      <div className='w-3/4 h-6 bg-gray-300 rounded mb-6 animate-pulse'></div>

      {/* Skeleton for the Description */}
      <article className='text-[#1A1A1A] text-sm font-inter font-light text-[16px] leading-[161%] relative'>
        {/* Skeleton for the content */}
        <div className='space-y-4'>
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div key={index} className='w-full h-4 bg-gray-300 rounded animate-pulse'></div>
            ))}
        </div>

        {/* Skeleton for the gradient */}
        <div className='absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white to-transparent pointer-events-none'></div>
      </article>

      {/* Skeleton for the "Read more" button */}
      <div className='flex justify-center mt-2'>
        <div className='w-32 h-8 bg-gray-300 rounded-full animate-pulse'></div>
      </div>
    </section>
  );
};

export default SkeletonCourseDescription;
