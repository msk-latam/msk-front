import {
  ResourceFilter,
  DurationFilter,
  Profession,
  Specialty,
  PageFilter,
} from "data/types";
import { addParameterToURL } from "lib/addParameterToURL";

export type Filter = {
  specialties: Specialty[];
  professions: Profession[];
  duration: DurationFilter[];
  resources: ResourceFilter[];
  page: PageFilter[];
};

export type State = {
  storeFilters: Filter;
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
          | PageFilter;
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
    };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_FILTER":
    //console.log(action.payload.filterValue.name)
      addParameterToURL(action.payload.filterType, action.payload.filterValue.name)
      
      return {
        ...state,
        storeFilters: {
          ...state.storeFilters,
          [action.payload.filterType]: [
            ...state.storeFilters[action.payload.filterType],
            action.payload.filterValue,
          ],
        },
      };
    case "UPDATE_FILTER":
      return {
        ...state,
        storeFilters: {
          ...state.storeFilters,
          page: [{ ...action.payload.filterValue }],
        },
      };
    case "REMOVE_FILTER":
      return {
        ...state,
        storeFilters: {
          ...state.storeFilters,
          [action.payload.filterType]: state.storeFilters[
            action.payload.filterType
          ].filter((filterValue: any) => {
            return (
              filterValue !== action.payload.filterValue &&
              filterValue.name !== action.payload.filterValue.name
            );
          }),
        },
      };
    case "CLEAR_FILTERS":
      return {
        ...state,
        storeFilters: {
          specialties: [],
          professions: [],
          duration: [],
          resources: [],
          page: [],
        },
      };
    default:
      return state;
  }
};

export default reducer;
