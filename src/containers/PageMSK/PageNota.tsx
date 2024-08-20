import React, { FC, ReactNode, useEffect, useState } from "react";
import { PostDataType, TaxonomyType } from "data/types";
import SingleContent from "../PageMSK/note/SingleContent";
import { CommentType } from "components/CommentCard/CommentCard";
import { useAppDispatch } from "app/hooks";
import SingleHeader from "../PageMSK/note/SingleHeader";
import { useParams } from "react-router-dom";
import NcImage from "components/NcImage/NcImage";
import ImageSkeleton from "components/Skeleton/ImageSkeleton";
import TitleSkeleton from "components/Skeleton/TitleSkeleton";
import ItemSkeleton from "components/Skeleton/ItemSkeleton";
import api from "Services/api";
import PageHead from "containers/Head/PageHead";
import Breadcrum from "components/Breadcrum";

export interface PageSingleTemp3SidebarProps {
  className?: string;
}

export interface SinglePageType extends PostDataType {
  tags: TaxonomyType[];
  content: string | ReactNode;
  comments: CommentType[];
  fuentes?: string[];
  excerpt?: string;
  articles: { title: string | null; content: string }[];
  themes_to_se: Array<{
    introduction?: string;
    id?: string;
    title?: string;
    type?: string;
  }>;
}

interface ParamsType {
  slug: string;
}

const PageNota: FC<PageSingleTemp3SidebarProps> = ({ className = "" }) => {
  const { slug } = useParams<ParamsType>();
  const [note, setNote] = useState<SinglePageType>({} as SinglePageType);
  const [fuentes, setFuentes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // UPDATE CURRENTPAGE DATA IN PAGEREDUCERS
  useEffect(() => {
    const getNote = async () => {
      setLoading(true);
      try {
        const post = await api.getSinglePost(slug);
        setNote(post);
        const auxFuentes = post?.fuentes || [];
        setFuentes(
          auxFuentes.map((fuente: { fuente: string }) => fuente.fuente)
        );
      } catch (error) {
        console.error("Error fetching note:", error);
        setNote({} as SinglePageType);
        setFuentes([]);
      } finally {
        setLoading(false);
      }
    };

    getNote();
  }, [slug]);

  return (
    <>
      <PageHead title={`${note?.title}`} description={`${note?.excerpt}`} />
      <>
        {loading ? (
          <>
            <header className="relative pt-16 z-10 md:py-20 lg:py-14 dark:bg-black background-note-blog">
              {/* SINGLE HEADER */}
              <div className="container relative overflow-hidden ">
                <TitleSkeleton />
              </div>
              {/* FEATURED IMAGE */}
              <div className="container relative overflow-hidden mt-16">
                <ImageSkeleton height="500px" />
              </div>
            </header>
            <div className="container my-16">
              <div className="grid grid-cols-12 gap-4 mx-auto">
                <ItemSkeleton className="col-span-12 lg:col-span-9" />
                <ItemSkeleton className="col-span-12 lg:col-span-3" />
                <ItemSkeleton className="col-span-12 lg:col-span-9 mt-16" />
              </div>
            </div>
          </>
        ) : (
          note && (
            <div
              className={`nc-PageSingleTemp3¸Sidebar ${className}`}
              data-nc-id="PageSingleTemp3Sidebar"
            >
              <header className="relative pt-10 z-10 md:py-20 lg:py-14 dark:bg-black background-note-blog animate-fade-down">
                {/* SINGLE HEADER */}
                <div className="dark container relative z-10">
                  <div>
                    <Breadcrum onBlog={true}  onNote={note}/>

                    <SingleHeader
                      hiddenDesc={false}
                      metaActionStyle="style2"
                      pageData={note}
                    />
                  </div>
                </div>
                {/* FEATURED IMAGE */}
                <div className="px-[16px]">
                  {note.featured_image && note.featured_image.length ? (
                    <div className="container rounded-lg md:rounded-[40px] relative overflow-hidden top-4 md:top-8 header-image-container ">
                      <NcImage
                        containerClassName="absolute inset-0"
                        src={note.featured_image[0]}
                        className="object-cover w-full h-full max-h-[350px] sm:max-h-full rounded-lg"
                      />
                    </div>
                  ) : null}
                </div>
              </header>

              {/* SINGLE MAIN CONTENT */}
              <div className="container flex flex-col col-span-12 w-full my-10 lg:flex-row note-container">
                <div className="w-full">
                  <SingleContent data={note} sources={fuentes} />
                </div>
              </div>

              {/* RELATED POSTS */}
              {/* <SingleRelatedPosts /> */}
            </div>
          )
        )}
      </>
    </>
  );
};

export default PageNota;
