import { Filter } from "@/context/storeFilters/storeReducer";
import specialtiesMapping from "@/data/jsons/__specialties.json";
import {
  DurationFilter,
  FetchCourseType,
  PageFilter,
  Profession,
  ResourceFilter,
  Specialty,
} from "@/data/types";

let filterSpecialties = "";
const filterProfessions: any[] = [];
const filterDuration: any[] = [];
const filterResources: ResourceFilter[] = [];

export const filterSpecialtiesAux: any = null;
export const setFilterSpecialty = (specialty: string) => {};

export const isSpecialtySelected = (slug: string) => {
  return !!specialtiesMapping[slug as keyof typeof specialtiesMapping];
};

export const addFilterNew = (
  filterType: keyof Filter,
  filterValue:
    | Specialty
    | Profession
    | DurationFilter
    | ResourceFilter
    | PageFilter
    | string
) => {
  switch (filterType) {
    case "specialties":
      if (typeof filterValue === "string") filterSpecialties = filterValue;
      break;
    case "professions":
      if (!filterProfessions.includes(filterValue)) {
        filterProfessions.push(filterValue);
      }
      break;
    case "duration":
      if (!filterDuration.includes(filterValue)) {
        filterDuration.push(filterValue);
      }
      break;
    case "resources":
      if (!filterResources.includes(filterValue)) {
        filterResources.push(filterValue);
      } else {
        filterResources.splice(filterResources.indexOf(filterValue), 1);
      }
      break;
    default:
      break;
  }
};

export const getFilters = () => {
  return {
    specialties: filterSpecialties,
    professions: filterProfessions,
    duration: filterDuration,
    resources: filterResources,
  };
};

export const isFilterChecked = (filterType: keyof Filter, filterValue: any) => {
  switch (filterType) {
    case "specialties":
      return filterSpecialties.includes(filterValue);
    case "professions":
      return filterProfessions.includes(filterValue);
    case "duration":
      return filterDuration.includes(filterValue);
    case "resources":
      // console.log(
      //   "IS CHECKED",
      //   filterType,
      //   filterValue,
      //   filterResources.includes(filterValue)
      // );
      return filterResources.includes(filterValue);
    default:
      return false;
  }
};

export const getFilterResources = () => filterResources;

export const filterStoreProducts = (
  products: FetchCourseType[],
  event: string
) => {
  let sortedProducts: FetchCourseType[] = [];
  switch (event) {
    case "":
      sortedProducts = [...products];
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
  return sortedProducts;
};
