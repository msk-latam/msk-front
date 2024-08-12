import { FC, useContext, useEffect, useState } from "react";
import StoreLayout from "./store/StoreLayout";
import StoreBar from "components/Store/StoreBar";
import StoreContent from "components/Store/StoreContent";
import LoadingImage from "components/Loader/Image";
import {
  DurationFilter,
  FetchCourseType,
  PageFilter,
  Profession,
  ResourceFilter,
  Specialty,
} from "data/types";
import api from "Services/api";
import { useStoreFilters } from "context/storeFilters/StoreFiltersProvider";
import { CountryContext } from "context/country/CountryContext";
import { useHistory } from "react-router-dom";
import { DataContext } from "context/data/DataContext";
import PageHead from "containers/Head/PageHead";
import { removeAccents } from "lib/removeAccents";

export interface PageStoreProps {
  className?: string;
}

const PageStore: FC<PageStoreProps> = ({ className = "" }) => {
  const { state: dataState, loadingCourses } = useContext(DataContext);
  const { allCourses, allProfessions, allSpecialties } = dataState;
  const [isLoading, setLoading] = useState(loadingCourses);
  const [auxProducts, setAuxProducts] = useState<FetchCourseType[]>([]);
  const [products, setProducts] = useState<FetchCourseType[]>([]);
  const { storeFilters, clearFilters } = useStoreFilters();
  const { state, dispatch } = useContext(CountryContext);
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const history = useHistory();

  const fetchProfessions = async () => {
    const professionList = await api.getStoreProfessions();
    setProfessions(professionList);
  };
  const fetchSpecialties = async () => {
    const specialtyList = await api.getSpecialtiesStore();
    setSpecialties(specialtyList);
  };

  useEffect(() => {
    clearFilters();
    fetchProfessions();
    fetchSpecialties();
    setLoading(false);
    applyFilters();
  }, []);

  useEffect(() => {
    if (state && state.error) {
      console.error("ERROR:", state.error);
      setTimeout(() => {
        history.push(history.location.pathname);
      }, 1500);
    }
  }, [state]);

  // FETCH DATA
  useEffect(() => {
    setAuxProducts([...allCourses]);
    setProducts(allCourses);
    setLoading(false);
  }, [allCourses, allProfessions, allSpecialties, loadingCourses]);

  // FILTERS
  useEffect(() => {
    //console.table(storeFilters);
    applyFilters();
  }, [storeFilters]);

  const applyFilters = () => {
    const selectedSpecialties = storeFilters.specialties.map(
      (filter: Specialty) => filter.name
    );
    const selectedProfessions = storeFilters.professions.map(
      (filter: Profession) => filter.slug
    );
    const selectedResources = storeFilters.resources.map(
      (filter: ResourceFilter) => filter.name
    );
    const selectedDurations = storeFilters.duration.map(
      (filter: DurationFilter) => filter.value
    );

    // console.table(storeFilters, selectedSpecialties);

    if (
      !(
        selectedSpecialties.length ||
        selectedProfessions.length ||
        selectedResources.length ||
        selectedDurations.length
      )
    ) {
      setProducts(auxProducts);
    } else {
      const filteredProducts = auxProducts.filter((product) => {
        const prodSpecialties = product.categories.map(
          (category) => category.name
        );
        const prodProfessions = product.professions.map(
          (profession) => profession.name
        );
        const prodDuration = product.duration;

        let specialtiesMatch = true;
        if (selectedSpecialties.length) {
          specialtiesMatch = selectedSpecialties.some((specialty) =>
            prodSpecialties.includes(specialty)
          );
        }

        const professionsMatch =
          selectedProfessions.length === 0 ||
          selectedProfessions.some((profession) =>
            prodProfessions.some((prodProfession) =>
              prodProfession.toLowerCase().includes(profession.toLowerCase())
            )
          );

        const resourcesMatch = selectedResources.every((resource) => {
          if (resource === "Curso") {
            return product.father_post_type === "course";
          } else if (resource === "Guías profesionales") {
            return product.father_post_type === "downloadable";
          }
        });

        const durationsMatch = selectedDurations.every((duration) => {
          const currentDuration = parseInt(prodDuration);
          switch (duration) {
            case "less_100":
              return currentDuration <= 100;
            case "100_300":
              return currentDuration > 100 && currentDuration <= 300;
            case "more_300":
              return currentDuration > 300;
          }
        });

        return (
          specialtiesMatch &&
          professionsMatch &&
          resourcesMatch &&
          durationsMatch
        );
      });

      setProducts(filteredProducts);
    }
  };

  const triggerSearch = (event: any) => {
    if (event) {
      const filteredProducts = auxProducts.filter((product) =>
        removeAccents(product.title.toLowerCase()).includes(
          removeAccents(event.toLowerCase())
        )
      );
      setProducts(filteredProducts);
    } else {
      setProducts(auxProducts);
      applyFilters();
    }
  };

  const triggerFilter = (event: any) => {
    let sortedProducts: FetchCourseType[] = [];
    setLoading(true);

    switch (event) {
      case "":
        sortedProducts = [...auxProducts];
        break;
      case "novedades":
        sortedProducts = [...products]; // Create a copy of products
        sortedProducts.sort((a, b) => {
          const isNewA = Boolean(a.is_new);
          const isNewB = Boolean(b.is_new);
          if (isNewA === isNewB) {
            return 0;
          } else if (isNewA) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      case "mas_horas":
        sortedProducts = [...products];
        sortedProducts.sort((a, b) => {
          let durationA = parseInt(a.duration);
          let durationB = parseInt(b.duration);

          if (isNaN(durationA)) {
            durationA = 0;
          }
          if (isNaN(durationB)) {
            durationB = 0;
          }
          if (durationA < durationB) {
            return 1;
          }
          if (durationA > durationB) {
            return -1;
          }
          return 0;
        });
        break;
      case "menos_horas":
        sortedProducts = [...products];
        sortedProducts.sort((a, b) => {
          let durationA = parseInt(a.duration);
          let durationB = parseInt(b.duration);
          if (isNaN(durationA)) {
            durationA = 0;
          }
          if (isNaN(durationB)) {
            durationB = 0;
          }
          if (durationA > durationB) {
            return 1;
          }
          if (durationA < durationB) {
            return -1;
          }
          return 0;
        });
        break;
      default:
        break;
    }

    setLoading(false);
    setProducts(sortedProducts);
  };

  let loaders = [];
  for (let i = 0; i < 9; i++) {
    loaders.push(<LoadingImage key={`loader_${i}`} />);
  }

  const prioryTitleStore =
    storeFilters?.specialties[0]?.name &&
    `Cursos de ${storeFilters.specialties[0].name}`;

  return (
    <div
      className={`nc-PageStore ${className} animate-fade-down`}
      data-nc-id="PageStore"
    >
      {/* === SEO === */}
      <PageHead
        title="Tienda"
        description="Una propuesta moderna para expandir tus metas profesionales"
        prioryTitle={prioryTitleStore ?? null}
      />
      {/* === END SEO === */}

      <StoreLayout
        subHeading="Pricing to fit the needs of any companie size."
        headingEmoji="💎"
        heading="Store"
      >
        <section className="text-neutral-600 text-sm md:text-base overflow-hidden">
          {loadingCourses ? (
            <div className="container grid grid-cols-1 sm:grid-cols-3 gap-10">
              {loaders.map((loader) => {
                return loader;
              })}
            </div>
          ) : (
            <StoreContent
              products={products}
              specialties={specialties}
              professions={professions}
              productsLength={auxProducts.length}
              handleTriggerSearch={triggerSearch}
              handleTriggerFilter={triggerFilter}
            />
          )}
        </section>
      </StoreLayout>
    </div>
  );
};

export default PageStore;
