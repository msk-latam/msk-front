'use client';

import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import { ArrowRight } from 'lucide-react';
import { useBlogContent } from '@/modules/home/hooks/useBlogContent';
import type { BlogPost } from '@/modules/home/types';
import Link from 'next/link';

// Constants
const CATEGORIES = ['Artículos', 'Guías profesionales', 'Infografías'] as const;
type CategoryType = typeof CATEGORIES[number];
const DEFAULT_CATEGORY: CategoryType = 'Artículos';

// Action types
type ActionVariant = 'primary' | 'secondary' | 'tertiary';
interface BlogAction {
  label: string;
  variant: ActionVariant;
}

// Component
const BlogSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CategoryType>(DEFAULT_CATEGORY);
  const { data, loading } = useBlogContent();
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (!data) return;
    switch (activeTab) {
      case 'Artículos':
        setFilteredPosts(data.featured_blog_articles || []);
        break;
      case 'Guías profesionales':
        setFilteredPosts(data.featured_blog_guides || []);
        break;
      case 'Infografías':
        setFilteredPosts(data.featured_blog_infographies || []);
        break;
      default:
        setFilteredPosts([]);
    }
  }, [activeTab, data]);

  if (loading) {
    return <LoadingState title={data?.title} />;
  }

  if (filteredPosts.length === 0 && !loading) {
    return (
      <EmptyState
        title={data?.title}
        subtitle={data?.subtitle}
        categories={CATEGORIES}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    );
  }

  const postsToDisplay = filteredPosts.slice(0, 5);

  return (
    <section className="w-full font-raleway md:px-16 md:py-5 p-5">
      <header className="mb-8">
        <h2 id="blog-title" className="text-2xl text-center md:text-left md:text-3xl font-semibold text-black mb-1">
          Blog
        </h2>
        <p className="text-sm text-neutral-600 text-center md:text-left">
          Recursos para informarte y aprender de distintas maneras
        </p>
        <div className="flex flex-wrap justify-between items-center mt-6">
          <CategoryTabs categories={CATEGORIES} activeTab={activeTab} setActiveTab={setActiveTab} />
          <BlogButton className="hidden md:flex" />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6">
        {postsToDisplay.map((post, index) => {
          const isFirstCard = index === 0;
          const isLastCard = index === postsToDisplay.length - 1;
          const customBgColor = (isFirstCard || isLastCard) ? "#FCEAFF" : undefined;

          return (
            <div
              key={post.id}
              className={`
                ${isFirstCard ? 'md:col-span-2 md:row-span-1' : 'md:col-span-1 md:row-span-1'}
              `}
            >
              <BlogCard
                title={post.title}
                subtitle={post.subtitle || ''}
                author={post.author || 'Nombre Apellido'}
                date={post.date || 'May 20, 2023'}
                readTime={`${post.readTime || '3'} min read`}
                tags={post.categories?.map(cat => cat.name) || []}
                image={post.featured_image || '/images/blog-placeholder.jpg'}
                action={determineAction(post.title, index, postsToDisplay.length)}
                featured={isFirstCard}
                link={post.link}
                bgColor={customBgColor}
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-8 md:hidden">
        <BlogButton />
      </div>
    </section>
  );
};

// Helpers
const CategoryTabs: React.FC<{
  categories: readonly CategoryType[];
  activeTab: CategoryType;
  setActiveTab: (tab: CategoryType) => void;
}> = ({ categories, activeTab, setActiveTab }) => (
  <nav className="flex space-x-2 mb-4 md:mb-0" aria-label="Categorías del blog">
    {categories.map((cat) => {
      const isActive = activeTab === cat;
      return (
        <button
          key={cat}
          className={`px-4 py-2 text-sm rounded-full ${
            isActive
              ? 'bg-gray-100 border border-gray-200 font-medium text-black hover:text-[#6E737C]'
              : 'text-gray-700 hover:bg-gray-50 hover:text-[#6E737C]'
          }`}
          onClick={() => setActiveTab(cat)}
          aria-current={isActive ? 'page' : undefined}
        >
          {cat}
        </button>
      );
    })}
  </nav>
);

const BlogButton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={className}>
    <Link href="/blog">
      <button
        className="bg-black text-white text-sm px-4 py-2 rounded-full flex items-center space-x-1 hover:bg-gray-900 hover:scale-105 transition w-full md:w-auto"
        aria-label="Ir al blog principal"
      >
        <span>Ir al blog</span>
        <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
      </button>
    </Link>
  </div>
);

const LoadingState: React.FC<{ title?: string }> = ({ title }) => (
  <section className="w-full">
    <div className="text-center">
      <h2 className="text-2xl md:text-3xl font-semibold">Blog</h2>
      <p className="text-sm text-neutral-600" aria-live="polite">
        Cargando contenido del blog...
      </p>
    </div>
  </section>
);

const EmptyState: React.FC<{
  title?: string;
  subtitle?: string;
  categories: readonly CategoryType[];
  activeTab: CategoryType;
  setActiveTab: (tab: CategoryType) => void;
}> = ({ title, subtitle, categories, activeTab, setActiveTab }) => (
  <section className="w-full">
    <header className="mb-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-black mb-1">Blog</h2>
      <p className="text-sm text-neutral-600">
        Recursos para informarte y aprender de distintas maneras
      </p>
      <div className="flex flex-wrap justify-between items-center mt-6">
        <CategoryTabs categories={categories} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </header>
    <p className="text-center text-gray-600 py-8">No hay artículos disponibles en esta categoría.</p>
  </section>
);

// Logic
function determineAction(title: string, index: number, total: number): BlogAction {
  return {
    label: determineActionLabel(title, index, total),
    variant: determineActionVariant(title)
  };
}

function determineActionLabel(title: string, index: number, total: number): string {
  if (index === 0 || index === total - 1) return 'Descubrir';
  if (title.toLowerCase().includes('tuberculosis')) return 'Descargar';
  if (title.toLowerCase().includes('comunicación')) return 'Descubrir';
  return 'Leer';
}

function determineActionVariant(title: string): ActionVariant {
  if (title.toLowerCase().includes('tuberculosis')) return 'primary';
  if (title.toLowerCase().includes('comunicación')) return 'secondary';
  return 'primary';
}

export default BlogSection;
