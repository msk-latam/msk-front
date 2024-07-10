"use client";
import React, {useContext, useEffect, useReducer, useState} from "react";
import { DataContext } from "./DataContext";
import { dataReducer } from "./DataReducer";
import api from "@/services/api";
import { CountryContext } from "@/context/country/CountryContext";
import ssr from "@/services/ssr";


interface Props {
  children: React.ReactNode;
}

export const DataProvider: React.FC<Props> = ({ children }) => {

  const { countryState } = useContext(CountryContext);

  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingBestSellers, setLoadingBestSellers] = useState(true);
  const [loadingProfessions, setLoadingProfessions] = useState(true);
  const [loadingSpecialties, setLoadingSpecialties] = useState(true);
  const [loadingProductsMX, setLoadingProductsMX] = useState(true);

  const dataInitialState = {
    allCourses: [],
    allPosts: [],
    allTestCourses: [],
    allBestSellers: [],
    allProfessions: [],
    allStoreProfessions: [],
    allSpecialties: [],
    allSpecialtiesGroups: [],
    allProductsMX: [],
  };

  const [state, dispatch] = useReducer(dataReducer, dataInitialState);

  const fetchAllCourses = async () => {
    const allCourses = await ssr.getAllCourses(countryState.country,'',true);
    dispatch({
      type: "GET_DATA",
      payload: { allCourses },
    });
    setLoadingCourses(false);
  };

  const fetchPosts = async () => {
    try {
      const allPosts = await api.getPosts();
      dispatch({
        type: "GET_DATA",
        payload: { allPosts },
      });
      setLoadingPosts(false);
    } catch (error) {
      console.error({ error });
    }
  };

  const fetchBestSeller = async () => {
    try {
      const allBestSellers = await api.getBestSellers();
      dispatch({
        type: "GET_DATA",
        payload: { allBestSellers },
      });
      setLoadingBestSellers(false);
    } catch (e) {
      console.error({ e });
    }
  };

  const fetchProfessions = async () => {
    try {
      const allProfessions = await api.getProfessions();
      dispatch({
        type: "GET_DATA",
        payload: { allProfessions },
      });
      setLoadingProfessions(false);
    } catch (e) {
      console.error({ e });
    }
  };

  const fetchStoreProfessions = async () => {
    try {
      const allStoreProfessions = await api.getStoreProfessions();
      dispatch({
        type: "GET_DATA",
        payload: { allStoreProfessions },
      });
      setLoadingProfessions(false);
    } catch (e) {
      console.error({ e });
    }
  };

  const fetchSpecialties = async () => {
    try {
      const allSpecialties = await api.getSpecialtiesAndGroups();
      dispatch({
        type: "GET_DATA",
        payload: { allSpecialtiesGroups: allSpecialties.specialities_group },
      });
      dispatch({
        type: "GET_DATA",
        payload: { allSpecialties: allSpecialties.specialities },
      });
      setLoadingSpecialties(false);
    } catch (e) {
      console.error({ e });
    }
  };

  useEffect(() => {
    // fetchProductsMX();
    // fetchCourses();
    // fetchPosts();
    fetchBestSeller();
    fetchProfessions();
    fetchStoreProfessions();
    fetchSpecialties();
    fetchAllCourses();
  }, []);

  return (
    <DataContext.Provider
      value={{
        loadingBestSellers,
        loadingCourses,
        loadingPosts,
        loadingProfessions,
        loadingSpecialties,
        loadingProductsMX,
        state,
        dispatch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
