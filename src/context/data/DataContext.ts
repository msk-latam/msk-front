import { createContext, Dispatch } from 'react';

export interface DataAction {
  type: 'GET_DATA' | 'GET_STORE_DATA';
  payload: {
    [key: string]: any;
  };
}

export interface DataState {
  allCourses: any;
  storeCourses: any;
  allPosts: any;
  allBestSellers: any;
  allProfessions: any;
  allStoreProfessions: any;
  allSpecialties: any;
  allSpecialtiesGroups: any;
  allProductsMX: any;
}

export const DataContext = createContext<{
  loadingCourses?: boolean;
  loadingPosts?: boolean;
  loadingBestSellers?: boolean;
  loadingProfessions?: boolean;
  loadingSpecialties?: boolean;
  loadingProductsMX?: boolean;
  state: DataState;
  dispatch: Dispatch<DataAction>;
}>({
  state: {
    allCourses: [],
    storeCourses: [],
    allPosts: [],
    allBestSellers: [],
    allProfessions: [],
    allStoreProfessions: [],
    allSpecialties: [],
    allSpecialtiesGroups: [],
    allProductsMX: [],
  },
  dispatch: () => {},
});
