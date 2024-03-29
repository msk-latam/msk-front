import { createContext } from "react";
import { Filter } from "./storeFiltersReducer";
import {
  DurationFilter,
  PageFilter,
  Profession,
  ResourceFilter,
  Specialty,
} from "data/types";

export type ContextType = {
  storeFilters: Filter;
  addFilter: (
    filterType: keyof Filter,
    filterValue:
      | Specialty
      | Profession
      | DurationFilter
      | ResourceFilter
      | PageFilter
  ) => void;
  updateFilter: (filterType: keyof Filter, filterValue: PageFilter) => void;
  removeFilter: (
    filterType: keyof Filter,
    filterValue:
      | Specialty
      | Profession
      | DurationFilter
      | ResourceFilter
      | PageFilter
  ) => void;
  clearFilters: () => void;
};

export const StoreFiltersContext = createContext<ContextType | undefined>(
  undefined
);
