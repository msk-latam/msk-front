'use client';

import Link from 'next/link';

interface CourseCardProps {
  title: string;
  subtitle: string;
  hours: number;
  tags: string[];
  imageUrl: string;
  slug: string;
  lang: string;
}

export default function CourseCard({ title, subtitle, hours, tags, imageUrl, slug, lang }: CourseCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <div className="flex gap-2 text-xs mb-1">
          {tags.map((tag) => (
            <span key={tag} className="bg-blue-100 text-blue-800 px-2 rounded">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-semibold text-sm leading-snug mb-1">{title}</h3>
        <p className="text-xs text-neutral-500">{subtitle}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xs text-neutral-500">⏳ {hours} horas</span>
          <Link
            href={`/${lang}/tienda/${slug}`}
            className="text-sm font-semibold text-white bg-black rounded-full px-4 py-1 hover:bg-neutral-800"
          >
            Descubrir
          </Link>
        </div>
      </div>
    </div>
  );
}
