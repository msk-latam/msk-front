import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import { ArrowRight } from 'lucide-react';
import { useBlogContent } from '@/modules/home/hooks/useBlogContent';
import type { BlogPost } from '@/modules/home/types';
import Link from 'next/link';

const CATEGORIES = ['Artículos', 'Guías profesionales', 'Infografías'] as const;
type CategoryType = typeof CATEGORIES[number];
const DEFAULT_CATEGORY: CategoryType = 'Artículos';

type ActionVariant = 'primary' | 'secondary' | 'tertiary';

interface BlogAction {
  label: string;
  variant: ActionVariant;
}


const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

const BlogSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CategoryType>(DEFAULT_CATEGORY);
  const { data, loading } = useBlogContent();
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const isMobile = useMediaQuery('(max-width: 767px)');

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

  if (loading) return <LoadingState title={data?.title} />;

  if (filteredPosts.length === 0 && !loading)
    return <EmptyState title={data?.title} subtitle={data?.subtitle} categories={CATEGORIES} activeTab={activeTab} setActiveTab={setActiveTab} />;

  const postsToDisplay = filteredPosts.slice(0, isMobile ? 3 : 5);

  return (
    <section className="w-full font-raleway md:px-16 md:py-5 p-5">
      <header className="mb-8">
        <h2 id="blog-title" className="text-2xl text-center md:text-left md:text-3xl font-semibold text-black mb-1">
          Blog
        </h2>
        <p className="text-sm text-neutral-600 text-center md:text-left">
          Recursos para informarte y aprender de distintas maneras
        </p>
        <div className="flex md:flex-wrap md:justify-between items-center mt-6 overflow-x-auto gap-3 md:gap-0 scrollbar-hide">
          <CategoryTabs categories={CATEGORIES} activeTab={activeTab} setActiveTab={setActiveTab} />
          <BlogButton className="hidden md:flex" />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6">
        {postsToDisplay.map((post, index) => (
          <div
            key={post.id}
            className={`${index === 0 ? 'md:col-span-2 md:row-span-1' : 'md:col-span-1 md:row-span-1'}`}
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
              featured={index === 0}
              link={post.link}
              bgColor={(index === 0 || index === postsToDisplay.length - 1) ? "#FCEAFF" : undefined}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 md:hidden">
        <BlogButton className="w-full" />
      </div>
    </section>
  );
};

const CategoryTabs: React.FC<{
  categories: readonly CategoryType[];
  activeTab: CategoryType;
  setActiveTab: (tab: CategoryType) => void;
}> = ({ categories, activeTab, setActiveTab }) => (
  <nav className="flex md:gap-4 gap-5 overflow-x-auto scrollbar-hide md:overflow-visible md:flex-wrap whitespace-nowrap" aria-label="Categorías del blog">
    {categories.map((cat) => {
      const isActive = activeTab === cat;
      return (
        <button
          key={cat}
          className={`md:px-4 md:py-2 px-5 py-3 rounded-full md:text-sm text-base font-medium flex-shrink-0 
      transition-colors duration-300 ${
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
        className="bg-black text-white text-sm px-4 py-2 rounded-full flex items-center justify-center space-x-1 hover:bg-gray-900 hover:scale-105 transition w-full md:w-auto h-[48px]"
        aria-label="Ir al blog principal"
      >
        <span>Ir al blog</span>
        <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
      </button>
    </Link>
  </div>
);

const LoadingState: React.FC<{ title?: string }> = ({ title }) => (
  <section className="w-full  ">
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
  <section className="w-full ">
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
