import React, { FC } from "react";

export interface SingleTitleProps {
  title: string;
  className?: string;
  mainClass?: string;
}

const SingleTitle: FC<SingleTitleProps> = ({
  mainClass = "text-neutral-900 font-semibold text-2xl md:text-4xl md:!leading-[120%] lg:text-5xl dark:text-neutral-100 w-full flex items-center",
  className = "",
  title,
}) => {
  return (
    <h1 className={className + " " + mainClass} title={title}>
      {title}
    </h1>
  );
};

export default SingleTitle;
