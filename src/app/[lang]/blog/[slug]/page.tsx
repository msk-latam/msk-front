import React, { FC } from "react";
import ssr from "../../../../../Services/ssr";
import SingleHeader from "@/components/MSK/Blog/Post/PostSingleHeader";
import NcImage from "@/components/NcImage/NcImage";
import SingleContent from "@/components/MSK/Blog/Post/SingleContent";
import { cookies } from "next/headers";

interface PageCourseProps {
  params: any;
}
export const runtime = "edge";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const postMetadata = await ssr.getSinglePost(params.slug);
  return {
    title: postMetadata.title,
    description: postMetadata.excerpt,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_URL}/blog`,
    },
  };
}

const PageNota: FC<PageCourseProps> = async ({ params }) => {
  const post = await ssr.getSinglePost(params.slug);
  const currentCountry = params.lang || cookies().get("country")?.value;
  const allBestSellers = await ssr.getBestSellers(currentCountry);
  const { fiveSpecialtiesGroup } = await ssr.fetchPostsSpecialities();
  const fuentes = post?.fuentes || [];
  return (
    <>
      <div
        className={`nc-PageSingleTemp3¸Sidebar`}
        data-nc-id="PageSingleTemp3Sidebar"
      >
        <header className="relative pt-10 z-10 md:py-20 lg:py-14 dark:bg-black background-note-blog animate-fade-down">
          {/* SINGLE HEADER */}
          <div className="note-header-background" />
          <div className="dark container relative z-10">
            <div className={"container"}>
              <SingleHeader
                hiddenDesc={false}
                metaActionStyle="style2"
                pageData={post}
                className={""}
                excerptClassName={"color-light-white-text"}
              />
            </div>

          </div>
          {/* FEATURED IMAGE */}
          <div className="px-[16px] ">
            {post.featured_image && post.featured_image.length ? (
              <div className="container rounded-lg md:rounded-[40px] relative overflow-hidden top-8 header-image-container ">
                <NcImage
                  containerClassName="absolute inset-0"
                  src={post.featured_image[0]}
                  className="object-cover w-full h-full"
                  alt={`${post.title}`}
                  height="500"
                  width="1080"
                />
              </div>
            ) : null}
          </div>
        </header>

        {/* SINGLE MAIN CONTENT */}
        <div className=" flex flex-col col-span-12 w-full lg:flex-row note-container">
          <div className="w-full  md:mt-0">
            <SingleContent
              data={post}
              sources={fuentes}
              bestSellers={allBestSellers}
              fiveSpecialtiesGroup={fiveSpecialtiesGroup}
            />
          </div>
        </div>

        {/* RELATED POSTS */}
        {/* <SingleRelatedPosts /> */}
      </div>
    </>
  );
};

export default PageNota;
