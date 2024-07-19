import React, { FC, useEffect, useState } from 'react';

interface ProductFeaturedTextProps {
  text: string;
}

const ProductFeaturedText: FC<ProductFeaturedTextProps> = ({ text }) => {
  const formattedText = text.replace(/<em>/g, '').replace(/<\/em>/g, '');

  return (
    <div className='requirements mb-10 sm:mb-16 flex nowrap items-center'>
      <div className='w-[15%] flex justify-center'>
        <img
          src={'/webp-images/featuredTextImg.webp'}
          alt='featuredTextImg'
          className='mr-5 hidden sm:block'
        />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: formattedText }}
        className='font-normal not-italic w-[85%]'
      />
    </div>
  );
};

export default ProductFeaturedText;
