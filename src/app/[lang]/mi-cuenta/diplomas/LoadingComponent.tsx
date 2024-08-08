import React from 'react';

interface LoadingProps {
  text: string;
}

const LoadingComponent: React.FC<LoadingProps> = ({ text }) => (
  <div className='border border-gray-200 rounded-lg p-6 flex flex-col justify-center items-center h-full min-h-[50vh]'>
    <p
      className='font-raleway text-[#6474A6] text-center w-[85%] mb-2'
      style={{ fontSize: 24, fontWeight: 100 }}
    >
      {text}
    </p>
  </div>
);

export default LoadingComponent;
