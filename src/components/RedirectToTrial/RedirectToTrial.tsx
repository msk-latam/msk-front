"use client";

import { CountryContext } from "@/context/country/CountryContext";
import { AuthContext } from "@/context/user/AuthContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const RedirectToTrial = () => {
  const router = useRouter();
  const { state: authState } = useContext(AuthContext);
  const { countryState } = useContext(CountryContext);

  useEffect(() => {
    const handleRedirect = async () => {
      if (typeof window !== "undefined") {
        const redirectToTrial = localStorage.getItem("trialURL");
        console.log("RedirectToTrial", { window, redirectToTrial, authState });

        
        
        if (redirectToTrial && authState.isAuthenticated) {
          try {
            const fullURL ='/' + countryState.country + redirectToTrial

            console.log("Full redirect URL:", fullURL);
            window.location.href = fullURL
            console.log("Redirection successful to:", fullURL);
            localStorage.removeItem("trialURL");
          } catch (error) {
            console.error("Redirection error:", error);
          }
        } else {
          if (!redirectToTrial) {
            console.log("No redirect URL found in localStorage.");
          }
          if (!authState.isAuthenticated) {
            console.log("User is not authenticated.");
          }
        }
      }
    };

    handleRedirect();
  }, [authState.isAuthenticated, router]);

  return <></>;
};

export default RedirectToTrial;
