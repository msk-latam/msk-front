import React, { FC } from 'react';

export interface HeadBackgroundCommonProps {
  className?: string;
}

const HeadBackgroundCommon: FC<HeadBackgroundCommonProps> = ({
  className = 'absolute h-[400px] w-screen transform -translate-x-1/2 left-1/2 ',
}) => {
  return (
    <div
      className={`nc-HeadBackgroundCommon ${className} top-0 left-0 right-0 w-full bg-content-msk dark:bg-neutral-800 bg-opacity-25 dark:bg-opacity-40`}
      data-nc-id='HeadBackgroundCommon'
    />
  );
};

export default HeadBackgroundCommon;
