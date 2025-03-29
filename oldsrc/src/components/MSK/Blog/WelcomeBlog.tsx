"use client";
import React, { FC, useState } from "react";
import Card19 from "@/components/Card19/Card19";
import Card18 from "@/components/Card18/Card18";
import { FetchPostType } from "@/data/types";
import Heading from "@/components/Heading/Heading";
import ImageSkeleton from "@/components/Skeleton/ImageSkeleton";
import NoResults from "@/components/NoResults/NoResults";
import HeaderFilter from "../HeaderFilter";

interface WelcomeBlogProps {
  tabs: string[];
  posts: FetchPostType[];
  heading?: string;
  className?: string;
  loading?: boolean;
}
const WelcomeBlog: FC<WelcomeBlogProps> = ({
  posts,
  tabs,
  className = "",
  heading = " ",
  loading = false,
}) => {
  const [tabActive, setTabActive] = useState<string>(tabs[0]);

  // When handeClicktab please get posts from api,... and pass to new state (newPosts) and pass to
  const handleClickTab = (item: string) => {
    if (item === tabActive) {
      return;
    }
    setTabActive(item);
  };

  return (
    <div className={`nc-WelcomeBlog ${className} animate-fade-down`}>
      <Heading
        desc="Encuentra aquí la información y los testimonios más importantes"
        className="w-full my-8"
      >
        Te damos la bienvenida a nuestro blog
      </Heading>
      {heading && (
        <HeaderFilter
          tabActive={tabActive}
          tabs={tabs}
          heading={heading}
          onClickTab={handleClickTab}
        />
      )}
      {loading && (
        <>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 animate-fade-down">
            <ImageSkeleton className="col-span-1" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <ImageSkeleton className="col-span-1 h-100" height="150px" />
              <ImageSkeleton className="col-span-1" height="150px" />
              <ImageSkeleton className="col-span-2" height="150px" />
            </div>
          </div>
        </>
      )}
      {!posts.length && !loading && (
        <div className="w-full" style={{ background: "red" }}>
          <NoResults />
        </div>
      )}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {posts[0] && <Card19 className="" post={posts[0]} kind="blog" />}
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-5 gap-5">
          {posts
            .map((item, index) => (
              <Card18
                showCategories={true}
                className="sm:row-span-3 col-span-1"
                key={index}
                post={item}
                kind="blog"
              />
            ))
            .filter((_, i) => i < 3 && i >= 1)}

          {posts[3] && (
            <Card19
              ratio="aspect-w-4 aspect-h-3 sm:aspect-h-1 sm:aspect-w-16 "
              className="sm:col-span-2 sm:row-span-2"
              titleClass="text-xl sm:text-2xl xl:text-2xl"
              post={posts[3]}
              showCategories={true}
              kind="blog"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeBlog;
