import React, { FC } from "react";
import PageArchiveComponent from "@/components/MSK/Archive/Page";
import { getAllPosts, setAllPosts } from "@/lib/allData";
import ssr from "@/services/ssr";
import { cookies } from "next/headers";
export const runtime = "edge";

export async function generateMetadata() {
  return {
    title: "Archivo",
  };
}

const PageArchive: FC<{ params: { lang: string } }> = async ({ params }) => {
  const currentCountry = params.lang || cookies().get("country")?.value;
  if (!getAllPosts() || !getAllPosts().length) {
    const fetchedPosts = await ssr.getPosts(currentCountry);
    setAllPosts(fetchedPosts);
  }
  return <PageArchiveComponent posts={getAllPosts()} />;
};

export default PageArchive;
