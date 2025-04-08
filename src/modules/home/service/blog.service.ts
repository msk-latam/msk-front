// modules/home/services/blog.service.ts
import { BlogResponse } from "../types";

export const getBlogPosts = async (): Promise<BlogResponse> => {
  const res = await fetch("/api/home/blog");
  if (!res.ok) throw new Error("Error al cargar datos del blog");
  return res.json();
};