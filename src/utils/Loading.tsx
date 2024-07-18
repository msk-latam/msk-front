import Image from 'next/image';

export const Loading = () => (
  <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
    <Image
      src='/images/loading/loading.gif'
      alt='Cargando...'
      width={120}
      height={120}
    />
  </div>
);
