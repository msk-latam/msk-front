'use client';
import React, { FC, useContext, useEffect, useState } from 'react';
import StorePagination from './StorePagination';
import StoreSideBar from './StoreSideBar';
import StoreProduct from './StoreProduct';
import {
  CourseDataType,
  DurationFilter,
  FetchCourseType,
  PageFilter,
  Profession,
  ResourceFilter,
  Specialty,
  WpProduct,
} from '@/data/types';
import { useStoreFilters } from '@/context/storeFilters/StoreProvider';
import StoreBar from './StoreBar';
import { removeAccents } from '@/lib/removeAccents';
import { filterStoreProducts } from '@/lib/storeFilters';
import Breadcrum from '@/components/Breadcrum/Breadcrum';
import StoreSkeleton from '@/components/Skeleton/StoreSkeleton';
import NoResultFound from '@/components/NoResultFound';
import resourcesMapping from '@/data/jsons/__resources.json';
import durationsMapping from '../../../data/jsons/__durations.json';

import { slugifySpecialty } from '@/lib/Slugify';
import { CountryContext } from '@/context/country/CountryContext';
import { DataContext } from '@/context/data/DataContext';
import { useSearchParams } from 'next/navigation';

let resources = resourcesMapping;
let durations = durationsMapping;

const StoreContent: FC<{}> = () => {
  let {
    storeFilters,
    addFilter,
    removeFilter,
    updateFilter,
    clearSpecialties,
  } = useStoreFilters();

  const { state: dataState } = useContext(DataContext);
  const { storeCourses, allStoreProfessions } = dataState;

  const { specialties } = useStoreFilters();

  const { countryState } = useContext(CountryContext);

  const searchParams = useSearchParams();
  const [currentItems, setCurrentItems] = useState<FetchCourseType[]>([]);
  const [filteredItems, setFilteredItems] = useState<FetchCourseType[]>([]);

  const [mutationProducts, setMutationProducts] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1,
  );
  const itemsPerPage = 18;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [totalPages, setTotalPages] = useState(
    Math.ceil(storeCourses.length / itemsPerPage),
  );

  let products: FetchCourseType[] = [];

  useEffect(() => {
    // console.log('USE EFFECT STORE CONTENT');
    async function fetchData() {
      // console.log('All Courses', storeCourses);
      if (storeCourses.length) {
        setCurrentItems(storeCourses.slice(indexOfFirstItem, indexOfLastItem));
      }
    }
    fetchData();
  }, [countryState.country, storeCourses]);

  const handlePageChange = (pageNumber: number) => {
    // console.log('HANDLING PAGE CHANGE');
    const pageExists = storeFilters.page.some(
      (item: PageFilter) => item.id === pageNumber,
    );
    //console.log({pageExists, storePage: storeFilters.page, pageNumber})
    if (!pageExists) {
      updateFilter('page', {
        id: pageNumber,
        name: String(pageNumber),
        total: totalPages,
      });
      const indexOfFirstItem = (pageNumber - 1) * itemsPerPage;
      if (products) {
        const currentItems = products.slice(
          indexOfFirstItem,
          indexOfFirstItem + itemsPerPage,
        );
        setCurrentItems(currentItems);
        setCurrentPage(pageNumber);
      }
    } else {
      removeFilter('page', { id: pageNumber, name: String(pageNumber) });
    }
  };
  // STOREBAR FILTERS
  const triggerSearch = (event: any) => {
    if (event) {
      const filteredProducts = storeCourses.filter((product: any) =>
        removeAccents(product.title.toLowerCase()).includes(
          removeAccents(event.toLowerCase()),
        ),
      );
      // console.log('SEARCH TRIGGERED', event, {
      //   filteredProducts,
      // });

      setCurrentItems(filteredProducts);
    } else {
      setCurrentItems(storeCourses);
      applyFilters();
    }
  };

  const triggerFilter = (event: any) => {
    // console.log('TRIGGER FILTER', event);
    if (products) {
      setCurrentItems(filterStoreProducts(currentItems, event));
    }
  };

  // END STOREBAR FILTERS
  const onChangeSpecialty = (specialty: Specialty, action: string) => {
    //Clear store search bar
    const input = document.getElementById('store-search') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
    resetPage();
    if (action == 'delete') {
      removeFilter('specialties', specialty);
    } else {
      // console.log('Adding filter');
      addFilter('specialties', specialty);
      addFilter('resources', { id: 1, slug: 'curso', name: 'Curso' });
    }
  };
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

  function resetPage() {
    setCurrentPage(1);
    //Remove parameter "page" from the url
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('page');
      window.history.pushState({}, '', url);
    }
  }

  const applyFilters = () => {
    setMutationProducts(true);
    console.group('applyFilters()');
    // console.log('Store Filters', { storeFilters });
    const selectedSpecialties = storeFilters.specialties.map(
      (filter: Specialty) => filter.name,
    );
    const selectedProfessions = storeFilters.professions.map(
      (filter: Profession) => filter.slug,
    );
    const selectedResources = storeFilters.resources.map(
      (filter: ResourceFilter) => filter.name,
    );
    const selectedDurations = storeFilters.duration.map(
      (filter: DurationFilter) => filter.slug,
    );
    const selectedPage = storeFilters.page.map(
      (filter: PageFilter) => filter.id,
    );

    const selectedText =
      storeFilters.search && storeFilters.search.length > 2
        ? storeFilters.search.pop()
        : storeFilters.search[0];

    const searchText = selectedText ?? '';

    // console.log('condition filter apply', {
    //   selectedSpecialties,
    //   selectedProfessions,
    //   selectedResources,
    //   selectedDurations,
    //   selectedPage,
    //   searchText,
    // });

    if (
      !(
        selectedSpecialties.length ||
        selectedProfessions.length ||
        selectedResources.length ||
        selectedDurations.length ||
        selectedPage.length ||
        searchText.length
      )
    ) {
      // console.log('No filters');
      // No filters, set the products to the original list
      let filterWithValueCourses = storeCourses.filter((c: WpProduct) => {
        if (
          (c.father_post_type === 'course' && Number(c.total_price) === 0) ||
          c.is_test_product
        ) {
          // console.log({ c });
          return false;
        }

        return true;
      });
      setCurrentItems([
        ...filterWithValueCourses.slice(indexOfFirstItem, indexOfLastItem),
      ]);
      setTotalPages(Math.ceil(filterWithValueCourses.length / itemsPerPage));
      setFilteredItems(filterWithValueCourses);
      setMutationProducts(false);
    } else {
      // console.log('There are filters we need to apply', {
      //   selectedSpecialties,
      //   selectedProfessions,
      //   selectedResources,
      //   selectedDurations,
      //   selectedPage,
      //   searchText,
      // });

      const filteredProducts = storeCourses.filter((product: WpProduct) => {
        const prodSpecialties = product.categories.map(
          category => category.name,
        );
        const prodProfessions = product.professions.map(
          profession => profession.name,
        );
        const prodDuration = product.duration;

        let specialtiesMatch = true;

        if (selectedSpecialties.length) {
          specialtiesMatch = selectedSpecialties.some(specialty =>
            prodSpecialties.includes(specialty),
          );
        }

        const professionsMatch =
          selectedProfessions.length === 0 ||
          selectedProfessions.some(profession =>
            prodProfessions.some(prodProfession =>
              prodProfession.toLowerCase().includes(profession?.toLowerCase()),
            ),
          );

        let resourcesMatch = true;
        // console.log('RESOURCE_MATCH', { resourcesMatch, selectedResources });
        if (selectedResources.length !== 0) {
          let uniqueResources = Array.from(new Set(selectedResources));

          resourcesMatch = uniqueResources
            .filter((e: string) => e != undefined)
            .some(resource => {
              if (resource === 'Curso') {
                /*  console.log(
                  { resource, type: product.father_post_type },
                  product.father_post_type === 'course',
                ); */
                return product.father_post_type === 'course';
              } else if (resource === 'Guías profesionales') {
                return product.father_post_type === 'downloadable';
              }
            });
        }

        let durationsMatch = true;
        if (selectedDurations && selectedDurations.length) {
          durationsMatch = selectedDurations.some(duration => {
            const currentDuration = parseInt(prodDuration);
            switch (duration) {
              case 'dur_1':
                return currentDuration <= 100;
              case 'dur_2':
                return currentDuration > 100 && currentDuration <= 300;
              case 'dur_3':
                return currentDuration > 300;
            }
          });
        }

        let searchMatch = true;
        if (searchText) {
          searchMatch = removeAccents(product.title.toLowerCase()).startsWith(
            removeAccents(searchText.toLowerCase()),
          );
        }

        /*   const priceMatch =
          product.father_post_type === 'downloadable' ||
          Number(product.total_price) !== 0;

        const environmentMatch =
          !product.is_test_product && product.father_post_type === 'course'; */

        return (
          specialtiesMatch &&
          professionsMatch &&
          resourcesMatch &&
          durationsMatch &&
          searchMatch
        );
      });

      // console.log('FILTERED PRODUCTS', { filteredProducts });
      // console.log('setCurrentPage: ', selectedPage[0] || 1);
      // console.log('indexOfFirstItem: ', indexOfFirstItem);
      // console.log('indexOfLastItem: ', indexOfLastItem);

      setFilteredItems(filteredProducts);

      let auxCurrentPage = selectedPage[0] || 1;
      //setCurrentPage(auxCurrentPage);
      if (auxCurrentPage == 1) {
        setCurrentItems([...filteredProducts.slice(0, itemsPerPage)]);
      } else {
        setCurrentItems([
          ...filteredProducts.slice(indexOfFirstItem, indexOfLastItem),
        ]);
      }
      setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage));
      setMutationProducts(false);
    }
    console.groupEnd();
  };

  if (typeof window !== 'undefined') {
    useEffect(() => {
      // console.log('FILTERS WERE UPDATED');
      applyFilters();
    }, [
      storeCourses,
      storeFilters.page,
      storeFilters.specialties,
      storeFilters.professions,
      storeFilters.resources,
      storeFilters.duration,
      storeFilters.search,
    ]);
  }

  if (typeof window !== 'undefined') {
    useEffect(() => {
      // console.log('Store Component rendered, check URL to apply filters');
      //if the url has the search param recurso call onChange() for that resource
      const url = new URL(window.location.href);
      const recurso = url.searchParams.get('recurso');
      const especialidad = url.searchParams.get('especialidad');
      const profesion = url.searchParams.get('profesion');
      const duracion = url.searchParams.get('duracion');
      const page = url.searchParams.get('page');
      if (recurso) {
        let urlResource = resources.find(resource => resource.slug === recurso);
        // console.log('URL RESOURCE: ', urlResource);
        if (urlResource) {
          onChangeResource(urlResource, 'add');
        }
      }
      if (especialidad && specialties) {
        // console.log('SPECIALTIES: ', specialties);
        let urlSpecialty = specialties.find(
          (specialty: any) => slugifySpecialty(specialty.name) === especialidad,
        );
        // console.log('URL SPECIALTY: ', urlSpecialty);
        if (urlSpecialty) {
          onChangeSpecialty(urlSpecialty, 'add');
        }
      }

      if (profesion && allStoreProfessions) {
        // console.log('changing profession');
        let urlProfession = allStoreProfessions?.find(
          (profession: any) => profession.slug === profesion,
        );
        // console.log('URL PROFESSION: ', urlProfession);
        if (urlProfession) {
          addFilter('professions', urlProfession);
        }
      }
      if (duracion) {
        let urlDuration = durations.find(
          duration => duration.slug === duracion,
        );
        if (urlDuration) {
          onChangeDuration(urlDuration, 'add');
        }
      }
    }, [allStoreProfessions, specialties]);
  }

  // console.log(currentItems, 'CURRENTITEMS');

  return (
    <section className=' course-content-area pb-90 animate-fade-down '>
      <Breadcrum />

      {storeFilters.specialties.length > 0 && (
        <h1 className='text-xl sm:text-3xl mb-6'>
          Cursos de {storeFilters.specialties[0].name}
        </h1>
      )}

      <div className='grid grid-cols-1 lg:grid-cols-[28%_70.2%] gap-6 mb-10'>
        <div className='hidden lg:flex flex-col'>
          <StoreSideBar
            onChangeSpecialty={onChangeSpecialty}
            onChangeProfession={onChangeProfession}
            onChangeResource={onChangeResource}
            onChangeDuration={onChangeDuration}
          />
        </div>
        <div>
          <StoreBar
            onFilter={triggerFilter}
            onSearch={triggerSearch}
            itemsPerPage={itemsPerPage}
            showingCount={itemsPerPage * currentPage}
            length={filteredItems.length}
            filtersCount={
              storeFilters.specialties.length +
              storeFilters.professions.length +
              storeFilters.resources.length +
              storeFilters.duration.length
            }
          />
          {!storeCourses.length ? (
            <StoreSkeleton />
          ) : (
            <div className='mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-12'>
              {currentItems.length ? (
                currentItems.map((product, index) => (
                  <StoreProduct
                    product={product}
                    key={`${product.slug}_${index}`}
                    kind={product.father_post_type}
                  />
                ))
              ) : (
                <NoResultFound />
              )}
            </div>
          )}
          <div className='flex justify-center md:justify-center'>
            {/*<p>Total pages: {totalPages}</p>*/}
            {!mutationProducts && (
              <StorePagination
                totalPages={totalPages}
                onPageChange={handlePageChange}
                currentPage={currentPage}
                urlTrack={true}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreContent;
