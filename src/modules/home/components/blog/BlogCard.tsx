'use client';
import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Link from 'next/link';

type BlogCardProps = {
  title: string;
  subtitle?: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  action: { label: string; variant: 'primary' | 'secondary' | 'tertiary' };
  featured?: boolean;
  link?: string;
};

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  subtitle,
  author,
  date,
  readTime,
  tags,
  image,
  action,
  featured = false,
  link = '#',
}) => {
  // Formatear la fecha para que coincida con el diseño (May 20, 2025)
  const formatDate = (dateStr: string) => {
    try {
      const parts = dateStr.split(' ');
      if (parts.length > 1) return dateStr;
      
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div
      className={clsx(
        'rounded-xl overflow-hidden shadow-sm hover:shadow-md transition',
        featured ? 'md:col-span-2' : ''
      )}
    >
      <div className="relative w-full h-48">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-5 bg-purple-50 bg-opacity-30">
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.slice(0, 2).map((tag, i) => (
            <span
              key={i}
              className={clsx(
                'text-xs px-2 py-1 rounded-full',
                i === 0 ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
              )}
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-semibold text-base mb-1">{title}</h3>
        {subtitle && <p className="text-gray-600 text-xs mb-3">{subtitle}</p>}

        <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-gray-200 mr-2 flex items-center justify-center overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-500">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
              </svg>
            </div>
            {author}
          </div>
          <div>{formatDate(date)}</div>
        </div>
        
        <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {readTime}
        </div>

        <div className="mt-4">
          <Link href={link}>
            <button
              className={clsx(
                'px-4 py-2 rounded-full text-sm font-medium',
                action.variant === 'primary' && 'bg-gray-900 text-white',
                action.variant === 'secondary' && 'bg-gray-900 text-white',
                action.variant === 'tertiary' && 'bg-gray-900 text-white'
              )}
            >
              {action.label}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;