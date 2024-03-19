import React, { FC, useState } from "react";
import PostCardSaveAction from "components/PostCardSaveAction/PostCardSaveAction";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";
import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import PostCardLikeAndComment from "components/PostCardLikeAndComment/PostCardLikeAndComment";
import PostCardMeta from "components/PostCardMeta/PostCardMeta";
import PostFeaturedMedia from "components/PostFeaturedMedia/PostFeaturedMedia";
import NcImage from "components/NcImage/NcImage";

export interface Card11Props {
  className?: string;
  post: any;
  ratio?: string;
  hiddenAuthor?: boolean;
  kind?: string;
}

const Card11: FC<Card11Props> = ({
  className = "h-full",
  post,
  hiddenAuthor = false,
  ratio = "aspect-w-4 aspect-h-3",
  kind,
}) => {
  let { title, href, categories, date, image, slug, link } = post;
  const imageURL = image?.replace("mx.", "");
  const [isHover, setIsHover] = useState(false);

  //Fix para encoding de HTML que viene de la API
  function decodeEntities(encodedString: string) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = encodedString;
    return textarea.value;
  }
  title = decodeEntities(title);

  return (
    <div
      className={`nc-Card11 animate-fade-down relative flex flex-col group [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
      data-nc-id="Card11"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      //
    >
      <div
        className={`block flex-shrink-0 relative w-full rounded-t-xl overflow-hidden ${ratio}`}
      >
        <div>
          <NcImage
            containerClassName="absolute inset-0"
            src={imageURL}
            alt={title}
            height="100"
          />
          {/* <PostFeaturedMedia post={post} isHover={isHover} /> */}
        </div>
      </div>
      {/* <Link to={href} className="absolute inset-0"></Link> */}
      <span className="absolute top-3 inset-x-3 z-10">
        <CategoryBadgeList categories={categories} isPost={kind === "blog"} />
      </span>

      <div className="p-4 flex flex-col flex-grow space-y-3">
        {/* {!hiddenAuthor ? (
          <PostCardMeta meta={post} />
        ) : (
          <span className="text-xs text-neutral-500">{date}</span>
        )} */}
        <h2 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100 ">
          <Link to={`/${kind}/${slug}`} className="line-clamp-2" title={title}>
            {title}
          </Link>
        </h2>
        {/* <div className="flex items-end justify-between mt-auto">
          <PostCardLikeAndComment className="relative" postData={post} />
          <PostCardSaveAction className="relative" postData={post} />
        </div> */}
      </div>
    </div>
  );
};

export default Card11;
