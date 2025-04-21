///src/modules/home/components/blog/BlogIndex.tsx
'use client';

import React from 'react';
import BlogSection from '@/modules/home/components/blog/BlogSection';

const BlogIndex: React.FC = () => {
  return (
    <section className="w-full bg-gray-100 pt-24">
      <article 
        className="relative bg-white rounded-[40px] overflow-visible max-w-[1600px] mx-auto md:px-4 -mt-32 z-5 py-5 shadow-lg"
        aria-labelledby="blog-title"
      >
        <BlogSection />
      </article>
    </section>
  );
};

export default BlogIndex;