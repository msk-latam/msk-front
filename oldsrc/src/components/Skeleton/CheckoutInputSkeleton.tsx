import React from 'react';
import InputSkeleton from './InputSkeleton';
import TextSkeleton from './TextSkeleton';

const CheckoutInputSkeleton = () => {
  return (
    <div className='flex flex-col px-2 mt-5'>
      <div className='mb-4'>
        <InputSkeleton />
      </div>
      <TextSkeleton className='flex justify-center mx-auto' />
    </div>
  );
};

export default CheckoutInputSkeleton;
