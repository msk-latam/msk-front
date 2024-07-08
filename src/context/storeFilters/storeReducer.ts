"use client";

import {
  ResourceFilter,
  DurationFilter,
  Profession,
  Specialty,
  PageFilter,
} from "@/data/types";
import {addParameterToURL} from "@/utils/addParameterToURL";
import {updateParameterToURL} from "@/utils/updateParameterToURL";
import {removeParameterFromURL} from "@/utils/removeParameterFromURL";

export type Filter = {
  specialties: Specialty[];
  professions: Profession[];
  duration: DurationFilter[];
  resources: ResourceFilter[];
  page: PageFilter[];
  search : string;
};

export type State = {
  storeFilters: Filter;
  professions: Profession[];
  specialties: Specialty[];
};

export type Action =
  | {
  type: "ADD_FILTER";
  payload: {
    filterType: keyof Filter;
    filterValue:
      | Specialty
      | Profession
      | DurationFilter
      | ResourceFilter
      | PageFilter
      | string;
  };
}
  | {
  type: "UPDATE_FILTER";
  payload: {
    filterType: keyof Filter;
    filterValue: PageFilter;
  };
}
  | {
  type: "REMOVE_FILTER";
  payload: {
    filterType: keyof Filter;
    filterValue:
      | Specialty
      | Profession
      | DurationFilter
      | ResourceFilter
      | PageFilter;
  };
}
  | {
  type: "CLEAR_FILTERS";
}
  | {
  type: "CLEAR_SPECIALTIES";
}
  | {
  type: "INITIALIZE";
  payload: {
    specialties: Specialty[];
    professions: Profession[];
  };
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "REMOVE_FILTER":
      console.log('Processing REMOVE_FILTER dispatch');
      removeParameterFromURL(action.payload.filterType, action.payload.filterValue.name);
      if (action.payload.filterType === 'search') {
        return {
          ...state,
          storeFilters: {
            ...state.storeFilters,
            search: '',
          },
        };
      }else{
        return {
          ...state,
          storeFilters: {
            ...state.storeFilters,
            [action.payload.filterType]: state.storeFilters[ action.payload.filterType ].filter((filterValue: any) => {
              return (
                filterValue !== action.payload.filterValue &&
                filterValue.name !== action.payload.filterValue.name
              );
            }),
          },
        };
      }

    case "INITIALIZE":
      console.log('INITIALIZING', action);
      return {
        ...state,
        specialties: action.payload.specialties,
        professions: action.payload.professions,
      };
    case "ADD_FILTER":
      console.log("ADD_FILTER", action.payload.filterType, action.payload.filterValue);
      addParameterToURL(action.payload.filterType, action.payload.filterValue);
      removeParameterFromURL("page", '');

      let stateAux = {
        ...state,
        storeFilters: {
          ...state.storeFilters,
          specialties: [...state.storeFilters.specialties],
          professions: [...state.storeFilters.professions],
          duration: [...state.storeFilters.duration],
          resources: [...state.storeFilters.resources],
          page: [...state.storeFilters.page],
          [action.payload.filterType]: [
            ...state.storeFilters[action.payload.filterType],
            action.payload.filterValue
          ],
        },
      };
      console.log("State aux: ", stateAux);
      return stateAux;
    case "UPDATE_FILTER":
      updateParameterToURL(action.payload.filterType, action.payload.filterValue.name)
      return {
        ...state,
        storeFilters: {
          ...state.storeFilters,
          page: [{...action.payload.filterValue}],
        },
      };
    case "CLEAR_FILTERS":
      removeParameterFromURL("specialties", '');
      removeParameterFromURL("resources", '');
      removeParameterFromURL("professions", '');
      removeParameterFromURL("specialdurationties", '');
      return {
        ...state,
        storeFilters: {
          specialties: [],
          professions: [],
          duration: [],
          resources: [],
          page: [],
          search: '',
        },
      };
    case "CLEAR_SPECIALTIES":
      removeParameterFromURL("specialties", '');
      return {
        ...state,
        storeFilters: {
          ...state.storeFilters,
          specialties: [],
        },
      };
    default:
      return state;
  }
};

export default reducer;
