import Breadcrum from '@/components/Breadcrum/Breadcrum';
import { useStoreFilters } from '@/context/storeFilters/StoreProvider';
import { Specialty } from '@/data/types';
import Image from 'next/image';
import { FC } from 'react';

interface TiendaProps {
  category: string;
}

const TiendaHeader: FC<TiendaProps> = ({ category }) => {
  let specialties: Specialty[] = useStoreFilters().specialties;
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  };

  const matchedSpecialty = specialties.find(
    specialty => generateSlug(specialty.name) === category,
  );
  return (
    <div className='relative'>
      <div className='absolute inset-0 w-screen left-1/2 transform -translate-x-1/2 '>
        <Image
          src={`/images/banners/especialidades.webp`}
          alt='Especialidades'
          // layout='fill'
          width={2000}
          height={2000}
          objectFit='cover'
          quality={100}
          className=' z-0'
        />
      </div>
      <div className='relative z-10 mx-auto py-6'>
        <Breadcrum />
        <h1 className='text-xl sm:text-3xl mb-6'>
          Cursos de <br /> {matchedSpecialty ? matchedSpecialty.name : category}
        </h1>
      </div>
      <div className='relative mb-4'>
        <div className='bg-[#F5F8FF] min-h-full  w-screen absolute left-1/2 transform -translate-x-1/2'></div>

        <div className=' relative py-5 '>
          <h1 className='text-[#6474A6] text-xl font-inter font-bold pb-2'>
            ¿Por qué es importante la {matchedSpecialty?.name}?
          </h1>
          <p className='text-[#6474A6] font-inter '>
            Esta especialidad tiene incidencia específica en el nivel de salud
            de las personas, las familias y la comunidad en general. Si te
            capacitas en medicina familiar y comunitaria, te estarás preparando
            para resolver la mayoría de los problemas de salud que presenta la
            población y coordinar los distintos niveles de atención, permitiendo
            así el buen funcionamiento de todo el sistema hospitalario.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TiendaHeader;