// app/api/home/blog/route.ts
import { NextResponse } from "next/server";
import { BlogPost, Category } from "@/modules/home/types";

export async function GET() {
  try {
    const res = await fetch("https://cms1.msklatam.com/wp-json/msk/v1/front/inicio?lang=es");

    if (!res.ok) {
      throw new Error("Error al obtener los datos del blog");
    }

    const json = await res.json();

    const blogSection = json?.sections?.blog || {};
    const rawBlogArticles = blogSection.featured_blog_articles || [];

    const mappedBlogPosts: BlogPost[] = rawBlogArticles.map((post: any, index: number) => {
      const categories: Category[] = Array.isArray(post.categories) 
        ? post.categories.map((cat: any) => ({
            id: cat.id || 0,
            name: cat.name || "",
            slug: cat.slug || ""
          }))
        : [];

      // 👇 Asegurarse que featured_image sea una string antes de hacer replace
      let featuredImage = "/images/default-image.jpg";
      if (typeof post.featured_image === "string") {
        featuredImage = post.featured_image.replace(
          "https://es.wp.msklatam.com",
          "https://cms1.msklatam.com"
        );
      }

      return {
        id: post.id || 0,
        title: post.title || "",
        subtitle: post.subtitle || "",
        author: post.author || "",
        date: post.date || "",
        readTime: post.time_to_read || null,
        tags: Array.isArray(post.tags) ? post.tags : [],
        featured_image: featuredImage,
        link: post.link || "",
        categories: categories,
        featured: index === 0 ? "1" : "0"
      };
    });

    return NextResponse.json({
      title: blogSection.title || '',
      subtitle: blogSection.subtitle || '',
      featured_blog_articles: mappedBlogPosts,
    });

  } catch (error) {
    console.error("Error al obtener los datos del blog:", error);
    return NextResponse.json({
      title: '',
      subtitle: '',
      featured_blog_articles: [],
    }, { status: 500 });
  }
}
