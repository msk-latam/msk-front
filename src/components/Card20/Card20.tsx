import React, { FC, useContext } from 'react';

import { Aval, PostDataType } from '@/data/types';
import { CountryContext } from '@/context/country/CountryContext';
import Tooltip from '@/components/Tooltip/Tooltip';
import Image from 'next/image';
import { removeFirstSubdomain } from '@/utils/removeFirstSubdomain';
import NcImage2 from '../NcImage/NcImage2';

export interface Card20Props {
  className?: string;
  index?: number;
  post: Aval;
}

const Card20: FC<Card20Props> = ({ className = 'h-full', post, index }) => {
  let { title, description, image } = post;
  if (image) {
    image = removeFirstSubdomain(image);
  }

  console.log(image);

  return (
    <div
      className={`nc-Card20 group relative flex flex-col ${className}`}
      data-nc-id='Card20'
    >
      <div className='block bg-white flex-shrink-0 flex-grow relative w-full h-0 aspect-w-4 aspect-h-3 rounded-lg '>
        <NcImage2
          containerClassName='absolute inset-0'
          src={image}
          alt={title}
          width='300'
          height='300'
        />
      </div>
      <Tooltip
        text={description}
        className={`absolute bottom-8 right-0 md:bottom-5`}
      >
        <Image
          src={'/images/icons/info_tooltip.svg'}
          width={15}
          height={15}
          alt='info cedente'
          className='ml-auto mr-4 w-[25px] h-[25px] md:w-[15px] md:h-[15px]'
        />
      </Tooltip>
    </div>
  );
};

export default Card20;
