//src/modules/home/components/blog/BlogCard.tsx
'use client';
import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Link from 'next/link';

type ActionVariant = 'primary' | 'secondary' | 'tertiary';

interface BlogAction {
  label: string;
  variant: ActionVariant;
}

interface BlogCardProps {
  title: string;
  subtitle?: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  action: BlogAction;
  featured?: boolean;
  link?: string;
}

interface TagListProps {
  tags: string[];
}

interface ArticleMetaProps {
  author: string;
  date: string;
  readTime: string;
}

interface BlogCardActionProps {
  label: string;
  variant: ActionVariant;
  link: string;
}

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
  return (
    <article className="rounded-lg overflow-hidden bg-white h-full shadow-sm border border-gray-100">
      <div className="relative w-full h-44 md:h-48">
        <Image 
          src={image} 
          alt={`Imagen destacada: ${title}`} 
          fill 
          className="object-cover"
        />
      </div>
      <div className="p-4 md:p-5">
        <TagList tags={tags} />
        <h3 className="font-semibold text-base mt-2 mb-1 line-clamp-2">{title}</h3>
        {subtitle && <p className="text-gray-600 text-xs mb-3 line-clamp-2">{subtitle}</p>}
        <ArticleMeta author={author} date={date} readTime={readTime} />
        <BlogCardAction label={action.label} variant={action.variant} link={link} />
      </div>
    </article>
  );
};

// Helper Components
const TagList: React.FC<TagListProps> = ({ tags }) => (
  <div className="flex flex-wrap gap-2" aria-label="Categorías">
    {tags.slice(0, 2).map((tag, i) => {
      // Map tags to color schemes
      let bgColor = "bg-purple-50";
      let textColor = "text-purple-700";
      
      if (tag.toLowerCase().includes("medicina")) {
        bgColor = "bg-blue-50";
        textColor = "text-blue-700";
      } else if (tag.toLowerCase().includes("actualidad")) {
        bgColor = "bg-orange-50";
        textColor = "text-orange-700";
      } else if (tag.toLowerCase().includes("infografía")) {
        bgColor = "bg-green-50";
        textColor = "text-green-700";
      } else if (tag.toLowerCase().includes("guía")) {
        bgColor = "bg-yellow-50";
        textColor = "text-yellow-700";
      }
      
      return (
        <span
          key={i}
          className={`text-xs px-2 py-1 rounded-md ${bgColor} ${textColor}`}
        >
          {tag}
        </span>
      );
    })}
  </div>
);

const ArticleMeta: React.FC<ArticleMetaProps> = ({ author, date, readTime }) => (
  <div className="flex flex-col gap-2 mt-4 text-xs text-gray-500">
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-gray-500">
          <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
        </svg>
      </div>
      <span>{author}</span>
      <span className="text-gray-400">•</span>
      <time dateTime={date}>{date}</time>
    </div>
    
    <div className="flex items-center gap-2" aria-label="Tiempo de lectura">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {readTime}
    </div>
  </div>
);

const BlogCardAction: React.FC<BlogCardActionProps> = ({ label, variant, link }) => {
  // Map variants to button styles based on the design
  let buttonStyle = "bg-black text-white hover:bg-gray-800";
  
  if (variant === 'secondary') {
    buttonStyle = "bg-black text-white hover:bg-gray-800";
  } else if (variant === 'tertiary') {
    buttonStyle = "bg-black text-white hover:bg-gray-800";
  }
  
  return (
    <div className="mt-4">
      <Link href={link}>
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium ${buttonStyle}`}
          aria-label={`${label} artículo`}
        >
          {label}
        </button>
      </Link>
    </div>
  );
};

export default BlogCard;