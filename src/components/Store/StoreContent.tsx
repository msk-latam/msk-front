import React, { FC, useEffect, useState } from "react";
import StorePagination from "./StorePagination";
import StoreSideBar from "./StoreSideBar";
import StoreProduct from "./StoreProduct";
import {
  DurationFilter,
  FetchCourseType,
  JsonMapping,
  PageFilter,
  Profession,
  ResourceFilter,
  Specialty,
} from "data/types";
import { useStoreFilters } from "context/storeFilters/StoreFiltersProvider";
import { useHistory } from "react-router-dom";
import specialtiesMapping from "../../data/jsons/__specialties.json";
import resourcesMapping from "../../data/jsons/__resources.json";
import StoreBar from "./StoreBar";
import { keepOnlySpecifiedParams } from "lib/removeUrlParams";
import Breadcrum from "components/Breadcrum";

interface Props {
  products: FetchCourseType[];
  professions: Profession[];
  specialties: Specialty[];
  productsLength: number;
  handleTriggerSearch: (e: any) => void;
  handleTriggerFilter: (e: any) => void;
}

const StoreContent: FC<Props> = ({
  products,
  professions,
  specialties,
  productsLength,
  handleTriggerSearch,
  handleTriggerFilter,
}) => {
  const history = useHistory();
  const params = new URLSearchParams(history.location.search);
  const possiblePageParam = history.location.search.includes("page") ? Number(history.location.search.split("&").pop()?.split("=")[1]) : 1;

  const [currentPage, setCurrentPage] = useState(possiblePageParam);
  const { storeFilters, addFilter, removeFilter, updateFilter, clearFilters } =
    useStoreFilters();
  const itemsPerPage = 18;

  // Calcular el índice del primer y último elemento en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Obtener los elementos de la página actual
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Función para cambiar la página
  const handlePageChange = (pageNumber: number) => {
    const { pathname, search } = history.location;
    const pageExists = storeFilters.page.some((item: PageFilter) => item.id === pageNumber);
    const urlRedirect = keepOnlySpecifiedParams(`${pathname}${search}`);


    if (pageExists) {
      removeFilter("page", { id: pageNumber, name: String(pageNumber) });
    } else {
      updateFilter("page", {
        id: pageNumber,
        name: String(pageNumber),
        total: totalPages,
      });

      const pageParam = pageNumber > 1 ? `page=${pageNumber}` : "";
      const separator = urlRedirect.includes("?") ? "&" : "?";
      const fullUrl = `${urlRedirect}${pageParam && separator}${pageParam}`
      console.log({pageNumber, pageExists, urlRedirect, pageParam, fullUrl})

      history.push(fullUrl);
      setCurrentPage(pageNumber);
    }
  };

  const onChangeSpecialty = (specialty: Specialty) => {
    const specialtyExists = storeFilters.specialties.filter(
      (item: Specialty) => {
        return item.name == specialty.name;
      }
    );

    if (specialtyExists.length) {
      removeFilter("specialties", specialty);
    } else {
      addFilter("specialties", specialty);
    }
  };

  const onChangeProfession = (profession: Profession) => {
    const professionExists = storeFilters.professions.filter(
      (item: Profession) => {
        return item.slug == profession.slug;
      }
    );
    if (professionExists.length) removeFilter("professions", profession);
    else addFilter("professions", profession);
  };

  const onChangeResource = (resource: ResourceFilter) => {
    const resourceExists = storeFilters.resources.filter(
      (item: ResourceFilter) => {
        return item.id == resource.id;
      }
    );

    console.log(resource, params)

    if (resourceExists.length) {
      removeFilter("resources", resource);
    } else {
      addFilter("resources", resource);
    }
  };

  const onChangeDuration = (duration: DurationFilter) => {
    const durationExists = storeFilters.duration.filter(
      (item: DurationFilter) => {
        return item.value == duration.value;
      }
    );
    if (durationExists.length) {
      removeFilter("duration", duration);
    } else addFilter("duration", duration);
  };

  useEffect(() => {
    const currentUrl = window.location.href;
    const searchQuery = currentUrl.split("?");
    //console.log(currentUrl, { searchQuery });
    if (searchQuery[1]) {
      const queryParams = searchQuery[1].split("&");
      clearFilters();

      queryParams.forEach((query, index) => {
        const filterQueries = query
          .split("=")[1]
          .split(",")
          .map((item) => decodeURIComponent(item));
       
        const filterType = query.split("=")[0];
        
        switch (filterType) {
          case "profesion":
            if (filterQueries.includes("medicos"))
              addFilter("professions", {
                id: 1,
                name: "Personal médico",
                slug: "medicos",
              });
            if (
              filterQueries.includes("enfermeros-auxiliares") &&
              filterQueries.includes("otra-profesion")
            ) {
              addFilter("professions", {
                id: 2,
                name: "Personal de enfermería y auxiliares",
                slug: "enfermeros-auxiliares",
              });
              addFilter("professions", {
                id: 3,
                name: "Otra profesión",
                slug: "otra-profesion",
              });
            }
            break;
          case "especialidad":
            const specialtiesJSON: JsonMapping = specialtiesMapping;
            const [specialtieQueryName] = filterQueries;
            const specialtyName = specialtiesJSON[specialtieQueryName];
            addFilter("specialties", {
              id: 1,
              name: specialtyName,
            });
            break;
          case "recurso":
            const resourceJSON: JsonMapping = resourcesMapping;
            const [resourceQueryName] = filterQueries;
            const resourceName = resourceJSON[resourceQueryName];
            addFilter("resources", {
              name: resourceName,
              id: 1,
            });

            break;
          case "page":
            addFilter("page", {
              name: filterQueries[0],
              id: Number(filterQueries[0]),
              total: totalPages,
            });
            setCurrentPage(Number(filterQueries[0]));

            break;
        }
      });

      //setCurrentPage(1);
    }
  }, [location.search, productsLength]);

  useEffect(() => {
    setCurrentPage(storeFilters.page[0]?.id ?? 1);
  }, [storeFilters]);

  return (
    <section className="container course-content-area pb-90 animate-fade-down px-0">
      <Breadcrum />
      {storeFilters.specialties.length > 0 && (
        <h1 className="text-xl sm:text-3xl mb-10">
          Cursos de {storeFilters.specialties[0].name}
        </h1>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-[28%_72%] gap-4 mb-10">
        <div className="hidden lg:flex flex-col">
          <StoreSideBar
            specialties={specialties}
            professions={professions}
            onChangeSpecialty={onChangeSpecialty}
            onChangeProfession={onChangeProfession}
            onChangeResource={onChangeResource}
            onChangeDuration={onChangeDuration}
          />
        </div>
        <div>
          <StoreBar
            onSearch={(e) => handleTriggerSearch(e)}
            onFilter={(e) => handleTriggerFilter(e)}
            length={products.length}
            filtersCount={
              storeFilters.specialties.length +
              storeFilters.professions.length +
              storeFilters.resources.length +
              storeFilters.duration.length
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {currentItems.length ? (
              currentItems.map((product, index) => {
                return (
                  <StoreProduct
                    product={product}
                    key={`${product.slug}_${index}`}
                    kind={product.father_post_type}
                  />
                );
              })
            ) : (
              <div className="text-center col-span-1 md:col-span-2 lg:col-span-3 flex flex-col justify-center items-center h-[350px]">
                <img src="/images/icons/no_items.svg" className="mb-5" />
                <p>
                  No hay resultados para tu búsqueda.
                  <br />
                  Modifica los filtros y encuentra tu curso ideal.
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-center md:justify-start">
            <StorePagination
              totalPages={totalPages}
              onPageChange={handlePageChange}
              currentPage={currentPage}
              linkTracker={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreContent;
