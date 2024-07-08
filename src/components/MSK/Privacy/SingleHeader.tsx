import React, { FC } from "react";
import SingleMetaAction2 from "./SingleMetaAction2";
import SingleTitle from "../Blog/Post/SingleTitle";
import { SinglePageType } from "@/data/types";

export interface SingleHeaderProps {
  pageData: SinglePageType;
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
  const { categories, desc, title } = pageData;

  return (
    <>
      <div className={`nc-SingleHeader ${className}`}>
        <div className="space-y-5">
          {/* <CategoryBadgeList itemClass="!px-3" categories={categories} /> */}
          <SingleTitle mainClass={titleMainClass} title={title} />
          {!!desc && !hiddenDesc && (
            <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
              {desc}
            </span>
          )}
          <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
          <div className="flex items-center sm:flex-row justify-between pb-4 sm:pb-0">
            <div className="dark:text-neutral-100 msk-logo-text grid grid-cols-12 items-center gap-6">
              <div className="img-container col-span-2">
                <img
                  src="/images/vectors/isotipo.svg"
                  width="20"
                  height="20"
                  alt=""
                />
              </div>
              <p className="text-neutral-100 col-span-10 font-semibold leading-5 text-[14px] sm:text-base">
                MSK - Medical & Scientific Knowledge
              </p>
            </div>
            <SingleMetaAction2 meta={pageData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleHeader;
