"use client";

import { createContext, Dispatch } from "react";
import { CountryState, AuthAction } from "@/data/types";

export const CountryContext = createContext<{
  countryState: CountryState;
  dispatch: Dispatch<AuthAction>;
}>({
  countryState: {
    country: "",
    error: "",
  },
  dispatch: () => {},
});
