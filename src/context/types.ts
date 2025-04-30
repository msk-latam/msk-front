export interface CountryState {
    country: string;
    currency: string;
    installments: {
      gateway: string;
      quotes: number | null;
    };
    error?: string;
  }
  
  export type AuthAction =
    | { type: 'SET_COUNTRY'; payload: { country: string } }
    | { type: 'SET_ERROR'; payload: string };
  