import React, { FC } from "react";

export interface BackgroundSectionProps {
  className?: string;
}

const BackgroundSection: FC<BackgroundSectionProps> = ({
  className = "bg-neutral-100 dark:bg-black dark:bg-opacity-20",
}) => {
  return (
    <div className={`absolute inset-y-0 w-full xl:w-[calc(100%-8rem)] left-1/2 transform -translate-x-1/2 xl:rounded-[40px] z-0 ${className}`}>
      <span className="sr-only hidden">bg</span>
    </div>
  );
};

export default BackgroundSection;
