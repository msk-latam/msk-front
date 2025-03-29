import React, { FC } from 'react';

export interface SkeletonProps {
  className?: string;
  height?: string;
  hideText?: boolean;
  text?: string;
}

const InputSkeleton: FC<SkeletonProps> = ({
  className = '',
  height = '',
  hideText = false,
  text = '',
}) => {
  return (
    <div
      role='status'
      className={'grid grid-cols-1 gap-2 animate-pulse' + ' ' + className}
    >
      {text && (
        <div className='flex items-center justify-center mb-2'>
          <span className='text-gray-500'>{text}</span>
          <svg
            aria-hidden='true'
            className='w-5 h-5 ml-2 text-gray-200 animate-spin fill-blue-600'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2055 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2055 0 50.5908C0 22.9761 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9761 100 50.5908ZM9.08157 50.5908C9.08157 74.1944 26.3964 91.5092 50 91.5092C73.6036 91.5092 90.9184 74.1944 90.9184 50.5908C90.9184 26.9873 73.6036 9.67255 50 9.67255C26.3964 9.67255 9.08157 26.9873 9.08157 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5531C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.723 75.2124 7.41288C69.5422 4.10285 63.2754 1.94025 56.7221 1.05197C51.7666 0.367443 46.7499 0.446843 41.8298 1.27873C39.3861 1.69037 37.9177 4.19778 38.5548 6.62326C39.1919 9.04874 41.676 10.4713 44.1492 10.1076C47.924 9.49241 51.7813 9.46611 55.5736 10.0255C60.6948 10.791 65.6273 12.6034 70.1107 15.3735C74.594 18.1435 78.5301 21.819 81.678 26.1586C84.2175 29.7198 86.2287 33.6006 87.6438 37.7002C88.4883 40.0586 91.5421 40.6779 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
        </div>
      )}
      <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-1'></div>
      <div className='flex items-center justify-center w-full h-10 bg-gray-300 rounded  dark:bg-gray-700'></div>
    </div>
  );
};

export default InputSkeleton;
