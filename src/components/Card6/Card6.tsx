import React, { FC } from "react";
import NcImage from "@/components/NcImage/NcImage";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import PostCardSaveAction from "@/components/PostCardSaveAction/PostCardSaveAction";
import {
  BlogDataType,
  FetchCourseType,
  FetchPostType,
  PostDataType,
} from "@/data/types";
import PostCardLikeAndComment from "@/components/PostCardLikeAndComment/PostCardLikeAndComment";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import CardAuthor2 from "@/components/CardAuthor2/CardAuthor2";
import { compareByNameDescending } from "@/lib/compareByNameDescending";
import NcLink from "../NcLink/NcLink";

export interface Card6Props {
  className?: string;
  post: FetchPostType;
  authorRow?: boolean;
  badgeColor?: string;
  kind?: string;
  forSingleNote?: boolean
}

const Card6: FC<Card6Props> = ({
  className = "h-full",
  post,
  authorRow,
  kind = "blog",
  badgeColor,
                                 forSingleNote
}) => {
  const { title, slug, image, categories, link, author, date, reading_time } = post;
  const categoriesOrder =
    kind === "blog" ? categories.sort(compareByNameDescending) : categories;



  return (
    <div
      className={`nc-Card6 relative flex group flex-col-reverse sm:flex-row sm:items-center p-4  [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
      data-nc-id="Card6"
    >
      <NcLink
        href={`/${kind}/${slug}`}
        className="absolute inset-0 z-0"
      ></NcLink>
      <div className="flex flex-col flex-grow">
        <div className="space-y-3 mb-4">
          <CategoryBadgeList
            categories={categoriesOrder}
            color={badgeColor}
            isCourse={kind === "curso"}
            isPost={kind === "blog"}
            isEbook={kind === "guia"}
          />
          <h2 className={`block font-semibold text-base`}>
            <NcLink
              href={`/${kind}/${slug}`}
              className="line-clamp-2 font-medium"
              colorClass="text-black"
            >
              {title}
            </NcLink>
          </h2>
          <CardAuthor2
            date={date}
            className="relative my-4"
            author={author}
            flex={authorRow}
            readingTime={Number(reading_time)}
            forSingleNote={forSingleNote}
          />
        </div>


      </div>

      <NcLink
        href={link}
        className={`block relative flex-shrink-0 w-full sm:w-40 h-40 sm:h-full sm:ml-5 rounded-2xl overflow-hidden mb-5 sm:mb-0 `}
      >
        <NcImage
          containerClassName="absolute inset-0"
          className="object-cover w-full h-full"
          src={image || ""}
          alt={title}
          sizes="(max-width: 1280px) 100vw, 1536px"
          fill
        />
      </NcLink>

    </div>
  );
};

export default Card6;
