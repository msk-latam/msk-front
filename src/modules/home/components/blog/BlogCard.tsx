'use client';
import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';

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
}) => {
  return (
    <div
      className={clsx(
        'rounded-3xl overflow-hidden shadow-sm bg-white flex flex-col',
        featured ? 'md:col-span-2 bg-purple-50' : 'bg-white'
      )}
    >
      <div className="relative w-full h-56 md:h-64">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-5 flex flex-col gap-2">
        <div className="flex flex-wrap gap-2 text-xs font-medium">
          {tags.map((tag, i) => (
            <span
              key={i}
              className={clsx(
                'px-2 py-0.5 rounded-full',
                i === 0 ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
              )}
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-base md:text-lg font-semibold">{title}</h3>
        {subtitle && <p className="text-sm text-neutral-600">{subtitle}</p>}
        <div className="flex items-center gap-2 text-xs text-neutral-500 mt-2">
          {author && <span>{author}</span>}
          {author && <span className="mx-1">•</span>}
          <span>{date}</span>
          <span className="mx-1">•</span>
          <span>{readTime}</span>
        </div>
        <div className="mt-4">
          <button
            className={clsx(
              'px-4 py-2 rounded-full text-sm font-semibold',
              action.variant === 'primary' && 'bg-black text-white',
              action.variant === 'secondary' && 'bg-gray-100 text-black',
              action.variant === 'tertiary' && 'bg-purple-200 text-black'
            )}
          >
            {action.label}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
