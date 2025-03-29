"use client";
import {useReducer, useContext, FC, ReactNode, useEffect, useState} from "react";
import reducer, { Filter, State } from "./storeReducer";
import {
  DurationFilter,
  PageFilter,
  Profession,
  ResourceFilter,
  Specialty,
} from "@/data/types";
import { StoreContext } from "./StoreContext";
import {getAllProfessions, getAllStoreSpecialties} from "@/lib/allData";
import {CountryContext} from "@/context/country/CountryContext";

const initialState: State = {
  storeFilters: {
    specialties: [],
    professions: [],
    duration: [],
    resources: [],
    page: [],
    search : ''
  },
  professions: [],
  specialties: [],
};

export const useStoreFilters = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error(
      "useStoreFilters must be used within a StoreProvider"
    );
  }
  return context;
};

interface Props {
  children: ReactNode;
}

export const StoreProvider: FC<Props> = ({children}) => {

  const { countryState: countryState } = useContext(CountryContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const specialties = await getAllStoreSpecialties(countryState.country);
        const professions = await getAllProfessions();
        //console.log('DISPATCHING INITIALIZE');
        dispatch({
          type: "INITIALIZE",
          payload: { specialties, professions },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [countryState.country]);

  const addFilter = (
    filterType: keyof Filter,
    filterValue:
      string
      | Specialty
      | Profession
      | DurationFilter
      | ResourceFilter
      | PageFilter
  ) => {
    console.log('Add filter dispatch', {filterType, filterValue});
    dispatch({type: "ADD_FILTER", payload: {filterType, filterValue}});
  };

  const updateFilter = (filterType: keyof Filter, filterValue: PageFilter) => {
    dispatch({type: "UPDATE_FILTER", payload: {filterType, filterValue}});
  };

  const removeFilter = (
    filterType: keyof Filter,
    filterValue:
      string
      | Specialty
      | Profession
      | DurationFilter
      | ResourceFilter
      | PageFilter
  ) => {
    console.log('Removing filterr');
    dispatch({type: "REMOVE_FILTER", payload: {filterType, filterValue}});
  };

  const clearFilters = () => {
    dispatch({type: "CLEAR_FILTERS"});
  };

  const clearSpecialties = () => {
    console.log('clearing specialties');
    dispatch({type: "CLEAR_SPECIALTIES"});
  };

  return (
    <StoreContext.Provider
      value={{
        storeFilters: state.storeFilters,
        addFilter,
        updateFilter,
        removeFilter,
        clearFilters,
        clearSpecialties,
        professions: state.professions,
        specialties: state.specialties,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
