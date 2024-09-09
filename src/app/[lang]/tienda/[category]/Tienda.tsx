'use client';
import Breadcrum from '@/components/Breadcrum/Breadcrum';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import StoreBar from '@/components/MSK/Store/StoreBar';
import StoreProduct from '@/components/MSK/Store/StoreProduct';
import StoreSideBar from '@/components/MSK/Store/StoreSideBar';
import NoResultFound from '@/components/NoResultFound';
import Questions from '@/components/Questions/Questions';
import StoreSkeleton from '@/components/Skeleton/StoreSkeleton';
import { DataContext } from '@/context/data/DataContext';
import { useStoreFilters } from '@/context/storeFilters/StoreProvider';
import {
  DurationFilter,
  FetchCourseType,
  Profession,
  ResourceFilter,
  Specialty,
} from '@/data/types';
import { pageHomeWpContent } from '@/lib/allData';
import { removeAccents } from '@/lib/removeAccents';
import { useSearchParams } from 'next/navigation';
import { FC, useContext, useEffect, useState } from 'react';
import { FAQS } from '../../page';

import TiendaHeader from './TiendaHeader';
import TiendaProductos from './TiendaProductos';

interface TiendaProps {
  category: string;
  country: string | undefined;
}

const Tienda: FC<TiendaProps> = ({ category, country }) => {
  const { state: dataState } = useContext(DataContext);
  const { storeCourses, allStoreProfessions } = dataState;
  const [currentItems, setCurrentItems] = useState<FetchCourseType[]>([]);
  const searchParams = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1,
  );
  const itemsPerPage = 18;

  function resetPage() {
    setCurrentPage(1);
    //Remove parameter "page" from the url
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('page');
      window.history.pushState({}, '', url);
    }
  }

  let {
    storeFilters,
    addFilter,
    removeFilter,
    updateFilter,
    clearSpecialties,
  } = useStoreFilters();

  const onChangeProfession = (profession: Profession) => {
    resetPage();
    const professionExists = storeFilters.professions.filter(
      (item: Profession) => {
        return item.slug == profession.slug;
      },
    );
    if (professionExists.length) removeFilter('professions', profession);
    else addFilter('professions', profession);
  };

  const onChangeResource = (resource: ResourceFilter, action: string) => {
    resetPage();
    // console.log('onChangeResource running');
    // console.log('Resource', resource);
    if (action !== 'add') {
      removeFilter('resources', resource);
    } else addFilter('resources', resource);
  };

  const onChangeDuration = (duration: DurationFilter, action: string) => {
    resetPage();
    // console.log('Duration', duration);
    if (action !== 'add') {
      removeFilter('duration', duration);
    } else addFilter('duration', duration);
  };

  const triggerSearch = (event: any) => {
    if (event) {
      const filteredProducts = currentItems.filter((product: any) =>
        removeAccents(product.title.toLowerCase()).includes(
          removeAccents(event.toLowerCase()),
        ),
      );
      // console.log('SEARCH TRIGGERED', event, {
      //   filteredProducts,
      // });

      setCurrentItems(filteredProducts);
    } else {
      let filteredByCategory = storeCourses;

      if (category) {
        filteredByCategory = storeCourses.filter((course: any) =>
          course.categories.some((cat: any) => cat.slug === category),
        );
      }

      setCurrentItems(filteredByCategory);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  };
  let specialties: Specialty[] = useStoreFilters().specialties;

  const matchedSpecialty = specialties.find(
    specialty => generateSlug(specialty.name) === category,
  );

  let content = {
    texto: 'Preguntas Frecuentes',
    items: [
      {
        titulo: `¿Quiénes desarrollan los cursos de ${
          matchedSpecialty?.name || 'esta especialidad'
        }?`,
        parrafo: '<p>Estos cursos tienen como cedentes a:</p>',
      },
      {
        titulo: 'Quienes pueden realizarlo?',
        parrafo: '<p>probando 2</p>',
      },
    ],
  };

  return (
    <>
      <TiendaHeader category={category} />

      <TiendaProductos category={category} country={country} />

      {/* <Questions content={pageHomeWpContent?.preguntas_frecuentes as FAQS} /> */}
      <Questions content={content as FAQS} />
    </>
  );
};

export default Tienda;
