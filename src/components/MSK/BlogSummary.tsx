"use client";
import React, { FC, useEffect, useState } from "react";
import Card2 from "@/components/Card2/Card2";
import { FetchPostType, PostDataType } from "@/data/types";
import Card6 from "@/components/Card6/Card6";
import HeaderFilter from "./HeaderFilter";
import ImageSkeleton from "@/components/MSK/ImageSkeleton";
import { removeAccents } from "@/lib/removeAccents";
import NoResults from "../NoResults/NoResults";
import BlogSlider from "@/components/Sliders/BlogSlider";

export interface BlogSummaryProps {
  tabs: string[];
  posts: FetchPostType[] | PostDataType[];
  heading?: string;
  className?: string;
  desc?: string;
  loading?: boolean;
  showTitle?: boolean;
  forSingleNote?: boolean;
}

const BlogSummary: FC<BlogSummaryProps> = ({
  posts,
  tabs,
  heading = "Blog",
  className = "",
  desc = "",
  loading = false,
  showTitle,
  forSingleNote = false,
}) => {
  const [tabActive, setTabActive] = useState<string>(tabs[0]);
  const [auxPosts, setPosts] = useState<FetchPostType[]>([]);

  const handleClickTab = (item: string) => {
    const itemParsed = removeAccents(item);

    let filteredPosts: any[] = [];
    if (posts) {
      filteredPosts = posts.filter((post) =>
        post.categories?.some((category: any) => category.name === itemParsed)
      );
    }
    filteredPosts = filteredPosts.length ? filteredPosts : posts;

    const finalPosts = itemParsed.includes("Actualidad")
      ? filteredPosts.slice(4, 9)
      : filteredPosts;

    setPosts(finalPosts);

    if (item === tabActive) {
      return;
    }

    setTabActive(item);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      let categoryValue = decodeURIComponent(
        window.location.search.replace(/^.*\?categoria=/, "")
      );
      handleClickTab(categoryValue || "Actualidad");
    }
  }, [posts]);

  return (
    <div className={`nc-BlogSummary ${className} animate-fade-down`}>
      <HeaderFilter
        tabActive={tabActive}
        tabs={tabs}
        heading={heading}
        onClickTab={handleClickTab}
        desc={desc}
        viewMore="/archivo"
        mobileHidden="block"
      />
      {loading && (
        <>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 animate-fade-down">
            <ImageSkeleton className="col-span-1" />
            <div className="grid grid-cols-1 gap-5">
              <ImageSkeleton className="col-span-2 h-100" height="100px" />
              <ImageSkeleton className="col-span-2" height="100px" />
              <ImageSkeleton className="col-span-2" height="100px" />
            </div>
          </div>
        </>
      )}
      {!auxPosts.length && !loading && <NoResults />}

      <BlogSlider posts={auxPosts} forSingleNote={forSingleNote} />

      <div className="hidden md:grid md:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {auxPosts[0] && <Card2 size="large" post={auxPosts[0]} kind="blog" />}
        <div className="hidden sm:block">
          <div className="grid gap-6 md:gap-8 ">
            {auxPosts
              .filter((_, i) => i < 4 && i > 0)
              .map((item, index) => (
                <Card6
                  key={index}
                  post={item}
                  className="rounded-3xl"
                  kind="blog"
                  authorRow
                />
              ))}
          </div>
        </div>
        <div className="block sm:hidden">
          <div className="grid gap-6 md:gap-8 ">
            {auxPosts
              .filter((_, i) => i < 4 && i > 0)
              .map((item, index) => (
                <Card2
                  key={index}
                  post={item}
                  className="rounded-3xl"
                  kind="blog"
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSummary;
