import React, { HTMLAttributes, ReactNode } from "react";
import NextPrev from "../NextPrev/NextPrev";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  fontClass?: string;
  desc?: ReactNode;
  hasNextPrev?: boolean;
  isCenter?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  children,
  desc = "",
  className = "mb-6 sm:mb-12 md:mb-16 text-neutral-900 dark:text-neutral-50",
  isCenter = false,
  hasNextPrev = false,
  ...args
}) => {
  return (
    <div
      className={`nc-Section-Heading relative flex flex-col sm:flex-row sm:items-end justify-between ${className}`}
    >
      <div
        className={
          isCenter ? "text-center w-full max-w-2xl mx-auto " : "w-full"
        }
      >
        <h4 className={`text-[20px] md:text-4xl font-medium`} {...args}>
          {children}
        </h4>
        {desc && (
          <span className="text-[12px] mt-2 lg:text-lg md:mt-3 font-normal block text-base sm:text-xl text-violet-wash dark:text-neutral-400 leading-5">
            {desc}
          </span>
        )}
      </div>
      {hasNextPrev && !isCenter && (
        <div className="mt-4 flex justify-end sm:ml-2 sm:mt-0 flex-shrink-0">
          <NextPrev onClickNext={() => {}} onClickPrev={() => {}} />
        </div>
      )}
    </div>
  );
};

export default Heading;
