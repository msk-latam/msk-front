import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import React, { FC, useEffect, useState } from "react";
import SingleTitle from "./SingleTitle";
import PostMeta2 from "components/PostMeta2/PostMeta2";
import SingleMetaAction2 from "./SingleMetaAction2";
import { Helmet } from "react-helmet";
import { FetchPostType } from "data/types";

export interface SingleHeaderProps {
  pageData: FetchPostType | any;
  hiddenDesc?: boolean;
  metaActionStyle?: "style1" | "style2";
  titleMainClass?: string;
  className?: string;
}

const SingleHeader: FC<SingleHeaderProps> = ({
  pageData,
  titleMainClass,
  hiddenDesc = false,
  className = "",
  metaActionStyle = "style1",
}) => {
  const [post, setPost] = useState<FetchPostType>(pageData);
  useEffect(() => {
    setPost(pageData);
  }, [pageData]);
  return (
    <>
      {post ? (
        <>
          <Helmet>
            <title>MSK | {post.title}</title>
          </Helmet>
          {/* <div className={`nc-SingleHeader ${className}`}>
            <div className="space-y-5">
              <SingleTitle mainClass={titleMainClass} title={post.title} />
              {!!post.excerpt && !hiddenDesc && (
                <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
                  {post.excerpt}
                </span>
              )}
              <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
              <div className="flex flex-col sm:flex-row justify-between sm:items-end space-y-5 sm:space-y-0 sm:space-x-5">
                <PostMeta2
                  size="large"
                  className="leading-none flex-shrink-0"
                  meta={pageData}
                  hiddenCategories
                  avatarRounded="rounded-full shadow-inner"
                />
                <SingleMetaAction2 meta={pageData} />
              </div>
            </div>
          </div> */}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default SingleHeader;
