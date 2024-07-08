"use client";
import React, { FC, ReactNode, useContext, useEffect, useState } from "react";
import { JsonMapping, PostDataType, TaxonomyType } from "@/data/types";
import NcImage from "@/components/NcImage/NcImage";
import { CommentType } from "@/components/CommentCard/CommentCard";
import Card11 from "@/components/Card11/Card11";
import ArchiveFilterListBox from "@/components/ArchiveFilterListBox/ArchiveFilterListBox";
import { removeAccents } from "@/lib/removeAccents";
import NcModal from "@/components/NcModal/NcModal";
import notesMapping from "../../../data/jsons/__notes.json";
import specialtiesMapping from "../../../data/jsons/__specialties.json";
import specialtiesBannersMapping from "../../../data/jsons/__specialties_banners.json";
import { TABS_BLOG } from "@/data/MSK/blog";
import NoResults from "@/components/NoResults/NoResults";
import SpecialtiesModal from "@/components/MSK/Blog/Post/SpecialtiesModal";
import BlogSummary from "@/components/MSK/BlogSummary";
import LoaderImage from "@/components/MSK/Loader/Image";
import ItemSkeleton from "@/components/Skeleton/ItemSkeleton";
import StorePagination from "@/components/MSK/Store/StorePagination";
import { slugifySpecialty } from "@/lib/Slugify";


export const runtime = "edge";

export interface PageArchiveProps {
  className?: string;
  posts: PostDataType[];
}

export interface SinglePageType extends PostDataType {
  tags: TaxonomyType[];
  content: string | ReactNode;
  comments: CommentType[];
}

const CATEGORIES_FILTERS = [
  { name: "Todas las categorías" },
  { name: "Actualidad" },
  { name: "Entrevistas" },
  { name: "Opinión" },
];
const FILTERS = [{ name: "Más recientes" }, { name: "Más leídos" }];

