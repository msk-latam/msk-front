import React, { FC } from "react";
import NcImage from "@/components/NcImage/NcImage";
import {
  FetchCourseType,
  FetchPostType,
  UserCourse,
  UserCourseProgress,
} from "@/data/types";
import CardAuthor2 from "@/components/CardAuthor2/CardAuthor2";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import { compareByNameDescending } from "@/lib/compareByNameDescending";
import NcLink from "../NcLink/NcLink";

export interface Card2Props {
  className?: string;
  post: FetchPostType | FetchCourseType | UserCourse | UserCourseProgress;
  size?: "normal" | "large";
  hideDesc?: boolean;
  redirectAccount?: boolean;
  hideAuthor?: boolean;
  badgeColor?: string;
  kind?: string;
  forSingleNote?:boolean
}

const Card2: FC<Card2Props> = ({
  className = "h-full",
  size = "normal",
  post,
  redirectAccount,
  kind = "curso",
  hideDesc,
  hideAuthor,
                                 forSingleNote
}) => {
  const {
    title,
    image,
    slug,
    categories,
    father_post_type,
    excerpt,
    date,
    author,
    reading_time
  } = post;

  const imageURL = image?.replace("mx.", "");
  const url = redirectAccount ? `/mi-cuenta/cursos` : `/${kind}/${slug}`;
  const categoriesOrder =
    kind === "blog" ? categories.sort(compareByNameDescending) : categories;

  return (
    <div
      className={`nc-Card2 group relative flex flex-col  [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] overflow-hidden ${className} rounded-lg`}
      data-nc-id="Card2"
    >
      <span className="block flex-shrink-0 flex-grow relative w-full h-0 pt-[75%] sm:pt-[55%] rounded-lg overflow-hidden">
        <NcImage
          containerClassName="absolute inset-0"
          src={imageURL || ""}
          alt={title || ""}
          sizes="(max-width: 1280px) 100vw, 1536px"
          fill
        />
      </span>
      <NcLink href={url} className="absolute inset-0" />
      <div className="p-4 sm:p-5 flex flex-col">
        <div className="space-y-3">
          <CategoryBadgeList
            itemClass="relative"
            isCourse={father_post_type === "course"}
            isPost={kind === "blog"}
            categories={categoriesOrder}
          />
          <h4
            className={`nc-card-title block font-medium text-neutral-900 dark:text-neutral-100 transition-colors h-4 sm:h-10 ${
              size === "large" ? "text-lg sm:text-2xl" : "text-base"
            }`}
          >
            <NcLink
              href={url}
              className="line-clamp-2 truncate block font-medium"
              colorClass=" text-black"
            >
              {title}
            </NcLink>
          </h4>
          <span className="block text-neutral-500 dark:text-neutral-400 text-sm line-clamp-2 truncate">
            {excerpt}
          </span>
        </div>
        {hideAuthor ? null : (
          <CardAuthor2 className="relative my-4" date={date} author={author} readingTime={Number(reading_time)} forSingleNote={forSingleNote} />
        )}
      </div>
    </div>
  );
};

export default Card2;
