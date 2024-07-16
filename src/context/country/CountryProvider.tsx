"use client";
import React, { useEffect, useReducer, useState } from "react";
import { CountryContext } from "./CountryContext";
import { countryReducer } from "./CountryReducer";
import { CountryState } from "@/data/types";
import { countries } from "@/data/countries";
import api from "@/services/api";
import Cookies from "js-cookie";
import { Loading } from "@/utils/loading";

interface Props {
  children: React.ReactNode;
}




export const CountryProvider: React.FC<Props> = ({ children }) => {

  const initialState: CountryState = {
    country: Cookies.get('NEXT_LOCALE') || 'int'
  };

  const [countryState, dispatch] = useReducer(countryReducer, initialState);
  const [bypassRedirect, setBypassRedirect] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("bypassRedirect") || ""
      : ""
  );

  const [loading, setLoading] = useState(true);

  const validCountries = countries.map((item) => item.id);

  useEffect(() => {
    //console.log("Country Provider UseEffect");
    const fetchData = async () => {
      let redirectUrl = "";
      try {
        let currentCountry = "";
        if (bypassRedirect == "1") {
          //console.log("bypassRedirect");
          const currentUrl = window.location.pathname;
          const validCountryUrl = validCountries.filter(
            (country) =>
              currentUrl.includes("/" + country + "/") ||
              currentUrl.endsWith("/" + country)
          );

          if (validCountryUrl.length) {
            //console.log('its on a valid country');
            dispatch({
              type: "SET_COUNTRY",
              payload: { country: validCountryUrl[0] },
            });
          }
          // console.log("Country Provider", currentCountry);
        } else {
          currentCountry = await api.getCountryCode();
          console.log("CurrentCountry obtained from IP: " + currentCountry);
          console.log(window.location.pathname);
          const currentPathName = window.location.pathname.replace("/", "");

          console.log(currentPathName);
          if (currentCountry && currentCountry == currentPathName) return; //Special use case for homepage.
          if (!validCountries.includes(currentCountry)) {
            console.log('currentCountry not included in the list of valid countries')
            currentCountry = "";
          }


          if ( countryState.country != currentCountry || getCountryFromURL() != currentCountry ) {
            if ( validCountries.includes(currentPathName) && currentPathName != currentCountry ) { //The path is just the country, go to the homepage of the country our IP is on
              console.log('redirect 1');
              redirectUrl = "/" + currentCountry;
              console.log(redirectUrl);
            } else {
              console.log('redirect 2');
              redirectUrl = "/" + currentCountry + window.location.pathname;
            }
            // console.log("redirectUrl1: " + redirectUrl);
            if (getCountryFromURL() != "") {
              redirectUrl = window.location.href
                .replace(
                  "/" + getCountryFromURL() + "/",
                  "/" + currentCountry + "/"
                )
                .replace(/(https?:\/\/.*?)\/+/g, "$1/");
            }
            console.log("redirectUrl2: " + redirectUrl);
          }
          if (
            window.location.protocol === "http:" &&
            window.location.hostname !== "localhost"
          ) {
            window.location.href =
              "https:" +
              window.location.href.substring(window.location.protocol.length);
          }

          dispatch({
            type: "SET_COUNTRY",
            payload: { country: currentCountry },
          });
          if (redirectUrl) {
            console.log(redirectUrl);
            window.location.href = redirectUrl;
          }
        }
        setLoading(false);
      } catch (error) {
        // console.log(error);
        setLoading(false);
      }
    };

    const getCountryFromURL = () => {
      const url = window.location.href;
      let validCountryUrl = validCountries.filter(
        (country) =>
          url.includes("/" + country + "/") ||
          url.endsWith("/" + country)
      );
      console.log(validCountryUrl);
      if (validCountryUrl.length) {
        return validCountryUrl[0];
      }
      return "";
    };

    fetchData();
  }, []);

  return (
    <CountryContext.Provider value={{ countryState, dispatch }}>
    {loading ? <Loading /> : children}
    </CountryContext.Provider>
  );
};

export default CountryProvider;
