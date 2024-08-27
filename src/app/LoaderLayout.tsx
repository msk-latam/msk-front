'use client';
import { useLoader } from '@/context/loader/LoaderContext';
import { Loading } from '@/utils/Loading';

export const LoaderLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useLoader();

  return (
    <>
      {isLoading && (
        <div className='fixed top-0 left-0 w-full h-full bg-white flex items-center justify-center z-50'>
          <Loading />
        </div>
      )}
      {children}
    </>
  );
};
