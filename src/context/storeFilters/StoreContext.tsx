"use client";
import { createContext } from "react";
import { Filter } from "./storeReducer";
import {
  DurationFilter,
  PageFilter,
  Profession,
  ResourceFilter,
  Specialty,
} from "@/data/types";

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
      | string
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
    | string) => void;
  clearFilters: () => void;
  clearSpecialties: () => void;
  professions: Profession[];
  specialties: Specialty[];
};


export const StoreContext = createContext<ContextType | undefined>(
  undefined
);
