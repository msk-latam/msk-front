import { NextResponse } from "next/server";
import { BlogPost, Category } from "@/modules/home/types";

export async function GET() {
  try {
    const res = await fetch("https://cms1.msklatam.com/wp-json/msk/v1/front/inicio?lang=int&nocache=1", {
      next: { revalidate: 0 },
    });
    

    if (!res.ok) {
      throw new Error("Error al obtener los datos del blog");
    }

    const json = await res.json();
    const blogSection = json?.sections?.blog || {};

    // Función para mapear posts
    const mapPosts = (posts: any[], isFeatured = false): BlogPost[] => {
      return posts.map((post: any, index: number) => {
        const categories: Category[] = Array.isArray(post.categories)
          ? post.categories.map((cat: any) => ({
              id: cat.id || 0,
              name: cat.name || "",
              slug: cat.slug || "",
            }))
          : [];

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
          featured: isFeatured && index === 0 ? "1" : "0",
        };
      });
    };

    const featured_blog_articles = mapPosts(blogSection.featured_blog_articles || [], true);
    const featured_blog_guides = mapPosts(blogSection.featured_blog_guides || []);
    const featured_blog_infographies = mapPosts(blogSection.featured_blog_infographies || []);

    return NextResponse.json({
      title: blogSection.title || '',
      subtitle: blogSection.subtitle || '',
      featured_blog_articles,
      featured_blog_guides,
      featured_blog_infographies,
    });

  } catch (error) {
    console.error("Error al obtener los datos del blog:", error);
    return NextResponse.json({
      title: '',
      subtitle: '',
      featured_blog_articles: [],
      featured_blog_guides: [],
      featured_blog_infographies: [],
    }, { status: 500 });
  }
}
