'use client';

import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import { ArrowRight } from 'lucide-react';
import { useBlogContent } from '@/modules/home/hooks/useBlogContent';
import type { BlogPost } from '@/modules/home/types';
import Link from 'next/link';

const categories = ['Artículos', 'Guías profesionales', 'Infografías'];

const BlogSection = () => {
  const [activeTab, setActiveTab] = useState('Artículos');
  const { data, loading } = useBlogContent();
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  // Filtrar posts según la categoría seleccionada
  useEffect(() => {
    if (!data?.featured_blog_articles) return;

    const posts = data.featured_blog_articles;
    
    if (activeTab === 'Artículos') {
      setFilteredPosts(posts);
    } else if (activeTab === 'Guías profesionales') {
      setFilteredPosts(posts.filter(post => 
        post.categories.some(cat => cat.name.includes('Guía') || cat.name.includes('Guia'))
      ));
    } else if (activeTab === 'Infografías') {
      setFilteredPosts(posts.filter(post => 
        post.categories.some(cat => cat.name.includes('Infografía') || cat.name.includes('Infografia'))
      ));
    }
  }, [activeTab, data]);

  // Estado de carga
  if (loading) {
    return (
      <section className="w-full max-w-7xl mx-auto px-4 md:px-10 py-5 font-raleway">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">Blog</h2>
          <p className="text-sm text-neutral-600">Cargando contenido del blog...</p>
        </div>
      </section>
    );
  }

  // Si no hay posts después del filtrado
  if (filteredPosts.length === 0 && !loading) {
    return (
      <section className="w-full max-w-7xl mx-auto pl-4 md:px-10 py-5 font-raleway">
        <div className="flex flex-col gap-4 md:gap-2">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-semibold">{data?.title || 'Blog'}</h2>
            <p className="text-sm text-neutral-600">
              {data?.subtitle || 'No hay artículos disponibles en esta categoría.'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center md:justify-start gap-2 pl-3 overflow-scroll scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeTab === cat;
              return (
                <button
                  key={cat}
                  className={`relative px-6 py-[14px] rounded-[38px] text-sm font-medium whitespace-nowrap transition ${
                    isActive
                      ? 'font-bold text-black'
                      : 'text-gray-600'
                  }`}
                  onClick={() => setActiveTab(cat)}
                >
                  {isActive && (
                    <span className="absolute inset-0 border-black border-[1px] rounded-[38px] -z-10" />
                  )}
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Encontrar el post destacado y los demás posts
  const featuredPost = filteredPosts.find(post => post.featured === '1');
  const otherPosts = filteredPosts.filter(post => post.featured !== '1');

  return (
    <section className="w-full max-w-7xl mx-auto pl-4 md:px-10 py-5 font-raleway">
    <div className="flex flex-col gap-4 md:gap-2">
      <div className="text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-semibold">{data?.title || 'Blog'}</h2>
        <p className="text-sm text-neutral-600">
          {data?.subtitle || 'No hay artículos disponibles en esta categoría.'}
        </p>
      </div>

        {/* Tabs + Botón */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:mt-4">
          {/* Tabs */}
          <div className="flex justify-start md:justify-start gap-2 pl-3 overflow-scroll scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeTab === cat;
              return (
                <button
                  key={cat}
                  className={`relative px-6 py-[14px] rounded-[38px] text-sm font-medium whitespace-nowrap transition ${
                    isActive
                      ? 'font-bold text-black'
                      : 'text-gray-600'
                  }`}
                  onClick={() => setActiveTab(cat)}
                >
                  {isActive && (
                    <span className="absolute inset-0 border-black border-[1px] rounded-[38px] -z-10" />
                  )}
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Botón "Ir al blog" – sólo en desktop */}
          <div className="hidden md:flex">
            <Link href="/blog">
              <button className="bg-black text-white px-5 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-gray-900 transition">
                Ir al blog <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="mt-10 grid md:grid-cols-3 gap-6 pr-5">
        {featuredPost && (
          <BlogCard
            key={featuredPost.id}
            title={featuredPost.title}
            subtitle={featuredPost.subtitle || ''}
            author={featuredPost.author || 'Nombre Apellido'}
            date={featuredPost.date || 'May 20, 2025'}
            readTime={`${featuredPost.readTime || '3'} min read`}
            tags={featuredPost.categories?.map(cat => cat.name) || []}
            image={featuredPost.featured_image || '/images/blog-placeholder.jpg'}
            action={{
              label: determineActionLabel(featuredPost.title),
              variant: determineActionVariant(featuredPost.title)
            }}
            featured={true}
          />
        )}
        {otherPosts.map((post) => (
          <BlogCard
            key={post.id}
            title={post.title}
            subtitle={post.subtitle || ''}
            author={post.author || 'Nombre Apellido'}
            date={post.date || 'May 20, 2025'}
            readTime={`${post.readTime || '3'} min read`}
            tags={post.categories?.map(cat => cat.name) || []}
            image={post.featured_image || '/images/blog-placeholder.jpg'}
            action={{
              label: determineActionLabel(post.title),
              variant: determineActionVariant(post.title)
            }}
          />
        ))}
      </div>

      {/* Botón en mobile */}
      <div className="mt-10 flex justify-center md:hidden">
        <Link href="/blog">
          <button className="bg-black text-white px-6 py-2 rounded-full font-medium flex items-center gap-2">
            Ir al blog <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </section>
  );
};

// Función auxiliar para determinar la etiqueta del botón según el título
function determineActionLabel(title: string): string {
  if (title.toLowerCase().includes('tuberculosis')) return 'Descargar';
  if (title.toLowerCase().includes('comunicación')) return 'Descubrir';
  return 'Leer';
}

// Función auxiliar para determinar la variante del botón según el título
function determineActionVariant(title: string): 'primary' | 'secondary' | 'tertiary' {
  if (title.toLowerCase().includes('tuberculosis')) return 'primary';
  if (title.toLowerCase().includes('comunicación')) return 'secondary';
  return 'primary';
}

export default BlogSection;