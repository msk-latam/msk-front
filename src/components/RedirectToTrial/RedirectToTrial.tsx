"use client";

import { AuthContext } from "@/context/user/AuthContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const RedirectToTrial = () => {
  const router = useRouter();
  const { state: authState } = useContext(AuthContext);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const redirectToTrial = localStorage.getItem("trialURL");
      console.log("RedirectToTrial", { window, redirectToTrial, authState });
      if (redirectToTrial && authState.isAuthenticated) {
        router.push(redirectToTrial);
        localStorage.removeItem("trialURL");
      }
    }
  }, [authState.isAuthenticated]);

  return <></>;
};

export default RedirectToTrial;
