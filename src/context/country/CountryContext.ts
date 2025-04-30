"use client";

import { createContext, Dispatch } from "react";
import { CountryState, CountryAction } from '@/data/types';

export const CountryContext = createContext<{
  countryState: CountryState;
  dispatch: Dispatch<CountryAction>;
}>({
  countryState: {
    country: '',
    currency: 'USD',
    installments: {
      gateway: 'REBILL',
      quotes: null,
    },
    error: '',
  },
  dispatch: () => {},
});