const PageArchiveComponent: FC<PageArchiveProps> = ({
  className = "",
  posts,
}) => {
  const [auxPosts, setAuxPosts] = useState<PostDataType[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    setAuxPosts(posts);
    setLoadingPosts(false);
  }, [posts]);

  const [title, setTitle] = useState("Archivo");
  const [currentPage, setCurrentPage] = useState(1);
  const [bannerImage, setBannerImage] = useState("/images/banners/archive.jpg");
  const [showSpecialties, setShowSpecialties] = useState(false);
  const itemsPerPage = 12;

  // pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems: any[] = auxPosts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(auxPosts.length / itemsPerPage);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = (e: { name: string }) => {
    if (e.name == "Todas las categorías") {
      setTitle("Archivo");
      setBannerImage("/images/banners/archive.jpg");
      return setAuxPosts(posts);
    }
    let filteredPosts = posts.filter((post: PostDataType) => {
      return post.categories.some((category) =>
        category.name.includes(removeAccents(e.name))
      );
    });
    setTitle(e.name);
    // @ts-ignore
    setBannerImage(specialtiesBannersMapping[e.name]);
    setAuxPosts(filteredPosts);
    setAuxPosts(filteredPosts);
  };

  const handleFilterChange = (e: { name: string }) => {
    let filteredPosts: any = [...auxPosts];
    if (e.name === "Más recientes") {
      filteredPosts.sort((a: { date: string }, b: { date: string }) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      setAuxPosts(filteredPosts);
    }
    if (e.name === "Más leídos") {
      const the_most_read = filteredPosts[0].the_most_read.map(
        (post: { category: string }) => {
          return {
            ...post,
            categories: [
              { name: post.category, slug: post.category.toLowerCase() },
            ],
          };
        }
      );
      setAuxPosts(the_most_read);
    }
  };

  if (typeof window != "undefined") {
    useEffect(() => {
      let categoryValue = decodeURIComponent(
        window.location.search.replace(/^.*\?categoria=/, "")
      );
      let specialtyValue = decodeURIComponent(
        window.location.search.replace(/^.*\?especialidad=/, "").replace(/^.*\?categoria=/, "")
      );

      const notesJSON: JsonMapping = notesMapping;
      const specialtiesJSON: JsonMapping = specialtiesMapping;
      const specialtiesBannersJSON: JsonMapping = specialtiesBannersMapping;

      const title = specialtyValue
        ? specialtiesJSON[specialtyValue]
        : (categoryValue && !categoryValue.includes("Otra") )
        ? notesJSON[categoryValue]
        : "Archivo";

      setTitle(title);

      const bannerImg = specialtyValue
        ? specialtiesBannersJSON[specialtyValue]
        : (categoryValue && !categoryValue.includes("Otra") )
          ? specialtiesBannersJSON[categoryValue]
          : "/images/banners/archive.jpg";

      console.log(categoryValue);
      console.log(specialtyValue);
      console.log(bannerImg);
      setBannerImage(bannerImg)

      if (!specialtyValue && !categoryValue) return setAuxPosts(posts);

      let filteredPosts = [];
       if (specialtyValue) {
         filteredPosts = posts.filter((post: PostDataType) => {
           let categories = post.categories.map((category) => slugifySpecialty(category.name));
           return categories.includes(specialtyValue);
         });
       } else {
         filteredPosts = auxPosts.filter((post: PostDataType) => {
           return post.categories.some((category) =>
             category.name.includes(notesJSON[categoryValue])
           );
         });
       }
      setCurrentPage(1);
      setAuxPosts(filteredPosts);

    }, [window.location.search]);
  }

  let loaders = [];
  for (let i = 0; i < 6; i++) {
    loaders.push(<LoaderImage key={`loader_${i}`} />);
  }

  return (
    <>
      <div
        className={`nc-PageArchive pt-8 lg:pt-8 ${className} animate-fade-down`}
        data-nc-id="PageArchive"
      >
        {loadingPosts ? (
          <div className="container">
            <ItemSkeleton hideText />
          </div>
        ) : (
          <>
            {currentItems.length ? (
              <header className="w-full px-[20px] xl:max-w-screen-2xl mx-auto">
                <div className="container relative aspect-w-16 aspect-h-13 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-5 rounded-3xl md:rounded-[40px] overflow-hidden z-0">
                  <NcImage
                    className="rounded-3xl md:rounded-[40px] object-cover absolute inset-0 w-full h-full"
                    src={bannerImage}
                    alt=""
                    width="1920"
                    height="1080"
                  />

                  <div className="absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center">
                    <h2 className="inline-block align-middle text-white text-[27px] sm:text-5xl font-semibold md:text-7xl">
                      {title}
                    </h2>
                    <span className="block mt-4 text-neutral-300">
                      {[auxPosts.length]} Artículos
                    </span>
                  </div>
                </div>
              </header>
            ) : null}
          </>
        )}
        <div className="container my-10 animate-fade-down">
          <div className="flex space-between flex-wrap mb-8 gap-2">
            <ArchiveFilterListBox
              setFilter={handleCategoryChange}
              lists={CATEGORIES_FILTERS}
            />
            {/* <Button
              onClick={() => setShowSpecialties(true)}
              sizeClass="px-4 py-2 sm:px-5"
              className="border-1 border-neutral-200 text-neutral-500"
              bordered
            >
              <span className="text-sm">Ver Especialidades</span>
            </Button> */}
            <ArchiveFilterListBox
              setFilter={handleFilterChange}
              lists={FILTERS}
              className="xs:mr-auto md:ml-auto"
            />
          </div>
          {loadingPosts ? (
            <div className="container grid grid-cols-1 md:grid-cols-3 gap-10">
              {loaders.map((loader) => {
                return loader;
              })}
            </div>
          ) : (
            <>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 animate-fade-down">
                {auxPosts.length ? (
                  <>
                    {currentItems.map((post, index) => (
                      <Card11
                        key={`blog_${index}_${post.slug}`}
                        post={post}
                        className="rounded-xl"
                        kind="blog"
                      />
                    ))}
                  </>
                ) : (
                  <div className="col-span-12">
                    <NoResults />
                  </div>
                )}
              </div>
              <div className="flex justify-center mt-4">
                <StorePagination
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  currentPage={currentPage}
                />
              </div>
            </>
          )}
          <BlogSummary
            posts={posts}
            tabs={TABS_BLOG}
            loading={loadingPosts}
            className="py-16"
            heading=""
            desc=""
          />
        </div>
      </div>
      <NcModal
        isOpenProp={showSpecialties}
        onCloseModal={() => {
          setShowSpecialties(false);
        }}
        renderTrigger={() => {
          return null;
        }}
        contentExtraClass="max-w-screen-lg"
        renderContent={() => <SpecialtiesModal setShow={setShowSpecialties} />}
        modalTitle="Especialidades"
        modalSubtitle=""
        centerTitle
      />
    </>
  );
};

export default PageArchiveComponent;
