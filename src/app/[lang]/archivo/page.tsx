import React, { FC } from "react";
import PageArchiveComponent from "@/components/MSK/Archive/Page";
import { getAllPosts, setAllPosts } from "@/lib/allData";
import ssr from "@/services/ssr";
import { cookies } from "next/headers";
import { Props } from "@/app/layout";
import { Metadata } from "next";
import { IS_PROD, SITE_URL } from "@/contains/constants";
export const runtime = "edge";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const currentCountry = params.lang || cookies().get("country")?.value;
  return {
    title: "Archivo | MSK",
    alternates: IS_PROD
      ? {
          canonical: `${SITE_URL}/${currentCountry}/archivo`,
        }
      : undefined,
    robots: IS_PROD
      ? {
          index: true,
          follow: true,
        }
      : undefined,
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
