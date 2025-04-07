'use client';

import React, { useState } from 'react';
import BlogCard from './BlogCard';
import { blogPosts } from '@/modules/home/components/blog/data/blogMock';
import { ArrowRight } from 'lucide-react';

const categories = ['Artículos', 'Guías profesionales', 'Infografías'];

const BlogSection = () => {
  const [activeTab, setActiveTab] = useState('Artículos');

  const filteredPosts = blogPosts;

  const featuredPost = filteredPosts.find((post) => post.featured);
  const otherPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-10 py-5 font-raleway">
      {/* Header */}
      <div className="flex flex-col gap-4 md:gap-2">
        {/* Título + Subtítulo */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-semibold">Blog</h2>
          <p className="text-sm text-neutral-600">
            Recursos para informarte y aprender de distintas maneras
          </p>
        </div>

        {/* Tabs + Botón */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:mt-4">
          {/* Tabs */}
          <div className="flex justify-center md:justify-start gap-2 flex-wrap">
            {categories.map((cat) => {
              const isActive = activeTab === cat;
              return (
                <button
                  key={cat}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition ${
                    isActive
                      ? 'font-bold text-black'
                      : 'text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveTab(cat)}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-gray-100 -z-10" />
                  )}
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Botón "Ir al blog" – sólo en desktop */}
          <div className="hidden md:flex">
            <button className="bg-black text-white px-5 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-gray-900 transition">
              Ir al blog <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {featuredPost && (
          <BlogCard
            {...featuredPost}
            featured
          />
        )}
        {otherPosts.map((post) => (
          <BlogCard key={post.id} {...post} />
        ))}
      </div>

      {/* Botón en mobile */}
      <div className="mt-10 flex justify-center md:hidden">
        <button className="bg-black text-white px-6 py-2 rounded-full font-medium flex items-center gap-2">
          Ir al blog <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default BlogSection;
