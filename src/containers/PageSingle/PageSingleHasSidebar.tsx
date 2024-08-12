import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import { FetchPostType, PostDataType, TaxonomyType } from "data/types";
import NcImage from "components/NcImage/NcImage";
import SingleContent from "./SingleContent";
import { CommentType } from "components/CommentCard/CommentCard";
import { useAppDispatch } from "app/hooks";
import { changeCurrentPage } from "app/pages/pages";
import { Sidebar } from "./Sidebar";
import SingleRelatedPosts from "./SingleRelatedPosts";
import SingleHeader from "./SingleHeader";
import axios from "axios";
import { API_URL } from "data/api";

export interface PageSingleHasSidebarProps {
  className?: string;
}

export interface SinglePageType extends PostDataType {
  tags: TaxonomyType[];
  content: string | ReactNode;
  comments: CommentType[];
}

const PageSingleHasSidebar: FC<PageSingleHasSidebarProps> = ({
  className = "",
}) => {
  const dispatch = useAppDispatch();
  const slug = window.location.href.split("/").pop();
  const [post, setPost] = useState<FetchPostType>({
    id: 0,
    slug: "string",
    date: "string",
    link: "string",
    title: "string",
    excerpt: "string",
    thumbnail: "string",
    image: "string",
    categories: [],
    tags: [],
    author: { id: 0, name: "", email: "", avatar: "", categories: [] },
    content: "",
  });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (slug) {
      axios
        .get(`${API_URL}/posts/${slug}`)
        .then((response) => {
          setLoading(false);
          setPost(response.data.posts[0]);
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
        });
    }
  }, []);

  useEffect(() => { });

  // UPDATE CURRENTPAGE DATA IN PAGEREDUCERS
  useEffect(() => {
    if (post) {
      dispatch(changeCurrentPage({ type: "/single/:slug", data: post }));
      return () => {
        dispatch(changeCurrentPage({ type: "/", data: {} }));
      };
    } else {
      dispatch(changeCurrentPage({ type: "/", data: {} }));
    }
  }, []);

  return (
    <>
      {isLoading ? null : (
        <>
          <div
            className={`nc-PageSingleHasSidebar pt-10 lg:pt-16 ${className}`}
            data-nc-id="PageSingleHasSidebar"
          >
            {/* SINGLE HEADER */}
            <header className="container rounded-xl">
              <div className="max-w-screen-md mx-auto">
                <SingleHeader pageData={post} />
              </div>
            </header>

            {/* FEATURED IMAGE */}
            <NcImage
              containerClassName="container my-10 sm:my-12"
              className="object-cover w-full h-full rounded-xl"
              src={post?.thumbnail}
            />

            {/* SINGLE MAIN CONTENT */}
            <div className="container flex flex-col my-10 lg:flex-row ">
              <div className="w-full lg:w-3/5 xl:w-2/3 xl:pr-20">
                <SingleContent data={post} />
              </div>
              <div className="w-full mt-12 lg:mt-0 lg:w-2/5 lg:pl-10 xl:pl-0 xl:w-1/3">
                <Sidebar />
              </div>
            </div>

            {/* RELATED POSTS */}
            <SingleRelatedPosts />
          </div>
        </>
      )}
    </>
  );
};

export default PageSingleHasSidebar;
