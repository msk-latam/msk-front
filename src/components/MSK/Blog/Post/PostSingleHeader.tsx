import React, { FC } from "react";
import SingleTitle from "./SingleTitle";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import { SinglePageType } from "@/data/types";

export interface SingleHeaderProps {
  pageData: SinglePageType;
  hiddenDesc?: boolean;
  metaActionStyle?: "style1" | "style2";
  titleMainClass?: string;
  className?: string;
  excerptClassName?: string;
}

const SingleHeader: FC<SingleHeaderProps> = ({
  pageData,
  titleMainClass,
  hiddenDesc = false,
  className = "",
  metaActionStyle = "style1",
  excerptClassName = "",
}) => {
  const { excerpt, title, categories } = pageData;

  return (
    <>
      <div className={`nc-SingleHeader ${className} container`}>
        <div className="space-y-3 note-header-blog">
          <CategoryBadgeList
            itemClass="!px-3 text-[14px] mb-3"
            categories={categories}
            isPost={true}
          />
          <SingleTitle mainClass={titleMainClass} title={title} />
          {!!excerpt && !hiddenDesc && (
            <span className={excerptClassName + " inline-block text-[16px] sm:text-base md:text-lg text-neutral-400 pb-1 h-auto leading-5"} >
              {excerpt}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleHeader;
