import { DataAction, DataState } from "./DataContext";

export const dataInitialState = {
  allCourses: [],
  allPosts: [],
  allBestSellers: [],
  allProfessions: [],
  allSpecialties: [],
  allSpecialtiesGroups: [],
  allProductsMX: [],
};

const GET_DATA = "GET_DATA";

export const dataReducer = (
  state: DataState,
  action: DataAction
): DataState => {
  switch (action.type) {
    case "GET_DATA":
      //console.log('GET_DATA: ', action.payload);
      let stateAux = {
        ...state,
        ...action.payload,
      }
      //console.log('stateAux: ', stateAux);
      return stateAux;
    default:
      return state;
  }
};
