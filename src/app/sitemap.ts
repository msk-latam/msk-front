import { countries } from "@/data/countries";
import { MetadataRoute } from "next";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return countries.map((c) => ({
    url: `https://msklatam.com/${c.id}/`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 1,
  }));
}
