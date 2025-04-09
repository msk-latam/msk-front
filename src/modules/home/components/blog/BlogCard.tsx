"use client";
import React from "react";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";

type ActionVariant = "primary" | "secondary" | "tertiary";

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
  bgColor?: string;
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
  link = "#",
  bgColor,
}) => {
  const cardStyle = bgColor ? { backgroundColor: bgColor } : undefined;

  return (
    <article
      className="rounded-2xl overflow-hidden bg-white h-full shadow-sm border border-gray-100"
      style={cardStyle}
    >
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
        <h3 className="font-semibold font-raleway text-lg mt-2 mb-1 line-clamp-2">
          {title}
        </h3>
        {subtitle && (
          <p className="text-gray-600 font-inter text-base mb-3 line-clamp-2">{subtitle}</p>
        )}
        <ArticleMeta author={author} date={date} readTime={readTime} />

        <div className="flex flex-row md:items-center md:justify-between mt-4 gap-2">
  <div className="flex md:justify-start items-center gap-4 w-full md:w-auto">
    <button
      className="flex items-center gap-1 p-2 bg-white rounded-full text-xs text-gray-500 hover:text-gray-700"
      aria-label="Guardar artículo"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
        />
      </svg>
    </button>

    <div
      className="flex items-center pt-1 gap-1 text-xs text-gray-500"
      aria-label="Tiempo de lectura"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {readTime}
    </div>
  </div>

  <div className="flex justify-end w-full md:w-auto">
    <BlogCardAction
      label={action.label}
      variant={action.variant}
      link={link}
    />
  </div>
</div>

      </div>
    </article>
  );
};

const TagList: React.FC<TagListProps> = ({ tags }) => (
  <div className="flex flex-wrap gap-2" aria-label="Categorías">
    {tags.slice(0, 2).map((tag, i) => {
      let bgColor = "bg-purple-50";
      let textColor = "text-purple-700";

      if (tag.toLowerCase().includes("medicina")) {
        bgColor = "bg-[#DFE6FF]";
        textColor = "text-[#6474A6]";
      } else if (
        tag.toLowerCase().includes("actualidad") ||
        tag.toLowerCase().includes("infografía")
      ) {
        bgColor = "bg-[#FFF0DF]";
        textColor = "text-[#A69164]";
      } else if (tag.toLowerCase().includes("guía")) {
        bgColor = "bg-[#DFE6FF]";
        textColor = "text-[#6474A6]";
      }

      return (
        <span
          key={i}
          className={`text-xs px-2 py-1 rounded-full ${bgColor} ${textColor}`}
        >
          {tag}
        </span>
      );
    })}
  </div>
);

// ✅ Función para formatear la fecha
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const ArticleMeta: React.FC<ArticleMetaProps> = ({ author, date }) => (
  <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
    <div
      className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-3 h-3 text-gray-500"
      >
        <path
          fillRule="evenodd"
          d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
          clipRule="evenodd"
        />
      </svg>
    </div>
    <span>{author}</span>
    <span className="text-gray-400">•</span>
    <time dateTime={date}>{formatDate(date)}</time>
  </div>
);

const BlogCardAction: React.FC<BlogCardActionProps> = ({
  label,
  variant,
  link,
}) => {
  let buttonStyle = "bg-black text-white hover:bg-gray-800";

  if (variant === "secondary") {
    buttonStyle = "bg-black text-white hover:bg-gray-800";
  } else if (variant === "tertiary") {
    buttonStyle = "bg-black text-white hover:bg-gray-800";
  }

  return (
    <Link href={link}>
      <button
        className={`px-4 py-2 rounded-full text-sm font-medium ${buttonStyle}`}
        aria-label={`${label} artículo`}
      >
        {label}
      </button>
    </Link>
  );
};

export default BlogCard;
