'use client';

import React from 'react';
import BlogSection from '@/modules/home/components/blog/BlogSection';


const BlogIndex = () => {
  return (
    <div className="w-full bg-gray-100 pt-24 ">
      {/* Sección 1: Artículos y tabs */}
      <div className="relative bg-white rounded-[40px] max-w-7xl mx-auto -mt-32 z-[10] py-10 shadow-lg">
        <BlogSection />
      </div>
    </div>
  );
};

export default BlogIndex;
